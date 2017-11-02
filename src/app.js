/**
 * Created by Administrator on 2017/5/2.
 */
import Vue from 'vue'
// import VueResource from "vue-resource"
import VueRouter from "vue-router"
// import vScroll from "vue-scroll"
//import Mint from 'mint-ui';

import {vuePlugin} from "./libs/vuePlugin"
Vue.use(vuePlugin)

import {Swipe, SwipeItem,Cell,TabContainer, TabContainerItem  } from 'mint-ui';
import { Navbar, TabItem, Picker } from 'mint-ui';

//import 'weui'
//import weui from 'weui.js';

//Vue.use(Swipe)
//Vue.use(SwipeItem)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Cell.name, Cell);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Picker.name, Picker);

// Vue.use(VueResource);
Vue.use(VueRouter);
// Vue.use(vScroll) ;
//Vue.use(Mint);
//Vue.use(weui);

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
//通用样式、js引入
import "./libs/jquery-1.9.1.min"
import "./css/base.scss"
//import "./css/common.scss"
import 'mint-ui/lib/style.css';
import "./libs/weui.min.css"



import App from './views/App.vue'
import router from "./router/router"
import store from "./vuex/store"
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
