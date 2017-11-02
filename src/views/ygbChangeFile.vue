<template>
    <div class='changeFile'>
        <div class='tips'>
            <p>员工变更生效时间为您在聚保平台进行变更操作及支付加保险费后的<span>次日0时</span>！</p>
        </div>
        <div class='upload_file'>
            <p>因保险公司风险管控的要求,避免被保险企业错误操作导致的保障纠纷,请对投保人员网络变更予以书面确认请上传加盖公章后的《员工保投保人员变更网络操作确认书》照片:</p>
            <div class='file' v-show='file_url!=""'><img :src='file_url'></div>
            <div class='file'><img src='../img/btn-file.png'><input type='file' @change='upload_file'></div>
        </div>
        <div class='tips_2'>
        <p>注：本操作为单次操作，后续变更无需再行上传</p>
        </div>
        <button @click='submit'>确定</button>
        
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import { resFileUpload,ygbUploadChangefile } from '../libs/api'
    export default {
        data(){
            return {
                file_url: '',
                ygbUrl: this.$store.state.ygbUrl, // 员工保url
                axios: this.$store.state.axios, // axios 请求
                fileUrl: this.$store.state.fileUrl,
                token: '',
            }
        },
        methods: {
            upload_file(e){
                Indicator.open({
                text: '上传中...',
                spinnerType: 'fading-circle'
                });
                var formdata = new FormData();
                formdata.append('fileVal', e.target.files[0])
                resFileUpload(formdata).then(res=>{
                    if(res.err_code == 0){
                        this.file_url = res.data;
                        Indicator.close();
                    }else {
                        alert('上传失败！请重新上传')
                        Indicator.close();
                    }
                }).catch((err)=>{ console.log("resFileUpload",err) })
            },
            submit(){
                if(!this.file_url) {
                    alert('请上传文件！')
                    return false;
                }
                Indicator.open();
                let data = {change_file_url: this.file_url};
                ygbUploadChangefile(data).then(res=>{
                    if(res.err_code == 0 ){
                        Indicator.close();
                        this.$router.replace({path:this.$route.query.path, query: {orderId: this.$route.query.id, from: this.$route.query.from}})
                    }else {
                        alert('网络错误，请稍后重试或者联系客服')
                    }
                }).catch((err)=>{ console.log("ygbUploadChangefile",err) })
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
        },
    }
</script>

<style lang='scss' scoped>
@import '../css/ygbChangeFile';
</style>