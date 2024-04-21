import React, { useState } from 'react'
import { Button, Input, message } from 'antd'
import { useNavigate } from 'react-router'
import './login.scss'
import axios from 'axios'
import { login } from '../../http/api'

export default function Login() {

    const navigate = useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')


    const toLogin = async () => {
        if(username =='' || password==''){
            message.error('用户名或密码不能为空')
            return
        }
        let res = await login({
            username: username,
            password: password
        })

        message.info(res.msg)

        if (res.status == 200) {
            localStorage.setItem('token', res.token)
            navigate('/home/index', { state: { data: res.data } })
        }

    }

    return (
        <div  >
            <div className='login flex-jcc-aic' >
                <div className='login_container flex-jcc-aic' >
                    <h1>新闻发布系统</h1>
                    <Input type='text' placeholder='账号' onChange={(e) => setusername(e.target.value)} ></Input>
                    <Input type='password' placeholder='密码' onChange={(e) => setpassword(e.target.value)}></Input>
                    <Button type='primary' onClick={toLogin} size="large" block >登录</Button>
                </div>
            </div>


        </div>
    )

}

