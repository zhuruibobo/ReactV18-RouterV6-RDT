import './index.scss'

import { useState } from 'react'
import { Button, Form, Input, Checkbox } from 'antd'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../store/features/userSlice'
import userApi from '@/api/user.js'

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  function onSubmit() {
    form.validateFields().then(res => {
      setLoading(prevLoading => {
        console.log('prevLoading', prevLoading)
        return !prevLoading
      })
      console.log(res)
      //模拟登录
      userApi.doLogin(res.userName, res.password).then(res => {
        dispatch(doLogin(res.userName, res.accessList))
        navigate('/dashboard')
      }).finally(() => {
        setLoading(prevLoading => {
          return !prevLoading
        })
      })
    })
  }
  return (
    <div className='login-layout'>
      <div className="login-wrapper">
        <h4 className="login-title">
          红绳之恋后台管理系统
        </h4>
        <Form name="login-form" size="large" autoComplete="off" form={form} layout="vertical" initialValues={{remember: true}}>
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