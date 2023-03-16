const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export async function getTopics() {
  const headersList = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  }

  const response = await fetch(`${API_ENDPOINT}gettopics`, {
    method: 'GET',
    headers: headersList,
  })

  if (!response.ok || response.status !== 200) {
    throw new Error(`API call error. Status=${response.status}`)
  }

  const data = await response.text()

  return JSON.parse(JSON.stringify(data))
}

export async function newTopic(topicTitle, topicDescription) {
  const headersList = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  }

  const params = { title: topicTitle, description: topicDescription }

  const response = await fetch(`${API_ENDPOINT}newtopic`, {
    method: 'PUT',
    headers: headersList,
    body: JSON.stringify(params),
  })

  if (!response.ok || response.status !== 200) {
    throw new Error(`API call error. Status=${response.status}`)
  }

  const data = await response.text()

  return JSON.parse(data)
}
