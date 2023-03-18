const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export async function getPosts(idTopic) {
  try {
    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Tiny Forum Frontend',
    }

    const data = await fetch(
      `${API_ENDPOINT}/getposts?` +
        new URLSearchParams({
          idtopic: idTopic,
        }),
      {
        method: 'GET',
        headers: headersList,
      },
    )

    const response = JSON.parse(await data.text())
    response.ok = data.ok

    return response
  } catch (err) {
    console.log(String(err))
  }
}

export async function newPost(idThread, idUser, content) {
  try {
    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Tiny Forum Frontend',
      'Content-Type': 'application/json',
    }

    const params = { id_thread: idThread, id_user: idUser, post: content }

    const data = await fetch(`${API_ENDPOINT}/newPost`, {
      method: 'PUT',
      headers: headersList,
      body: JSON.stringify(params),
    })

    const response = JSON.parse(await data.text())
    response.ok = data.ok

    return response
  } catch (err) {
    console.log(String(err))
  }
}
