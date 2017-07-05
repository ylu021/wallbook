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
  console.log(data)
  // convert stringify to json using parse, this is a shortcut
  return data
}

addUser()
  .catch(e => console.error(e.stack))

export async function addAvatar(user) {
  let response = await fetch('api/users', {
    method: 'PUT',
    headers,
    body: JSON.stringify(user)
  })
  let data = await response.json()
  return data
}

addAvatar()
  .catch(e => console.log(e.stack))
