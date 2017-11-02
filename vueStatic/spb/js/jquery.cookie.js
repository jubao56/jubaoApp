/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function(key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function(key, options) {
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
function setCookie(name,value,time){
    if(time){
        var hours = time.expires; //单位小时
        var exp = new Date();
        exp.setTime(exp.getTime() + hours*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";
    }else {
        document.cookie = name + "="+ escape (value) + ";path=/";
    }
}
function getCookie(name){
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]) ;
    }else {
        return null ;
    }
}
function removeCookie(name) {
    setCookie(name,'',-1)
}
function getToken() {
    return getCookie('jubao_user')
}
function removeToken() {
    removeCookie('jubao_user')
}
var isWWW = true;
// api公用url
var cmnUrl = "https://www.jubao56.com";
var zcbUrl = "https://www.jubao56.com";
var ygbUrl = "https://www.jubao56.com";
var spbUrl = "https://www.jubao56.com";
var declareUrl = "https://www.jubao56.com";
var fileUrl = "https://www.jubao56.com";
var phbUrl = "https://www.jubao56.com";

if (location.href.indexOf("localhost") > -1 || location.href.indexOf("test") > -1) {
    cmnUrl = "http://test.jubao56.com";
    zcbUrl = "http://test.jubao56.com";
    ygbUrl = "http://test.jubao56.com";
    spbUrl = "http://test.jubao56.com";
    declareUrl = "http://test.jubao56.com";
    fileUrl = "http://test.jubao56.com";
    phbUrl = "http://test.jubao56.com";

    isWWW = false;
}

var backUrl = "../../index.html";   //backUrl 用于跳转到新的移动端项目的地址
// if(location.href.indexOf('test') > -1){
//     backUrl = "http://test.jubao56.com/m"
// }else if(location.href.indexOf('localhost') > -1){
//     backUrl = "http://localhost:8080"
// }
var userHref = backUrl + '#/dashboard';
