<template>
    <!--<scroll :data="banner">-->
    <div class="home">
        <div class="header">
            <div class="header-l" @click="toUser">
                <img src="../img/man-v3.jpg" alt="">
            </div>
            <div class="header-title">
                <img src="../img/logo-v3.jpg" alt="">聚保
            </div>
            <div class="header-r">
                <a href="tel:4008059680" style="font-size: 0"><img src="../img/phone-v3.jpg" alt=""></a>
            </div>
        </div>
        <div class="content">
            <div class="banner" ref="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item class="item" v-for="(item,index) in banner" :key="index">
                        <router-link class="item-a" :to="item.url"><img :src="item.img"/></router-link>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="headline">
                <span class="pic"><img src="../img/jubaohot-v3.png"  alt=""></span>
                <!--<span class="headline-new">最新</span>-->
                <font-lun class="font_lun_wrapper" :message="fontmes"></font-lun>
                <!--<i class="icon"><img src="../img/switch_iconed-v3.png" alt=""></i>-->
            </div>
            <div class="center">
                <div class="center-title fns16">
                    聚保精研
                </div>
                <div class="media">
                    <router-link to="/zcb" class="fs0" style="display: block">
                        <img class="media-pic" src="../img/zcb-banner-v3.jpg" alt="">
                    </router-link>
                    <div class="media-foot">
                        <div class="price red fns14">￥<span class="fns18">35</span>.00 <span class="glay">起</span></div>
                        <router-link class="btn" :to="token?'/tryout?status=1':'/login'">立即投保</router-link>
                        <router-link class="btn" :to="token?'/zcbOrders?type=unpaid':'/login'" >我的保单</router-link>
                        <router-link class="btn" to="/zcb">了解详情</router-link>
                    </div>
                </div>
                <div class="media">
                    <router-link to="/ygb" class="fs0" style="display: block">
                        <img class="media-pic" src="../img/ygb-banner-v3.jpg" alt="">
                    </router-link>
                    <div class="media-foot">
                        <div class="price red fns14">￥<span class="fns18">160</span>.00 <span class="glay">起</span></div>
                        <!--<router-link :to="token?'/ygbOrders':'/login'" class="btn" v-if="isWWW">在线换人</router-link>-->
                        <router-link :to="token?'/ygbOrders':'/login'" class="btn">换人加人</router-link>
                        <router-link :to="token?'/ygbOrders':'/login'" class="btn">我的保单</router-link>
                        <router-link to="/ygb" class="btn">了解详情</router-link>
                    </div>
                </div>
                <div class="media">
                    <a :href="$store.state.spbBackUrl+'index.html'" class="fs0" style="display: block">
                        <img class="media-pic" src="../img/spb-banner-v3.jpg" alt="">
                    </a>
                    <div class="media-foot">
                        <div class="price red fns14">￥<span class="fns18">1200</span>.00 <span class="glay">起</span></div>
                        <a :href="$store.state.spbBackUrl+'insured-create.html'" class="btn">立即投保</a>
                        <a :href="$store.state.spbBackUrl+'spbordersBack.html'" class="btn">我的保单</a>
                        <a :href="$store.state.spbBackUrl+'index.html'" class="btn">了解详情</a>
                    </div>
                </div>
                <div class="article">
                    <router-link to="/article" class="art-title fns16">
                        理赔案例
                        <span class="fns14">更多 <img src="../img/right.png" alt=""></span>
                    </router-link>
                    <a href="http://www.jubao56.com/m/#/artDetail/123" class="fs0">
                        <img class="media-pic" src="../img/picl-v3.jpg" alt="">
                    </a>
                    <a href="http://www.jubao56.com/m/#/artDetail/122" class="art-mes">
                        <p>协助物流企业保险事故索赔之老周夜奔记</p>
                        <p class="art-alt">4623阅读量</p>
                    </a>
                    <a href="http://www.jubao56.com/m/#/artDetail/124" class="art-mes">
                        <p>聚保协赔 | “天价”施救费，聚保帮你追回来！</p>
                        <p class="art-alt">1356阅读量</p>
                    </a>
                </div>
                <div class="article">
                    <router-link to="/article" class="art-title fns16">
                        老周解密
                        <span class="fns14">更多 <img src="../img/right.png" alt=""></span>
                    </router-link>
                    <a href="http://www.jubao56.com/m/#/artDetail/125" class="fs0">
                        <img class="media-pic" src="../img/picr-v3.jpg" alt="">
                    </a>
                    <a href="http://www.jubao56.com/m/#/artDetail/127" class="art-mes">
                        <p>一份买错的几率高达99%的物流平台合作物流保险</p>
                        <p class="art-alt">2265阅读量</p>
                    </a>
                    <a href="http://www.jubao56.com/m/#/artDetail/126" class="art-mes">
                        <p>老周解密——白白交钱的仓库保险</p>
                        <p class="art-alt">3576阅读量</p>
                    </a>
                </div>
            </div>
        </div>
        <tab></tab>
    </div>
    <!--</scroll>-->
