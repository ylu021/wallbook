const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
}

export async function addUser(user) {
  let response = await fetch('api/users', {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
  })
  let data = await response.json()
  // convert stringify to json using parse, this is a shortcut
  return data
}

export async function addAvatar(user) {
  console.log('fetching avatar', user)
  let response = await fetch('api/users', {
    method: 'PUT',
    headers,
    body: JSON.stringify(user)
  })
  let data = await response.json()
  return data
}

export async function sendEmail(email) {
  console.log('fetching email', email)
  let response = await fetch(`/api/email/${email}`, {
    method: 'GET',
    headers
  })
  let data = await response.json()
  return data
}

export async function verifyEmail(token) {
  let response = await fetch('/api/verify', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      token: token
    })
  })
  
  console.log(response)

  let data = await response.json()
  console.log(data)
  return data
}