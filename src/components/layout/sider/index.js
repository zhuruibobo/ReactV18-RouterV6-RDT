import './index.scss'
import { Menu } from 'antd';
export default function Sider({ collapsed }) {
  const items = [
    { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
    { label: '菜单项二', key: 'item-2' },
    {
      label: '子菜单',
      key: 'submenu',
      children: [{ label: '子菜单项', key: 'submenu-item-1' }],
    }
  ];
  return (
    <div className={`sider-wrapper ${collapsed? 'sider-collapsed':''}`}>
      <div className="logo">这里是logo</div>
      <Menu
        inlineCollapsed={collapsed}
        items={items}
        theme="dark"
        mode="inline"
        style={{
          flex: '1',
          width: '100%'
        }}
        />
    </div>
  )
}