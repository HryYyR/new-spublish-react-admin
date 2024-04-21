import React from 'react'
import { Descriptions } from 'antd'
export default function Descript(props) {
    return (
        <>
            <Descriptions title={`子路由${parseInt(props.index)+1}`} bordered size="small"  >
                <Descriptions.Item label="唯一编号"  >{props.index+1}</Descriptions.Item>
                <Descriptions.Item label="名称：" >{props.name}</Descriptions.Item>
                <Descriptions.Item label="路径："  >{props.path}</Descriptions.Item>
            </Descriptions >
        </>
    )
}
