/**
 * Created by pc-20170420 on 2017/5/4.
 */
export const mutations= {
    //读取cookie
    GETCOOKIE(state,params){
        let name=params;
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
        if (arr = document.cookie.match(reg)) {
            state.token=unescape(arr[2]) ;
        }else {
            state.token=null ;
        }
    },
    //移除font-size
    REMOVEFS(state){
        let html = document.documentElement;
        html.style.fontSize = "";
    },
    /**
     * 以对象的形式传入； 会自动在sessionStorage中生成对应的属性名和值；附带sessionStorage为空时的判断
     */
    SETSTORAGE(state,message){ //{phbId:[]}  sessio保存，增加，修改 session
        let key ="jubao56";
        let jubaoStorage =  JSON.parse(window.sessionStorage.getItem(key));
        jubaoStorage=jubaoStorage==null?{}:jubaoStorage;
        for(let i in message){
            jubaoStorage[i]=message[i]
        }
        window.sessionStorage.setItem(key,JSON.stringify(jubaoStorage));
    },
};