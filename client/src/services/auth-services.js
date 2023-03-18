const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

// Call API method for signup, passing username and password
export async function registerUser(user, pass) {
  try {
    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Tiny Forum Frontend',
      'Content-Type': 'application/json',
    }

    const bodyContent = JSON.stringify({
      username: user,
      password: pass,
    })

    const data = await fetch(`${API_ENDPOINT}/register`, {
      method: 'POST',
      headers: headersList,
      body: bodyContent,
    })

    const response = JSON.parse(await data.text())
    response.ok = data.ok

    return response
  } catch (err) {
    console.log(String(err))
  }
}

// Call API method for login, passing username and password
export async function loginUser(user, pass) {
  try {
    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Tiny Forum Frontend',
      'Content-Type': 'application/json',
    }

    const bodyContent = JSON.stringify({
      username: user,
      password: pass,
    })

    const data = await fetch(`${API_ENDPOINT}/login`, {
      method: 'POST',
      headers: headersList,
      body: bodyContent,
    })

    const response = JSON.parse(await data.text())
    response.ok = data.ok

    return response
  } catch (err) {
    console.log(String(err))
  }
}
