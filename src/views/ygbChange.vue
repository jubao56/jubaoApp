<template>
    <div class='ygbChange'>
        <div class='select' v-if='step==1'> 
            <h3 class='driver1'>现场操作人员<i class='icon' :class='show_driver? "icon_show": "icon_hide"' @click='show_driver=!show_driver'></i></h3>
            <div class='table driver' v-show='show_driver'>
                <p class='table_line_change'><span class='table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_sel'>选择</span></p>
                <p class='table_line_change' v-for="(driver, index) in driver_list"><span class='table_name'>{{driver.name}}</span><span class='table_idcard'>{{driver.idcard}}</span><span class='table_sel' @click="driver.selected = !driver.selected"><button class='sel_button'  :class="driver.selected?active:''"></button></span></p>
            </div>
            <h3 class='clerk1'>非现场操作人员<i class='icon' :class='show_clerk? "icon_show": "icon_hide"' @click='show_clerk=!show_clerk'></i></h3>
            <div class='table clerk' v-show='show_clerk'>
                <p class='table_line_change'><span class='table_name'>姓名</span><span class='table_idcard'>身份证号</span><span class='table_sel'>选择</span></p>
                <p class='table_line_change' v-for="(clerk, index) in clerk_list"><span class='table_name' >{{clerk.name}}</span><span class='table_idcard'>{{clerk.idcard}}</span><span class='table_sel' @click='clerk.selected = !clerk.selected'><button class='sel_button' :class="clerk.selected?active:''"></button></span></p>
            </div>
        </div>
        <div v-if='step==2'>
            <h3 class='driver'>现场操作人员</h3>
            <div class='confirm'>
                <div class='out table'>
                    <p class='table_line_change'><span class='out_name'>换出人姓名</span><span class='out_idcard'>换出人身份证号</span></p>
                    <p class='table_line_change' v-for="(driver, index) in driver_list_out"><span class='out_name'>{{driver.name}}</span><span class='out_idcard'>{{driver.idcard}}</span></p>
                </div>
                <div class='in table'>
                    <p class='table_line_change'><span class='in_name'>换入人姓名</span><span class='in_idcard'>换入人身份证号</span><span class='handle' @click="add_people('driver_list_in',1)"><button class='add sel_button'>新增</button></span></p>
                    <p class='table_line_change' v-for="(driver, index) in driver_list_in"><span class='in_name'><input type='text' v-model.trim='driver.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='driver.idcard' class='input input_idcard' @blur='check_idcard(driver)' :class="driver.checked==1?'checked_false': ''"></span><span class='handle' @click='driver_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
                </div>
            </div>

             <h3 class='driver'>非现场操作人员</h3>
            <div class='confirm'>
                <div class='out table'>
                    <p class='table_line_change'><span class='out_name'>换出人姓名</span><span class='out_idcard'>换出人身份证号</span></p>
                    <p class='table_line_change' v-for="(clerk, index) in clerk_list_out"><span class='out_name'>{{clerk.name}}</span><span class='out_idcard'>{{clerk.idcard}}</span></p>
                </div>
                <div class='in table'>
                    <p class='table_line_change'><span class='in_name'>换入人姓名</span><span class='in_idcard'>换入人身份证号</span><span class='handle' @click="add_people('clerk_list_in',1)"><button class='add sel_button'>新增</button></span></p>
                    <p class='table_line_change' v-for="(clerk, index) in clerk_list_in"><span class='in_name'><input type='text' v-model.trim='clerk.name' class='input input_name'></span><span class='in_idcard'><input type='text' v-model.trim='clerk.idcard' class='input input_idcard' @blur='check_idcard(clerk)' :class="clerk.checked==1?'checked_false': ''"></span><span class='handle' @click='clerk_list_in.splice(index, 1)'><button class='add sel_button'>删除</button></span></p>
                </div>
            </div>
        </div>
        <div class='fullbg' v-if='showConfirm'>
            <div class='yzm'>
            <p>检测到您换入的现场操作人员为 <span>{{driver_list_in.length}}</span> 人，非现场操作人员为 <span>{{clerk_list_in.length}}</span> 人</p>
            
            <div class='get_yzm'><input type='text' v-model='yzm'><button class='yzm_btn' @click='getYZM' :disabled="canClick" :style="disableColor">{{yzm_text}}</button></div>
            <div class='yzm_btn_area'>
                <button @click='showConfirm=false'>返回修改</button><button @click='confirm_send'>确认变更</button>
            </div>
            </div>
        </div>
        <div class='button_area' v-if='step==1'>
            <a href='javascript:;' @click='selected_next'>下一步</a>
        </div>
        <div class='button_area' v-if='step==2'>
            <a  class="button_area_first" @click='confirm_change' style="border-bottom: 5px solid #eaeaea;">确认变更</a>
            <a href='javascript:;' @click='step = 1'>返回修改</a>
        </div>
    </div>
