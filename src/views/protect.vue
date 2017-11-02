<template>
    <div>
        <header class="header">
        <div class="h_top">
            <a class="go_back" href="javascript:void();" onclick="history.back();">
                <span>
                    <img src="../img/back.png">
                </span>返回
            </a>
        </div>
    </header>


    <!--artic-->
    <article class="artic">
        <div class="main">
		    <div class="jm_details">
		      <div class="jm_title">
		        <h2>聚保整车保查看主要保障范围提示</h2>
		      </div>
		        <div>&nbsp;</div>
		      <div class="jm_con">
		        <p class="I_a">
                    &#12288;<span style="font-weight:bold;">19项意外事故造成货物损失</span><br /><br />
                    &#12288;&#12288;1、火灾、爆炸；<br /><br />
                    &#12288;&#12288;2、运输工具发生碰撞、出轨、倾覆、坠落、搁浅、触礁、沉没，隧道坍塌、桥梁坍塌、码头坍塌；<br /><br />
                    &#12288;&#12288;3、碰撞、挤压导致包装破裂或容器损坏；<br /><br />
                    &#12288;&#12288;4、物流货物的正常装卸、搬运；<br /><br />
                    &#12288;&#12288;5、物流货物遭遇盗窃、抢劫；<br /><br />
                    &#12288;&#12288;6、整车货物连车失踪。<br /><br /><br />
                    &#12288;<span style="font-weight:bold;">11项自然灾害造成货物损失</span><br /><br />
                    &#12288;&#12288;雷电、冰雹、暴风、暴雨、洪水、地震、海啸、地陷、崖崩、滑坡、泥石流所造成的损失以及运输过程中遭受雨淋。<br />
                </p>
                <p>&nbsp;</p>
                <p class="I_a" style="color:red;font-weight:bold;">
                    &#12288;&#12288;详细保障范围以保险协议为准。<br />
            	</p>
		      </div>
		        <div>&nbsp;</div>
		       
		    </div>
		</div>
	</article>
    </div>
</template>

<script>
// 保障范围页
 export default {
        data(){
            return{
            }
        },
        computed(){

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