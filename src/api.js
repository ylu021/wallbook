const fakeusers = [
  {email: 'faker@gmail.com', password: '12345678'},
  {email: 'faker2@gmail.com', password: '12345678'},
  {email: 'faker3@gmail.com', password: '12345678'},
]

export default () => {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      return resolve(fakeusers)
    }, 1000)
  })
}
