<template>
    <div class="tab">
        <router-link to="/home" :class="$route.path == '/home'?'active':''">
            <i class="iconfont icon-shouye"></i>
            <p>首页</p>
        </router-link>
        <router-link to="/article" :class="$route.path == '/article'?'active':''">
            <i class="iconfont icon-pindao"></i>
            <p>保险频道</p>
        </router-link>
        <router-link to="/dashboard" :class="$route.path == '/dashboard'?'active':''">
            <i class="iconfont icon-wo"></i>
            <p>我的</p>
        </router-link>
    </div>
</template>

<script>
    export default {
    }

</script>

<style lang="scss" scoped>
    @import "../css/tab.scss";
    @import "../font/iconfont.css";
</style>