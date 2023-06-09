const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export async function getTopics() {
  try {
    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Tiny Forum Frontend',
    }

    const data = await fetch(`${API_ENDPOINT}/gettopics`, {
      method: 'GET',
      headers: headersList,
    })

    const response = JSON.parse(await data.text())
    response.ok = data.ok

    return response
  } catch (err) {
    console.log(String(err))
  }
}

export async function newTopic(topicTitle, topicDescription) {
  try {
    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Tiny Forum Frontend',
      'Content-Type': 'application/json',
    }

    const params = { title: topicTitle, description: topicDescription }

    const data = await fetch(`${API_ENDPOINT}/newtopic`, {
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
