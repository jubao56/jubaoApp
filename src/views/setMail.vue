<template>
<div>
    <new-head url="/dashboard" title="我的邮箱"></new-head>
    <!--artic-->
    <article class="artic" v-if="mail">
        <div class="password">
            <div class="mm_box">

                <div style="height:1.2rem;">
                    <span id="span_suc" style="color:red;padding-left:1.26rem;line-height:2rem;font-size:1.5rem;vertical-align:middle">您已设置邮箱！</span>
                    <div style="padding-left:1.26rem;line-height:2rem;font-size:1.3rem;vertical-align:middle">
                        邮箱为: {{ mail }}
                    </div>
                </div>
            </div>
        </div>
    </article>
    <article class="artic">
        <div class="password">
            <div class="mm_box">
                <input class="txt" name="company_name" id="reg_company" type="text" placeholder="请输入邮箱" v-model.trim="setmail">
                <div style="height:1.3rem;">
                    <span id="span_tip" style="color:red;padding-left:1.26rem;display:none">&nbsp;11</span>
                </div>
                <input class="but" @click="fillEmail()" type="submit" id="sub" style="margin:0;" :value="mail?'重置':'设置'" >
                <input class="but" @click="$router.push('/dashboard')" type="submit" value="返回个人中心" id="next" style="margin-top: 1.167rem;">
              <p class="copyright">©聚保平台</p>
            </div>
        </div>
    </article>
</div>
</template>

<script>
import {cmnUserInfo,cmnUserUpdate} from '../libs/api'
import {Toast} from 'mint-ui';
import NewHead from '../components/NewHead.vue'
export default {
    components:{
      "new-head":NewHead,
    },
    data(){
        return {
            mail: '',
            setmail: '',
            userId: '', // 更新邮箱必带参数
            phone: '',  // 更新邮箱必带参数
        }
    },
    methods: {
        fillEmail(){
                if(!this.setmail){
                    Toast('请输入邮箱地址！');
                    return false;
                }else if(!this.$store.state.reg_email.test(this.setmail)){
                    Toast('请输入正确邮箱地址!');
                    return false;
                }else {
                    let data = {"id":this.userId,"mobile":this.phone,"email":this.setmail};
                    cmnUserUpdate(data).then((res)=>{
                        if(res.err_code == 0){
                            Toast('修改邮箱成功!');
                            this.mail = res.data.email;
                        }else {
                            Toast('未知错误!');
                        }
                    }).catch((err)=>{ console.log("cmnUserUpdate",err) })
                }
            },
    },
    created(){
        cmnUserInfo().then((res)=>{
            this.phone = res.data.mobile;
            this.userId = res.data.id;
            if(res.err_code == 0) {
                this.mail = res.data.email;
            }
        }).catch((err)=>{
            console.log("cmnUserInfo",err)
        })
    }
}
</script>
<style lang="scss" scoped>
@import '../css/common';
.header .h_top a.go_back { position: absolute;left: 15px;};
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
#span_tip{background:url('../img/L_tips.png') no-repeat left center;}
#span_suc{background:url('../img/success.png') no-repeat left center;}
.artic .password .mm_box .but:last-child { margin-bottom: 10.167rem; margin-top: 0; }
</style>
