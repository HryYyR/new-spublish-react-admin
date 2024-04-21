import { Switch, Table, Popover, Button, message, Tree } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useState, useEffect, Children } from 'react'
import {
  getRoleList,
  deleteAssignRole,
  getAuthorityList,
  changeRoleAuthorityList,
  AddRole
} from '../../../http/api'
import { useLocation } from 'react-router'

import Descript from '../../compoments/Descriptions/Descriptions'
import Modal from '../../compoments/modal/modal'
import AddRoleDialog from './add-role-dialog'

import './index.scss'

export default function roleList() {
  let route = useLocation()   //当前路由信息

  // 角色数据 和 权限数据
  const [dataSource, setDataSource] = useState([])
  const [authDataSource, setAuthDataSource] = useState([])

  // 是否展示删除模态框
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [ToBeDeleteRole, setToBeDeleteRole] = useState()

  // 是否展示添加模态框
  const [showAddRoleModal, setShowAddRoleModal] = useState(false)

  // 是否展示编辑模态框
  const [showEditModal, setshowEditModal] = useState(false)

  // 当前打开的角色的 ID 和 rightList
  const [currentRoleRightList, setCurrentRoleRightList] = useState([])
  const [currentRoleId, setCurrentRoleId] = useState()



  useEffect(() => {
    getRolesources()
    getAuthority()
  }, [])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '类型',
      dataIndex: 'roleType',
      key: 'roleType',
    }, {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: '是否启用',
      key: 'use',
      render: (i) => {
        return (
          <>
            <Switch checked={i.use == 1 ? true : false} />
          </>
        )
      }
    },
    {
      title: '操作',
      key: 'operate',
      //不写dataIndex返回整个对象，写了就返回key
      render: (item) => {
        return (
          <>
            <Button
              type='primary'
              disabled={item.key == item.path}
              shape='circle' icon={<EditOutlined
                onClick={() => toSetRightList(item)}
              />} ></Button>
            <Button
              danger
              className='delete'
              disabled={item.key == item.path}
              shape='circle'
              onClick={() => toDeleteRole(item)}
              icon={<DeleteOutlined />} ></Button>
          </>
        )
      }
    }
  ]

  // 获取角色数据
  const getRolesources = async () => {
    let res = await getRoleList()
    let list = res.data.map(i => {
      i.fields.key = i.pk
      i.fields.rightList = JSON.parse(i.fields.rightList)
      return i.fields
    })
    setDataSource(list)
  }
  // 获取权限数据
  const getAuthority = async () => {
    let res = await getAuthorityList()
    let list = res.data.map(i => {
      i.fields.children && (i.fields.children = JSON.parse(i.fields.children))
      let ChildrenList = i.fields.children && i.fields.children.map(i => {
        return {
          title: i.name,
          key: i.key
        }
      })
      return {
        title: i.fields.name,
        key: i.pk,
        children: ChildrenList
      }
    })
    setAuthDataSource(list)
    // console.log(list);
  }

  // 打开删除模态框
  const toDeleteRole = (i) => {
    setShowDeleteModal(!showDeleteModal)
    setToBeDeleteRole(i.key)
  }
  // 切换删除模态框
  const changeDeleteRoleModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }
  // 删除角色(axios)
  const deleteRole = async () => {
    let res = await deleteAssignRole(ToBeDeleteRole)
    if (res.status == 200) {
      message.success('删除成功')
      getRolesources()
      changeDeleteRoleModal()
    } else {
      message.error('删除失败')
    }
  }

  // 打开编辑模态框
  const toSetRightList = (item) => {
    // console.log(item);
    setCurrentRoleRightList(item.rightList)
    setCurrentRoleId(item.key)

    changeEditRoleModal()
  }// 切换编辑角色模态框
  const changeEditRoleModal = () => {
    setshowEditModal(!showEditModal)
  }
  // 更新角色权限(axios)
  const changeRoleAuth = () => {
    // console.log(currentRoleRightList);
    changeRoleAuthorityList(currentRoleId, currentRoleRightList).then(res => {
      res.status == 200 ? message.success('修改成功') : message.error('修改失败')
      getRolesources()
      changeEditRoleModal()
    })
  }
  // 切换添加模态框
  const changeAddRoleModal = () => {
    setShowAddRoleModal(!showAddRoleModal)
  }
  // 添加角色(axios)
  const ToaddRole = (data) => {
    console.log(data);
    AddRole(data).then(res => {
      getRolesources()
    })

  }

  // 点击树中的子菜单时触发,返回选中的整个树
  const onCheckEditTree = (i) => {
    // console.log(i);
    setCurrentRoleRightList(i)
  }

  return (
    <>
      <div className='pageHeader'>
        <p className='title' >{route.pathname}</p>
        <Button type='primary' onClick={changeAddRoleModal}>添加角色</Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
      >

      </Table>

      <Modal
        title="删除角色"
        show={showDeleteModal}
        change={changeDeleteRoleModal}
        ok={deleteRole}
        text={<span>确定要删除吗?</span>}
      />

      <AddRoleDialog
        title="新增角色"
        show={showAddRoleModal}
        change={changeAddRoleModal}
        ok={ToaddRole}
        treeData={authDataSource}
      />


      <Modal
        title="编辑角色权限"
        show={showEditModal}
        change={changeEditRoleModal}
        text={
          <Tree
            treeData={authDataSource}
            autoExpandParent
            blockNode
            checkable
            showLine
            defaultExpandAll
            checkedKeys={currentRoleRightList}
            SelectedKeys={currentRoleRightList}
            onCheck={onCheckEditTree}
          ></Tree>}
        ok={changeRoleAuth}
      />
    </>
  )
}
