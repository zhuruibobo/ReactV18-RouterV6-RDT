import { useSelector } from "react-redux"

export default function Dashboard() {
  const userName = useSelector((state) => state.user.userName)
  const accessList = useSelector(state => state.user.accessList)
  return (
    <div>
      <div>这里是Dashboard</div>
      <p>
        <em>用户名：</em>{userName}
      </p>
      <p>
        <em>权限列表：</em>{accessList}
      </p>
    </div>
  )
}