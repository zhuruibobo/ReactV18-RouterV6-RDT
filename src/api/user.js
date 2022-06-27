function doLogin(userName, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userName: userName,
        accessList: [0]
      })
    }, 1500)
    // setTimeout(() => {
    //   reject({
    //     error: '-1',
    //     msg: '错误原因'
    //   })
    // }, 1000)
  })
}

export default {
  doLogin
}