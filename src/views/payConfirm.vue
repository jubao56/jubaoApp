<template>
    <div class="payConfirm">
        <header class="header">
            <div class="h_top">
                <a class="go_back" href="javascript:void(0)" @click="goback">
                <span>
                    <img src="../img/back.png">
                </span>返回修改
                </a>
            </div>
        </header>

        <article class="artic">
            <div class="main">
                <div class="part1" :class="status==0?'part1Bg':''">
                    <b class="tit">整车保</b>
                    <div class="title2">保单信息</div>
                    <div class="all_form">
                        <ul class="list">
                            <li>
                                <div class="list-l">投保人&nbsp;&nbsp;&nbsp; :</div>
                                <div class="list-r">{{policyholder}}</div>
                            </li>
                            <li>
                                <div class="list-l">被保险人 :</div>
                                <div class="list-r">{{beneficiary}}</div>
                            </li>
                            <li>
                                <div class="list-l">运输线路 :</div>
                                <div class="list-r">{{startProvince}} {{startCity}}</div>
                            </li>
                            <li>
                                <div class="list-l">　　　至 :</div>
                                <div class="list-r">{{endProvince}} {{endCity}}</div>
                            </li>
                            <li>
                                <div class="list-l">赔偿限额 :</div>
                                <div class="list-r">{{coverage/10000}}万元</div>
                            </li>
                            <li>
                                <div class="list-l">保费金额 :</div>
                                <div class="list-r">{{price | number(2)}}</div>
                            </li>
                            <li>
                                <div class="list-l">车牌号码 :</div>
                                <div class="list-r">头{{carNumT}} 挂{{carNumG}}</div>
                            </li>
                            <li style="align-items: center">
                                <div class="list-l strong">里程 :</div>
                                <div class="list-r"><span class="strong" style="font-size: 1.3em">{{distance}}</span>km</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <span>若以下表格没有显示出您的装车清单数据，可能是您上传的是照片或者电子文档格式不兼容。不影响保单效力。若遇险情，以您录入的所有装车清单作为赔偿依据。</span>
                <div class="all_table" style="margin-bottom: 1rem;margin-left:0.5rem">
                    <table id="list" class="tb_list" width="95%" border="0" cellspacing="0">
                        <tbody><tr>
                            <th class="first" style="width: 20%">运单号</th>
                            <th style="width: 20%">始发地</th>
                            <th style="width: 20%">目的地</th>
                            <th style="width: 20%">货物名称</th>
                            <th style="width: 10%">货物数量</th>
                            <th style="width: 10%">计量单位</th>
                        </tr>

                        <tr v-for="(val,idx) in orderLists">
                            <td class="first">{{val.track_no}}</td>
                            <td>{{val.beginning}}</td>
                            <td>{{val.destination}}</td>
                            <td>{{val.name}}</td>
                            <td>{{val.quantity/100 | number(2)}}</td>
                            <td>{{val.unit}}</td>
                        </tr>

                        </tbody></table>
                </div>

                <div class="allDown">
                    <div class="checking" v-show="linkFlag">
                        <span style="font-size:1.4rem;">已上传的装车清单：</span>
                        <ul class="clearfix" id="filelist">
                            <li style="float:left;padding-top:1.2rem;width: 48%;padding-right: 2%;" v-for="(val,idx) in linkLists">
                                <img style="width: 100%;" :src="val.file_url">
                                &nbsp;&nbsp;&nbsp;
                            </li>
                        </ul>
                    </div>
                    <div class="goOn" style="color: #535353; width: 100%; float: none; height: auto; margin-bottom: 20px">
                        <!--<div>当前应支付：<span id="paymentamount">{{price | number(2)}}</span>元<span id="discount"></span></div>-->
                        <div>当前应支付：<span id="paymentamount">{{payCoverage}}</span> 元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="discount" v-show="coupon">已优惠{{(price-payCoverage).toFixed(2)}}元</span><span style="color:red;" v-show="freeItem">&nbsp;&nbsp;&nbsp;&nbsp;订单免费!</span></div>

                        <div id="yhqdiv">
                            <span v-show="isFormal">
                                <input type="checkbox" id="usedyhq" style="margin-right: 5px" v-model="coupon"><label for="usedyhq" style="margin-right: 20px">使用优惠券</label>
                            </span>

                            <ul style="list-style: none; width: 100%; overflow: auto;" id="yhqlist" v-show="coupon">
                                <li class="couponList" v-for="(val,idx) in couponRow">
                                    <input type="radio" :value="val.id" v-model="choseCoupon" :id="val.id">
                                    <label :for="val.id"> {{val.amount | showCoupon(val.type)}} {{val.type==1?'元红包':'折优惠券'}}，<br>&nbsp;&nbsp;&nbsp;&nbsp;可抵扣{{val.amount | trueConpon(val.type,price)}} 元</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goOn">
                        <a href="javascript:void(0)" style="width: 100%">
                            <input class="button1" type="button" value="返回修改" @click="goback">
                            <input class="button2" type="button" style="" @click="pay" value="确认并支付">
                        </a>
                    </div>

                </div>
            </div>
        </article>
        <!--输入支付密码,支付保单-->
        <div id="payinfo" class="PopUp" style="width: 100%;left: 0;top: 40%;box-sizing: border-box;" v-if="importPwd">
            <div class="PopUp_box">
                <div class="pop_conditionBox">
                    <h5>请输入您的支付密码</h5>
                    <div class="infor3">
                    <span class="clearfix">
                        <label for="payment_password">支付密码</label>
                        <input type="password" id="payment_password" maxlength="30" v-model="payPwd">
                    </span>
                        <span style="display: inline; color: #ff7300; line-height: 30px;" id="filluserinfo_error">{{payPwdTips}}</span>
                    </div>
                    <div class="pop_button">
                        <a class="pop_go" href="javascript:void(0)">
                            <input type="button" :disabled="payFlag" @click="pay1" value="支  付">
                        </a>
                    </div>
                </div>
            </div>

            <span class="aa" @click="closePayPwd">
            <img src="../img/aa.jpg" width="14" height="13"></span>
        </div>

        <!--设置支付密码-->
        <div id="fillinfo" class="PopUp" style="width: 100%;left: 0;margin-top: -15rem;box-sizing: border-box;" v-if="editorPwd" >
            <div class="PopUp_box">
                <div class="pop_conditionBox">
                    <h5>请设置支付密码</h5>
                    <br>
                    <div class="infor3">
                        <span class="clearfix">
                        <label>验证码：</label>
                        <input type="text" id="mdf_code" class="mdfCode" maxlength="6" v-model="sms_code" :class="smsInputFlag?'inputError':''">
                        <!--<input type="hidden" id="mdf_phone_flag_code" value="-1">-->
                        <a class="getYzm" href="javascript:void(0)" id="mdf_phone_validCode" @click="getCode"
                            style="margin-top: 0.3rem;">
                            {{codeTxt}}
                        </a>
                        <br/> <br/>
                        <span style="color: #ff7300;line-height: 30px;" id="span_mdf_code_error">{{smsTips}}</span>
                    </span>

                        <span class="clearfix">
                            <label for="pay_password" style="width:5rem;">支付密码：</label>
                            <input type="password" id="pay_password" maxlength="30" style="width: 13rem;" v-model="pwd1" placeholder="必须由6-16位数字和字母组成" :class="pwd1FlagNew?'inputError':''">
                            <span style="display: inline; color: #ff7300; line-height: 40px;width:140px;" id="span_pwd_error">{{pwd1Tips}}</span>
                        </span>
                        <span class="clearfix">
                            <label for="re_pwd" style="width:5rem;">确认密码：</label>
                            <input type="password" id="re_pwd" maxlength="30" style="width: 13rem;" v-model="pwd2" placeholder="必须由6-16位数字和字母组成" :class="pwd2FlagNew?'inputError':''">
                            <span style="display: inline; color: #ff7300; line-height: 40px;width:140px;" id="span_re_pwd_error">{{pwd2Tips}}</span>
                        </span>

                    </div>
                    <div class="pop_button">
                        <a class="pop_go" href="javascript:void(0)">
                            <input type="button" @click="filluserinfo" style="cursor:pointer" value="保  存">
                        </a>
                    </div>
                </div>
            </div>

            <span class="aa" @click="editorClose">
            <img src="../img/aa.jpg" width="14" height="13"></span>
        </div>

        <!--充值-->
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
        <div v-show="full_bg" style="width: 100%; height: 100%; display: none;" class="fullbg"></div>

        <div class="FullPopUp" id="img_window">
            <div class="FullPopUp_box" style="position:relative">
                <div id="body" style="overflow:scroll;width:100%;height:100%;margin:10px 0 0 0;border:2px solid #c4c4c4">
                    <img id="body_content" src="" alt="图片">
                </div>
                <span class="aa"><img src="../img/aa.jpg" width="14" height="13"></span>
            </div>
        </div>
        <div class="limitBg" v-show="bgFlag">

        </div>
    </div>
