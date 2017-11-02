<template>
<div>
    <header class="header">
        <div class="h_top" style="text-align:center;">
            <router-link class="go_back" to="/setAddress"><span><img style="float:left;" src="../img/back.png"></span></router-link>添加新地址
            <input type="button" @click="addAddress()" value="保存" style="float:right; margin-top: 0.8rem; color: #fff;">
        </div>
    </header>
    <!--artic-->
    <article class="artic" style="padding-top: 7vh;background:#ededed;">
        <div class="weui-cells weui-cells_form" style="margin-top: 0;">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">收件人</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input placeholder" type="text" placeholder="请输入" v-model.trim="receiverAdd">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">联系电话</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input placeholder" type="number" placeholder="请输入" v-model.trim="phoneAdd">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                <div class="weui-cell__bd">
                    <div class="weui-cell" @click="addressPicker">
                        {{addressPro + addressCity + addressDis}}<span v-if="!addressPro" style="color: #666;">请选择省市区</span>
                    </div>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="请输入详细地址" rows="3"  v-model.trim="addressDetailAdd"></textarea>
                    <div class="weui-textarea-counter"><span>{{addressDetailLength}}</span>/100</div>
                </div>
            </div>
        </div>
    </article>
</div>
</template>

<script>
import {cmnUseraddressAdd} from '../libs/api'
import {Toast} from 'mint-ui';
import  'weui';
import weui from 'weui.js';
import dataList from '../libs/cityData';
export default {
    data(){
        return {
            receiverAdd: '', // 收件人
            phoneAdd: '',   // 联系电话
            addressPro: '', // 省
            addressCity: '', // 市
            addressDis: '', // 区
            addressDetailAdd: '', // 详细地址
        }
    },
    computed:{
      addressDetailLength(){  //详细地址长度
          if(this.addressDetailAdd.length>100){
            Toast('详细地址不能超过100个字！');
            this.addressDetailAdd = this.addressDetailAdd.substring(0,100);
            this.isDisable = true;
          }
          return this.addressDetailAdd.length
      }
    },
    methods: {
        addressPicker(){
          var vm = this;
          weui.picker(
            dataList,
            {
              className: 'addressAdd', // 可选
              showDistrict:true,
              defaultValue: ["北京", "北京市", "东城区"],
              onChange: function (result) {
//                console.log(result)  // 可选
              },
              onConfirm: function (result) {
                vm.addressPro = result[0].label;
                vm.addressCity = result[1].label;
                vm.addressDis = result[2].label;
              },
              id: 'addressAdd',  // 可选
            }
          )
        },
        //添加地址
        addAddress(){
            let _this = this;
            if(!this.receiverAdd){
                Toast('请输入收件人！');
                return false;
            }else if(!this.phoneAdd){
                Toast('请输入手机号！');
                return false;
            }else if(!this.$store.state.reg_phone.test(this.phoneAdd)){
                Toast('请输入正确手机号！');
                return false;
            }else if(!this.addressDis){
                Toast('请输入省市区地址！');
                return false;
            }else if(!this.addressDetailAdd){
                Toast('请输入详细地址！');
                return false;
            }else {
                let data = {
                    "recipients":_this.receiverAdd,
                    "mobile":_this.phoneAdd,
                    'province':_this.addressPro,
                    'city':_this.addressCity,
                    'district':_this.addressDis,
                    'street':_this.addressDetailAdd
                }
                cmnUseraddressAdd(data).then((res)=>{
                    if(res.err_code == 0){
                        Toast("添加收货地址成功！");
                        this.$router.push("setAddress");
                    }else{
                        console.log("其它错误:",res);
                    }
                }).catch((err)=>{ console.log("cmnUseraddressAdd",err)} )
            }
        },
    },
    created(){
        this.$store.commit('GETCOOKIE',this.$store.state.jubao_user);
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
@import '../css/common';
@import '../font/iconfont.css';
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
.chcekList p a {color: #000;}
.mm_box {
    height: 7vh;
    background: #0FACF7;
    line-height: 7vh;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
.selects {
    width: 50%;
    float: left;
}
.selects select {
    width: 100%;
    border: 1px solid #eaeaea;
    padding: 8px 0;
}
.weui-input {
    line-height: 1.47058824em;
    display: inline-block;
}

.placeholder::-webkit-input-placeholder { /* WebKit browsers */
        font-size:14px;
}
.placeholder:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    font-size:14px;
}
.placeholder::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-size:14px;
}
.placeholder:-ms-input-placeholder { /* Internet Explorer 10+ */
    font-size:14px;
}


</style>
