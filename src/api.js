// export default () => {
//   return new Promise((resolve, rej) => {
//     setTimeout(() => {
//       return resolve(fakeusers)
//     }, 1000)
//   })
// }

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
