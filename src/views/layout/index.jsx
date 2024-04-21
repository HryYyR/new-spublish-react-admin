import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, message } from 'antd';
import { BrowserRouter, useNavigate, Outlet } from 'react-router-dom';
import { routers } from '../../route';
import { useLocation } from 'react-router'
import './index.scss'
const { Header, Content, Sider } = Layout;

const App = (props) => {
  const navigate = useNavigate()//路由跳转
  let router = routers.routes[0].children   //全部路由信息
  let route = useLocation()   //当前路由信息

  let sidelist = router.map(
    (i, index) => {
      return {
        key: i.path,
        label: i.meta.title,
        children: i.children.map((j, index) => {
          return {
            key: j.path,
            label: j.meta.title,
            onClick: () => navigate(j.path)
          };
        }),
      };
    },
  );

  const currentKey = localStorage.getItem('currentKey') || sidelist[0].key;
  const currentTitleKey = localStorage.getItem('currentTitleKey') || sidelist[0].children[0].key;

  useEffect(() => {
    // console.log(params);
  }, [])

  // 设置当前路由为默认路由
  const setCurrentKey = (e) => {
    localStorage.setItem('currentKey', e.keyPath[1])
    localStorage.setItem('currentTitleKey', e.keyPath[0])
  }

  // 退出登录
  const outLogin = () => {
    navigate('/login');
    localStorage.removeItem('token')
    message.success('退出登录成功!')
  }

  return (
    <Layout style={{ height: "100vh", overflow: 'hidden' }} className='light'>
      <Header className="header">
        <div className='backLogin' onClick={outLogin} >退出登录</div>
      </Header>
      <Layout>
        <Sider width={200} style={{ height: '100%' }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={[currentKey]}
            defaultSelectedKeys={currentTitleKey}
            style={{ height: '100%', borderRight: 0, overflow: 'auto' }}
            items={sidelist}
            onClick={setCurrentKey}
          />
        </Sider>
        <Layout style={{ padding: '0' }}>
          <Content
            style={{
              padding: 24,
              margin: 10,
              minHeight: 280,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;