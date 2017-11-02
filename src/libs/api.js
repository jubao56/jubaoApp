/**
 * Created on 2017/9/20.
 */
import axios from "axios"
import {wwwJudge,getPlusStorage} from "./common"
// api公用url
let cmnUrl = "http://test.jubao56.com"; //通用
let zcbUrl = "http://test.jubao56.com"; //整车保
let spbUrl = "http://test.jubao56.com"; //商铺保
let phbUrl = "http://test.jubao56.com"; //普货保
let ygbUrl = "http://test.jubao56.com"; //员工保
let declareUrl = "http://test.jubao56.com"; //申报业务
let fileUrl = "http://test.jubao56.com"; //文件上传地址
let redirectUrl = "http://test.jubao56.com/pc"; //太平支付的重定向地址
if (wwwJudge()) {//包含www 或者是以jubao56.com开头字样均会调用www
    cmnUrl = "https://www.jubao56.com"; //通用
    zcbUrl = "https://www.jubao56.com"; //整车保
    spbUrl = "https://www.jubao56.com"; //商铺保
    phbUrl = "https://www.jubao56.com"; //普货保
    ygbUrl = "https://www.jubao56.com"; //员工保
    declareUrl = "https://www.jubao56.com"; //申报业务
    fileUrl = "https://www.jubao56.com"; //文件上传地址
    redirectUrl = "http://www.jubao56.com/#/"; //太平支付的重定向地址
}
export function getToken() {
    return getPlusStorage("token")
}

