import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Switch, Tree, message } from 'antd'

import Modal from '../../compoments/modal/modal'

export default function addRoleDialog(props) {
    const [roleName, setroleName] = useState('')
    const [roleType, setRoleType] = useState('')
    const [use, setUse] = useState(true)
    const [roleauth, setRoleauth] = useState([])

    const [showSetAuthTree, setShowSetAuthTree] = useState(false)

    const handleOk = () => {
        let data = {
            roleName: roleName,
            roleType: roleType,
            use: use,
            rightList: roleauth
        }

        if (roleName == '' || roleType == '' || roleauth.length == 0) return message.error('信息填写有误!请检查后重试!');
        props.ok(data)
        props.change()
    }

    const changeSetAuthTreeModal = () => {
        setShowSetAuthTree(!showSetAuthTree)
    }

    const setAuthList = () => {
        changeSetAuthTreeModal(!showSetAuthTree)
    }

    return (
        <>
            <Modal
                title="新增角色"
                destroyOnClose
                show={props.show}
                change={props.change}
                ok={handleOk}
                text={<Form
                    name="addrole"
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="名称"
                        name="roleName"
                        rules={[{ required: true, message: '请填写角色名称!' }]}
                    >
                        <Input value={roleName} onChange={(e) => setroleName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="roleType"
                        rules={[{ required: true, message: '请填写角色类型!' }]}
                    >
                        <Input value={roleType} onChange={(e) => setRoleType(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="权限"
                        name="roleAuth"
                    >
                        <Button type='primary' onClick={changeSetAuthTreeModal} >设置权限</Button>
                    </Form.Item>
                    <Form.Item
                        label="默认是否启用"
                        name="use"
                    >
                        <Switch checked={use} onChange={(e) => setUse(!use)} />
                    </Form.Item>
                </Form>}
            />

            <Modal
                title="设置权限"
                destroyOnClose
                show={showSetAuthTree}
                change={changeSetAuthTreeModal}
                ok={changeSetAuthTreeModal}
                text={<Tree
                    treeData={props.treeData}
                    autoExpandParent
                    blockNode
                    checkable
                    showLine
                    defaultExpandAll
                    onCheck={(i) => setRoleauth(i)}
                />}
            />
        </>


    )
}
