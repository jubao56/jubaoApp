<template>
    <div class='ygbOrders'>
        <!--<div class='tab'>
            <div class='tab_item lt' @click='status=1'>
                <h3 :class="status ==1 ? 'tab_item_active':''">待付款</h3>
            </div>
            <div class='tab_item rt' @click='status=4'>
                <h3 :class="status ==4 ? 'tab_item_active':''">已完成</h3>
            </div>
        </div>-->

        <div class='item' v-for="(order, index) in orders" v-show='order.status==status'>
            <p>公司名称：<span>{{order.company_name}}</span></p>
            <p>投保时间：<span>{{ order.created_at.slice(0, 19).replace('T', '  ') }}</span></p>
            <p>参保人数：<span>现场操作 {{order.driver_number}} 人</span></p>
            <p><span class='hidden'>参保人数：</span><span>非现场操作 {{order.clerk_number}} 人</span></p>
            <p class='ygb_price'>应付保费: <span class='red_text'>￥{{order.price/100}}</span></p>
            <div class='button_area' v-show='order.status==1'>
                <button class='link' @click='cancel(order.id)'>取消</button>
                <button class='link' @click.prevent='topay'>去付款</button>
                <router-link :to="{path: 'ygbOrderDetails', query: {status: status, orderId: order.id}}" class='link'>查看详情</router-link>
            </div>
            <div class='button_area' v-show='order.status==4' style='padding-bottom: 0.08rem;'>
                <a class='link' @click="toChange(order.id, 'ygbChange', order.company_id)">换人</a>
                <a class='link' @click="toChange(order.id, 'ygbAdd', order.company_id)">加人</a>
                <router-link :to="{path: 'ygbOrderDetails', query: {status: status, orderId: order.id}}" class='link'>查看详情</router-link>
            </div>
        </div>
        <!--<div class='item'>
            <p>投保时间：<span>2017-08-03    14:25:23</span></p>
            <p>参保人数：<span>现场操作 5 人</span></p>
            <p><span class='hidden'>参保人数：</span><span>非现场操作 2 人</span></p>
            <p class='ygb_price'>应付保费: <span class='red_text'>￥840</span></p>
            <div class='button_area'>
                <button class='link'>取消</button>
                <router-link to='' class='link'>去付款</router-link>
                <router-link to=''class='link'>查看详情</router-link>
            </div>
        </div>
        <div class='item'>
            <p>投保时间：<span>2017-08-03    14:25:23</span></p>
            <p>参保人数：<span>现场操作 5 人</span></p>
            <p><span class='hidden'>参保人数：</span><span>非现场操作 2 人</span></p>
            <p class='ygb_price'>应付保费: <span class='red_text'>￥840</span></p>
            <div class='button_area'>
                <button class='link'>取消</button>
                <router-link to='' class='link'>去付款</router-link>
                <router-link to=''class='link'>查看详情</router-link>
            </div>
        </div>-->
    </div>
</template>

<script>
    import { Indicator, MessageBox } from 'mint-ui';
    import {mapState} from 'vuex';
    import { ygbOrderCancel,ygbOrderList,cmnUserInfo,cmnFileList, ygbUserInfo } from '../libs/api'
    export default {
        data(){
            return {
                status: 4, // 订单状态，1=待付款，4=已完成
                cmnUrl: this.$store.state.cmnUrl,
                fileUrl: this.$store.state.fileUrl,
                ygbUrl: this.$store.state.ygbUrl,
                axios: this.$store.state.axios,
                token: '',
                orders: [],
                isWWW: this.$store.state.isWWW,
            }
        },
        methods: {
            cancel(order_id){
                MessageBox.confirm('您是否要取消当前这个订单?').then(action => {
                    if(action == 'confirm') {
                        ygbOrderCancel(order_id).then(res=>{
                            if(res.err_code == 0){
                                ygbOrderList().then(res=>{
                                    this.orders = res.rows;
                                }).catch((err)=>{ console.log("ygbOrderList",err) })
                                MessageBox('提示', '删除成功！')
                            }else{
                                MessageBox('提示', '操作失败！请稍后重试')
                            }
                        }).catch((err)=>{ console.log("ygbOrderCancel",err) })
                    }
                })
            },
            topay(){
                MessageBox('提示', '请在电脑端网站支付该订单')
                return false;
            },
            toChange(orderId, path, companyId){
                if(this.status == 8) {
                    alert('您的保单已经过期，不可以进行加人/换人操作！请重新投保员工保！如有疑问，请拨打我们的客服服务热线 40080-59680 ')
                    return false;
                }
                cmnUserInfo().then(res=>{
                    this.id = res.data.id;
                    let data = { entity: 'company', entity_id: companyId, type: 4 };
                    cmnFileList(data).then(res=>{
                        if(res.filelist.length != 0){
                            this.$router.push({path: path, query: {orderId: orderId}})
                        }else{
                            this.$router.push({path: 'ygbChangeFile', query: {id: orderId, path: path}})
                        }
                    }).catch((err)=>{ console.log("cmnFileList",err) })
                }).catch((err)=>{ console.log("cmnUserInfo",err) })
            }
        },
        created(){
            console.log(this.$store.state.token)
            var html = document.documentElement;
            var windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / 7.5 + 'px';
            function getCookie(params){
                var name=params;
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
                if (arr = document.cookie.match(reg)) {
                    var token=unescape(arr[2]) ;
                }else {
                    var token=null ;
                }
                return token;
            }
            this.token = getCookie(this.$store.state.jubao_user);
            Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
            });
            ygbOrderList().then(res=>{
                Indicator.close();
                if(res.rows.length == 0){
                    MessageBox.alert('尊敬的会员：\n 您好，您是员工保新投保客户，请拨打40080-59680向客服索取员工保投保“秘籍”呦~').then(action =>{
                        if(action=='confirm'){
                            this.$router.go(-1)
                        }
                    })

                }
                this.orders = res.rows;
            }).catch((err)=>{ console.log("ygbOrderList",err) })
            console.log(this);
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                if(from.path == '/ygbOrderDetails') vm.status = from.query.status;
            })
        },
        beforeRouteLeave(to, from ,next) {
            if(to.path == '/home'|| to.path == '/dashboard'){
                console.log(document.documentElement.style.fontSize)
                document.documentElement.style.fontSize = '';
            }
            next()
        },
        // beforeDestroy(){
        //     var html = document.documentElement;
        //     html.style.fontSize = '';
        // }
    }
</script>

<style lang='scss' scoped>
@import '../css/common';
@import '../css/ygbOrders';

</style>
