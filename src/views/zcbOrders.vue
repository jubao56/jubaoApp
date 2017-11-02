<template>
<div>
    <header class="header">
        <div class="h_top" style="text-align:center;">
            <router-link class="go_back" to="/dashboard"><span><img style="float:left;" src="../img/back.png"></span></router-link>我的保单
        </div>
    </header>
   <article class="artic" style="background:#EDEDED;">
        <div class="main" style="padding-top: 0;">
            <div class="tab clearfix">
                <div class="unpaid" @click="toggle('unpaid')"><span :class="{'tab-on': orderStatus == 'unpaid'}">待付款</span></div>
                <div class="paid" @click="toggle('paid')"><span :class="{'tab-on': orderStatus == 'paid'}">已完成</span></div>
            </div>
            <div class="unpaidList" v-show="orderStatus == 'unpaid'">
                <div class="bao_list" id="bao_list" style="padding-top: 0.125rem;">
                    <div v-for="(order, index) in unpaidOrders">
                        <p>投保时间: &nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
                        <p>车票号: &nbsp;&nbsp;&nbsp;&nbsp;头：{{ order.plate_no }} &nbsp;&nbsp;&nbsp;&nbsp; 挂：{{ order.plate_extra_no }}</p>
                        <p>运输线路: &nbsp;{{ order.start_province + order.start_city }} — {{ order.end_province + order.end_city }}</p>
                        <p style="text-align:right; margin: 15px 0 5px;">
                            <a href="javascript:void(0)" style="color: inherit;border-color: #eaeaea;" class="order_del" data-id="11e74111-86d3-9e9e-bca1-00163e005b84" @click='cancelOrder(order.id, index)'>取消</a>
                            <router-link :to="{ name: 'tryout', query: { status:'1_' +  order.id }}" class="order_detail">去付款</router-link>
                        </p>
                    </div>
                </div>
                <div class="look_more" id="look_more">
                    <a class="more" @click = 'unpaidLoadMore()' >{{unpaidOrders.length < unpaidTotal ? "加载更多" : "无更多数据" }}</a>
                </div>
            </div>
            <div class="paidList" v-show="orderStatus == 'paid'">
                <div class="bao_list" id="bao_list" style="padding-top: 0.125rem;">
                    <div v-for="(order, index) in paidOrders">
                        <p>投保时间: &nbsp;{{ order.created_at.replace('T', '&nbsp;&nbsp;&nbsp;').replace('+08:00', '') }}</p>
                        <p>车票号: &nbsp;&nbsp;&nbsp;&nbsp;头：{{ order.plate_no }} &nbsp;&nbsp;&nbsp;&nbsp; 挂：{{ order.plate_extra_no }}</p>
                        <p>运输线路: {{ order.start_province + order.start_city }} — {{ order.end_province + order.end_city }}</p>
                        <p style="text-align:right;margin: 15px 0 5px;">
                            <a @click="showDetail(order)" class="order_detail">查看详情</a>
                        </p>
                    </div>
                </div>
                <div class="look_more" id="look_more">
                    <a class="more" @click = 'paidLoadMore()' >{{paidOrders.length < paidTotal ? "加载更多" : "无更多数据" }}</a>
                </div>
            </div>
        </div>
    </article>
</div>
</template>

<script>
import {Toast, MessageBox} from 'mint-ui'
import {zcbOrderList,zcbOrderStatus} from '../libs/api'
//import {goPageHref} from "../libs/common"
export default {
    data(){
        return {
            orderStatus: this.$route.query.type,
            unpaidOrders: [], //总的未支付订单，用于累计储存每次加载的数据
            unpaidLoadOrders: [], //每次数据请求返回的未支付数据
            unpaidTotal: [], //未支付保单的条数
            unpaidPage: 1, // 未支付保单的页码
            paidOrders: [], //总的已完成订单，用于累计储存每次加载的数据
            paidLoadOrders: [], //每次数据请求返回的已完成数据
            paidTotal: [], //已完成保单的条数
            paidPage: 1, // 已完成保单的页码

        }
    },
    methods: {
        showDetail(order){
//            this.$router.push({path: 'paySuccess',query:{status:'1_' + order.id}});
          let url = '';
          if(location.hostname.indexOf("www") !== -1){
            url = 'http://www.jubao56.com/m/'
          }else if(location.hostname.indexOf("jubao56.com")==0){
            url = 'http://jubao56.com/m/'
          }else{
            url = 'http://test.jubao56.com/m/'
          }
          window.location.href = url+"vueStatic/paySuccess.html?status=1_"+ order.id
//            goPageHref("vueStatic/paySuccess.html?status=1_"+ order.id)
        },
        // 获取未支付保单数据
        getUnpaidData(){
            zcbOrderList({
                page: this.unpaidPage,
                rows: 10,
                status: 1
            }).then((res)=>{
                this.unpaidLoadOrders = res.rows;
                this.unpaidOrders= this.unpaidOrders.concat(this.unpaidLoadOrders);
                this.unpaidTotal = res.total;
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 获取已完成保单数据
        getPaidData(){
            zcbOrderList({
                page: this.paidPage,
                rows: 10,
                status: 4
            }).then((res)=>{
                this.paidLoadOrders = res.rows;
                this.paidOrders= this.paidOrders.concat(this.paidLoadOrders);
                this.paidTotal = res.total;
                console.log("paidOrders",this.paidOrders);
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 取消订单
        cancelOrder(orderId, index){
//            let ifDelete = window.confirm('您确定要取消此订单嘛？')
            MessageBox.confirm('确定删除此订单?').then(action => {
                zcbOrderStatus({order_id: orderId, status: 2}).then((res)=>{
                    if(res.err_code == 0){
                        this.unpaidOrders.splice(index, 1);
                        Toast({
                            message: '订单已取消',
                            duration: 2000
                        })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch(err=>{});
        },
        // 加载更多
        unpaidLoadMore(){
            if(this.unpaidOrders.length < this.unpaidTotal){
                this.unpaidPage++;
                this.getUnpaidData();
            }
            return;
        },
        paidLoadMore(){
            if(this.paidOrders.length < this.paidTotal){
                this.paidPage++;
                this.getPaidData();
            }
            return;
        },
        toggle(type){
            this.orderStatus = type;
        }
    },
    created(){
        this.getUnpaidData();
        this.getPaidData();
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            if(from.path != '/dashboard'){
                vm.orderStatus = 'paid';
            }
            if(from.path == '/tryout'){
                vm.orderStatus = 'unpaid';
            }
        })
    },
}
</script>
<style lang="scss" scoped>
@import '../css/common';
.header .h_top a.go_back { position: absolute;left: 15px;};
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
.unpaid,.paid {width:50%;float:left;text-align:center;height: 3rem;line-height:3rem;font-size:1.3rem;}
.tab-on { color: #0FACF7;padding: 7px 20px;border-bottom: 2px solid #0facf7; }
.main .tab { background: #fff; margin-bottom: 5px;padding-top: 7vh;}
#bao_list>div { background: #fff; margin-bottom: 10px; padding: 10px 20px;}
#bao_list>div p:last-child{ text-align:right; }
#bao_list>div p:last-child a { text-align:right; color: #0FACF7; border: 1px solid #0FACF7;padding: 3px 10px;border-radius: 50px; }
</style>
