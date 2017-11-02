<template>
    <div>
        <!--<header class="header">
            <div class="h_top">
                <a class="go_back" href="javascript:void(0);" onclick="history.back();"><span><img src="../img/back.png"></span>保险理赔</a>
            </div>
        </header>-->
        <header class="header">
            <div class="h_top">
                <router-link style="height: 7vh;line-height: 7vh;font-size: 2.8vh;" class="go_back" to="/"><span style="height: 2.8vh;width: 1.6vh;line-height: 2.8vh"><img src="../img/back.png"></span>保险理赔</router-link>
            </div>
        </header>
    <!--artic-->
    <article class="artic">
        <div class="main" style="padding-top: 7vh;">
            <div class="jm_details">

                <p class="I_a">
                    &#12288;&#12288;物流保险119：<span style="color:red;">40080-59680 我就来帮您！</span><br />
					<br />
                    &#12288;&#12288;面对保险公司专业的理赔人员、专业的法律团队。<br />
                    &#12288;&#12288;你是否因为发生赔案时不知如何索赔而感到无助？<br />
                    &#12288;&#12288;你是否因为赔案与保险公司陷入无止境的纠纷而烦恼？<br />
                    &#12288;&#12288;你是否因为被保险公司拒赔，利益得不到保障而痛苦？<br />
                    <br />

                    &#12288;&#12288;谁来帮你？<br />
                    &#12288;&#12288;保险业务员？不够专业，而且身份立场是个问题。<br />
                    &#12288;&#12288;律师？貌似很贵，而且不懂保险，不一定管用。<br />
                    &#12288;&#12288;怎么办？
                </p>
                <p>&nbsp;</p>
                <b class="I_a">对不起，我们来晚了！</b>
                <p class="I_a">
                    &#12288;&#12288;我们有：从业保险行业多年的精英人士和强大的保险法律专业团队，以无数赔案成功的处理经验，独特的法律、保险双视角，全方位分析保险纠纷，不遗漏任何一个赔案细节，为投保人提供专业的保险索赔咨询和保险索赔代理等服务。甚至——注册用户永远免费的保险拒赔打官司服务。我们建造了：“聚保物流”网上理赔服务中心，通过在线咨询服务，快速解决物流企业理赔难题。<br />
                    &#12288;&#12288;我们为物流企业提供如下服务：<br />
	                <strong>1.全国唯一永久免费——聚保物流保险投保、理赔咨询中心 </strong><br />
	                &#12288;&#12288;提供完全公益咨询服务——对所有物流行业人士开放。<br /><br />
	                &#12288;&#12288;如果您怕买保险被忽悠了，请致电物流保险119, 40080-<span style="color:red;">59680 我就来帮您！</span><br />
	                &#12288;&#12288;如果您怕理赔被欺负了，请致电物流保险119, 40080-<span style="color:red;">59680 我就来帮您！</span><br /><br />
	                &#12288;&#12288;我们为广大物流企业提供电话咨询服务，当你遇到物流保险投保的疑惑、和理赔方面的疑问，无论是否聚保物流的注册用户，均可向我们咨询，我们将竭诚为你解答。只为您投保不上当、理赔有人帮。<br /><br />
	                <strong>2.聚保会员专享服务——对聚保物流注册用户开放</strong><br />
	                &#12288;&#12288;当你成为聚保物流平台注册用户时，凡通过聚保物流平台投保的保单，将享受到360度无忧理赔协助服务。<br />
	                （1）当会员企业出险后，在致电保险公司之前，请致电4008059680。在我们的理赔专家指导下正确报案，以确保不会因为报案陈述不当造成理赔的纠纷或陷入被动。<br />
	                （2）所有的理赔单证，均可发送给我们的理赔专家，经专家审核后再提交给保险公司，避免因为理赔单证的时间逻辑、陈述逻辑、法律逻辑不对，造成理赔的困难。<br />
	                （3）在赔案处理过程中，如双方对事故认定、损失认定、责任认定有争议的，我们的理赔专家将为会员企业据理力争，为您赢得正当权益。<br />
	                （4）如遇保险公司无理拒赔，我们将免费为您把官司打到底。我们无法规定保险公司的行为，但我们誓死捍卫您的权利！
            	</p>
            </div>
        </div>
    </article>
    </div>
</template>

<script>
// 保险理赔页
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
            html.style.fontSize = 12 + 'px';
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/common"

</style>