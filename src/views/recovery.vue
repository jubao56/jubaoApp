<template>
<div>
    <new-head url="/dashboard" title="修改密码"></new-head>
    <article class="artic">
    	  <div class="main">
            <div class="reg">
                <div class="reg_box">
                    <ul>
                        <li>
                            <input name="phone" id="reg_phone" value="" maxlength="30" type="text" :placeholder="placeholder" v-model.trim="mobile" :disabled="isDisable">
                        </li>
                        <li style="height:1rem">&nbsp;</li>
                        <li>
                            <input name="code" id="captcha" type="text" placeholder="图形验证码" style="width:40%;float:left;" maxlength="5" v-model.trim="captcha_code">
                            <img style="cursor:pointer; width:42%;height:3rem;float:right;" id="captcha_img" :src="img" @click="getCaptcha">
                            <input type="hidden" id="captchaid" :value="captcha_id" >
                        </li>
                        <li style="height:1rem">&nbsp;</li>
                        <li>
                            <input name="code" id="code" type="text" placeholder="验证码" style="width:40%;" maxlength="6" v-model.trim="sms_code">
                            <input class="dl_but" type="button" @click="getSmsCode" :value="yzm_text" style="width:44%; margin:0 0 0 4%; " :disabled=" yzm_text !== '获取验证码' ? true : false">
                        </li>
                        <li style="height:1rem">&nbsp;<input type="hidden" id="code_hid" value="-1"></li>
                    	  <li><input name="password" id="reg_password" type="password" placeholder="密码  6-16位,必须包含数字,字母." maxlength="30" v-model.trim="password" @bulr="testPassword"></li>
						            <li style="height:1rem">&nbsp;</li>
					            	<li><input name="password" id="re_pwd" type="password" placeholder="确认密码  6-16位,必须包含数字,字母." maxlength="30" v-model.trim="password_comfirm" @bulr="checkPassword"></li>
                    </ul>
                    <p style="color:red;">&nbsp;</p>
                    <!--<div style="height: 1.26rem;">
                        <span id="span_tip" style="color: red; background: url('../img/L_tips.png') no-repeat left center; padding-left: 1.26rem;display:none; ">&nbsp;</span>
                    </div>-->
                    <input class="dl_but" type="button" @click="save" value="保存">
                    <p>&nbsp;</p>

                    <p class="copyright">©聚保平台</p>
                </div>
            </div>
        </div>
	</article>
</div>
</template>

<script>
import { Toast,MessageBox} from 'mint-ui';
import { cmnCaptchaNew,cmnUserRecover,cmnSmsSend,cmnUserInfo,getToken } from '../libs/api'
import { getCookie } from '../libs/common'
import base64 from 'base-64'
import NewHead from '../components/NewHead.vue'
export default {
    components:{
      "new-head":NewHead,
    },
    data(){
        return {
            placeholder:'', // 原本的手机号
            mobile: '',
            yzm_text: '获取验证码',
            captcha_id: '',
            captcha_code: '',
            password: '',
            password_comfirm: '',
            sms_code: '',
            isDisable: true
        }
    },
    computed: {
        img(){
            if(this.captcha_id){
                return this.$store.state.cmnUrl +'/v1/cmn/captcha/new/' + this.captcha_id + '.png'
            }else{
                return null;
            }
        },

    },
    methods: {
        getUserInfo(){
            if(getToken()){
                cmnUserInfo().then(res=>{
                    if(res.err_code == 0){
//                    this.placeholder = res.data.mobile;
                        this.mobile = res.data.mobile;
                    }
                }).catch((err)=>{ console.log("cmnUserInfo",err) })
            }else if(getCookie('rmbUser') == 'true'){
                this.mobile = base64.decode(getCookie('username'));
                this.isDisable = false;
            }else{
                this.placeholder = '请输入手机号';
                this.isDisable = false;
            }
        },
        save(){
            if(!this.mobile){
                Toast({message: '请输入手机号！', duration: 3000});
                return false;
            }else if(!this.sms_code){
                Toast({message: '请输入手机验证码！', duration: 3000});
                return false;
            }else if(!this.testPassword()||!this.checkPassword()){
                return false;
            }else if(!this.password){
                Toast({message: '请输入密码！', duration: 3000});
                return false;
            }else if(!this.password_comfirm){
                Toast({message: '请确认密码！', duration: 3000});
                return false;
            }else {
                let data = {'mobile':this.mobile,'sms_code':this.sms_code,'login_password':this.password};
                cmnUserRecover(data).then(res=>{
                    if(res.err_code == 1006){
                        MessageBox({
                            title: '提示',
                            message: '短信验证码错误',
                            showCancelButton: true
                        });
                    }else if(res.err_code == 1007){
                        MessageBox({
                            title: '提示',
                            message: '用户已注册',
                            showCancelButton: true
                        });
                    }else if(res.err_code == 0){
                        Toast({
                            message: "密码修改成功",
                            duration: 3000
                        });
                        this.$router.push('dashboard');
                    }else if(res.err_code == 1010){
                        MessageBox({
                            title: '提示',
                            message: '未找到用户!',
                            showCancelButton: true
                        });
                    }
                }).catch((err)=>{ console.log("cmnUserRecover",err) })
            }
        },
        getCaptcha(){
            cmnCaptchaNew().then((res)=>{
                this.captcha_id = res.data.captcha_id;
            }).catch((err)=>{ console.log("cmnCaptchaNew",err) })
        },
        getSmsCode(){
                if(!this.captcha_code){
                    Toast({message: '请输入图形验证码！', duration: 2000}); return false;
                }else if(!this.mobile){
                    Toast({message: '请输入手机号！', duration: 2000}); return false;
                }else if(!this.$store.state.reg_phone.test(this.mobile)){
                    Toast({message: '请输入正确手机号！', duration: 2000}); return false;
                }else {
                    let data = {'mobile':this.mobile,'captcha_id':this.captcha_id,'captcha_code':this.captcha_code};
                    cmnSmsSend(data).then((res)=>{
                        if(res.err_code == 1005){
                            Toast({message: '图形验证码错误'});
                            this.getCaptcha();
                            this.captchaCode = '';
                        }else if(res.err_code == 0){
                            Toast({message: '短信验证码发送成功,请在60秒内输入!'});
                            var time = 60;
                            this.yzm_text = '获取验证码('+ time + ')';
                            var reg_validBtn = setInterval(()=>{
                                time --;
                                this.yzm_text = '获取验证码('+ time + ')';
                                if (time == 0) {
                                    this.yzm_text = "获取验证码";
                                    window.clearInterval(reg_validBtn);
                                }
                            }, 1000);
                        }else {
                            Toast({message: '未知错误'});
                        }
                    }).catch((err)=>{ console.log("cmnSmsSend",err) })
                }
            },
        testPassword(){
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
        checkPassword(){
            if(this.password!=this.password_comfirm){
                    MessageBox({
                        title: '提示',
                        message: '两次输入的密码不一致！',
                        showCancelButton: true
                    });
                    this.password_comfirm = '';
                    return false;
                }else {
                    return true;
                }
        }

    },
    created(){
        this.getCaptcha();
        this.getUserInfo();
    }
}

</script>

<style lang="scss" scoped>
@import '../css/common';
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
.header .h_top a.go_back { position: absolute;left: 15px;};
</style>
