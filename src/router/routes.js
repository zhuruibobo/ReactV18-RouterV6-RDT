import { HomeOutlined, BarsOutlined } from '@ant-design/icons'
import userApi from '@/api/user.js'

import Layout from '@/components/layout'

import { store } from '../store'
import { setUserInfo } from '../store/features/userSlice'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
        meta: {
          title: '首页',
          icon: <HomeOutlined />,
          accessId: 1000
        }
      },
      {
        path: 'errorPage',
        meta: {
          title: '错误页',
          icon: <BarsOutlined />
        },
        children: [
          {
            path: '403',
            component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/page403'),
            meta: {
              title: '403'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    meta: {
      title: '登录',
      noLogin: true,
      hideMenu: true
    }
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/page403'),
    meta: {
      title: '403',
      noLogin: true,
      hideMenu: true
    }
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/page404'),
    meta: {
      title: '404',
      noLogin: true,
      hideMenu: true
    }
  }
]

const onRouteBefore = ({ pathname, meta }) => {
  if (meta.title !== undefined) {
    document.title = meta.title
  }
  const token = localStorage.getItem('token')
  if (pathname == '/login' && token !== null) {
    return '/dashboard'
  }
  if (!meta.noLogin) {
    if(token !== null) {
      const { accessId } = meta
      const message = `${pathname}, ${meta.title || ''}`
      const path403 = `/403?message=${window.encodeURIComponent(message)}`
      if (hasUserInfo()) {
        if (!getIsCanAccess(accessId)) {
          return path403
        }
      } else {
        return new Promise(async resolve => {
          const userInfo = await userApi.getUserInfo()
          store.dispatch(setUserInfo({ userName: userInfo.userName, accessList: userInfo.accessList }))
          if (!getIsCanAccess(accessId)) {
            resolve(path403)
          }
        })
      }
    } else {
      return '/login'
    }
  }
}

function getIsCanAccess (accessId) {
  if (!accessId) {
    return true
  }
  const storeTree = store.getState()
  const { user: { accessList } } = storeTree
  return accessList.indexOf(accessId) !== -1
}

function hasUserInfo () {
  const storeTree = store.getState()
  const { user: { accessList } } = storeTree
  return accessList.length > 0
}

export {
  routes,
  onRouteBefore,
  getIsCanAccess
}