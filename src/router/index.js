import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        /*
          path: '/',
          name: 'Home',
          component: Home
          */
        path: '/',
        redirect: '/manageboard'
            //component: () => import( /* webpackChunkName: "manageboard" */ '../components/page/ManageBoard.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: {
            title: '登录'
        },
    },
    {
        path: '/signup',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../components/page/signup.vue'),
        meta: {
            title: '注册'
        },
    },
    {
        path: '/checkphone',
        component: () =>
            import ( /* webpackChunkName: "checkphone" */ '../components/page/CheckPhone.vue'),
        meta: {
            title: '身份验证'
        }
    },
    {
        path: '/forgetpassword',
        component: () =>
            import ( /* webpackChunkName: "forgetpassword" */ '../components/page/ForgetPassword.vue'),
        meta: {
            title: '忘记密码'
        }
    },
    {
        path: '/helloworld',
        component: () =>
            import ( /* webpackChunkName: "helloworld" */ '../components/HelloWorld.vue'),
        meta: {
            title: 'helloworld'
        }
    },
    {
        path: '/home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
        children: [{
                path: '/manageboard',
                component: () =>
                    import ( /* webpackChunkName: "manageboard" */ '../components/page/ManageBoard.vue'),
                meta: {
                    title: '系统首页'
                }
            },
            {
                path: '/Introduction',
                component: () =>
                    import ( /* webpackChunkName: "Introduction" */ '../components/page/Introduction.vue'),
                meta: {
                    title: '登录者详情'
                },
            },
            {
                path: '/table',
                component: () =>
                    // import ( /*webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    import ( /*webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: {
                    title: '基础表格'
                }
            },
            {
                path: '/role',
                component: () =>
                    import ( /*webpackChunkName: "role" */ '../components/page/RoleManage.vue'),
                    // import ( /*webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: '/form',
                component: () =>
                    import ( /*webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                meta: {
                    title: '表单编辑'
                }
            },
            {
                path: '/dictionary',
                component: () =>
                    // import ( /*webpackChunkName: "test1" */ '../components/page/DicManage'),
                    import ( /*webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: {
                    title: '字典'
                }
            },
            {
                path: '/test2',
                component: () =>
                    // import ( /*webpackChunkName: "test2" */ '../components/page/Cousemanage.vue'),
                    import ( /*webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: {
                    title: '课程管理'
                }
            },
            {
                path: '/test',
                component: () =>
                    // import ( /*webpackChunkName: "test" */ '../components/page/test.vue'),
                    import ( /*webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: {
                    title: '测试页面'
                }
            },
            {
                path: '/HelloWorld',
                component: () =>
                    // import ( /*webpackChunkName: "test" */ '../components/page/test.vue'),
                    import ( /*webpackChunkName: "test" */ '../components/HelloWorld.vue'),
                meta: {
                    title: 'HelloWorld'
                }
            },
            {
                path: '/testdetail',
                name: 'testdetailpage',
                component: () =>
                    import ( /*webpackChunkName: "testdetail" */ '../components/page/testDetail.vue'),
                meta: {
                    title: '测试详情页面'
                }
            },
            {
                path: '/dicdetail',
                name: 'dicdetailpage',
                component: () =>
                    import ( /*webpackChunkName: "testdetail" */ '../components/page/dicDetail.vue'),
                meta: {
                    title: '字典详情页面'
                }
            },
            {
                path: '/403',
                component: () =>
                    import ( /*webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: {
                    title: '403'
                }
            },
            {
                path: '/404',
                component: () =>
                    import ( /*webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: {
                    title: '404'
                }
            },
            // {
            //     path: '/tabs',
            //     component: () =>
            //         import ( /*webpackChunkName: "404" */ '../components/page/404.vue'),
            //     meta: {
            //         title: 'tabs'
            //     }
            // },
            {
                path: '/500',
                component: () =>
                    import ( /*webpackChunkName: "404" */ '../components/page/500.vue'),
                meta: {
                    title: '500'
                }
            },
            {
                path: '/customerror',
                component: () =>
                    import ( /*webpackChunkName: "404" */ '../components/page/CustomError.vue'),
                meta: {
                    title: '自定义异常页面'
                }
            }
        ]
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})



router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('token');
   
      if (token === 'null' || token === '') {
        next('/login');
      } else {
        next();
      }
    }
  });

export default router

