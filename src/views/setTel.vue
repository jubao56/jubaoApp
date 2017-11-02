<template>
<div>
    <new-head url="/dashboard" title="我的手机号"></new-head>
    <article class="artic">
        <div class="password">
            <div class="mm_box">
                <div style="height:1.2rem;">
                    <span id="span_suc" style="color:red;padding-left:1.26rem;line-height:2rem;font-size:1.5rem;vertical-align:middle">您的手机号:</span>
                    <div style="line-height:2.5rem;font-size:1.3rem;vertical-align:middle;">
                        {{mobile}}
                    </div>
                </div>
            </div>
        </div>
    </article>
    <article class="artic">
        <div class="password">
            <div class="mm_box" style="padding-top:4rem;">
                <input class="txt" name="mobile" id="mdf_payreg_mobile" type="number" placeholder="新手机号" v-model.trim="newMobile" @blur="testTel">
                <p>&nbsp;</p>
                <input class="txt" maxlength="6" id="mdf_pay_code" type="text" placeholder="验证码" style="width:45%" v-model.trim="sms_code">
                <input class="dl_but" type="button" @click="getSmsCode" :value="yzm_text" style="width:40%; margin:0 4%;background: #3c93e8; padding: 0 4%; height:3rem;color: #fff; font-size: 1rem;border:1px #3c93e8 solid; cursor: pointer;" :disabled=" yzm_text !== '获取验证码' ? true : false">
                <!--<p>&nbsp;</p>-->
                <div>&nbsp;</div>
                <span>{{warn_text}}</span>
                <div style="height:1.3rem;">
                    <span id="span_tip" style="color:red;padding-left:1.26rem;display:none">&nbsp;11</span>
                </div>
                <div style="height:1.3rem;">
                    <span id="span_suc" style="display:none;color:red;padding-left:1.26rem;line-height:0;vertical-align:middle">&nbsp;</span>
                </div>
                <input class="but"  type="submit" value="提交" @click="fixMobile()">
                <p class="copyright">©聚保平台</p>
            </div>
        </div>
    </article>
</div>
</template>

<script>
import {cmnSmsSend,cmnUserUpdate,cmnUserInfo} from '../libs/api'
import {Toast, MessageBox } from 'mint-ui';
import NewHead from '../components/NewHead.vue'
export default {
    components:{
      "new-head":NewHead,
    },
    data(){
        return {
            yzm_text: '获取验证码',
            sms_code: '', // 验证码
            warn_text: '',
            mobile: '', //用户手机号
            newMobile: '', // 新手机号
            id: '', //用户Id
            axios: this.$store.state.axios, //axios 请求
            cmnUrl: this.$store.state.cmnUrl,// cmnUrl 地址

        }
    },
    methods: {
        // 获取验证码
        getSmsCode(){
            if(this.newMobile == ""){
                MessageBox({
                    title: '提示',
                    message: '请先输入手机号',
                    showCancelButton: true
                });
                return;
            }else if(this.newMobile == this.mobile){
                MessageBox({
                    title: '提示',
                    message: '请勿设置重复手机号',
                    showCancelButton: true
                });
                return;
            }
            let data = {mobile: this.newMobile};
            cmnSmsSend(data).then((res)=>{
                if(res.err_code==0){
                    Toast({message: '短信验证码发送成功,请在60秒内输入！', duration: 3000});
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
        // 验证手机号
        testTel(){
            if(!this.$store.state.reg_phone.test(this.newMobile)){
                MessageBox({
                    title: '提示',
                    message: '请输入正确的手机号',
                    showCancelButton: true
                });
                return;
            }
        },
        // 提交变更
        fixMobile() {
            if(!this.newMobile){
                    Toast({message: '请输入手机号！', duration: 3000}); return false;
                }else if(!this.sms_code){
                    Toast({message: '请输入手机验证码！', duration: 3000}); return false;
                }else{
                    let data =  { id: this.id, mobile: this.newMobile, sms_code: this.sms_code };
                    cmnUserUpdate(data).then((res)=>{
                        if(res.err_code == 0){
                            Toast({
                                message: '操作成功',
                                duration: 2000
                            });
                            this.$router.push('/dashboard');
                        }else if(res.err_code == 1006){
                            Toast({
                                message: '短信验证码错误',
                            })
                        }else if(res.err_code == 1007){
                            Toast({
                                message: '用户已存在',
                            })
                        }else{
                            console.log("其它错误",res.err_code);
                        }
                    }).catch((err)=>{ console.log("cmnUserUpdate",err) })
                }
        }
    },
    created(){
        cmnUserInfo().then((res)=>{
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
.artic .password .mm_box .but{
  margin-top: 0;
}
</style>
