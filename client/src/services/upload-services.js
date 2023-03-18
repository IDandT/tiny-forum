const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export async function uploadAvatarFile(username, selectedFile) {
  try {
    const formData = new FormData()

    formData.append('username', username)
    formData.append('avatar', selectedFile)

    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Tiny Forum Frontend',
    }

    const data = await fetch(`${API_ENDPOINT}/uploadavatar`, {
      method: 'POST',
      headers: headersList,
      body: formData,
    })

    const response = JSON.parse(await data.text())
    response.ok = data.ok

    return response
  } catch (err) {
    console.log(String(err))
  }
}
