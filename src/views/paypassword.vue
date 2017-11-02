<template>
<div>
    <new-head url="/dashboard" title="支付密码"></new-head>
    <article class="artic">
        <div class="password">
            <div class="mm_box" style="padding-top:4rem;">
				<!--<p style="text-align:center; line-height:4rem;">设置支付密码</p>-->
              <p style="text-align:center; line-height:4rem;">&nbsp;</p>
                <input class="txt" maxlength="6" id="mdf_pay_code" type="text" placeholder="验证码" style="width:45%" v-model.trim="sms_code">
				<input class="dl_but" type="button" @click="getSmsCode" :value="yzm_text" style="width:40%; margin:0 4%;background: #3c93e8; padding: 0 4%; height:3rem;color: #fff; font-size: 1rem;border:1px #3c93e8 solid; cursor: pointer;" :disabled=" yzm_text !== '获取验证码' ? true : false">
                <p>&nbsp;</p>
                <input type="hidden" id="mdf_payflag_code" value="-1">
                <input class="txt" name="password" id="mdf_payreg_password" type="password" placeholder="新密码 6-16位，建议数字、字母、符号组合" v-model.trim="password" @blur="testPassword">
                <p>&nbsp;</p>
                <input class="txt" name="re_password" id="mdf_payre_pwd" type="password" placeholder="确认密码" v-model.trim="password_comfirm" @blur="checkPassword" >
                <div>&nbsp;</div>
                <span>{{warn_text}}</span>
                <div style="height:1.3rem;">
                    <span id="span_tip" style="color:red;padding-left:1.26rem;display:none">&nbsp;11</span>
                </div>
                <div style="height:1.3rem;">
                    <span id="span_suc" style="display:none;color:red;padding-left:1.26rem;line-height:0;vertical-align:middle">&nbsp;</span>
                </div>
                <input class="but"  type="submit" value="提交" @click="submit">
                <p class="copyright">©聚保平台</p>
            </div>
        </div>
	</article>
</div>
</template>

<script>
import {Toast, MessageBox } from 'mint-ui';
import { cmnUserInfo,cmnUserUpdate,cmnSmsSend } from '../libs/api'
import NewHead from '../components/NewHead.vue'
export default {
    components:{
      "new-head":NewHead,
    },
    data(){
        return {
            yzm_text: '获取验证码',
            sms_code: '', // 验证码
            password: '', // 密码
            password_comfirm: '', //确认密码
            warn_text: '',
            mobile: '', //用户手机号
            id: '', //用户Id
            axios: this.$store.state.axios, //axios 请求
            cmnUrl: this.$store.state.cmnUrl,// cmnUrl 地址

        }
    },
    methods: {
        getSmsCode(){
            let data = { mobile: this.mobile };
            cmnSmsSend(data).then(res=>{
                if(res.err_code == 0){
                    Toast({message: '短信验证码发送成功,请在60秒内输入!'});
                    var time = 60;
                    this.yzm_text = '获取验证码('+ time + ')';
                    var reg_validBtn = setInterval(()=>{
                        time--;
                        this.yzm_text = '获取验证码('+ time + ')';
                        if (time == 0) {
                            this.yzm_text = "获取验证码";
                            window.clearInterval(reg_validBtn);
                        }
                    }, 1000);
                }
            }).catch((err)=>{ console.log("cmnSmsSend",err) })
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
        },
        submit() {
            if(!this.mobile){
                    Toast({message: '请输入手机号！'}); return false;
                }else if(!this.sms_code){
                    Toast({message: '请输入手机验证码！'}); return false;
                }else if(!this.testPassword()||!this.checkPassword()){
                    return false;
                }else if(!this.password){
                    Toast({message: '请输入密码！'}); return false;
                }else if(!this.password_comfirm){
                    Toast({message: '请确认密码！'}); return false;
                }else{
                    let data = { id: this.id, mobile: this.mobile, pay_password: this.password, sms_code: this.sms_code }
                    cmnUserUpdate(data).then(res=>{
                        if(res.err_code == 0){
                            Toast({ message: '操作成功', duration: 2000 });
                            this.$router.push('/dashboard');
                        }else if(res.err_code == 1006){
                            Toast({ message: '短信验证码错误'})
                        }
                    }).catch((err)=>{ console.log("cmnUserUpdate",err) })
                }
        }
    },
    created(){
        cmnUserInfo().then(res=>{
            this.mobile = res.data.mobile;
            this.id = res.data.id;
        }).catch((err)=>{ console.log("cmnUserInfo",err) })
    }
}

</script>

<style lang="scss" scoped>
@import '../css/common';
#span_tip{background:url('../img/L_tips.png') no-repeat left center;}
#span_suc{background:url('../img/success.png') no-repeat left center;}
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
.header .h_top a.go_back { position: absolute;left: 15px;};
.artic .password .mm_box .but {
   margin-top: 0;
}
</style>
