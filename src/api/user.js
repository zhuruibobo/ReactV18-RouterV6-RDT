function doLogin(userName, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: 'token',
        userName: userName,
        accessList: [1000]
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

function getUserInfo() {
  //真实情况为axios默认获取token配置config.headers[xxx] = token
  return new Promise(resolve => {
    resolve({
      userName: 'CherryZ',
      accessList: [1000]
    })
  })
}

export default {
  doLogin,
  getUserInfo
}