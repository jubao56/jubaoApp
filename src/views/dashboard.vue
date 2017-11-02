<template>
    <div class="user">
        <div class="user-wrapper">
            <div class="header">
                <div class="header-center clearfix">
                    <div class="userPic">
                        <img src="../img/userImg.png" alt="">
                    </div>
                    <p>{{companyName}}</p>
                </div>
            </div>
            <div class="main" style="background: #EDEDED">
                <div class="zcb mb20">
                    <div class="zcb-top h70 clearfix">
                        <div class="zcb_title fl h70" style="padding-left:25px;"><i class="iconfont icon-puhuoche blue"></i> &nbsp;&nbsp;整车保</div>
                        <div class="balance fr" style="padding-right:20px;">可用余额: <span style="color:#FF4343;">{{balance/100}}元</span></div>
                    </div>
                    <div class="zcb-bot h100">
                        <ul class="clearfix">
                            <li class="fl w33">
                                <a href="javascript:void(0);" @click.prevent="pay()">充值</a>
                            </li>
                            <li class="fl w33">
                                <a href="javascript:void(0);" @click="useRightNow()">立即投保</a>
                            </li>
                            <li class="fl w33">
                                <!-- <a href="javascript:void(0);">我的保单</a> -->
                                <router-link :to="{path: 'zcbOrders',query:{type: 'unpaid'}}">我的保单</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="zcb mb20">
                    <div class="zcb-top h70 clearfix">
                        <div class="phb_title fl" style="padding-left:25px;"><i class="iconfont icon-car-truck blue"></i> 普货保</div>
                        <div class="balance fr" style="padding-right:20px;">可用余额: <span style="color:#FF4343;">0.00元</span></div>
                    </div>
                    <div class="zcb-bot h100">
                        <ul class="clearfix">
                            <li class="fl w33"><a href="javascript:void(0);">充值</a></li>
                            <li class="fl w33"><a href="javascript:void(0);">立即投保</a></li>
                            <li class="fl w33"><a href="javascript:void(0);">我的保单</a></li>
                        </ul>
                    </div>
                </div> -->
                <div class="ygb mb20">
                    <div class="ygb-top h70 clearfix">
                        <div class="ygb_title fl h70" style="padding-left:25px;"><i class="iconfont icon-baoxian blue"></i> &nbsp;&nbsp;员工保</div>
                    </div>
                    <div class="ygb-bot h100">
                        <ul class="clearfix">
                            <li class="fl w33"><router-link to="/ygbOrders">我的保单</router-link></li>
                            <li class="fl w33"><router-link to="/ygbOrders">在线换人</router-link></li>
                            <li class="fl w33"><router-link to="/ygbOrders">在线加人</router-link></li>
                        </ul>
                    </div>
                </div>
                <div class="spb mb20">
                    <div class="spb-top h70 clearfix">
                        <div class="spb_title fl h70" style="padding-left:25px;"><i class="iconfont icon-huozai blue"></i> &nbsp;&nbsp;商铺保</div>
                    </div>
                    <div class="spb-bot h100">
                        <ul class="clearfix">
                            <li class="fl w33"><a :href="$store.state.spbBackUrl+'insured-create.html'">立即投保</a></li>
                            <li class="fl w33"><a :href="$store.state.spbBackUrl+'spbordersBack.html?orderStatus=unpaid'">未生效保单</a></li>
                            <li class="fl w33"><a :href="$store.state.spbBackUrl+'spbordersBack.html?orderStatus=paid'">已生效保单</a></li>
                        </ul>
                    </div>
                </div>
                <div class="hb mb20">
                    <div class="hb-top h80 clearfix">
                        <div class="hb_title h80" style="padding-left:25px;">
                            <router-link :to="{path: 'hongbao',query:{from: 'user'}}" style="display: inline-block; width: 100%;">
                                <i class="iconfont icon-bonus red"></i> &nbsp;&nbsp;我的红包 <i class="icon icon-right floatIcon"></i>
                            </router-link>&nbsp;
                        </div>
                    </div>
                    <div class="setting-top h80 clearfix" @click="showSettingList()">
                        <div class="setting_title h80" style="padding-left:25px;">
                            <i class="iconfont icon-shezhi blue"></i> &nbsp;&nbsp;<span style="display: inline-block;width: 60%;
