<template>
    <div>
        <header class="header2">
            <div class="h_bg">
                <div class="head">
                    <a href="javascript:;"><img src="../img/head.png"></a>
                </div>
                <p>{{companyName}}</p>
                <p>{{mobile}}</p>
            </div>
            <div class="num">
                <ul class="clearfix">
                    <li>
                        <a href="javascript:;">
                            <span id="span_balance">{{balance/100}}  </span>
                            <p>可用余额</p>
                        </a>
                    </li>
                    <li>
                        <router-link :to="{path: 'zcborders',query:{type: 'unpaid'}}">
                            <span>{{zcbing}}</span>
                            <p style="color:red;">待付款单数</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            <span>&nbsp; </span>
                            <p>返回首页</p>
                        </router-link>
                    </li>
                </ul>
                <div class="clear"></div>
            </div>
        </header>
        <article class="artic">
            <div class="main">
                <div class="vip">
                    <ul>
                        <li>
                            <a href="javascript:void(0)">
                                <i class="icon"><img src="../img/home_zcb.png"></i>
                                <span>整车保</span>
                            </a>
                        </li>
                        <li style="padding-left:10%;display:block;">
                            <router-link :to="{path: 'zcborders',query:{type: 'unpaid'}}" style="background:none;float:left;display:block;width:25%;font-family:'Microsoft YaHei';color:red;">待付款({{zcbing}})</router-link>
                            <router-link :to="{path: 'zcborders',query:{type: 'paid'}}" style="background:none;float:left;display:block;width:25%;font-family:'Microsoft YaHei';color:black">已完成({{zcbed}})</router-link>
                            <a href="javascript:;" @click="useRightNow" style="background:#d7eef9;color:#105ac8;float:left;box-sizing:border-box;text-align: center;border:1px solid #bfbfbf;border-radius:5px;height:2.5rem;line-height:2.5rem; margin-top:0.52rem;display:inline-block;width:30%;font-family:'Microsoft YaHei';">立即投保</a>
                        </li>
                        <li>
                            <a href="javasript:;" @click="pay">
                                <i class="icon"><img src="../img/h_icon2.png"></i>
                                <span>充值</span>
                            </a>
                        </li>
                        <li>
                            <router-link to="/setCompanyName">
                                <i class="icon"><img src="../img/h_icon6.png"></i>
                                <span>设置公司名称</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/setZcbChannel">
                                <i class="icon"><img src="../img/h_icon6.png"></i>
                                <span>设置整车保渠道</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/paypassword">
                                <i class="icon"><img src="../img/sz_icon4.png"></i>
                                <span>设置支付密码</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/recovery">
                                <i class="icon"><img src="../img/sz_icon4.png"></i>
                                <span>修改登录密码</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/guide">
                                <i class="icon"><img src="../img/h_icon7.png"></i>
                                <span>投保指南</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="javascript:;" @click="signOut">
                                <i class="icon"></i>
                                <span>安全退出</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
        <div id="deposit_step1" v-show="deposit_step1" class="PopUp" style="width: 25rem;display: none;">
            <div class="PopUp_box">
                <div class="pop_conditionBox">
                    <h5>充值</h5>
                    <div class="infor3">
                    <span class="clearfix">
                        <label style="width:6rem;">充值金额(元)</label>
                        <input type="text" v-model="amount" id="amount" maxlength="30" style="width: 12rem">
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
                        <p style="text-align: left; font-size: 12px;">1、请将付款二维码截屏，然后使用微信扫一扫功能中的从相册选择截屏照片支付；或者使用另一个微信来扫描此二维码支付；</p>
                        <p style="text-align: left; font-size: 12px;word-break:break-all;">2、可到电脑端浏览器中打开网址：www.jubao56.com，然后登陆个人中心-整车保个人中心，使用充值功能进行充值；</p>
                    </div>

                    <div class="pop_button">
                        <a class="pop_go" href="javascript:void(0)"><input style="cursor:pointer" type="button" @click="registerClose" value="已完成支付"></a>
                    </div>
                </div>
            </div>

            <span class="aa"  @click="registerClose">
                    <img src="../img/aa.jpg" width="14" height="13">
            </span>

        </div>
        <div v-show="full_bg" style="width: 100%; height: 100%; display: none;" class="fullbg"></div>
    </div>
</template>

