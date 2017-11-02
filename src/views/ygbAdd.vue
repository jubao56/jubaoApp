<template>
    <div class='ygbAdd ygbChange'>
        <h3 class='driver'>现场操作人员</h3>
            <div class='confirm'>
                <div class='in table'>
                    <p class='table_line_change'><span class='in_name'>姓名</span><span class='in_idcard'>身份证号</span><span class='handle' @click="add_people('driver_list_in',1)"><button class='add sel_button'>新增</button></span></p>
                    <p class='table_line_change' v-for="(driver, index) in driver_list_in"><span class='in_name'><input type='text' v-model.trim='driver.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='driver.idcard' class='input input_idcard' @blur='check_idcard(driver)' :class="driver.checked==1?'checked_false': ''"></span><span class='handle' @click='driver_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
                </div>
            </div>

             <h3 class='driver'>非现场操作人员</h3>
            <div class='confirm'>
                <div class='in table'>
                    <p class='table_line_change'><span class='in_name'>姓名</span><span class='in_idcard'>身份证号</span><span class='handle' @click="add_people('clerk_list_in',2)"><button class='add sel_button'>新增</button></span></p>
                    <p class='table_line_change' v-for="(clerk, index) in clerk_list_in"><span class='in_name'><input type='text' v-model.trim='clerk.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='clerk.idcard' class='input input_idcard' @blur='check_idcard(clerk)' :class="clerk.checked==1?'checked_false': ''"></span><span class='handle' @click='clerk_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
                </div>
            </div>
        <div class='fullbg' v-if='showConfirm'>
            <div class='yzm'>
            <p>系统检测到您增加的现场操作人员为<span> {{driver_list_in.length}}</span> 人，非现场操作人员为 <span>{{clerk_list_in.length}}</span> 人。</p><p>此次人员增加需支付保险费用：<span>{{(amount/100).toFixed(2)}}</span>元</p>
            
            <div class='get_yzm'><input type='text' v-model='yzm'><button class='yzm_btn' @click='getYZM' :disabled='click'>{{yzm_text}}</button></div>
            <div class='yzm_btn_area'>
                <button @click='showConfirm=false'>返回修改</button><button @click='confirm_send'>确认增加</button>
            </div>
            </div>
        </div>
        <div class='fullbg' v-if='pay'>
            <div class='pay' style="height: 11rem;margin-top:0.5rem" :style="pay_way == 'weixin'?'height:8.5rem':''">
            <div>   
                <div class='pay_item pay_lt' @click="pay_way='zhifubao'">
                    <h3 :class="pay_way=='zhifubao' ? 'tab_item_active':''">支付宝</h3>
                </div>
                <div class='pay_item pay_rt' @click="pay_way='weixin'">
                    <h3 :class="pay_way=='weixin' ? 'tab_item_active':''">微&nbsp;&nbsp;信</h3>
                </div>
                <div v-if="pay_way == 'weixin'" style='clear:both'><p style='text-align: center'>微信二维码</p><p style='text-align: center'>{{time_wx}}</p></div>
                <div v-if="pay_way == 'zhifubao'" style='clear:both'><p style='text-align: center'>支付宝二维码</p><p style='text-align: center'>{{time_zhifubao}}</p></div>
                <div class='QR' v-show="pay_way == 'weixin'" style="font-size:0;"><img :src='weixin_url' ></div>
                <div class="QR" v-show="pay_way == 'zhifubao'">
                <img :src='zhifubao_url'>
                </div><p style='color: grey'>温馨提示</p>
                    <p style='color: grey;margin-bottom: 0.02rem;'>此二维码将在2小时后失效，请尽快支付</p>
                    <div v-if="pay_way == 'weixin'"><p style='text-align: left;text-indent: 2em;'>因微信支付未开放“长按二维码识别支付”接口，请您使用另一部手机的微信扫码完成支付</p>
                    <!--<p style='font-weight: bold;text-align: left;'>【方案一】：请将付款二维码截屏 → 进入个人微信首页 → 右上角“+” → “扫一扫” → 点击右上角“从相册选取二维码” → 选取付款二维码截图 → 立即支付"</p>
                    <p style='font-weight: bold;text-align: left;'>【方案一】：请使用另一部手机扫码完成支付</p>--></div>
                    <div v-if="pay_way == 'zhifubao'"><p style='text-align: left;text-indent: 2em;'>请您使用“支付宝>扫一扫”功能完成支付，具体操作方式如下：</p>
                    <p style='font-weight: bold;text-align: left; '>【方案一】：请将付款二维码截屏 → 打开支付宝 → “扫一扫” → 点击右上角“相册” → 选取付款二维码截图 → 立即支付</p>
                    <p style='font-weight: bold;text-align: left;'>【方案二】：请使用另一部手机扫码完成支付</p></div><div class='pay_btn' style="margin-top: 0.12rem;heigth:0.78rem; line-height:0.78rem" :style = "pay?'':'margin-top:0.65rem; heigth:0.98rem; line-height:0.98rem'">
                <button @click='cancel'>取消</button><button @click='success'>支付完成</button>
                </div>
            </div>
            </div>
        </div>
        <div class='button_area' v-if='step==1' id='add_confirm'>
            <a href='javascript:;' @click='confirm_next' >确认增加</a>
        </div>
    </div>
