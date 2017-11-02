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
export const setStorage = (message) =>{
  let key ="jubao56";
  let jubaoStorage =  JSON.parse(window.sessionStorage.getItem(key));
  jubaoStorage=jubaoStorage==null?{}:jubaoStorage;
  for(let i in message){
    jubaoStorage[i]=message[i]
  }
  window.sessionStorage.setItem(key,JSON.stringify(jubaoStorage));
}

//获取item信息，检测是否过期，过期则重定向---app
export const getPlusStorage = (key) => {
  let data = JSON.parse(window.plus.storage.getItem(key));
  if(data.expires){   //如果存在time,则证明有过期时间，需要验证
    let now = +new Date()
    if(data.expires > now){ //过期了
      removePlusStorage(key)
      return undefined
    }else {
      let res = Object.assign({},data)
      delete res.expires;
      return res
    }
  }else{
    return data
  }
};
export const setPlusStorage = (key, value, exp) => {
  let data;
  if(exp){
    let expires = new Date().getTime() + exp * 60 * 60 * 1000;
    data = JSON.stringify({expires, ...value})
  }else{
    data = JSON.stringify(value)
  }
  window.plus.storage.setItem(key,data)
};

export const removePlusStorage = (key) => {
  window.plus.storage.removeItem(key)
}
