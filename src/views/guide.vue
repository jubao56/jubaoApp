<template>
<div>
    <div class="top_back">
        <div class="h_top">
            <router-link class="go_back" to="/"><span><img src="../img/back.png"></span>返回首页</router-link>
        </div>
    </div>
 	<div class="guide_title"><img src="../img/guide_title.png"></div>
    
    <div class="guide_step  clearfix">
        <img class="step" src="../img/guide_step01.png">
        <p class="title">注册会员账号</p>
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint01.png">
            <span>点击左上角人头像按钮。</span>
        </p>
        <img class="pic mt_15" src="../img/guide01.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint02.png">
            <span>点击注册按钮。</span>
        </p>
        <img class="pic mt_15" src="../img/guide02.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint03.png">
            <span>填写注册信息。</span>
        </p>
        <img class="pic mt_15" src="../img/guide03.jpg">
    </div>

    
    <div class="guide_step  clearfix">
        <img class="step" src="../img/guide_step02.png">
        <p class="title">填写公司名称</p>
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint01.png">
            <span>点击左上角人头像按钮。</span>
        </p>
        <img class="pic mt_15" src="../img/guide01.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint02.png">
            <span>填写注册公司名称。</span>
        </p>
        <img class="pic mt_15" src="../img/guide21.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint03.png">
            <span>返回个人资料页面。</span>
        </p>
        <img class="pic mt_15" src="../img/guide23.jpg">
    </div>

    <div class="guide_step  clearfix">
        <img class="step" src="../img/guide_step03.png">
        <p class="title">开始投保操作</p>
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint01.png">
            <span>点击立即投保。</span>
        </p>
        <img class="pic mt_15" src="../img/guide31.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint02.png">
            <span>选择路线并填写车牌。</span>
        </p>
        <img class="pic mt_15" src="../img/guide32.jpg">
    </div>
    
    <div class="guide_step  clearfix">
        <img class="step" src="../img/guide_step04.png">
        <p class="title">录入运单信息</p>
    </div>
    <p class="guide_txt">您可以根据实际情况，按照以下操作流程选择比较便捷的方式上传运单信息，运单信息中至少包含运单号、运输路线、货物种类和数量单位，完整的装车清单有助于您获得更好的保险服务。</p>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint01.png">
            <span>如果运单信息内容较少，您可以选择手工录入运单信息。手工录入运单信息。点击手工添加装车清单，并填写相应信息。</span>
        </p>
        <img class="pic mt_15" src="../img/guide41.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint02.png">
            <span>如果您的货物清单较多,点击“拍照添加装车清单”，再通过操作系统查找到对应图片，上传到系统中。</span>
        </p>
        <img class="pic mt_15" src="../img/guide421.jpg">
        <img class="pic mt_40" src="../img/guide422.jpg">
    </div>
    
    <div class="guide_step clearfix">
        <img class="step" src="../img/guide_step05.png">
        <p class="title">检查投保信息</p>
    </div>
    <p class="guide_txt">请在此页面内检查投保信息是否正确。如果信息有误选择“返回修改”,如信息无误请点击“确认并支付”，进入支付环节。</p>
    <div class="joint clearfix">
        <img class="pic" src="../img/guide51.jpg">
    </div>
    
    <div class="guide_step clearfix">
        <img class="step" src="../img/guide_step06.png">
        <p class="title">完成支付操作</p>
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint01.png">
            <span>提交保单信息后，进入保单支付环节。如果您是第一次投保，系统会提示您设置支付密码。</span>
        </p>
        <img class="pic mt_15" src="../img/guide61.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint02.png">
            <span>如果您的帐号内可用余额足够支付保险费，输入支付密码即可完成保单支付操作。</span>
        </p>
        <img class="pic mt_15" src="../img/guide62.jpg">
    </div>
    <div class="joint clearfix">
        <p class="title">
            <img src="../img/guide_joint03.png">
            <span>如果您的账号内余额不足以支付保险费，系统会提示您跳转到充值页面，充值完成后，可继续支付该未完成订单。</span>
        </p>
        <img class="pic mt_15" src="../img/guide63.jpg">
    </div>
    
    <div class="guide_step clearfix">
        <img class="step" src="../img/guide_step07.png">
        <p class="title">查看保单详情</p>
    </div>
    <div class="joint clearfix pb_1">
        <p class="title">
            <img src="../img/guide_joint01.png">
            <span>可以在用户中心保单查询中查看保单。</span>
        </p>
        <img class="pic mt_15" src="../img/guide71.jpg">
    </div>	
	<router-link class="guide_btn_home" to="/dashboard">进入个人中心</router-link>
</div>

</template>

<script>
    export default {
        data(){
            return{
            }
        },
        computed:{

        },
        created(){

        },
        mounted(){
            let html = document.documentElement;
            let windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / 7.5 + 'px';
        }
    }
</script>

<style lang="scss"  scoped>

@import '../css/guide';
</style>