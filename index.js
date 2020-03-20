const core = require('@actions/core');
const github = require('@actions/github');

try {
  const template = core.getInput('template')
  const projectColumnId = core.getInput('project-column-id')
  const personalAccessToken = core.getInput('personal-access-token')
  const githubToken = core.getInput('github-token')

  console.log('Template: ' + template)
  console.log('Project Column ID: ' + projectColumnId)
  console.log('Personal Access Token (last 8): ' + personalAccessToken.slice(personalAccessToken.length - 8))
  console.log('GitHub Token (last 8): ' + githubToken.slice(githubToken.length - 8))
} catch (error) {
  core.setFailed(error.message);
}
