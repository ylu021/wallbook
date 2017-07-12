let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
}

const requestHeaders = () => {
  return sessionStorage.getItem('auth')? {
    'Authorization': `JWT ${JSON.parse(sessionStorage.getItem('auth')).token}`
  }: {}
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

export async function loginUser(user) {
  console.log('data', user)
  let response = await fetch('/api/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
  })
  let data = await response.json()
  console.log(data)
  if(response.status===401) {
    // unauthorized, redirect to email verification page
    data['verified'] = false
  }
  // convert stringify to json using parse, this is a shortcut
  return data
}

export async function fetchUser() {
  let response = await fetch('/api/user', {
    method: 'GET',
    headers: {...headers, ...requestHeaders()}
  })
  let data = await response.json()
  if(response.status===401) {
    // unauthorized, redirect to email verification page
    data['fetched'] = false
  }
  return data
}

export async function addPost(post) {
  let response = await fetch('api/posts', {
    method: 'POST',
    headers: {...headers, ...requestHeaders()},
    body: JSON.stringify(post)
  })
  let data = await response.json()
  // convert stringify to json using parse, this is a shortcut
  return data
}
