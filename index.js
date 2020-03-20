const core = require('@actions/core');
const github = require('@actions/github');

try {
  const template = core.getInput('template')
  const projectColumnId = core.getInput('project-column-id')
  const personalAccessToken = core.getInput('personal-access-token')

  console.log('Template: ' + template)
  console.log('Project Column ID: ' + projectColumnId)
  console.log('Personal Access Token (last 5): ' + personalAccessToken.slice(personalAccessToken.length - 5))
} catch (error) {
  core.setFailed(error.message);
}