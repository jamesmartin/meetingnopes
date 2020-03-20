const core = require('@actions/core');
const github = require('@actions/github');

async function getTemplate(token, owner, repo, path) {
  const octokit = github.GitHub(token)
  const { data: contents } = await octokit.repos.getContents({
    owner,
    repo,
    path
  })

  return contents
}

try {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
  const template = core.getInput('template')
  const projectColumnId = core.getInput('project-column-id')
  const personalAccessToken = core.getInput('personal-access-token')
  const githubToken = core.getInput('github-token')

  // 1. Get template
  const templateContents = await getTemplate(githubToken, owner, repo, template)
  console.log(templateContents)

  // 2. Get project card content URLs and descriptions
  // 3. Open a PR based on the template and the cards

  console.log('Template: ' + template)
  console.log('Project Column ID: ' + projectColumnId)
  console.log('Personal Access Token (last 8): ' + personalAccessToken.slice(personalAccessToken.length - 8))
  console.log('GitHub Token (last 8): ' + githubToken.slice(githubToken.length - 8))
} catch (error) {
  core.setFailed(error.message);
}
