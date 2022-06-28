import './index.scss'
import Sider from './sider'
import Header from './header'
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const [collapsed, setcollapsed] = useState(false);
  function setToogle() {
    setcollapsed(!collapsed)
  }
  return (
    <div className="layout">
      <Sider collapsed={collapsed}></Sider>
      <div className="main-wrap">
        <Header collapsed={collapsed} setToogle={setToogle}></Header>
        <div className="main">
          {/* //TODO */}
          <Outlet/>
        </div>
      </div>
    </div>
  )
}