<template>
    <div class="details">
        <p class='order_item after'><span class='order_item_title'>公司名称</span>{{order.company_name}}</p>
        <p class='order_item after'><span class='order_item_title'>保单号</span>{{order.policy_no}}</p>
        <p class='order_item after'><span class='order_item_title'>保险起期</span>{{(order.effect_date+'').slice(0, 19).replace('T', '  ')}}</p>
        <p class='order_item after'><span class='order_item_title'>保险止期</span>{{(order.expire_date+'').slice(0, 19).replace('T', '  ')}}</p>
        <p class='order_item after'><span class='order_item_title'>保险保障</span><span>{{details}}</span></p>
        <p class='order_item '><span class='order_item_title'>合计保费</span>￥{{order.price/100}}</p>
        <div class='table'>
            <h3>现场操作人员明细清单列表<i class='icon' :class='show_driver? "icon_show": "icon_hide"' @click='show_driver=!show_driver'></i></h3>
            <div v-show='show_driver' style='overflow-x: scroll;'>
            <p class='order_item after table_line'><span class='order_item_title table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_status'>状态</span><span class='table_effect'>生效日期</span><span class='table_price'>单价(元/年)</span></p>
            <p class='order_item after table_line' v-for="driver in driver_list"><span class='order_item_title table_name'>{{driver.name}}</span><span class='table_idcard'>{{driver.idcard}}</span><span class='table_status'>{{driver.status}}</span><span class='table_effect'>{{(driver.effect_date+'').slice(0, 10)+' 零时起'}}</span><span class='table_price'>{{(driver.price/100).toFixed(2)}}</span></p>
            </div>
        </div>
        <div class='table'>
        <h3>非现场操作人员明细清单列表<i class='icon' :class='show_clerk? "icon_show": "icon_hide"' @click='show_clerk=!show_clerk'></i></h3>
        <div v-show='show_clerk' style='overflow-x: scroll;'>
        <p class='order_item after table_line'><span class='order_item_title table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_status'>状态</span><span
                class='table_effect'>生效日期</span><span class='table_price'>单价(元/年)</span></p>
        <p class='order_item after table_line' v-for="clerk in clerk_list"><span class='order_item_title table_name'>{{clerk.name}}</span><span class='table_idcard'>{{clerk.idcard}}</span><span class='table_status'>{{clerk.status}}</span><span class='table_effect'>{{(clerk.effect_date+'').slice(0, 10)+' 零时起'}}</span><span class='table_price'>{{(clerk.price/100).toFixed(2)}}</span></p>
        </div>
        <!--<div style='overflow-x:scroll'>
        <p style='width:9rem;border:1px solid red;'>fafa</p>
        </div>-->
        <div class='button_area' v-if='status==4'>
            <a @click="toChange(order.id, 'ygbChange', order.company_id, 'details')" class="button_area_first">我要换人</a>
            <!--<a @click="toChange(order.id, 'ygbAdd', order.company_id, 'details')">我要加人</a>-->
        </div>
        <div class='button_area' v-if='status==1'>
            <a @click="topay">去付款</a>
        </div>
        </div>
    </div>
</template>

<script>
    import { Indicator, MessageBox } from 'mint-ui';
    import { ygbOrderEmployeelist,ygbOrderInfo,cmnUserInfo,cmnFileList } from '../libs/api'
    export default {
        data(){
            return {
                status: 1, // 订单状态，1=待付款，4=已完成
                orderId: '',
                ygbUrl: this.$store.state.ygbUrl,
                cmnUrl: this.$store.state.zcbUrl,
                fileUrl: this.$store.state.fileUrl,
                axios: this.$store.state.axios,
                token: '',
                order: {},
                driver_list: [],
                clerk_list: [],
                productId: '', // 产品id
                details: '', // 保单保障
                show_driver: true, // 显示司机列表
                show_clerk: true, // 显示文员列表
            }
        },
        methods: {
            toChange(orderId, path, companyId, details){
                if(this.status == 8) {
                    MessageBox('提示', '您的保单已经过期，不可以进行加人/换人操作！请重新投保员工保！如有疑问，请拨打我们的客服服务热线 40080-59680')
                    return false;
                }
                cmnUserInfo().then(res=>{
                    this.id = res.data.id;
                    let data = { entity: 'company', entity_id: companyId, type: 4 };
                    cmnFileList(data).then(res=>{
                        if(res.filelist.length != 0){
                            this.$router.push({path: path, query: {orderId: orderId, from: details}})
                        }else{
                            this.$router.push({path: 'ygbChangeFile', query: {id: orderId, path: path, from: details}})
                        }
                    })
                }).catch((err)=>{ console.log("cmnUserInfo",err) })
            },
            topay(){
                MessageBox('提示', '请在电脑端网站支付该订单')
                return false;
            },
        },
        created(){
            console.log(this.$store.state.token)
            this.status = this.$route.query.status;
            this.orderId = this.$route.query.orderId;
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
            Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
            });

            ygbOrderInfo(this.orderId *1).then(res=>{
                this.order = res.order;
                this.productId = res.order.product_id;
                this.details = (function(){
                    switch(res.order.product_id){
                        case 1: return '60万死亡伤残+6万医疗+100元/天误工费+13种扩展保障'; break;
                        case 2: return '20万死亡伤残+2万医疗+100元/天误工费+13种扩展保障+自费药保障'; break;
                        case 3: return '40万死亡伤残+4万医疗+100元/天误工费+13种扩展保障+自费药保障+24小时意外'; break;
                        case 4: return '60万死亡伤残+6万医疗+100元/天误工费+13种扩展保障+自费药保障+24小时意外+100元/天住院津贴'; break;
                        case 5: return '详情请见合同约定';
                    }
                })();
            }).catch((err)=>{ console.log("ygbOrderInfo",err) })
            let data = {order_id: this.orderId *1};
            ygbOrderEmployeelist(data).then(res=>{
                if(res.err_code == 0){
                    Indicator.close();
                    res.rows.forEach((ele, index) => {
                        if(ele.status == 1) ele.status = '已生效'
                        if(ele.status == 2) ele.status = '未生效'
                        if(ele.status == 4) ele.status = '删除'
                        if(ele.status == 8) ele.status = '锁定'
                        //未生效状态的列表
                        if(this.$route.query.status == 1){
                            if(ele.type == 1 && ele.status == '未生效') this.driver_list.push(ele);
                            if(ele.type == 2 && ele.status == '未生效') this.clerk_list.push(ele);
                        }
                        //已生效状态的列表
                        if(this.$route.query.status == 4){
                            if(ele.type == 1 && ele.status == '已生效' || ele.status == '锁定') this.driver_list.push(ele);
                            if(ele.type == 2 && ele.status == '已生效' || ele.status == '锁定') this.clerk_list.push(ele);
                        }

                    })
                }else{
                    Indicator.close();
                    MessageBox('提示', '网络错误，请稍后重试！');
                }
            }).catch((err)=>{ console.log("ygbOrderEmployeelist",err) })
        },
    }
</script>


<style lang='scss' scoped>
@import '../css/common';
@import '../css/ygbOrderDetails';

</style>