<template>
    <div>
        <div class="main" id="main">
            <mt-swipe class="banner" :auto="4000" :show-indicators="false">
                <mt-swipe-item v-for="(item,index) in banner" :key="index"><router-link :to="item.url"><img class="ban_img" :src="item.img"/></router-link> </mt-swipe-item>
            </mt-swipe>
            <div class="tag_list">
                <table>
                    <tbody><tr><td class="block01"><img src="../img/block01.png"></td><td class="mid"></td><td class="block02"><img src="../img/block02.png"></td><td class="mid"></td><td class="block03"><img src="../img/block03.png"></td></tr>
                    <tr class="bot"></tr>
                    <tr><td class="block04"><img src="../img/block04.png"></td><td class="mid"></td><td class="block05"><img src="../img/zcb.png"></td><td class="mid"></td><td class="block06"><img
                            src="../img/block06.png"></td></tr>
                    </tbody></table>
            </div>
            <div class="box01 wrap01 clearfix">
                <img class="main_img01" src="../img/img01.png">
                <div class="content">
                    <img class="title" src="../img/title01.png">
                    <p class="txt01 mt_10">1. 每次最低为<i class="money">35元</i>，最高仅为<i class="money">200元</i>。</p>
                    <p class="txt01">2. 保费预存随意交，不占用资金</p>
                    <p class="txt02">无需一次缴纳几万甚至几十万的年度保费</p>
                    <p class="txt02">什么时候交随意，交多少也随意</p>
                    <p class="txt03 mt_10">让中小物流企业可以享受超大物流企业才能享受到的极低保费，是我们不懈的追求</p>
                    <div class="box_btn"><router-link to="/price"><img src="../img/btn_img01.png"> </router-link> </div>
                </div>
            </div>
            <div class="box02 wrap02 clearfix">
                <img class="main_img02" src="../img/img02.png">
                <div class="content ml_60">
                    <img class="title02" src="../img/title02.png">
                    <p class="txt01 mt_10">1. 如遇出险，专家指导报案，全程跟踪服务</p>
                    <p class="txt01">2. 如遇保险公司拒赔，您无需担心几万甚至几十万的律师费，我们将免费把官司为您打到底。</p>
                    <p class="txt03 mt_10">我们不能绝对阻止保险公司的拒赔行为，</p>
                    <p class="txt03">但我们誓死捍卫您的权利。</p>
                    <div class="box_btn"><router-link to="/claims"><img src="../img/btn_img02.png"> </router-link> </div>
                </div>
            </div>
            <div class="box01 wrap02">
                <div class="clearfix">
                    <img class="main_img03" src="../img/img03.png">
                    <div class="content ml_30">
                        <img class="title03" src="../img/title03.png">
                        <p class="txt01 mt_10">1. 市场唯一的双主险+双附加险，360度保障</p>
                        <p class="txt01">2. 一份保单，高达30种风险保障项目，给您前所未有的安全、放心。</p>
                        <p class="txt01">3.运单上写到哪里，我们的保障就到哪里一票到底，包括转运。</p>
                        <p class="txt01">4.不但保障盗抢风险，我们还保障整车失踪哦</p>
                    </div>
                </div>
                <p class="txt04 tc mt_10">您想到的，我们保，您没想到的，我们早已为您想的更多。</p>
                <div class="box_btn ml_330"><router-link to="/protect"><img src="../img/btn_img03.png"> </router-link> </div>
            </div>
            <div class="box02 wrap02">
                <div class="clearfix">
                    <img class="main_img04" src="../img/img04.png">
                    <div class="content ml_30">
                        <img class="title04" src="../img/title04.png">
                        <p class="txt01 mt_10">1. 您每一次的投保都可以轻易的分享，通过社交媒体帮您轻易的维系老客户，开拓新客户。</p>
                        <p class="txt01">2.显示运单的承保确认函，您可以直接分享给您的重要客户。</p>
                    </div>
                </div>
                <p class="txt05 tc mt_45">您对客户货物负责的投保行为，应该被客户和更多潜在客户看到。</p>
            </div>
            <div class="box01 wrap02">
                <div class="clearfix">
                    <img class="main_img05" src="../img/img05.png">
                    <div class="content ml_30">
                        <img class="title03" src="../img/title05.png">
                        <p class="txt01 mt_10">1. 扩大业务要资金，运营车辆要资金，年度房租要资金。到处需要资金，怎么办？</p>
                        <p class="txt01">2.注重自身风险、每天投保的客户，平台自动推荐给多家金融贷款机构，提高您的融资能力。</p>
                        <p class="txt01">3.我方集团采购的低息短期贷款，帮您降低融资成本，从此告别高利贷。</p>
                    </div>
                </div>
                <p class="txt04 tc mt_45">您良好的投保记录和对风险的重视，应该得到资本的青睐。</p>
            </div>
            <div class="box03">
                <div class="main_img">
                    <img src="../img/img06.png">
                </div>
                <div class="content">
                    <img class="title" src="../img/title06.png">
                    <div class="calculate">
                        <p class="line clearfix mb_20">
                            <span>运输路线：</span>
                            <select v-model="startProvince" class="mr_20" id="begin_province_sel">
                                <option v-for="(val,idx) in dataListStart" :value="val.value">
                                    {{val.label}}
                                </option>
                            </select>
                            <select id="begin_city_sel" v-model="startCity">
                                <option v-for="(val,idx) in citys_start"
                                        :value="val.value"
                                        :selected="idx == 0 ?true:false">
                                    {{val.label}}
                                </option>
                            </select>
                        </p>
                        <p class="place clearfix">
                            <span>到达：</span>
                            <select class="mr_20" id="end_province_sel"  v-model="endProvince">
                                <option v-for="(val,idx) in dataListEnd" :value="val.value">
                                    {{val.label}}
                                </option>
                            </select>
                            <select id="end_city_sel" v-model="endCity">
                                <option v-for="(val,idx) in citys_end"
                                        :value="val.value" :selected="idx==0?true:false">
                                    {{val.label}}
                                </option>
                            </select>
                        </p>
                    </div>
                    <div class="result clearfix mt_10">
                        <p><span>里程：</span><i style="font-size:0.6rem; color:#ff0000;" id="distance" :class="'distanceClass'+countDistance">{{distanceFlag}}</i>公里</p>
                        <p><span>保费金额：</span><i style="font-size:0.6rem; color:#ff0000;" id="price">{{coverageFlag}} </i>元</p>

                        <p class="check_bg clearfix" style="width:100%;">
                            <i>赔偿限额：</i>
                            <label><input value="1500000" v-model="coverage" checked="checked" name="comp_sel" type="radio"><span :class="coverage==1500000?'on':''"></span><strong>150万</strong></label>
                            <label><input value="500000" v-model="coverage" type="radio" name="comp_sel"><span :class="coverage==500000?'on':''"></span><strong>50万</strong></label>
                        </p>
                    </div>

                    <p class="inline"></p>
                    <div class="use_btn clearfix">
                        <p class="test"><a href="javascript:;" @click="tryout">立即试用</a></p>
                        <p class="now"><a href="javascript:;" @click="useRightNow">马上投保</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import banner1 from '../img/banner.gif';
    import banner2 from '../img/banner_ygb1.png';
    import { Toast } from 'mint-ui';
    import {zcbOrderPrice,getToken,cmnUserInfo,zcbAgreementList,zcbUserInfo} from '../libs/api'
    import {setStorage} from '../libs/common'
    export default {
        data(){
            return{
                banner:[{
                    "img":banner1,
                    "url":"/zcb"
                },],
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
            }
        },
        computed:{
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
                    zcbOrderPrice({
                        start_province:this.startProvince,
                        start_city:this.startCity,
                        end_province:this.endProvince,
                        end_city:this.endCity,
                        coverage:this.coverage*1
                    }).then((res)=>{
                        console.log(res);  //console.log正常获取到返回值
                        if(res.err_code == 1103){
                            this.distanceFlag="--";
                            this.coverageFlag="--"
//                            alert("记录未找到")
                        }else if (res.err_code ==0) {
                            this.distanceFlag=res.data.distance;
                            this.coverageFlag = res.data.price/100;
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
            clearSec(){//清空session里面的listId
                let key = "jubao56";
                let beforeMsg = JSON.parse(window.sessionStorage.getItem("jubao56"));
                if(beforeMsg){
                    if(beforeMsg.listId){
                        delete beforeMsg.listId
                        window.sessionStorage.setItem(key,JSON.stringify(beforeMsg))
                    }
                }
            },
            tryout(){
                this.clearSec();
                this.$router.push("/tryout?status=0");
            },
            useRightNow(){
                // 检测cookie没有则进入登录页面
                if(getToken()){
                    this.$router.push('/tryout?status=1');
                }else{
                    this.$router.push("/login")
                }
            },
            checkDefaultChannel(){
                if(this.$route.params.alias){
                  // 保存默认渠道location参数  eg: ?product_type=3&alias=wlw
                    let defaultChannelData = {};
                    defaultChannelData.product_type = 2; //因为是整车保页面所以product_type=2
                    defaultChannelData.alias = this.$route.params.alias;
                    setStorage({
                      registerDefault:defaultChannelData
                    });
                }
            }
        },
        created(){
            this.checkDefaultChannel()
        },
        mounted(){
            let html = document.documentElement;
            let windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / 10.8 + 'px';
        },
        beforeDestroy(){
            var html = document.documentElement;
            html.style.fontSize = '';
        }
    }
</script>

<style lang="scss" scoped>
    .banner{width: 100%;height: 64vw;}
    .ban_img{width: 100%; height: 100%;}
    @import "../css/zcb";
</style>