<script>
    import {mapMutations,mapState} from "vuex"
    import { Toast,MessageBox,Indicator } from 'mint-ui';
    import QRious from 'qrious'
    export default {
        data(){
            return{
                company_id:'',
                companyName:"请设置公司名称",
                mobile:"",
                balance:0,//余额
                zcbing:0,
                zcbed:0,
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
            }
        },
        methods:{
            ...mapMutations({getCookie:'GETCOOKIE',removeFs:'REMOVEFS'}),
            registerClose(){ //关闭应急支付
                this.paySpare=false;
                this.full_bg = false;
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
                                        '/agreement?list0='+list0.id+"&list1="+list1.id+"&list2="+list2.id+"&list3="+list3.id
                                        +"&list4="+list4.id
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
            getIniInfo(){
                let _this = this;
                this.$store.state.axios({
                    method:"get",
                    url:this.$store.state.cmnUrl+"/v1/cmn/user/info",
                    headers:{'Authorization':'Bearer ' + this.$store.state.token}
                }).then(function (response) {
                    _this.company_id = response.data.data.company_id;
                    _this.mobile = response.data.data.mobile;
                    _this.$store.state.axios({
                        method:"get",
                        url:_this.$store.state.cmnUrl+"/v1/cmn/company/info",
                        headers:{'Authorization':'Bearer ' + _this.$store.state.token},
                        params: {id: _this.company_id},
                    }).then(function (response) {
                        if(response.data.err_code==0){
                            _this.companyName = response.data.data.name;
                        }
                    });
                });
                this.$store.state.axios({
                    method:"get",
                    url:this.$store.state.zcbUrl+"/v1/zcb/user/info",
                    headers:{'Authorization':'Bearer ' + this.$store.state.token},
                }).then(function (response) {
                    if(response.data.err_code==0){
                        _this.balance = response.data.data.balance;
                    }
                    //console.log(response.data)
                });
                this.$store.state.axios({
                    method:"get",
                    url:this.$store.state.zcbUrl+"/v1/zcb/order/list",
                    headers:{'Authorization':'Bearer ' + this.$store.state.token},
                    params:{"status":1},
                }).then(function (response) {
                    _this.zcbing = response.data.rows.length
                });
                this.$store.state.axios({
                    method:"get",
                    url:this.$store.state.zcbUrl+"/v1/zcb/order/list",
                    headers:{'Authorization':'Bearer ' + this.$store.state.token},
                    params:{"status":4},
                }).then(function (response) {
                    _this.zcbed = response.data.rows.length
                });
            },
            //删除cookie
            delCookie(name){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                //var cval=this.getCookie(name);
                var cval=this.$store.state.token;
                if(cval!=null)
                    document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ";path=/";
            },
            //退出登录
            signOut(){
                if(this.$store.state.token){
                    this.delCookie(this.$store.state.jubao_user);
                    this.$store.state.token = '';
                    this.$router.push("/");
                }
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
                zcbUserInfo().then(response => {
                    if(response.err_code == 1002){
                        MessageBox('提示','尊敬的会员： 非常抱歉，您的账户暂时无法投保整车保,也无法对整车保进行充值，建议您选择其他险种，详询聚保服务热线：40080-59680');
                        return;
                    }else if(response.err_code == 1010){
                        MessageBox('提示','请先签署整车协议')
                        return;
                    }else{
                        this.deposit_step1 = true;
                        this.full_bg = true;
                    }
                })
                this.deposit_step1 = true;
                this.full_bg = true;
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
                    Toast({message: '请输入正确充值金额', duration: 3000});
                    return false;
                }else if(this.amount==0){
                    Toast({message: '充值金额必须大于0', duration: 3000});
                    return false;
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
                        if(response.data.err_code==1200){
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
                        console.log(response)
                    }).catch((err)=>{//启用组件
                        console.log(err,"catch事件触发");
                        Indicator.close();
                        // 请求微信支付链接mark
                        this.$store.state.axios({
                            url: this.$store.state.cmnUrl + '/v1/cmn/baofu/payurl',
                            method: 'post',
                            data: {
                                amount: this.amount * 100,
                                pay_type: 1,
                                product_type: 1
                            },
                            headers: {'Authorization': 'Bearer ' + this.token}
                        }).then(res => {
                            if(res.data.err_code==0){
                                let qr = new QRious({
                                    value: res.data.pay_url,
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

        },
        computed:{
            ...mapState(['token']),

        },
        created(){
            this.getCookie(this.$store.state.jubao_user);
            this.removeFs();
        },
        mounted(){
            if(!this.$store.state.token){
                this.$router.push("/login")
            }
            //console.log(this.$store.state.token);
            this.getIniInfo();
            this.isWx();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    .infor3{width:90%; padding-left: 10px; padding-bottom:10px; margin-bottom: 10px; border-bottom:1px solid #f5f5f5; text-align: center;}
    .infor3 span{position:relative; z-index:99; display: block; width:20rem; margin-bottom: 20px; margin-left: auto; margin-right: auto;}
    .infor3 span.sel{z-index: 9999;}
    .infor3 span label{display: block; float:left; width:4rem; height:30px; line-height: 30px; text-align: right; margin-right: 10px; font-family: "Microsoft yahei"; font-size:12px; color:#313b4b;}
    .infor3 span input{position:relative; z-index:99;display: block; float:left; width:14rem; padding-left: 10px; height:30px; padding-top:5px; padding-bottom:5px; padding-left: 10px; line-height: 20px; font-family: "Microsoft yahei"; font-size:14px; color:#313b4b; border-radius: 5px; border:1px solid #d1d1d1; background: url(../img/s_inputBg.jpg) repeat-x center center;}
    .infor3 span input.phoneNumber{width:10rem;}
    .infor3 span input.mdfCode{width:5rem;}
    .infor3 span a.getYzm{ width:86px; height: 34px;line-height: 34px; text-align: center; font-family: "Microsoft yahei"; font-size: 12px; color: #fff; background: url(../img/getYzm1.jpg) no-repeat center center;display:block;float:left;margin-left:15px}
    .infor3 span a.getYzm:hover{background: url(../img/getYzm2.jpg) no-repeat center center;}

    .PopUp{ position:fixed; top:40%; left:0%; z-index:999; width:27rem; padding:10px; background:url(../img/PopUp_box_bg.png) repeat;}
    .PopUp_box{ padding:20px;  background:#fff;}
    .PopUp_box .pop_conditionBox h5{height: 30px; margin-bottom: 15px; line-height: 30px; text-align: center; font-family: "Microsoft yahei"; font-size:16px; color:#333333;}
    .PopUp_box .pop_conditionBox .pop_content{height:370px; margin-bottom: 10px; padding:15px 38px; overflow-y:scroll;overflow-x:auto;  font-family: "Microsoft yahei"; font-size:14px; line-height:24px; color:#383d48; background: #e5eff7;}
    .PopUp_box .pop_conditionBox .pop_read{ position:relative; height: 30px; line-height:30px; font-family: "Microsoft yahei"; font-size:14px; color:#313b4b;}
    .PopUp_box .pop_conditionBox .pop_read input{display: block; position: absolute; width: 14px; height: 14px; border:none; outline: none; top:10px; left:0px;}
    .PopUp_box .pop_conditionBox .pop_read label{display: block; width:285px;  margin-left: 20px; height: 30px; line-height:30px; }
    .PopUp_box .pop_conditionBox .pop_button{height: 30px; position: relative;}
    .PopUp_box .pop_conditionBox .pop_button a{position:absolute; display: block; width:14rem; height: 44px; line-height: 44px; text-align: center; font-family: "Microsoft yahei"; font-size:14px; color:#fff; background: url(../img/charge_go1.jpg) no-repeat center center;}
    .PopUp_box .pop_conditionBox .pop_button a:hover{background: url(../img/charge_go2.jpg) no-repeat center center;}
    .PopUp_box .pop_conditionBox .pop_button a.pop_goBack{right:220px;}
    .PopUp_box .pop_conditionBox .pop_button a.pop_go{right:4rem;}
    .PopUp_box .pop_conditionBox .pop_button a.pop_go input{display: block; width:14rem; height: 44px; line-height: 44px; text-align: center; font-family: "Microsoft yahei"; font-size:14px; color:#fff; background: url(../img/charge_go1.jpg) no-repeat center center;}
    .PopUp_box .pop_conditionBox .pop_button a.pop_go:hover input{display: block; width:14rem; height: 44px; line-height: 44px; text-align: center; font-family: "Microsoft yahei"; font-size:14px; color:#fff; background: url(../img/charge_go2.jpg) no-repeat center center;}
    .PopUp .aa{ position:absolute; top:30px; right:35px; width:14px; height:13px; cursor: pointer;}
    .fullbg { position:fixed; left:0px; top:0px; z-index:111; background:url(../img/ListBg_03.png) repeat;}
    .click_upOut{width:120px; height:30px; line-height:30px; font-family: "Microsoft yahei"; font-size:14px; color:#313b4b; cursor:pointer;}
    .FullPopUp{ position:fixed; top:0; left:0; z-index:9999999; display:none; padding:10px; background:url(../img/PopUp_box_bg.png) repeat;}
    .FullPopUp_box{ padding:20px;  background:#fff;}
    .FullPopUp .aa{ position:absolute; top:5px; right:5px; width:14px; height:13px; cursor: pointer;}
</style>
