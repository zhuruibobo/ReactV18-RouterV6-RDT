import './index.scss'

import { useState } from 'react'
import { Button, Form, Input, Checkbox } from 'antd'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { doLogin } from '../../store/features/userSlice'
import { doLogin } from '@/store/features/userSlice'

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  function onSubmit() {
    form.validateFields().then(res => {
      //接受一个函数，函数参数为上一次的值
      setLoading(prevLoading => {
        return !prevLoading
      })
      const { userName, password } = res
      //模拟登录
      // userApi.doLogin(res.userName, res.password).then(res => {
      //   dispatch(doLogin(res.userName, res.accessList))
      //   navigate('/dashboard')
      // }).finally(() => {
      //   setLoading(prevLoading => {
      //     return !prevLoading
      //   })
      // })
      dispatch(doLogin({ userName, password }))
        //unwrap()使用方法见https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
        .unwrap()
        .then(fulfilled => {
          console.log(fulfilled)
          navigate('/dashboard', { replace: true })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }
  return (
    <div className='login-layout'>
      <div className="login-wrapper">
        <h4 className="login-title">
          CherryZ's React Demo
        </h4>
        <Form name="login-form" size="large" autoComplete="off" form={form} layout="vertical" initialValues={{userName: 'Cherryz', password: '123456', remember: true}}>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: '请输入用户名'}]}
          >
            <Input prefix={<UserOutlined />} placeholder='用户名/手机号'></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码'}]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='密码'></Input.Password>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登录</Checkbox>
            </Form.Item>

            {/* //TODO */}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="loginBtn" loading={loading} onClick={onSubmit}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}