/**
 * Created by pc-20170420 on 2017/5/3.
 */
import VueRouter from "vue-router"

// const App = resolve => require(["../views/App.vue"],resolve)
import layout from "../views/layout.vue"
import home from "../views/home.vue" //首页
import zcb from "../views/zcb.vue" //首页
import tryout from "../views/tryout.vue" //投保页
const header = resolve => require(['../components/Header.vue'], resolve)
const login = resolve => require(['../views/login.vue'], resolve)
const dashboard = resolve => require(['../views/dashboard.vue'], resolve)
const register = resolve => require(['../views/register.vue'], resolve)
const payConfirm = resolve => require(['../views/payConfirm.vue'], resolve)
const paySuccess = resolve => require(['../views/paySuccess.vue'], resolve)
const agreement = resolve => require(['../views/agreement.vue'], resolve)
const protocol = resolve => require(['../views/protocol.vue'], resolve)
const zcbOrders = resolve => require(['../views/zcbOrders.vue'], resolve)
const guide = resolve => require(['../views/guide.vue'], resolve)
const setCompanyName = resolve => require(['../views/setCompanyName.vue'], resolve)
const setZcbChannel = resolve => require(['../views/setZcbChannel.vue'], resolve)
const recovery = resolve => require(['../views/recovery.vue'], resolve)
const paypassword = resolve => require(['../views/paypassword.vue'], resolve)
const price = resolve => require(['../views/price.vue'], resolve)
const claims = resolve => require(['../views/claims.vue'], resolve)
const protect = resolve => require(['../views/protect.vue'], resolve)
const about = resolve => require(['../views/about.vue'], resolve)
const article = resolve => require(['../views/article.vue'], resolve)
const artDetail = resolve => require(['../views/artDetail.vue'], resolve)
const ygb = resolve => require(['../views/ygb.vue'], resolve)
const ygbOrders = resolve => require(['../views/ygbOrders.vue'], resolve) // 员工保订单列表
const ygbOrderDetails = resolve => require(['../views/ygbOrderDetails.vue'], resolve) // 员工保订单详情
const ygbChangeFile = resolve => require(['../views/ygbChangeFile.vue'], resolve) //员工保上传变更书
const ygbPay = resolve => require(['../views/ygbPay.vue'], resolve) //支付页面
const ygbAdd = resolve => require(['../views/ygbAdd.vue'], resolve) // 员工保加人
const ygbChange = resolve => require(['../views/ygbChange.vue'], resolve) // 员工保换人页面

const homeBack = resolve => require(['../views/home-back.vue'], resolve)
const dashboardBack = resolve => require(['../views/user-back.vue'], resolve)
const zcbOrdersBack = resolve => require(['../views/zcbOrders-back.vue'], resolve)
const setAddress = resolve => require(['../views/setAddress.vue'], resolve)
const setMail = resolve => require(['../views/setMail.vue'], resolve)
const setTel = resolve => require(['../views/setTel.vue'], resolve)
const addAddress = resolve => require(['../views/addAddress.vue'], resolve)
const hongbao = resolve => require(['../views/hongbao.vue'], resolve)

export default new VueRouter({
    // mode: 'history',
    routes: [{
            path: '/',
            component: layout,
            children: [
                {
                    path: 'homeBack',
                    component: homeBack
                },
                {
                    path: '/zcb',
                    component: zcb
                },
                {
                    path: '/zcb/:alias',
                    component: zcb
                },
                {
                    path: '/ygb',
                    component: ygb
                },
                {
                    path: '/',
                    redirect:'home'
                }
            ]
        },
        {
            path: '/home',
            component: home,
            name: 'home',
        },
        {
            path: '/tryout',
            component: tryout,
            name: 'tryout',
        }, {
            path: '/header',
            component: header,
        }, {
            path: '/login',
            component: login,
        }, {
            path: '/dashboard',
            component: dashboard,
        }, {
            path: '/register',
            component: register,
            children: [{
                path: '/protocol',
                component: protocol
            }]
        }, {
            path: '/payConfirm',
            component: payConfirm
        }, {
            path: '/paySuccess',
            component: paySuccess,
            name: 'paySuccess'
        }, {
            path: '/agreement',
            component: agreement
        },
        {
            path: '/zcbOrders',
            component: zcbOrders,
            name: 'zcbOrders'
        }, {
            path: '/guide',
            component: guide
        }, {
            path: '/setCompanyName',
            component: setCompanyName
        }, {
            path: '/setZcbChannel',
            component: setZcbChannel
        }, {
            path: '/recovery',
            component: recovery
        }, {
            path: '/paypassword',
            component: paypassword
        }, {
            path: '/price',
            component: price
        }, {
            path: '/claims',
            component: claims
        }, {
            path: '/protect',
            component: protect
        }, {
            path: '/about',
            component: about
        }, {
            path: '/article',
            component: article
        }, {
            path: '/artDetail/:artId',
            component: artDetail

        }, {
            path: '/ygbOrders',
            name: 'ygbOrders',
            component: ygbOrders
        }, {
            path: '/ygbOrderDetails',
            name: 'ygbOrderDetails',
            component: ygbOrderDetails
        }, {
            path: '/ygbChangeFile',
            name: 'ygbChangeFile',
            component: ygbChangeFile
        }, {
            path: '/ygbAdd',
            name: 'ygbAdd',
            component: ygbAdd
        }, {
            path: '/ygbChange',
            name: 'ygbChange',
            component: ygbChange
        }, {
            path: '/ygbPay',
            name: 'ygbPay',
            component: ygbPay
        },
        {
            path: '/dashboardBack',
            component: dashboardBack,
            name: 'dashboardBack',
        },
        {
            path: '/zcbOrdersBack',
            component: zcbOrdersBack,
            name: 'zcbOrdersBack'
        },
        {
            path: '/setAddress',
            component: setAddress,
            name: 'setAddress'
        },
        {
            path: '/addAddress',
            component: addAddress,
            name: 'addAddress'
        },
        {
            path: '/setMail',
            component: setMail,
            name: 'setMail'
        },
        {
            path: '/setTel',
            component: setTel,
            name: 'setTel'
        },
        {
            path: '/hongbao',
            component: hongbao,
            name: 'hongbao'
        }
    ],

    // scrollBehavior(to, from, savedPosition) {
    //     // return 期望滚动到哪个的位置
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // }
})
