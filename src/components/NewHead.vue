<template>
  <header class="header">
    <div class="h_top" style="text-align:center;">
      <router-link class="go_back" :to="url"><span><img style="float:left;" src="../img/back.png"></span></router-link>{{title}}
    </div>
  </header>
</template>
<script>
  export default {
    props:{
      url: {
        type: String,
        default: "/",
        required: true
      },
      title: {
        type: String,
        default: "",
      },
    }
  }
</script>
<style scoped>
  .header .h_top {line-height: 3.25rem !important;color: #fff;font-size: 1.2rem;background: #0FACF7;}
  .header .h_top a.go_back { position: absolute;left: 15px;};
</style>

