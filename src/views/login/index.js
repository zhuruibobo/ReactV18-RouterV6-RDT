import './index.scss'

import { Button, Form, Input, Checkbox } from 'antd'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  function onSubmit() {
    form.validateFields().then(res => {
      console.log(res)
      //模拟登录
      setTimeout(() => {
        //存储登录信息(token + redux)
        //跳转页面useNavigate
        //TODO
        navigate('/dashboard')
      }, 200)
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
            <Button type="primary" className="loginBtn" onClick={onSubmit}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}