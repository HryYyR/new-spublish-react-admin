import React from 'react'
import Modal from '../../compoments/modal/modal'

import { useEffect, useState } from 'react'
import { Form, Input, Select, Switch, message } from 'antd'

import { updateAssignUser } from '../../../http/api/index'

export default function editUserDialog(props) {


    const [currentUserInfo, setCurrentUserInfo] = useState(props.userData[0])

    const handleOk = async () => {
        // console.log(currentUserInfo);
        if (currentUserInfo.password == '') {
            message.error('信息填写有误!请检查后重试!')
            return
        }
        currentUserInfo.UsersUse = currentUserInfo.UsersUse ? 1 : 0
        currentUserInfo.default = currentUserInfo.default ? 1 : 0
        let res = await updateAssignUser(currentUserInfo)
        console.log(res);
        if (res.status == 200) {
            message.success(res.msg)
            props.RefreshData()

        } else {
            message.error(res.msg)
        }
        props.change()
    }

    const onFinish = () => {

    }

    useEffect(() => {
        // console.log(props.userData);
        setCurrentUserInfo(props.userData[0])
    }, [props.userData])


    return (
        <>
            <Modal
                title="修改用户信息"
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
                            initialValues={props.userData[0]}

                        >
                            <Form.Item
                                label="用户名"
                                name="username"

                            >
                                <Input disabled placeholder='账号最多由20位字符组成' type='text' onChange={(e) => currentUserInfo.username = e.target.value} />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                            >
                                <Input placeholder='密码最多由20位字符组成' type='text' onChange={(e) => currentUserInfo.password = e.target.value} />
                            </Form.Item>

                            <Form.Item
                                label="地区"
                                name="regionName"
                            >
                                <Select
                                    style={{ width: 120 }}
                                    onChange={(region) => currentUserInfo.region = region}
                                    options={props.regionsData}
                                />
                            </Form.Item>


                            <Form.Item
                                label="用户角色"
                                name="roleName"
                            >
                                <Select
                                    style={{ width: 120 }}
                                    onChange={(roleID) => currentUserInfo.roleID = roleID}
                                    options={props.roleData}
                                />
                            </Form.Item>

                            <Form.Item
                                label="是否启用"
                                name="UsersUse"
                                valuePropName="checked"
                            >
                                <Switch onChange={(UsersUse) => currentUserInfo.UsersUse = UsersUse} />
                            </Form.Item>
                        </Form>
                    </>
                }
            >
            </Modal>
        </>
    )
}
