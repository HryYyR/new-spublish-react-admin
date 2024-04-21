import React, { useState, useEffect } from 'react'

import {
    Modal,
    Form,
    Input,
    Checkbox,
    Button,
    Select,
    TextArea,
    message,
    Upload,
    uploadButton
} from 'antd'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';


export default function PublishModal(props) {

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        // console.log('Success:', values);
        values['Cover']=imageUrl
        props.publish(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error("请检查后重试!")
    };

    const uploadCover = (info,event) => {
        console.log(info);
        let res = info.fileList[0].response
        if(res){
            setImageUrl(res.url)
        }

    }

    const uploadButton = (
        <div>
            {loading ? <UploadOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Modal
            title="发布报告"
            open={props.show}
            onCancel={props.change}
            footer={null}
        >

            <Form
                name="PublishModal"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ Sort: 'day' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="报告类型"
                    name="Sort"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={[
                            { value: 'day', label: '日报' },
                            { value: 'week', label: '周报' },
                            { value: 'month', label: '月报' },
                            { value: 'year', label: '年报', disabled: false },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="报告描述"
                    name="Describe"
                    rules={[{ required: true, message: '描述不能为空!' }]}
                >

                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="报告封面"
                >
                    <Upload
                        accept='image/png, image/jpeg, image/jpg'
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        action="http://localhost:8000/api/file"
                        method="POST"
                        onChange={uploadCover}
                        maxCount={1}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        发布
                    </Button>
                </Form.Item>

            </Form>

        </Modal>
    )
}