function ajax(url, params, type = "GET") {
    return new Promise((resolve, reject) => {
        let data = {
            method: type,
            url: url,
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        switch (type) {
            case "GET":
                data.params = params;
                break;
            case "POST":
                data.data = params;
                break;
        }
        axios(data).then((resp) => {
            resolve(resp.data);
        }).catch((err) => {
            reject(err)
        })
    });
}
//命名规则，取api详细地址的最后三个单词，以驼峰命名法进行拼接
//分块以及注释规则：一定要规范！分模块定义和添加注释，大板块之间用"----"分开，小版块之间用中文分开；详细信息参照安利、
//函数封装规则：请求的参数为单个且必选的api时，把参数的【键】也封装起来。eg：获取价格方案列表；有多个可选参数时，把参数params整体封装
//api函数引入规则：按需求引入，目的是----只看import就知道此页面调用了哪几个api；
//cmn-------------------------------------------------------------------------------------------------------------------
// 图片验证码
export const cmnCaptchaNew = (params) => ajax(cmnUrl + "/v1/cmn/captcha/new", params, "POST"); //生成图片验证码id
export const cmnCaptchaVerify = (params) => ajax(cmnUrl + "/v1/cmn/captcha/verify", params, "POST"); //验证图片验证码
// 短信
export const cmnSmsSend = (params) => ajax(cmnUrl + "/v1/cmn/sms/send", params, "POST"); //获取短信验证码
export const cmnSmsVerify = (params) => ajax(cmnUrl + "/v1/cmn/sms/verify", params, "POST"); //验证短信验证码
export const cmnSmsList = (params) => ajax(cmnUrl + "/v1/cmn/sms/list", params); //获取短信列表
// 用户
export const cmnUserRegister = (params) => ajax(cmnUrl + "/v1/cmn/user/register", params, "POST"); //用户注册
export const cmnUserLogin = (params) => ajax(cmnUrl + "/v1/cmn/user/login", params, "POST"); //用户登录
export const cmnUserRecover = (params) => ajax(cmnUrl + "/v1/cmn/user/recover", params, "POST"); //找回密码
export const cmnUserList = (params) => ajax(cmnUrl + "/v1/cmn/user/list", params); //根据查询条件查询用户
export const cmnUserInfo = (params) => ajax(cmnUrl + "/v1/cmn/user/info", params); //获取用户详细信息
export const cmnUserUpdate = (params) => ajax(cmnUrl + "/v1/cmn/user/update", params, "POST"); //更新用户信息
// 公司
export const cmnCompanyCheck = (companyName) => ajax(cmnUrl + "/v1/cmn/company/check", { name: companyName }); //校验公司名称
export const cmnCompanyNew = (params) => ajax(cmnUrl + "/v1/cmn/company/new", params, "POST"); //新建公司信息
export const cmnCompanyInfo = (companyId) => ajax(cmnUrl + "/v1/cmn/company/info", { id: companyId*1 }); //获取公司详细信息
export const cmnCompanyList = (params) => ajax(cmnUrl + "/v1/cmn/company/list", params); //获取公司列表信息
export const cmnCompanyUpdate = (params) => ajax(cmnUrl + "/v1/cmn/company/update", params, "POST"); //更新公司信息
// 子账户
export const cmnSubaccoutAdd = (params) => ajax(cmnUrl + "/v1/cmn/subaccout/add", params, "POST"); //添加子账户
export const cmnSubaccoutList = (params) => ajax(cmnUrl + "/v1/cmn/subaccout/list", params); //查询子账户列表
// 渠道
export const cmnChannelList = (params) => ajax(cmnUrl + "/v1/cmn/channel/list", params); //获取渠道列表
export const cmnChannelDetaillist = (params) => ajax(cmnUrl + "/v1/cmn/channel/detaillist", params); //获取渠道详细信息列表(后台)
export const cmnChannelInfo = (channelId) => ajax(cmnUrl + "/v1/cmn/channel/info", { id: channelId*1 }); //根据渠道id查询渠道详情
export const cmnChannelSave = (params) => ajax(cmnUrl + "/v1/cmn/channel/save", params, "POST"); //创建、修改渠道
export const cmnChannelDelete = (params) => ajax(cmnUrl + "/v1/cmn/channel/delete", params, "POST"); //删除渠道
// 整车保API账号
export const cmnClientList = (params) => ajax(cmnUrl + "/v1/cmn/client/list", params); // 获取整车保API账号列表
export const cmnClientInfo = (id) => ajax(cmnUrl + "/v1/cmn/client/info", { id: id*1 }); // 根据渠道id查询整车保API账号详情
export const cmnClientSave = (params) => ajax(cmnUrl + "/v1/cmn/client/save", params, "POST"); // 新建或修改整车保API账号
export const cmnClientDelete = (id) => ajax(cmnUrl + "/v1/cmn/client/delete", { id: id*1 }, "POST"); // 删除整车保API账号
// 邮寄地址
export const cmnUseraddressList = (params) => ajax(cmnUrl + "/v1/cmn/useraddress/list", params); // 查询用户邮寄地址列表信息
export const cmnUseraddressAdd = (params) => ajax(cmnUrl + "/v1/cmn/useraddress/add", params, "POST"); // 新增用户邮寄地址
export const cmnUseraddressInfo = (id) => ajax(cmnUrl + "/v1/cmn/useraddress/info", { id: id*1 }); // 获取邮寄地址详细信息
export const cmnUseraddressDelete = (id) => ajax(cmnUrl + "/v1/cmn/useraddress/delete", { id: id*1 }); // 删除指定邮寄地址信息
export const cmnUseraddressEdit = (params) => ajax(cmnUrl + "/v1/cmn/useraddress/edit", params, "POST"); // 编辑用户邮寄地址
export const cmnUseraddressSetdefaultaddr = (id) => ajax(cmnUrl + "/v1/cmn/useraddress/setdefaultaddr", { id: id*1 }); // 设置默认邮寄地址
// 区域
export const cmnProvinceList = () => ajax(cmnUrl + "/v1/cmn/province/list"); // 获取支持的省份
export const cmnCityList = (province) => ajax(cmnUrl + "/v1/cmn/city/list", { province: province }); // 获取省份下的城市
export const cmnCityDistance = (params) => ajax(cmnUrl + "/v1/cmn/city/distance", params); // 获取运输距离
// 协议
export const cmnAgreementList = (params) => ajax(cmnUrl + "/v1/cmn/agreement/list", params); // 获取平台服务协议
export const cmnAgreementSign = (params) => ajax(cmnUrl + "/v1/cmn/agreement/sign", params, "POST"); // 签署平台服务协议
// 文件
export const cmnFileList = (params) => ajax(cmnUrl + "/v1/cmn/file/list", params); // 获取文件列表
// 协同
export const cmnAssistInvite = (params) => ajax(cmnUrl + "/v1/cmn/assist/invite", params, "POST"); // 邀请协同
export const cmnAssistInfo = (id) => ajax(cmnUrl + "/v1/cmn/assist/info", { id: id*1 }); // 获取协助信息
export const cmnAssistFinish = (params) => ajax(cmnUrl + "/v1/cmn/assist/finish", params, "POST"); // 完成协同
// 宝付
export const cmnBaofuPayurl = (params) => ajax(cmnUrl + "/v1/cmn/baofu/payurl", params, "POST"); // 发起宝付支付
export const cmnBaofuList = (params) => ajax(cmnUrl + "/v1/cmn/baofu/list", params); // 获取宝付订单列表
export const cmnBaoFinish = (params) => ajax(cmnUrl + "/v1/cmn/baofu/finish", params); // 判断是否支付/充值成功
// 邮件
export const cmnEmailSend = (params) => ajax(cmnUrl + "/v1/cmn/email/send", params, "POST"); // 发送邮件
// 文件
export const cmnTransactionList = (params) => ajax(cmnUrl + "/v1/cmn/transaction/list", params); // 查询资金流水
export const cmnTransactionZcbinsurance = (params) => ajax(cmnUrl + "/v1/cmn/transaction/zcbinsurance", params); // 整车保投保统计
export const cmnTransactionZcbdeposit = (params) => ajax(cmnUrl + "/v1/cmn/transaction/zcbdeposit", params); // 整车保充值统计
// 文章
export const cmnArticleSave = (params) => ajax(cmnUrl + "/v1/cmn/article/save", params, "POST"); // 新建文章与更新文章
export const cmnArticleRead = (id) => ajax(cmnUrl + "/v1/cmn/article/read", { id: id*1 }, "POST"); // 增加文章阅读量
export const cmnArticleDelete = (id) => ajax(cmnUrl + "/v1/cmn/article/delete", { id: id*1 }, "POST"); // 删除文章
export const cmnArticleInfo = (id) => ajax(cmnUrl + "/v1/cmn/article/info", { id: id*1 }); // 获取文章详细信息
export const cmnArticleList = (params) => ajax(cmnUrl + "/v1/cmn/article/list", params); // 根据查询条件查询文章
// 文章目录
export const cmnCategorySave = (params) => ajax(cmnUrl + "/v1/cmn/category/save", params, "POST"); // 新建目录与更新目录
export const cmnCategoryDelete = (id) => ajax(cmnUrl + "/v1/cmn/category/delete", { id: id*1 }, "POST"); // 删除目录
export const cmnCategoryInfo = (id) => ajax(cmnUrl + "/v1/cmn/category/info", { id: id*1 }); // 获取目录详细信息
export const cmnCategoryList = (params) => ajax(cmnUrl + "/v1/cmn/category/list", params); // 根据查询条件查询目录
// 活动
export const cmnPromotionSave = (params) => ajax(cmnUrl + "/v1/cmn/promotion/save", params, "POST"); // 创建新的活动或者修改已有活动
export const cmnPromotionInfo = (params) => ajax(cmnUrl + "/v1/cmn/promotion/info", params); // 查看活动详情
export const cmnPromotionList = (params) => ajax(cmnUrl + "/v1/cmn/promotion/list", params); // 查看活动列表
// 优惠券
export const cmnCouponAdd = (params) => ajax(cmnUrl + "/v1/cmn/coupon/add", params, "POST"); // 添加优惠券
export const cmnCouponDelete = (params) => ajax(cmnUrl + "/v1/cmn/coupon/delete", params, "POST"); // 删除优惠券
export const cmnCouponList = (params) => ajax(cmnUrl + "/v1/cmn/coupon/list", params); // 查询优惠券列表
export const cmnCouponXlsx = () => ajax(cmnUrl + "/v1/cmn/coupon/xlsx"); // 导出优惠券表格
// 用户权限申请与审核
export const cmnPermitSpecialinvoiceRequest = (params) => ajax(cmnUrl + "/v1/cmn/permit/specialinvoice/request", params, "POST"); // 申请专用发票权限
export const cmnPermitInvoiceRequest = (params) => ajax(cmnUrl + "/v1/cmn/permit/invoice/request", params, "POST"); // 申请普通发票权限
export const cmnPermitCheck = (params) => ajax(cmnUrl + "/v1/cmn/permit/check", params, "POST"); // 审核打印权限的申请
export const cmnPermitInfo = (id) => ajax(cmnUrl + "/v1/cmn/permit/info", { id: id*1 }); // 查询用户申请权限资质的详细信息
export const cmnPermitList = (params) => ajax(cmnUrl + "/v1/cmn/permit/list", params); // 根据查询条件查询资质申请单列表
// 后台统计
export const cmnTransactionZcbdata = (params) => ajax(cmnUrl + "/v1/cmn/transaction/zcbdata", params); // 整车保投保相关统计数据
// 理赔信息统计
export const cmnYgbclaimsData = (params) => ajax(cmnUrl + "/v1/cmn/ygbclaims/data", params); // 员工保理赔信息列表
export const cmnYgbclaimsInputdata = (params) => ajax(cmnUrl + "/v1/cmn/ygbclaims/inputdata", params, "POST"); // 录入员工保理赔信息
export const cmnYgbclaimsDelete = (id) => ajax(cmnUrl + "/v1/cmn/ygbclaims/delete", { id: id*1 }, "POST"); // 删除员工保理赔信息
//-------------------------------------------------------------------------------------------------------------------cmn
//res start-------------------------------------------------------------------------------------------------------------------
//res
export const resFileUpload = (params) => ajax(zcbUrl + "/res/file/upload", params, "POST"); // 上传文件
export const resFileSave = (params) => ajax(zcbUrl + "/res/file/save", params, "POST"); // , "POST"
//-------------------------------------------------------------------------------------------------------------------res end
//phb-------------------------------------------------------------------------------------------------------------------
//获取价格方案
export const phbPriceSave = (params) => ajax(phbUrl + "/v1/phb/price/save", params, "POST"); //保存价格方案
export const phbPriceInfo = (priceId) => ajax(phbUrl + "/v1/phb/price/info", { id: priceId*1 }); //获取价格方案详情
export const phbPriceList = (params) => ajax(phbUrl + "/v1/phb/price/list", params); //获取价格方案列表
export const phbPriceDelete = (priceId) => ajax(phbUrl + "/v1/phb/price/delete", { id: priceId*1 }); //删除价格方案
//用户
export const phbUserCreate = (params) => ajax(phbUrl + "/v1/phb/user/create", params, "POST"); //创建普货保用户
export const phbUserInfo = () => ajax(phbUrl + "/v1/phb/user/info"); //获取普货保用户信息
export const phbUserList = (params) => ajax(phbUrl + "/v1/phb/user/list", params); //获取普货保用户信息
export const phbUserUpdate = (params) => ajax(phbUrl + "/v1/phb/user/update", params, "POST"); //更新普货保用户信息
//用户价格方案匹配
export const phbMatchCreate = (params) => ajax(phbUrl + "/v1/phb/match/create", params, "POST"); //创建匹配
export const phbMatchList = (params) => ajax(phbUrl + "/v1/phb/match/list"); //获取普货保用户信息
//订单
export const phbOrderPrice = (params) => ajax(phbUrl + "/v1/phb/order/price", params); //获取订单价格
export const phbOrderSave = (params) => ajax(phbUrl + "/v1/phb/order/save", params, "POST"); //创建或保存普货保订单
export const phbOrderInfo = (orderId) => ajax(phbUrl + "/v1/phb/order/info", { id: orderId*1 }); //获取普货保订单详细信息
export const phbOrderList = (params) => ajax(phbUrl + "/v1/phb/order/list", params); //获取订单价格
export const phbOrderStatus = (params) => ajax(phbUrl + "/v1/phb/order/status", params, "POST"); //修改普货保订单状态
export const phbOrderPay = (params) => ajax(phbUrl + "/v1/phb/order/pay", params, "POST"); //支付普货保订单
export const phbOrderConfirmation = (orderId) => ajax(phbUrl + "/v1/phb/order/confirmation", { order_id: orderId*1 }); //获取承保确认单
export const phbOrderPolicy = (orderId) => ajax(phbUrl + "/v1/phb/order/policy", { order_id: orderId*1 }); //获取电子保单
//充值
export const phbDepositNew = (params) => ajax(phbUrl + "/v1/phb/deposit/new", params, "POST"); //创建充值订单
export const phbDepositInfo = (orderId) => ajax(phbUrl + "/v1/phb/deposit/info", { order_id: orderId*1 }); //获取充值订单信息
export const phbDepositManual = (params) => ajax(phbUrl + "/v1/phb/deposit/manual", params, "POST"); //人工充值
//-------------------------------------------------------------------------------------------------------------------phb
//spb-------------------------------------------------------------------------------------------------------------------
//商铺保产品价格
export const spbPrice = () => ajax(spbUrl + "/v1/spb/price"); //获取产品价格列表
//商铺保订单
export const spbOrderSave = (params) => ajax(spbUrl + "/v1/spb/order/save", params, "POST"); //创建、修改商铺保订单
export const spbOrderList = (params) => ajax(spbUrl + "/v1/spb/order/list", params); //根据查询条件查询商铺保订单
export const spbOrderInfo = (orderId) => ajax(spbUrl + "/v1/spb/order/info", { id: orderId*1 }); //根据订单id查询商铺保订单详情
export const spbOrderDelete = (orderId) => ajax(spbUrl + "/v1/spb/order/delete", { id: orderId*1 }, "POST"); //根据订单id删除商铺保订单
export const spbOrderCreateform = (orderId) => ajax(spbUrl + "/v1/spb/order/createform", { order_id: orderId*1 }); //生成商铺保订单投保单
export const spbOrderUploadform = (params) => ajax(spbUrl + "/v1/spb/order/uploadform", params, "POST"); //上传盖章后的商铺保订单投保单
export const spbOrderStatus = (params) => ajax(spbUrl + "/v1/spb/order/status", params, "POST"); //修改商铺保订单状态
export const spbOrderDiscount = (params) => ajax(spbUrl + "/v1/spb/order/discount", params, "POST"); //商铺保订单价格打折
export const spbOrderPayoffline = (params) => ajax(spbUrl + "/v1/spb/order/payoffline", params, "POST"); //商铺保订单线下支付接口
export const spbOrderSavepolicy = (params) => ajax(spbUrl + "/v1/spb/order/savepolicy", params, "POST"); //商铺保订单确认支付及保单号录入
export const spbOrderImport = (params) => ajax(spbUrl + "/v1/spb/order/import", params, "POST"); //后台导入商铺保订单
//商铺保用户
export const spbUserRegister = (channelId) => ajax(spbUrl + "/v1/spb/user/register", { channel_id: channelId*1 }, "POST"); //注册商铺保用户
export const spbUserInfo = (id) => ajax(spbUrl + "/v1/spb/user/info", { id: id*1 }); //获取商铺保用户信息
export const spbUserList = (params) => ajax(spbUrl + "/v1/spb/user/list", params); //根据查询条件查询商铺保用户列表
export const spbUserUpdate = (params) => ajax(spbUrl + "/v1/spb/user/update", params, "POST"); //更新商铺保用户信息
//-------------------------------------------------------------------------------------------------------------------spb
//zcb start-------------------------------------------------------------------------------------------------------------------
//协议
export const zcbAgreementList = (params) => ajax(zcbUrl + "/v1/zcb/agreement/list", params); // 获取整车保产品协议
export const zcbAgreementSign = (params) => ajax(zcbUrl + "/v1/zcb/agreement/sign", params, "POST"); // 签署整车保产品协议
//产品保额列表
export const zcbCoverage = () => ajax(zcbUrl + "/v1/zcb/coverage"); // 获取产品保额列表
//用户
export const zcbUserRegister = (channelId) => ajax(zcbUrl + "/v1/zcb/user/register", { channel_id: channelId*1 }, "POST"); // 注册整车保用户
export const zcbUserInfo = (params) => ajax(zcbUrl + "/v1/zcb/user/info", params); // 获取整车保账户信息
export const zcbUserList = (params) => ajax(zcbUrl + "/v1/zcb/user/list", params); // 条件查询用户列表
export const zcbUserUpdate = (params) => ajax(zcbUrl + "/v1/zcb/user/update", params, "POST"); // 更新整车保用户信息
//订单
export const zcbOrderPrice = (params) => ajax(zcbUrl + "/v1/zcb/order/price", params); // 获取订单价格
export const zcbOrderSave = (params) => ajax(zcbUrl + "/v1/zcb/order/save", params, "POST"); // 保存整车保订单(正式)
export const zcbOrderTrySave = (params) => ajax(zcbUrl + "/v1/zcb/order/try/save", params, "POST"); // 保存整车保订单(试用)
export const zcbOrderList = (params) => ajax(zcbUrl + "/v1/zcb/order/list", params); // 条件查询用户列表
export const zcbOrderInfo = (id) => ajax(zcbUrl + "/v1/zcb/order/info", { id: id*1 }); // 根据订单id查询整车保订单详情(正式)
export const zcbOrderTryInfo = (id) => ajax(zcbUrl + "/v1/zcb/order/try/info", { id: id*1 }); // 根据订单id查询整车保订单详情(试用)
export const zcbOrderStatus = (params) => ajax(zcbUrl + "/v1/zcb/order/status", params, "POST"); // 修改整车保订单状态
export const zcbOrderPay = (params) => ajax(zcbUrl + "/v1/zcb/order/pay", params, "POST"); // 支付整车保订单(正式)
export const zcbOrderTryPay = (params) => ajax(zcbUrl + "/v1/zcb/order/try/pay", params, "POST"); // 支付整车保订单(正式)
export const zcbOrderConfirmation = (params) => ajax(zcbUrl + "/v1/zcb/order/confirmation", params); // 获取承保确认单
export const zcbOrderPolicy = (orderId) => ajax(zcbUrl + "/v1/zcb/order/policy", { order_id: orderId*1 }); // 获取电子保单
//充值
export const zcbDepositNew = (params) => ajax(zcbUrl + "/v1/zcb/deposit/new", params, "POST"); // 创建充值订单
export const zcbDepositInfo = (orderId) => ajax(zcbUrl + "/v1/zcb/deposit/info", { order_id: orderId*1 }); // 获取充值订单信息
export const zcbDepositManual = (params) => ajax(zcbUrl + "/v1/zcb/deposit/manual", params, "POST"); // 人工充值
//共享支付
export const zcbShareCreate = (params) => ajax(zcbUrl + "/v1/zcb/share/create", params, "POST"); // 创建共享支付关系
export const zcbShareList = (params) => ajax(zcbUrl + "/v1/zcb/share/list", params); // 查询共享支付关系列表
export const zcbShareApprove = (params) => ajax(zcbUrl + "/v1/zcb/share/approve", params, "POST"); // 审核共享支付关系申请
export const zcbSharePay = (params) => ajax(zcbUrl + "/v1/zcb/share/pay", params, "POST"); // 通过共享支付关系支付整车保订单
//发票及协议
export const zcbPrintInvoiceReq = (params) => ajax(zcbUrl + "/v1/zcb/print/invoice/request", params, "POST"); // 申请发票打印件(普通发票)
export const zcbPrintSpecReq = (params) => ajax(zcbUrl + "/v1/zcb/print/specialinvoice/request", params, "POST"); // 申请发票打印件(专用发票)
export const zcbPrintReceiptReq = (params) => ajax(zcbUrl + "/v1/zcb/print/receipt/request", params, "POST"); // 申请协议打印件
export const zcbPrintDelete = (params) => ajax(zcbUrl + "/v1/zcb/print/delete", params, "POST"); // 取消打印件申请单
export const zcbPrintCheck = (params) => ajax(zcbUrl + "/v1/zcb/print/check", params, "POST"); // 审核打印权限的申请
export const zcbPrintInfo = (id) => ajax(zcbUrl + "/v1/zcb/print/info", { id: id*1 }); // 获取打印件单详细信息
export const zcbPrintList = (params) => ajax(zcbUrl + "/v1/zcb/print/list", params); // 根据查询条件查询打印件申请单列表
//-------------------------------------------------------------------------------------------------------------------zcb end
//ygb start-------------------------------------------------------------------------------------------------------------------
//员工保订单
export const ygbOrderSave = (params) => ajax(ygbUrl + "/v1/ygb/order/save", params, "POST"); //创建或修改员工保订单;
export const ygbOrderList = (params) => ajax(ygbUrl + "/v1/ygb/order/list", params, "GET"); //条件查询订单列表；
export const ygbOrderInfo = (orderId) => ajax(ygbUrl + "/v1/ygb/order/info", { id: orderId * 1 }, "GET"); //根据id查询订单详情；
export const ygbOrderCancel = (orderId) => ajax(ygbUrl + "/v1/ygb/order/cancel", { id: orderId * 1 }, "POST"); //取消订单；
export const ygbOrderEmployeelist = (params) => ajax(ygbUrl + "/v1/ygb/order/employeelist", params, "GET"); //条件查询员工列表
//员工保用户
export const ygbUserList = (params) => ajax(ygbUrl + "/v1/ygb/user/list", params, "GET"); //条件查询员工保用户列表
export const ygbUserChangechannel = (params) => ajax(ygbUrl + "/v1/ygb/user/changechannel", params, "POST"); //修改员工保用户渠道
export const ygbUserInfo = (params) => ajax(ygbUrl + "/v1/ygb/user/info", params, "GET"); //查询员工保用户详细信息
export const ygbUserRegister = (channelId) => ajax(ygbUrl + "/v1/ygb/user/register", { channel_id: channelId * 1 }, "POST"); //注册员工保用户的渠道
//员工保变更
export const ygbOrderEmployeechange = (params) => ajax(ygbUrl + "/v1/ygb/order/employeechange", params, "POST"); //员工保换人
export const ygbOrderEmployeeaddprice = (params) => ajax(ygbUrl + "/v1/ygb/order/employeeaddprice", params, "GET"); //获取员工保加人单价
export const ygbOrderEmployeeadd = (params) => ajax(ygbUrl + "/v1/ygb/order/employeeadd", params, "POST"); //员工保加人（前台）
export const ygbOrderHistorylist = (params) => ajax(ygbUrl + "/v1/ygb/order/historylist", params, "GET"); //获取员工保变更历史列表
export const ygbOrderEmployeeaddlist = (params) => ajax(ygbUrl + "/v1/ygb/order/employeeaddlist", params, "GET"); //获取加保人员列表
//员工保产品及价格
export const ygbProductList = (params) => ajax(ygbUrl + "/v1/ygb/product/list", params, "GET"); //条件查询员工保产品列表
export const ygbProductPricelist = (params) => ajax(ygbUrl + "/v1/ygb/product/pricelist", params, "GET"); //条件查询价格列表
//员工保文件
export const ygbOrderUploadfiles = (params) => ajax(ygbUrl + "/v1/ygb/order/uploadfiles", params, "GET"); //上传员工保投保资质
export const ygbOrderPolicyfile = (orderId) => ajax(ygbUrl + "/v1/ygb/order/policyfile", { order_id: orderId * 1 }, "GET"); //获取未盖章的投保单
export const ygbOrderChangefile = (orderId) => ajax(ygbUrl + "/v1/ygb/order/changefile", { order_id: orderId * 1 }, "GET"); //获取未盖章网络变更确认书
export const ygbUploadChangefile = (params) => ajax(ygbUrl + "/v1/ygb/upload/changefile", params, "POST"); //上传员工保网络变更确认书
//-------------------------------------------------------------------------------------------------------------------ygb end
