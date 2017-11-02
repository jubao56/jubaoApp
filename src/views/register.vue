<template>
    <div>
        <new-head url="/" title="注册"></new-head>
        <article class="artic">
            <div class="reg">
                <div class="reg_box">
                    <ul>
                        <li style="height:1rem">&nbsp;</li>
                        <li>
                            <input v-model.trim="phone" name="phone" type="text" placeholder="手机号 填写手机号" id="phoneNumber" maxlength="11">
                            <input id="flag_phone" value="0" type="hidden">
                        </li>
                        <li style="height:1rem">&nbsp;</li>
                        <li>
                            <input name="code" id="captcha" v-model.trim="captchaCode" type="text" placeholder="图形验证码" style="width:40%;float:left;" maxlength="5">
                            <img @click="getCaptcha" style="cursor:pointer; width:42%;height:3rem;float:right;" id="captcha_img" :src="imgUrl" >
                            <input type="hidden" id="captchaid" value="w8ciDViVLmSVmtcO8nQV">
                        </li>
                        <li style="height:1rem">&nbsp;</li>
                        <li>
                            <input v-model.trim="smsCode" name="code" id="code" type="text" placeholder="验证码" style="width:40%;" maxlength="6">
                            <input type="hidden" id="flag_code" value="-1">
                            <a @click="getSmsCode" style="background:#3c93e8; background-size:100% 100%;display:inline-block; width:42%; height:3rem; line-height:3rem; font-family:'Microsoft YaHei'; color:#fff; text-align:center; margin:0 4% ;float:right" href="javascript:void(0);" id="reg_validCode">获取验证码{{codeTime}}</a>
                        </li>
                        <li style="height:1rem">&nbsp;<input type="hidden" id="code_hid" value="-1"></li>
                        <li><input @blur="testPass" v-model.trim="password"  name="password" id="reg_password" type="password" placeholder="密码  6-10位,必须包含数字,字母." maxlength="30"></li>
                        <!--<li>
                            <input style="width:1rem; height:1rem;" type="checkbox" id="togglePassword">
                            <label for="togglePassword">显示密码</label>
                        </li>-->
                        <li style="height:1rem">&nbsp;</li>
                        <li><input @blur="reTestPass" v-model.trim="checkPass" name="password" id="re_pwd" type="password" placeholder="确认密码  6-10位,必须包含数字,字母." maxlength="30"></li>
                        <li style="text-align:right;font-size:1rem;">
                            <input v-model="agreeTerms"  name="agree" id="ck_server" type="checkbox" style="width:1.3rem">
                            <router-link to="/protocol" style="color:#1c93e8">我已阅读并接受聚保平台服务协议</router-link>
                        </li>
                    </ul>
                    <!--<div style="height:1.26rem;">
                        <span id="span_tip" style="color:red;background:url('../img/L_tips.png') no-repeat left center;padding-left:1.26rem;display:none;">&nbsp;</span>
                    </div>-->
                    <input class="zc_but" name="" type="submit" value="注册" @click="register">
                    <p class="copyright">©聚保平台</p>
                </div>
            </div>
        </article>
        <router-view style="z-index: 1000"></router-view>
    </div>
</template>

