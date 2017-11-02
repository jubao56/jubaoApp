<template>
    <header class="header">
            <div class="h_top">
                <div class="h_left fl">
                    <router-link class="a_left" :to="$store.state.token?'/dashboard':'/login'">
                        <img src="../img/user.png">
                    </router-link>
                </div>
                <div class="logo">
                    <router-link to="/">
                        <img :src="$store.state.logo">
                    </router-link>
                </div>
                <div class="h_right fr">
                    <a class="phone" href="tel:4008059680">
                        <img src="../img/phone.png">
                    </a>
                </div>
                <!--<div class="gray">
                    <div class="side_box">
                        <div class="login">
                            <div class="head_box">
                                <div class="head">
                                    <a href="javascript:void(0);">
                                        <img src="../img/login_head.png">
                                    </a>
                                    <p>未登录</p>
                                </div>

                            </div>
                            <div class="login_con">
                                <div class="text_list">
                                    <ul>
                                        <li>
                                            <input id="username" value="" maxlength="30" type="text" placeholder="手机号码/用户名">
                                        </li>
                                        <li>
                                            <input id="password" type="password" value="" maxlength="30" placeholder="密码">
                                        </li>
                                    </ul>
                                    <p>&nbsp;<input class="chose1" type="checkbox" id="ck_auto"><span>记住密码</span></p>
                                    <div style="height: 2rem;">
                                        <span id="span_tip" style="color: red; background: url('../img/L_tips.png') no-repeat; padding-left: 2rem; display: none">&nbsp;</span>
                                    </div>
                                    <input class="dl_but" type="submit" value="登录" onclick="login()">
                                    <input class="zc_but" name="" type="button" onclick="to_reg()" value="注册">
                                    <p class="forget"><a href="/m/recovery">忘记密码</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
            </div>
        </header>
</template>

<script>
    import {mapMutations,mapState} from "vuex"
    export default {
        data(){
            return {
            }
        },
        methods:{
            ...mapMutations({
                getCookie:'GETCOOKIE'
            }),
        },
        computed:{
            ...mapState(['token']),
        },
        created(){
            this.getCookie(this.$store.state.jubao_user);

        },
        mounted(){
            let html = document.documentElement;
            html.style.fontSize = ""
        }
    }


</script>

<style lang="scss" scoped>
    @import "../css/header";
</style>