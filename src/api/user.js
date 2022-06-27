function doLogin(userName, password) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        userName: userName,
        accessList: [0]
      })
    }, 1000)
  })
}

export default {
  doLogin
}