</template>

<script>
    import {Toast, MessageBox, Indicator } from 'mint-ui';
    import { cmnSmsSend,cmnUserInfo,ygbOrderEmployeechange,ygbOrderInfo,ygbOrderEmployeelist } from '../libs/api'
    export default {
        data(){
            return {
                step: 1, //1 代表选择换出人员阶段 2代表信息确认阶段
                active: 'sel_button_active',
                ygbUrl: this.$store.state.ygbUrl,
                cmnUrl: this.$store.state.zcbUrl,
                fileUrl: this.$store.state.fileUrl,
                order: {},
                driver_list: [],
                clerk_list: [],
                driver_list_out: [], //换入的司机清单
                clerk_list_out: [], //换出的文员清单
                out_driver_num: 0, //换出的司机数量
                out_clerk_num: 0, // 换出的文员数量
                driver_list_in: [], // 换入的司机清单
                clerk_list_in: [], //换入的文员清单
                employee_list: [], //最终名单
                mobile: '',//手机号
                yzm_text: '获取验证码',
                showConfirm: false, //显示最后输入验证码页面
                yzm: '', //输入的验证码
                show_driver: true, // 显示司机列表
                show_clerk: true, // 显示文员列表
                canClick:false, //验证码重复点击开关
                disableColor:{}
            }
        },
        methods: {
			getYZM(){
			    let data = {mobile: this.mobile+''};
			    this.canClick = true;
			    this.disableColor = {
                    background:"#ccc"
                }
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
                                this.canClick = false;
                                this.disableColor = {};
                                this.click = false;
                                countdown = '';
                            }
                        }, 1000)
                    }else{
                        this.canClick = false;
                        this.disableColor = {};
                        alert('验证码发送失败，请重新获取')
                    }
                }).catch((err)=>{
			        console.log("cmnSmsSend",err)
                    this.canClick = false;
                    this.disableColor = {};
			    })
			},
            select(){},
			getMobile(){
                cmnUserInfo().then(res=>{
                    if(res.err_code == 0){
                        this.mobile = res.data.mobile;
                    }
                }).catch((err)=>{ console.log("cmnUserInfo",err) })
			},
            confirm_send(){
                Indicator.open();
			    let data = {'order_id': parseInt(this.$route.query.orderId), 'employee_list': this.employee_list, 'sms_code': this.yzm};
                ygbOrderEmployeechange(data).then(res=>{
                    Indicator.close();
                    if(res.err_code == 0) {
                        alert(res.message);
                        this.showConfirm = false;
                        if(this.$route.query.from == 'details') {
                            this.$router.go(-1)
                        }else{
                            this.$router.replace({path: 'ygbOrderDetails', query: {status: 4, orderId: this.orderId}})
                        }
                    }
                    if(res.err_code == 1014) {
                        MessageBox({
                        title: '提示',
                        message: '尊敬的客户：非常抱歉，您的账户暂时无法进行"员工保"的换人操作，建议您选择其他险种，详询聚保服务热线: 40080-59680'
                    })
                        this.showConfirm = false;
                        this.yzm = '';
                    }
                    if(res.err_code == 203){
                        MessageBox('提示','您换入的员工在保单中已存在，不能重复添加，请仔细核对后再重试，如有疑问请致电聚保服务热线: 40080-59680')
                        this.showConfirm = false;
                        this.yzm = '';
                    }
                    if(res.err_code == 2) alert('BadParameter 参数错误')
                    if(res.err_code == 1006) {
                        MessageBox('提示','验证码错误或过期,请重新输入正确的手机验证码')
                        this.yzm = '';
                    }
                    if(res.err_code == 1103) alert('RecordNotFound 参数错误')
                }).catch((err)=>{ console.log("ygbOrderEmployeechange",err) })
            },
            confirm_change(){
                //this.showConfirm = true;
                if(!this.mobile) this.getMobile();
                this.employee_list = [];
                if(this.driver_list_in.length < this.driver_list_out.length) {
                    MessageBox('提示', '您换入的现场操作人员少于换出人员');
                    return false;
                }else {
                    this.driver_list_in.forEach((ele, index) => {
                        if(ele.name != '' && ele.checked == 2){
                            var item ={};
                            Object.assign(item, ele);
                            item.id = this.driver_list_out[index].id;
                            this.employee_list.push(item);
                            delete this.employee_list[index].checked;
                        }else {
                            MessageBox('提示', '您换入的第 '+ (index + 1) + ' 个现场操作人员信息不正确')
                            return false;
                        }
                    })
                }
                if(this.clerk_list_in.length < this.clerk_list_out.length){
                    MessageBox('提示', '您换入的非现场操作人员少于换出人员');
                    return false;
                }else {
                    this.clerk_list_in.forEach((ele, index) => {
                        if(ele.name != '' && ele.checked == 2){

                            var item ={};
                            Object.assign(item,ele);
                            item.id = this.clerk_list_out[index].id;
                            this.employee_list.push(item);
                            delete this.employee_list[this.driver_list_in.length + index].checked;
                        }else {
                            MessageBox('提示', '您换入的第 '+ (index + 1) + ' 个非现场操作人员信息不正确');
                            return false;
                        }
                    })
                }
                // this.driver_list_out.forEach((ele, index) => {
                //     var item = {};
                //     item.id = ele.id*1;
                //     item.idcard = ele.idcard;
                //     item.type = ele.type*1;
                //     item.name = ele.name;
                //     this.employee_list.push(item)
                // })
                // this.clerk_list_out.forEach((ele, index) => {
                //     var item = {};
                //     item.id = ele.id*1;
                //     item.idcard = ele.idcard;
                //     item.type = ele.type*1;
                //     item.name = ele.name;
                //     this.employee_list.push(item)   
                // })
                // this.employee_list.map((ele, index) => {
                //     ele = JSON.stringify(ele);
                // })
                console.log(this.employee_list)
                if(this.employee_list.length>0){
                    this.showConfirm = true;
                }
            },
            selected_next(){
                this.driver_list_out = [];
                this.clerk_list_out = [];
                this.driver_list.forEach((ele, index) => {

                    if(ele.selected) {
                        this.driver_list_out.push(ele)
                        this.driver_list_in.push({
                            "name":'',
                            "idcard":'',
                            "type":1,
                            'id': 0,
                            'checked': 0, //0代表初始未填入状态, 1代表身份证检查未通过，2 代表通过。
                        })
                    }
                    this.out_driver_num = this.driver_list_out.length;
                    //this.driver_list_in.splice(this.out_driver_num, 10000)
                })
                this.driver_list_in.splice(this.out_driver_num, 10000)
                 this.clerk_list.forEach((ele, index) => {
                    if(ele.selected) {
                        this.clerk_list_out.push(ele)
                        this.clerk_list_in.push({
                            "name":'',
                            "idcard":'',
                            "type":2,
                            'id': 0,
                            'checked': 0,
                        })                        
                    }
                    this.out_clerk_num = this.clerk_list_out.length;
                    // this.clerk_list_in.splice(this.out_clerk_num, 10000)
                })
                this.clerk_list_in.splice(this.out_clerk_num, 10000)
                if(this.out_driver_num == 0 && this.out_clerk_num == 0){
                    MessageBox('提示', '请选择您要换出的人员！');
                    return false;
                }
                this.step = 2;
            },
            add_people(list,type){
                if(this[list.replace('in', 'out')].length == this[list].length){
                        MessageBox('提示', '您最多可以换入的人员数是 ' + this[list].length + ' 人！');
                        return ;
                }
                this[list].push({
                    'name': '',
                    'idcard': '',
                    'type': type,
                    'id': 0, 
                    'checked': 0, 
                })
            },
            check_idcard(obj){
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
            }
        },
        created(){
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
            this.orderId = this.$route.query.orderId;
            ygbOrderInfo(this.orderId).then(res=>{
                if(res.err_code == 0){
                    if(res.order.status == 8){
                        MessageBox('提示', '您的保单已经过期，不可以进行加人/换人操作！请重新投保员工保！如有疑问，请拨打我们的客服服务热线 40080-59680')
                        this.$router.go(-1)
                    }
                }
            }).catch((err)=>{ console.log("ygbOrderInfo",err) })

            let params = {order_id: this.$route.query.orderId};
            ygbOrderEmployeelist(params).then(res=>{
                if(res.err_code == 0){
                    res.rows.forEach((ele, index) => {
                        ele.selected = false;
                        if(ele.type == 1 && ele.status == 1) this.driver_list.push(ele);
                        if(ele.type == 2 && ele.status == 1) this.clerk_list.push(ele);
                    })
                }
            }).catch((err)=>{ console.log("ygbOrderEmployeelist",err) })
        },
    }
</script>

<style lang='scss' scoped>
@import '../css/common';
@import '../css/ygbChange';
@import '../css/ygbOrderDetails';
.ygbChange .table_name{width: 2rem;}
.ygbChange .table_idcard{width: 4rem;}
</style>