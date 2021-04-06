import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
// export const constantRouterMap = [
const router = new Router({
    base: '/',
    mode: 'history', //去除#
    // mode: 'hash',
    routes: [
        { path: '/', redirect: '/login', hidden: true },
        {
            path: '/login',
            // redirect: '/login',
            component: () =>
                import ('@/views/login/index'),
            hidden: true,
        },
        {
            path: '/signup',
            component: () =>
                import ('@/views/login/signup'),
            hidden: true,
        },
        {
            path: '/forgetPassword',
            component: () =>
                import ('@/views/login/forgetPassword'),
            hidden: true,
        },
        {
            path: '/404',
            component: () =>
                import ('@/views/errorPage/404'),
            hidden: true
        },
        {
            path: '/403',
            component: () =>
                import ('@/views/errorPage/403'),
            hidden: true
        },
        {
            path: '/500',
            component: () =>
                import ('@/views/errorPage/500'),
            hidden: true
        },
        {
            path: '/error',
            component: () =>
                import ('@/views/errorPage/error'),
            hidden: true
        },
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            name: 'Home',
            roles: "common",
            children: [{
                path: 'home',
                component: () =>
                    import ('@/views/home/index'),
                name: 'home',
                meta: { title: '首页', icon: 'el-icon-s-home', noCache: true }
            }]
        },
        {
            path: '/',
            component: Layout,
            redirect: '/information',
            name: 'information',
            isShow: false,

            children: [{
                path: 'information',
                component: () =>
                    import ('@/views/information/index'),
                name: 'information',
                meta: { title: '个人信息', icon: 'dashboard', noCache: false },

            }]
        },
    ]

})


// 未登陆过滤路由
const whiteList = ['/login']; //不需要登录能访问的path
var qq = false; // 页面刷新货初次加载 才会执行这个变量
router.beforeEach((to, from, next) => {
    // console.log('beforeEach');
    if (!qq) {
        qq = true; // 先让他变 true 不然跳转页面时会死循环
        // 拿到数据后 就是把数据push到父组件里
        //  util.extendRouters 自己写的方法
        console.log("aa")
        routerGo();

        next(to.path);
    }
    var isLogin = JSON.parse(localStorage.getItem('isLogin')); //获取缓存看是否登录过
    var time = localStorage.getItem('loginTime');
    var nowTime = new Date().getTime();
    let token = localStorage.getItem('Authorization');

    if (whiteList.indexOf(to.path) < 0) { //访问了需要登录才能访问的页面
        if (isLogin === true && nowTime <= time + 2592000000 && token != null && token != '') { //登录过来直接进去，30天内登录不需要重新登录
            next();
        } else {
            if (to.path == '/login' || to.path == '/signup' || to.path == '/forgetPassword') {
                next();
            } else {
                if (token === null || token === '') {
                    next('/login');
                } else {
                    next();
                }
            }
        }
    } else {
        next();
    }

});

function routerGo() {
    var data = [{
            icon: "el-icon-set-up",
            name: "角色管理",
            roles: "superAdmin",
            url: "/roleManage",
            children: [{
                name: "权限分配",
                url: "/permissionAssignment"
            }, {
                name: "角色分配",
                url: ""
            }]
        },
        {
            icon: "el-icon-user-solid",
            name: "用户管理",
            roles: "admin",
            url: "/userManage"
        },
        {
            icon: "el-icon-menu",
            name: "菜单管理",
            roles: "superAdmin",
            url: "/menuManage"
        },
        {
            icon: "el-icon-reading",
            name: "数据字典",
            roles: "superAdmin",
            url: "/dataDictionary",
            children: [{
                name: "数据字典管理",
                url: "/addDictionary"
            }]
        },
        {
            icon: "el-icon-folder-opened",
            name: "系统管理",
            roles: "common",
            // url: "/404"
            url: "/systemManage"
        },
        {
            icon: "el-icon-s-flag",
            name: "学校管理",
            roles: "common",
            // url: "/403"
            url: "/schoolManage",
        },
        {
            icon: "el-icon-school",
            name: "班课管理",
            roles: "common",
            // url: "/500"
            url: "/courseManage",
        }
    ]
  console.log(localStorage.getItem('menuList'))
      //  if (localStorage.getItem('menuList') == null || localStorage.getItem('menuList') === undefined) {
       console.log("ss")
        localStorage.setItem("menuList", JSON.stringify(data));
        console.log("666")
    // }
    var menuList = JSON.parse(localStorage.getItem('menuList'));
    console.log(menuList)
    if (menuList != null) {
        for (var i = 0; i < menuList.length; i++) {
            // 创建路由配置
            let url = menuList[i].url;
            var route = {
                path: '/',
                component: Layout,
                redirect: menuList[i].url,
                roles: menuList[i].roles,
                name: menuList[i].url.replace(/^\//, ''),
                children: [{
                    path: menuList[i].url.replace(/^\//, ''),
                    component: () =>
                        import ('@/views' + url + '/index'),
                    name: menuList[i].url.replace(/^\//, ''),
                    meta: { icon: menuList[i].icon, title: menuList[i].name }
                }]
            };
            router.options.routes.push(route)
            if (menuList[i].children) {
                for (var j = 0; j < menuList[i].children.length; j++) {
                    let curl = menuList[i].children[j].url
                    if (curl) {
                        var routeChild = {
                            path: menuList[i].url,
                            component: Layout,
                            isShow: false,
                            meta: {
                                title: menuList[i].name
                            },
                            roles: "superAdmin",
                            name: menuList[i].url.replace(/^\//, '') + "1",
                            children: [{
                                path: menuList[i].children[j].url.replace(/^\//, ''),
                                component: () =>
                                    import ('@/views' + url + curl),
                                name: menuList[i].children[j].url.replace(/^\//, ''),
                                meta: { title: menuList[i].children[j].name }
                            }]
                        };
                        router.options.routes.push(routeChild);
                    }
                }
            }
        }
    }
    router.addRoutes(router.options.routes)
}


// export default new Router({
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRouterMap,
//     mode: 'history', //去除#
// })
export default router
