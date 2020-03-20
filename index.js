const things = require('./apiThings.js')
const core = require('@actions/core');
const github = require('@actions/github');
const Mustache = require('mustache')

// Disable HTML-escaping because we're rendering Markdown
Mustache.escape = function(text) { return text }

try {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
  const template = core.getInput('template')
  const projectColumnId = core.getInput('project-column-id')
  const personalAccessToken = core.getInput('personal-access-token')
  const githubToken = core.getInput('github-token')
  const octokit = new github.GitHub(githubToken)
  const octokitPat = new github.GitHub(personalAccessToken)

  // 1. Get template
  things.getTemplate(octokit, owner, repo, template).then((template) => {

    // 2. Get project card content URLs and descriptions
    things.getProjectCards(octokitPat, projectColumnId).then(cards => {

      // 2.1 Build the initial notes document using the template
      const view = {
        date: (new Date()).toDateString(),
        cards: cards
      }

      const rendered = Mustache.render(template, view)
      console.log(rendered)
    })
  })

  // 3. Open a PR based on the template and the cards

  console.log('Template: ' + template)
  console.log('Project Column ID: ' + projectColumnId)
  console.log('Personal Access Token (last 8): ' + personalAccessToken.slice(personalAccessToken.length - 8))
  console.log('GitHub Token (last 8): ' + githubToken.slice(githubToken.length - 8))
} catch (error) {
  core.setFailed(error.message);
}
