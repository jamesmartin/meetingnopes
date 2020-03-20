const getTemplate = async function getTemplate(octokit, owner, repo, path) {
  const { data: contents } = await octokit.repos.getContents({
    owner,
    repo,
    path
  })

  const { status, data } = await octokit.request(`GET ${contents.download_url}`)
  return data
}

const getProjectCards = async function getProjectCards(octokit, column_id) {
  const { data: cards } = await octokit.projects.listCards({
    column_id
  })
  return Promise.all(
    cards.map(async (card) => {
      let projectCard = {
        id: card.id
      }

      if (card.content_url === undefined) {
        // This is a 'note' card
        projectCard.title = card.note
        projectCard.url = card.url
      } else {
        // This is an issue or PR
        const response = await octokit.request(`GET ${card.content_url}`)
        projectCard.title = response.data.title
        projectCard.url = card.content_url
      }

      return projectCard
    })
  )
}

exports.getTemplate = getTemplate
exports.getProjectCards = getProjectCards
