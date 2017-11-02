<template>
	<div>
		<header class="header">
	        <div class="h_top" style="text-align:center;">
	            <a class="go_back" href="javascript:;" @click="back()"><span><img style="float:left;" src="../img/back1.png"></span></a>注册有礼
	        </div>
	    </header>
		<div style="background: #cb1e37;margin-top:7vh;">
			<div class="banner">
				<img src="../img/hb_1.jpg" width="100%">
				<a href="javascript:;" @click="goRegister()"></a>
                <img src="../img/hb_2.jpg" width="100%">
			</div>
			<div class="content">
                <div class="shenzhi">
                    <img src="../img/hb-sz.png" style="width: 0.6rem; position: relative;top: -1.1rem;padding-right: 80%;">
                    <img src="../img/hb-sz.png" style="width: 0.6rem; position: relative;top: -1.1rem;">
                </div>
                <div class="erweima">
                    <img src="../img/hb_3.jpg" width="100%" style="position: relative;bottom: -1.6rem;">
                </div>
                <img src="../img/hb_5.jpg" width="100%">
                <img src="../img/hb_4.jpg" width="100%">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			goRegister(){
				this.$router.push("register");
			},
			back(){
				var backRouter = this.$route.query.from ? "dashboard" : "/";
				this.$router.push(backRouter);
			}
		},
	}
</script>
<style lang="scss" scoped>
	.header .h_top a.go_back { position: absolute;left: 15px;};
	.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #fff;color:#000;}
	.banner { position: relative; }
	.banner a { position: absolute; top: 21vw; left: 30vw; width: 30vw; height: 8vw; }
    .content { width: 80vw;margin: 0 auto;padding-bottom: 1rem;}
    .erweima { width: 46%; margin: 0 auto; }
    .shenzhi { text-align: center; width: 43%; margin: 0 auto -3.1rem; }
</style>