</template>

<script>
    import { Toast,MessageBox,Indicator } from 'mint-ui';
    import {getToken,zcbOrderInfo,zcbOrderTryInfo,cmnCouponList,cmnSmsSend,cmnUserUpdate,zcbOrderTryPay,zcbOrderPay,cmnUserInfo,zcbDepositNew} from '../libs/api';

    import {goPageHref} from "../libs/common"
    export default {
        data(){
            return {
                //======状态信息======
                status:"",
                listId:"",
//                urlDirection:"",
//                userHeader:{},
                linkFlag:false,//控制订单列表是否显示
                imputPwd:false, //控制输入密码窗口是否显示
                bgFlag:false,   //
                //======整车保计算器信息======
                policyholder:"",
                beneficiary:"",
                startProvince:"",
                startCity:"",
                endProvince:"",
                endCity:"",
                coverage:"",
                price:"",
                distance:"",
                //======车牌号码信息======
                carNumT:"",
                carNumG:"",
                //======货物订单信息======
                orderLists:[],
                linkLists:[],
                //======设置支付密码======
                editorPwd:false,    //控制设置密码窗口是否显示
                mobile:"",
                userId:"",
                codeTxt:"获取验证码",
                codeCount:60,
                codeFlag:true,//计时器开关
                sms_code:"",//用户输入的短信验证码
                pwd1:"",
                pwd2:"",
                smsFlag:false,
                pwdFlag:false,
                smsTips:"",
                pwd1Tips:"",
                pwd2Tips:"",
                judgeFlag:false,
                //======输入支付密码======
                importPwd:false,
                payPwdTips:"",

                //======充值窗口======
                payType:1,//充值支付方式
                deposit_step1:false,
                deposit_step2:false,
                deposit_step3:false,
                full_bg:false,
                amount:"",
                reg_count:/^[1-9]?[0-9]{1,8}$/,
                payUrl:"",//跳转支付链接
                //======输入支付密码======
                payPwd:"",

                coupon:false, //是否选择优惠券
                couponRow:[], //优惠券列表
                choseCoupon:"", //选择的优惠券id
                freeItem:false, //首免定向红包
                orderStatus:"", //订单状态
                isFormal:false,
                payFlag:false, // 按钮禁用
            }
        },
        watch:{
            coupon(newVal, oldVal){
                if(!newVal){
                    this.choseCoupon="";
                }
            }
        },
        computed:{
            payCoverage(){
                console.log(this.price,"this.price")
                if(!this.choseCoupon){//优惠券value为空
                    return  (this.price*1).toFixed(2)
                }else{//优惠券类型不为空
                    let priceItem = this.couponRow.filter( (item)=> {
                        return item.id == this.choseCoupon;
                    })[0];
                    console.log(priceItem,"priceItem")
                    let cutPrice = 0 ;
                    if(priceItem.type==1){
                        cutPrice=priceItem.amount/100
                    }else {
                        cutPrice=this.price*(1-priceItem.amount/10000)
                    }
                    let payPrice = (this.price-cutPrice).toFixed(2);
                    this.freeItem=payPrice==0?true:false
                    return payPrice;

                }
            },
            pwd1FlagNew(){
                if(this.judgeFlag){
                    if(!this.$store.state.reg_pwd.test(this.pwd1)){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            },//设置支付密码，边框提醒功能
            pwd2FlagNew(){
                if(this.judgeFlag){
                    if(!this.$store.state.reg_pwd.test(this.pwd2)){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            },//设置支付密码，边框提醒功能
            smsInputFlag(){
                if(this.judgeFlag){
                    let req = /^[0-9]{6}$/;
                    if(!req.test(this.sms_code)){
                        this.smsTips="验证码格式不正确";
                        this.smsFlag=false;
                        return true;
                    }else{
                        this.smsTips="";
                        this.smsFlag=true;
                        return false
                    }
                }else{
                    return false;
                }
            }
        },
        methods:{
            goback(){
                this.$router.push("/tryout?status="+this.status+"_"+this.listId)
            },
            //==========设置支付密码功能==========
            getCode(){
                if(!this.codeFlag){//为false则无法请求
                    return ;
                }
//                console.log(this.mobile);
                this.sms_code="";//自动清空功能
                cmnSmsSend({
                    mobile:this.mobile+""
                }).then((res)=>{
                    if(res.err_code==0){
                        this.codeTxt="获取验证码("+this.codeCount+")";
//                        console.log(_this.codeTxt);
                        this.codeFlag=false;
                        let timer=setInterval(() => {
                            this.codeCount--;
                            if(this.codeCount==0){
                                this.codeTxt="获取验证码";
                                this.codeFlag=true;
                                this.codeCount=60;
                                clearInterval(timer);
                            }else{
                                this.codeTxt="获取验证码("+this.codeCount+")";
                            }
                        },1000)
                    }
//                    console.log("==========获取短信验证码===============")
                }).catch((err)=>{
                    console.log(err);
                });
            },
            editorClose(){
                this.editorPwd = false;
                this.sms_code="";
                this.pwd1="";
                this.pwd2="";
                this.bgFlag=false;
            },
            filluserinfo(){//1，验证短信验证码是否合格， 2，支付密码的正则和是否一样，3.正确才可以进行修改
//                console.log("=============filluserinfo=========");
                this.sms_code=document.querySelector("#mdf_code").value;
                this.pwd1=document.querySelector("#pay_password").value;
                this.pwd2=document.querySelector("#re_pwd").value;
                this.judgeFlag=true;//打开正则验证开关

                //2，验证短信验证码格式是否正确，
//                console.log(this.smsFlag,"this.smsFlag")
                let req = /^[0-9]{6}$/;
                if(!req.test(this.sms_code)){
                    this.smsFlag=false;
                }else{
                    this.smsFlag=true;
                }

                if(!this.pwd1 || !this.pwd2){
                    this.pwd2Tips="密码不能为空";
                    this.pwdFlag=false;
                }else if(this.pwd1!=this.pwd2){
                    this.pwd2Tips="两次输入的密码不一致";
                    this.pwdFlag=false;
                }else if(!this.$store.state.reg_pwd.test(this.pwd1) || !this.$store.state.reg_pwd.test(this.pwd2)){
                    this.pwd2Tips="输入的密码格式不正确";
                    this.pwdFlag=false;
                }else{
                    this.pwd2Tips="";
                    this.pwdFlag=true;
                }

                if(this.smsFlag && this.pwdFlag){ //验证码符合要求，密码符合要求
//                    console.log("可以发送请求了");
                    //修改用户信息---增加password
                    cmnUserUpdate({
                        id:this.userId,
                        mobile:this.mobile+"",
                        pay_password:this.pwd1+"",
                        sms_code:this.sms_code+""
                    }).then((res)=>{
                        if(res.err_code == 1006){
//                            alert("短信验证码错误");
                            MessageBox.alert("短信验证码错误!","提示");
                        }else if(res.err_code == 0){
//                            alert("支付密码设置成功！");
                            MessageBox.alert("支付密码设置成功!","提示").then(action=>{
                                this.sms_code="";
                                this.pwd1="";
                                this.pwd2="";
                                this.editorPwd=false;
                                this.pay_password=res.data.pay_password;
                                this.bgFlag=false;
                            });

                        }else{
                            MessageBox.alert("未知问题!","提示")
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            },
            //==========确认支付按钮的功能==========
            pay(){
                if(this.status==0){//试用单
                    zcbOrderTryPay({
                        order_id:this.listId*1
                    }).then((res)=>{
                        if(res.err_code==1109){
//                            alert("订单已支付");
                            MessageBox.alert("订单已支付", "提示");
                        }else if(res.err_code==1113){
//                            alert("订单已过期");
                            MessageBox.alert("订单已过期", "提示");
                        }else if(res.err_code==1108){
//                            alert("订单已过期");
                            MessageBox.alert("订单未找到", "提示");
                        }else if (res.err_code==0){
//                            this.$router.push("/paySuccess?status="+this.status+"_"+this.listId);
                            console.log("试用单---支付成功，开始跳转到成功页");
                            goPageHref("vueStatic/paySuccess.html?status="+this.status+"_"+this.listId);
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else if(this.status==1){//正式单，确认并支付,判断是否过期，判断是否已支付
                    //获取用户详细信息---判断否设置过支付密码
                    cmnUserInfo().then((res)=>{
                        console.log(res);
//                        console.log("查询用户信息");
                        this.mobile = res.data.mobile;
                        this.userId = res.data.id;
//                        console.log(_this.userId,"_this.userId======created====")
                        //不存在支付密码，则弹出支付密码设置窗口
                        if(!res.data.pay_password){
                            this.editorPwd = true;
                        }else{ //存在支付密码则======弹出支付窗口
                            this.importPwd = true ;
                        }
                        this.bgFlag=true;
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            },
            //==========输入支付密码付款==========
            pay1(){
                console.log("支付")
                //支付整车保订单-----
                if(!this.$store.state.reg_pwd.test(this.payPwd)){
                    MessageBox.alert("密码格式不正确", "提示");
                    return ;
                }
                Indicator.open('正在出单...');
                this.payFlag = true;
                zcbOrderPay({
                    order_id:this.listId*1,
                    pay_password:this.payPwd+"",
                    coupon_id: this.choseCoupon * 1
                }).then((res)=>{
                    Indicator.close();
                    this.payFlag = false;
                    if(res.err_code == 1004){
                        MessageBox.alert("密码错误", "提示");
                    }else if(res.err_code == 1011){
                        MessageBox.alert("账户余额不足", "提示");
                        this.toPay();
                    }else if(res.err_code == 1108){
                        MessageBox.alert("订单未找到", "提示");
                    }else if(res.err_code == 1109){
                        MessageBox.alert("订单已支付", "提示");
                    }else if(res.err_code == 1110){
                        MessageBox.alert("订单已取消", "提示");
                    }else if(res.err_code == 1112){
                        MessageBox.alert("未发现运单信息", "提示");
                    }else if(res.err_code == 1113){
                        MessageBox.alert("订单已过期", "提示");
                    }else if(res.err_code == 1200){
                        MessageBox.alert("公司名称为空", "提示");
                    }else if(res.err_code == 0){
                        MessageBox.alert("支付成功", "提示").then(action => {
                            this.importPwd = false;
//                            this.$router.push("/paySuccess?status="+this.status+"_"+this.listId)
                            goPageHref("vueStatic/paySuccess.html?status="+this.status+"_"+this.listId);
                        });
                    }
                }).catch((err)=>{
                    this.payFlag = false;
                    console.log(err);
                })
            },
            closePayPwd(){
                this.importPwd=false;
                this.bgFlag=false;
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
            toPay(){
                this.bgFlag = false;
                this.importPwd = false;
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
                if(!this.reg_count.test(this.amount)){
                    Toast({message: '请输入正确充值金额', duration: 3000});
                    return false;
                }else if(this.amount==0){
                    Toast({message: '充值金额必须大于0', duration: 3000});
                    return false;
                }else {
                    this.deposit_step1 = false;
                    Indicator.open({
                        text: '请稍候...',
                        spinnerType: 'fading-circle'
                    });
                    zcbDepositNew({'type':this.payType,redirect_url:this.redirect_url,"amount":this.amount*1}).then((res)=>{
                        if(res.err_code==0){
                            Indicator.close();
                            this.deposit_step2 = true;
                            this.payUrl = res.data.pay_url
                        } else if(res.err_code==1200){
                            MessageBox({
                                title: '提示',
                                message: '您尚未设置公司名称！',
                                showCancelButton: true
                            });
                            this.full_bg = false;
                            Indicator.close();
                        } else {
                            MessageBox({
                                title: '提示',
                                message: '未知错误！',
                                showCancelButton: true
                            });
                            Indicator.close();
                            this.full_bg = false;
                        }
                    }).catch((err)=>{
                        console.log(err);
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
            },

        },
        filters:{ //在替换之前先进行过一次过滤
            number(value,status){
                if(typeof value == 'number'){
                    return value.toFixed(status);
                }
            },
            showCoupon(value,type){//1-现金红包，2-折扣红包
                switch (type*1){
                    case 1 : return (value/100).toFixed(2) ;break;
                    case 2 : return value/1000 ;break;
                }
            },
            trueConpon(value,type,price){
                switch (type*1){
                    case 1 : return (value/100).toFixed(2) ;break;
                    case 2 : return ((1-value/10000)*(price)).toFixed(2) ;break;
                }
            },
            showDate(value){
                let day = value.substring(0,value.indexOf("T"));
                let hour = value.substring(value.indexOf("T")+1,value.indexOf("+"));
                return day+" "+hour;
            }
        },
        created(){
            //mark
            this.bgFlag=true;
            Indicator.open();
//            this.getCookie(this.$store.state.jubao_user);
            this.redirect_url = window.location.href ;
            let location = window.location.href;
            let beforeStr = location.substring(location.indexOf("?")+1);
            if(beforeStr.indexOf("?")!=-1){
                beforeStr=beforeStr.substring(beforeStr.indexOf("?")+1)
            }
            let locMsg = beforeStr.substring(beforeStr.indexOf("?") + 1).split("_");
//            let locMsg =window.location.href.substring(window.location.href.indexOf('?')+1).split("&");
            this.status= locMsg[0].split('=')[1];
            this.listId = locMsg[1];

            let typeAjax = '';
            if(this.status==0){//试用
                typeAjax = zcbOrderTryInfo;
                this.isFormal=false;
            }else if(this.status==1){//正式
                typeAjax = zcbOrderInfo;
                this.isFormal=true;
            }
            typeAjax(this.listId).then((res)=>{
                let tempMsg = res.data;
                this.policyholder = tempMsg.policyholder; //此处设置为投保人与被保险人相同
                this.beneficiary=tempMsg.policyholder;
                this.startProvince=tempMsg.start_province;
                this.startCity=tempMsg.start_city;
                this.endProvince=tempMsg.end_province;
                this.endCity=tempMsg.end_city;
                this.coverage=tempMsg.coverage;
                this.price=tempMsg.price/100;
                this.distance=tempMsg.distance;
                this.carNumT=tempMsg.plate_no;
                this.carNumG=tempMsg.plate_extra_no;

                let orderLists = [];
                let linkLists=[];
//                console.log(tempMsg.cargos);
                for(let i=0;i<tempMsg.cargos.length;i++){
                    if(!tempMsg.cargos[i].file_url){ //fileUrl为空则为物流订单，不为空则为文件链接
                        orderLists.push(tempMsg.cargos[i])
                    }else{
                        linkLists.push(tempMsg.cargos[i])
                    }
                }
                this.orderLists=orderLists;
                this.linkLists=linkLists;
                if(linkLists[0]){
                    this.linkFlag=true;
                }
                this.bgFlag=false;
                Indicator.close();
            }).catch((err)=>{
                console.log(err)
            });
            //查看用户是否有优惠券，并展示
            if(getToken()){
//                console.log(this.token,"优惠券")
                cmnCouponList().then((res)=>{
                    console.log(res,"优惠券");
                    if(res.err_code==0){
                        // res.rows
                        let finallist=[];
                        for(let i=0;i<res.rows.length;i++){
//                        let expiredTime=new Date(res.rows[0].expired_at);
//                        let currentTime = new Date();
                            if(new Date()<new Date(res.rows[i].expired_at) && !res.rows[i].used){
                                finallist.push(res.rows[i])
                            }
                        }
                        this.couponRow=finallist;
                    }else{
                        alert("未知错误")
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }


        },
        mounted(){
            this.isWx();
        },
        updated(){

        }
    }
</script>

<style lang="scss" scoped>
@import "../css/payConfirm";
@import "../css/common";
.list{
    font-size: 1.2rem;
    color: #454545;
    li{
        display: flex;
        margin-bottom: .6rem;
        .list-l{
            text-align: right;
            width: 22%;
        }
        .list-r{
            width: 78%;
        }
    }
}
.strong{
    font-weight: bold;
}
</style>
