<template>
    <!--<scroll :data="banner">-->
        <div class="home">
            <mt-swipe class="banner" :auto="4000">
                <mt-swipe-item v-for="(item,index) in banner" :key="index"><router-link :to="item.url"><img class="ban_img" :src="item.img"/></router-link> </mt-swipe-item>
            </mt-swipe>
            <article class="artic">
                <div class="mainBox">
                    <div class="part m_p1">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b1.png" alt=""></div>
                            <div class="d_list">
                                <ul class="clearfix">
                                    <li>
                                        <img src="../img/d_l1.png" alt="">
                                    </li>
                                    <li>
                                        <img src="../img/d_l2.png" alt="">
                                    </li>
                                    <li class="last" >
                                        <img src="../img/d_l3.png" alt="">
                                    </li>
                                    <li>
                                        <img src="../img/d_l4.png" alt="">
                                    </li>
                                    <li>
                                        <img src="../img/d_l5.png" alt="">
                                    </li>
                                    <li class="last">
                                        <img src="../img/d_l6.png" alt="">
                                    </li>
                                </ul>
                                <div class="button">
                                    <router-link to="/zcb">点击见证奇迹</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="part m_p2">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b2.png" alt=""></div>
                            <div class="m_p2Form">
                                <div class="main" style="padding-top: 0.25rem;padding-bottom: 1rem;">
                                    <div class="baofei">
                                        <div class="b_con tj_con">
                                            <div class="b_list">
                                                <div class="b_left">运输路线</div>
                                                <div class="b_right">
                                                    <div class="selects">
                                                        <select class="sel_1" id="begin_province_sel"
                                                                v-model="startProvince">
                                                            <option v-for="(val,idx) in dataListStart"
                                                                    :value="val.value"
                                                            >
                                                                {{val.label}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="selects">
                                                        <select class="sel_1" id="begin_city_sel"
                                                                v-model="startCity">
                                                            <option v-for="(val,idx) in citys_start"
                                                                    :value="val.value"
                                                                    :selected="idx == 0 ?true:false"
                                                            >
                                                                {{val.label}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="clear"></div>
                                            </div>
                                            <div class="b_list">
                                                <div class="b_left">至</div>
                                                <div class="b_right">
                                                    <div class="selects">
                                                        <select class="sel_1" id="end_province_sel"
                                                                v-model="endProvince">
                                                            <option v-for="(val,idx) in dataListEnd" :value="val.value">
                                                                {{val.label}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="selects">
                                                        <select class="sel_1" id="end_city_sel"
                                                                v-model="endCity">
                                                            <option v-for="(val,idx) in citys_end"
                                                                    :value="val.value" :selected="idx==0?true:false"
                                                            >
                                                                {{val.label}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="clear"></div>
                                            </div>
                                            <div class="b_list">
                                                <div class="b_left">里程</div>
                                                <div class="b_right">
                                                    <strong class="blue" id="distance" :class="'distanceClass'+countDistance">
                                                        {{distanceFlag}}
                                                    </strong>公里
                                                </div>
                                                <div id="container" style="display:none;"></div>
                                                <div class="clear"></div>
                                            </div>
                                            <div class="b_list">
                                                <div class="b_left">赔偿限额</div>
                                                <div class="b_right check_bg clearfix">
                                                    <label @click="coverage=1500000">
                                                        <input value="1500000" type="radio" v-model="coverage">
                                                        <span :class="coverage==1500000?'on':''"></span><strong>150万</strong>
                                                    </label>
                                                    <label @click="coverage=500000">
                                                        <input value="500000" type="radio" v-model="coverage">
                                                        <span :class="coverage==500000?'on':''"></span><strong>50万</strong>
                                                    </label>

                                                    <div class="clear"></div>
                                                </div>

                                                <div class="b_list">
                                                    <div class="b_left">保费金额</div>
                                                    <div class="b_right">
                                                        <strong class="yellow" id="price">{{coverageFlag}}</strong>元
                                                        <span style="color:#ff7300;" id="price_rate"></span>
                                                    </div>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                            <div>&nbsp;</div>
                                            <div class="clearfix p_bt">
                                                <a class="bt01" href="javascript:void(0);" @click="tryout">立 即 试 用</a>
                                                <a class="bt02" href="javascript:void(0);" @click="useRightNow">马 上 投 保</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="part m_p3">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b3.png" alt=""></div>
                            <div class="md_03">
                                <div class="tt">中国物流保险第一自媒体</div>
                                <div class="md_box">
                                    <div class="md_info">
                                        <em>老周解密物流保险:</em>
                                        <span>致力于让物流企业</span>
                                        <i>投保不上当 理赔有人帮</i>
                                    </div>

                                    <div class="md_br">
                                        <div class="mb">
                                            22期节目,已经帮助<em>60万</em>物流人
                                            次获得物流保险知识
                                        </div>
                                        <div class="clearfix mb_2">
                                            <p>投保之前查一查从此放心买保险</p>
                                            <router-link class="check-more" to="/article">查一查</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="part m_p4">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b4.png" alt=""></div>
                            <div class="md_04">
                                <div class="tt">永远免费的物流保险投保、理赔咨询中心</div>
                                <div class="xd_box">
                                    <div class="xd_info">
                                        <i><span>投保怕被忽悠</span> 请致电我们</i>
                                        <i><span>理赔怕被欺负</span> 请致电我们</i>
                                    </div>

                                    <div class="xd_br">
                                        <div class="xb">
                                            我们承诺，无论您是不是我们的会员，都耐心解答您的一切物流保险问题。<br><span>会员企业更可享受包打官司的保险理赔服务。</span>

                                        </div>
                                        <div class="clearfix xb_2">
                                            <router-link class="check-more" to="/claims">点击查看</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p_bt4">
                            <em>免费咨询热线：</em>40080-59680
                        </div>
                    </div>
                    <div class="part m_p5">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b5.png" alt=""></div>
                            <div class="wd_05">
                                <div class="tt">聚保物流 最懂物流的保险服务机构</div>
                                <div class="wd_box">
                                    <div class="wd_info">
                                        <i>站在物流行业立场的保险专家</i>
                                        <em>中国最好的物流保险第三方服务机构</em>
                                    </div>

                                    <div class="clearfix wd_br">
                                        <div class="fl wb">
                                            <ul>
                                                <li>
                                                    <em><img src="../img/pic0.png" alt=""></em>
                                                    <i>14年</i>
                                                    <span>保险从业经历</span>
                                                </li>
                                                <li>
                                                    <em><img src="../img/pic0.png" alt=""></em>
                                                    <i>7年</i>
                                                    <span>物流行业保险服务经验</span>
                                                </li>
                                                <li>
                                                    <em><img src="../img/pic0.png" alt=""></em>
                                                    <i>1000家+</i>
                                                    <span>物流企业享受过我们的服务</span>
                                                </li>
                                                <li>
                                                    <em><img src="../img/pic0.png" alt=""></em>
                                                    <i>1000件+</i>
                                                    <span>物流保险索赔经验</span>
                                                </li>
                                                <li>
                                                    <em><img src="../img/pic0.png" alt=""></em>
                                                    <i>60万+</i>
                                                    <span>物流人获得我们的保险知识</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="fr more">
                                            <a class="logo" href="#"><img :src="$store.state.homeKnowMore" alt=""></a>
                                            <div class="clearfix xb_2">
                                                <router-link class="check-more" to="/about">点击了解</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p_bt4">
                            <em>免费咨询热线：</em>40080-59680
                        </div>
                    </div>
                    <div class="part m_p6">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b6.png" alt=""></div>
                            <div class="pd_06">
                                <div class="tt">
                                    30场全国物流论坛、峰会演讲<br>
                                    把物流保险知识带到物流企业身边
                                </div>
                                <div class="pd_box">
                                    <img src="../img/activity_photo.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="part m_p7">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b7.png" alt=""></div>
                            <div class="pd_07">
                                <ul class="clearfix">
                                    <li><a href="#"><img src="../img/link_01.jpg" alt=""></a></li>
                                    <li><a href="#"><img src="../img/link_02.jpg" alt=""></a></li>
                                    <li class="last"><a href="#"><img src="../img/link_03.jpg" alt=""></a></li>
                                    <li><a href="#"><img src="../img/link_04.jpg" alt=""></a></li>
                                    <li><a href="#"><img src="../img/link_05.jpg" alt=""></a></li>
                                    <li class="last"><a href="#"><img src="../img/link_06.jpg" alt=""></a></li>
                                    <li><a href="#"><img src="../img/link_07.jpg" alt=""></a></li>
                                    <li><a href="#"><img src="../img/link_08.jpg" alt=""></a></li>
                                    <li class="last"><a href="#"><img src="../img/link_09.jpg" alt=""></a></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="part m_p8">
                        <div class="w01">
                            <div class="title"><img src="../img/t_b8.png" alt=""></div>
                            <div class="pd_08">
                                <div class="tt">三十多家物流合作伙伴一起致力于让物流企业买到放心的保险</div>

                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    <!--</scroll>-->
</template>

<script>
    import {mapMutations,mapState} from "vuex"
    //import { Swipe, SwipeItem } from 'mint-ui';
    import banner1 from '../img/banner_5.jpg';
    import banner2 from '../img/banner_4m.jpg';
    import banner3 from '../img/banner_guide.jpg';
    import banner4 from '../img/banner_ygb1.png';
    import banner5 from '../img/banner_m.jpg';

//    import Scroll from '../components/scroll.vue';
    import { MessageBox } from 'mint-ui';
    export default {
        data(){
            return {
                banner:[{
                    "img":banner1,
                    "url":"/"
                },{
                    "img":banner2,
                    "url":"/zcb"
                },{
                    "img":banner3,
                    "url":"/guide"
                },{
                    "img":banner4,
                    "url":"/ygb"
                },{
                    "img":banner5,
                    "url":"/claims"
                }],
                bannerUrl:['/zcb','/zcb','/zcb','/zcb','/zcb'],
                dataListStart:this.$store.getters.dataList,    //出发--省市联动数据源
                startProvince:this.$store.getters.dataList[0].value,  //出发省份
                startCity:"未选择",  //出发城市
                citysAllStart:"",      //出发--随省份而变化的城市集合

                dataListEnd:this.$store.getters.dataList,    //到达--省市联动数据源
                endProvince:this.$store.getters.dataList[0].value,  //到达省份
                endCity:"未选择",  //到达城市
                citysAll_end:"",      //到达--随省份而变化的城市集合

                distanceFlag:"--",        //显示运输距离-用计算属性完成
                coverage:'1500000',
                coverageFlag:"--",

                wFlag:false,         //聚保整车保主要保险条件和费率
                zcbout1Flag:false,
            }
        },
        computed:{
            ...mapState(['token','cookie']),
            citys_start:function () {    //出发 ---- 随省份变化而变化的城市集合
                var that=this;
                this.citysAllStart=this.dataListStart.filter(function (item) {
                    return item.value == that.startProvince;
                })[0].children;
                this.startCity=this.citysAllStart[0].value;
                return this.citysAllStart
            },
            citys_end:function () {  //到达 ---- 随省份变化而变化的城市集合
                var that=this;
                this.citysAll_end=this.dataListEnd.filter(function (item) {
                    return item.value == that.endProvince;
                })[0].children;
                this.endCity=this.citysAll_end[0].value;
                return this.citysAll_end
            },
            countDistance:function(){
                if(this.startProvince == "未选择" || this.startCity == "未选择" ||
                    this.endProvince == "未选择" || this.endCity == "未选择"
                ){
                    this.distanceFlag="--";
                }else{
                    var _this=this;
                    this.$store.state.axios({
                        method:"get",
                        url:this.$store.state.zcbUrl+"/v1/zcb/order/price",
                        params:{
                            start_province:this.startProvince,
                            start_city:this.startCity,
                            end_province:this.endProvince,
                            end_city:this.endCity,
                            coverage:this.coverage*1
                        }
                    }).then(function (response) {
                        console.log(response.data);  //console.log正常获取到返回值
                        if(response.data.err_code == 1103){
                            _this.distanceFlag="--";
                            _this.coverageFlag="--"
//                            alert("记录未找到")
                        }else if (response.data.err_code ==0) {
                            _this.distanceFlag=response.data.data.distance;
                            _this.coverageFlag = response.data.data.price/100;
                        }else{
                            alert("未知错误")
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }
        },
        methods:{
            ...mapMutations({
                getCookie:'GETCOOKIE',
                removeFs:'REMOVEFS',
                setStorage:'SETSTORAGE',
            }),
            clearSec(){//清空session里面的listId
                let key = "jubao56";
                let beforeMsg = JSON.parse(window.sessionStorage.getItem("jubao56"));
                if(beforeMsg){
                    if(beforeMsg.listId){
                        beforeMsg.listId = null;
                        window.sessionStorage.setItem(key,JSON.stringify(beforeMsg))
                    }
                }
            },
            tryout(){
                this.clearSec();
                this.$router.push("/tryout?status=0");
            },
            useRightNow(){
                //检测cookie，有登录则检测是否填写了公司名称--投保页面，没有则进入登录页面
//                this.$router.push('/tryout?status=1');
                let _this=this;
                this.getCookie(this.$store.state.jubao_user);
                if(this.token){
                    //查询用户详细信息,检测是否有公司名称
                    this.$store.state.axios({
                        method:"GET",
                        url:this.$store.state.cmnUrl+"/v1/cmn/user/info",
                        headers:{'Authorization':'Bearer ' + this.token},
                    }).then(function (response) {
//                        console.log(response.data);  //console.log正常获取到返回值
                        let companyId = response.data.data.company_id;
                        let payPassword = response.data.data.pay_password
                        if(companyId==0 ){
                            alert("请设置公司名称");
                            _this.$router.push("/dashboard");
                        }else{
                           //检测是否同意整车保协议
                            _this.$store.state.axios({
                                method:"GET",
                                url:_this.$store.state.zcbUrl+"/v1/zcb/agreement/list",
                                headers:{'Authorization':'Bearer ' + _this.token},
                            }).then(function (response) {
                                console.log(response.data);  //console.log正常获取到返回值
//                                console.log("========整车保协议=========")
                                let list0 = response.data.data[0];//主要保险条件提示"
                                let list1 = response.data.data[1];//"主要保障范围提示"
                                let list2 = response.data.data[2];//"主要不赔事项提示"
                                let list3 = response.data.data[3];//"主要不保货物提示"
                                let list4 = response.data.data[4];//"整车保协议"
                                if(list4.signed && list0.signed  && list1.signed  && list2.signed  && list3.signed ){//签署过整车保协议，则跳转到投保页
                                    _this.clearSec();
                                    _this.$router.push('/tryout?status=1')
                                }else{//没签署过，则跳转到协议页-
                                    _this.$router.push(
                                        '/agreement'
                                    )
                                }
                            }).catch((err)=>{
                                console.log(err)
                            })
                       }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    this.$router.push("/login")
                }
            },
        },
        created(){
            this.removeFs();
            // 保存默认渠道location参数  eg: ?product_type=3&alias=wlw
            let defaultChannelData = {};
            if(this.$route.query.product_type != undefined && this.$route.query.alias!= undefined ){
                defaultChannelData.product_type = this.$route.query.product_type*1;
                defaultChannelData.alias = this.$route.query.alias;
                this.setStorage({
                    registerDefault:defaultChannelData
                })
            }
            //init初始化----s--
//            let u = navigator.userAgent;
//            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//            if(isAndroid){
//                MessageBox("提示","尊敬的客户，您好！聚保“攻城狮”们的妙手已完美解决“因聚保系统升级，而导致安卓手机用户无法正常登陆投保”的问题。感谢您对聚保的理解与信任，现在，拿起手机，即可在移动端正常投保啦！！！")
//            }
            //init初始化----s--
        },
//        components: {
//            Scroll
//        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    .banner{width: 100%;height: 16.125rem;}
    .ban_img{width: 100%; height: 100%;}
</style>