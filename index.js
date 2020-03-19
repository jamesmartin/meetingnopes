const core = require('@actions/core');
const github = require('@actions/github');

try {
  const template = core.getInput('template')
  const projectColumnId = core.getInput('project-column-id')

  console.log('Template: ' + template)
  console.log('Project Column ID: ' + projectColumnId)
} catch (error) {
  core.setFailed(error.message);
}
