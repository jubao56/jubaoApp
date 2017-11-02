<template>
    <div>
        <header class="header">
            <div class="h_top">
                <router-link class="go_back" to="/article"><span><img src="../img/back.png"></span></router-link>
            </div>
        </header>
        <article class="artic">
            <div class="main" style="background-color:white;overflow-y:scroll">
                <div class="jm_details">
                    <div class="jm_title">
                        <h1 style="font-size:180%;">{{art.title}}</h1>
                        <span>更新时间：{{artTime}}</span>
                    </div>
                    <div>&nbsp;</div>
                    <div v-html="art.body" class="jm_con">
                    </div>
                    <div>&nbsp;</div>

                    <div>&nbsp;</div>
                    <div class="but_list">
                        <a @click="toPrev" class="shang" href="javascript:;">上一篇文章</a>
                        <router-link class="back" to="/article">返回列表</router-link>
                        <a @click="toNext" class="xia" href="javascript:;">下一篇文章</a>
                    </div>
                </div>
            </div>
        </article>
        <!--<div class="bdsharebuttonbox" data-tag="share_0">-->
            <!--<a href="javascript:void(0)" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>-->
            <!--<a href="javascript:void(0)" class="bds_qzone " data-cmd="qzone" title="分享到QQ空间"></a>-->
            <!--<a href="javascript:void(0)" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>-->
            <!--<a href="javascript:void(0)" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>-->
        <!--</div>-->
    </div>
</template>

<script>
    import { Indicator,Toast } from 'mint-ui';
    import { cmnArticleInfo,cmnArticleRead } from '../libs/api'
    export default {
        data(){
            return{
                artId:"",//文章id
                art:"",//文章
                artTime:"",
                prev:"",//上一篇id
                next:"",//下一篇id
                list:"",//老周解密所有文章
                menuId:"",//二级目录id,
                flag:false
            }
        },
        methods: {
            getInfo() {
                Indicator.open();
                cmnArticleInfo(this.artId).then(res=>{
                    if(res.err_code == 0){
                        this.art = res.data;
                        this.artTime = res.data.updated_at.substr(0,19).replace(/T/,' ');
                        this.prev = res.prev_article_id;
                        this.next = res.next_article_id;
                        Indicator.close();
                        cmnArticleRead(this.artId*1).then(res=>{
                            console.log("访问量",res);
                        }).catch((err)=>{ console.log("cmnArticleRead",err) })
                    }else {
                        Indicator.close();
                        Toast('出错了！');
                    }
                }).catch((err)=>{ console.log("cmnArticleInfo",err) })
            },
            toPrev(){
                if(this.prev==0){
                    Toast('没有更多了');
                }else {
                    this.artId=this.prev;
                    this.$router.push('/artDetail/'+this.artId);
                    this.getInfo();
//                    document.getElementsByTagName('body')[0].scrollTop=0
                }
            },
            toNext(){
                if(this.next==0){
                    Toast('没有更多了');
                }else {
                    this.artId=this.next;
                    this.$router.push('/artDetail/'+this.next);
                    this.getInfo();
//                    document.getElementsByTagName('body')[0].scrollTop=0
                }
            }
        },
        beforeCreate(){
            const before= document.querySelector("#baiduShare");
            if(before){
                before.parentNode.removeChild(before);
            }
        },
        created(){

            this.artId = this.$route.params.artId;
            this.getInfo();
        },
        mounted() {
            let _this = this;
            this.flag = !this.flag;
            console.log(this.flag);
            // 给大于屏幕宽度的图片加
            $(function(){
                var deviceWidth = $(window).width();
                $("img").each(function(index,item){
                    if($(item).width() > deviceWidth){
                        $(item).css("width","100%");
                    }
                })
            })
//            this.$nextTick(function () {
//                window._bd_share_config = {
//                    common : {
//                        bdText : _this.art.title,
//                        bdDesc : _this.art.abstract,
//                        bdPic : "http://www.jubao56.com/upload_admin/2016-07-05%2010:08:50-banner4_m.jpg",
//                    },
//                    share : [{
//                        tag:"share_0",
//                        bdSize : 24,
//                        bdUrl : 'www.baidu.com'
//                    }],
//                };
//              const s = document.createElement('script');
//              s.type = 'text/javascript';
//              s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5);
//              document.body.appendChild(s);
//            })
        },
    }
</script>


<style lang="scss" scoped>
    @import "../css/common";
    .jm_con img{
        width: 100% !important;
    }
</style>