<script>
    import {mapMutations} from "vuex"
    import { Toast,MessageBox} from 'mint-ui';
    import {cmnCaptchaNew,cmnSmsSend,cmnUserRegister} from "../libs/api"
    import NewHead from '../components/NewHead.vue'
    export default {
        components:{
          "new-head":NewHead,
        },
        data(){
            return {
                captcha:"",//图形验证码地址参数
                captchaCode:"",//图形验证码
                phone:"",//电话
                smsCode:"",//短信验证码
                codeTime:"",//倒计时
                password:"",//密码
                checkPass:"",//确认密码
                agreeTerms:false,//同意条款
                timerFlag:true, //验证码功能是否禁用
            }
        },
        computed:{
            imgUrl(){
                return this.captcha ? this.$store.state.cmnUrl+'/v1/cmn/captcha/new/'+this.captcha+'.png' : null;
            }
        },
        methods:{
            ...mapMutations({
                setStorage: "SETSTORAGE",
            }),
            setCookie(name,value){
                let hours = 4;  //单位小时
                let exp = new Date();
                exp.setTime(exp.getTime() + hours*60*60*1000);
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+ ";path=/";
            },
            //获取图形验证码
            getCaptcha(){
                cmnCaptchaNew().then((res)=>{
                    this.captcha = res.data.captcha_id;
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //获取手机验证码
            getSmsCode(){
                //var t = 60;
                if(!this.captchaCode){
                    Toast({message: '请输入图形验证码！', duration: 3000});
                    return false;
                }else if(!this.phone){
                    Toast({message: '请输入手机号！', duration: 3000});
                    return false;
                }else if(!this.$store.state.reg_phone.test(this.phone)){
                    Toast({message: '请输入正确手机号！', duration: 3000});
                    return false;
                }else {
                    if(!this.timerFlag){
                        return ;
                    }
                    this.timerFlag=false;
                    cmnSmsSend({
                        'mobile': this.phone,
                        'captcha_id': this.captcha,
                        'captcha_code': this.captchaCode
                    }).then((res)=>{
                        if(res.err_code==1005){
                            Toast({message: '图形验证码错误！', duration: 3000});
                            this.getCaptcha();
                            this.captchaCode = '';
                            this.timerFlag=true;
                        }else if(res.err_code==0){
                            Toast({message: '短信验证码发送成功,请在60秒内输入！', duration: 3000});
                            this.codeTime = 60;
                            let reg_validBtn = setInterval(()=>{
                                this.codeTime--;
                                if (this.codeTime == 0) {
                                    this.codeTime = "";
                                    window.clearInterval(reg_validBtn);
                                    this.timerFlag=true;
                                    //_this.codeTime = 60;
                                }
                            }, 1000);
                        }else {
                            Toast({message: '未知错误！', duration: 3000});
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            },
            //验证密码
            testPass(){
                if(!this.$store.state.reg_pwd.test(this.password)){
                    MessageBox({
                        title: '提示',
                        message: '密码必须是6~16位,包含数字、字母，并不含特殊字符及空格！请输入正确密码格式',
                        showCancelButton: true
                    });
                    return false;
                }else {
                    return true;
                }
            },
            //确认密码
            reTestPass(){
                if(this.password!=this.checkPass){
                    MessageBox({
                        title: '提示',
                        message: '两次输入的密码不一致！',
                        showCancelButton: true
                    });
                    this.checkPass = '';
                    return false;
                }else {
                    return true;
                }
            },
            //注册
            register(){
                if(!this.phone){
                    Toast({message: '请输入手机号！', duration: 3000});
                    return false;
                }else if(!this.smsCode){
                    Toast({message: '请输入手机验证码！', duration: 3000});
                    return false;
                }else if(!this.testPass()||!this.reTestPass()){
                    return false;
                }else if(!this.password){
                    Toast({message: '请输入密码！', duration: 3000});
                    return false;
                }else if(!this.checkPass){
                    Toast({message: '请确认密码！', duration: 3000});
                    return false;
                }else if(!this.agreeTerms){
                    Toast({message: '请阅读并接受聚保物流平台服务协议！', duration: 3000});
                }else {
                    let registerData = {'mobile':this.phone,'sms_code':this.smsCode,'password':this.password} ;
                    if(window.sessionStorage.getItem("jubao56")!=null){
                        let registerDefault = JSON.parse(window.sessionStorage.getItem("jubao56")).registerDefault;
                        if(typeof registerDefault !="undefined"){
                            registerData.product_type = registerDefault.product_type;
                            registerData.alias = registerDefault.alias;
                        }
                    }
                    // let registerData = {'mobile':_this.phone,'sms_code':_this.smsCode,'password':_this.password} ;
                    // if(typeof this.$route.query.product_type!='undefined'){
                    //     registerData.product_type=this.$route.query.product_type*1
                    // }
                    // if(typeof this.$route.query.alias!='undefined'){
                    //     registerData.alias=this.$route.query.alias
                    // }
                    cmnUserRegister(registerData).then((res)=>{
                        if(res.err_code==1006){
                            MessageBox({
                                title: '提示',
                                message: '短信验证码错误'
                            });
                        }else if(res.err_code==1007){
                            MessageBox({
                                title: '提示',
                                message: '用户已注册'
                            });
                        }else if(res.err_code==0){
                            MessageBox.alert('注册成功').then(action => {
//                                console.log(res,'222')
                                this.setCookie(this.$store.state.jubao_user,res.data.access_token);
                                this.$router.push("/dashboard")
                            });
                        }else {
                            MessageBox({
                                title: '提示',
                                message: '未知错误!'
                            });
                        }
                    }).catch((err)=>{
                        MessageBox({
                          title: '提示',
                          message: '网络错误！'
                        });
                        console.log(err)
                    })
                }
            },
        },
        created(){
            this.getCaptcha();
            // 保存默认渠道location参数  eg: ?product_type=3&alias=wlw
            let defaultChannelData = {};
//            console.log(this.$route.query.product_type);
//            console.log(this.$route.query.alias);
            if(this.$route.query.product_type != undefined && this.$route.query.alias!= undefined ){
                defaultChannelData.product_type = this.$route.query.product_type*1;
                defaultChannelData.alias = this.$route.query.alias;
                this.setStorage({
                    registerDefault:defaultChannelData
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    .header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
    .header .h_top a.go_back { position: absolute;left: 15px;};
</style>
