const fakeusers = [
  {name: 'faker', password: '12345678'},
  {name: 'faker2', password: '12345678'},
  {name: 'faker3', password: '12345678'},
]

export default () => {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      return resolve(fakeusers)
    }, 3000)
  })
}
