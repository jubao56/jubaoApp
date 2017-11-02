<template>
    <div>
        <!--<header class="header">-->
            <!--<div class="h_top">-->
                <!--<router-link class="go_back" to="/"><span><img src="../img/back.png"></span>老周解密</router-link>-->
            <!--</div>-->
        <!--</header>-->
        <article class="artic" style="margin-bottom: 3.5715rem;">
            <div class="main" style="padding-top: 0">
                <div class="mess">
                    <a href="javascript:void(0)">
                        <img src="../img/lao-pic.jpg">
                    </a>
                    <div class="clear"></div>
                </div>
                <div class="jm_list" >
                    <div class="list" v-for="(menu,key) in list">
                        <div class="weui-cell menu weui-cell_access">
                            <div :aid="menu.id" style="font-weight: bold; color:#ff6600;" class="weui-cell__bd">
                                <p>{{menu.name}}</p>
                            </div>
                            <div class="weui-cell__ft">
                            </div>
                        </div>
                        <router-link v-for="(item,index) in menu.children" :key="index" :aid="item.id" class="weui-cell weui-cell_access item" :to="'/artDetail/'+item.id" style="display: none">
                            <div style="width: 90%" class="weui-cell__bd" >
                                <p style="width: 95%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.name}}</p>
                            </div>
                            <div class="weui-cell__ft">
                            </div>
                        </router-link>
                        <!--<a @click="toDetail($event,item.id)" v-for="(item,index) in menu.children" :key="index" :aid="item.id" class="weui-cell weui-cell_access item" href="javascript:;" style="display: none">
                            <div style="width: 100%" class="weui-cell__bd" >
                                <p style="width: 95%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.title}}</p>
                            </div>
                            <div class="weui-cell__ft">
                            </div>
                        </a>-->
                    </div>
                </div>
            </div>
        </article>
        <tab></tab>
        <div v-show="full_bg" style="width: 100%; height: 100%; display: none;" class="fullbg"></div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import Tab from './tab.vue'
    import { cmnArticleList,cmnCategoryList } from '../libs/api'
    export default {
        data(){
            return{
                list:[],//老周解密所有文章
                full_bg:false
            }
        },
        methods: {
            getMoreDetail(id,i){
                let _this = this;
                let p =new Promise(function (resolve, reject) {
                    let arr =[];
                    let data = {"category_id":id};
                    cmnArticleList(data).then(res=>{
                        _this.list[i].children = res.rows;
                        for(let j=0;j<res.rows.length;j++){
                            arr.push(res.rows[j])
                        }
                        resolve({arr,i})
                    }).catch((err)=>{ console.log("cmnArticleList",err) })
                });
                return p;
            },
            getListDetail:function () {
                Indicator.open();
                var _this = this;
                this.full_bg=true;
                let data = {"id":6};
                cmnCategoryList(data).then(res=>{
                    _this.list = res.rows;
                    Indicator.close();
                    _this.full_bg=false;
//                    let funArr = [];
//                    for(let i=0;i<res.rows.length;i++){
//                        let id = res.rows[i].id;
//                        funArr.push( this.getMoreDetail(id,i))
//                    }
//                    Promise.all(funArr).then( results=> {
//                        Indicator.close();
//                        _this.full_bg=false;
//                        for(let i=0; i<results.length;i++){
//                            _this.list[results[i].i].children = results[i].arr;
//                        }
//                    })
                }).catch((err)=>{ console.log("cmnCategoryList",err) })
            },
        },
        mounted(){
            $('.jm_list').on('click','.menu',function () {
                $(this).siblings('.item').slideToggle(200);
            });
        },
        created(){
            this.getListDetail();
        },
        components: {
            Tab
        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    .list{
        color: #000;
        margin: 10px 0;
        background: #fff;
        p{
            color: #000;
        }
    }
    .fullbg { position:fixed; left:0px; top:0px; z-index:111; background:url(../img/ListBg_03.png) repeat;}
</style>
