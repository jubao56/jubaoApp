<template>
<div>
    <new-head url="/dashboard" title="公司名称"></new-head>
    <!--artic-->
    <article class="artic" v-if="companyName">
        <div class="password">
		    <div class="mm_box">

		        <div style="height:1.2rem;">
		            <span id="span_suc" style="color:red;padding-left:1.26rem;line-height:2rem;font-size:1.5rem;vertical-align:middle">您已设置公司名称！</span>
		        	<span style="padding-left:1.26rem;line-height:2rem;font-size:1.5rem;vertical-align:middle"><br>公司名称为：{{ companyName }} </span>
				</div>
				<input class="but" @click="$router.push('/dashboard')" type="submit" value="返回个人中心" id="next">

		      <p class="copyright">©聚保平台</p>
		    </div>
	    </div>
	</article>

    <article class="artic" v-else>
        <div class="password">
		    <div class="mm_box">

		        <input class="txt" name="company_name" id="reg_company" type="text" @input="checkCpyName" placeholder="请输入公司全称,否则可能导致保险公司拒赔！" v-model.trim="setCompanyName">

		        <div style="height:1.3rem;" v-show="nameTip">
		        	<span id="span_tip" style="color:red;padding-left:1.26rem;display:block">&nbsp;{{nameTip}}</span>
		        </div>
		        <input class="but" @click="filluserinfo" type="submit" value="提交" id="sub">

		      <p class="copyright">©聚保平台</p>
		    </div>
	    </div>
	</article>

</div>
</template>

<script>
import {cmnUserInfo,cmnCompanyNew,cmnCompanyInfo} from '../libs/api'
import {Toast} from 'mint-ui';
import NewHead from '../components/NewHead.vue'
export default {
     components:{
        "new-head":NewHead,
     },
     data(){
        return {
            companyName: '',
            setCompanyName: '',
            company_id: '',
            nameTip:''
        }
    },
    methods: {
        checkCpyName(){
            if(!this.setCompanyName){
                this.nameTip="请填写公司名称"
                return false
            }else if(!this.$store.state.reg_company.test(this.setCompanyName)){
                this.nameTip="公司名称格式不正确"
                return false
            }else{
                this.nameTip='';
                return true
            }
        },
        filluserinfo(){
            if(this.checkCpyName()){
                let data = { name: this.setCompanyName };
                cmnCompanyNew(data).then((res)=>{
                    if(res.err_code == 0 ){
                        Toast({
                            message: '设置成功',
                            duration: 2000
                        });
                        this.$router.push('/dashboard');
                    }else if(res.err_code == 1002 ){
                        Toast({
                            message: '没有权限',
                            duration: 2000
                        });
                    }else if(res.err_code == 1201 ){
                        Toast({
                            message: '公司已存在，请重新设置',
                            duration: 4000
                        });
                    }
                }).catch((err)=>{ console.log("cmnCompanyNew",err) })
            }
		}
    },
    created(){
        cmnUserInfo().then((res)=>{
            this.company_id = res.data.company_id;
            cmnCompanyInfo(this.company_id).then((res)=>{
                if(res.err_code == 0) {
					this.companyName = res.data.name;
				}
			}).catch((err)=>{ console.log("cmnCompanyNew",err) })
		})
    }
}
</script>

<style lang="scss" scoped>
@import '../css/common';
#span_tip{background:url('../img/L_tips.png') no-repeat left center;}
#span_suc{background:url('../img/success.png') no-repeat left center;}
.header .h_top {line-height: 7vh;color: #fff;font-size: 1.2rem;background: #0FACF7;}
.header .h_top a.go_back { position: absolute;left: 15px;};
</style>
