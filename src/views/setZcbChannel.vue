<template>
<div>
    <new-head url="/dashboard" title="设置服务人员"></new-head>
    <!--artic-->
    <article class="artic" v-if="channel">
        <div class="password">
		    <div class="mm_box" style="padding-top: 3.3rem;">
		        <div style="padding: 10px;border-bottom: 1px solid #eee;">
		            <!--<span id="span_suc" style="color:red;padding-left:1.26rem;line-height:2rem;font-size:1.3rem;vertical-align:middle">您已设置服务机构或服务人员！</span>-->
                <p style="text-align:center;"><span style="padding-left:1.26rem;line-height:2rem;font-size:1.5rem;vertical-align:middle"><br><b>{{ channel }}</b>为您服务 </span></p>
                <p style="line-height:2rem;font-size:1.1rem;vertical-align:middle">
                    <span>如果信息有误,请拨打我公司服务热线:</span><br>
                    <span>40080-59680</span>
                </p>
				    </div>
				<input class="but haveChannel" @click="$router.push('/dashboard')" type="submit" value="下一步" id="next">

		      <p class="copyright">©聚保平台</p>
		    </div>
	    </div>
	</article>

    <article class="artic" v-else>
        <div class="password">
		    <div class="mm_box" style="padding-top: 5.667rem;">
			    <div class="clearfix" style="position:relative;padding-bottom: 10px;border-bottom: 1px solid rgb(234, 234, 234);">
                    <input style="width: 70%;float:left;" class="txt" name="company_name" id="reg_company" type="text" :placeholder="placeholder" @blur="inputTest" v-model.trim="setChannel">
                    <input style="width: 20%;float:right;height: 2.567rem;padding: 0 2%;border-radius: 0.417rem;background:#3c93e8;color:#fff;" type="button" value="搜索" id="search" @click="searchChannel()">
                    <div class="searchResults" v-show="resultsData.length!=0">
                        <ul style="border: 1px solid #dadada;width: 200px;overflow-y: scroll;height: 200px;">
                            <li v-for="item in resultsData" v-text="item.realname" style="padding: 3px 0 3px 10px;" @click="selectedChannel(item)"></li>
                        </ul>
                        <div @click="resultsData = []">关闭</div>
                    </div>
                    <div class="notFound" style="display:none;color:red;">很抱歉,没有匹配到服务机构或服务人员!</div>
                </div>
		        <div style="height:1.3rem;">
		        	<span id="span_tip" style="color:red;padding-left:1.26rem;display:none">&nbsp;11</span>
		        </div>
		        <input class="but noChannel" @click="fillChannel" type="submit" value="确认" id="sub">

		      <p class="copyright">©聚保平台</p>
		    </div>
	    </div>
	</article>

</div>
</template>

<script>
import {mapMutations,mapState} from "vuex"
import {Toast} from 'mint-ui';
import {zcbUserInfo,cmnChannelList,zcbUserRegister} from '../libs/api'
import NewHead from '../components/NewHead.vue'
export default {
     components:{
        "new-head":NewHead,
     },
     data(){
        return {
            placeholder: '请输入您的服务机构或服务人员',
            channel: '', // 渠道
            setChannel: '', // input数据渠道筛选字符
            company_id: '', // 公司ID
            channelData: [], // 渠道数据数组
            resultsData: [],  // 搜索匹配结果数组
            selectedDate: [], // 选中数据数组
        }
    },
    methods: {
        // 点击搜索匹配显示数据
        searchChannel(){
            // setChannel channelData resultsData
            let self = this;
            if(self.placeholder == '请输入您的服务机构或服务人员' && self.setChannel == ''){
                Toast('请先通过查询选择服务机构或服务人员!');
                return;
            }else{
                self.resultsData = [];
                self.resultsData = self.channelData.filter(function(item){
                    return item.realname.match(self.setChannel);
                })
                if(self.resultsData.length == 0){
                    self.resultsData = [];
                    document.querySelector('.notFound').style.display = 'block';
                    setTimeout(function(){
                        document.querySelector('.notFound').style.display = 'none';
                    },2000)
                }
            }
        },
        selectedChannel(item){
            this.resultsData = [];
            this.setChannel = item.realname;
            this.selectedDate = item;
        },
        loadChannelList(){ // 获取渠道列表
            cmnChannelList().then((res)=>{
                this.channelData = res.data;
            }).catch((err)=>{
                console.log(err);
            });
        },
        inputTest(){
            var data = this.channelData.filter((item)=>{
                return item.realname == this.setChannel;
            })
            if(data.length == 1){
                this.selectedDate = data[0];
                Toast('输入正确!');
            }else if(data.length != 1){
                Toast('请先通过查询选择唯一服务机构或服务人员!');
                return;
            }
        },
        fillChannel(){
            let self = this;
            var data = this.channelData.filter((item)=>{
                    return item.realname == this.setChannel;
                })
            if(data.length == 1){
                this.selectedDate = data[0];
            }else if(data.length > 1){
                Toast('请先通过查询选择唯一服务机构或服务人员!');
                return;
            }
          if(this.selectedDate.id && this.setChannel !== this.selectedDate.realname){
            this.selectedDate = {};
            this.fillChannel();
          }else if(this.selectedDate.id == undefined && this.setChannel==""){
                this.selectedDate.id = 2208;
                add();
            }else if(this.selectedDate.id == undefined && this.setChannel!=""){
                Toast('请先通过查询选择唯一服务机构或服务人员!');
                return;
            }else {
                add();
            }
            function add(){
                zcbUserRegister(self.selectedDate.id).then((res)=>{
                    if(res.err_code == 0){
                        Toast('设置成功!');
                        self.init();
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        init(){
            zcbUserInfo().then((res)=>{
                if(res.data.channel_name != ''){
                    this.channel = res.data.channel_name;
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    },
    created(){
        this.init();
        this.loadChannelList();
    }
}
</script>

<style lang="scss" scoped>
@import '../css/common';
.searchResults{
    background: #fff;
    z-index: 1;
    height: 200px;
    padding-bottom:30px;
    /*transition: all 1s;*/
    box-shadow: 1px 1px 10px 2px #ccc;
}
.searchResults>div {
    text-align: center;
    height: 30px;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    line-height: 30px;
}
#span_tip{background:url('../img/L_tips.png') no-repeat left center;}
#span_suc{background:url('../img/success.png') no-repeat left center;}
.searchResults,.notFound{top: 3.167rem;position:absolute;}
.artic .password .mm_box .but.noChannel[data-v-ffc9f6e8] {
  width: 100%;
  height: 3.5rem;
  background: #1aad19;
  border-radius: 0.417rem;
  cursor: pointer;
  font-family: "\5FAE\8F6F\96C5\9ED1";
  font-size: 1.3rem;
  color: #fff;
  width: 70%;
  display: block;
  margin: 1rem auto 0;
}
.artic .password .mm_box .but.haveChannel {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  width: 70%;
  height: 3rem;
  border-radius: 5px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  overflow: hidden;
  background-color: #1aad19;
  color: #fff;
  margin-top: 3rem;
}
.artic .password .mm_box .copyright {
  padding-top: 3rem;
  padding-bottom: 20rem;
}
.artic .password .mm_box .txt {
  height: 2.567rem;
}
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
.header .h_top a.go_back { position: absolute;left: 15px;};
</style>