</template>

<script>
    import Tab from './tab.vue'
    import FontLun from '../components/FontLun.vue'
    import {mapMutations,mapState} from "vuex"
    import { getToken } from '../libs/api'
    import { MessageBox } from 'mint-ui';
    const banner = [
        {url: '', img: require('../img/banner02-v4.jpg')},
        {url: '', img: require('../img/banner01-v3.jpg')},
        {url: 'hongbao', img: require('../img/banner02-v3.jpg')},
    ]
    const fontmes = [
        {mes:'聚保物流保险平台欢迎您！'},
        {mes:'聚保——守护3000万物流人的幸福生活！'},
        {mes:'因为天天投保  所以货物安全！'}
    ]
    export default {
        data (){
            return {
                banner,
                fontmes,
                isWWW: this.$store.state.isWWW,
            }
        },
        computed: {
          token(){
            let res;
            if(window.plus){
              plusReady();
            }else{
              document.addEventListener('plusready',plusReady,false);
            }
            function plusReady() {
              res =  getToken()
            }
            return  res;
          },
        },
        methods: {
            ...mapMutations({
                setStorage:'SETSTORAGE',
            }),
            toUser() {
                if(this.token){
                    this.$router.push("/dashboard")
                }else{
                    this.$router.push("/login")
                }
            },
            resize(){
                let deviceWidth = document.getElementsByTagName("body")[0].clientWidth;
                let scale = deviceWidth / 750;
                document.querySelector(".banner").style.height = 300 * scale + 'px';
            }
        },
        created(){
            // 保存默认渠道location参数  eg: ?product_type=3&alias=wlw
            let defaultChannelData = {};
            if(this.$route.query.product_type != undefined && this.$route.query.alias!= undefined ){
                defaultChannelData.product_type = this.$route.query.product_type*1;
                defaultChannelData.alias = this.$route.query.alias;
                this.setStorage({
                    registerDefault:defaultChannelData
                })
            }
            // localStorage 永久储存
//            var poppy = localStorage.getItem('homeAlert'); // 读取localStorage
//                if(!poppy){
//                    function PopUp(){
//                        MessageBox("尊敬的会员",
//                        "<div style='font-size:14px;text-align: left;'>" +
//                        "<div style='text-indent: 2rem;'><p>聚保移动端2.0新版首页上线！</p>" +
//                        "<p>1、首页直接进投保，更方便！</p>" +
//                        "<p>2、手机端实现员工保换人，更简单！</p>" +
//                        "<p>3、保险频道界面改版，体验更好！</p>" +
//                        "<p>如需帮助，请拨打聚保24小时服务热线：40080-59680</p></div></div>")
//                    }
//                    setTimeout(function(){
//                        PopUp();
//                    },500);
//                    localStorage.setItem('homeAlert','false'); // 设置localStorage
//                }
//            let homeAlert = { ifAlert:true };
//            if(window.sessionStorage.getItem("jubao56")!=null){
//                homeAlert = JSON.parse(window.sessionStorage.getItem("jubao56")).homeAlert;
//                if(typeof homeAlert !="undefined"){
//                    homeAlert.ifAlert = false;
//                }
//            }
            // session 临时会话储存
//            if(homeAlert.ifAlert == true){
//                // 新版提示
//                MessageBox("尊敬的会员",
//                    "<div style='font-size:14px;text-align: left;'>" +
//                    "<div style='text-indent: 2rem;'><p>聚保移动端2.0新版首页上线！</p>" +
//                    "<p>1、首页直接进投保，更方便！</p>" +
//                    "<p>2、手机端实现员工保换人，更简单！</p>" +
//                    "<p>3、保险频道界面改版，体验更好！</p>" +
//                    "<p>如需帮助，请拨打聚保24小时服务热线：40080-59680</p></div></div>")
//                // 存session避免重复弹框
//                this.setStorage({
//                    homeAlert: {
//                        ifAlert:false
//                    }
//                })
//            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.resize();
            })
//            window.onresize=()=>{
//                this.resize()
//            }
        },
        components:{
            Tab,
            FontLun
        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/home-back.scss";
    @import "../font/iconfont.css";
</style>
