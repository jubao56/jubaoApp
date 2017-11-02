<template>
<div>
    <new-head url="/dashboard" title="地址管理"></new-head>
    <!--artic-->
    <article class="artic" style="padding-top: 7vh;background:#ededed;">
        <div>
            <div class="chcekList" style="padding: 0px;height: 86vh;overflow: scroll;">
                <div v-for="(item,index) in addressRows" class="singl double" style="margin-bottom: 10px;background: #fff;padding: 10px;">
                    <div>
                        <span>{{item.recipients}}</span>
                        <span style="float:right;">{{item.mobile}}</span>
                    </div>
                    <div>{{item.province+item.city+item.district+item.street}}</div>
                    <p style="">
                        <a href="javascript:void(0)" v-show="index==0 && current_page==1" :addressId="item.id" class="address_first">
                            <i class="icon icon-iconfonticonfonticonfont27" style="color:#0FACF7;font-weight: 700;"></i> 已置顶
                        </a>
                        <a href="javascript:void(0)" v-show="index!=0 || current_page!=1" :addressId="item.id" @click="defaultAddress(item.id)" class="address_first">
                            <i class="icon icon-iconfonticonfonticonfont27"></i> 置顶
                        </a>
                        <a href="javascript:void(0)" :addressId="item.id" @click="deleteAddress($event)" style="float:right;" class="address_remove">
                            <i class="icon icon-del"></i> 删除
                        </a>
                    </p>
                </div>
                <div class="noData" style="text-align: center;margin-top: 10px; color: #666;" v-if="!count">暂无数据</div>
            </div>
            <div class="mm_box" style="text-align:center;">
                <input class="but" @click="$router.push('/addAddress')" type="submit" value="添加新地址" id="next" style="color:#fff;display: inline-block; width: 100%;">
            </div>
        </div>
    </article>
</div>
</template>

<script>
import {cmnUseraddressList,cmnUseraddressDelete,cmnUseraddressSetdefaultaddr} from '../libs/api'
import {Toast} from 'mint-ui';
import NewHead from '../components/NewHead.vue'
export default {
    components:{
      "new-head":NewHead,
    },
    data(){
        return {
            addressRows: [], // 所有邮寄地址
            count:'', // 邮寄地址总数
            company_id: '',
            topAddress: '',
            current_page: 1,
        }
    },
    methods: {
        init(){
//            let data = {page: this.current_page, rows: 5};
            cmnUseraddressList().then((res)=>{
                if(res.err_code == 0 && res.rows.length>0){
                    this.count = res.total;
                    this.addressRows = res.rows;
                }else{
                    this.addressRows = "";
                }
            }).catch((err)=>{ console.log("cmnUseraddressList",err) })
        },
        //置顶
        defaultAddress(id){
            cmnUseraddressSetdefaultaddr(id).then((res)=>{
                if(res.err_code == 0){
                    Toast("置顶成功！");
                    this.init();
                }else {
                    Toast("置顶失败！");
                }
            }).catch((err)=>{ console.log("cmnUseraddressSetdefaultaddr",err) })
        },
        //删除地址
        deleteAddress(e){
            let event= e || window.event;//事件委托
            let target = event.target || event.srcElement;//兼容chrome,ie
            let id = Number(target.getAttribute('addressid'));
            cmnUseraddressDelete(id).then((res)=>{
                if(res.err_code == 0){
                    Toast('删除地址成功!','提示');
                    this.init();
                }else if(res.err_code == 1103) {
                    Toast('未找到对应地址!','提示');
                }else {
                    Toast('未知错误!','提示');
                }
            }).catch((err)=>{ console.log("cmnUseraddressDelete",err) })
        },
    },
    created(){
        this.init();
    }
}
</script>
<style lang="scss" scoped>
@import '../css/common';
@import '../font/iconfont.css';
.header .h_top a.go_back { position: absolute;left: 15px;};
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
.chcekList p a {color: #000;}
.mm_box {
    height: 7vh;
    background: #0FACF7;
    line-height: 7vh;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
