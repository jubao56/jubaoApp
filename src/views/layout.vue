<template>
    <div>
        <v-header></v-header>
            <router-view></router-view>
    </div>
</template>

<script>
    import header from "../components/Header.vue"
    export default {
        components: {
            "v-header": header,
            //"v-footer": require('../components/Footer.vue'),
        },
    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
</style>