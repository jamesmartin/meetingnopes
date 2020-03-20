const getTemplate = async function getTemplate(octokit, owner, repo, path) {
  const { data: contents } = await octokit.repos.getContents({
    owner,
    repo,
    path
  })

  const { status, data } = await octokit.request(`GET ${contents.download_url}`)
  return data
}

exports.getTemplate = getTemplate
