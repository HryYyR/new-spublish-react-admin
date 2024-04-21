import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { TeamOutlined, LaptopOutlined, NotificationOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';


import Layout from "../views/layout";
import Login from "../views/login/login";

import Home from "../views/layout/home";

// 用户管理
import UserList from "../views/layout/user/user-list";

// 权限管理
import RoleList from "../views/layout/authority/role-list";
import AuthorityList from "../views/layout/authority/authority-list";

// 新闻管理
import NewsWrite from "../views/layout/news/news-write"
import NewsDrafts from "../views/layout/news/news-draft"
import NewsSort from "../views/layout/news/news-sort";

// 审核管理
import ExamineList from "../views/layout/examine/examine-list";
import ExamineNews from "../views/layout/examine/examine-news";

// 发布管理
import ToBePublished from "./../views/layout/Publish/ToBePublished";
import Published from "./../views/layout/Publish/Published";
import PublishOver from "../views/layout/Publish/PublishOver";

import Error from "../views/error";

export const routers = createHashRouter([
    {
        path: '/', element: <Layout />, children: [
            {
                path: '/home',
                meta: {
                    title: '首页'
                },
                children: [
                    {
                        path: '/home/index',
                        element: <Home />,
                        index:true,
                        meta: {
                            title: '首页'
                        }
                    }
                ]
            },
            {
                path: '/User',
                meta: {
                    title: '用户管理'
                },
                children: [
                    {
                        path: '/User/UserList',
                        element: <UserList />,
                        meta: {
                            title: '用户列表',
                            icon: UserOutlined
                        }
                    }
                ]
            },
            {
                path: '/Authority',
                meta: {
                    title: '权限管理'
                },
                children: [
                    {
                        path: '/Authority/RoleList',
                        element: <RoleList />,
                        meta: {
                            title: '角色列表',
                            icon: TeamOutlined
                        }
                    },
                    {
                        path: '/Authority/AuthorityList',
                        element: <AuthorityList />,
                        meta: {
                            title: '权限列表',
                            icon: AppstoreOutlined
                        }
                    }
                ]
            },
            {
                path: '/News',
                meta: {
                    title: '报告管理'
                },
                children: [
                    {
                        path: '/News/WriteNews',
                        element: <NewsWrite />,
                        meta: {
                            title: '撰写报告',
                            icon: TeamOutlined
                        }
                    },
                    {
                        path: '/News/draft',
                        element: <NewsDrafts />,
                        meta: {
                            title: '草稿箱',
                            icon: AppstoreOutlined
                        }
                    },
                    {
                        path: '/News/sort',
                        element: <NewsSort />,
                        meta: {
                            title: '报告分类',
                            icon: AppstoreOutlined
                        }
                    }
                ]
            },
            {
                path: '/Examine',
                meta: {
                    title: '审核管理'
                },
                children: [
                    {
                        path: '/Examine/ExamineNews',
                        element: <ExamineNews />,
                        meta: {
                            title: '审核报告',
                            icon: TeamOutlined
                        }
                    },
                    {
                        path: '/Examine/List',
                        element: <ExamineList />,
                        meta: {
                            title: '审核列表',
                            icon: AppstoreOutlined
                        }
                    }
                ]
            },
            {
                path: '/Publish',
                meta: {
                    title: '发布管理'
                },
                children: [
                    {
                        path: '/Publish/ToBePublished',
                        element: <ToBePublished />,
                        meta: {
                            title: '待发布',
                            icon: TeamOutlined
                        }
                    },
                    {
                        path: '/Publish/Published',
                        element: <Published />,
                        meta: {
                            title: '已发布',
                            icon: AppstoreOutlined
                        }
                    },
                    {
                        path: '/Publish/PublishOver',
                        element: <PublishOver />,
                        meta: {
                            title: '已下线',
                            icon: AppstoreOutlined
                        }
                    }
                ]
            }

        ]
    },

    { path: '/login', element: <Login /> },
    {
        path: '*',
        element: <Error />
    }
])