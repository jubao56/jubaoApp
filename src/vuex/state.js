/**
 * Created by pc-20170420 on 2017/5/4.
 */
import axios from "axios"
import dataList from "../libs/cities-data" //省市联动数据源
import logo from "../img/logo.png" //logo
import homeKnowMore from "../img/oi_part5.jpg" //
import {wwwJudge} from "../libs/common"

// api公用url
let cmnUrl = "http://test.jubao56.com"; //通用
let zcbUrl = "http://test.jubao56.com"; //整车保
let spbUrl = "http://test.jubao56.com"; //商铺保
let phbUrl = "http://test.jubao56.com"; //普货保
let ygbUrl = "http://test.jubao56.com"; //员工保
let declareUrl = "http://test.jubao56.com"; //申报业务
let fileUrl = "http://test.jubao56.com"; //文件上传地址
let redirectUrl = "http://test.jubao56.com/m/#/"; //太平支付的重定向地址


let spbBackUrl = "http://test.jubao56.com/spb/"; //跳转至商铺保页面
if(location.hostname.indexOf("localhost") != -1){
  spbBackUrl="http://localhost:63342/spb/spbprod/";
}

let isWWW = false;

if (wwwJudge()) {//包含www 或者是以jubao56.com开头字样均会调用www
    cmnUrl = "https://www.jubao56.com"; //通用
    zcbUrl = "https://www.jubao56.com"; //整车保
    spbUrl = "https://www.jubao56.com"; //商铺保
    phbUrl = "https://www.jubao56.com"; //普货保
    ygbUrl = "https://www.jubao56.com"; //员工保
    declareUrl = "https://www.jubao56.com"; //申报业务
    fileUrl = "https://www.jubao56.com"; //文件上传地址
    redirectUrl = "http://www.jubao56.com/m/#/"; //太平支付的重定向地址
    spbBackUrl = "http://www.jubao56.com/spb/";
    isWWW = true; // 是否是正式环境
}

export const state = {
    dataList: dataList, //省市联动数据源
    axios: axios,
    cookie: "",
    // jubao_user:"jubaov3_user",//用户登录cookie名
    jubao_user: "jubao_user", //用户登录cookie名
    token: "",

    cmnUrl: cmnUrl, //通用
    zcbUrl: zcbUrl, //整车保
    spbUrl: spbUrl, //商铺保
    ygbUrl: ygbUrl, //员工保
    declareUrl: declareUrl, //申报业务
    fileUrl: fileUrl, //文件上传地址url
    redirectUrl: redirectUrl, //充值重定向地址
    spbBackUrl: spbBackUrl,

    carNumReq: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$/, //车牌号正则
    reg_phone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/, //手机号正则
    reg_pwd: /^(?=.*?[a-zA-Z])(?=.*?[0-9])[!"#$%&'()*+,\-./:;<=>?@@\[\\\]^_`{|}~A-Za-z0-9]{6,16}$/, //密码正则
    reg_email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, //邮箱正则
    reg_company: /^[\(\)（）\u4e00-\u9fa5]{1,64}$/, //公司正则

    logo: logo,
    homeKnowMore: homeKnowMore,
    isWWW: isWWW, // 是否是正式环境
};
