/**
 * Created by pc-20170420 on 2017/10/19.
 */
import {wwwJudge} from "../libs/common"
export let vuePlugin={};
vuePlugin.install = function (Vue, options) {
    // 2. 添加全局资源
    Vue.directive('testNone', {
        bind: function (el, binding, vnode) {
          if(!wwwJudge()){
            el.style.display="none"
          }
        }
    });
    Vue.directive('wwwNone', {
      bind: function (el, binding, vnode) {
        if(wwwJudge()){
          el.style.display="none"
        }
      }
    });
};
// exports.vuePlugin=vuePlugin;
