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

                      <!--app start=================-->
                      <div class="CDshare fr">
                        <span style="float:left;margin-top:6px;"></span>
                        <div class="bdsharebuttonbox" style="display: inline;float:right;margin-left:6px;" data-tag="share_0">
                          <a  class="bds_weixin" data-cmd="weixin" title="分享到微信" @click="shareWeixinMessage()"></a>
                          <a  class="bds_save" data-cmd="save" title="保存到相册" @click="saveInGallery()"></a>
                          <!--<a href="javascript:void(0)" class="bds_share" data-cmd="shareSystem" title="系统分享" @click="shareSystem()"></a>-->
                          <!--<a href="javascript:void(0)" class="bds_qzone " data-cmd="qzone" title="分享到QQ空间"></a>-->
                          <!--<a href="javascript:void(0)" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>-->
                          <!--<a href="javascript:void(0)" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>-->
                        </div>
                      </div>
                      <!--===================app end-->
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
                      <!--app=================-->
                      <div style="float:left;width:100%;margin-bottom: 20px;margin-top: 15px;">
                        <ul id="filelist" style="float:left;width:100%;">
                          <li style="float:left;width:100%;height:30px;"  v-for="(val,idx) in linkLists">
                            <a href="javascript:void(0)">{{val.name}}</a>&nbsp;&nbsp;&nbsp;
                            <a href="javascript:void(0)" @click="createDownload(val.name,val.file_url)">下载</a>&nbsp;&nbsp;&nbsp;&nbsp;
                          </li>
                        </ul>
                      </div>
                      <!--===================app-->
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
                          <!--app======-->
                          <th style="width:20%;background-color:#bfe2fc">分享运单</th>
                          <!--======app-->
                        </tr>
                        </thead>
                        <tbody>

                        <tr style="height:48px;border: 1px solid #eaeaea;text-align:center" v-for="(val,idx) in orderLists">
                            <td style="border-right:1px solid #eaeaea; ">{{val.track_no}}</td>

                            <td style="border-right:1px solid #eaeaea; ">{{val.destination}}</td>
                            <td style="border-right:1px solid #eaeaea; ">{{val.name}}</td>
                            <td style="border-right:1px solid #eaeaea; ">{{val.quantity/100 | number(2)}}</td>

                          <!--app start-->
                          <td>
                            <div class="CDshare">
                              <div class="share" id="changeBaiduStyle">
                                <div class="bdsharebuttonbox" style="display: inline;float:right;margin-left:6px;" :data-tag="'share_'+(idx+1)">
                                  <a  class="bds_weixin" data-cmd="weixin" title="分享到微信" @click="shareWeixinMessage(val.track_no)"></a>
                                  <a  class="bds_save" data-cmd="save" title="保存到相册" @click="saveInGallery(val.track_no)"></a>

                                </div>
                              </div>
                            </div>
                          </td>
                          <!--app end-->
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
    import { Indicator,Toast,MessageBox } from 'mint-ui';
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
          //app start========================
          finish(){
            MessageBox.confirm('将跳转到个人中心，是否继续？').then(action => {
              this.$router.push("/user")
            });
          },
          createDownload(name,url){
            Indicator.open({
              text: '文件下载中...',
              spinnerType: 'fading-circle'
            });
            let dtask = window.plus.downloader.createDownload( url, {method:"GET"}, function ( d, status ) {
              // 下载完成
              if ( status == 200 ) {
                window.plus.gallery.save(  d.filename);
                Indicator.close();
                Toast({
                  message: '下载成功,文件以保存至相册!',
                  iconClass: 'iconfont icon-success',
                  duration: 1000
                });
              } else {
                Toast("下载失败 ：" +status);
              }
            });
            //dtask.addEventListener( "statechanged", onStateChanged, false );
            dtask.start();
          },
          shareWeixinMessage(trackNo){
            Indicator.open({
              text: '文件分享中...',
              spinnerType: 'fading-circle'
            });
            let shareHref="";
            if(trackNo){
              shareHref=this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+this.listId+
                "&track_no="+trackNo;
            }else{
              shareHref=this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+this.listId;
            }
            let shareMessage = {
              content:"聚保物流，用心为您负责！",
              href:shareHref,
              extra:{scene:"WXSceneTimeline"},
              thumbs:[shareHref],//缩略图
              title:"聚保物流"
            };
            //判断是否授权 -- 没授权则直接授权
//                alert(JSON.stringify(this.sharewx));
            this.sharewx.send( shareMessage, function(){
              Indicator.close();
              Toast({
                message: '分享成功',
                iconClass: 'iconfont icon-success',
                duration: 1000
              });
            }, function(e){
              Indicator.close();
              Toast("分享失败");
            });
          },
          saveInGallery(trackNo){
            Indicator.open({
              text: '文件保存中...',
              spinnerType: 'fading-circle'
            });
            let url="";
            if(trackNo){
              url=this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+this.listId+
                "&track_no="+trackNo;
            }else{
              url=this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+this.listId;
            }
            let dtask = window.plus.downloader.createDownload( url, {method:"GET"}, function ( d, status ) {
              // 下载完成
              if ( status == 200 ) {
                window.plus.gallery.save(d.filename);
                Indicator.close();
                Toast({
                  message: '该订单已成功保存至相册',
                  duration: 1000,
                  iconClass: 'iconfont icon-success',
                });
              } else {
                Toast("保存失败 ：" +status);
              }
            });
            dtask.start();
          },
          shareSystem(trackNo){
            let url="";
            if(trackNo){
              url=this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+this.listId+
                "&track_no="+trackNo;
            }else{
              url=this.$store.state.zcbUrl+"/v1/zcb/order/confirmation?order_id="+this.listId;
            }
            let p = ""; //本地地址
            let ShareMessage= {
              content:'整车保订单分享',
              thumbs:[p],
              pictures:[p],
              href:p,
            }
            window.plus.share.sendWithSystem?window.plus.share.sendWithSystem(ShareMessage, function(){
//                    console.log("success")
            }, function(e){
              Toast({
                message: '调用分享失败',
                duration: 1000
              });
            }):shareSystemNativeJS();
            function shareSystemNativeJS() {
              if(window.plus.os.name!=='Android'){
                window.plus.nativeUI.alert('此平台暂不支持系统分享功能!');
                return;
              }
              var intent=new Intent(Intent.ACTION_SEND);
              var p = url;
              if(p.substr(0,7)==='file://'){
                p=p.substr(7);
              }else if(p.sub(0)!=='/'){
                p=window.plus.io.convertLocalFileSystemURL(p);
              }
              var f = new File(p);
              var uri = window.Uri.fromFile(f);
              if(f.exists()&&f.isFile()){
//                        console.log('image/*');
                intent.setType('image/*');
                intent.putExtra(Intent.EXTRA_STREAM,uri);
              }else{
//                        console.log('text/plain');
                intent.setType('text/plain');
              }
              intent.putExtra(Intent.EXTRA_SUBJECT,'jubao56');
              intent.putExtra(Intent.EXTRA_TEXT,sharecontent.value);
              intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            }
          },
          //==========================app end
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
          this.$store.state.token =JSON.parse(window.plus.storage.getItem("jubao56")).token;
          this.bgFlag=true;
          Indicator.open();
          let _this=this;
          //app===
          if(window.plus){
            plusReady();
          }else{
            document.addEventListener('plusready',plusReady,false);
          }

          function plusReady() {
            // 扩展API加载完毕，现在可以正常调用扩展API
            window.plus.share.getServices(function (s) {
              _this.shares = s;
              // alert(JSON.stringify(_this.shares));
              for (var i in s) {
                if ('weixin' == s[i].id) {
                  _this.sharewx = s[i];
                }
              }
            }, function (e) {
              alert("获取分享服务列表失败：" + e.message);
            });
            //=====app
            let location = window.location.href;
            let beforeStr = location.substring(location.indexOf("?")+1);
            if(beforeStr.indexOf("?")!=-1){
              beforeStr=beforeStr.substring(beforeStr.indexOf("?")+1)
            }
            let locMsg = beforeStr.substring(beforeStr.indexOf("?") + 1).split("_");
  //            let locMsg =window.location.href.substring(window.location.href.indexOf('?')+1).split("&");
            _this.status= locMsg[0].split('=')[1];
            _this.listId = locMsg[1];
            _this.getBaodan();//生成电子保单
            Promise.all([_this.getImg(),_this.getMsg()])
              .then(function (result) {

              })
          }
        },
        mounted() {

        },

    }
</script>

<style lang="scss" scoped>
    @import "../css/common";
    /*app start*/
    #changeBaiduStyle{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    /*background-position: 0 -1612px;*/
    .bds_weixin {
      background-image: url(../img/appImg/wechat2.png);
    }
    .bds_save{
      background-image: url(../img/appImg/save1.png)!important;
    }
    .bds_share{
      background-image: url(../img/appImg/share.png)!important;
    }
    .bdsharebuttonbox a{
      float: left;
      font-size: 18px;
      padding-left: 25px;
      line-height: 24px;
      height: 24px;
      background-repeat: no-repeat;
      cursor: pointer;
      margin: 6px 6px 6px 0;
    }
    /*app end*/
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