">设置</span> <i class="icon icon-right floatIcon"></i><i style="display:none;" class="icon icon-jiantou floatIcon"></i> &nbsp;
                        </div>
                    </div>
                    <div class="settingWrap" style="display:none;">
                        <div class="h80 clearfix">
                            <div class="h80"><router-link to="/setCompanyName"><i class="icon icon-home" style="font-size: 1.6rem;"></i>公司名称<i class="icon icon-right floatIcon"></i></router-link></div>
                        </div>
                        <div class="h80 clearfix">
                            <div class="h80"><router-link to="/setTel"><i class="icon icon-ico-user-info1" style="font-size: 1.6rem;"></i>手机号<i class="icon icon-right floatIcon"></i></router-link></div>
                        </div>
                        <div class="h80 clearfix">
                            <div class="h80"><router-link to="/recovery"><i class="icon icon-lurudingdan" style="font-size: 1.6rem;"></i>修改登录密码<i class="icon icon-right floatIcon"></i></router-link></div>
                        </div>
                        <div class="h80 clearfix">
                            <div class="h80"><router-link to="/paypassword"><i class="icon icon-mima" style="font-size: 1.6rem;"></i>修改支付密码<i class="icon icon-right floatIcon"></i></router-link></div>
                        </div>
                        <div class="h80 clearfix">
                            <div class="h80"><router-link to="/setMail"><i class="icon icon-youxiang" style="font-size: 1.6rem;"></i>邮箱<i class="icon icon-right floatIcon"></i></router-link></div>
                        </div>
                        <div class="h80 clearfix">
                            <div class="h80"><router-link to="setAddress"><i class="icon icon-dizhi" style="font-size: 1.6rem;"></i>地址管理<i class="icon icon-right floatIcon"></i></router-link></div>
                        </div>
                        <div class="h80 clearfix">
                            <div class="h80"><a href="javascript:;" @click="signOut"><i class="icon icon-tuichu" style="font-size: 1.6rem;"></i><span>安全退出</span></a></div>
                        </div>
                    </div>
                </div>
                <div class="tel mb20">
                    <div class="tel-top h80 clearfix">
                        <p style="color:#30AB82;text-align: center;"><img class="home_tel" src="../img/home_tel-v3.png" alt="">24小时服务热线 40080-59680</p>
                    </div>
                </div>
            </div>
            <!-- 充值页面start -->
            <div id="deposit_step1" v-show="deposit_step1" class="PopUp" style="display: none;right:0;width: auto;">
                <div class="PopUp_box">
                    <div class="pop_conditionBox">
                        <h5>充值</h5>
                        <div class="infor3">
                        <span class="clearfix">
                            <label style="width:6rem;">充值金额(元)</label>
                            <input type="text" v-model="amount" id="amount" placeholder="请输入整数" maxlength="30" style="width: 12rem">
                            <span style="display:inline;width:140px; color: #ff7300; line-height: 30px;" id="span_amount_error"></span>
                        </span>
                        </div>
                        <div class="pop_button">
                            <a class="pop_go" href="javascript:void(0)">
                                <input type="button" @click="deposit" style="cursor:pointer" value="确 定">
                            </a>
                        </div>
                    </div>
                </div>
                <span class="aa">
                    <img src="../img/aa.jpg" @click="close" width="14" height="13">
                </span>
            </div>
            <div id="deposit_step2" v-show="deposit_step2" class="PopUp" style="width: 25rem; margin-left: 1px;display: none;">
                <div class="PopUp_box">
                    <div class="pop_conditionBox">
                        <h5>充值</h5>
                        <div class="infor3">
                        <span class="clearfix">
                            <p id="step2_tip">您的充值金额为 {{amount}} 元，您需要前往太平保险公司完成充值操作。</p>
                        </span>
                        </div>
                        <div class="pop_button">
                            <a class="pop_go" href="javascript:;" id="step2_link" target="_blank">
                                <input type="button" style="cursor:pointer" @click="deposit_jump" value="确认支付">
                            </a>
                        </div>
                    </div>
                </div>
                <span @click="close" class="aa"><img src="../img/aa.jpg" width="14" height="13"></span>
            </div>
            <div id="deposit_step3" v-show="deposit_step3" class="PopUp" style="width: 25rem; display: none; margin-left: 1px;">
                <div class="PopUp_box">
                    <div class="pop_conditionBox">
                        <h5>充值</h5>
                        <div class="infor3">
                        <span class="clearfix">
                            <p>请在新打开的支付页面进行支付，支付完成前不要关闭此页面。</p>
                            <p>充值成功后请使用账户余额前往个人中心--待付款订单完成支付！</p>
                        </span>
                        </div>

                        <div class="pop_button">
                            <a href="javascript:void(0)" style="margin-left:30px;display:none;" onclick="deposit_fail()">支付遇到问题</a>
                            <a class="pop_go" href="javascript:void(0)"><input style="cursor:pointer" type="button" @click="deposit_success" value="已完成支付"></a>
                        </div>
                    </div>
                </div>

                <span class="aa">
                    <img @click="close" src="../img/aa.jpg" width="14" height="13">
                </span>

            </div>
            <!--应急支付-->
            <div id="deposit_baofu" class="PopUp" v-show="paySpare" style="width: 25rem; display: block; left:50%; transform: translateX(-50%); top:10%;">
                <div class="PopUp_box">
                    <div class="pop_conditionBox">
                        <h5 style="margin-bottom: 0;">微信充值</h5>
                        <div class="infor3">
                            <br class="clearfix">
                            <div class="weixinQR">
                                <img
                                    :src="weixin_url"
                                    height="200"
                                    width="200"
                                />
                            </div>
                          <!--1、请将付款二维码截屏，然后使用微信扫一扫功能中的从相册选择截屏照片支付；或者使用另一个微信来扫描此二维码支付；-->
                            <p style="text-align: left; font-size: 12px;">1、请使用另一个微信来扫描此二维码支付；</p>
                            <p style="text-align: left; font-size: 12px;word-break:break-all;">2、可到电脑端浏览器中打开网址：www.jubao56.com，然后登陆个人中心-整车保个人中心，使用充值功能进行充值；</p>
                        </div>

                        <div class="pop_button">
                            <a class="pop_go" href="javascript:void(0)"><input style="cursor:pointer" type="button" @click="checkYingJi()" value="已完成支付"></a>
                        </div>
                    </div>
                </div>

                <span class="aa"  @click="registerClose">
                        <img src="../img/aa.jpg" width="14" height="13">
                </span>

            </div>
            <!-- 充值页面end -->
            <div v-show="full_bg" style="width: 100%; height: 100%; display: none;" class="fullbg"></div>
        </div>

        <tab></tab>
    </div>
