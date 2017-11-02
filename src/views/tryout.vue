<template>
    <div>
        <header class="header">
            <div class="h_top">
<!--                 <router-link class="go_back" to="/"><span>
                <img src="../img/back.png"></span>投保页面</router-link> -->
                <a class="go_back" href="javascript:void(0);" @click="back()"><span>
                <img src="../img/back.png"></span>投保页面</a>
            </div>
        </header>


        <article class="artic">
            <div class="main">
                <div class="baofei baofei2">
                    <div class="tj_con1">
                        <div class="b_con">
                            <div :class="status==0?'part1':''">
                                <div class="b_list">
                                    <div class="b_left">投保人</div>
                                    <div class="b_right">
                                        <p>{{policyholder}}</p>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="b_list">
                                    <div class="b_left">被保险人</div>
                                    <div class="b_right">
                                        <p>{{beneficiary}}</p>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="b_list">
                                    <div class="b_left">运输路线</div>
                                    <div class="b_right">
                                        <div class="selects">
                                            <select class="sel_1" id="begin_province_sel"
                                                    v-model="startProvince">
                                                <option v-for="(val,idx) in dataListStart"
                                                        :value="val.value"
                                                >
                                                    {{val.label}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="selects">
                                            <select class="sel_1" id="begin_city_sel"
                                                    v-model="startCity">
                                                <option v-for="(val,idx) in citys_start"
                                                        :value="val.value"
                                                        :selected="idx == 0 ?true:false"
                                                >
                                                    {{val.label}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="b_list">
                                    <div class="b_left">至</div>
                                    <div class="b_right">
                                        <div class="selects">
                                            <select class="sel_1" id="end_province_sel"
                                                    v-model="endProvince">
                                                <option v-for="(val,idx) in dataListEnd" :value="val.value">
                                                    {{val.label}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="selects">
                                            <select class="sel_1" id="end_city_sel"
                                                    v-model="endCity">
                                                <option v-for="(val,idx) in citys_end"
                                                        :value="val.value" :selected="idx==0?true:false"
                                                >
                                                    {{val.label}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="b_list">
                                    <div class="b_left">里程</div>
                                    <div class="b_right">
                                        <strong class="blue" id="distance" :class="'distanceClass'+countDistance"> {{distanceFlag}}</strong>公里
                                    </div>
                                    <div id="container" style="display:none;"></div>
                                    <div class="clear"></div>
                                </div>
                                <div class="b_list">
                                    <div class="b_left">赔偿限额</div>
                                    <div class="b_right check_bg clearfix">

                                        <label>
                                            <input value="1500000" type="radio" v-model="coverage">
                                            <span :class="coverage==1500000?'on':''"></span><strong>150万</strong>
                                        </label>
                                        <label>
                                            <input value="500000" type="radio" v-model="coverage">
                                            <span :class="coverage==500000?'on':''"></span><strong>50万</strong>
                                        </label>

                                        <div class="clear"></div>
                                    </div>
                                </div>
                                <div class="b_list">
                                    <div class="b_left">保费金额</div>
                                    <div class="b_right">
                                        <strong class="yellow" id="price">{{coverageFlag}}</strong>
                                        <span style="color:#ff7300;" id="price_rate"></span>
                                    </div>
                                    <div class="clear"></div>
                                </div>

                                <div class="b_list">
                                    <div class="b_right" style="width:50%">
                                        <a href="javascript:void(0);" id="no_ins_link" style="color:red" @click="showNoproMsg"> 查看不保货物品类详情</a>
                                    </div>
                                    <div class="clear"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="car_num">
                        <div class="b_list">
                            <div class="b_left">车牌号</div>
                            <div class="b_right">
                                <div class="text_box"><span>头</span><input id="goods_num1" type="text" v-model.trim="carNumT"
                                                                           @blur="carNumJudgeT" placeholder="必填"></div>
                                <span class="regExp" v-show="carShowFlagT">
                                    <!--<i :class="carColorFlagT?'carNumTipRight el-icon-circle-check':'carNumTipError el-icon-circle-close'"-->
                                    <!--&gt;</i>-->
                                    <span :class="carColorFlagT?'carNumTipRight ':'carNumTipError '">
                                        {{carNumTText}}
                                    </span>
                                </span>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="b_list">
                            <div class="b_left"></div>
                            <div class="b_right">
                                <div class="text_box"><span>挂</span><input id="goods_num2" v-model.trim="carNumG"
                                                                           @blur="carNumJudgeG" placeholder="选填"></div>
                                <!--<span class="regExp" v-show="carShowFlagG">-->
                                    <!--&lt;!&ndash;<i :class="carColorFlagG?'carNumTipRight el-icon-circle-check':'carNumTipError el-icon-circle-close'"></i>&ndash;&gt;-->
                                    <!--<span :class="carColorFlagG?'carNumTipRight ':'carNumTipError '">-->
                                        <!--{{carNumGText}}-->
                                    <!--</span>-->
                                <!--</span>-->
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="tj_box">
                        <div class="tj_title">
                            <input type="hidden" value="1" id="file_type" name="file_type">
                            <a :class="addStatus?'zhao fl':'yun fl'" href="javascript:void(0);" id="add_detail"
                               @click="handImport">手工添加装车清单</a>
                            <a :class="addStatus?'yun fr':'zhao fr'" href="javascript:void(0);" id="add_photo"
                               @click="postFile">上传装车清单照片</a>
                            <div class="clear"></div>
                        </div>
                        <div class="tj_content">

                            <div class="tj_con" id="con_detail" v-show="addStatus">
                                <div class="list" v-for="(list,index) in orderLists">
                                    <div class="b_list">
                                        <div class="b_left">运单号</div>
                                        <div class="b_right">
                                            <input name="txt_number" type="text" v-model.trim="list.track_no">
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="b_list">
                                        <div class="b_left">始发地</div>
                                        <div class="b_right">
                                            <input name="txt_startaddress" type="text" v-model.trim="list.beginning">
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="b_list">
                                        <div class="b_left">目的地</div>
                                        <div class="b_right">

                                            <input name="txt_endaddress" type="text" v-model.trim="list.destination">

                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="b_list">
                                        <div class="b_left">货物名称</div>
                                        <div class="b_right">
                                            <input name="txt_type" type="text" v-model.trim="list.name">
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="b_list">
                                        <div class="b_left">货物数量</div>
                                        <div class="b_right">
                                            <input name="txt_count" placeholder="数值只能保留两位小数" type="text" v-model.trim="list.quantity">
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="b_list">
                                        <div class="b_left">计量单位</div>
                                        <div class="b_right">
                                            <input name="txt_unit" type="text" v-model.trim="list.unit">
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="b_list" style="display:none;">
                                        <div class="b_left">Id</div>
                                        <div class="b_right">
                                            <input name="txt_unid" type="text" value="">
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="clearfix">
                                        <a class="delete emptied" style="width: 48%;margin-right: 2%; float: left;"
                                           href="javascript:void(0);" @click="clear(index)">清空</a>
                                        <a class="delete detail" style="width: 48%;margin-right: 2%; float:right;"
                                           href="javascript:void(0);" @click="del(index)">删除</a>
                                    </div>

                                    <div class="clear"></div>
                                </div>

                                <div class="but" id="but">
                                    <a class="tianjia" href="javascript:void(0);" @click="add">+继续添加</a>
                                    <a class="save" href="javascript:void(0);" @click="sub">下一步</a>
                                </div>

                            </div>

                            <div class="tj_con photo" id="pic" v-show="!addStatus">
                                <div class="pic list">
                                    <div class="photo">
                                        <div class="weui-cell" id="uploadSelect">
                                            <div class="weui-cell__bd">
                                                <div class="weui-uploader">
                                                    <div class="weui-uploader__hd">
                                                        <p class="weui-uploader__title">图片上传</p>
                                                    </div>
                                                    <div class="weui-uploader__bd" id="uploader">
                                                        <ul class="weui-uploader__files" id="uploaderFiles">
                                                                <li class="weui-uploader__file" :style="'background-image:url('+val.file_url+')'"
                                                                    :data-id="idx"   v-for="(val,idx) in fileShowList" v-if="showFlag"
                                                                    @click="editor(val.file_url,idx)"
                                                                >
                                                                </li>

                                                        </ul>

                                                      <!--app=======-->
                                                      <div class="weui-uploader__input-box" @click="appendByGallery">

                                                      </div>
                                                      <div class="weui-uploader__camera-box" @click="appendByCamera">

                                                      </div>
                                                      <!--=======app-->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <ul id="filelist" style="float:left;width:100%;">

                                        </ul>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="but clearfix" id="but2">


                                    <a style="width: 100%" class="save fr" href="javascript:void(0);"
                                       @click="sub">下一步</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="hidden" id="flag_up" value="-1">
            </div>
        </article>
        <div style="display: none;" class="weui_dialog_alert">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd">
                    <strong class="weui-dialog__title">主要不保内容</strong>
                </div>
                <div style="height: 22rem; overflow-y: scroll;text-align: left;color:black;" class="weui-dialog__bd">
                    <h3>1、下列物流货物不论投保人是否有向保险人申报，对于发生损失后依法应由被保险人承担赔偿责任的，保险人均不负责赔偿。</h3>
                    <p>（1）金银、珠宝、钻石、玉器、贵重金属；</p>
                    <p>（2）古玩、古币、古书、古画、艺术作品、雕塑、邮票；</p>
                    <p>（3）旧品、二手品、展览后之展品和陈列品等无法确定其价值的货品；</p>
                    <p>（4）枪支弹药、爆炸物品；</p>
                    <p>（5）现钞、有价证券、票据、文件、档案、帐册、图纸、技术资料、信用证、护照；</p>
                    <p>（6）需冷藏或恒温运输的货物；</p>
                    <p>
                        （7）蔬菜、水果、活牲畜、禽鱼类和其他动物。易腐品、易蛀品、农产品，如果仁、花生、玉米、豆类、大小麦、豆粕、鱼粉、菜籽饼、地瓜干、木薯干、肉类、蛋类、蔬菜、水果类等；易变质品、活品，如海鲜、动植物等；</p>
                    <p>（8）易燃易爆及危险品（参照GB12268-2005《危险货物品名表》）；</p>
                    <p>（9）危险品，化工品如硫酸、水泥等；</p>
                    <p>（10）军火、军品；</p>
                    <p>（11）原木、原棉、天然橡胶等；</p>
                    <p>（12）汽车，船舶；</p>
                    <p>（13）无任何包装且无法确定单件价值的大宗货物，如煤炭、矿石/砂、沥青、焦油、水泥等；</p>
                    <p>
                        （14）重大件机械设备（任何机机械设备如果满足以下条件之一，应视为重大件机械设备：任一部件由于体积或重量的原因必须由特殊运输工具运输；任一部件包括包装不能放进40英尺标准集装箱或公路平板车，即超过12米长、2.5米宽或2.5米高；任一部件包括包装超过50吨重；任一部件由于本身的特性必须特殊处理，如要求特殊的绑扎固定及保持重心的平衡）；</p>
                    <h3> 2、在任何情况下，保险人不对被保险人承运的“不予承保货物”、不具承运资质的标的货物的损失进行认定和赔付。</h3>
                    <h3>
                        3、在任何情况下，保险人不对被保险人在本保单项下申报的物流货物在本次保单生效前发生的损失事故进行认定和赔付。且保险人保留投保人/被保险人因发生货物损失事故后，故意向保险人投保以骗取保险金的行为的有关法律权利。</h3>
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
                </div>
            </div>
        </div>

        <!--主要不保提示-->
        <div style="" class="weui_dialog_alert" v-show="noProtect">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd">
                    <strong class="weui-dialog__title">主要不保内容</strong>
                </div>
                <div style="height: 22rem; overflow-y: scroll;text-align: left;color:black;" class="weui-dialog__bd">
                    <h3>1、下列物流货物不论投保人是否有向保险人申报，对于发生损失后依法应由被保险人承担赔偿责任的，保险人均不负责赔偿。</h3>
                    <p>（1）金银、珠宝、钻石、玉器、贵重金属；</p>
                    <p>（2）古玩、古币、古书、古画、艺术作品、雕塑、邮票；</p>
                    <p>（3）旧品、二手品、展览后之展品和陈列品等无法确定其价值的货品；</p>
                    <p>（4）枪支弹药、爆炸物品；</p>
                    <p>（5）现钞、有价证券、票据、文件、档案、帐册、图纸、技术资料、信用证、护照；</p>
                    <p>（6）需冷藏或恒温运输的货物；</p>
                    <p>（7）蔬菜、水果、活牲畜、禽鱼类和其他动物。易腐品、易蛀品、农产品，如果仁、花生、玉米、豆类、大小麦、豆粕、鱼粉、菜籽饼、地瓜干、木薯干、肉类、蛋类、蔬菜、水果类等；易变质品、活品，如海鲜、动植物等；</p>
                    <p>（8）易燃易爆及危险品（参照GB12268-2005《危险货物品名表》）；</p>
                    <p>（9）危险品，化工品如硫酸、水泥等；</p>
                    <p>（10）军火、军品；</p>
                    <p>（11）原木、原棉、天然橡胶等；</p>
                    <p>（12）汽车，船舶；</p>
                    <p>（13）无任何包装且无法确定单件价值的大宗货物，如煤炭、矿石/砂、沥青、焦油、水泥等；</p>
                    <p>（14）重大件机械设备（任何机机械设备如果满足以下条件之一，应视为重大件机械设备：任一部件由于体积或重量的原因必须由特殊运输工具运输；任一部件包括包装不能放进40英尺标准集装箱或公路平板车，即超过12米长、2.5米宽或2.5米高；任一部件包括包装超过50吨重；任一部件由于本身的特性必须特殊处理，如要求特殊的绑扎固定及保持重心的平衡）；</p>
                    <h3> 2、在任何情况下，保险人不对被保险人承运的“不予承保货物”、不具承运资质的标的货物的损失进行认定和赔付。</h3>
                    <h3>3、在任何情况下，保险人不对被保险人在本保单项下申报的物流货物在本次保单生效前发生的损失事故进行认定和赔付。且保险人保留投保人/被保险人因发生货物损失事故后，故意向保险人投保以骗取保险金的行为的有关法律权利。</h3>
                </div>
                <div class="weui-dialog__ft" @click="protectClose">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from "vuex"
    import { MessageBox,Indicator,Toast } from 'mint-ui';
    import "weui";
    import weui from 'weui.js';
    import {cmnUserInfo,zcbUserInfo,zcbOrderList,zcbOrderPrice,zcbOrderSave,zcbOrderTrySave,zcbOrderTryInfo,zcbOrderInfo} from '../libs/api';

    export default {
        data(){
            return {
                //=======================状态信息=======================
                listId: "",      //订单ID
                status: "",      //判断是否为试用单  试用 0 ；正式 1 ；
                //货物列表和整车保清单
                fileMsg: "",     //上传装车清单显示的字样
                noProtect:true,
                //=======================整车保计算器=======================
                policyholder: "某某公司",      //投保人
                beneficiary: "某某公司",     //被保险人
                startCity: "未选择",  //出发城市
                endCity: "未选择",  //到达城市
                coverage: '1500000',
                coverageFlag: "--",
                distanceFlag: "--",        //显示运输距离-用计算属性完成

                dataListStart: this.$store.getters.dataList,    //出发--省市联动数据源
                startProvince: this.$store.getters.dataList[0].value,  //出发省份
                citysAllStart: "",      //出发--随省份而变化的城市集合
                dataListEnd: this.$store.getters.dataList,    //到达--省市联动数据源
                endProvince: this.$store.getters.dataList[0].value,  //到达省份
                citysAllEnd: "",      //到达--随省份而变化的城市集合

                //=======================车牌号=======================
                carNumT: "",  //车牌号码【头】
                carNumG: "", //车牌号码【挂】

                carShowFlagT: false,  //提示信息一开始不显示
                carColorFlagT: false,     //显示正确与否对应的颜色
                carNumTText: "",  //正确与否对应的提示文字

                carShowFlagG: false,
                carColorFlagG: false,
                carNumGText: "",

                //=======================手动/上传装车清单=======================
                addStatus: false,     //false 切换状态，默认为false
                orderLists: [
                    {track_no: "",name: "",quantity: "",beginning: "",destination: "",unit: ""}
                ],   //货物清单
                fileList: [],    //装车清单
                fileShowList:[],    //初始化时显示的装车清单
                showFlag:false,    //控制是否显示已经有的图片
                //======手工清单======
                cityChangeFlag1:false,
                cityChangeFlag2:false,
                //=====运单数量正则====
                carListNumReq: /^[0-9]*$/,
                hasOrderId: '', // 从个人中心待付款订单进入时获取订单ID
                uploadCount:0,
                btnFlag:true,
                timeFlag:true,
                ispayConfirm: false, // 判断是否是从投保确认页返回
              //app start====================
              //上传文件
              uploadFiles:[],
              //相册预览功能
              gallery:false,
              galleryImg:"",
              idx:0,  //要删除的idx
              //=======================app end
            }
        },
        computed: {
            ...mapState(["token"]),
            //======================整车保计算器======================
            citys_start: function () {    //出发 ---- 随省份变化而变化的城市集合
                var that = this;
                this.citysAllStart = this.dataListStart.filter(function (item) {
                    return item.value == that.startProvince;
                })[0].children;
                if(!this.cityChangeFlag1){
                    this.startCity=this.citysAllStart[0].value;
                }
                this.cityChangeFlag1=false;
                return this.citysAllStart
            },
            citys_end: function () {  //到达 ---- 随省份变化而变化的城市集合
                var that = this;
                this.citysAllEnd = this.dataListEnd.filter(function (item) {
                    return item.value == that.endProvince;
                })[0].children;
                if(!this.cityChangeFlag2){
                    this.endCity=this.citysAllEnd[0].value;
                }
                this.cityChangeFlag2=false;
                return this.citysAllEnd
            },
            countDistance: function () {
                if (this.startProvince == "未选择" || this.startCity == "未选择" ||
                    this.endProvince == "未选择" || this.endCity == "未选择"
                ) {
                    this.distanceFlag = "--";
                } else {
                    zcbOrderPrice({
                        start_province: this.startProvince,
                        start_city: this.startCity,
                        end_province: this.endProvince,
                        end_city: this.endCity,
                        coverage: this.coverage * 1
                    }).then((res)=>{
                        if (res.err_code == 0) {
                            this.distanceFlag = res.data.distance;
                            this.coverageFlag = res.data.price / 100;
                        } else if (res.err_code == 1103) {
                            this.distanceFlag = "--";
                            this.coverageFlag = "--"
//                            alert("记录未找到")
                        } else {
                            alert("未知错误")
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            },
            //======================车牌号码======================
            carNumAllFlag(){  //监听车牌号码是否符合要求 ----
                //为true的情况：T显示且为ture；G不显示；G显示且color为true；
                if (this.carColorFlagT && (!this.carShowFlagG || this.carShowFlagG && this.carColorFlagG)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            ...mapMutations({
                removeFs:'REMOVEFS'
            }),
          //app start=============================
          //上传功能==========================================================
          appendByCamera(){
            let _this=this;
            let plus = window.plus;
            window.plus.camera.getCamera().captureImage(function(p){
              plus.gallery.save( p);//相册生成图片
              _this.appendFile(p);
            });
          },
          appendByGallery(){//相册选取
            let _this=this;
            let plus = window.plus;
            window.plus.gallery.pick(function(p){
              _this.appendFile(p);
            });
          },
          appendFile(p){
            let name = p.substr(p.lastIndexOf('/')+1);
            let imgPath =  window.plus.io.convertLocalFileSystemURL(p);// 将本地URL路径转换成平台绝对路径
            this.uploadFiles.push({name:name,path:p});
            function getUid(){
              return Math.floor(Math.random()*100000000+10000000).toString();
            }
            let uid=getUid();
            this.upload({name:name,file_url:imgPath,uid:uid})

          },
          upload(obj){
            // 产生一个随机数
            let _this=this;
            function getUid(){
              return Math.floor(Math.random()*100000000+10000000).toString();
            }

            let plus=window.plus;
            if(this.uploadFiles.length<=0){
              plus.nativeUI.alert("没有添加上传文件！");
              return;
            }
            Indicator.open({
              text: '上传中...',
              spinnerType: 'fading-circle'
            });

            let task=plus.uploader.createUpload(this.$store.state.fileUrl+"/res/file/upload",
              {method:"POST"},
              function(t,status){ //上传完成
                if(status==200){
                  let res = JSON.parse(t.responseText);
                  let tempName = (res.data.substring(res.data.lastIndexOf("/")+1)).replace(/ /g,"%20").replace(/\(/g,"%28").replace(/\)/g,"%29");
                  obj.file_url = res.data.substring(0,res.data.lastIndexOf("/")+1)+tempName;
//                            console.log(obj.file_url,"上传文件的地址");
                  _this.fileShowList.push(obj);//页面预览
                  Indicator.close();
                  Toast({
                    message: '上传成功',
                    iconClass: 'iconfont icon-success',
                    duration: 1000
                  });
                }else{
                  alert("上传失败")
                }
              }
            );
            task.addData("uid",getUid());
            for(var i=0;i<this.uploadFiles.length;i++){
              var f=this.uploadFiles[i];
              task.addFile(f.path,{key:"fileVal"});
            }
            task.start();
          },
          editor(file_url,idx){
            window.plus.navigator.setStatusBarBackground('#000000');
            this.gallery=true;
            this.galleryImg=file_url;
            this.idx=idx;
            // Android处理返回键
            window.plus.key.removeEventListener('backbutton',backBtn,false);
            window.plus.key.addEventListener('backbutton',this.hideModel,false);
          },
          hideModel(){
            this.gallery=false;
          },
          galleryHide(){
            window.plus.key.removeEventListener('backbutton',this.hideModel,false);
            window.plus.key.addEventListener('backbutton',backBtn,false);
            this.gallery=false;
            window.plus.navigator.setStatusBarBackground('#455468');
          },
          galleryDelete(){
            let _this=this;
            MessageBox.confirm('确定删除该图片?').then(action => {
              window.plus.key.removeEventListener('backbutton',_this.hideModel,false);
              window.plus.key.addEventListener('backbutton',backBtn,false);
              _this.fileShowList.splice(_this.idx,1);
              _this.gallery=false;
              window.plus.navigator.setStatusBarBackground('#455468');
            },action => {
              window.plus.key.removeEventListener('backbutton',_this.hideModel,false);
              window.plus.key.addEventListener('backbutton',backBtn,false);
              _this.gallery=false;
              window.plus.navigator.setStatusBarBackground('#455468');
            });
          },
          //上传功能==========================================================
          //=============================app end
            //========车牌号码判定========
            carNumJudgeT(){   //判定车牌号是否符合要求
                if (!this.carShowFlagT) {
                    this.carShowFlagT = true;
                }

                if (!this.carNumT) {
                    this.carNumTText = "此处不能为空";
                    this.carColorFlagT = false;
                } else if (!this.$store.state.carNumReq.test(this.carNumT)) {
                    this.carNumTText = "格式不正确";
                    this.carColorFlagT = false;
                } else {
                    this.carNumTText = "格式正确";
                    this.carColorFlagT = true;
                }
            },
            carNumJudgeG(){
                //初始：不显示； 为空失焦：不显示；有内容失焦：显示；
                if (!this.carNumG) {
                    this.carShowFlagG = false;
                }
//                else if (!this.$store.state.carNumReq.test(this.carNumG)) {
//                    this.carNumGText = "格式不正确";
//                    this.carShowFlagG = true;
//                    this.carColorFlagG = false;
//                }
                else {
                    this.carNumGText = "格式正确";
                    this.carShowFlagG = true;
                    this.carColorFlagG = true;
                }
            },
            //================手动/上传装车清单================
            showNoproMsg(){
                this.noProtect=true;
            },
            //====模式切换====
            handImport(){
                this.addStatus = true;
            },
            postFile(){
                this.addStatus = false;
            },
            //====手动上传====
            add(){
                this.orderLists.push(
                    {track_no: "",name: "",quantity: "",beginning: "",destination: "",unit: ""}
                )
            },
            clear(idx){
                let obj=this.orderLists[idx];
                obj.track_no="";
                obj.name="";
                obj.quantity="";
                obj.beginning="";
                obj.destination="";
                obj.unit="";
            },
            del(idx){
                if(this.orderLists[1]){
                    this.orderLists.splice(idx,1)
                }
            },
            editor(file_url,idx){
                let _this=this;
                let gallery = weui.gallery(file_url, {
                    className: 'custom-classname',
                    onDelete: function(){
                        MessageBox.confirm('确定删除该图片？').then(
                            action => {
                                _this.fileShowList.splice(idx,1);
                                gallery.hide(function() {
                                    //console.log('`gallery` has been hidden');
                                });
                                --_this.uploadCount
                            },
                            action => {
                                gallery.hide(function() {
                                    //console.log('`gallery` has been hidden');
                                });
                            }
                        );
//                        if(confirm('确定删除该图片？')){
////                            console.log('删除');
//                            _this.fileShowList.splice(idx,1)
//                            //console.log(_this.fileList,'===========_this.fileList====================')
//                        }
                    }
                })
            },
            //====点击下一步====
            sub(){
//                if(!this.timeFlag){
//                    return ;
//                }
//                this.timeFlag=false;
//                setTimeout(()=>{
//                  this.timeFlag=true;
//                },1000);


                if(!this.btnFlag){
                    return ;
                }
                //先判定，再保存
                let tempFlag=false;
                let tempTips="";
                let numReq = /^[0-9]*$/;
                let floatNumReq = /^[0-9]+(\.[0-9]+)?$/;

                function isVoid(obj) { //判断是否全为空;为空返还false；不为空返还true
                        if(obj.track_no=="" && obj.name==""  && obj.quantity=="" && obj.beginning==""
                            && obj.destination=="" && obj.unit==""
                        ){
                            return false;
                        }else{
                            return true;
                        }
                }

                function isRight(list) { //全部填写且符合要求、
                    let flag=false;
                    let tempTips = '';
                    for(let i=0;i<list.length;i++){
                        if(list[i].track_no==""){
                            tempTips = '运单号不能为空！'
                        }else if(list[i].beginning==""){
                            tempTips = '始发地不能为空！'
                        }else if(list[i].destination==""){
                            tempTips = '目的地不能为空！'
                        }else if(list[i].name=="") {
                            tempTips = '货物名称不能为空！'
                        }else if(list[i].quantity==""){
                            tempTips = '货物数量不能为空！'
                        }else if(!floatNumReq.test(list[i].quantity) || list[i].quantity==0){
                            tempTips = '货物数量只能为数字,且不能为零,同时只能保留两位小数！'
                        }else if(!numReq.test(list[i].quantity*100)){
                            Number.prototype.toFixed=function(len)
                            {
                                var add = 0;
                                var s;
                                var s1 = this + "";
                                var start = s1.indexOf(".");
                                if(s1.substr(start+len+1,1)>=5)add=1;
                                var temp = Math.pow(10,len);
                                s = Math.floor(this * temp) + add;
                                return s/temp;
                            }
                            list[i].quantity = (list[i].quantity*1).toFixed(2);
                            flag=true;
                        }else if(list[i].unit==""){
                            tempTips = '计量单位不能为空！'
                        }else{
                            flag=true;
                        }
                    }
                    return {flag,tempTips};
                }

                if(this.startProvince == "未选择" || this.startCity == "未选择" ||
                    this.endProvince == "未选择" || this.endCity == "未选择"){
                    tempTips="请选择本次路线的始发地和目的地！"
                }else if(!this.carNumAllFlag ){
                    tempTips="请正确填写本次运输车辆的车牌号码！"
                }else if(!isVoid(this.orderLists[0]) && !this.fileList.concat(this.fileShowList)[0]){//无装车清单，第一个为空
                    tempTips="请填写装车清单或上传装车清单扫描件"
                } else if(!isRight(this.orderLists).flag && !this.fileList.concat(this.fileShowList)[0]){//无装车清单，同时不符合要求
                    tempTips=isRight(this.orderLists).tempTips;
                }else{
                    tempFlag=true;
                    //将订单信息转化为与后台接口对应的形式
                    let postFile=[];
                    if(this.orderLists.length==1 && !isVoid(this.orderLists[0])){
                        //未填写表单，只有上传文件，则不push
                    }else{
                        for(let i=0;i<this.orderLists.length;i++){
                            let tempObj=this.orderLists[i];
                            let pushObj = {
                                track_no:tempObj.track_no+"",
                                name:tempObj.name+"",
                                quantity:Math.round(tempObj.quantity*100),
                                beginning:tempObj.beginning+"",
                                destination:tempObj.destination+"",
                                unit:tempObj.unit+"",
                            };
                            postFile.push(pushObj)
                        }
                    }

                    let LinkFile = [];
                    for(let i=0;i<this.fileList.length;i++){
                        let tempLink = this.fileList[i];
                        LinkFile.push({
                            name:tempLink.name,
                            file_url:unescape(tempLink.file_url)
                        })
                    }
                    let fileShowList=[];
                    for(let i=0;i<this.fileShowList.length;i++){
                        fileShowList.push({
                            name:this.fileShowList[i].name,
                            file_url:unescape(this.fileShowList[i].file_url)
                        })
                    }


                    let finalyList = postFile.concat(LinkFile).concat(fileShowList);
                    let typeAjax = '';


                    if(this.status==0){//试用
                        typeAjax = zcbOrderTrySave;
                    }else if(this.status==1){//正式
                        typeAjax = zcbOrderSave;
                    }
                    Indicator.open({
                        text: '资料保存中...',
                        spinnerType: 'fading-circle'
                    });
//                    console.log(typeAjax)
                    typeAjax({
                        "id": this.hasOrderId ? Number(this.hasOrderId) : 0,
                        "plate_no": this.carNumT,
                        'plate_extra_no':this.carNumG,
                        "start_province": this.startProvince,
                        "start_city": this.startCity,
                        "end_province": this.endProvince,
                        "end_city": this.endCity,
                        "coverage": this.coverage*1,
                        "cargos":finalyList
                    }).then((res)=>{
                        this.btnFlag=true;
                        Indicator.close();
                        if(res.err_code==0){
                            this.btnFlag=false;
                            this.$router.push("/payConfirm"+'?status='+this.status+ "_"+res.data.id )
                        }else if(res.err_code==1002){
                            MessageBox("提示","您没有操作权限，如有问题请联系聚保服务热线：40080-59680");
                        }else if(res.err_code==1003){
                            MessageBox("提示","产品未录入");
                        }else if(res.err_code==1101){
                            MessageBox("提示","协议未签署");
                        }else if(res.err_code==1108){
                            MessageBox("提示","订单未找到");
                        }else if(res.err_code==1014){
                            MessageBox("提示","尊敬的会员： 非常抱歉，您的账户暂时无法投保整车保，建议您选择其他险种，详询聚保服务热线：40080-59680")
                        }else{
                            MessageBox("提示","未知错误");
                        }
                        if(tempTips){
                            MessageBox({
                                title: '提示',
                                message: tempTips,
                                showCancelButton: false
                            });
                        }
                    }).catch((err)=>{
                        setTimeout(()=>{
                            this.btnFlag=true;
                        },3000);
                        Indicator.close();
                        MessageBox("提示","网络错误");
                        console.log(err)
                    });
                }

                if(tempTips){
                    MessageBox({
                        title: '提示',
                        message: tempTips,
                        showCancelButton: false
                    });
                }
            },
            protectClose(){
                this.noProtect = false;
            },
            getMsgById(listId){
                this.carColorFlagT=true;
                let typeAjax = '';
                if(this.status==0){//试用
                    typeAjax = zcbOrderTryInfo;
                }else if(this.status==1){//正式
                    typeAjax = zcbOrderInfo;
                }
                typeAjax(listId*1).then((res)=>{
                    //=========货物列表和整车保清单渲染====================
                    let tempList = [];  //货物列表
                    let fileList = [];  //整车保清单
                    let tempMsg = res.data;
                    // 如果订单状态为已支付,则不渲染信息
//                    if(res.data.status == 4) {
//                        this.hasOrderId = 0; // data数据
//                        listId = ""; // 函数传过来参数
//                        return;
//                    }
                    for (let i = 0; i < res.data.cargos.length; i++) {
                        let tempObj = res.data.cargos[i];
                        if (!tempObj.file_url) {//为空则放入货物列表，有值则渲染到页面
                            tempList.push({
                                track_no: tempObj.track_no,
                                name: tempObj.name,
                                quantity: tempObj.quantity/100,
                                beginning: tempObj.beginning,
                                destination: tempObj.destination,
                                unit: tempObj.unit,
                                file_url: tempObj.file_url
                            })
                        } else {
                            let tempName = tempObj.file_url.substring(tempObj.file_url.lastIndexOf("/")+1).replace(/ /g,"%20").replace(/\(/g,"%28").replace(/\)/g,"%29");
                            let tempUrl = tempObj.file_url.substring(0,tempObj.file_url.lastIndexOf("/")+1)+tempName;
                            fileList.push({
                                name: tempObj.name,
                                file_url:tempUrl
                            })
                        }
                    }
                    if(!tempList[0]){ //如果没有手动录入清单，则默认加一个
                        tempList.push({track_no: "",name: "",quantity: "",beginning: "",destination: "",unit: ""})
                    }
                    this.orderLists = tempList;
                    //this.fileList = fileList;
                    this.showFlag=true;
                    this.fileShowList=fileList;
                    //=========================
                    if (this.fileList[0]) {
                        this.fileMsg = "继续上传装车清单"
                    } else {
                        this.fileMsg = "上传装车清单"
                    }
                    //===========整车保计算器及车牌号渲染==============
                    this.cityChangeFlag1=true;
                    this.cityChangeFlag2=true;
                    this.policyholder = tempMsg.policyholder;
                    this.beneficiary = tempMsg.policyholder; //此处设置为被保险人就是投保人
                    this.startProvince = tempMsg.start_province;
                    this.startCity = tempMsg.start_city;
                    this.endProvince = tempMsg.end_province;
                    this.endCity = tempMsg.end_city;
                    this.coverage = tempMsg.coverage;
                    this.coverageFlag = tempMsg.price / 100;
                    this.distanceFlag = tempMsg.distance;
                    this.carNumT = tempMsg.plate_no;
                    this.carNumG = tempMsg.plate_extra_no;
                }).catch((err) => {
                    console.log(err)
                });
            },
            back(){
                if(this.ispayConfirm){
                    this.$router.push("dashboard");
                }else{
                    this.$router.go(-1);
                }
            }
        },
        created(){
            this.hasOrderId = this.$route.query.status.split("_")[1];
            this.removeFs();
            let location = window.location.href;
            let beforeStr = location.substring(location.indexOf("?")+1);
            if(beforeStr.indexOf("?")!=-1){
                beforeStr=beforeStr.substring(beforeStr.indexOf("?")+1)
            }
            let locMsgArr = beforeStr.substring(beforeStr.indexOf("?") + 1).split("_");

            this.status = locMsgArr[0].split("=")[1];   //status为0，判断为试用单；status为1判断为正式单
            if (locMsgArr[1]) {
                this.listId = locMsgArr[1];   //赋值订单ID
            }
            //==================status================================
            if (this.status == 1) {  //正式单检查
                //检测渠道
                zcbUserInfo().then((response) => {
                    if(response.err_code==0){
                        if(response.data.disabled){
                            MessageBox('提示','尊敬的会员： 非常抱歉，您的账户暂时无法投保整车保，建议您选择其他险种，详询聚保服务热线：40080-59680');
                            this.$router.go(-1)
                            return;
                        }
                        if(!response.data.signed){
                            MessageBox('提示',"检测到您还没有签署相关协议，请先签署相关协议");
                            this.$router.push("/agreement")
                        }else{
                            if(!response.data.company_name){
                                MessageBox('提示',"请先设置公司名称");
                                this.$router.push("/setCompanyName")
                            }
                            if(response.data.channel_id<=0){
//                                MessageBox('提示',"请先设置服务人员");
                                this.$router.push("/setZcbChannel")
                            }
                        }
                    }else if(response.err_code==1010){
                        MessageBox('提示',"整车保用户不存在，请在【我的】点击【立即投保】录入相关产品渠道信息");
                        this.$router.push("/dashboard")
                    }else if(response.err_code==1002){
                        MessageBox("提示","您没有操作权限，如有问题请联系聚保服务热线：40080-59680");
                        this.$router.go(-1)
                        return;
                    }else if(response.err_code==1014){
                        MessageBox('提示','尊敬的会员： 非常抱歉，您的账户暂时无法投保整车保，建议您选择其他险种，详询聚保服务热线：40080-59680');
                        this.$router.go(-1);
                        return;
                    }else{
                        MessageBox('提示',"数据异常");
                    }
                }).catch((err)=>{
                    console.log(err)
                });
            }

            //===============listId===================================
            if (!this.listId) {//listId 不存在时，如果
                //==========浏览器回退时渲染信息=================
                if (this.status == 1) {//正式投保，不存在listId且是试用单则不用渲染数据
                    //获取投保人，被保险人
                    zcbUserInfo().then((res)=>{
                        this.policyholder = res.data.company_name;
                        this.beneficiary = res.data.company_name; //此处设置为被保险人就是投保人
                    }).catch((err)=>{
                        console.log(err)
                    })
                    //查询用户投保历史，如果有，则默认显示为最近一次投保路线
                    zcbOrderList().then((res)=>{
                        let tempMsg = res.rows[0];
                        if (tempMsg) {    //用户有历史投保记录则自动录入路线，没有则不录
                            this.cityChangeFlag1=true;
                            this.cityChangeFlag2=true;
                            this.startProvince = tempMsg.start_province;
                            this.startCity = tempMsg.start_city;
                            this.endProvince = tempMsg.end_province;
                            this.endCity = tempMsg.end_city;
                            this.coverage = tempMsg.coverage;
                            this.coverageFlag = tempMsg.price / 100;
                            this.distanceFlag = tempMsg.distance;
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            } else {//listId存在，则只通过listId获取信息
                this.getMsgById(this.listId);
            }
           //========
        },
        mounted(){
            //weui 图片上传
            let _this=this;
//            var uploadCount = 0;
            weui.uploader('#uploader', {
                url: this.$store.state.fileUrl+'/res/file/upload',
                auto: true,
                type: 'file',
                fileVal: 'fileVal',
                compress: {
                    width: 1600,
                    height: 1600,
                    quality: .8
                },
                onBeforeQueued: function(files) {
                    // `this` 是轮询到的文件, `files` 是所有文件
                    if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
                        weui.alert('请上传图片');
                        return false; // 阻止文件添加
                    }
                    if(this.size > 10 * 1024 * 1024){
                        weui.alert('请上传不超过10M的图片');
                        return false;
                    }
                    if (files.length > 5) { // 防止一下子选择过多文件
                        weui.alert('一次最多只能上传5张图片，请重新选择');
                        return false;
                    }
                    if (_this.uploadCount + 1 > 15) {
                        weui.alert('最多只能上传15张图片');
                        return false;
                    }

                    ++_this.uploadCount;

                    // return true; // 阻止默认行为，不插入预览图的框架
                },
                onQueued: function(){
//                    console.log("===========onQueued===============")
                },
                onBeforeSend: function(data, headers){
//                    console.log(this, data, headers);
//                    console.log("===========onBeforeSend===============")
//                     $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
                    $.extend(headers,_this.userHeader); // 可以扩展此对象来控制上传头部
                    // return false; // 阻止文件上传
                },
                onProgress: function(procent){
//                    console.log(this, procent);
//                    console.log("===========onProgress===============")
                    // return true; // 阻止默认行为，不使用默认的进度显示
                },
                onSuccess: function (ret) {
//                    console.log("==============onSuccess======================");
//                    console.log(this, ret);//uploaderFiles
                    let index = this.id;
                    _this.fileList.push({
                        name:this.name,file_url:ret.data,file_id:index
                    });
                    let imgEle = $("#uploaderFiles").find("li[data-id="+this.id+"]");
                    imgEle.click(function () {
                            let url = ret.data.replace(/ /g,"%20").replace(/\(/g,"%28").replace(/\)/g,"%29");
                            let gallery = weui.gallery(url, {
                                className: 'custom-classname',
                                onDelete: function(){
                                    MessageBox.confirm('确定删除该图片？').then(
                                        action => {
                                            imgEle.remove();
                                            for(let i=0;i<_this.fileList.length;i++){
                                                if(_this.fileList[i].file_id==index){
                                                    _this.fileList.splice(i,1);break;
                                                }
                                            }
                                            gallery.hide(function() {
                                                //console.log('`gallery` has been hidden');
                                            });
                                            --_this.uploadCount;
                                        },
                                        action => {
                                            console.log(111)
                                            gallery.hide(function() {
                                                //console.log('`gallery` has been hidden');
                                            });
                                        }
                                    );
//                                    if(confirm('确定删除该图片？')){
////                                        console.log('删除');
//                                        imgEle.remove();
//                                        for(let i=0;i<_this.fileList.length;i++){
//                                            if(_this.fileList[i].file_id==index){
//                                                _this.fileList.splice(i,1);break;
//                                            }
//                                        }
//                    //console.log(_this.fileList,'===========_this.fileList====================')
//                                    }

                                }
                            })
                    });

//                    console.log("==============onSuccess======================");
//                     return true; // 阻止默认行为，不使用默认的成功态
                },
                onError: function(err){
//                    console.log(this, err);
//                    console.log("===========onError===============")
                    // return true; // 阻止默认行为，不使用默认的失败态
                }
            });
        },
        destroyed(){
            let objEle = document.querySelector(".weui-gallery");
            if(objEle){
                objEle.parentNode.removeChild(objEle)
            }
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                if(from.path == '/payConfirm') vm.ispayConfirm = true;
            })
        }
    }




</script>

<style lang="scss" scoped>
    @import "../css/tryout";
    @import "../css/common";
    .artic .main .baofei .b_con .b_list .b_right{
        height: auto;
    }
    /*app start*/
    .weui-uploader__camera-box{
      float: left;
      position: relative;
      margin-right: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      border: 1px solid #D9D9D9;
      background: url("../img/appImg/camera.png") no-repeat center center;
      background-size: 61.2px 60px;
    }
    /*app end*/
</style>
