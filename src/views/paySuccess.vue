<template>
    <div class="paySuccess">
        <!--<remote-js src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)"></remote-js>-->
        <header class="header">
            <div class="h_top" style="background-color: white">
                <a class="go_back" href="javascript:void(0);" @click="goBack" style="color: black">
                <span>
                    <img src="../img/back1.png">
                </span>保单详情
                </a>
                <router-link to="/" class="finish">完成</router-link>
            </div>
        </header>


        <article class="artic">
            <div class="main" style="background-color:white;">
                <div class="bd_title" style="width:95%;margin-left:1rem;vertical-align:middle;">
                    <div style="height:12rem;position:relative">

                        <div style="width:100%;">
                            <p>　　您投保已完成，如投保成功确认单未显示运单号，可能是您上传的是照片或者电子文档格式不兼容。不影响保单效力。</p>
                            <p>　　上传正确格式的电子表格可以在投保成功确认单上显示运单号，分享给您的客户。让您的客户知道您已为货物投保，让您的客户更放心。</p>
                        </div>

                        <div class="CDshare fr">
                            <span style="float:left;margin-top:6px;">分享确认单</span>
                            <div class="bdsharebuttonbox" style="display: inline;float:right;margin-left:6px;" data-tag="share_0">
                                <a href="javascript:void(0)" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                                <a href="javascript:void(0)" class="bds_qzone " data-cmd="qzone" title="分享到QQ空间"></a>
                                <a href="javascript:void(0)" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                <a href="javascript:void(0)" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
                            </div>

                        </div>
                    </div>
                    <div class="baodan" style="border:0.1rem solid black;">
                        <a href="javascript:void(0)" id="listImgBox">

                        </a>
                        <br>
                        <a class="baodan-btn" :href="baodanBtn" v-show="status==1 && !bgFlag">
                            查看电子保单
                        </a>
                    </div>
                    <div style="clear:both"></div>
                    <br/><br/>
                    <div v-show="linkFlag">
                        <h3>装车清单：</h3>
                        <span>若遇险情，以您上传的装车清单附件作为赔偿依据。</span>
                        <br>
                        <div style="float:left;width:100%;margin-bottom: 20px;margin-top: 15px;">
                            <ul id="filelist" style="float:left;width:100%;">
                                <li style="float:left;width:100%;height:30px;"  v-for="(val,idx) in linkLists">
                                    <a>{{val.name}}</a>&nbsp;&nbsp;&nbsp;
                                    <a :href="val.file_url" target="_blank">下载</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                </li>
                            </ul>
                        </div>
                        <br/><br/>
                    </div>

                    <div style="font-weight:bold;font-size:14px">
                        运单详情：（可以单独分享每单承保信息给客户哦）
                    </div>
                    <table style="border: 1px solid #eaeaea;border-collapse:collapse;width:100%;padding-left:90px">
                        <thead>
                        <tr style="height:50px;">
                            <th style="border-right:1px solid #eaeaea;width:13%;background-color:#bfe2fc">运单号</th>
                            <th style="border-right:1px solid #eaeaea;width:16%;background-color:#bfe2fc">目的地</th>
                            <th style="border-right:1px solid #eaeaea;width:19%;background-color:#bfe2fc">货物种类</th>
                            <th style="border-right:1px solid #eaeaea;width:12%;background-color:#bfe2fc">数量</th>
                            <th style="width:40%;background-color:#bfe2fc">分享运单</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr style="height:48px;border: 1px solid #eaeaea;text-align:center" v-for="(val,idx) in orderLists">
                            <td style="border-right:1px solid #eaeaea; ">{{val.track_no}}</td>

                            <td style="border-right:1px solid #eaeaea; ">{{val.destination}}</td>
                            <td style="border-right:1px solid #eaeaea; ">{{val.name}}</td>
                            <td style="border-right:1px solid #eaeaea; ">{{val.quantity/100 | number(2)}}</td>

                            <td>
                                <div class="CDshare">
                                    <div class="share" id="changeBaiduStyle">
                                        <div class="bdsharebuttonbox" style="display: flex;float:right;margin-left:6px;" :data-tag="'share_'+(idx+1)">
                                            <a href="javascript:void(0)" class="bds_weixin" data-cmd="weixin" title="分享到微信" ></a>
                                            <a href="javascript:void(0)" class="bds_qzone " data-cmd="qzone" title="分享到QQ空间"></a>
                                            <a href="javascript:void(0)" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                            <a href="javascript:void(0)" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                </div>
            </div>
        </article>
        <div class="limitBg" v-show="bgFlag">

        </div>

    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import {baiduShare} from "../libs/baiduShare"
    import {zcbOrderConfirmation,zcbOrderTryInfo,zcbOrderInfo,zcbOrderPolicy} from '../libs/api';
    export default {
        components: {
//            'remote-js': {
//                render(createElement) {
//                    return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
//                },
//                props: {
//                    src: { type: String, required: true },
//                },
//            }
        },
        data(){
            return {
                //======状态信息======
                status:"",
                listId:"",
                urlDirection:"",
                userHeader:{},
                linkFlag:false,//控制订单列表是否显示
                bgFlag:false, //灰色遮罩
                //
                orderImg:"",
                orderLists:[],
                linkLists:[],
                policyholder:"",    //被保险人
                baodanBtn:''   //保单按钮地址
            }
        },
        methods:{
            getParamName(name) {
                var url = location.search; //获取url中"?"符后的字串
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest[name]
            },
            goBack(){
//                this.$router.push("/payConfirm?status="+this.status+"_"+this.listId);
                window.history.go(-1);
            },
            //获取运单图片
            getImg() {
                let _this=this;
                let p = new Promise((resolve, reject) => {
                    //===========获取运单图片信息===========
                    zcbOrderConfirmation({
                        order_id: this.listId*1
                    }).then((res)=>{
                        this.orderImg= this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+ this.listId*1;
                        let box = document.querySelector("#listImgBox");
                        let img = document.createElement("img");
                        img.style.width="90%";
                        box.appendChild(img);
                        img.src=this.orderImg;
                        img.onload= ()=>{
                            this.bgFlag=false;
                            Indicator.close();
                        };
                        resolve(this.orderImg)
                    }).catch((err)=>{
                        console.log(err);
                    });
                });
                return p;
            },
            //获取运单信息
            getMsg() {
                let p = new Promise((resolve, reject) => {
                    //===========根据订单ID获取订单信息===========
                    let typeAjax = ''
                    if(this.status==0){//试用
                        typeAjax = zcbOrderTryInfo;
                    }else if(this.status==1){//正式
                        typeAjax = zcbOrderInfo;
                    }
                    typeAjax(this.listId*1).then((res)=>{
                        let tempMsg = res.data;
                        this.policyholder = tempMsg.policyholder;
                        let orderLists = [];
                        let linkLists=[];
                        for(let i=0;i<tempMsg.cargos.length;i++){
                            if(!tempMsg.cargos[i].file_url){ //fileUrl为空则为物流订单，不为空则为文件链接
                                orderLists.push(tempMsg.cargos[i])
                            }else{
                                linkLists.push(tempMsg.cargos[i])
                            }
                        }
                        this.orderLists=orderLists;
                        this.linkLists=linkLists;
                        if(linkLists[0]){
                            this.linkFlag=true;
                        }
                        resolve(tempMsg.policyholder)
                    }).catch((err)=>{
                        console.log(err)
                    });
                });
                return p ;
            },
            //获取电子保单
            getBaodan(){
                zcbOrderPolicy(this.listId*1).then((res)=>{
//                    console.log(res)
                    this.baodanBtn = this.$store.state.zcbUrl+'/v1/zcb/order/policy'+'?order_id='+this.listId
                }).catch((err) => {
                    console.log(err)
                });
            },
        },
        filters:{ //在替换之前先进行过一次过滤
            number(value,status){
                if(typeof value == 'number'){
                    return value.toFixed(status);
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
            this.bgFlag=true;
            Indicator.open();
            let _this=this;
            var mes = this.getParamName('status').split('_');
            this.status= mes[0];
            this.listId = mes[1];
            this.getBaodan();
            Promise.all([this.getImg(),this.getMsg()])
                .then(function (result) {
//                    console.log(result);
//                    console.log(_this.orderLists,"百度分享");
                    //百度分享设置
                    let beforeUrl = location.substring(0,location.indexOf("#")-1);
//                    let beforeUrl = window.location.origin;
                    console.log(beforeUrl,"beforeUrl")
//                    beforeUrl = 'http://localhost:63342/jubaom2/jubaov3-mobile'
                    let shareList = [] ;
                    let shareList0=[{
                        tag:"share_0",
                        bdUrl:beforeUrl+"/baiduShare.html?order_id="+_this.listId+"&order_type=zcb"
//                        bdUrl:_this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+_this.listId
                    }];
                    console.log(shareList0[0].bdUrl)
                    for(let i=0;i<_this.orderLists.length;i++){
                        let tempObj = {
                            tag:"share_"+(i+1),
                            bdUrl:beforeUrl+"/baiduShare.html?order_id="+this.listId+"&track_no="+this.orderLists[i].track_no+"&order_type=zcb"

//                            bdUrl:_this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+_this.listId+
//                            "&track_no="+_this.orderLists[i].track_no
                        };
                        shareList.push(tempObj)
                    }
                    let finalShare = shareList.concat(shareList0);

                    window._bd_share_config = {
                        "common": {
                            "bdSnsKey": {},
                            "bdText": "聚保整车保保单!我们将用心为您负责!",
                            "bdMini": "2",
                            "bdMiniList": false,
                            "bdPic": "http://www.jubao56.com/upload_admin/2016-07-05%2010:08:50-banner4_m.jpg",
                            "bdStyle": "0",
                            "bdSize": "24"
                        }, "share" : finalShare
                    };

                    window._bd_share_main=null;
                    baiduShare()
                })
        },
        mounted() {

        },

    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    #changeBaiduStyle a{
        margin:6px 3px 6px 0;
    }
    .limitBg{
        width:100%;height:60rem;background:rgba(0,0,0,0.2);
        position: fixed;left:0;top:0;z-index:998;
    }
    .finish{
        display: block;
        float:right;
        height: 3.25rem;
        line-height: 3.25rem;
        font-size: 1.325rem;
        color:#000;
        margin-right:0.5rem;
    }
    .baodan{
        position: relative;
    }
    .baodan-btn {
        display: block;
        width: 8rem;
        height: 2.5rem;
        background: #069bff;
        text-align: center;
        line-height: 2.5rem;
        color: #fff;
        border-radius: 5px;
        margin: 0 auto 10px;
    }
</style>