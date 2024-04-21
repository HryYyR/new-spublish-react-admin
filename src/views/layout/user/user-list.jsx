import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { Button, Switch, Table, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import {
  getUserInfo,
  deleteAssignUser,
  getRegions,
  getRoleList,
  getAssignUserData
} from '../../../http/api';

import Modal from '../../compoments/modal/modal';

import AddUserDialog from './add-user-dialog';
import EditUserDialog from './edit-user-dialog';

export default function usergrade() {
  const route = useLocation()
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(5)

  const [userInfoSource, setUserInfoSource] = useState([])
  const [regionSource, setRegionSource] = useState([])
  const [roleSource, setRoleSource] = useState([])

  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showEditUserModal, setShowEditUserModal] = useState(false)

  const [toBeDeleteUserKey, setToBeDeleteUserKey] = useState(null)

  const [currentUserId, setCurrentUserId] = useState(0)
  const [currentUserInfo, setCurrentUserInfo] = useState([])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      render: (text, record) => {
        let res = ''
        regionSource.forEach(i => i.value == text && (res = i.title))
        return res
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '角色类型',
      dataIndex: 'roleID',
      key: 'roleID',
      render: (text, record) => {
        let res = ''
        roleSource.forEach((role) => role.value == text && (res = role.label))
        return res
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: '启用',
      dataIndex: 'UsersUse',
      key: 'UsersUse',
      render: (i) => {
        return (
          <Switch checked={i} />
        )
      }
    }
    , {
      title: '操作',
      key: 'operate',
      //不写dataIndex返回整个对象，写了就返回key
      render: (item) => {
        return (
          <>
            <Button
              type='primary'
              disabled={!item.default}
              shape='circle' icon={<EditOutlined />}
              onClick={() => changeEditUserModal(item.key)}
            ></Button>
            <Button
              danger
              className='delete'
              shape='circle'
              disabled={!item.default}
              onClick={() => changeDeleteUserModal(item.key)}
              icon={<DeleteOutlined />} ></Button>
          </>
        )
      }
    }
  ];

  useEffect(() => {
    getUserSource()
    getregionSource()
    getroleSource()
  }, [])

  // 获取用户数据
  const getUserSource = async () => {
    let res = await getUserInfo()
    setUserInfoSource(res.data)
    setLoading(false)

  }
  // 获取地区数据
  const getregionSource = async () => {
    const res = await getRegions()
    setRegionSource(res.data.map(i => { i.fields.value = i.pk; i.fields.label = i.fields.title; return i.fields }))
  }

  // 获取角色数据
  const getroleSource = async () => {
    const res = await getRoleList()
    setRoleSource(res.data.map(i => { return { value: i.fields.roleType, label: i.fields.roleName } }))
  }

  // 切换添加用户模态框
  const changeShowAddUserModal = () => {
    setShowAddUserModal(!showAddUserModal)
  }

  // 切换删除用户模态框
  const changeDeleteUserModal = (key) => {
    key && setToBeDeleteUserKey(key)
    setShowDeleteUserModal(!showDeleteUserModal)
  }

  // 切换编辑用户模态框
  const changeEditUserModal = async (key) => {
    key && setCurrentUserId(key)
    if (key) {
      let res = await getAssignUserData(key)
      if (res.status == 200) {
        message.success(res.msg);
        setCurrentUserInfo(res.data.map(user => {
          user.fields.key = user.pk;
          regionSource.forEach(i => i.value == user.fields.region && (user.fields.regionName = i.label))
          roleSource.forEach(i => i.value == user.fields.roleID && (user.fields.roleName = i.label))
          return user.fields
        }))
      }
      else {
        message.error(res.msg)
      }
    }

    setShowEditUserModal(!showEditUserModal)
  }

  // const getAssignUserData = (key) => {

  // }

  // 删除用户
  const deleteUser = async () => {
    let deleteRes = await deleteAssignUser(toBeDeleteUserKey)
    deleteRes.status == 200 ? message.success(deleteRes.msg) : message.error(deleteRes.msg)
    changeDeleteUserModal()
    getUserSource()
  }

  return (
    <>
      <div className='pageHeader'>
        <p className='title'> {route.pathname}</p>
        <Button type='primary' onClick={changeShowAddUserModal} >添加用户</Button>

      </div>
      <div className='' >
        <Table bordered loading={loading} columns={columns} dataSource={userInfoSource} pagination={{
          pageSize: pageSize
        }} />
      </div>

      <AddUserDialog
        RefreshData={getUserSource}
        roleData={roleSource}
        regionsData={regionSource}
        show={showAddUserModal}
        change={changeShowAddUserModal} />

      <Modal
        title="删除用户"
        show={showDeleteUserModal}
        change={changeDeleteUserModal}
        ok={deleteUser}
        text={<span>确定要删除吗?</span>}
      />

      <EditUserDialog
        RefreshData={getUserSource}
        roleData={roleSource}
        regionsData={regionSource}
        show={showEditUserModal}
        change={changeEditUserModal}
        userData={currentUserInfo}
      />

    </>
  )
}