</template>

<script>
    import QRious from 'qrious'
    import { Indicator, MessageBox } from 'mint-ui';
    import { cmnUserInfo,cmnSmsSend,ygbOrderEmployeeaddprice,ygbOrderEmployeeadd,cmnBaofuPayurl,ygbOrderInfo,cmnBaoFinish } from '../libs/api'
    export default {
        data(){
            return {
                orderId: '',
                driver_list_in: [], // 换入的司机清单
                clerk_list_in: [], //换入的文员清单
                employee_list: [], //最终名单
                ygbUrl: this.$store.state.ygbUrl,
                cmnUrl: this.$store.state.zcbUrl,
                fileUrl: this.$store.state.fileUrl,
                axios: this.$store.state.axios,
                token: '',
                step: 1,
                yzm: '',
                yzm_text: '获取验证码',
                showConfirm: false,
                mobile: '',
                amount: 0, //需要支付的总额
                baofu_id: '',
                pay_way: 'zhifubao',
                pay: false,
                weixin_url: '',
                zhifubao_url: '',      
                groupNo:'',
                driver_num: '', //添加的现场人数
                clerk_num: '', //添加的非现场人数       
                arr_idcard: [],//加人的身份证集合   
                time_zhifubao: '',
                time_wx: '',
                click: false,
                
            }
        },
        methods: {
            cancel(){
                this.pay = false;
                
            },
            success(){
                cmnBaoFinish({
                    amount: this.amount*1,
                    order_id: this.orderId*1,
                    product_type: 2,
                    additional_info: this.groupNo? this.groupNo : '',
                }).then(res=>{
                    if(res.err_code == 1109){
                        if(this.$route.query.from == 'details') {
                            this.$router.go(-1)
                        }else{
                        this.$router.replace({path: 'ygbOrderDetails', query: {status: 4, orderId: this.orderId}})
                        }
                    }else if(res.err_code == 1116){
                        MessageBox('提示', '您还未支付此订单，如有疑问请联系客服')
                    }else if(res.err_code == 1103){
                        MessageBox('提示', '未找到该订单的信息，如有疑问请联系客服')
                    }
                })

            },
            add_people(list,type){
                this[list].push({
                    'name': '',
                    'idcard': '',
                    'type': type,
                    'id': 0, 
                    'checked': 0, 
                })
            },
			getMobile(){
                cmnUserInfo().then(res=>{
                    if(res.err_code == 0){
						this.mobile = res.data.mobile;
					}
                }).catch((err)=>{ console.log("cmnUserInfo",err) })
			},
			getYZM(){
			    let data = {mobile: this.mobile+''};
                cmnSmsSend(data).then(res=>{
                    if(res.err_code == 0) {
                        this.click = true;
                        var countdown = 60;
                        this.yzm_text = '已发送' + countdown;
                        var timer = setInterval(()=>{
                            countdown --;
                            this.yzm_text = '已发送' + countdown;
                            if(countdown == 0){
                                clearInterval(timer);
                                this.yzm_text = '获取验证码';
                                this.click = false;
                                countdown = '';
                            }
                        }, 1000)
                    }else{
                        alert('验证码发送失败，请重新获取')
                    }
                }).catch((err)=>{ console.log("cmnSmsSend",err) })
			},
            confirm_next(){
                // this.showConfirm = true;
                var next = true;
                if(!this.mobile) this.getMobile();
                this.employee_list = [];
                this.arr_idcard = [];
                this.driver_list_in.forEach((ele, index) => {
                    if(ele.name != '' && ele.checked == 2){
                        var item ={};
                        Object.assign(item, ele);
                        this.employee_list.push(item);
                        delete this.employee_list[index].checked;
                        this.arr_idcard.push(ele.idcard);
                    }else {
                        next = false;
                        MessageBox('提示', '您增加的第 '+ (index + 1) + ' 个现场操作人员信息不正确')
                        return false;
                    }
                })
            
                this.clerk_list_in.forEach((ele, index) => {
                    if(ele.name != '' && ele.checked == 2){

                        var item ={};
                        Object.assign(item,ele);
                        this.employee_list.push(item);
                        delete this.employee_list[this.driver_list_in.length + index].checked;
                        this.arr_idcard.push(ele.idcard)
                    }else {
                        next = false;
                        MessageBox('提示', '您增加的第 '+ (index + 1) + ' 个非现场操作人员信息不正确');
                        return false;
                    }
                })
                if(!next){
                    return false;
                }
                if(this.employee_list.length == 0) {
                    MessageBox('提示', '你增加的人数为0人，请添加员工信息后再进行下一步');
                    return false;
                }
                var str_idcard = this.arr_idcard.join(',');
                var sign = true;
                this.arr_idcard.forEach((ele, index) => {
                    var reg = new RegExp(ele,'g');
                    if(str_idcard.match(reg).length > 1){
                      MessageBox('提示', '你增加的人员中包含相同的身份证号，请检查后重新提交');
                      sign = false;
                      return false;  
                    }
                })
                if(!sign) {
                    return false;
                }
                Indicator.open();

                ygbOrderEmployeeaddprice({order_id: this.orderId*1, driver_num: this.driver_list_in.length*1, clerk_num: this.clerk_list_in.length*1}).then(res=>{
                    if(res.err_code == 0){
                        Indicator.close();
                        this.showConfirm = true;
                        this.amount = res.total_price;
                    }else if(res.err_code == 1014){
                        Indicator.close();
                        MessageBox('提示', '尊敬的客户：非常抱歉，您的账户暂时无法进行"整车保"加人操作，建议您选择其他险种，详询聚保服务热线: 40080-59680')
                    }else{
                        Indicator.close();
                        MessageBox('提示', '网络错误，请稍后重试或者联系客服')
                    }
                }).catch((err)=>{ console.log("ygbOrderEmployeeaddprice",err) })
            },
            confirm_send(){
                if(this.yzm.trim().length != 6){
                    MessageBox('提示', '请输入正确的验证码！')
                    return false;
                }
                Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
                });
                let data = {"order_id": this.orderId*1,
                        'group_no': this.groupNo? this.groupNo : '',
                        "sms_code": this.yzm,
                        "employee_list": this.employee_list,
                        "price": this.amount*1
                    };
                ygbOrderEmployeeadd(data).then(res=>{
                    if(res.err_code == 0){
                        this.pay = true;
                        this.yzm = '';
                        this.showConfirm = false;
                        this.groupNo = res.groupNo;
                        this.baofu_id = res.baofuId;
                        // 请求微信支付链接
                        let data = {
                                amount: this.amount*1,
                                order_id: this.baofu_id*1,
                                pay_type: 1,
                                product_type: 2,
                                additional_info: this.groupNo,
                        };
                        cmnBaofuPayurl(data).then(res=>{
                            if(res.err_code == 0){
                                var now = new Date();
                                this.time_wx = now.toLocaleDateString() + ' ' + now.toTimeString().slice(0, 8);
                                let qr = new QRious({
                                    value: res.pay_url,
                                    background: 'white',
                                    //backgroundAlpha: 0.8,
                                    foreground: 'black',
                                    //foregroundAlpha: 0.8,
                                    level: 'H',
                                    padding: 0,
                                    size: 160,
                                })
                                this.weixin_url = qr.toDataURL();
                                Indicator.close();
                            }else{
                                Indicator.close();
                                MessageBox('提示', '请求失败，请重试');
                                this.pay = false;
                            }
                        }).catch((err)=>{ console.log("cmnBaofuPayurl",err) })
                        // 请求支付宝支付链接
                        let params = {
                            amount: this.amount*1,
                            order_id: this.baofu_id*1,
                            pay_type: 2,
                            product_type: 2,
                            additional_info: this.groupNo,
                        };
                        cmnBaofuPayurl(params).then(res=>{
                            if(res.err_code == 0){
                                var now = new Date();
                                this.time_zhifubao = now.toLocaleDateString() + ' ' + now.toTimeString().slice(0, 8);
                                let qr = new QRious({
                                    value: res.pay_url,
                                    background: 'white',
                                    //backgroundAlpha: 0.8,
                                    foreground: 'black',
                                    //foregroundAlpha: 0.8,
                                    level: 'H',
                                    padding: 0,
                                    size: 180,

                                });
                                this.zhifubao_url = qr.toDataURL();
                            }else{
                                Indicator.close();
                                MessageBox('提示', '请求失败，请重试');
                                this.pay = false;
                            }
                        }).catch((err)=>{ console.log("cmnBaofuPayurl",err) })
                    }else if(res.err_code == 203){
                        Indicator.close();
                        MessageBox('提示', '您新增加的员工在保单中已存在，不能重复添加，请仔细核对后再重试，如有疑问请致电聚保服务热线: 40080-59680')
                        this.showConfirm = false;
                        this.yzm = '';    
                    }else if(res.err_code == 1006){
                        Indicator.close();
                        this.yzm = '';
                        MessageBox('提示', '验证码无效，请重新获取验证码')
                    }else {
                        Indicator.close();
                        this.yzm = '';
                        MessageBox('提示', '请求失败，请稍后重试或联系客服')
                    }
                }).catch((err)=>{ console.log("ygbOrderEmployeeadd",err) })
            },
            check_idcard(obj){
                console.log('测试身份验证')
                var idcard = obj.idcard;
                if(idcard==''){
                    return false;
                }
                if(idcard.replace(/\s/g, '').length!==18){
                    MessageBox('提示', '您输入的身份证号必须是18位，请重新输入');
                    obj.checked = 1;
					 return false;
				}
				if( parseInt(idcard.slice(10, 12)) > 0 &&  parseInt(idcard.slice(10, 12)) < 13 && 0 < parseInt(idcard.slice(12, 14)) && parseInt(idcard.slice(12, 14)) < 32){
					console.log('true')
				}else{
					console.log('false')
                    obj.checked = 1;
					MessageBox('提示','请输入正确的身份证号码！');
                    return false;
				}
                var now = new Date((new Date()).getTime() + 8*60*60*1000) //换算成本地时间
				var idcard_num = parseInt(idcard.slice(6, 14));
				var now_num = parseInt(now.toISOString().slice(0, 10).replace(/-/g, ''));
				console.log(idcard_num, now_num);
				if(now_num-650000 > idcard_num){ 
					MessageBox('提示',"对不起，该员工年龄超过了65周岁的投保年龄界限")
					obj.checked = 1;
					return false;
				}
				if(now_num-160000 < idcard_num){
					MessageBox('提示',"对不起，该员工年龄未满16周岁的投保年龄界限")
					obj.checked = 1;
					return false;
				}
                obj.checked = 2; // 身份证验证通过
            },
        },
        created(){
            this.orderId = this.$route.query.orderId;
            console.log(this.$store.state.token)
            var html = document.documentElement;
            var windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / 7.5 + 'px';
            html.style.height = '100%';
            document.getElementsByTagName('body')[0].style.height = '100%';
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

            ygbOrderInfo(this.$route.query.orderId).then(res=>{
                if(res.err_code == 0 && res.order.status == 8){
                    MessageBox('提示', '您的保单已经过期，不可以进行加人/换人操作！请重新投保员工保！如有疑问，请拨打我们的客服服务热线 40080-59680')
                    this.$router.go(-1)
                }
            }).catch((err)=>{ console.log("ygbOrderInfo",err) })
        },
    }
</script>

<style lang='scss' scoped>
@import '../css/common';
@import '../css/ygbOrders';
@import '../css/ygbOrderDetails';
</style>