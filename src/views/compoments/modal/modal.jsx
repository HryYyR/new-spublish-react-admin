import { Modal } from 'antd'
import React, { useState } from 'react'

export default function modal(props) {

    const onOk = (e,bool=true) => {
        props.ok()
    }

    return (
        <div>
            <Modal
                title={props.title}
                open={props.show}
                onOk={onOk}
                onCancel={() => props.change()}
                destroyOnClose={props.destroyOnClose}
                >
                {props.text}
                
            </Modal>
        </div>
    )
}