</template>

<script>
    import { cmnUserInfo,cmnCompanyInfo,zcbUserInfo,zcbOrderList,zcbAgreementList,cmnBaofuPayurl,cmnBaoFinish } from '../libs/api'
    import {wwwJudge} from "../libs/common"
    import {mapMutations,mapState} from "vuex"
    import { Toast,MessageBox,Indicator } from 'mint-ui';
    import QRious from 'qrious'
    import Tab from './tab.vue'
    export default {
        components:{
            Tab
        },
        data(){
            return{
                company_id:'',
                companyName:"请设置公司名称",
                mobile:"",
                balance:0,//余额
                payType:1,//充值支付方式
                deposit_step1:false,
                deposit_step2:false,
                deposit_step3:false,
                full_bg:false,
                amount:"",
                reg_count:/^[1-9][0-9]*$/,
                payUrl:"",//跳转支付链接
                redirect_url:this.$store.state.redirectUrl,//充值成功后回调链接
                weixin_url:"",
                paySpare:false,
                additional_info: String(Date.parse(new Date()) + Math.floor(Math.random()*89)+10), // 宝付唯一标识
                showInTest:false,
                isWWW: this.$store.state.isWWW,
            }
        },
        methods:{
            ...mapMutations({getCookie:'GETCOOKIE',removeFs:'REMOVEFS'}),
            registerClose(){ //关闭应急支付
                this.paySpare=false;
                this.full_bg = false;
            },
            checkYingJi(){ // 检查应急支付状态
                let data = {
                    amount: Number(this.amount * 100),
                    product_type: 1,
                    additional_info : this.additional_info
                }
                cmnBaoFinish(data).then(res=>{
                    if(res.err_code == 1109){
                        MessageBox('充值成功')
                        this.getIniInfo();
                        this.paySpare = false;
                        this.full_bg = false;
                    }else if(res.err_code == 1116){
                        MessageBox('充值未完成');
                    }else{
                        MessageBox('未找到充值记录');
                        console.log("未找到充值记录",res);
                    }
                })
            },
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
            getIniInfo(){
                // 获取公司名称
                cmnUserInfo().then(res=>{
                    this.company_id = res.data.company_id;
                    this.mobile = res.data.mobile;
                    cmnCompanyInfo(this.company_id).then(res=>{
                        if(res.err_code==0){
                            this.companyName = res.data.name;
                        }
                    }).catch((err)=>{ console.log("cmnCompanyInfo",err) });
                }).catch((err)=>{ console.log("cmnUserInfo",err) });
                // 获取整车保用户余额
                zcbUserInfo().then(res=>{
                    if(res.err_code==0){
                        this.balance = res.data.balance;
                    }
                }).catch((err)=>{ console.log("zcbUserInfo",err) });
            },
            useRightNow(){
                //检测cookie，有登录则检测是否填写了公司名称--投保页面，没有则进入登录页面
                if(this.company_id == 0){
                    MessageBox({
                        title: '提示',
                        message: '请设置公司名称'
                    })
                    this.$router.push("/setCompanyName");
                }else{ //检测是否同意整车保协议
                    zcbAgreementList().then(res=>{

                        var isSigned = res.data.every(item =>{ return item.signed;})
                        if( isSigned ){//签署过整车保协议，则跳转到投保页
                            this.clearSec();
                            this.$router.push('tryout?status=1')
                        }else{ //没签署过，则跳转到协议页
                            this.$router.push(
                                '/agreement'
                            )
                        }
                    }).catch((err)=>{ console.log("zcbAgreementList",err) })
                }
            },
            //删除cookie
            delCookie(name){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval=this.$store.state.token;
                if(cval!=null)
                    document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ";path=/";
            },
            //退出登录
            signOut(){
                MessageBox.confirm('确定退出登录?').then(action => {
                    if(this.$store.state.token){
                        this.delCookie(this.$store.state.jubao_user);
                        this.$store.state.token = '';
                        this.$router.push("/");
                    }
                }).catch(err=>{});
            },
            //检测微信
            isWx(){
                let ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    this.payType = 1;
                } else {
                    this.payType = 2;
                }
            },
            //充值
            pay(){
                zcbUserInfo().then(res=>{
                    if(res.err_code == 0){
                        if(res.data.disabled){
                            MessageBox({
                                title: '提示',
                                message: '尊敬的客户：非常抱歉，您的账户暂时无法进行"整车保"充值，建议您选择其他险种，详询聚保服务热线: 40080-59680'
                            })
                        }else{
                                this.deposit_step1 = true;
                                this.full_bg = true;
                            }
                    }else if(res.err_code == 1010){
                        MessageBox({
                          title: '提示',
                          message: '请先点击【立即投保】签署协议'
                        })
                    }
                })
            },
            //关闭弹框
            close(){
                this.deposit_step1 = false;
                this.deposit_step2 = false;
                this.deposit_step3 = false;
                this.full_bg = false;
            },
            //确定充值
            deposit(){
                let _this = this;
                if(!this.reg_count.test(this.amount)){
                    Toast({message: '请输入正确充值金额'}); return false;
                }else if(this.amount==0){
                    Toast({message: '充值金额必须大于0'}); return false;
                }else {
                    _this.deposit_step1 = false;
                    Indicator.open({
                        text: '请稍候...',
                        spinnerType: 'fading-circle'
                    });
                    this.$store.state.axios({
                        method:'post',
                        url:this.$store.state.zcbUrl+"/v1/zcb/deposit/new",
                        headers:{'Authorization':'Bearer ' + this.$store.state.token},
                        data:{'type':this.payType,redirect_url:this.redirect_url,"amount":this.amount*1},
                        timeout:10000
                    }).then(function (response) {
                        if(response.data.err_code == 1014){
                            MessageBox({
                                title: '提示',
                                message: '尊敬的客户：非常抱歉，您的账户暂时无法投保"整车保"，建议您选择其他险种，详询聚保服务热线: 40080-59680'
                            })
                            _this.full_bg = false;
                            Indicator.close();
                        }
                        else if(response.data.err_code==1200){
                            MessageBox({
                                title: '提示',
                                message: '您尚未设置公司名称！',
                                showCancelButton: true
                            });
                            _this.full_bg = false;
                            Indicator.close();
                        }else if(response.data.err_code==0){
                            Indicator.close();
                            _this.deposit_step2 = true;
                            _this.payUrl = response.data.data.pay_url
                        }else {
                            MessageBox({
                                title: '提示',
                                message: '未知错误！',
                                showCancelButton: true
                            });
                            Indicator.close();
                            _this.full_bg = false;
                        }
                    }).catch((err)=>{//启用组件
                        Indicator.close();
                        // 请求微信支付链接mark
                        let data = { amount: this.amount * 100, pay_type: 1, product_type: 1, additional_info: this.additional_info,}
                        cmnBaofuPayurl(data).then(res=>{
                            if(res.err_code==0){
                                let qr = new QRious({
                                    value: res.pay_url,
                                    background: 'white',
                                    //backgroundAlpha: 0.8,
                                    foreground: 'black',
                                    //foregroundAlpha: 0.8,
                                    level: 'H',
                                    padding: 25,
                                    size: 200,
                                })
                                this.weixin_url = qr.toDataURL();
                                this.paySpare=true;
                            }else{
                                Toast("网络异常，请重试")
                            }
                        })
                    })
                }
            },
            //跳转支付
            deposit_jump(){
                window.open(this.payUrl) ;
                this.deposit_step2 = false;
                this.deposit_step3 = true;
            },
            //已完成支付
            deposit_success(){
                this.deposit_step3 = false;
                this.full_bg = false;
                this.getIniInfo();
            },
            showSettingList(){
                $(".settingWrap").slideToggle();
                $(".setting_title i.icon").toggle();
            }
        },
        computed:{
            ...mapState([
                'token',
            ]),
        },
        created(){
            this.getCookie(this.$store.state.jubao_user);
            this.removeFs();

            if (!wwwJudge()) { //如果为测试环境
                this.showInTest=true;
            }
        },
        mounted(){
            if(!this.$store.state.token){
                this.$router.push("/login")
            }
            this.getIniInfo();
            this.isWx();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/user-back.scss";
    @import "../font/iconfont.css";
    /*.main .tel {position: fixed;bottom: 3.5715rem;left: 0;right: 0;background: #EDEDED;margin-bottom: 0;padding-bottom: 0.7143rem;  }*/
    .settingWrap a {
        display: inline-block;
        width: 100%;
    }
    .settingWrap a i:first-child{
        margin-right:15px;
    }
    .settingWrap > div > .h80{
        padding-left: 25px;
    }
    .floatIcon { float:right;margin-right:10px; }
    @media (max-width:340px){
        .main .h100{
            height: 2.5rem;
            line-height: 2.5rem;
        }
        .header {
            height: 9rem;
        }
    }
</style>
