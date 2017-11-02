/**
 * Created by pc-20170420 on 2017/9/29.
 */
export let wwwJudge=()=>{
  if(location.hostname.indexOf("www") != -1  || location.hostname.indexOf("jubao56.com")==0){
      return true  //为www环境为true
  }else{
    return false
  }
};

export let goPageHref=(page)=> {
    let location = window.location.href;
    let str= "";
    if(wwwJudge()){
        str="http://www.jubao56.com/m/"
    }else{
        str="http://test.jubao56.com/m/"
    }
    window.location.href=str+page
}
export let getCookie= (name)=>{
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]) ;
    }else {
        return null ;
    }
}
//设置plus 的本地存储
/**
 * @param key {String}   存储的key值
 * @param value {Object}  存储对象或字符串
 * @param exp {Number}  过期时间  单位小时
 *
 */
export const setPlusStorage = (key, value, exp) => {
  let data,expires;
  if(exp){
    expires = new Date().getTime() + exp * 60 * 60 * 1000;
  }else{
    expires = 0;//expires为0即无过期时间
  }
  data = JSON.stringify({expires,value});
  console.log(window.plus,key)
  window.plus.storage.setItem(key,data)
}
//删除plus 的本地存储
/**
 * @param key {String}   要删除的数据的key值
 *
 */
export const removePlusStorage = (key) => {
  window.plus.storage.removeItem(key)
}
//获取plus 的本地存储
/**
 * @param key {String}   要获取的数据的key值
 *
 */
export const getPlusStorage = (key) => {
  let data = JSON.parse(window.plus.storage.getItem(key));
  if(!data) return;
  if(data.expires){   //如果存在expires,则证明有过期时间，需要验证
    let now = +new Date()
    if(data.expires < now){ //过期了
      removePlusStorage(key)
      return undefined
    }else {
      let res = Object.assign({},data);
      delete res.expires;
      return res.value
    }
  }else{
    return data.value
  }
}

