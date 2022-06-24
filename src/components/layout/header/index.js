import './index.scss'
import { Breadcrumb, Dropdown, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons'
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);
export default function Header(props) {
  //TODO\
  //useLocation映射面包屑内容
  const { collapsed, setToogle } = props
  return (
    <div className="headerBar">
      <div className="header-left">
        <div className='toggleIcon' onClick={setToogle}>
          {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </div>
        {/* //TODO 完成面包屑与url联动 */}
        <Breadcrumb>
          <Breadcrumb.Item>
            首页
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            次级
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="header-right">
        <Dropdown className="userMenu" overlay={menu}>
          <div>用户名<DownOutlined className="iconArrowDown"/></div>
        </Dropdown>
      </div>
    </div>
  )
}