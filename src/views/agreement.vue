<template>
    <div class="agreement">
        <header class="header">
            <div class="h_top" style="text-align:center">
                <a href="javascript:void(0)" class="go_back" style="float:none" id="title">{{title}}</a>
            </div>
        </header>

        <div class="header-repeat"></div>
        <div id="body" class="pop_content myPopClass">
            <div v-for="(val,idx) in content" v-html="val.content" v-show="pageCount==idx?true:false"></div>
        </div>
        <div class="pop_read" id="pop_read" style="padding-left: 10px; font-size: 1.25rem; margin-top: 0.25rem; visibility: visible;" v-show="pageCount==maxIndex?true:false">
            <input type="checkbox" id="read" v-model="zcbAgree">
            <label for="read" id="read_for" style="color:#1c93e8">我已阅读并接受</label>
        </div>
        <footer class="footer">
            <div class="all_08">
                <div class="w">
                    <div class="clearfix con">
                        <div class="fl left" id="prev">
                            <a href="javascript:void(0)" id="layer_goback" v-show="pageCount==0?false:true"
                            @click="backBefore">
                                返回上一步
                            </a>
                        </div>
                        <div class="fr right">
                            <a href="javascript:void(0)" id="layerbtn" @click="goNext">我已阅读并同意</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import {zcbAgreementSign,zcbAgreementList} from "../libs/api"
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                agreementList: "",//协议ID
                title:"主要保险条件提示",
                content:[],
                pageCount:0,
                zcbAgree:false,
            }
        },
        computed: {
            maxIndex(){
                return this.content.length-1;
            }
        },
        methods: {
            backBefore(){
                if(this.pageCount==1){
                    this.pageCount=0;
                    this.title="主要保险条件提示"
                }
                if(this.pageCount==2){
                    this.pageCount=1;
                    this.title="主要保障范围提示"
                }
                if(this.pageCount==3){
                    this.pageCount=2;
                    this.title="主要不赔事项提示"
                }
                if(this.pageCount==this.maxIndex){
                    this.pageCount=3;
                    this.title="主要不保货物提示"
                }
            },
            goNext(){//页面的显示是跟随pageCount的 0,1,2,3,4，
                let obj={};
                obj=this.content[this.pageCount];
                this.title=this.content[this.pageCount<this.maxIndex?(this.pageCount+1):this.maxIndex].title;   //title显示为下一个页面的title
                if(this.pageCount>=this.maxIndex+1){
                    this.pageCount=this.maxIndex
                }

                if(this.pageCount!=this.maxIndex || (this.pageCount==this.maxIndex && this.zcbAgree)){
                    zcbAgreementSign({
                        agreement_id: obj.id * 1
                    }).then((res)=>{
                        if(this.pageCount == this.maxIndex){
                            this.$router.go(-1);
                        }else{
                            this.pageCount= this.pageCount+1;//这一步是用来改变页面显示的
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
                if(this.pageCount==this.maxIndex && !this.zcbAgree){
                    Toast({message: '请确定您是否同意并勾选整车保协议'})
                }
            }
        },
        created(){
            //====init====
            //检测是否同意整车保协议
            zcbAgreementList().then((res)=>{
                for(let i=0;i<res.data.length;i++){
                    if(!res.data[i].signed){
                        this.content.push(res.data[i]);
                    }
                }
                console.log(this.content,"this.content")
            }).catch((err)=>{
                console.log(err)
            });
            //顺序为  "17==主要保险条件提示" "14==主要保障范围提示" "11==主要不赔事项提示" "5==主要不保货物提示"  "2==整车保协议"
        }
    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    @import "../css/agreement";
</style>
