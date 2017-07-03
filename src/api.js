export async function addUser(user) {
  console.log('im a user', JSON.stringify(user))
  let response = await fetch('api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  let data = await response.json()
  console.log(data)
  // convert stringify to json using parse, this is a shortcut
  return data
}

addUser()
  .catch(e => console.error(e.stack))


export async function getUsers() {
  let response = await fetch('api/users')
  console.log(response)
  let data = await response.json()
  // convert stringify to json using parse, this is a shortcut
  return data
}

getUsers()
  .then(data => console.log(data))
  .catch(e => console.error(e.stack))
