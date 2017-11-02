<template>
    <div>
        <new-head url="/" title="登录"></new-head>
        <article class="artic">
            <div class="main">
                <div class="reg">
                    <div class="reg_box">
                        <ul>
                            <li>
                                <input v-model.trim="username" id="username" value="" maxlength="30" type="text" placeholder="手机号码/用户名">
                            </li>
                            <li style="height:1rem">&nbsp;</li>
                            <li>
                                <input v-model.trim="password" id="password" type="password" value="" maxlength="30" placeholder="密码">
                            </li>
                        </ul>
                        <p style="padding-top: 1rem;">&nbsp;<label><input class="chose1" type="checkbox" v-model="rememberMe"><span>记住密码</span></label></p>
                        <!--<div style="height: 1.26rem;">
                            <span id="span_tip" style="color: red; background: url('../img/L_tips.png') no-repeat left center; padding-left: 1.2rem; display:none;">&nbsp;</span>
                        </div>-->
                        <input class="dl_but" type="button" id="btn_login" @click="login" value="登录">
                        <input class="zc_but" name="" type="button" style="margin-top: 2rem;" @click="register" value="注册">
                        <p>&nbsp;</p>
                        <p class="forget" style="text-align: center;"><router-link to="/recovery">忘记密码</router-link></p>
                        <p class="copyright">©聚保平台</p>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
<script>
    import {mapMutations} from "vuex"
    import { Toast,MessageBox} from 'mint-ui';
    import base64 from 'base-64'
    import { cmnUserLogin } from '../libs/api'
    import NewHead from '../components/NewHead.vue'
    import {setPlusStorage} from "../libs/common"
    export default {
        components:{
          "new-head":NewHead,
        },
        data(){
            return {
                username:'',
                password:'',
                rememberMe: false
            }
        },
        methods:{
            ...mapMutations({removeFs:'REMOVEFS'}),
            setCookie(name,value,time){
                let hours = time?time:4;  //单位小时
                let exp = new Date();
                exp.setTime(exp.getTime() + hours*60*60*1000);
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";
            },
            getCookie(name){
                let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
                if (arr = document.cookie.match(reg)) {
                    return unescape(arr[2]) ;
                }else {
                    return null ;
                }
            },
            login(){
                this.rememberUser(); //记住密码
                let _this = this;
                if(!this.username){
                    Toast({message: '请输入手机号', duration: 3000});
                }else if(!this.$store.state.reg_phone.test(this.username)){
                    Toast({message: '请输入正确手机号', duration: 3000});
                }else if(!this.password){
                    Toast({message: '请输入密码', duration: 3000});
                }else {
                    let data = { "mobile":this.username, "password":this.password };
                    cmnUserLogin(data).then(res=>{
                        if(res.err_code==1004){
                            MessageBox({
                                title: '提示',
                                message: '密码错误!'
                            }).then(action=>{
                                _this.password = ''
                            });
                        }else if(res.err_code ==1010){
                            MessageBox.confirm('此手机号尚未注册！将前往注册').then(action => {
                                _this.$router.push("/register")
                            });
                        }else if(res.err_code == 0){
                            _this.setCookie(_this.$store.state.jubao_user,res.data.access_token);
                            setPlusStorage("token",res.data.access_token)
//                            document.cookie = _this.$store.state.jubao_user+'=' + res.data.access_token;
                            _this.$router.push("/dashboard")
                        }else if(res.err_code == 1014){
                            MessageBox({
                                title: '提示语',
                                message: '您的账户已被锁定，请联系管理员40080-59680！',
                                showCancelButton: true
                            })
                        }else {
                            Toast({message: '未知错误！', duration: 3000});
                        }
                    }).catch((err)=>{ console.log("cmnUserLogin",err) })
                }
            },
            register(){
                this.$router.push("/register")
            },
            rememberUser(){
                if(this.rememberMe){
                    this.setCookie("rmbUser", "true", 30*24 ); //存储一个带 30 天期限的cookie
                    this.setCookie("username", base64.encode(this.username), 30*24);
                    this.setCookie("password", base64.encode(this.password), 30*24);
                }else {
                    this.setCookie("rmbUser", "false", -1 ); //存储一个带 30 天期限的cookie
                    this.setCookie("username", this.username, -1);
                    this.setCookie("password", this.password, -1);
                }
            },
            readrmbUser(){
                if(this.getCookie('rmbUser') == 'true'){
                    this.rememberMe = true;
                    this.username = base64.decode(this.getCookie('username'));
                    this.password = base64.decode(this.getCookie('password'));
                }
            }
        },
        created(){
            this.readrmbUser();
            this.removeFs();
        },
    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    .header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
    .header .h_top a.go_back { position: absolute;left: 15px;};
</style>
