import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Tag, Select, message, Popover, Switch } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { getAuthorityList, changeAssignAuthorityUse, deleteAssignAuthority, addAssignAuthority } from '../../../http/api';
import { useLocation } from 'react-router'

import AddAuthorityDialog from './add-authority-dialog';
import Modal from '../../compoments/modal/modal';
import "./index.scss"



export default function userinfo() {
  let route = useLocation()   //当前路由信息

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      render: (i) => {
        return (
          <Tag >{i}</Tag>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
    }, {
      title: '操作',
      key: 'operate',
      //不写dataIndex返回整个对象，写了就返回key
      render: (item) => {
        return (
          <>
            <Popover
              content={<Switch checked={item.use == '1' ? true : false} onChange={(state) => changeUseState(item.key, state)} ></Switch>}
              title="配置项"
              trigger={item.key == item.path ? '' : 'click'}>
              <Button
                type='primary'
                disabled={item.key == item.path}
                shape='circle' icon={<EditOutlined />} ></Button>
            </Popover>
            <Button
              danger
              className='delete'
              disabled={item.key == item.path}
              shape='circle'
              onClick={() => toDeleteAuth(item)}
              icon={<DeleteOutlined />} ></Button>
          </>
        )
      }
    }
  ];
  const [dataSource, setdataSource] = useState()  //权限列表
  const [loading, setloaing] = useState(true)    //加载中
  const [pageSize, setpageSize] = useState(3)   //每页数量
  const [pageSizeOptions, setpageSizeOptions] = useState([])

  const [showAddModal, setshowAddModal] = useState(false)  //是否显示添加权限对话框
  const [showDeleteModal, setshowDeleteModal] = useState(false)  //是否显示删除权限对话框
  const [currentDeleteId, setcurrentDeleteId] = useState(-1)

  const setOptions = () => {
    let arr = []
    for (let i = 1; i <= 20; i++) { arr.push({ value: i, label: i + '个' }) }
    setpageSizeOptions(arr)
  }

  useEffect(() => {
    getdata()
    setOptions()
  }, [])

  // 获取权限列表
  const getdata = () => {
    getAuthorityList().then(res => {
      if (res.data) {
        setdataSource(() => res.data.map((item) => {
          item.fields.key = item.pk
          item.fields.children = JSON.parse(item.fields.children)
          return item.fields
        }))
        setloaing(false)
      }
    })
  }

  // 删除指定权限
  const deleteAuthority = () => {
    deleteAssignAuthority(currentDeleteId).then(res => {
      // console.log(res);
      if (res.status != 200) return message.error(res.msg);
      getdata()
      toDeleteAuth()
      message.success('删除成功')
    })
  }

  // 增加权限
  const addAuthority = (data) => {
    addAssignAuthority(data).then(res => {
      if (res.status != 200) throw res.msg
      getdata()
      message.success(res.msg)

    }).catch(err => {
      message.error(err)
    })

  }

  // 切换use状态
  const changeUseState = (key, state) => {
    changeAssignAuthorityUse({
      id: key,
      newState: state ? '1' : '0'
    }).then(res => {
      if (res.status != 200) throw res.msg
      message.success(res.msg)
      getdata()
    }).catch(err => {
      message.error(err)
    })
  }

  // 切换删除对话框,如果传入item 将设置将被删除的id
  const toDeleteAuth = (item) => {
    setshowDeleteModal(!showDeleteModal)
    item && setcurrentDeleteId(item.key)
  }

  // 切换添加对话框
  const changeAuthorityModal = () => {
    setshowAddModal(!showAddModal)
  }

  return (
    <div >
      <div className='pageHeader'>
        <p className='title'> {route.pathname}</p>
        <Button type='primary' onClick={changeAuthorityModal} >添加权限</Button>

        <span className='pageSize' >每页数量：</span><Select
          title='每页数量'
          defaultValue={pageSize}
          style={{ width: 120 }}
          options={pageSizeOptions}
          onSelect={(i) => setpageSize(i)}
        />
      </div>
      <div className='authority' >
        <Table bordered loading={loading} columns={columns} dataSource={dataSource} pagination={{
          pageSize: pageSize
        }} />
      </div>

      <AddAuthorityDialog add={addAuthority} show={showAddModal} change={() => changeAuthorityModal()} />
      <Modal
        title="删除权限"
        text="你确定要删除吗？"
        ok={() => deleteAuthority(currentDeleteId)}
        show={showDeleteModal}
        change={() => setshowDeleteModal(!showDeleteModal)} />
    </div>
  )
}
