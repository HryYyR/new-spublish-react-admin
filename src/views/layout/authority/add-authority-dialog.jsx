import React, { useState, useEffect, useRef, GetDerivedStateFromProps, Children } from 'react'
import { Modal, Form, Input, Checkbox, Button, Descriptions,message } from 'antd';

import Descript from '../../compoments/Descriptions/Descriptions';


export default function addAuthorityDialog(props) {
    const [name, setname] = useState("")
    const [path, setpath] = useState("")

    const [showchildrenModal, setshowchildrenModal] = useState(false)  //是否显示子对话框
    const [childrenAuth, setchildrenAuth] = useState([])  //用户保存子权限数据
    const [childrenname, setchildrenname] = useState("")
    const [childrenpath, setchildrenpath] = useState("")



    const [num, setnum] = useState(1)


    const Cancel = () => {
        props.change()
    }

    // 主对话点点击确定触发
    const handleOk = () => {
        const list = {
            title: name,
            path: path,
            Children: JSON.stringify(childrenAuth)
        }
        if (name == '' || path == '') {
            message.error('信息填写有误!请检查后重试!')
            return

        }
        props.add(list)
        props.change()
    };

    // 子权限对话框点击确定触发
    const AddChildrenAuth = () => {
        setshowchildrenModal(false)
        childrenAuth.push({
            key: childrenpath,
            name: childrenname,
            path: childrenpath
        })
        setchildrenname("")
        setchildrenpath("")
        // setchildrenAuth(childrenAuth)
    }
    return (
        <>
            <Modal
                title="添加权限"
                open={props.show}
                onOk={handleOk}
                onCancel={Cancel}
                destroyOnClose
            >

                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="权限名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={name} onChange={(e) => setname(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="权限路径"
                        name="path"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input value={path} onChange={(e) => setpath(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="添加子权限"
                        name="ChildrenPath"
                    >
                        <Button type='primary' size='small' onClick={() => setshowchildrenModal(true)} >添加</Button>
                    </Form.Item>


                    {
                        childrenAuth.map(function (item, index) {
                            return (
                                <Descript key={index} index={index} name={item.name} path={item.path} />
                            )
                        })
                    }
                </Form>
            </Modal>


            <Modal
                title="添加子权限"
                open={showchildrenModal}
                onOk={AddChildrenAuth}
                onCancel={() => setshowchildrenModal(false)}
                destroyOnClose
            >
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="权限名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange={(e) => setchildrenname(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="权限路径"
                        name="path"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input onChange={(e) => setchildrenpath(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
