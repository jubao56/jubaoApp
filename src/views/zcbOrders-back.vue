<template>
<div>
    <header class="header">
	    <div class="h_top" style="text-align:center">
	    	<router-link class="go_back" to="/dashboard"><span><img src="../img/back.png"></span>保单查询</router-link>
	    </div>
	</header>
   <article class="artic">
    	<div class="main">
            <div class="bao_title">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <th>投保时间</th>
                        <th>车牌号</th>
                        <th>运输路线</th>
                        <th>操作</th>
                    </tr>
                </tbody></table>
            </div>
            <div class="bao_list" id="bao_list">
                <table id="table_list" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                <tr style="display: table-row;" v-for="(order, index) in orders">
                        <td>{{ order.created_at.replace('T', ' ').replace('+08:00', '') }}</td>
                        <td>头：{{ order.plate_no }} <br>挂：{{ order.plate_extra_no }}</td>
                        <td>{{ order.start_province + order.start_city }}<br> {{ order.end_province + order.end_city }}</td>
                        <td v-if="orderStatus == 'unpaid' ? true : false ">
						
                            <router-link :to="{ name: 'tryout', query: { status:'1_' +  order.id }}" class="order_detail">去付款</router-link>
                            <a href="javascript:void(0)" class="order_del" data-id="11e74111-86d3-9e9e-bca1-00163e005b84" @click='cancelOrder(order.id, index)'>取消保单</a>
						
                        </td>
                        <td v-else>
						
							<router-link :to="{path: 'paySuccess',query:{status:'1_' + order.id}}" class="order_detail">查看详情</router-link>	
						
                        </td>
                    </tr></tbody></table>
            </div>
            <div class="look_more" id="look_more">
                <a class="more" @click = 'loadMore' >{{orders.length < total ? "加载更多" : "无更多数据" }}</a>
            </div>

        </div>
	</article>
</div>
</template>

<script>
import {mapMutations} from "vuex"
import {Toast, MessageBox} from 'mint-ui'
import {getToken} from '../libs/api'
export default {
    data(){
        return {
            orderStatus: this.$route.query.type,
            orders: [], //总的订单，用于累计储存每次加载的数据
            loadOrders: [], //每次数据请求返回的数据
            total: [], //保单的条数
            courrentPage: 1,
            
        }
    },
    computed: {
        orders1(){
            return [].concat(this.loadOrders);
        }
    },
    methods: {
        ...mapMutations({getCookie:'GETCOOKIE'}),
        getdata(){
            var _this = this;
            this.$store.state.axios({
                method: 'get',
                url: this.$store.state.zcbUrl + "/v1/zcb/order/list",
                headers:{'Authorization':'Bearer ' + this.$store.state.token},
                params: {
                    page: this.courrentPage,
                    rows: 10,
                    status: this.orderStatus == 'unpaid'? 1 : 4
                }
            }).then(function (res){

                _this.loadOrders = res.data.rows;
                
                _this.orders=_this.orders.concat(_this.loadOrders);
                //console.log(_this.orders.concat([1,2]));
                //console.log(_this.orders.concat(_this.loadOrders));
                console.log(_this.orders);
                //console.log(_this.loadOrders.concat([3,4]));
                _this.total = res.data.total;
            })
        },
        cancelOrder(orderId, index){
            var _this = this;
            var ifDelete = window.confirm('您确定要取消此订单嘛？')
            if(ifDelete){
                this.$store.state.axios({
                method: 'post',
                url: this.$store.state.zcbUrl + '/v1/zcb/order/status',
                data: {order_id: orderId, status: 2},
                headers:{'Authorization':'Bearer ' + this.$store.state.token}
            }).then(function(res){
                if(res.data.err_code == 0){
                    _this.orders.splice(index, index+1);
                    Toast({
                        message: '订单已取消',
                        duration: 2000
                    })
                }
            })
            }
        },
        loadMore(){
            if(this.orders.length < this.total){
                this.courrentPage++;
                this.getdata();
            }
            return;
        }
    },
    created(){
        if(!getToken()){
            this.$router.push('/login')
            return
        }
        this.getdata();
    }
}
</script>

<style lang="scss" scoped>
@import '../css/common';

</style>