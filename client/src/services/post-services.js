const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export async function getPosts(idTopic) {
  const headersList = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  }

  const response = await fetch(
    `${API_ENDPOINT}getposts?` +
      new URLSearchParams({
        idtopic: idTopic,
      }),
    {
      method: 'GET',
      headers: headersList,
    },
  )

  if (!response.ok || response.status !== 200) {
    throw new Error(`API call error. Status=${response.status}`)
  }

  const data = await response.text()

  return JSON.parse(JSON.stringify(data))
}

export async function newPost(idThread, idUser, content) {
  const headersList = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  }

  const params = { id_thread: idThread, id_user: idUser, post: content }

  const response = await fetch(`${API_ENDPOINT}newPost`, {
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
