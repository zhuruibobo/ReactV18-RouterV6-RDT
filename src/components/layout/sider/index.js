import './index.scss'
import { Menu } from 'antd';
import { routes, getIsCanAccess } from '@/router/routes';
import { useLocation, useNavigate } from 'react-router';
export default function Sider({ collapsed }) {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const openKeys = []
  const items = getMenuList(routes);

  function getMenuList (routeList, prePath = '') {
    let menuList = []
    routeList.forEach(route => {
      route.meta = route.meta || {}
      if (route.redirect || route.path == '*' || route.meta.hideMenu) {
        return
      }
      if (!getIsCanAccess(route.meta.accessId)) {
        return
      }
      if (route.path == '/' ) {
        menuList = menuList.concat(getMenuList(route.children, '/'))
      } else if (route.path !== undefined) {
        const currentPath = prePath + route.path
        const v = {
          label: route.meta.title,
          key: currentPath,
          icon: route.meta.icon
        }
        if (route.children) {
          v.children = getMenuList(route.children, currentPath + '/')
          if (pathname.match(new RegExp('^' + currentPath + '\\/\\w'))) {
            openKeys.push(currentPath)
          }
        }
        menuList.push(v)
      }
    })
    return menuList
  }
  function handleClick ({key}) {
    if (pathname !== key) {
      navigate(key)
    }
  }
  const closeDelay = 0
  return (
    <div className={`sider-wrapper ${collapsed? 'sider-collapsed':''}`}>
      <div className="logo">这里是logo</div>
      <Menu
        inlineCollapsed={collapsed}
        items={items}
        selectedKeys={[pathname]}
        defaultOpenKeys={collapsed ? [] : openKeys}
        theme="dark"
        mode="inline"
        onClick={handleClick}
        style={{
          flex: '1',
          width: '100%'
        }}
        />
    </div>
  )
}