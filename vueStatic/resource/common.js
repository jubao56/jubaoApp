/**
 * Created by pc-20170420 on 2017/9/29.
 */
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    function getBearerToken() {
        var token = null;
        var name = "jubao_user";
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
        if (arr = document.cookie.match(reg)) {
            token = unescape(arr[2]);
        }
        return "Bearer "+token;
    }
    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.setRequestHeader("Authorization", getBearerToken());
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Authorization",getBearerToken());
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    // arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}

// api公用url
var cmnUrl = "http://test.jubao56.com"; //通用
var zcbUrl = "http://test.jubao56.com"; //整车保
var spbUrl = "http://test.jubao56.com"; //商铺保
var phbUrl = "http://test.jubao56.com"; //普货保
var ygbUrl = "http://test.jubao56.com"; //员工保
var declareUrl = "http://test.jubao56.com"; //申报业务
var fileUrl = "http://test.jubao56.com"; //文件上传地址
var redirectUrl = "http://test.jubao56.com/pc"; //太平支付的重定向地址
if (location.hostname.indexOf("www") != -1  || location.hostname.indexOf("jubao56.com")==0) {
    cmnUrl = "https://www.jubao56.com"; //通用
    zcbUrl = "https://www.jubao56.com"; //整车保
    spbUrl = "https://www.jubao56.com"; //商铺保
    phbUrl = "https://www.jubao56.com"; //普货保
    ygbUrl = "https://www.jubao56.com"; //员工保
    declareUrl = "https://www.jubao56.com"; //申报业务
    fileUrl = "https://www.jubao56.com"; //文件上传地址
    redirectUrl = "http://www.jubao56.com/#/"; //太平支付的重定向地址
}
function getToken() {
    var token = null;
    var name = "jubao_user";
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        token = unescape(arr[2]);
    }
    return token;
}
function promise(url, params,success,fail) {
       return ajax({
            method: "GET",
            url: url,
            // headers: { 'Authorization': 'Bearer ' + getToken() },
            data:params,
            success:function (resp){
               success(resp);
            },
            fail:function (res) {
               fail(res)
            }
        });
}

var zcbOrderPolicy = function(orderId,success){
   return promise(zcbUrl + "/v1/zcb/order/policy",{ order_id: orderId*1 },success);
} // 获取电子保单

var zcbOrderConfirmation = function(params,success) {
    return promise(zcbUrl + "/v1/zcb/order/confirmation", params,success);
} // 获取承保确认单
var zcbOrderInfo = function(id,success,fail) {
    return promise(zcbUrl + "/v1/zcb/order/info", { id: id },success,fail);
} // 根据订单id查询整车保订单详情(正式)
var zcbOrderTryInfo = function(id,success,fail) {
    promise(zcbUrl + "/v1/zcb/order/try/info", { id: id },success,fail);
} // 根据订单id查询整车保订单详情(试用)
