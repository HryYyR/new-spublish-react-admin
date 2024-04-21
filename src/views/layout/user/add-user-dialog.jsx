import React, { useState } from 'react'

import Modal from '../../compoments/modal/modal'
import { Input, Form, Select, message } from 'antd'

import { addUser } from './../../../http/api/index';

export default function addUserDialog(props) {


    const [NewUserData, setNewUserData] = useState({
        username: '',
        password: '',
        region: 3,
        roleID: 3
    })

    const handleOk = async () => {
        console.log(NewUserData);
        if (!NewUserData.username || !NewUserData.password || !NewUserData.region || !NewUserData.roleID) {
            message.error('信息填写有误!请检查后重试!')
            return
        }
        const addUserRes = await addUser(NewUserData)
        if (addUserRes.status == 200) {
            message.success(addUserRes.msg)
            props.RefreshData()
            props.change()
        } else {
            message.error(addUserRes.msg)

        }
    }

    const onFinish = (i) => {
    }


    return (
        <Modal title="新增用户"
            destroyOnClose
            show={props.show}
            change={props.change}
            ok={handleOk}
            text={
                <>
                    <Form
                        name="addUser"
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={{ 
                            region: props.regionsData[2],
                            role:props.roleData[2]
                        }}

                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                        >
                            <Input placeholder='账号最多由20位字符组成' type='text' onChange={(e) => NewUserData.username = e.target.value} />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="userpass"
                        >
                            <Input placeholder='密码最多由20位字符组成' type='password' onChange={(e) => NewUserData.password = e.target.value} />
                        </Form.Item>

                        <Form.Item
                            label="地区"
                            name="region"
                        >
                            <Select
                                style={{ width: 120 }}
                                onChange={(region) => NewUserData.region = region}
                                options={props.regionsData}
                            />
                        </Form.Item>


                        <Form.Item
                            label="用户角色"
                            name="role"
                        >
                            <Select
                                style={{ width: 120 }}
                                onChange={(roleID) => NewUserData.roleID = roleID}
                                options={props.roleData}
                            />
                        </Form.Item>
                    </Form>

                </>
            }
        >


        </Modal>
    )
}
