//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Hc.apply(null,arguments)}function b(a){Hc=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ca(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=j(b)),"undefined"!=typeof b._locale&&(a._locale=b._locale),Jc.length>0)for(c in Jc)d=Jc[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function n(b){m(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),Kc===!1&&(Kc=!0,a.updateOffset(this),Kc=!1)}function o(a){return a instanceof n||null!=a&&null!=a._isAMomentObject}function p(a){return 0>a?Math.ceil(a):Math.floor(a)}function q(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=p(b)),c}function r(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&q(a[d])!==q(b[d]))&&g++;return g+f}function s(){}function t(a){return a?a.toLowerCase().replace("_","-"):a}function u(a){for(var b,c,d,e,f=0;f<a.length;){for(e=t(a[f]).split("-"),b=e.length,c=t(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=v(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&r(e,c,!0)>=b-1)break;b--}f++}return null}function v(a){var b=null;if(!Lc[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Ic._abbr,require("./locale/"+a),w(b)}catch(c){}return Lc[a]}function w(a,b){var c;return a&&(c="undefined"==typeof b?y(a):x(a,b),c&&(Ic=c)),Ic._abbr}function x(a,b){return null!==b?(b.abbr=a,Lc[a]=Lc[a]||new s,Lc[a].set(b),w(a),Lc[a]):(delete Lc[a],null)}function y(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Ic;if(!c(a)){if(b=v(a))return b;a=[a]}return u(a)}function z(a,b){var c=a.toLowerCase();Mc[c]=Mc[c+"s"]=Mc[b]=a}function A(a){return"string"==typeof a?Mc[a]||Mc[a.toLowerCase()]:void 0}function B(a){var b,c,d={};for(c in a)f(a,c)&&(b=A(c),b&&(d[b]=a[c]));return d}function C(b,c){return function(d){return null!=d?(E(this,b,d),a.updateOffset(this,c),this):D(this,b)}}function D(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function E(a,b,c){return a._d["set"+(a._isUTC?"UTC":"")+b](c)}function F(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=A(a),"function"==typeof this[a])return this[a](b);return this}function G(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function H(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Qc[a]=e),b&&(Qc[b[0]]=function(){return G(e.apply(this,arguments),b[1],b[2])}),c&&(Qc[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function I(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function J(a){var b,c,d=a.match(Nc);for(b=0,c=d.length;c>b;b++)Qc[d[b]]?d[b]=Qc[d[b]]:d[b]=I(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function K(a,b){return a.isValid()?(b=L(b,a.localeData()),Pc[b]=Pc[b]||J(b),Pc[b](a)):a.localeData().invalidDate()}function L(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Oc.lastIndex=0;d>=0&&Oc.test(a);)a=a.replace(Oc,c),Oc.lastIndex=0,d-=1;return a}function M(a){return"function"==typeof a&&"[object Function]"===Object.prototype.toString.call(a)}function N(a,b,c){dd[a]=M(b)?b:function(a){return a&&c?c:b}}function O(a,b){return f(dd,a)?dd[a](b._strict,b._locale):new RegExp(P(a))}function P(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Q(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=q(a)}),c=0;c<a.length;c++)ed[a[c]]=d}function R(a,b){Q(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function S(a,b,c){null!=b&&f(ed,a)&&ed[a](b,c._a,c,a)}function T(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function U(a){return this._months[a.month()]}function V(a){return this._monthsShort[a.month()]}function W(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function X(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),T(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function Y(b){return null!=b?(X(this,b),a.updateOffset(this,!0),this):D(this,"Month")}function Z(){return T(this.year(),this.month())}function $(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[gd]<0||c[gd]>11?gd:c[hd]<1||c[hd]>T(c[fd],c[gd])?hd:c[id]<0||c[id]>24||24===c[id]&&(0!==c[jd]||0!==c[kd]||0!==c[ld])?id:c[jd]<0||c[jd]>59?jd:c[kd]<0||c[kd]>59?kd:c[ld]<0||c[ld]>999?ld:-1,j(a)._overflowDayOfYear&&(fd>b||b>hd)&&(b=hd),j(a).overflow=b),a}function _(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function aa(a,b){var c=!0;return g(function(){return c&&(_(a+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function ba(a,b){od[a]||(_(b),od[a]=!0)}function ca(a){var b,c,d=a._i,e=pd.exec(d);if(e){for(j(a).iso=!0,b=0,c=qd.length;c>b;b++)if(qd[b][1].exec(d)){a._f=qd[b][0];break}for(b=0,c=rd.length;c>b;b++)if(rd[b][1].exec(d)){a._f+=(e[6]||" ")+rd[b][0];break}d.match(ad)&&(a._f+="Z"),va(a)}else a._isValid=!1}function da(b){var c=sd.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ca(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ea(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function fa(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function ga(a){return ha(a)?366:365}function ha(a){return a%4===0&&a%100!==0||a%400===0}function ia(){return ha(this.year())}function ja(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=Da(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ka(a){return ja(a,this._week.dow,this._week.doy).week}function la(){return this._week.dow}function ma(){return this._week.doy}function na(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function oa(a){var b=ja(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function pa(a,b,c,d,e){var f,g=6+e-d,h=fa(a,0,1+g),i=h.getUTCDay();return e>i&&(i+=7),c=null!=c?1*c:e,f=1+g+7*(b-1)-i+c,{year:f>0?a:a-1,dayOfYear:f>0?f:ga(a-1)+f}}function qa(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function ra(a,b,c){return null!=a?a:null!=b?b:c}function sa(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function ta(a){var b,c,d,e,f=[];if(!a._d){for(d=sa(a),a._w&&null==a._a[hd]&&null==a._a[gd]&&ua(a),a._dayOfYear&&(e=ra(a._a[fd],d[fd]),a._dayOfYear>ga(e)&&(j(a)._overflowDayOfYear=!0),c=fa(e,0,a._dayOfYear),a._a[gd]=c.getUTCMonth(),a._a[hd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[id]&&0===a._a[jd]&&0===a._a[kd]&&0===a._a[ld]&&(a._nextDay=!0,a._a[id]=0),a._d=(a._useUTC?fa:ea).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[id]=24)}}function ua(a){var b,c,d,e,f,g,h;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=ra(b.GG,a._a[fd],ja(Da(),1,4).year),d=ra(b.W,1),e=ra(b.E,1)):(f=a._locale._week.dow,g=a._locale._week.doy,c=ra(b.gg,a._a[fd],ja(Da(),f,g).year),d=ra(b.w,1),null!=b.d?(e=b.d,f>e&&++d):e=null!=b.e?b.e+f:f),h=pa(c,d,e,g,f),a._a[fd]=h.year,a._dayOfYear=h.dayOfYear}function va(b){if(b._f===a.ISO_8601)return void ca(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=L(b._f,b._locale).match(Nc)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(O(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),Qc[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),S(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[id]<=12&&b._a[id]>0&&(j(b).bigHour=void 0),b._a[id]=wa(b._locale,b._a[id],b._meridiem),ta(b),$(b)}function wa(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function xa(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=m({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],va(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function ya(a){if(!a._d){var b=B(a._i);a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],ta(a)}}function za(a){var b=new n($(Aa(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Aa(a){var b=a._i,e=a._f;return a._locale=a._locale||y(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),o(b)?new n($(b)):(c(e)?xa(a):e?va(a):d(b)?a._d=b:Ba(a),a))}function Ba(b){var f=b._i;void 0===f?b._d=new Date:d(f)?b._d=new Date(+f):"string"==typeof f?da(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ta(b)):"object"==typeof f?ya(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ca(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,za(f)}function Da(a,b,c,d){return Ca(a,b,c,d,!1)}function Ea(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Da();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Fa(){var a=[].slice.call(arguments,0);return Ea("isBefore",a)}function Ga(){var a=[].slice.call(arguments,0);return Ea("isAfter",a)}function Ha(a){var b=B(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=y(),this._bubble()}function Ia(a){return a instanceof Ha}function Ja(a,b){H(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+G(~~(a/60),2)+b+G(~~a%60,2)})}function Ka(a){var b=(a||"").match(ad)||[],c=b[b.length-1]||[],d=(c+"").match(xd)||["-",0,0],e=+(60*d[1])+q(d[2]);return"+"===d[0]?e:-e}function La(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(o(b)||d(b)?+b:+Da(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Da(b).local()}function Ma(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Na(b,c){var d,e=this._offset||0;return null!=b?("string"==typeof b&&(b=Ka(b)),Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ma(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?bb(this,Ya(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ma(this)}function Oa(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Pa(a){return this.utcOffset(0,a)}function Qa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ma(this),"m")),this}function Ra(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ka(this._i)),this}function Sa(a){return a=a?Da(a).utcOffset():0,(this.utcOffset()-a)%60===0}function Ta(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ua(){if("undefined"!=typeof this._isDSTShifted)return this._isDSTShifted;var a={};if(m(a,this),a=Aa(a),a._a){var b=a._isUTC?h(a._a):Da(a._a);this._isDSTShifted=this.isValid()&&r(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Va(){return!this._isUTC}function Wa(){return this._isUTC}function Xa(){return this._isUTC&&0===this._offset}function Ya(a,b){var c,d,e,g=a,h=null;return Ia(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=yd.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:q(h[hd])*c,h:q(h[id])*c,m:q(h[jd])*c,s:q(h[kd])*c,ms:q(h[ld])*c}):(h=zd.exec(a))?(c="-"===h[1]?-1:1,g={y:Za(h[2],c),M:Za(h[3],c),d:Za(h[4],c),h:Za(h[5],c),m:Za(h[6],c),s:Za(h[7],c),w:Za(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=_a(Da(g.from),Da(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ha(g),Ia(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function Za(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function $a(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function _a(a,b){var c;return b=La(b,a),a.isBefore(b)?c=$a(a,b):(c=$a(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function ab(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(ba(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Ya(c,d),bb(this,e,a),this}}function bb(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&E(b,"Date",D(b,"Date")+g*d),h&&X(b,D(b,"Month")+h*d),e&&a.updateOffset(b,g||h)}function cb(a,b){var c=a||Da(),d=La(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse";return this.format(b&&b[f]||this.localeData().calendar(f,this,Da(c)))}function db(){return new n(this)}function eb(a,b){var c;return b=A("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Da(a),+this>+a):(c=o(a)?+a:+Da(a),c<+this.clone().startOf(b))}function fb(a,b){var c;return b=A("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Da(a),+a>+this):(c=o(a)?+a:+Da(a),+this.clone().endOf(b)<c)}function gb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function hb(a,b){var c;return b=A(b||"millisecond"),"millisecond"===b?(a=o(a)?a:Da(a),+this===+a):(c=+Da(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))}function ib(a,b,c){var d,e,f=La(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=A(b),"year"===b||"month"===b||"quarter"===b?(e=jb(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:p(e)}function jb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function kb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function lb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():K(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):K(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function mb(b){var c=K(this,b||a.defaultFormat);return this.localeData().postformat(c)}function nb(a,b){return this.isValid()?Ya({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ob(a){return this.from(Da(),a)}function pb(a,b){return this.isValid()?Ya({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function qb(a){return this.to(Da(),a)}function rb(a){var b;return void 0===a?this._locale._abbr:(b=y(a),null!=b&&(this._locale=b),this)}function sb(){return this._locale}function tb(a){switch(a=A(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function ub(a){return a=A(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function vb(){return+this._d-6e4*(this._offset||0)}function wb(){return Math.floor(+this/1e3)}function xb(){return this._offset?new Date(+this):this._d}function yb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function zb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Ab(){return k(this)}function Bb(){return g({},j(this))}function Cb(){return j(this).overflow}function Db(a,b){H(0,[a,a.length],0,b)}function Eb(a,b,c){return ja(Da([a,11,31+b-c]),b,c).week}function Fb(a){var b=ja(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")}function Gb(a){var b=ja(this,1,4).year;return null==a?b:this.add(a-b,"y")}function Hb(){return Eb(this.year(),1,4)}function Ib(){var a=this.localeData()._week;return Eb(this.year(),a.dow,a.doy)}function Jb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Kb(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Lb(a){return this._weekdays[a.day()]}function Mb(a){return this._weekdaysShort[a.day()]}function Nb(a){return this._weekdaysMin[a.day()]}function Ob(a){var b,c,d;for(this._weekdaysParse=this._weekdaysParse||[],b=0;7>b;b++)if(this._weekdaysParse[b]||(c=Da([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b}function Pb(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Kb(a,this.localeData()),this.add(a-b,"d")):b}function Qb(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Rb(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)}function Sb(a,b){H(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Tb(a,b){return b._meridiemParse}function Ub(a){return"p"===(a+"").toLowerCase().charAt(0)}function Vb(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Wb(a,b){b[ld]=q(1e3*("0."+a))}function Xb(){return this._isUTC?"UTC":""}function Yb(){return this._isUTC?"Coordinated Universal Time":""}function Zb(a){return Da(1e3*a)}function $b(){return Da.apply(null,arguments).parseZone()}function _b(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.call(b,c):d}function ac(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function bc(){return this._invalidDate}function cc(a){return this._ordinal.replace("%d",a)}function dc(a){return a}function ec(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)}function fc(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)}function gc(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function hc(a,b,c,d){var e=y(),f=h().set(d,b);return e[c](f,a)}function ic(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return hc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=hc(a,f,c,e);return g}function jc(a,b){return ic(a,b,"months",12,"month")}function kc(a,b){return ic(a,b,"monthsShort",12,"month")}function lc(a,b){return ic(a,b,"weekdays",7,"day")}function mc(a,b){return ic(a,b,"weekdaysShort",7,"day")}function nc(a,b){return ic(a,b,"weekdaysMin",7,"day")}function oc(){var a=this._data;return this._milliseconds=Wd(this._milliseconds),this._days=Wd(this._days),this._months=Wd(this._months),a.milliseconds=Wd(a.milliseconds),a.seconds=Wd(a.seconds),a.minutes=Wd(a.minutes),a.hours=Wd(a.hours),a.months=Wd(a.months),a.years=Wd(a.years),this}function pc(a,b,c,d){var e=Ya(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function qc(a,b){return pc(this,a,b,1)}function rc(a,b){return pc(this,a,b,-1)}function sc(a){return 0>a?Math.floor(a):Math.ceil(a)}function tc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*sc(vc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=p(f/1e3),i.seconds=a%60,b=p(a/60),i.minutes=b%60,c=p(b/60),i.hours=c%24,g+=p(c/24),e=p(uc(g)),h+=e,g-=sc(vc(e)),d=p(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function uc(a){return 4800*a/146097}function vc(a){return 146097*a/4800}function wc(a){var b,c,d=this._milliseconds;if(a=A(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+uc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(vc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function xc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*q(this._months/12)}function yc(a){return function(){return this.as(a)}}function zc(a){return a=A(a),this[a+"s"]()}function Ac(a){return function(){return this._data[a]}}function Bc(){return p(this.days()/7)}function Cc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Dc(a,b,c){var d=Ya(a).abs(),e=ke(d.as("s")),f=ke(d.as("m")),g=ke(d.as("h")),h=ke(d.as("d")),i=ke(d.as("M")),j=ke(d.as("y")),k=e<le.s&&["s",e]||1===f&&["m"]||f<le.m&&["mm",f]||1===g&&["h"]||g<le.h&&["hh",g]||1===h&&["d"]||h<le.d&&["dd",h]||1===i&&["M"]||i<le.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Cc.apply(null,k)}function Ec(a,b){return void 0===le[a]?!1:void 0===b?le[a]:(le[a]=b,!0)}function Fc(a){var b=this.localeData(),c=Dc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Gc(){var a,b,c,d=me(this._milliseconds)/1e3,e=me(this._days),f=me(this._months);a=p(d/60),b=p(a/60),d%=60,a%=60,c=p(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var Hc,Ic,Jc=a.momentProperties=[],Kc=!1,Lc={},Mc={},Nc=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Oc=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Pc={},Qc={},Rc=/\d/,Sc=/\d\d/,Tc=/\d{3}/,Uc=/\d{4}/,Vc=/[+-]?\d{6}/,Wc=/\d\d?/,Xc=/\d{1,3}/,Yc=/\d{1,4}/,Zc=/[+-]?\d{1,6}/,$c=/\d+/,_c=/[+-]?\d+/,ad=/Z|[+-]\d\d:?\d\d/gi,bd=/[+-]?\d+(\.\d{1,3})?/,cd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,dd={},ed={},fd=0,gd=1,hd=2,id=3,jd=4,kd=5,ld=6;H("M",["MM",2],"Mo",function(){return this.month()+1}),H("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),H("MMMM",0,0,function(a){return this.localeData().months(this,a)}),z("month","M"),N("M",Wc),N("MM",Wc,Sc),N("MMM",cd),N("MMMM",cd),Q(["M","MM"],function(a,b){b[gd]=q(a)-1}),Q(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[gd]=e:j(c).invalidMonth=a});var md="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),nd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),od={};a.suppressDeprecationWarnings=!1;var pd=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,qd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],rd=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],sd=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=aa("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),H(0,["YY",2],0,function(){return this.year()%100}),H(0,["YYYY",4],0,"year"),H(0,["YYYYY",5],0,"year"),H(0,["YYYYYY",6,!0],0,"year"),z("year","y"),N("Y",_c),N("YY",Wc,Sc),N("YYYY",Yc,Uc),N("YYYYY",Zc,Vc),N("YYYYYY",Zc,Vc),Q(["YYYYY","YYYYYY"],fd),Q("YYYY",function(b,c){c[fd]=2===b.length?a.parseTwoDigitYear(b):q(b)}),Q("YY",function(b,c){c[fd]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return q(a)+(q(a)>68?1900:2e3)};var td=C("FullYear",!1);H("w",["ww",2],"wo","week"),H("W",["WW",2],"Wo","isoWeek"),z("week","w"),z("isoWeek","W"),N("w",Wc),N("ww",Wc,Sc),N("W",Wc),N("WW",Wc,Sc),R(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=q(a)});var ud={dow:0,doy:6};H("DDD",["DDDD",3],"DDDo","dayOfYear"),z("dayOfYear","DDD"),N("DDD",Xc),N("DDDD",Tc),Q(["DDD","DDDD"],function(a,b,c){c._dayOfYear=q(a)}),a.ISO_8601=function(){};var vd=aa("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Da.apply(null,arguments);return this>a?this:a}),wd=aa("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Da.apply(null,arguments);return a>this?this:a});Ja("Z",":"),Ja("ZZ",""),N("Z",ad),N("ZZ",ad),Q(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ka(a)});var xd=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var yd=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,zd=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Ya.fn=Ha.prototype;var Ad=ab(1,"add"),Bd=ab(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var Cd=aa("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});H(0,["gg",2],0,function(){return this.weekYear()%100}),H(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Db("gggg","weekYear"),Db("ggggg","weekYear"),Db("GGGG","isoWeekYear"),Db("GGGGG","isoWeekYear"),z("weekYear","gg"),z("isoWeekYear","GG"),N("G",_c),N("g",_c),N("GG",Wc,Sc),N("gg",Wc,Sc),N("GGGG",Yc,Uc),N("gggg",Yc,Uc),N("GGGGG",Zc,Vc),N("ggggg",Zc,Vc),R(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=q(a)}),R(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),H("Q",0,0,"quarter"),z("quarter","Q"),N("Q",Rc),Q("Q",function(a,b){b[gd]=3*(q(a)-1)}),H("D",["DD",2],"Do","date"),z("date","D"),N("D",Wc),N("DD",Wc,Sc),N("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),Q(["D","DD"],hd),Q("Do",function(a,b){b[hd]=q(a.match(Wc)[0],10)});var Dd=C("Date",!0);H("d",0,"do","day"),H("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),H("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),H("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),H("e",0,0,"weekday"),H("E",0,0,"isoWeekday"),z("day","d"),z("weekday","e"),z("isoWeekday","E"),N("d",Wc),N("e",Wc),N("E",Wc),N("dd",cd),N("ddd",cd),N("dddd",cd),R(["dd","ddd","dddd"],function(a,b,c){var d=c._locale.weekdaysParse(a);null!=d?b.d=d:j(c).invalidWeekday=a}),R(["d","e","E"],function(a,b,c,d){b[d]=q(a)});var Ed="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Fd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Gd="Su_Mo_Tu_We_Th_Fr_Sa".split("_");H("H",["HH",2],0,"hour"),H("h",["hh",2],0,function(){return this.hours()%12||12}),Sb("a",!0),Sb("A",!1),z("hour","h"),N("a",Tb),N("A",Tb),N("H",Wc),N("h",Wc),N("HH",Wc,Sc),N("hh",Wc,Sc),Q(["H","HH"],id),Q(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),Q(["h","hh"],function(a,b,c){b[id]=q(a),j(c).bigHour=!0});var Hd=/[ap]\.?m?\.?/i,Id=C("Hours",!0);H("m",["mm",2],0,"minute"),z("minute","m"),N("m",Wc),N("mm",Wc,Sc),Q(["m","mm"],jd);var Jd=C("Minutes",!1);H("s",["ss",2],0,"second"),z("second","s"),N("s",Wc),N("ss",Wc,Sc),Q(["s","ss"],kd);var Kd=C("Seconds",!1);H("S",0,0,function(){return~~(this.millisecond()/100)}),H(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),H(0,["SSS",3],0,"millisecond"),H(0,["SSSS",4],0,function(){return 10*this.millisecond()}),H(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),H(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),H(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),H(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),H(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),z("millisecond","ms"),N("S",Xc,Rc),N("SS",Xc,Sc),N("SSS",Xc,Tc);var Ld;for(Ld="SSSS";Ld.length<=9;Ld+="S")N(Ld,$c);for(Ld="S";Ld.length<=9;Ld+="S")Q(Ld,Wb);var Md=C("Milliseconds",!1);H("z",0,0,"zoneAbbr"),H("zz",0,0,"zoneName");var Nd=n.prototype;Nd.add=Ad,Nd.calendar=cb,Nd.clone=db,Nd.diff=ib,Nd.endOf=ub,Nd.format=mb,Nd.from=nb,Nd.fromNow=ob,Nd.to=pb,Nd.toNow=qb,Nd.get=F,Nd.invalidAt=Cb,Nd.isAfter=eb,Nd.isBefore=fb,Nd.isBetween=gb,Nd.isSame=hb,Nd.isValid=Ab,Nd.lang=Cd,Nd.locale=rb,Nd.localeData=sb,Nd.max=wd,Nd.min=vd,Nd.parsingFlags=Bb,Nd.set=F,Nd.startOf=tb,Nd.subtract=Bd,Nd.toArray=yb,Nd.toObject=zb,Nd.toDate=xb,Nd.toISOString=lb,Nd.toJSON=lb,Nd.toString=kb,Nd.unix=wb,Nd.valueOf=vb,Nd.year=td,Nd.isLeapYear=ia,Nd.weekYear=Fb,Nd.isoWeekYear=Gb,Nd.quarter=Nd.quarters=Jb,Nd.month=Y,Nd.daysInMonth=Z,Nd.week=Nd.weeks=na,Nd.isoWeek=Nd.isoWeeks=oa,Nd.weeksInYear=Ib,Nd.isoWeeksInYear=Hb,Nd.date=Dd,Nd.day=Nd.days=Pb,Nd.weekday=Qb,Nd.isoWeekday=Rb,Nd.dayOfYear=qa,Nd.hour=Nd.hours=Id,Nd.minute=Nd.minutes=Jd,Nd.second=Nd.seconds=Kd,
Nd.millisecond=Nd.milliseconds=Md,Nd.utcOffset=Na,Nd.utc=Pa,Nd.local=Qa,Nd.parseZone=Ra,Nd.hasAlignedHourOffset=Sa,Nd.isDST=Ta,Nd.isDSTShifted=Ua,Nd.isLocal=Va,Nd.isUtcOffset=Wa,Nd.isUtc=Xa,Nd.isUTC=Xa,Nd.zoneAbbr=Xb,Nd.zoneName=Yb,Nd.dates=aa("dates accessor is deprecated. Use date instead.",Dd),Nd.months=aa("months accessor is deprecated. Use month instead",Y),Nd.years=aa("years accessor is deprecated. Use year instead",td),Nd.zone=aa("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Oa);var Od=Nd,Pd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Qd={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Rd="Invalid date",Sd="%d",Td=/\d{1,2}/,Ud={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Vd=s.prototype;Vd._calendar=Pd,Vd.calendar=_b,Vd._longDateFormat=Qd,Vd.longDateFormat=ac,Vd._invalidDate=Rd,Vd.invalidDate=bc,Vd._ordinal=Sd,Vd.ordinal=cc,Vd._ordinalParse=Td,Vd.preparse=dc,Vd.postformat=dc,Vd._relativeTime=Ud,Vd.relativeTime=ec,Vd.pastFuture=fc,Vd.set=gc,Vd.months=U,Vd._months=md,Vd.monthsShort=V,Vd._monthsShort=nd,Vd.monthsParse=W,Vd.week=ka,Vd._week=ud,Vd.firstDayOfYear=ma,Vd.firstDayOfWeek=la,Vd.weekdays=Lb,Vd._weekdays=Ed,Vd.weekdaysMin=Nb,Vd._weekdaysMin=Gd,Vd.weekdaysShort=Mb,Vd._weekdaysShort=Fd,Vd.weekdaysParse=Ob,Vd.isPM=Ub,Vd._meridiemParse=Hd,Vd.meridiem=Vb,w("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===q(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=aa("moment.lang is deprecated. Use moment.locale instead.",w),a.langData=aa("moment.langData is deprecated. Use moment.localeData instead.",y);var Wd=Math.abs,Xd=yc("ms"),Yd=yc("s"),Zd=yc("m"),$d=yc("h"),_d=yc("d"),ae=yc("w"),be=yc("M"),ce=yc("y"),de=Ac("milliseconds"),ee=Ac("seconds"),fe=Ac("minutes"),ge=Ac("hours"),he=Ac("days"),ie=Ac("months"),je=Ac("years"),ke=Math.round,le={s:45,m:45,h:22,d:26,M:11},me=Math.abs,ne=Ha.prototype;ne.abs=oc,ne.add=qc,ne.subtract=rc,ne.as=wc,ne.asMilliseconds=Xd,ne.asSeconds=Yd,ne.asMinutes=Zd,ne.asHours=$d,ne.asDays=_d,ne.asWeeks=ae,ne.asMonths=be,ne.asYears=ce,ne.valueOf=xc,ne._bubble=tc,ne.get=zc,ne.milliseconds=de,ne.seconds=ee,ne.minutes=fe,ne.hours=ge,ne.days=he,ne.weeks=Bc,ne.months=ie,ne.years=je,ne.humanize=Fc,ne.toISOString=Gc,ne.toString=Gc,ne.toJSON=Gc,ne.locale=rb,ne.localeData=sb,ne.toIsoString=aa("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Gc),ne.lang=Cd,H("X",0,0,"unix"),H("x",0,0,"valueOf"),N("x",_c),N("X",bd),Q("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),Q("x",function(a,b,c){c._d=new Date(q(a))}),a.version="2.10.6",b(Da),a.fn=Od,a.min=Fa,a.max=Ga,a.utc=h,a.unix=Zb,a.months=jc,a.isDate=d,a.locale=w,a.invalid=l,a.duration=Ya,a.isMoment=o,a.weekdays=lc,a.parseZone=$b,a.localeData=y,a.isDuration=Ia,a.monthsShort=kc,a.weekdaysMin=nc,a.defineLocale=x,a.weekdaysShort=mc,a.normalizeUnits=A,a.relativeTimeThreshold=Ec;var oe=a;return oe});
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
angular.module('dish', [
  'ionic',
  'ngStorage',
  'ngCordova',
  'firebase',
  'templates',
  'dish.bootstrap',
  'dish.keyboard',
  'dish.input',
  'dish.button',
  'dish.cards',
  'dish.sheet',
  'dish.alert',
  'dish.modal',
  'dish.slider',
  'dish.gallery',
  'dish.more',
  'dish.preview',
  'dish.tray',
  'dish.drawer',
  'dish.photo',
  'dish.forgot',
  'dish.login',
  'dish.signup',
  'dish.home',
  'dish.food',
  'dish.cook',
  'dish.profile',
  'dish.favorites',
  'dish.payment',
  'dish.transactions',
  'dish.promotions',
  'dish.help',
  'dish.settings'
]);
(function() {
	'use strict';

	angular.module('dish.bootstrap', []);
})();
angular.module('dish.bootstrap')

.config(function($provide) {
	$provide.decorator('$firebaseArray', function($delegate, $timeout, $firebaseUtils) {
		var _added = $delegate.prototype.$$added;
		var _updated = $delegate.prototype.$$updated;
		var _process = $delegate.prototype.$$process;
		var _notify = $delegate.prototype.$$notify;
		var cachedValues = [];

		$delegate.prototype.$$added = function(snap) {
			var self = this;
			var added = _added.call(self, snap);
			cachedValues.push(angular.copy(added));
			return added;
		};

		//We're overriding this function in our decorator to get some smart diffing functionality only on the client side as firebase doesn't support it by default, but we can figure out what elements have changed and how to animate them by comparing against our local cachedValues and determining the difference accordingly, then running our custom animate function that will allow us to animate the changed value's contain however we want.
		$delegate.prototype.$$updated = function(snap) {
			//console.log('updated called', this, snap);
			var self = this;
			var snapKey = snap.key();
			var record = self.$getRecord(snapKey);
			var val = snap.val();
			//Find the cachedValue from our cachedValues list
			var cachedVal = _.findWhere(cachedValues, {
				$id: snapKey
			});
			//Compare the current val's values against the cachedVals to determine what values have changed
			/*var traverse = function(collection) {
				var result = [];
				_.filter(collection, function(value, key, obj) {
					console.log('value', value, key, cachedVal[key]);
					//Return if the new val matches the cachedVal, this will leave us with a new object that shows what values have changed
					if (_.isObject(value) || _.isArray(value)) {
						traverse(value);
					}
					//console.log('result', result);
					if (value !== cachedVal[key]) {
						console.log('different', value);
						result.push(key);
					} else {
						//If it's not a match, update the cachedVal key to reflect the new value in the cachedValues array
						cachedVal[key] = value;
					}
				});

				return result;
			};*/

			var diff;

			//TODO: Make this function way less ugly, and potentially look into a way to do it recursively so that we can clean it up
			var compare = function(s, t) {
				var result = []; //For returning the changed values/keys
				if (typeof s !== typeof t) {
					console.log("two objects not the same type");
					return;
				}
				if (typeof s !== "object") {
					console.log('arguments are not typeof === "object"');
					return;
				}
				for (var prop in s) {
					if (s.hasOwnProperty(prop)) {
						if (t.hasOwnProperty(prop)) {
							//Handle deep nested comparisons
							if (angular.isObject(s[prop]) || angular.isArray(s[prop])) {
								for (var nestedProp in s[prop]) {
									if (s[prop].hasOwnProperty(nestedProp)) {
										if (t[prop].hasOwnProperty(nestedProp)) {
											//console.log('nestedProp match', t[prop][nestedProp]);
											if (!angular.equals(s[prop][nestedProp], t[prop][nestedProp])) {
												//console.log('nested property does not match', t[prop][nestedProp]);
												//Check if nestedProp value is an object
												if (angular.isObject(s[prop][nestedProp])) {
													for (var deepProp in s[prop][nestedProp]) {
														if (s[prop][nestedProp].hasOwnProperty(deepProp)) {
															if (t[prop][nestedProp].hasOwnProperty(deepProp)) {
																if (!angular.equals(s[prop][nestedProp][deepProp], t[prop][nestedProp][deepProp])) {
																	console.log('deep property does not match', deepProp);
																	result.push(deepProp);
																	//Update the deep properties to the newest value
																	t[prop][nestedProp][deepProp] = s[prop][nestedProp][deepProp];
																}
															}
														}
													}
												}
											}
										}
									}
									//console.log('nestedProp', nestedProp);
								}
							} else if (!angular.equals(s[prop], t[prop])) {
								//Do a shallow comparison
								console.log("property " + prop + " does not match");
								result.push(prop);
								//Update the cached value
								console.log('details', s[prop], t[prop]);
								t[prop] = s[prop];
							}
						} else {
							console.log("second object does not have property " + prop);
						}
					}
				}
				// now verify that t doesn't have any properties
				// that are missing from s
				for (prop in t) {
					if (t.hasOwnProperty(prop)) {
						if (!s.hasOwnProperty(prop)) {
							console.log("first object does not have property " + prop);
						}
					}
				}
				return result;
			}

			diff = compare(val, cachedVal);

			console.log('diff', diff);

			/*var diff = _.omit(val, function(value, key, obj) {
				console.log('value', value, key, cachedVal[key]);
				//Return if the new val matches the cachedVal, this will leave us with a new object that shows what values have changed
				if (value === cachedVal[key]) {
					return true;
				} else {
					//If it's not a match, update the cachedVal key to reflect the new value in the cachedValues array
					cachedVal[key] = value;
				}
			});*/
			//The diff shows us what keys were changed from firebase, as well as what the latest value is.
			//console.log('updated diff', diff);

			//Call our custom animate function to smoothly animate in the changes instead of running the process as normal (this doesn't trigger a $$notify right now, but we can always add that later if we need to pretty easily)
			return self.$$animate(snap, diff);
		};

		//We use this function instead of the normal firebase flow so that we can smoothly animate changes in that come from firebase instead of having them suddenly change within the DOM
		$delegate.prototype.$$animate = function(snap, diff) {
			var self = this;
			console.log('animate', self, snap, diff);
			var changed = false;
			var rec = self.$getRecord($firebaseUtils.getKey(snap));
			if (angular.isObject(rec)) {
				//Set the diff immediately on the record, so that we can prepare for animating before we update the value
				rec.animating = diff;
				// apply changes to the record
				$timeout(function() {
					rec.animating = null;
					changed = $firebaseUtils.updateRec(rec, snap);
					$firebaseUtils.applyDefaults(rec, self.$$defaults);
				}, 500);
			}
			return changed;
		};

		return $delegate;
	});
})
angular.module('dish.bootstrap')

.constant('FURL', 'https://dishapp.firebaseio.com/');
(function() {
	'use strict';

	function DishBootstrapController($scope, $ionicPlatform, $timeout, $log, Auth, dishModalService) {

		$ionicPlatform.ready(function() {
			$timeout(function() {
				if (Auth.signedIn() === false) {
					$log.log('show shit');
				} else {
					console.log('Auth', Auth.user);
					$scope.currentUser = Auth.user;
				}
			});
		});
	}

	DishBootstrapController.$inject = ['$scope', '$ionicPlatform', '$timeout', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.bootstrap')
		.controller('dishBootstrapController', DishBootstrapController);
})();
angular.module('dish.bootstrap')

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			window.cordova.plugins.Keyboard.disableScroll(true);
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});
(function() {
	'use strict';

	angular.module('dish.keyboard', []);
})();
(function() {
	'use strict';

	function DishKeyboardDirective($window, $q, $timeout) {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				//console.log('attrs', attrs, elm);
				//Maintain focus whenever it gets lost
				elm[0].addEventListener('focusout', function(e) {
					if (window.disableConstantFocus) {
						return;
					}
					//console.log('focus lost', e);
					if (e.relatedTarget && e.relatedTarget.tagName === 'INPUT') {
						//console.log('don\'t refocus');
						return;
					} else {
						//console.log('refocus');
						elm[0].focus();
					}
				});

				/*ctrl.scope.$on('$ionicView.beforeEnter', function viewEnter(e) {
					console.log('$ionicView.beforeEnter', attrs.constantFocus);
					if (attrs.constantFocus === 'first') {
						document.getElementById('maintainKeyboard').focus();
					}
				});*/

				/*ctrl.scope.$on('$ionicView.afterEnter', function viewEnter(e) {
					//console.log('$ionicView.afterEnter', attrs.constantFocus);
					//if (attrs.constantFocus === 'first') {
					elm[0].focus();
					//}
				});*/

				/*scope.$on('$ionicView.loaded', function viewEnter(e) {
					console.log('$ionicView.loaded', attrs.constantFocus);
				});

				ctrl.scope.$on('$ionicView.enter', function viewEnter(e) {
					console.log('$ionicView.enter', attrs.constantFocus);
					if (attrs.constantFocus === 'first') {
						console.log('focus first');
						elm[0].focus();
					}
				});

				scope.$on('$ionicView.leave', function viewEnter(e) {
					console.log('$ionicView.leave', attrs.constantFocus);
				});

				scope.$on('$ionicView.beforeEnter', function viewEnter(e) {
					console.log('$ionicView.beforeEnter', attrs.constantFocus);
					document.getElementById('maintainKeyboard').focus();
				});

				scope.$on('$ionicView.beforeLeave', function viewEnter(e) {
					console.log('$ionicView.beforeLeave', attrs.constantFocus);
					//if (attrs.constantFocus === 'first') {
					//document.getElementById('maintainKeyboard').focus();
					//}
				});

				scope.$on('$ionicView.afterEnter', function viewEnter(e) {
					console.log('$ionicView.afterEnter', attrs.constantFocus);
				});

				scope.$on('$ionicView.afterLeave', function viewEnter(e) {
					console.log('$ionicView.afterLeave', attrs.constantFocus);
				});

				scope.$on('$ionicView.unloaded', function viewEnter(e) {
					console.log('$ionicView.unloaded', attrs.constantFocus);
				});*/
			}
		};
	};

	DishKeyboardDirective.$inject = ['$window', '$q', '$timeout'];

	angular.module('dish.keyboard')
		.directive('constantFocus', DishKeyboardDirective);
})();
(function() {
	'use strict';

	function DishKeyboardService($window, $q, $timeout) {
		var _self = this;

		_self.close = function _close() {
			if (window.cordova) {
				window.disableConstantFocus = true;
				ionic.keyboard.disable();
				cordova.plugins.Keyboard.close();
				$timeout(function() {
					ionic.keyboard.enable();
					window.disableConstantFocus = false;
				}, 400);
			}
		};

		_self.focusInput = function _focusInput(inputId, delay) {
			var input;
			var focusTime = 0;
			if (inputId) {
				if (delay) {
					focusTime = 400;
				}
				$timeout(function() {
					input = document.querySelector('#' + inputId);
					if (input) {
						input.focus();
					}
				}, focusTime);
			}
		}
	};

	DishKeyboardService.$inject = ['$window', '$q', '$timeout'];

	angular.module('dish.keyboard')
		.service('dishKeyboardService', DishKeyboardService);
})();
(function() {
	'use strict';

	angular.module('dish.input', []);
})();
(function() {
	'use strict';

	function DishInputDirective($window, $q, $ionicPopup) {
		var invalid;
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope: {
				ngModel: '='
			},
			replace: true,
			link: function(scope, elm, attrs, ctrl) {
				//Get the last section of the model and use that as the input name
				scope.inputName = attrs.ngModel.split('.').pop();
				scope.placeholder = attrs.placeholder;
				scope.id = attrs.id;
				console.log('attrs', attrs.readonly);
				if (attrs.readonly) {
					scope.readonly = true;
				} else {
					scope.readonly = false;
				}

				//Based on the input name, assign the proper field type accordingly if it's a password or email
				switch (scope.inputName) {
					case 'email':
						scope.inputType = 'email';
						scope.minLength = 0;
						scope.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
						break;
					case 'password':
						scope.inputType = 'password';
						scope.minLength = 8;
						break;
					case 'price':
						scope.inputType = 'number';
						//scope.minLength = 9;
						scope.pattern = '[0-9]*';
						break;
					case 'portions':
						scope.inputType = 'number';
						//scope.minLength = 0;
						//scope.maxLength = 3;
						scope.pattern = '[0-9]*';
						break;
					default:
						scope.inputType = 'text';
						scope.minLength = 0;
				}
			},
			template: '<label class="item item-input dish-input"><input id="{{id}}" name="{{inputName}}" type="{{inputType}}" autocomplete="off" autocorrect="off" autocapitalize="off" required="true" ng-model="ngModel" pattern="{{pattern}}" ng-minlength="minLength" placeholder="{{placeholder}}" ng-readonly="readonly"><i class="error icon ion-ios-close assertive"></i></label>'
		};
	}

	DishInputDirective.$inject = ['$window', '$q', '$ionicPopup'];

	angular.module('dish.input')
		.directive('dishInput', DishInputDirective);
})();
(function() {
	'use strict';

	angular.module('dish.button', []);
})();
(function() {
	'use strict';

	function DishButtonDirective($window, $q) {
		var invalid;
		return {
			restrict: 'AE',
			replace: true,
			link: function(scope, elm, attrs, ctrl) {
				//Get the last section of the model and use that as the input name
				//console.log('buttonText', attrs.text);
				attrs.$observe('text', function() {
					console.log('buttonText', attrs.text);
					scope.buttonText = attrs.text;
				});
				if (attrs.type) {
					scope.buttonType = 'button-' + attrs.type;
				} else {
					scope.buttonType = 'button-positive';
				}
			},
			template: '<button class="dish-button button button-full {{buttonType}}">{{buttonText}}</button>'
		};
	}

	DishButtonDirective.$inject = ['$window', '$q'];

	angular.module('dish.button')
		.directive('dishButton', DishButtonDirective);
})();
(function() {
	'use strict';

	angular.module('dish.cards', []);
})();
(function() {
	'use strict';

	function DishCardsService($log) {
		var self = this;

		self.disabled = false;
		self.activeCard = false;

		self.disable = function() {
			//$log.log('disableCards');
			self.disabled = true;
		};

		self.enable = function() {
			//$log.log('enableCards');
			self.disabled = false;
		};

		self.setActiveCard = function(active) {
			self.activeCard = active;
		}
	};

	DishCardsService.$inject = ['$log'];

	angular.module('dish.cards')
		.service('dishCardsService', DishCardsService);
})();
(function() {
	'use strict';

	var ONE_PX_TRANSPARENT_IMG_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	var DEFAULT_SCALE = 0.8;
	var DEFAULT_GROWTH_FACTOR = 0.02;
	var DEFAULT_CARD_WIDTH = window.innerWidth - 20;
	var DEFAULT_CARD_HEIGHT = window.innerHeight - 20;
	var DEFAULT_X_MARGIN = 60;
	var DEFAULT_Y_MARGIN = 70;
	// (left) space between apps
	var DEFAULT_LEFT_GAP = 4;
	// (right) space after apps are moved
	var DEFAULT_RIGHT_GAP = DEFAULT_CARD_WIDTH * 0.1;

	CardRepeatDirective.$inject = ['$log', '$parse', '$$rAF', '$rootScope', 'dishCardsService'];

	function CardRepeatDirective($log, $parse, $$rAF, $rootScope, dishCardsService) {
		var invalid;
		var CARD_DISABLED = dishCardsService.disabled;
		return {
			restrict: 'A',
			replace: true,
			transclude: 'element',
			link: postLink
		};

		function postLink(scope, element, attr, ctrl, transclude) {
			var node = element[0];
			var repeatExpr = attr.cardRepeat;
			var match = repeatExpr.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
			if (!match) {
				throw new Error("card-repeat expected expression in form of '_item_ in " +
					"_collection_[ track by _id_]' but got '" + attr.cardRepeat + "'.");
			}
			var keyExpr = match[1];
			var listExpr = match[2];
			var listGetter = $parse(listExpr);
			var data = [];

			var cardsLeaving = [];
			var cardsEntering = [];
			var cardsShownMap = {};
			var isLayoutReady = false;

			//Card Motion Settings
			var context = new MotionContext();
			var solver = context.solver();
			var lastCard = null;
			var cards = [];
			var CARD_WIDTH = DEFAULT_CARD_WIDTH * DEFAULT_SCALE;
			var CARD_HEIGHT = DEFAULT_CARD_HEIGHT * DEFAULT_SCALE;

			$log.log('hi', listGetter, listExpr, keyExpr);

			//Watch the collection for new values
			scope.$watchCollection(listGetter, function(newValue) {
				//$log.log('cardChanges', newValue);
				data = newValue || (newValue = []);
				if (!angular.isArray(newValue)) {
					throw new Error("card-repeat expected an array for '" + listExpr + "', " +
						"but got a " + typeof value);
				}
				// Wait for this digest to end before refreshing everything.
				scope.$$postDigest(function() {
					//$log.log('data', data);
					RefreshLayout();
				});
			});

			function RefreshLayout() {
				// Create the pool of items for reuse, setting the size to (estimatedItemsOnScreen) * 2,
				// plus the size of the renderBuffer.
				if (!isLayoutReady) {
					//$log.log('RefreshLayout');
					//var poolSize = Math.max(5, renderBuffer * 3);
					var poolSize = Math.max(5);
					//$log.log('poolSize', poolSize);
					for (var i = 0; i < poolSize; i++) {
						cards.push(new RepeatCard(i));
					}
					// Modify CSS properties to maintain a clear view of the cards
					for (var i = 0; i < cards.length - 1; i++) {
						attachObserver(cards[i], cards[i + 1]);
					};

					//Once we've finished attaching observers and converting our cards into a stack we can manipulate, reverse the stack so that we show the data at the top of the card stack, not the bottom.
					cards.reverse();

					var handler = new Manipulator(lastCard.x, node.parentNode, 'x');
					$log.log('handler', handler, node.parentNode);
					context.addManipulator(handler);

					isLayoutReady = true;
				}
				forceRerender(true);
			}

			function forceRerender() {
				return render(true);
			}

			function render(forceRerender) {
				var card;
				var i;
				var currentScope;
				for (i = 0; i < data.length; i++) {
					card = cards[i];
					currentScope = card.scope;
					currentScope.$index = i;
					currentScope[keyExpr] = data[i];
					currentScope.$first = (i === 0);
					currentScope.$last = (i === (data.length - 1));
					currentScope.$middle = !(currentScope.$first || currentScope.$last);
					currentScope.$odd = !(currentScope.$even = (i & 1) === 0);

					//$log.log('card', currentScope);

					cardsEntering.push(card);

					if (currentScope.$$disconnected) {
						ionic.Utils.reconnectScope(card.scope);
					}
				}

				if (forceRerender) {
					//$log.log('forceRerender', cardsEntering, cardsEntering.length);
					var rootScopePhase = $rootScope.$$phase;
					while (cardsEntering.length) {
						card = cardsEntering.pop();
						if (!rootScopePhase) card.scope.$digest();
					}
				} else {
					//$log.log('render normal');
					digestEnteringItems();
				}
			}

			function digestEnteringItems() {
				var card;
				if (digestEnteringItems.running) return;
				digestEnteringItems.running = true;

				//$log.log('digestEnteringItems');

				$$rAF(function process() {
					var rootScopePhase = $rootScope.$$phase;
					while (cardsEntering.length) {
						card = cardsEntering.pop();
						//$log.log('digest card', card.scope);
						if (!rootScopePhase) card.scope.$digest();
					}
					digestEnteringItems.running = false;
				});
			}

			function RepeatCard(i) {
				var self = this;
				self.scope = scope.$new();
				transclude(self.scope, function(clone) {
					self.element = clone;
					self.element.data('$$cardRepeatItem', self);
					// TODO destroy
					self.node = clone[0];

					self.card = new Box(self.node);
					var card = self.card;
					var growthFactor = DEFAULT_GROWTH_FACTOR;
					var h = CARD_HEIGHT * growthFactor;
					var w = CARD_WIDTH * growthFactor;

					/*h = CARD_HEIGHT * (growthFactor / 2),
					w = CARD_WIDTH * growthFactor;*/

					//$log.log('card', cards, self, CARD_HEIGHT, h, CARD_WIDTH, w, growthFactor);

					// Create the constraints for the cards
					card.x = new c.Variable({
						name: "card-" + i + "-x"
					});
					card.right = new c.Variable({
						name: "card-" + i + "-right"
					});
					card.edge = new c.Variable({
						name: "card-" + i + "-right-edge"
					});
					card.y = DEFAULT_Y_MARGIN - h;
					card.bottom = CARD_HEIGHT + h;

					// App's width
					solver.add(eq(card.right, c.plus(card.x, CARD_WIDTH + w), medium));

					// App's right gap
					solver.add(eq(card.edge, c.plus(card.right, DEFAULT_RIGHT_GAP), medium));

					// Pin the first card to 0, and add a motion constraint
					if (i === 0) {
						solver.add(eq(card.x, 0, weak, 100));
						context.addMotionConstraint(new MotionConstraint(card.x, ">=", 0));
						context.addMotionConstraint(new MotionConstraint(card.x, "<=", DEFAULT_X_MARGIN));
					} else {
						// The card mustn't reveal any space between it and the previous card.
						solver.add(leq(card.x, cards[i - 1].card.edge, medium, 0));

						// Make the card tend toward the left (zero). Use a lower priority than
						// the first card so the solver will prefer for the first card to be
						// zero than any of the additional cards.
						solver.add(eq(card.x, 0, weak, 0));

						// The card must be to the right of the previous card's left edge, plus the left gap
						solver.add(geq(card.x, c.plus(cards[i - 1].card.x, DEFAULT_LEFT_GAP), medium, 0));
					}

					context.addBox(card);

					lastCard = card;

					// Batch style setting to lower repaints
					//self.node.style[ionic.CSS.TRANSFORM] = 'translate3d(-9999px,-9999px,0)';
					//self.node.style.cssText += ' height: 0px; width: 0px;';
					//$log.log('self', self, self.scope);
					ionic.Utils.disconnectScope(self.scope);
					node.parentNode.appendChild(self.node);
					self.images = clone[0].getElementsByTagName('img');
				});
			}

			function attachObserver(current, next) {
				var offset = 100;
				var currentCard = current.card;
				var nextCard = next.card;
				var $current = currentCard.element();
				var $next = nextCard.element();
				var observer = new MutationObserver(function(mutations) {
					CARD_DISABLED = dishCardsService.disabled;
					if (CARD_DISABLED) return;
					var mutation = mutations[mutations.length - 1];
					if (mutation.attributeName === "style") {

						// e.g., translate3d(4px, 64px, 0px)
						var transform = mutation.target.style.transform,
							values = transform
							.replace(/translate3d\(|\s|\)/g, "")
							.split(","),
							distance = nextCard.x.value - currentCard.x.value,
							factor = (distance / offset);

						factor = factor > 1 ? 1 : factor;

						var opacity = factor,
							blur = "blur(" + ((1 - factor) * 10) + "px)";

						//$log.log('currentCard', CARD_DISABLED);

						//$log.log('styles', transform, distance, factor, opacity);

						render();

						/*$current.style["-webkit-filter"] = blur;
						$current.style["-moz-filter"] = blur;
						$current.style["-o-filter"] = blur;
						$current.style.filter = blur;*/

						$current.style.opacity = opacity;
					}
				});

				observer.observe($next, {
					attributes: true,
					childList: false,
					characterData: false
				});
			};
		}
	}

	angular.module('dish.cards')
		.directive('cardRepeat', CardRepeatDirective);
})();
'use strict';

/*
Copyright 2014 Ralph Thomas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function() {
    // List of all listeners; dom element and listener object.
    var listeners = {};
    var listenerSequence = 0;
    var registeredGlobalListener = false;

    function recurseAndAddListenerToChild(el, descendants, listener) {
        descendants.push(el.id);
        var children = el.childNodes;
        //console.log('el', el, children);
        for (var i = 0; i < children.length; i++) {
            var key = 'touch-listener-' + (listenerSequence++);
            listeners[key] = listener;
            children[i].listenerKey = key;
            if (children[i].nodeType == 1) {
                recurseAndAddListenerToChild(children[i], descendants, listener);
            }
        }
    }

    function addListener(domObject, listener) {
        //console.log('addListener', domObject, listener);
        var key = 'touch-listener-' + (listenerSequence++);
        var allChildren = [];
        listeners[key] = listener;
        domObject.listenerKey = key;
        //Iterate down the children of the domObject and add listeners to them as well so that we can account for drag events everywhere within the element, and not play well with click events too.
        var children = domObject.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            recurseAndAddListenerToChild(child, allChildren, listener);
        }
    }

    function findListener(domObject) {
        //console.log('findListener', domObject);
        var listener;
        if (domObject && domObject.listenerKey && listeners.hasOwnProperty(domObject.listenerKey)) {
            listener = listeners[domObject.listenerKey];
        }
        //Iterate down the children of the domObject and add listeners to them as well so that we can account for drag events everywhere
        var children = domObject.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child && child.listenerKey && listeners.hasOwnProperty(child.listenerKey)) {
                listener = listeners[child.listenerKey];
            }
            //console.log('children', children, key, listeners);
        }
        //console.log('listener', listener);
        return listener;
    }

    function registerGlobalListener() {
        if (registeredGlobalListener) return;
        registeredGlobalListener = true;

        //console.log('registerGlobalListener');

        var touchInfo = {
            trackingID: -1,
            maxDy: 0,
            maxDx: 0
        };

        function shouldDisable() {
            //Grab the dishCardService from angular and see if it's disabled or not before we determine whether to proceed with the event
            var inject = angular.element(document.body).injector();
            var service = inject.get('dishCardsService');
            var disabled = service.disabled;

            return disabled;
        }

        function touchStart(e) {
            //Grab the dishCardService from angular and see if it's disabled or not before we determine whether to proceed with the event
            var disabled = shouldDisable();
            if (disabled) return;
            if (touchInfo.trackingID != -1) return;
            //console.log('touchStart', e.target);
            var listener = findListener(e.target);
            if (!listener) return;
            //console.log('touchStart', e, listener, touchInfo);

            //return false;

            //console.log('passed');

            e.preventDefault();
            if (e.type == 'touchstart') {
                touchInfo.trackingID = e.changedTouches[0].identifier;
                touchInfo.x = e.changedTouches[0].pageX;
                touchInfo.y = e.changedTouches[0].pageY;
            } else {
                touchInfo.trackingID = 'mouse';
                touchInfo.x = e.screenX;
                touchInfo.y = e.screenY;
            }
            touchInfo.maxDx = 0;
            touchInfo.maxDy = 0;
            touchInfo.historyX = [0];
            touchInfo.historyY = [0];
            touchInfo.historyTime = [e.timeStamp];
            touchInfo.listener = listener;

            if (listener.onTouchStart)
                listener.onTouchStart();
        }

        function findDelta(e) {
            if (e.type == 'touchmove' || e.type == 'touchend') {
                for (var i = 0; i < e.changedTouches.length; i++) {
                    if (e.changedTouches[i].identifier == touchInfo.trackingID) {
                        return {
                            x: e.changedTouches[i].pageX - touchInfo.x,
                            y: e.changedTouches[i].pageY - touchInfo.y
                        };
                    }
                }
            } else {
                return {
                    x: e.screenX - touchInfo.x,
                    y: e.screenY - touchInfo.y
                };
            }
            return null;
        }

        function touchMove(e) {
            //Grab the dishCardService from angular and see if it's disabled or not before we determine whether to proceed with the event
            var disabled = shouldDisable();
            if (disabled) return;
            if (touchInfo.trackingID == -1) return;
            e.preventDefault();
            var delta = findDelta(e);
            if (!delta) return;
            touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y));
            touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x));

            // This is all for our crummy velocity computation method. We really
            // should do least squares or anything at all better than just taking
            // the difference between two random samples.
            touchInfo.historyX.push(delta.x);
            touchInfo.historyY.push(delta.y);
            touchInfo.historyTime.push(e.timeStamp);
            while (touchInfo.historyTime.length > 10) {
                touchInfo.historyTime.shift();
                touchInfo.historyX.shift();
                touchInfo.historyY.shift();
            }

            if (touchInfo.listener && touchInfo.listener.onTouchMove)
                touchInfo.listener.onTouchMove(delta.x, delta.y, e.timeStamp);
        }

        function touchEnd(e) {
            //Grab the dishCardService from angular and see if it's disabled or not before we determine whether to proceed with the event
            var disabled = shouldDisable();
            if (disabled) return;
            if (touchInfo.trackingID == -1) return;
            e.preventDefault();
            var delta = findDelta(e);
            if (!delta) return;

            var listener = touchInfo.listener;
            touchInfo.trackingID = -1;
            touchInfo.listener = null;

            // Compute velocity in the most atrocious way. Walk backwards until we find a sample that's 30ms away from
            // our initial sample. If the samples are too distant (nothing between 30 and 50ms away then blow it off
            // and declare zero velocity. Same if there are no samples.
            var sampleCount = touchInfo.historyTime.length;
            var velocity = {
                x: 0,
                y: 0
            };
            if (sampleCount > 2) {
                var idx = touchInfo.historyTime.length - 1;
                var lastTime = touchInfo.historyTime[idx];
                var lastX = touchInfo.historyX[idx];
                var lastY = touchInfo.historyY[idx];
                var found = false;
                while (idx > 0) {
                    idx--;
                    var t = touchInfo.historyTime[idx];
                    var dt = lastTime - t;
                    if (dt > 30 && dt < 50) {
                        // Ok, go with this one.
                        velocity.x = (lastX - touchInfo.historyX[idx]) / (dt / 1000);
                        velocity.y = (lastY - touchInfo.historyY[idx]) / (dt / 1000);
                        break;
                    }
                }
            }
            touchInfo.historyTime = [];
            touchInfo.historyX = [];
            touchInfo.historyY = [];

            if (listener && listener.onTouchEnd)
                listener.onTouchEnd(delta.x, delta.y, velocity);
        }

        document.body.addEventListener('touchstart', touchStart, false);
        document.body.addEventListener('touchmove', touchMove, false);
        document.body.addEventListener('touchend', touchEnd, false);
        document.body.addEventListener('mousedown', touchStart, false);
        document.body.addEventListener('mousemove', touchMove, false);
        document.body.addEventListener('mouseup', touchEnd, false);
    }

    //
    // This is a utility to normalize single-point touch events and mouse
    // events and implement very simple velocity tracking on top. To do
    // mouse we *must* install a global handler (otherwise you can quickly
    // drag the mouse out of the object you're dragging and you lose the
    // event stream), so just for symmetry we do the same with touch events.
    //
    // If I was writing a bigger app then I'd hope it was touch only and
    // would register touch handlers directly on the objects that need them
    // (although typically you have to do some global event handling anyway...).
    //
    // The `listener` object should implement `onTouchStart`, `onTouchMove` and
    // `onTouchEnd` methods.
    //
    function addTouchOrMouseListener(element, listener) {
        //console.log('addTouchOrMouseListener', element);
        registerGlobalListener();
        addListener(element, listener);
    }


    window.addTouchOrMouseListener = addTouchOrMouseListener;
})();
/**
 * Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
 * Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
 *
 * Use of this source code is governed by http://www.apache.org/licenses/LICENSE-2.0
 *
 * This is a compiled version of Cassowary/JS. For source versions or to
 * contribute, see the github project:
 *
 *  https://github.com/slightlyoff/cassowary-js-refactor
 *
 */

(function() {
!function(a){"use strict";try{!function(){}.bind(a)}catch(b){Object.defineProperty(Function.prototype,"bind",{value:function(a){var b=this;return function(){return b.apply(a,arguments)}},enumerable:!1,configurable:!0,writable:!0})}var c="undefined"!=typeof a.HTMLElement,d=function(a){for(var b=null;a&&a!=Object.prototype;){if(a.tagName){b=a.tagName;break}a=a.prototype}return b||"div"},e=1e-8,f={},g=function(a,b){if(a&&b){if("function"==typeof a[b])return a[b];var c=a.prototype;if(c&&"function"==typeof c[b])return c[b];if(c!==Object.prototype&&c!==Function.prototype)return"function"==typeof a.__super__?g(a.__super__,b):void 0}},h=a.c=function(){return h._api?h._api.apply(this,arguments):void 0};h.debug=!1,h.trace=!1,h.verbose=!1,h.traceAdded=!1,h.GC=!1,h.GEQ=1,h.LEQ=2,h.inherit=function(b){var e=null,g=null;b["extends"]&&(g=b["extends"],delete b["extends"]),b.initialize&&(e=b.initialize,delete b.initialize);var i=e||function(){};Object.defineProperty(i,"__super__",{value:g?g:Object,enumerable:!1,configurable:!0,writable:!1}),b._t&&(f[b._t]=i);var j=i.prototype=Object.create(g?g.prototype:Object.prototype);if(h.extend(j,b),c&&g&&g.prototype instanceof a.HTMLElement){var k=i,l=d(j),m=function(a){return a.__proto__=j,k.apply(a,arguments),j.created&&a.created(),j.decorate&&a.decorate(),a};this.extend(j,{upgrade:m}),i=function(){return m(a.document.createElement(l))},i.prototype=j,this.extend(i,{ctor:k})}return i},h.own=function(b,c,d){return Object.getOwnPropertyNames(b).forEach(c,d||a),b},h.extend=function(a,b){return h.own(b,function(c){var d=Object.getOwnPropertyDescriptor(b,c);try{"function"==typeof d.get||"function"==typeof d.set?Object.defineProperty(a,c,d):"function"==typeof d.value||"_"===c.charAt(0)?(d.writable=!0,d.configurable=!0,d.enumerable=!1,Object.defineProperty(a,c,d)):a[c]=b[c]}catch(e){}}),a},h.traceprint=function(a){h.verbose&&console.log(a)},h.fnenterprint=function(a){console.log("* "+a)},h.fnexitprint=function(a){console.log("- "+a)},h.assert=function(a,b){if(!a)throw new h.InternalError("Assertion failed: "+b)};var i=function(a){return"number"==typeof a?h.Expression.fromConstant(a):a instanceof h.Variable?h.Expression.fromVariable(a):a};h.plus=function(a,b){return a=i(a),b=i(b),a.plus(b)},h.minus=function(a,b){return a=i(a),b=i(b),a.minus(b)},h.times=function(a,b){return a=i(a),b=i(b),a.times(b)},h.divide=function(a,b){return a=i(a),b=i(b),a.divide(b)},h.approx=function(a,b){return a===b?!0:(a=+a,b=+b,0==a?Math.abs(b)<e:0==b?Math.abs(a)<e:Math.abs(a-b)<Math.abs(a)*e)};var j=1;h._inc=function(){return j++},h.parseJSON=function(a){return JSON.parse(a,function(a,b){if("object"!=typeof b||"string"!=typeof b._t)return b;var c=b._t,d=f[c];if(c&&d){var e=g(d,"fromJSON");if(e)return e(b,d)}return b})},"function"==typeof define&&define.amd?define(h):"object"==typeof module&&module.exports?module.exports=h:a.c=h}(this),function(a){"use strict";var b=function(a,b){Object.keys(a).forEach(function(c){b[c]=a[c]})},c={};a.HashTable=a.inherit({initialize:function(){this.size=0,this._store={},this._keyStrMap={},this._deleted=0},set:function(a,b){var c=a.hashCode;"undefined"==typeof this._store[c]&&this.size++,this._store[c]=b,this._keyStrMap[c]=a},get:function(a){if(!this.size)return null;a=a.hashCode;var b=this._store[a];return"undefined"!=typeof b?this._store[a]:null},clear:function(){this.size=0,this._store={},this._keyStrMap={}},_compact:function(){var a={};b(this._store,a),this._store=a},_compactThreshold:100,_perhapsCompact:function(){this._size>30||this._deleted>this._compactThreshold&&(this._compact(),this._deleted=0)},"delete":function(a){a=a.hashCode,this._store.hasOwnProperty(a)&&(this._deleted++,delete this._store[a],this.size>0&&this.size--)},each:function(a,b){if(this.size){this._perhapsCompact();var c=this._store,d=this._keyStrMap;for(var e in this._store)this._store.hasOwnProperty(e)&&a.call(b||null,d[e],c[e])}},escapingEach:function(a,b){if(this.size){this._perhapsCompact();for(var d=this,e=this._store,f=this._keyStrMap,g=c,h=Object.keys(e),i=0;i<h.length;i++)if(function(c){d._store.hasOwnProperty(c)&&(g=a.call(b||null,f[c],e[c]))}(h[i]),g){if(void 0!==g.retval)return g;if(g.brk)break}}},clone:function(){var c=new a.HashTable;return this.size&&(c.size=this.size,b(this._store,c._store),b(this._keyStrMap,c._keyStrMap)),c},equals:function(b){if(b===this)return!0;if(!(b instanceof a.HashTable)||b._size!==this._size)return!1;for(var c=Object.keys(this._store),d=0;d<c.length;d++){var e=c[d];if(this._keyStrMap[e]!==b._keyStrMap[e]||this._store[e]!==b._store[e])return!1}return!0},toString:function(){var b="";return this.each(function(a,c){b+=a+" => "+c+"\n"}),b}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.HashSet=a.inherit({_t:"c.HashSet",initialize:function(){this.storage=[],this.size=0,this.hashCode=a._inc()},add:function(a){var b=this.storage;b.indexOf(a),-1==b.indexOf(a)&&(b[b.length]=a),this.size=this.storage.length},values:function(){return this.storage},has:function(a){var b=this.storage;return-1!=b.indexOf(a)},"delete":function(a){var b=this.storage.indexOf(a);return-1==b?null:(this.storage.splice(b,1)[0],this.size=this.storage.length,void 0)},clear:function(){this.storage.length=0},each:function(a,b){this.size&&this.storage.forEach(a,b)},escapingEach:function(a,b){this.size&&this.storage.forEach(a,b)},toString:function(){var a=this.size+" {",b=!0;return this.each(function(c){b?b=!1:a+=", ",a+=c}),a+="}\n"},toJSON:function(){var a=[];return this.each(function(b){a[a.length]=b.toJSON()}),{_t:"c.HashSet",data:a}},fromJSON:function(b){var c=new a.HashSet;return b.data&&(c.size=b.data.length,c.storage=b.data),c}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Error=a.inherit({initialize:function(a){a&&(this._description=a)},_name:"c.Error",_description:"An error has occured in Cassowary",set description(a){this._description=a},get description(){return"("+this._name+") "+this._description},get message(){return this.description},toString:function(){return this.description}});var b=function(b,c){return a.inherit({"extends":a.Error,initialize:function(){a.Error.apply(this,arguments)},_name:b||"",_description:c||""})};a.ConstraintNotFound=b("c.ConstraintNotFound","Tried to remove a constraint never added to the tableu"),a.InternalError=b("c.InternalError"),a.NonExpression=b("c.NonExpression","The resulting expression would be non"),a.NotEnoughStays=b("c.NotEnoughStays","There are not enough stays to give specific values to every variable"),a.RequiredFailure=b("c.RequiredFailure","A required constraint cannot be satisfied"),a.TooDifficult=b("c.TooDifficult","The constraints are too difficult to solve")}(this.c||module.parent.exports||{}),function(a){"use strict";var b=1e3;a.SymbolicWeight=a.inherit({_t:"c.SymbolicWeight",initialize:function(){this.value=0;for(var a=1,c=arguments.length-1;c>=0;--c)this.value+=arguments[c]*a,a*=b},toJSON:function(){return{_t:this._t,value:this.value}}})}(this.c||module.parent.exports||{}),function(a){a.Strength=a.inherit({initialize:function(b,c,d,e){this.name=b,this.symbolicWeight=c instanceof a.SymbolicWeight?c:new a.SymbolicWeight(c,d,e)},get required(){return this===a.Strength.required},toString:function(){return this.name+(this.isRequired?"":":"+this.symbolicWeight)}}),a.Strength.required=new a.Strength("<Required>",1e3,1e3,1e3),a.Strength.strong=new a.Strength("strong",1,0,0),a.Strength.medium=new a.Strength("medium",0,1,0),a.Strength.weak=new a.Strength("weak",0,0,1)}(this.c||("undefined"!=typeof module?module.parent.exports.c:{})),function(a){"use strict";a.AbstractVariable=a.inherit({isDummy:!1,isExternal:!1,isPivotable:!1,isRestricted:!1,_init:function(b,c){this.hashCode=a._inc(),this.name=(c||"")+this.hashCode,b&&("undefined"!=typeof b.name&&(this.name=b.name),"undefined"!=typeof b.value&&(this.value=b.value),"undefined"!=typeof b.prefix&&(this._prefix=b.prefix))},_prefix:"",name:"",value:0,valueOf:function(){return this.value},toJSON:function(){var a={};return this._t&&(a._t=this._t),this.name&&(a.name=this.name),"undefined"!=typeof this.value&&(a.value=this.value),this._prefix&&(a._prefix=this._prefix),this._t&&(a._t=this._t),a},fromJSON:function(b,c){var d=new c;return a.extend(d,b),d},toString:function(){return this._prefix+"["+this.name+":"+this.value+"]"}}),a.Variable=a.inherit({_t:"c.Variable","extends":a.AbstractVariable,initialize:function(b){this._init(b,"v");var c=a.Variable._map;c&&(c[this.name]=this)},isExternal:!0}),a.DummyVariable=a.inherit({_t:"c.DummyVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"d")},isDummy:!0,isRestricted:!0,value:"dummy"}),a.ObjectiveVariable=a.inherit({_t:"c.ObjectiveVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"o")},value:"obj"}),a.SlackVariable=a.inherit({_t:"c.SlackVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"s")},isPivotable:!0,isRestricted:!0,value:"slack"})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Point=a.inherit({initialize:function(b,c,d){if(b instanceof a.Variable)this._x=b;else{var e={value:b};d&&(e.name="x"+d),this._x=new a.Variable(e)}if(c instanceof a.Variable)this._y=c;else{var f={value:c};d&&(f.name="y"+d),this._y=new a.Variable(f)}},get x(){return this._x},set x(b){b instanceof a.Variable?this._x=b:this._x.value=b},get y(){return this._y},set y(b){b instanceof a.Variable?this._y=b:this._y.value=b},toString:function(){return"("+this.x+", "+this.y+")"}})}(this.c||module.parent.exports||{}),function(a){"use strict";var b=function(a,b){return"number"==typeof a?a:b};a.Expression=a.inherit({initialize:function(c,d,e){this.constant=b(e,0),this.terms=new a.HashTable,c instanceof a.AbstractVariable?(d=b(d,1),this.setVariable(c,d)):"number"==typeof c&&(isNaN(c)?console.trace():this.constant=c)},initializeFromHash:function(b,c){return a.verbose&&(console.log("*******************************"),console.log("clone c.initializeFromHash"),console.log("*******************************")),a.GC&&console.log("clone c.Expression"),this.constant=b,this.terms=c.clone(),this},multiplyMe:function(a){this.constant*=a;var b=this.terms;return b.each(function(c,d){b.set(c,d*a)}),this},clone:function(){a.verbose&&(console.log("*******************************"),console.log("clone c.Expression"),console.log("*******************************"));var b=a.Expression.empty();return b.initializeFromHash(this.constant,this.terms),b},times:function(b){if("number"==typeof b)return this.clone().multiplyMe(b);if(this.isConstant)return b.times(this.constant);if(b.isConstant)return this.times(b.constant);throw new a.NonExpression},plus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,1):b instanceof a.Variable?this.clone().addVariable(b,1):void 0},minus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,-1):b instanceof a.Variable?this.clone().addVariable(b,-1):void 0},divide:function(b){if("number"==typeof b){if(a.approx(b,0))throw new a.NonExpression;return this.times(1/b)}if(b instanceof a.Expression){if(!b.isConstant)throw new a.NonExpression;return this.times(1/b.constant)}},addExpression:function(c,d,e,f){return c instanceof a.AbstractVariable&&(c=a.Expression.fromVariable(c)),d=b(d,1),this.constant+=d*c.constant,c.terms.each(function(a,b){this.addVariable(a,b*d,e,f)},this),this},addVariable:function(b,c,d,e){null==c&&(c=1);var f=this.terms.get(b);if(f){var g=f+c;0==g||a.approx(g,0)?(e&&e.noteRemovedVariable(b,d),this.terms.delete(b)):this.setVariable(b,g)}else a.approx(c,0)||(this.setVariable(b,c),e&&e.noteAddedVariable(b,d));return this},setVariable:function(a,b){return this.terms.set(a,b),this},anyPivotableVariable:function(){if(this.isConstant)throw new a.InternalError("anyPivotableVariable called on a constant");var b=this.terms.escapingEach(function(a){return a.isPivotable?{retval:a}:void 0});return b&&void 0!==b.retval?b.retval:null},substituteOut:function(b,c,d,e){this.setVariable.bind(this);var g=this.terms,h=g.get(b);g.delete(b),this.constant+=h*c.constant,c.terms.each(function(b,c){var f=g.get(b);if(f){var i=f+h*c;a.approx(i,0)?(e.noteRemovedVariable(b,d),g.delete(b)):g.set(b,i)}else g.set(b,h*c),e&&e.noteAddedVariable(b,d)})},changeSubject:function(a,b){this.setVariable(a,this.newSubject(b))},newSubject:function(a){var b=1/this.terms.get(a);return this.terms.delete(a),this.multiplyMe(-b),b},coefficientFor:function(a){return this.terms.get(a)||0},get isConstant(){return 0==this.terms.size},toString:function(){var b="",c=!1;if(!a.approx(this.constant,0)||this.isConstant){if(b+=this.constant,this.isConstant)return b;c=!0}return this.terms.each(function(a,d){c&&(b+=" + "),b+=d+"*"+a,c=!0}),b},equals:function(b){return b===this?!0:b instanceof a.Expression&&b.constant===this.constant&&b.terms.equals(this.terms)},Plus:function(a,b){return a.plus(b)},Minus:function(a,b){return a.minus(b)},Times:function(a,b){return a.times(b)},Divide:function(a,b){return a.divide(b)}}),a.Expression.empty=function(){return new a.Expression(void 0,1,0)},a.Expression.fromConstant=function(b){return new a.Expression(b)},a.Expression.fromValue=function(b){return b=+b,new a.Expression(void 0,b,0)},a.Expression.fromVariable=function(b){return new a.Expression(b,1,0)}}(this.c||module.parent.exports||{}),function(a){"use strict";a.AbstractConstraint=a.inherit({initialize:function(b,c){this.hashCode=a._inc(),this.strength=b||a.Strength.required,this.weight=c||1},isEditConstraint:!1,isInequality:!1,isStayConstraint:!1,get required(){return this.strength===a.Strength.required},toString:function(){return this.strength+" {"+this.weight+"} ("+this.expression+")"}});var b=a.AbstractConstraint.prototype.toString,c=function(b,c,d){a.AbstractConstraint.call(this,c||a.Strength.strong,d),this.variable=b,this.expression=new a.Expression(b,-1,b.value)};a.EditConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isEditConstraint:!0,toString:function(){return"edit:"+b.call(this)}}),a.StayConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isStayConstraint:!0,toString:function(){return"stay:"+b.call(this)}});var d=a.Constraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(b,c,d){a.AbstractConstraint.call(this,c,d),this.expression=b}});a.Inequality=a.inherit({"extends":a.Constraint,_cloneOrNewCle:function(b){return b.clone?b.clone():new a.Expression(b)},initialize:function(b,c,e,f,g){var h=b instanceof a.Expression,i=e instanceof a.Expression,j=b instanceof a.AbstractVariable,k=e instanceof a.AbstractVariable,l="number"==typeof b,m="number"==typeof e;if((h||l)&&k){var n=b,o=c,p=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else if(j&&(i||m)){var n=e,o=c,p=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else{if(h&&m){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(l&&i){var s=e,o=c,t=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(h&&i){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(t),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(s));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(s),-1)}}else{if(h)return d.call(this,b,c,e);if(c==a.GEQ)d.call(this,new a.Expression(e),f,g),this.expression.multiplyMe(-1),this.expression.addVariable(b);else{if(c!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");d.call(this,new a.Expression(e),f,g),this.expression.addVariable(b,-1)}}}},isInequality:!0,toString:function(){return d.prototype.toString.call(this)+" >= 0) id: "+this.hashCode}}),a.Equation=a.inherit({"extends":a.Constraint,initialize:function(b,c,e,f){if(b instanceof a.Expression&&!c||c instanceof a.Strength)d.call(this,b,c,e);else if(b instanceof a.AbstractVariable&&c instanceof a.Expression){var g=b,h=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.AbstractVariable&&"number"==typeof c){var g=b,k=c,i=e,j=f;d.call(this,new a.Expression(k),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.Expression&&c instanceof a.AbstractVariable){var h=b,g=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else{if(!(b instanceof a.Expression||b instanceof a.AbstractVariable||"number"==typeof b)||!(c instanceof a.Expression||c instanceof a.AbstractVariable||"number"==typeof c))throw"Bad initializer to c.Equation";b=b instanceof a.Expression?b.clone():new a.Expression(b),c=c instanceof a.Expression?c.clone():new a.Expression(c),d.call(this,b,e,f),this.expression.addExpression(c,-1)}a.assert(this.strength instanceof a.Strength,"_strength not set")},toString:function(){return d.prototype.toString.call(this)+" = 0)"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.EditInfo=a.inherit({initialize:function(a,b,c,d,e){this.constraint=a,this.editPlus=b,this.editMinus=c,this.prevEditConstant=d,this.index=e},toString:function(){return"<cn="+this.constraint+", ep="+this.editPlus+", em="+this.editMinus+", pec="+this.prevEditConstant+", index="+this.index+">"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Tableau=a.inherit({initialize:function(){this.columns=new a.HashTable,this.rows=new a.HashTable,this._infeasibleRows=new a.HashSet,this._externalRows=new a.HashSet,this._externalParametricVars=new a.HashSet},noteRemovedVariable:function(b,c){a.trace&&console.log("c.Tableau::noteRemovedVariable: ",b,c);var d=this.columns.get(b);c&&d&&d.delete(c)},noteAddedVariable:function(a,b){b&&this.insertColVar(a,b)},getInternalInfo:function(){var a="Tableau Information:\n";return a+="Rows: "+this.rows.size,a+=" (= "+(this.rows.size-1)+" constraints)",a+="\nColumns: "+this.columns.size,a+="\nInfeasible Rows: "+this._infeasibleRows.size,a+="\nExternal basic variables: "+this._externalRows.size,a+="\nExternal parametric variables: ",a+=this._externalParametricVars.size,a+="\n"},toString:function(){var a="Tableau:\n";return this.rows.each(function(b,c){a+=b,a+=" <==> ",a+=c,a+="\n"}),a+="\nColumns:\n",a+=this.columns,a+="\nInfeasible rows: ",a+=this._infeasibleRows,a+="External basic variables: ",a+=this._externalRows,a+="External parametric variables: ",a+=this._externalParametricVars},insertColVar:function(b,c){var d=this.columns.get(b);d||(d=new a.HashSet,this.columns.set(b,d)),d.add(c)},addRow:function(b,c){a.trace&&a.fnenterprint("addRow: "+b+", "+c),this.rows.set(b,c),c.terms.each(function(a){this.insertColVar(a,b),a.isExternal&&this._externalParametricVars.add(a)},this),b.isExternal&&this._externalRows.add(b),a.trace&&a.traceprint(this.toString())},removeColumn:function(b){a.trace&&a.fnenterprint("removeColumn:"+b);var c=this.columns.get(b);c?(this.columns.delete(b),c.each(function(a){var c=this.rows.get(a);c.terms.delete(b)},this)):a.trace&&console.log("Could not find var",b,"in columns"),b.isExternal&&(this._externalRows.delete(b),this._externalParametricVars.delete(b))},removeRow:function(b){a.trace&&a.fnenterprint("removeRow:"+b);var c=this.rows.get(b);return a.assert(null!=c),c.terms.each(function(c){var e=this.columns.get(c);null!=e&&(a.trace&&console.log("removing from varset:",b),e.delete(b))},this),this._infeasibleRows.delete(b),b.isExternal&&this._externalRows.delete(b),this.rows.delete(b),a.trace&&a.fnexitprint("returning "+c),c},substituteOut:function(b,c){a.trace&&a.fnenterprint("substituteOut:"+b+", "+c),a.trace&&a.traceprint(this.toString());var d=this.columns.get(b);d.each(function(a){var d=this.rows.get(a);d.substituteOut(b,c,a,this),a.isRestricted&&d.constant<0&&this._infeasibleRows.add(a)},this),b.isExternal&&(this._externalRows.add(b),this._externalParametricVars.delete(b)),this.columns.delete(b)},columnsHasKey:function(a){return!!this.columns.get(a)}})}(this.c||module.parent.exports||{}),function(a){var b=a.Tableau,c=b.prototype,d=1e-8,e=a.Strength.weak;a.SimplexSolver=a.inherit({"extends":a.Tableau,initialize:function(){a.Tableau.call(this),this._stayMinusErrorVars=[],this._stayPlusErrorVars=[],this._errorVars=new a.HashTable,this._markerVars=new a.HashTable,this._objective=new a.ObjectiveVariable({name:"Z"}),this._editVarMap=new a.HashTable,this._editVarList=[],this._slackCounter=0,this._artificialCounter=0,this._dummyCounter=0,this.autoSolve=!0,this._needsSolving=!1,this._optimizeCount=0,this.rows.set(this._objective,a.Expression.empty()),this._editVariableStack=[0],a.trace&&a.traceprint("objective expr == "+this.rows.get(this._objective))},add:function(){for(var a=0;a<arguments.length;a++)this.addConstraint(arguments[a]);return this},_addEditConstraint:function(b,c,d){var e=this._editVarMap.size,f=c[0],g=c[1],h=new a.EditInfo(b,f,g,d,e);this._editVarMap.set(b.variable,h),this._editVarList[e]={v:b.variable,info:h}},addConstraint:function(b){a.trace&&a.fnenterprint("addConstraint: "+b);var c=new Array(2),d=new Array(1),e=this.newExpression(b,c,d);return d=d[0],this.tryAddingDirectly(e)||this.addWithArtificialVariable(e),this._needsSolving=!0,b.isEditConstraint&&this._addEditConstraint(b,c,d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},addConstraintNoException:function(b){a.trace&&a.fnenterprint("addConstraintNoException: "+b);try{return this.addConstraint(b),!0}catch(c){return!1}},addEditVar:function(b,c,d){return a.trace&&a.fnenterprint("addEditVar: "+b+" @ "+c+" {"+d+"}"),this.addConstraint(new a.EditConstraint(b,c||a.Strength.strong,d))},beginEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this._infeasibleRows.clear(),this._resetStayConstants(),this._editVariableStack[this._editVariableStack.length]=this._editVarMap.size,this},endEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this.resolve(),this._editVariableStack.pop(),this.removeEditVarsTo(this._editVariableStack[this._editVariableStack.length-1]),this},removeAllEditVars:function(){return this.removeEditVarsTo(0)},removeEditVarsTo:function(b){try{for(var c=this._editVarList.length,d=b;c>d;d++)this._editVarList[d]&&this.removeConstraint(this._editVarMap.get(this._editVarList[d].v).constraint);return this._editVarList.length=b,a.assert(this._editVarMap.size==b,"_editVarMap.size == n"),this}catch(e){throw new a.InternalError("Constraint not found in removeEditVarsTo")}},addPointStays:function(b){return a.trace&&console.log("addPointStays",b),b.forEach(function(a,b){this.addStay(a.x,e,Math.pow(2,b)),this.addStay(a.y,e,Math.pow(2,b))},this),this},addStay:function(b,c,d){var f=new a.StayConstraint(b,c||e,d||1);return this.addConstraint(f)},removeConstraint:function(b){a.trace&&a.fnenterprint("removeConstraintInternal: "+b),a.trace&&a.traceprint(this.toString()),this._needsSolving=!0,this._resetStayConstants();var c=this.rows.get(this._objective),d=this._errorVars.get(b);a.trace&&a.traceprint("eVars == "+d),null!=d&&d.each(function(e){var f=this.rows.get(e);null==f?c.addVariable(e,-b.weight*b.strength.symbolicWeight.value,this._objective,this):c.addExpression(f,-b.weight*b.strength.symbolicWeight.value,this._objective,this),a.trace&&a.traceprint("now eVars == "+d)},this);var e=this._markerVars.get(b);if(this._markerVars.delete(b),null==e)throw new a.InternalError("Constraint not found in removeConstraintInternal");if(a.trace&&a.traceprint("Looking to remove var "+e),null==this.rows.get(e)){var f=this.columns.get(e);a.trace&&a.traceprint("Must pivot -- columns are "+f);var g=null,h=0;f.each(function(b){if(b.isRestricted){var c=this.rows.get(b),d=c.coefficientFor(e);if(a.trace&&a.traceprint("Marker "+e+"'s coefficient in "+c+" is "+d),0>d){var f=-c.constant/d;(null==g||h>f||a.approx(f,h)&&b.hashCode<g.hashCode)&&(h=f,g=b)}}},this),null==g&&(a.trace&&a.traceprint("exitVar is still null"),f.each(function(a){if(a.isRestricted){var b=this.rows.get(a),c=b.coefficientFor(e),d=b.constant/c;(null==g||h>d)&&(h=d,g=a)}},this)),null==g&&(0==f.size?this.removeColumn(e):f.escapingEach(function(a){return a!=this._objective?(g=a,{brk:!0}):void 0},this)),null!=g&&this.pivot(e,g)}if(null!=this.rows.get(e)&&this.removeRow(e),null!=d&&d.each(function(a){a!=e&&this.removeColumn(a)},this),b.isStayConstraint){if(null!=d)for(var j=0;j<this._stayPlusErrorVars.length;j++)d.delete(this._stayPlusErrorVars[j]),d.delete(this._stayMinusErrorVars[j])}else if(b.isEditConstraint){a.assert(null!=d,"eVars != null");var k=this._editVarMap.get(b.variable);this.removeColumn(k.editMinus),this._editVarMap.delete(b.variable)}return null!=d&&this._errorVars.delete(d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},reset:function(){throw a.trace&&a.fnenterprint("reset"),new a.InternalError("reset not implemented")},resolveArray:function(b){a.trace&&a.fnenterprint("resolveArray"+b);var c=b.length;this._editVarMap.each(function(a,d){var e=d.index;c>e&&this.suggestValue(a,b[e])},this),this.resolve()},resolvePair:function(a,b){this.suggestValue(this._editVarList[0].v,a),this.suggestValue(this._editVarList[1].v,b),this.resolve()},resolve:function(){a.trace&&a.fnenterprint("resolve()"),this.dualOptimize(),this._setExternalVariables(),this._infeasibleRows.clear(),this._resetStayConstants()},suggestValue:function(b,c){a.trace&&console.log("suggestValue("+b+", "+c+")");var d=this._editVarMap.get(b);if(!d)throw new a.Error("suggestValue for variable "+b+", but var is not an edit variable");var e=c-d.prevEditConstant;return d.prevEditConstant=c,this.deltaEditConstant(e,d.editPlus,d.editMinus),this},solve:function(){return this._needsSolving&&(this.optimize(this._objective),this._setExternalVariables()),this},setEditedValue:function(b,c){if(!this.columnsHasKey(b)&&null==this.rows.get(b))return b.value=c,this;if(!a.approx(c,b.value)){this.addEditVar(b),this.beginEdit();try{this.suggestValue(b,c)}catch(d){throw new a.InternalError("Error in setEditedValue")}this.endEdit()}return this},addVar:function(b){if(!this.columnsHasKey(b)&&null==this.rows.get(b)){try{this.addStay(b)}catch(c){throw new a.InternalError("Error in addVar -- required failure is impossible")}a.trace&&a.traceprint("added initial stay on "+b)}return this},getInternalInfo:function(){var a=c.getInternalInfo.call(this);return a+="\nSolver info:\n",a+="Stay Error Variables: ",a+=this._stayPlusErrorVars.length+this._stayMinusErrorVars.length,a+=" ("+this._stayPlusErrorVars.length+" +, ",a+=this._stayMinusErrorVars.length+" -)\n",a+="Edit Variables: "+this._editVarMap.size,a+="\n"},getDebugInfo:function(){return this.toString()+this.getInternalInfo()+"\n"},toString:function(){var a=c.getInternalInfo.call(this);return a+="\n_stayPlusErrorVars: ",a+="["+this._stayPlusErrorVars+"]",a+="\n_stayMinusErrorVars: ",a+="["+this._stayMinusErrorVars+"]",a+="\n",a+="_editVarMap:\n"+this._editVarMap,a+="\n"},addWithArtificialVariable:function(b){a.trace&&a.fnenterprint("addWithArtificialVariable: "+b);var c=new a.SlackVariable({value:++this._artificialCounter,prefix:"a"}),d=new a.ObjectiveVariable({name:"az"}),e=b.clone();a.trace&&a.traceprint("before addRows:\n"+this),this.addRow(d,e),this.addRow(c,b),a.trace&&a.traceprint("after addRows:\n"+this),this.optimize(d);var f=this.rows.get(d);if(a.trace&&a.traceprint("azTableauRow.constant == "+f.constant),!a.approx(f.constant,0))throw this.removeRow(d),this.removeColumn(c),new a.RequiredFailure;var g=this.rows.get(c);if(null!=g){if(g.isConstant)return this.removeRow(c),this.removeRow(d),void 0;var h=g.anyPivotableVariable();this.pivot(h,c)}a.assert(null==this.rows.get(c),"rowExpression(av) == null"),this.removeColumn(c),this.removeRow(d)},tryAddingDirectly:function(b){a.trace&&a.fnenterprint("tryAddingDirectly: "+b);var c=this.chooseSubject(b);return null==c?(a.trace&&a.fnexitprint("returning false"),!1):(b.newSubject(c),this.columnsHasKey(c)&&this.substituteOut(c,b),this.addRow(c,b),a.trace&&a.fnexitprint("returning true"),!0)},chooseSubject:function(b){a.trace&&a.fnenterprint("chooseSubject: "+b);var c=null,d=!1,e=!1,f=b.terms,g=f.escapingEach(function(a,b){if(d){if(!a.isRestricted&&!this.columnsHasKey(a))return{retval:a}}else if(a.isRestricted){if(!e&&!a.isDummy&&0>b){var f=this.columns.get(a);(null==f||1==f.size&&this.columnsHasKey(this._objective))&&(c=a,e=!0)}}else c=a,d=!0},this);if(g&&void 0!==g.retval)return g.retval;if(null!=c)return c;var h=0,g=f.escapingEach(function(a,b){return a.isDummy?(this.columnsHasKey(a)||(c=a,h=b),void 0):{retval:null}},this);if(g&&void 0!==g.retval)return g.retval;if(!a.approx(b.constant,0))throw new a.RequiredFailure;return h>0&&b.multiplyMe(-1),c},deltaEditConstant:function(b,c,d){a.trace&&a.fnenterprint("deltaEditConstant :"+b+", "+c+", "+d);var e=this.rows.get(c);if(null!=e)return e.constant+=b,e.constant<0&&this._infeasibleRows.add(c),void 0;var f=this.rows.get(d);if(null!=f)return f.constant+=-b,f.constant<0&&this._infeasibleRows.add(d),void 0;var g=this.columns.get(d);g||console.log("columnVars is null -- tableau is:\n"+this),g.each(function(a){var c=this.rows.get(a),e=c.coefficientFor(d);c.constant+=e*b,a.isRestricted&&c.constant<0&&this._infeasibleRows.add(a)},this)},dualOptimize:function(){a.trace&&a.fnenterprint("dualOptimize:");for(var b=this.rows.get(this._objective);this._infeasibleRows.size;){var c=this._infeasibleRows.values()[0];this._infeasibleRows.delete(c);var d=null,e=this.rows.get(c);if(e&&e.constant<0){var g,f=Number.MAX_VALUE,h=e.terms;if(h.each(function(c,e){if(e>0&&c.isPivotable){var h=b.coefficientFor(c);g=h/e,(f>g||a.approx(g,f)&&c.hashCode<d.hashCode)&&(d=c,f=g)}}),f==Number.MAX_VALUE)throw new a.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");this.pivot(d,c)}}},newExpression:function(b,c,d){a.trace&&(a.fnenterprint("newExpression: "+b),a.traceprint("cn.isInequality == "+b.isInequality),a.traceprint("cn.required == "+b.required));var e=b.expression,f=a.Expression.fromConstant(e.constant),g=new a.SlackVariable,h=new a.DummyVariable,i=new a.SlackVariable,j=new a.SlackVariable,k=e.terms;if(k.each(function(a,b){var c=this.rows.get(a);c?f.addExpression(c,b):f.addVariable(a,b)},this),b.isInequality){if(a.trace&&a.traceprint("Inequality, adding slack"),++this._slackCounter,g=new a.SlackVariable({value:this._slackCounter,prefix:"s"}),f.setVariable(g,-1),this._markerVars.set(b,g),!b.required){++this._slackCounter,i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(i,1);var l=this.rows.get(this._objective);l.setVariable(i,b.strength.symbolicWeight.value*b.weight),this.insertErrorVar(b,i),this.noteAddedVariable(i,this._objective)}}else if(b.required)a.trace&&a.traceprint("Equality, required"),++this._dummyCounter,h=new a.DummyVariable({value:this._dummyCounter,prefix:"d"}),c[0]=h,c[1]=h,d[0]=e.constant,f.setVariable(h,1),this._markerVars.set(b,h),a.trace&&a.traceprint("Adding dummyVar == d"+this._dummyCounter);else{a.trace&&a.traceprint("Equality, not required"),++this._slackCounter,j=new a.SlackVariable({value:this._slackCounter,prefix:"ep"}),i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(j,-1),f.setVariable(i,1),this._markerVars.set(b,j);
var l=this.rows.get(this._objective);a.trace&&console.log(l);var m=b.strength.symbolicWeight.value*b.weight;0==m&&(a.trace&&a.traceprint("cn == "+b),a.trace&&a.traceprint("adding "+j+" and "+i+" with swCoeff == "+m)),l.setVariable(j,m),this.noteAddedVariable(j,this._objective),l.setVariable(i,m),this.noteAddedVariable(i,this._objective),this.insertErrorVar(b,i),this.insertErrorVar(b,j),b.isStayConstraint?(this._stayPlusErrorVars[this._stayPlusErrorVars.length]=j,this._stayMinusErrorVars[this._stayMinusErrorVars.length]=i):b.isEditConstraint&&(c[0]=j,c[1]=i,d[0]=e.constant)}return f.constant<0&&f.multiplyMe(-1),a.trace&&a.fnexitprint("returning "+f),f},optimize:function(b){a.trace&&a.fnenterprint("optimize: "+b),a.trace&&a.traceprint(this.toString()),this._optimizeCount++;var c=this.rows.get(b);a.assert(null!=c,"zRow != null");for(var g,h,e=null,f=null;;){if(g=0,h=c.terms,h.escapingEach(function(a,b){return a.isPivotable&&g>b?(g=b,e=a,{brk:1}):void 0},this),g>=-d)return;a.trace&&console.log("entryVar:",e,"objectiveCoeff:",g);var i=Number.MAX_VALUE,j=this.columns.get(e),k=0;if(j.each(function(b){if(a.trace&&a.traceprint("Checking "+b),b.isPivotable){var c=this.rows.get(b),d=c.coefficientFor(e);a.trace&&a.traceprint("pivotable, coeff = "+d),0>d&&(k=-c.constant/d,(i>k||a.approx(k,i)&&b.hashCode<f.hashCode)&&(i=k,f=b))}},this),i==Number.MAX_VALUE)throw new a.InternalError("Objective function is unbounded in optimize");this.pivot(e,f),a.trace&&a.traceprint(this.toString())}},pivot:function(b,c){a.trace&&console.log("pivot: ",b,c);var d=!1;d&&console.time(" SimplexSolver::pivot"),null==b&&console.warn("pivot: entryVar == null"),null==c&&console.warn("pivot: exitVar == null"),d&&console.time("  removeRow");var e=this.removeRow(c);d&&console.timeEnd("  removeRow"),d&&console.time("  changeSubject"),e.changeSubject(c,b),d&&console.timeEnd("  changeSubject"),d&&console.time("  substituteOut"),this.substituteOut(b,e),d&&console.timeEnd("  substituteOut"),d&&console.time("  addRow"),this.addRow(b,e),d&&console.timeEnd("  addRow"),d&&console.timeEnd(" SimplexSolver::pivot")},_resetStayConstants:function(){a.trace&&console.log("_resetStayConstants");for(var b=this._stayPlusErrorVars,c=b.length,d=0;c>d;d++){var e=this.rows.get(b[d]);null===e&&(e=this.rows.get(this._stayMinusErrorVars[d])),null!=e&&(e.constant=0)}},_setExternalVariables:function(){a.trace&&a.fnenterprint("_setExternalVariables:"),a.trace&&a.traceprint(this.toString());var b={};this._externalParametricVars.each(function(c){null!=this.rows.get(c)?a.trace&&console.log("Error: variable"+c+" in _externalParametricVars is basic"):(c.value=0,b[c.name]=0)},this),this._externalRows.each(function(a){var c=this.rows.get(a);a.value!=c.constant&&(a.value=c.constant,b[a.name]=c.constant)},this),this._changed=b,this._needsSolving=!1,this._informCallbacks(),this.onsolved()},onsolved:function(){},_informCallbacks:function(){if(this._callbacks){var a=this._changed;this._callbacks.forEach(function(b){b(a)})}},_addCallback:function(a){var b=this._callbacks||(this._callbacks=[]);b[b.length]=a},insertErrorVar:function(b,c){a.trace&&a.fnenterprint("insertErrorVar:"+b+", "+c);var d=this._errorVars.get(c);d||(d=new a.HashSet,this._errorVars.set(b,d)),d.add(c)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Timer=a.inherit({initialize:function(){this.isRunning=!1,this._elapsedMs=0},start:function(){return this.isRunning=!0,this._startReading=new Date,this},stop:function(){return this.isRunning=!1,this._elapsedMs+=new Date-this._startReading,this},reset:function(){return this.isRunning=!1,this._elapsedMs=0,this},elapsedTime:function(){return this.isRunning?(this._elapsedMs+(new Date-this._startReading))/1e3:this._elapsedMs/1e3}})}(this.c||module.parent.exports||{}),this.c.parser=function(){function a(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c}function b(a,b,c,d,e,f){this.message=a,this.expected=b,this.found=c,this.offset=d,this.line=e,this.column=f,this.name="SyntaxError"}function c(a){function Ub(b){function c(b,c,d){var e,f;for(e=c;d>e;e++)f=a.charAt(e),"\n"===f?(b.seenCR||b.line++,b.column=1,b.seenCR=!1):"\r"===f||"\u2028"===f||"\u2029"===f?(b.line++,b.column=1,b.seenCR=!0):(b.column++,b.seenCR=!1)}return Ib!==b&&(Ib>b&&(Ib=0,Jb={line:1,column:1,seenCR:!1}),c(Jb,Ib,b),Ib=b),Jb}function Vb(a){Kb>Gb||(Gb>Kb&&(Kb=Gb,Lb=[]),Lb.push(a))}function Wb(c,d,e){function f(a){var b=1;for(a.sort(function(a,b){return a.description<b.description?-1:a.description>b.description?1:0});b<a.length;)a[b-1]===a[b]?a.splice(b,1):b++}function g(a,b){function c(a){function b(a){return a.charCodeAt(0).toString(16).toUpperCase()}return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(a){return"\\x0"+b(a)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(a){return"\\x"+b(a)}).replace(/[\u0180-\u0FFF]/g,function(a){return"\\u0"+b(a)}).replace(/[\u1080-\uFFFF]/g,function(a){return"\\u"+b(a)})}var e,f,g,d=new Array(a.length);for(g=0;g<a.length;g++)d[g]=a[g].description;return e=a.length>1?d.slice(0,-1).join(", ")+" or "+d[a.length-1]:d[0],f=b?'"'+c(b)+'"':"end of input","Expected "+e+" but "+f+" found."}var h=Ub(e),i=e<a.length?a.charAt(e):null;return null!==d&&f(d),new b(null!==c?c:g(d,i),d,i,e,h.line,h.column)}function Xb(){var a,b,c,e;if(a=Gb,b=jc(),b!==d){for(c=[],e=Yb();e!==d;)c.push(e),e=Yb();c!==d?(e=jc(),e!==d?(Hb=a,b=i(c),a=b):(Gb=a,a=g)):(Gb=a,a=g)}else Gb=a,a=g;return a}function Yb(){var a,b,c;return a=Gb,b=zc(),b!==d?(c=cc(),c!==d?(Hb=a,b=j(b),a=b):(Gb=a,a=g)):(Gb=a,a=g),a}function Zb(){var b;return a.length>Gb?(b=a.charAt(Gb),Gb++):(b=d,0===Mb&&Vb(k)),b}function $b(){var b;return l.test(a.charAt(Gb))?(b=a.charAt(Gb),Gb++):(b=d,0===Mb&&Vb(m)),b===d&&(36===a.charCodeAt(Gb)?(b=n,Gb++):(b=d,0===Mb&&Vb(o)),b===d&&(95===a.charCodeAt(Gb)?(b=p,Gb++):(b=d,0===Mb&&Vb(q)))),b}function _b(){var b,c;return Mb++,s.test(a.charAt(Gb))?(b=a.charAt(Gb),Gb++):(b=d,0===Mb&&Vb(t)),Mb--,b===d&&(c=d,0===Mb&&Vb(r)),b}function ac(){var b;return u.test(a.charAt(Gb))?(b=a.charAt(Gb),Gb++):(b=d,0===Mb&&Vb(v)),b}function bc(){var b,c;return Mb++,10===a.charCodeAt(Gb)?(b=x,Gb++):(b=d,0===Mb&&Vb(y)),b===d&&(a.substr(Gb,2)===z?(b=z,Gb+=2):(b=d,0===Mb&&Vb(A)),b===d&&(13===a.charCodeAt(Gb)?(b=B,Gb++):(b=d,0===Mb&&Vb(C)),b===d&&(8232===a.charCodeAt(Gb)?(b=D,Gb++):(b=d,0===Mb&&Vb(E)),b===d&&(8233===a.charCodeAt(Gb)?(b=F,Gb++):(b=d,0===Mb&&Vb(G)))))),Mb--,b===d&&(c=d,0===Mb&&Vb(w)),b}function cc(){var b,c,e;return b=Gb,c=jc(),c!==d?(59===a.charCodeAt(Gb)?(e=H,Gb++):(e=d,0===Mb&&Vb(I)),e!==d?(c=[c,e],b=c):(Gb=b,b=g)):(Gb=b,b=g),b===d&&(b=Gb,c=ic(),c!==d?(e=bc(),e!==d?(c=[c,e],b=c):(Gb=b,b=g)):(Gb=b,b=g),b===d&&(b=Gb,c=jc(),c!==d?(e=dc(),e!==d?(c=[c,e],b=c):(Gb=b,b=g)):(Gb=b,b=g))),b}function dc(){var b,c;return b=Gb,Mb++,a.length>Gb?(c=a.charAt(Gb),Gb++):(c=d,0===Mb&&Vb(k)),Mb--,c===d?b=J:(Gb=b,b=g),b}function ec(){var a,b;return Mb++,a=fc(),a===d&&(a=hc()),Mb--,a===d&&(b=d,0===Mb&&Vb(K)),a}function fc(){var b,c,e,f,h,i;if(b=Gb,a.substr(Gb,2)===L?(c=L,Gb+=2):(c=d,0===Mb&&Vb(M)),c!==d){for(e=[],f=Gb,h=Gb,Mb++,a.substr(Gb,2)===N?(i=N,Gb+=2):(i=d,0===Mb&&Vb(O)),Mb--,i===d?h=J:(Gb=h,h=g),h!==d?(i=Zb(),i!==d?(h=[h,i],f=h):(Gb=f,f=g)):(Gb=f,f=g);f!==d;)e.push(f),f=Gb,h=Gb,Mb++,a.substr(Gb,2)===N?(i=N,Gb+=2):(i=d,0===Mb&&Vb(O)),Mb--,i===d?h=J:(Gb=h,h=g),h!==d?(i=Zb(),i!==d?(h=[h,i],f=h):(Gb=f,f=g)):(Gb=f,f=g);e!==d?(a.substr(Gb,2)===N?(f=N,Gb+=2):(f=d,0===Mb&&Vb(O)),f!==d?(c=[c,e,f],b=c):(Gb=b,b=g)):(Gb=b,b=g)}else Gb=b,b=g;return b}function gc(){var b,c,e,f,h,i;if(b=Gb,a.substr(Gb,2)===L?(c=L,Gb+=2):(c=d,0===Mb&&Vb(M)),c!==d){for(e=[],f=Gb,h=Gb,Mb++,a.substr(Gb,2)===N?(i=N,Gb+=2):(i=d,0===Mb&&Vb(O)),i===d&&(i=ac()),Mb--,i===d?h=J:(Gb=h,h=g),h!==d?(i=Zb(),i!==d?(h=[h,i],f=h):(Gb=f,f=g)):(Gb=f,f=g);f!==d;)e.push(f),f=Gb,h=Gb,Mb++,a.substr(Gb,2)===N?(i=N,Gb+=2):(i=d,0===Mb&&Vb(O)),i===d&&(i=ac()),Mb--,i===d?h=J:(Gb=h,h=g),h!==d?(i=Zb(),i!==d?(h=[h,i],f=h):(Gb=f,f=g)):(Gb=f,f=g);e!==d?(a.substr(Gb,2)===N?(f=N,Gb+=2):(f=d,0===Mb&&Vb(O)),f!==d?(c=[c,e,f],b=c):(Gb=b,b=g)):(Gb=b,b=g)}else Gb=b,b=g;return b}function hc(){var b,c,e,f,h,i;if(b=Gb,a.substr(Gb,2)===P?(c=P,Gb+=2):(c=d,0===Mb&&Vb(Q)),c!==d){for(e=[],f=Gb,h=Gb,Mb++,i=ac(),Mb--,i===d?h=J:(Gb=h,h=g),h!==d?(i=Zb(),i!==d?(h=[h,i],f=h):(Gb=f,f=g)):(Gb=f,f=g);f!==d;)e.push(f),f=Gb,h=Gb,Mb++,i=ac(),Mb--,i===d?h=J:(Gb=h,h=g),h!==d?(i=Zb(),i!==d?(h=[h,i],f=h):(Gb=f,f=g)):(Gb=f,f=g);e!==d?(f=ac(),f===d&&(f=dc()),f!==d?(c=[c,e,f],b=c):(Gb=b,b=g)):(Gb=b,b=g)}else Gb=b,b=g;return b}function ic(){var a,b;for(a=[],b=_b(),b===d&&(b=gc(),b===d&&(b=hc()));b!==d;)a.push(b),b=_b(),b===d&&(b=gc(),b===d&&(b=hc()));return a}function jc(){var a,b;for(a=[],b=_b(),b===d&&(b=bc(),b===d&&(b=ec()));b!==d;)a.push(b),b=_b(),b===d&&(b=bc(),b===d&&(b=ec()));return a}function kc(){var a,b;return a=Gb,b=mc(),b===d&&(b=lc()),b!==d&&(Hb=a,b=R(b)),a=b}function lc(){var b,c,e;if(b=Gb,c=[],S.test(a.charAt(Gb))?(e=a.charAt(Gb),Gb++):(e=d,0===Mb&&Vb(T)),e!==d)for(;e!==d;)c.push(e),S.test(a.charAt(Gb))?(e=a.charAt(Gb),Gb++):(e=d,0===Mb&&Vb(T));else c=g;return c!==d&&(Hb=b,c=U(c)),b=c}function mc(){var b,c,e,f,h;return b=Gb,c=Gb,e=lc(),e!==d?(46===a.charCodeAt(Gb)?(f=V,Gb++):(f=d,0===Mb&&Vb(W)),f!==d?(h=lc(),h!==d?(e=[e,f,h],c=e):(Gb=c,c=g)):(Gb=c,c=g)):(Gb=c,c=g),c!==d&&(Hb=b,c=X(c)),b=c}function oc(){var a,b;return Mb++,a=Gb,b=pc(),b!==d&&(Hb=a,b=ab(b)),a=b,Mb--,a===d&&(b=d,0===Mb&&Vb(_)),a}function pc(){var a,b,c,e;if(Mb++,a=Gb,b=$b(),b!==d){for(c=[],e=$b();e!==d;)c.push(e),e=$b();c!==d?(Hb=a,b=bb(b,c),a=b):(Gb=a,a=g)}else Gb=a,a=g;return Mb--,a===d&&(b=d,0===Mb&&Vb(_)),a}function qc(){var b,c,e,f,h,i;return b=Gb,c=oc(),c!==d&&(Hb=b,c=cb(c)),b=c,b===d&&(b=kc(),b===d&&(b=Gb,40===a.charCodeAt(Gb)?(c=db,Gb++):(c=d,0===Mb&&Vb(eb)),c!==d?(e=jc(),e!==d?(f=zc(),f!==d?(h=jc(),h!==d?(41===a.charCodeAt(Gb)?(i=fb,Gb++):(i=d,0===Mb&&Vb(gb)),i!==d?(Hb=b,c=j(f),b=c):(Gb=b,b=g)):(Gb=b,b=g)):(Gb=b,b=g)):(Gb=b,b=g)):(Gb=b,b=g))),b}function rc(){var a,b,c,e;return a=qc(),a===d&&(a=Gb,b=sc(),b!==d?(c=jc(),c!==d?(e=rc(),e!==d?(Hb=a,b=hb(b,e),a=b):(Gb=a,a=g)):(Gb=a,a=g)):(Gb=a,a=g)),a}function sc(){var b;return 43===a.charCodeAt(Gb)?(b=ib,Gb++):(b=d,0===Mb&&Vb(jb)),b===d&&(45===a.charCodeAt(Gb)?(b=kb,Gb++):(b=d,0===Mb&&Vb(lb)),b===d&&(33===a.charCodeAt(Gb)?(b=mb,Gb++):(b=d,0===Mb&&Vb(nb)))),b}function tc(){var a,b,c,e,f,h,i,j;if(a=Gb,b=rc(),b!==d){for(c=[],e=Gb,f=jc(),f!==d?(h=uc(),h!==d?(i=jc(),i!==d?(j=rc(),j!==d?(f=[f,h,i,j],e=f):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g);e!==d;)c.push(e),e=Gb,f=jc(),f!==d?(h=uc(),h!==d?(i=jc(),i!==d?(j=rc(),j!==d?(f=[f,h,i,j],e=f):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g);c!==d?(Hb=a,b=ob(b,c),a=b):(Gb=a,a=g)}else Gb=a,a=g;return a}function uc(){var b;return 42===a.charCodeAt(Gb)?(b=pb,Gb++):(b=d,0===Mb&&Vb(qb)),b===d&&(47===a.charCodeAt(Gb)?(b=rb,Gb++):(b=d,0===Mb&&Vb(sb))),b}function vc(){var a,b,c,e,f,h,i,j;if(a=Gb,b=tc(),b!==d){for(c=[],e=Gb,f=jc(),f!==d?(h=wc(),h!==d?(i=jc(),i!==d?(j=tc(),j!==d?(f=[f,h,i,j],e=f):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g);e!==d;)c.push(e),e=Gb,f=jc(),f!==d?(h=wc(),h!==d?(i=jc(),i!==d?(j=tc(),j!==d?(f=[f,h,i,j],e=f):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g);c!==d?(Hb=a,b=tb(b,c),a=b):(Gb=a,a=g)}else Gb=a,a=g;return a}function wc(){var b;return 43===a.charCodeAt(Gb)?(b=ib,Gb++):(b=d,0===Mb&&Vb(jb)),b===d&&(45===a.charCodeAt(Gb)?(b=kb,Gb++):(b=d,0===Mb&&Vb(lb))),b}function xc(){var a,b,c,e,f,h,i,j;if(a=Gb,b=vc(),b!==d){for(c=[],e=Gb,f=jc(),f!==d?(h=yc(),h!==d?(i=jc(),i!==d?(j=vc(),j!==d?(f=[f,h,i,j],e=f):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g);e!==d;)c.push(e),e=Gb,f=jc(),f!==d?(h=yc(),h!==d?(i=jc(),i!==d?(j=vc(),j!==d?(f=[f,h,i,j],e=f):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g)):(Gb=e,e=g);c!==d?(Hb=a,b=ub(b,c),a=b):(Gb=a,a=g)}else Gb=a,a=g;return a}function yc(){var b;return a.substr(Gb,2)===vb?(b=vb,Gb+=2):(b=d,0===Mb&&Vb(wb)),b===d&&(a.substr(Gb,2)===xb?(b=xb,Gb+=2):(b=d,0===Mb&&Vb(yb)),b===d&&(60===a.charCodeAt(Gb)?(b=zb,Gb++):(b=d,0===Mb&&Vb(Ab)),b===d&&(62===a.charCodeAt(Gb)?(b=Bb,Gb++):(b=d,0===Mb&&Vb(Cb))))),b}function zc(){var b,c,e,f,h,i,j,k;if(b=Gb,c=xc(),c!==d){for(e=[],f=Gb,h=jc(),h!==d?(a.substr(Gb,2)===Db?(i=Db,Gb+=2):(i=d,0===Mb&&Vb(Eb)),i!==d?(j=jc(),j!==d?(k=xc(),k!==d?(h=[h,i,j,k],f=h):(Gb=f,f=g)):(Gb=f,f=g)):(Gb=f,f=g)):(Gb=f,f=g);f!==d;)e.push(f),f=Gb,h=jc(),h!==d?(a.substr(Gb,2)===Db?(i=Db,Gb+=2):(i=d,0===Mb&&Vb(Eb)),i!==d?(j=jc(),j!==d?(k=xc(),k!==d?(h=[h,i,j,k],f=h):(Gb=f,f=g)):(Gb=f,f=g)):(Gb=f,f=g)):(Gb=f,f=g);e!==d?(Hb=b,c=Fb(c,e),b=c):(Gb=b,b=g)}else Gb=b,b=g;return b}var Nb,c=arguments.length>1?arguments[1]:{},d={},e={start:Xb},f=Xb,g=d,i=function(a){return a},j=function(a){return a},k={type:"any",description:"any character"},l=/^[a-zA-Z]/,m={type:"class",value:"[a-zA-Z]",description:"[a-zA-Z]"},n="$",o={type:"literal",value:"$",description:'"$"'},p="_",q={type:"literal",value:"_",description:'"_"'},r={type:"other",description:"whitespace"},s=/^[\t\x0B\f \xA0\uFEFF]/,t={type:"class",value:"[\\t\\x0B\\f \\xA0\\uFEFF]",description:"[\\t\\x0B\\f \\xA0\\uFEFF]"},u=/^[\n\r\u2028\u2029]/,v={type:"class",value:"[\\n\\r\\u2028\\u2029]",description:"[\\n\\r\\u2028\\u2029]"},w={type:"other",description:"end of line"},x="\n",y={type:"literal",value:"\n",description:'"\\n"'},z="\r\n",A={type:"literal",value:"\r\n",description:'"\\r\\n"'},B="\r",C={type:"literal",value:"\r",description:'"\\r"'},D="\u2028",E={type:"literal",value:"\u2028",description:'"\\u2028"'},F="\u2029",G={type:"literal",value:"\u2029",description:'"\\u2029"'},H=";",I={type:"literal",value:";",description:'";"'},J=void 0,K={type:"other",description:"comment"},L="/*",M={type:"literal",value:"/*",description:'"/*"'},N="*/",O={type:"literal",value:"*/",description:'"*/"'},P="//",Q={type:"literal",value:"//",description:'"//"'},R=function(a){return{type:"NumericLiteral",value:a}},S=/^[0-9]/,T={type:"class",value:"[0-9]",description:"[0-9]"},U=function(a){return parseInt(a.join(""))},V=".",W={type:"literal",value:".",description:'"."'},X=function(a){return parseFloat(a.join(""))},_={type:"other",description:"identifier"},ab=function(a){return a},bb=function(a,b){return a+b.join("")},cb=function(a){return{type:"Variable",name:a}},db="(",eb={type:"literal",value:"(",description:'"("'},fb=")",gb={type:"literal",value:")",description:'")"'},hb=function(a,b){return{type:"UnaryExpression",operator:a,expression:b}},ib="+",jb={type:"literal",value:"+",description:'"+"'},kb="-",lb={type:"literal",value:"-",description:'"-"'},mb="!",nb={type:"literal",value:"!",description:'"!"'},ob=function(a,b){for(var c=a,d=0;d<b.length;d++)c={type:"MultiplicativeExpression",operator:b[d][1],left:c,right:b[d][3]};return c},pb="*",qb={type:"literal",value:"*",description:'"*"'},rb="/",sb={type:"literal",value:"/",description:'"/"'},tb=function(a,b){for(var c=a,d=0;d<b.length;d++)c={type:"AdditiveExpression",operator:b[d][1],left:c,right:b[d][3]};return c},ub=function(a,b){for(var c=a,d=0;d<b.length;d++)c={type:"Inequality",operator:b[d][1],left:c,right:b[d][3]};return c},vb="<=",wb={type:"literal",value:"<=",description:'"<="'},xb=">=",yb={type:"literal",value:">=",description:'">="'},zb="<",Ab={type:"literal",value:"<",description:'"<"'},Bb=">",Cb={type:"literal",value:">",description:'">"'},Db="==",Eb={type:"literal",value:"==",description:'"=="'},Fb=function(a,b){for(var c=a,d=0;d<b.length;d++)c={type:"Equality",operator:b[d][1],left:c,right:b[d][3]};return c},Gb=0,Hb=0,Ib=0,Jb={line:1,column:1,seenCR:!1},Kb=0,Lb=[],Mb=0;if("startRule"in c){if(!(c.startRule in e))throw new Error("Can't start parsing from rule \""+c.startRule+'".');f=e[c.startRule]}if(Nb=f(),Nb!==d&&Gb===a.length)return Nb;throw Nb!==d&&Gb<a.length&&Vb({type:"end",description:"end of input"}),Wb(null,Lb,Kb)}return a(b,Error),{SyntaxError:b,parse:c}}(),function(a){"use strict";var b=new a.SimplexSolver,c={},d={},e=a.Strength.weak;a.Strength.medium,a.Strength.strong,a.Strength.required;var i=function(f){if(d[f])return d[f];switch(f.type){case"Inequality":var g="<="==f.operator?a.LEQ:a.GEQ,h=new a.Inequality(i(f.left),g,i(f.right),e);return b.addConstraint(h),h;case"Equality":var h=new a.Equation(i(f.left),i(f.right),e);return b.addConstraint(h),h;case"MultiplicativeExpression":var h=a.times(i(f.left),i(f.right));return b.addConstraint(h),h;case"AdditiveExpression":return"+"==f.operator?a.plus(i(f.left),i(f.right)):a.minus(i(f.left),i(f.right));case"NumericLiteral":return new a.Expression(f.value);case"Variable":return c[f.name]||(c[f.name]=new a.Variable({name:f.name})),c[f.name];case"UnaryExpression":console.log("UnaryExpression...WTF?")}},j=function(a){return a.map(i)};a._api=function(){var c=Array.prototype.slice.call(arguments);if(1==c.length){if("string"==typeof c[0]){var d=a.parser.parse(c[0]);return j(d)}"function"==typeof c[0]&&b._addCallback(c[0])}}}(this.c||module.parent.exports||{});
}).call(
  (typeof module != "undefined") ?
      (module.compiled = true && module) : this
);

"use strict";

var manipulatorCount = 0;

// This is a wrapper over a cassowary variable. It will create an edit session
// for it when dragged and listen for violations of motion constraints.
function Manipulator(variable, domObject, axis) {
    this._variable = variable;
    this._solver = null;
    this._axis = axis;
    this._context = null;

    this._motion = null;
    this._animation = null;
    this._name = 'manipulator-' + variable.name + '-' + (++manipulatorCount);

    this._hitConstraint = null;
    this._constraintCoefficient = 1;

    var self = this;

    console.log('domObject', domObject);

    // There are three places that a variable gets a value from in here:
    //  1. touch manipulation (need to apply constraint when in violation)
    //  2. animation from velocity.
    //  3. animation from constraint.
    this._motionState = {
        editing: false,
        // Manipulation from touch
        dragging: false,
        dragStart: 0,
        dragDelta: 0,
        // Animation from velocity (which the finger imparted)
        velocityAnimation: null,
        velocityAnimationPosition: 0,
        velocityAnimationVelocity: 0,
        // Animation from constraint (either from velocity animation, or from drag end).
        constraintAnimation: null,
        constraintAnimationPosition: 0,
        constraintAnimationVelocity: 0,
        constraintAnimationConstraint: null, // the constraint we're animating for.
        // Are we running a constraint iteration where we're pretending to have
        // an animation in order to discover constraints that only apply to
        // animations (which we wouldn't discover if we had no velocity and thus
        // didn't create an animation, for example).
        trialAnimation: false
    };

    // Clean up:
    // There are three places that a variable gets a value from in here:
    //  1. touch manipulation (need to apply constraint when in violation)
    //  2. animation from velocity.
    //  3. animation from constraint.
    // Currently those three are all kind of mixed up; it might be better
    // to have them all provide updates and then select which value we're
    // going to use and whether it needs to be constrained or already has
    // been.

    addTouchOrMouseListener(domObject, {
        onTouchStart: function() {
            //console.log('touch');
            // Kill other manipulators that are doing something to a related variable.
            self._motionContext.stopOthers(self._variable);
            // Start a new edit session.
            self._motionState.dragging = true;
            self._motionState.dragStart = variable.valueOf();
            self._motionState.dragDelta = 0;
            self._update();
        },
        onTouchMove: function(dx, dy) {
            var delta = (axis == 'x') ? dx : dy;
            self._motionState.dragDelta = delta;
            self._update();
        },
        onTouchEnd: function(dx, dy, v) {
            var velocity = (axis == 'x') ? v.x : v.y;
            self._motionState.dragging = false;
            self._motionState.trialAnimation = true;
            if (self._motionContext) self._motionContext.update();
            self._createAnimation(velocity);
            self._motionState.trialAnimation = false;
        }
    });
}
// This method is called by the MotionContext when this manipulator is added to it.
Manipulator.prototype._setMotionContext = function(motionContext) {
    this._motionContext = motionContext;
    this._solver = motionContext.solver();
    // Add a stay to the variable we're going to manipulate.
    this._solver.add(new c.StayConstraint(this._variable, c.Strength.medium, 0));
}
Manipulator.prototype.name = function() {
    return this._name;
}
Manipulator.prototype.variable = function() {
    return this._variable;
}
Manipulator.prototype.createMotion = function(x, v) {
    var m = new Friction(0.1); // 0.001
    m.set(x, v);
    return m;
}
Manipulator.prototype._cancelAnimation = function(key) {
    if (!this._motionState[key]) return;
    this._motionState[key].cancel();
    this._motionState[key] = null;
}
Manipulator.prototype._update = function() {
    // What state are we in?
    //  1. Dragging -- we set the variable to the value specified and apply some
    //     damping if we're in violation of a constraint.
    //  2. Animating -- we have some momentum from a drag, and we're applying the
    //     values of an animation to the variable. We need to react if we violate
    //     a constraint.
    //  3. Constraint animating -- we already violated a constraint and now we're
    //     animating back to a non-violating position.
    //  4. Nothing is going on, we shouldn't be editing.
    //
    var self = this;

    function beginEdit() {
        if (self._motionState.editing) return;
        self._solver.beginEdit(self._variable, c.Strength.strong);
        self._motionState.editing = true;
    }

    if (this._motionState.dragging) {
        // 1. Dragging.

        // Kill any animations we already have.
        this._cancelAnimation('velocityAnimation');
        this._cancelAnimation('constraintAnimation');
        this._motionState.velocityAnimationVelocity = 0;
        this._motionState.constraintAnimationVelocity = 0;
        // Start an edit.
        beginEdit();
        // If we've hit any constraint then apply that.
        var position = this._motionState.dragStart + this._motionState.dragDelta;
        if (this._hitConstraint) {
            // Push the current value into the system so that we can extract the delta.
            this._solver.suggestValue(this._variable, position);

            var violationDelta = this._hitConstraint.delta() / this._constraintCoefficient;

            position += violationDelta * this._hitConstraint.overdragCoefficient;
        }
        // Now tell the solver.
        this._solver.suggestValue(this._variable, position);
    } else if (this._motionState.constraintAnimation) {
        this._cancelAnimation('velocityAnimation');
        beginEdit();
        var position = this._motionState.constraintAnimationPosition;
        this._solver.suggestValue(this._variable, position);
        // If we're no longer in violation then we can kill the constraint animation and
        // create a new velocity animation unless our constraint is captive (in which case
        // we remain captured).
        if (!this._motionState.constraintAnimationConstraint.captive && this._motionState.constraintAnimationConstraint.delta() == 0) {
            var velocity = this._motionState.constraintAnimationVelocity;
            this._createAnimation(velocity);
        }
    } else if (this._motionState.velocityAnimation) {
        beginEdit();
        var position = this._motionState.velocityAnimationPosition;
        // We don't consider constraints here; we deal with them in didHitConstraint.
        this._solver.suggestValue(this._variable, position);
    } else {
        // We're not doing anything; end the edit.
        if (!this._motionState.editing) return;
        this._solver.endEdit(this._variable);
        this._motionState.editing = false;
        this._motionState.velocityAnimationVelocity = 0;
        this._motionState.constraintAnimationVelocity = 0;
    }
    if (this._motionContext) this._motionContext.update();
}
Manipulator.prototype._createAnimation = function(velocity) {
    // Can't animate if we're being dragged.
    if (this._motionState.dragging) return;

    var self = this;

    function sign(x) {
        return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
    }
    // Create an animation from where we are. This is either just a regular motion or we're
    // violating a constraint and we need to animate out of violation.
    if (this._hitConstraint) {
        // Don't interrupt an animation caused by a constraint to enforce the same constraint.
        // This can happen if the constraint is enforced by an underdamped spring, for example.
        if (this._motionState.constraintAnimation) {
            if (this._motionState.constraintAnimationConstraint == this._hitConstraint || this._motionState.constraintAnimationConstraint.captive)
                return;
            this._cancelAnimation('constraintAnimation');
        }

        this._motionState.constraintAnimationConstraint = this._hitConstraint;

        // Determine the current velocity and end point if no constraint had been hit. Some
        // discontinuous constraint ops use this to determine which point they're going to snap to.
        velocity = self._motionState.velocityAnimation ? self._motionState.velocityAnimationVelocity : velocity;
        var endPosition = this._variable.valueOf();
        if (self._motionState.velocityAnimation) endPosition = self._motionState.velocityAnimation.model.x(60);
        else if (velocity) {
            var motion = this.createMotion(this._variable.valueOf(), velocity);
            endPosition = motion.x(60);
        }
        var startPosition = this._motionState.dragStart;
        // If the constraint isn't relative to our variable then we need to use the solver to
        // get the appropriate startPosition and endPosition.
        if (this._variable != this._hitConstraint.variable) {
            var original = this._variable.valueOf();
            if (this._motionState.editing) {
                this._solver.suggestValue(this._variable, startPosition);
                this._solver.solve();
                startPosition = this._hitConstraint.variable.valueOf();

                this._solver.suggestValue(this._variable, endPosition);
                this._solver.solve();
                endPosition = this._hitConstraint.variable.valueOf();

                this._solver.suggestValue(this._variable, original);
                this._solver.solve();
            } else {
                // XXX: Should start a temporary edit to avoid this...
                console.warn('not editing; cannot figure out correct start/end positions for motion constraint');
            }
        }

        // We pass through the "natural" end point and the start position. MotionConstraints
        // shouldn't need velocity, so we don't pass that through. (Perhaps there's a constraint
        // that does need it, then I'll put it back; haven't found that constraint yet).
        var delta = this._hitConstraint.delta(endPosition, startPosition);

        // Figure out how far we have to go to be out of violation. Because we use a linear
        // constraint solver to surface violations we only need to remember the coefficient
        // of a given violation.
        var violationDelta = delta / this._constraintCoefficient;

        // We always do the constraint animation when we've hit a constraint. If the constraint
        // isn't captive then we'll fall out of it and into a regular velocity animation later
        // on (this is how the ends of scroll springs work).
        this._cancelAnimation('constraintAnimation');
        this._cancelAnimation('velocityAnimation');
        var motion = this._hitConstraint.createMotion(this._variable.valueOf());
        motion.setEnd(this._variable.valueOf() + violationDelta, velocity);

        this._motionState.constraintAnimation = animation(motion,
            function() {
                self._motionState.constraintAnimationPosition = motion.x();
                self._motionState.constraintAnimationVelocity = motion.dx(); // unused.
                self._update();

                if (motion.done()) {
                    self._cancelAnimation('constraintAnimation');
                    self._motionState.constraintAnimationConstraint = null;
                    self._update();
                }
            });
        return;
    }

    // No constraint violation, just a plain motion animation incorporating the velocity
    // imparted by the finger.
    var motion = this.createMotion(this._variable.valueOf(), velocity);

    if (motion.done()) return;

    this._cancelAnimation('velocityAnimation');
    this._cancelAnimation('constraintAnimation');

    this._motionState.velocityAnimation = animation(motion,
        function() {
            self._motionState.velocityAnimationPosition = motion.x();
            self._motionState.velocityAnimationVelocity = motion.dx();
            self._update();
            // If we've hit the end then cancel ourselves and update the system
            // which will end the edit.
            if (motion.done()) {
                self._cancelAnimation('velocityAnimation');
                self._update();
                if (self._hitConstraint) self._createAnimation(0);
            }
        });
}
Manipulator.prototype.hitConstraint = function(constraint, coefficient, delta) {
    // XXX: Handle hitting multiple constraints.
    if (constraint == this._hitConstraint) return;
    this._hitConstraint = constraint;
    this._constraintCoefficient = coefficient;

    if (this._motionState.dragging) {
        this._update();
        return;
    }
    if (this._motionState.trialAnimation)
        return;
    this._createAnimation();
}
Manipulator.prototype.hitConstraints = function(violations) {
    // XXX: Do something good here instead.
    //
    // Sort the violations by the largest delta and then just handle that one.
    if (violations.length == 0) {
        this._hitConstraint = null;
        this._constraintCoefficient = 1;
        return;
    }
    violations.sort(function(a, b) {
        var amc = a.motionConstraint;
        var bmc = b.motionConstraint;
        // Non animation-only constraints are less important than animation only ones;
        // we should also sort on overdrag coefficient so that we get the tightest
        // constraints to the top.
        if (amc.overdragCoefficient == bmc.overdragCoefficient)
            return Math.abs(b.delta) - Math.abs(a.delta);
        return (bmc.overdragCoefficient - amc.overdragCoefficient);
    });
    this.hitConstraint(violations[0].motionConstraint, violations[0].coefficient, violations[0].delta);
}
Manipulator.prototype.animating = function() {
    if (this._motionState.dragging) return false;
    return !!this._motionState.velocityAnimation || this._motionState.trialAnimation;
}
Manipulator.prototype.editing = function() {
    return this._motionState.editing;
}
Manipulator.prototype.cancelAnimations = function() {
    this._cancelAnimation('velocityAnimation');
    this._cancelAnimation('constraintAnimation');
    this._hitConstraint = null; // XXX: Hacky -- want to prevent starting a new constraint animation in update; just want it to end the edit.
    this._update();
}
"use strict";

(function() {

var dPR = window.devicePixelRatio;
function roundOffset(x) { return Math.round(x * dPR) / dPR; }

// This is a DOM block which is positioned from the constraint solver rather than
// via flow.
function Box(textContentOrElement) {
    if (textContentOrElement && textContentOrElement.style) {
        this._element = textContentOrElement;
    } else {
        this._element = document.createElement('div');
        this._element.className = 'box';
        if (textContentOrElement) this._element.textContent = textContentOrElement;
    }

    // These get replaced with constraint variables by the caller.
    this.x = 0;
    this.y = 0;
    this.right = 100;
    this.bottom = 100;

    // If these are set then we'll propagate them to the DOM and use
    // a transform to scale to the desired width. This is handy because
    // changing the DOM width/height causes a full layout+repaint which
    // isn't very incremental in WebKit/Blink.
    this.domWidth = -1;
    this.domHeight = -1;

    this._children = [];

    this.update();
}
Box.prototype.element = function() { return this._element; }
Box.prototype.addChild = function(box) { this._children.push(box); }
Box.prototype.update = function(px, py) {
    function get(variable) {
        if (variable.valueOf) return variable.valueOf();
        return variable;
    }
    var x = get(this.x);
    var y = get(this.y);
    var right = get(this.right);
    var bottom = get(this.bottom);

    var w = Math.max(0, right - x);
    var h = Math.max(0, bottom - y);

    for (var i = 0; i < this._children.length; i++) {
        this._children[i].update(x, y);
    }

    if (!px) px = 0;
    if (!py) py = 0;
    x -= px;
    y -= py;

    var xscale = 1;
    var yscale = 1;

    if (this.domWidth != -1) {
        xscale = w / this.domWidth;
        w = this.domWidth;
    }
    if (this.domHeight != -1) {
        yscale = h / this.domHeight;
        h = this.domHeight;
    }
    // Don't do rounding if we're doing transform-based scaling
    // because it makes it jumpy.
    if (xscale == 1 && yscale == 1) {
        x = roundOffset(x);
        y = roundOffset(y);
        w = roundOffset(w);
        h = roundOffset(h);
    }

    // Be careful about updating width and height since it'll
    // trigger a browser layout.
    if (w != this._lastWidth) {
        this._lastWidth = w;
        this._element.style.width = w + 'px';
    }
    if (h != this._lastHeight) {
        this._lastHeight = h;
        this._element.style.height = h + 'px';
    }
    if (x == this._lastX && y == this._lastY) return;
    this._lastX = x; this._lastY = y;
    // Use transform to set the x/y since this is the common
    // case and it generally avoids a relayout.
    var transform = 'translate3D(' + x + 'px, ' + y + 'px, 0)';
    if (xscale != 1 || yscale != 1) {
        transform += ' scale(' + xscale + ', ' + yscale + ')';
    }
    this._element.style.webkitTransform = transform;
    this._element.style.transform = transform;
}

window.Box = Box;

})();

'use strict';

// Motion constraint definition

// These are the ops; they return the delta when not met.
var mc = {
    greater: function(a, b) {
            if (a >= b) return 0;
            return b - a;
        },
    less: function(a, b) {
        if (a <= b) return 0;
        return b - a;
    },
    l: function(a, b) {
        if (a < b) return 0;
        return b - a;
    },
    g: function(a, b) {
        if (a > b) return 0;
        return b - a;
    },
    equal: function(a, b) { return b - a; },
    modulo: function(a, b, naturalEndPosition) {
        var nearest = b * Math.round(naturalEndPosition/b);
        return nearest - a;
    },
    // Like modulo, but only snaps to the current or adjacent values. Really good for pagers.
    adjacentModulo: function(a, b, naturalEndPosition, gestureStartPosition) {
        if (gestureStartPosition === undefined) return mc.modulo(a, b, naturalEndPosition);

        var startNearest = Math.round(gestureStartPosition/b);
        var endNearest = Math.round(naturalEndPosition/b);

        var difference = endNearest - startNearest;

        // Make the difference at most 1, so that we're only going to adjacent snap points.
        if (difference) difference /= Math.abs(difference);

        var nearest = (startNearest + difference) * b;

        return nearest - a;
    },
    or: function(a, b, naturalEndPosition) {
        // From ES6, not in Safari yet.
        var MAX_SAFE_INTEGER = 9007199254740991;
        // Like modulo, but just finds the nearest in the array b.
        if (!Array.isArray(b)) return 0;
        var distance = MAX_SAFE_INTEGER;
        var nearest = naturalEndPosition;

        for (var i = 0; i < b.length; i++) {
            var dist = Math.abs(b[i] - naturalEndPosition);
            if (dist > distance) continue;
            distance = dist;
            nearest = b[i];
        }

        return nearest - a;
    }
};

function MotionConstraint(variable, op, value, options) {
    this.variable = variable;
    this.value = value;
    if (typeof op === 'string') {
        switch (op) {
        case '==': this.op = mc.equal; break;
        case '>=': this.op = mc.greater; break;
        case '<=': this.op = mc.less; break;
        case '<': this.op = mc.l; break;
        case '>': this.op = mc.g; break;
        case '%': this.op = mc.modulo; break;
        case '||': this.op = mc.or; break;
        }
    } else {
        this.op = op;
    }
    if (!options) options = {};
    this.overdragCoefficient = options.hasOwnProperty('overdragCoefficient') ? options.overdragCoefficient : 0.75;
    this.physicsModel = options.physicsModel;
    this.captive = options.captive || false;
}
// Some random physics models to use in options. Not sure these belong here.
MotionConstraint.underDamped = function() { return new Spring(1, 200, 20); }
MotionConstraint.criticallyDamped = function() { return new Spring(1, 200, Math.sqrt(4 * 1 * 200)); }
MotionConstraint.prototype.delta = function(naturalEndPosition, gestureStartPosition) {
    if (!naturalEndPosition) naturalEndPosition = this.variable;

    return this.op(this.variable, this.value, naturalEndPosition, gestureStartPosition);
}
MotionConstraint.prototype.createMotion = function(startPosition) {
    var motion = this.physicsModel ? this.physicsModel() : new Spring(1, 200, 20);//Math.sqrt(200 * 4));
    motion.snap(startPosition);
    return motion;
}

'use strict';
// This object updates all of the boxes from the constraint solver. It also tests
// all of the motion constraints and identifies which manipulator caused a motion
// constraint to be violated.
function MotionContext() {
    this._solver = new MultiEditSolver(new c.SimplexSolver());
    this._boxes = [];
    this._motionConstraints = [];
    this._manipulators = [];
    this._updating = false;
}
MotionContext.prototype.solver = function() { return this._solver; }
MotionContext.prototype.addBox = function(box) {
    this._boxes.push(box);
}
MotionContext.prototype.boxes = function() { return this._boxes; }
MotionContext.prototype.addMotionConstraint = function(motionConstraint) {
    this._motionConstraints.push(motionConstraint);
    return motionConstraint;
}
MotionContext.prototype.addManipulator = function(manipulator) {
    this._manipulators.push(manipulator);
    manipulator._setMotionContext(this);
    this.update(); // XXX: Remove -- constructing a Manipulator used to do this, moved it here but it should go.
    return manipulator;
}
MotionContext.prototype.update = function() {
    // Prevent re-entrancy which can happen when a motion constraint violation
    // causes an animation to be created which propagates another update.
    if (this._updating) return;
    this._updating = true;
    this._resolveMotionConstraints();
    for (var i = 0; i < this._boxes.length; i++) {
        this._boxes[i].update();
    }
    this._updating = false;
}
// Find out how a manipulator is related to a variable.
MotionContext.prototype._coefficient = function(manipulator, variable) {
    var solver = this._solver.solver();
    var v = manipulator.variable();
    // Iterate the edit variables in the solver. XXX: these are private and we need a real interface soon.
    var editVarInfo = solver._editVarMap.get(v);
    // No edit variable? No contribution to the current violation.
    if (!editVarInfo) return 0;
    // Now we can ask the coefficient of the edit's minus variable to the manipulator's variable. This
    // is what the solver does in suggestValue.
    var editMinus = editVarInfo.editMinus;
    // Get the expression that corresponds to the motion constraint's violated variable.
    // This is probably an "external variable" in cassowary.
    var expr = solver.rows.get(variable);
    if (!expr) return 0;
    // Finally we can compute the value.
    return expr.coefficientFor(editMinus);
}
MotionContext.prototype._resolveMotionConstraints = function() {
    var allViolations = {};

    // We want to call all manipulators so that those that previously were violating but now
    // are not get those violations removed.
    for (var i = 0; i < this._manipulators.length; i++) {
        var manipulator = this._manipulators[i];
        allViolations[manipulator.name()] = { manipulator: manipulator, violations: [] };
    }

    function addViolation(manipulator, motionConstraint, coefficient, delta) {
        var record = { motionConstraint: motionConstraint, coefficient: coefficient, delta: delta };
        var name = manipulator.name();
        if (!allViolations.hasOwnProperty(name)) {
            allViolations[name] = { manipulator: manipulator, violations: [record] };
        } else {
            allViolations[name].violations.push(record);
        }
    }
    function dispatchViolations() {
        for (var k in allViolations) {
            var info = allViolations[k];
            info.manipulator.hitConstraints(info.violations);
        }
    }

    for (var i = 0; i < this._motionConstraints.length; i++) {
        var pc = this._motionConstraints[i];
        var delta = pc.delta();
        if (delta == 0)
            continue;

        // Notify the manipulators that contributed to this violation.
        for (var j = 0; j < this._manipulators.length; j++) {
            var manipulator = this._manipulators[j];
            
            // If there's no delta and the manipulator isn't animating then it isn't a violation we want to deal
            // with now.
            if (delta == 0) continue;

            var c = this._coefficient(manipulator, pc.variable);

            // Do nothing if they're unrelated (i.e.: the coefficient is zero; this manipulator doesn't contribute).
            if (c == 0) continue;

            // We found a violation and the manipulator that contributed. Remember it and we'll
            // tell the manipulator about all the violations it contributed to at once afterwards
            // and it can decide what it's going to do about it...
            addViolation(manipulator, pc, c, delta);
        }
        // XXX: We should find ONE manipulator, or figure out which manipulator to target in the
        //      case of multiple. If we have one doing an animation, and one doing a touch drag
        //      then maybe we want to constrain the animating manipulator and let the touch one
        //      ride?
    }
    // Tell all the manipulators that we're done constraining.
    dispatchViolations();
}
MotionContext.prototype.stopOthers = function(variable) {
    // Kill all the manipulators that are animating this variable. There's a new touch point
    // that's now dominant.
    for (var i = 0; i < this._manipulators.length; i++) {
        var manipulator = this._manipulators[i];
        if (this._coefficient(manipulator, variable) != 0) manipulator.cancelAnimations();
    }
}

"use strict";

// Wrap the cassowary solver so that multiple clients can begin and end edits without conflicting.
// We do this by ending an edit session whenever we need to add or remove a variable from the current
// edit and then starting a new one and pushing all of the same suggestions back in.
function MultiEditSolver(solver) {
    this._solver = solver;
    this._editing = false;
    this._editVars = [];

    // More recent edits get a higher priority.
    this._priority = 0;

    // Hacky; figure out what the real API here is.
    this.add = this._solver.add.bind(this._solver);
    this.solve = this._solver.solve.bind(this._solver);
    this.resolve = this._solver.resolve.bind(this._solver);
    this.addConstraint = this._solver.addConstraint.bind(this._solver);
    this.removeConstraint = this._solver.removeConstraint.bind(this._solver);
}
MultiEditSolver.prototype.solver = function() { return this._solver; }
MultiEditSolver.prototype.beginEdit = function(variable, strength) {
    var idx = this._find(variable);
    if (idx != -1) {
        this._editVars[idx].count++;
        console.log('multiple edit sessions on ' + variable.name);
        return;
    }

    this._editVars.push({ edit: variable, strength: strength, priority: this._priority++, suggest: null, count: 1 });
    this._reedit();
}
MultiEditSolver.prototype._find = function(variable) {
    for (var i = 0; i < this._editVars.length; i++) {
        if (this._editVars[i].edit === variable) {
            return i;
        }
    }
    return -1;
}
MultiEditSolver.prototype.endEdit = function(variable) {
    var idx = this._find(variable);
    if (idx == -1) {
        console.warn('cannot end edit on variable that is not being edited');
        return;
    }
    this._editVars[idx].count--;
    if (this._editVars[idx].count == 0) {
        this._editVars.splice(idx, 1);
        this._reedit();
    }
}
MultiEditSolver.prototype.suggestValue = function(variable, value) {
    if (!this._editing) {
        console.warn('cannot suggest value when not editing');
        return;
    }
    var idx = this._find(variable);
    if (idx == -1) {
        console.warn('cannot suggest value for variable that we are not editing');
        return;
    }
    this._editVars[idx].suggest = value;
    this._solver.suggestValue(variable, value).resolve();
}
MultiEditSolver.prototype._reedit = function() {
    if (this._editing) {
        this._solver.endEdit();
        this._solver.removeAllEditVars();
    }
    this._editing = false;

    if (this._editVars.length == 0) {
        this._solver.resolve();
        return;
    }
    
    for (var i = 0; i < this._editVars.length; i++) {
        var v = this._editVars[i];

        this._solver.addEditVar(v.edit, v.strength, v.priority);
    }

    this._solver.beginEdit();

    // Now suggest all of the previous values again. Not sure if doing them
    // in a different order will cause a different outcome...
    for (var i = 0; i < this._editVars.length; i++) {
        var v = this._editVars[i];

        if (!v.suggest) continue;

        this._solver.suggestValue(v.edit, v.suggest);
    }

    // Finally resolve.
    this._solver.resolve();
    this._editing = true;
}

'use strict';

/*
Copyright 2014 Ralph Thomas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// This function sets up a requestAnimationFrame-based timer which calls
// the callback every frame while the physics model is still moving.
// It returns a function that may be called to cancel the animation.
function animation(physicsModel, callback) {
    
    function onFrame(handle, model, cb) {
        if (handle && handle.cancelled) return;
        cb(model);
        if (!physicsModel.done() && !handle.cancelled) {
            handle.id = requestAnimationFrame(onFrame.bind(null, handle, model, cb));
        }
    }
    function cancel(handle) {
        if (handle && handle.id)
            cancelAnimationFrame(handle.id);
        if (handle)
            handle.cancelled = true;
    }

    var handle = { id: 0, cancelled: false };
    onFrame(handle, physicsModel, callback);

    return { cancel: cancel.bind(null, handle), model: physicsModel };
}

'use strict';
/*
Copyright 2014 Ralph Thomas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/***
 * Friction physics simulation. Friction is actually just a simple
 * power curve; the only trick is taking the natural log of the
 * initial drag so that we can express the answer in terms of time.
 */
function Friction(drag) {
    this._drag = drag;
    this._dragLog = Math.log(drag);
    this._x = 0;
    this._v = 0;
    this._startTime = 0;
}
Friction.prototype.set = function(x, v) {
    this._x = x;
    this._v = v;
    this._startTime = (new Date()).getTime();
}
Friction.prototype.x = function(dt) {
    if (dt == undefined) dt = ((new Date()).getTime() - this._startTime) / 1000;
    return this._x + this._v * Math.pow(this._drag, dt) / this._dragLog - this._v / this._dragLog;
}
Friction.prototype.dx = function() {
    var dt = ((new Date()).getTime() - this._startTime) / 1000;
    return this._v * Math.pow(this._drag, dt);
}
Friction.prototype.done = function() {
    return Math.abs(this.dx()) < 1;
}
Friction.prototype.reconfigure = function(drag) {
    var x = this.x();
    var v = this.dx();
    this._drag = drag;
    this._dragLog = Math.log(drag);
    this.set(x, v);
}
Friction.prototype.configuration = function() {
    var self = this;
    return [
        {
            label: 'Friction',
            read: function() { return self._drag; },
            write: function(drag) { self.reconfigure(drag); },
            min: 0.001,
            max: 0.1,
            step: 0.001
        }
    ];
}

'use strict';
/*
Copyright 2014 Ralph Thomas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/***
 * Gravity physics simulation. This actually just simulates
 * Newton's second law, F=ma integrated to x' = x + v*t + 0.5*a*t*t.
 *
 * Note that gravity is never done, so we pass in an explicit termination point beyond which we
 * declare ourselves "done".
 */
function Gravity(acceleration, terminate) {
    this._acceleration = acceleration;
    this._terminate = terminate;

    this._x = 0;
    this._v = 0;
    this._a = acceleration;
    this._startTime = 0;
}
Gravity.prototype.set = function(x, v) {
    this._x = x;
    this._v = v;
    this._startTime = (new Date()).getTime();
}
Gravity.prototype.x = function(dt) {
    var t = (new Date()).getTime();
    if (dt == undefined) dt = (t - this._startTime) / 1000.0;
    return this._x + this._v * dt + 0.5 * this._a * dt * dt;
}
Gravity.prototype.dx = function() {
    var t = (new Date()).getTime();
    var dt = (t - this._startTime) / 1000.0;

    return this._v + dt * this._a;
}
Gravity.prototype.done = function() {
    return Math.abs(this.x()) > this._terminate;
}
Gravity.prototype.reconfigure = function(a) {
    this.set(this.x(), this.dx());
    this._a = a;
}
Gravity.prototype.configuration = function() {
    var self = this;
    return [
        { label: 'Acceleration', read: function() { return self._a; }, write: this.reconfigure.bind(this), min: -3000, max: 3000 }
    ];
}

/**
 * This is an adaptation of Gravity to have a "floor" at 0. When the object hits
 * the floor its velocity is inverted so that it bounces.
 */
function GravityWithBounce(acceleration, absorb) {
    this._gravity = new Gravity(acceleration, 0);
    this._absorb = absorb || 0.8;
    this._reboundedLast = false;
}
GravityWithBounce.prototype.set = function(x, v) { this._gravity.set(x, v); }
GravityWithBounce.prototype.x = function() {
    var x = this._gravity.x();
    // If x goes past zero then we're travelling under the floor, so invert
    // the velocity.
    // The end condition here is hacky; if we rebound two frames in a row then
    // we decide we're done. Don't skip too many frames!
    if (x > 0) {
        if (this._reboundedLast) return 0;
        this._reboundedLast = true;
        var v = this._gravity.dx();
        if (Math.abs(v * this._absorb) > Math.abs(this._gravity._a * 2) / 60)
            this._gravity.set(0, -v * this._absorb);
        return 0;
    }
    this._reboundedLast = false;
    return x;
}
GravityWithBounce.prototype.dx = function() { return this._gravity.dx(); }
GravityWithBounce.prototype.done = function() {
    return this._gravity.x() > 1;
}
GravityWithBounce.prototype.reconfigure = function(a, absorb) {
    this._gravity.reconfigure(a);
    this._absorb = absorb || 0.8;
}
GravityWithBounce.prototype.configuration = function() {
    var self = this;
    var conf = this._gravity.configuration();
    conf.push({
        label: 'Rebound',
        read: function() { return self._absorb; },
        write: function(val) { self._absorb = val; },
        min: 0,
        max: 1.1,
        step: 0.1
    });
    return conf;
}

'use strict';
/*
Copyright 2014 Ralph Thomas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var epsilon = 0.001;

function almostEqual(a, b, epsilon) {
    return (a > (b - epsilon)) && (a < (b + epsilon));
}

function almostZero(a, epsilon) {
    return almostEqual(a, 0, epsilon);
}

/***
 * Simple Spring implementation -- this implements a damped spring using a symbolic integration
 * of Hooke's law: F = -kx - cv. This solution is significantly more performant and less code than
 * a numerical approach such as Facebook Rebound which uses RK4.
 *
 * This physics textbook explains the model:
 *  http://www.stewartcalculus.com/data/CALCULUS%20Concepts%20and%20Contexts/upfiles/3c3-AppsOf2ndOrders_Stu.pdf
 *
 * A critically damped spring has: damping*damping - 4 * mass * springConstant == 0. If it's greater than zero
 * then the spring is overdamped, if it's less than zero then it's underdamped.
 */
function Spring(mass, springConstant, damping) {
    var self = this;
    self._m = mass;
    self._k = springConstant;
    self._c = damping;
    self._solution = null;
    self._endPosition = 0;
    self._startTime = 0;
}
Spring.prototype._solve = function(initial, velocity) {
    var c = this._c;
    var m = this._m;
    var k = this._k;
    // Solve the quadratic equation; root = (-c +/- sqrt(c^2 - 4mk)) / 2m.
    var cmk = c * c - 4 * m * k;
    if (cmk == 0) {
        // The spring is critically damped.
        // x = (c1 + c2*t) * e ^(-c/2m)*t
        var r = -c / (2 * m);
        var c1 = initial;
        var c2 = velocity / (r * initial);
        return {
            x: function(t) {
                return (c1 + c2 * t) * Math.pow(Math.E, r * t);
            },
            dx: function(t) {
                var pow = Math.pow(Math.E, r * t);
                return r * (c1 + c2 * t) * pow + c2 * pow;
            }
        };
    } else if (cmk > 0) {
        // The spring is overdamped; no bounces.
        // x = c1*e^(r1*t) + c2*e^(r2t)
        // Need to find r1 and r2, the roots, then solve c1 and c2.
        var r1 = (-c - Math.sqrt(cmk)) / (2 * m);
        var r2 = (-c + Math.sqrt(cmk)) / (2 * m);
        var c2 = (velocity - r1 * initial) / (r2 - r1);
        var c1 = initial - c2;

        return {
            x: function(t) {
                return (c1 * Math.pow(Math.E, r1 * t) + c2 * Math.pow(Math.E, r2 * t));
            },
            dx: function(t) {
                return (c1 * r1 * Math.pow(Math.E, r1 * t) + c2 * r2 * Math.pow(Math.E, r2 * t));
            }
        };
    } else {
        // The spring is underdamped, it has imaginary roots.
        // r = -(c / 2*m) +- w*i
        // w = sqrt(4mk - c^2) / 2m
        // x = (e^-(c/2m)t) * (c1 * cos(wt) + c2 * sin(wt))
        var w = Math.sqrt(4 * m * k - c * c) / (2 * m);
        var r = -(c / 2 * m);
        var c1 = initial;
        var c2 = (velocity - r * initial) / w;

        return {
            x: function(t) {
                return Math.pow(Math.E, r * t) * (c1 * Math.cos(w * t) + c2 * Math.sin(w * t));
            },
            dx: function(t) {
                var power = Math.pow(Math.E, r * t);
                var cos = Math.cos(w * t);
                var sin = Math.sin(w * t);
                return power * (c2 * w * cos - c1 * w * sin) + r * power * (c2 * sin + c1 * cos);
            }
        };
    }
}
Spring.prototype.x = function(dt) {
    if (dt == undefined) dt = ((new Date()).getTime() - this._startTime) / 1000.0;
    return this._solution ? this._endPosition + this._solution.x(dt) : 0;
}
Spring.prototype.dx = function(dt) {
    if (dt == undefined) dt = ((new Date()).getTime() - this._startTime) / 1000.0;
    return this._solution ? this._solution.dx(dt) : 0;
}
Spring.prototype.setEnd = function(x, velocity, t) {
    if (!t) t = (new Date()).getTime();
    if (x == this._endPosition && almostZero(velocity, epsilon)) return;
    velocity = velocity || 0;
    var position = this._endPosition;
    if (this._solution) {
        // Don't whack incoming velocity.
        if (almostZero(velocity, epsilon))
            velocity = this._solution.dx((t - this._startTime) / 1000.0);
        position = this._solution.x((t - this._startTime) / 1000.0);
        if (almostZero(velocity, epsilon)) velocity = 0;
        if (almostZero(position, epsilon)) position = 0;
        position += this._endPosition;
    }
    if (this._solution && almostZero(position - x, epsilon) && almostZero(velocity, epsilon)) {
        return;
    }
    this._endPosition = x;
    this._solution = this._solve(position - this._endPosition, velocity);
    this._startTime = t;
}
Spring.prototype.snap = function(x) {
    this._startTime = (new Date()).getTime();
    this._endPosition = x;
    this._solution = {
        x: function() {
            return 0;
        },
        dx: function() {
            return 0;
        }
    };
}
Spring.prototype.done = function(t) {
    if (!t) t = (new Date()).getTime();
    return almostEqual(this.x(), this._endPosition, epsilon) && almostZero(this.dx(), epsilon);
}
Spring.prototype.reconfigure = function(mass, springConstant, damping) {
    this._m = mass;
    this._k = springConstant;
    this._c = damping;

    if (this.done()) return;
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = (new Date()).getTime();
}
Spring.prototype.springConstant = function() {
    return this._k;
}
Spring.prototype.damping = function() {
    return this._c;
}

Spring.prototype.configuration = function() {
    var self = this;

    function setSpringConstant(s, c) {
        s.reconfigure(1, c, s.damping());
    };

    function setSpringDamping(s, d) {
        s.reconfigure(1, s.springConstant(), d);
    }
    return [{
        label: 'Spring Constant',
        read: self.springConstant.bind(self),
        write: setSpringConstant.bind(self, self),
        min: 100,
        max: 1000
    }, {
        label: 'Damping',
        read: self.damping.bind(self),
        write: setSpringDamping.bind(self, self),
        min: 1,
        max: 500
    }];
}
"use strict";

// Helpers to make cassowary.js a bit clearer.
var weak = c.Strength.weak;
var medium = c.Strength.medium;
var strong = c.Strength.strong;
var required = c.Strength.required;

var eq = function(a1, a2, strength, w) {
	return new c.Equation(a1, a2, strength || weak, w || 0);
};
var neq = function(a1, a2, a3) {
	return new c.Inequality(a1, a2, a3);
};
var geq = function(a1, a2, str, w) {
	return new c.Inequality(a1, c.GEQ, a2, str, w);
};
var leq = function(a1, a2, str, w) {
	return new c.Inequality(a1, c.LEQ, a2, str, w);
};

var stay = function(v, strength, weight) {
	return new c.StayConstraint(v, strength || weak, weight || 0);
};
var weakStay = function(v, w) {
	return stay(v, weak, w || 0);
};
var mediumStay = function(v, w) {
	return stay(v, medium, w || 0);
};
var strongStay = function(v, w) {
	return stay(v, strong, w || 0);
};
var requiredStay = function(v, w) {
	return stay(v, required, w || 0);
};
(function() {
	'use strict';

	angular.module('dish.sheet', []);
})();
(function() {
	'use strict';

	function DishSheetService($window, $q, $ionicActionSheet, $timeout) {
		var _self = this;
		var sheetActive = false;

		_self.show = function _show(options) {
			var deferred = $q.defer();
			var actionSheet;

			if (sheetActive) {
				return deferred.promise;
			}

			if (!options) {
				deferred.reject({
					error: 'No options included for action sheet.'
				});
			}

			sheetActive = true;

			actionSheet = $ionicActionSheet.show({
				buttons: options,
				cancelText: 'Cancel',
				cancel: function() {
					sheetActive = false;
				},
				buttonClicked: function(index) {
					sheetActive = false;
					actionSheet(); //Close the actionSheet
					deferred.resolve(index);
				}
			})
			return deferred.promise;
		};
	};

	DishSheetService.$inject = ['$window', '$q', '$ionicActionSheet', '$timeout'];

	angular.module('dish.sheet')
		.service('dishSheetService', DishSheetService);
})();
(function() {
	'use strict';

	angular.module('dish.alert', []);
})();
(function() {
	'use strict';

	function DishAlertService($window, $q, $ionicPopup, $timeout) {
		var _self = this;
		var alertActive = false;

		_self.show = function _showAlert(data) {
			var deferred = $q.defer();
			var alertPopup;

			if (alertActive) {
				return deferred.promise;
			}

			if (!data) {
				deferred.reject({
					error: 'No data included for alert.'
				});
			}

			alertActive = true;

			alertPopup = $ionicPopup.alert({
				title: '',
				template: data.message,
				buttons: [{
					text: data.buttonText
				}]
			});

			alertPopup.then(function(res) {
				alertActive = false;
				deferred.resolve(res);
			});

			return deferred.promise;
		};
	};

	DishAlertService.$inject = ['$window', '$q', '$ionicPopup', '$timeout'];

	angular.module('dish.alert')
		.service('dishAlertService', DishAlertService);
})();
(function() {
	'use strict';

	angular.module('dish.slider', []);
})();
(function() {
	'use strict';

	function DishSliderService($window, $q, $timeout, $ionicSlideBoxDelegate) {
		var _self = this;

		_self.enableSlide = function _enableSlide(enabled) {
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').enableSlide(enabled);
		};

		_self.slide = function _slide(index, speed) {
			//console.log('DishSliderService slide');
			window.disableConstantFocus = true;
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').slide(index, speed);
			$timeout(function() {
				window.disableConstantFocus = false;
			}, 400);
		};

		_self.currentIndex = function _currentIndex() {
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').currentIndex();
		}
	}

	DishSliderService.$inject = ['$window', '$q', '$timeout', '$ionicSlideBoxDelegate'];

	angular.module('dish.slider')
		.service('dishSliderService', DishSliderService);
})();
(function() {
	'use strict';

	function DishSliderDirective($window, $q, $compile, $templateRequest, $ionicSlideBoxDelegate, dishSliderService) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				onSlideChanged: '&'
			},
			link: function(scope, elm, attrs, ctrl, transclude) {
				//Get the type and use that as the name of the modal, showing a default modal if the template doesn't exist
				var templateUrl;

				transclude(scope, function(clones) {
					angular.forEach(clones, function(clone) {
						if (clone.tagName === 'DISH-SLIDE') {
							//console.log('found', clone);
							templateUrl = clone.attributes.template.value;
							scope.slides.push(templateUrl);
						}
					});
				});

				//dishSliderService.enableSlide(false);
			},
			controller: ['$scope', function($scope) {
				$scope.slides = [];
				$scope.slide = function(index) {
					dishSliderService.slide(index);
				};
			}],
			template: '<ion-slide-box class="dish-slider" show-pager="false" delegate-handle="dishSlider" active-slide="0"><dish-slide ng-repeat="slide in slides" template="{{slide}}"></dish-slide></ion-slide-box>'
		};
	}

	DishSliderDirective.$inject = ['$window', '$q', '$compile', '$templateRequest', '$ionicSlideBoxDelegate', 'dishSliderService'];

	angular.module('dish.slider')
		.directive('dishSlider', DishSliderDirective);
})();
(function() {
	'use strict';

	function DishSlideDirective($window, $q, $templateRequest, $compile) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			link: function(scope, elm, attrs, ctrl) {
				//console.log('dishSlide!', elm, attrs);
				//Get the templateContentUrl and use that to display the appropriate content page
				var templateContentUrl = attrs.template;
				$templateRequest(templateContentUrl).then(function(html) {
					var template = angular.element(html);
					elm.append(template);
					$compile(template)(scope);
				});
				elm[0].classList.add('slider-slide');
			},
		};
	}

	DishSlideDirective.$inject = ['$window', '$q', '$templateRequest', '$compile'];

	angular.module('dish.slider')
		.directive('dishSlide', DishSlideDirective);
})();
(function() {
	'use strict';

	angular.module('dish.gallery', []);
})();
(function() {
	'use strict';

	function DishGalleryService($log, $window, $q, $ionicSlideBoxDelegate) {
		var _self = this,
			deferred;

		_self.enableSlide = function _enableSlide(enabled) {
			console.log('name', enabled);
			$ionicSlideBoxDelegate.$getByHandle('dishGallery').enableSlide(enabled);
		};

		_self.slide = function _slide(index, speed) {
			deferred = $q.defer();
			//console.log('DishGalleryService slide');
			window.disableConstantFocus = true;
			$ionicSlideBoxDelegate.$getByHandle('dishGallery').slide(index, speed);
			$timeout(function() {
				window.disableConstantFocus = false;
				deferred.resolve();
			}, 400);

			return deferred.promise;
		};

		_self.update = function _update() {
			$log.log('update');
			$ionicSlideBoxDelegate.$getByHandle('dishGallery').update();
		}

		_self.currentIndex = function _currentIndex() {
			$ionicSlideBoxDelegate.$getByHandle('dishGallery').currentIndex();
		}
	}

	DishGalleryService.$inject = ['$log', '$window', '$q', '$ionicSlideBoxDelegate'];

	angular.module('dish.gallery')
		.service('dishGalleryService', DishGalleryService);
})();
(function() {
	'use strict';

	function DishGalleryDirective($log, $window, $q, $timeout, $ionicSlideBoxDelegate, dishGalleryService, dishModalService) {
		return {
			restrict: 'E',
			require: 'ngModel',
			scope: {
				ngModel: '=',
				onSlideChanged: '&'
			},
			link: function($scope, elm, attrs, ctrl) {
				//$log.log('link', $scope.ngModel);
				//Populate the intitial gallery when the data is loaded in from firebase
				$scope.$watchCollection('ngModel', function(nv, ov) {
					if (!$scope.slides.length) {
						angular.forEach(nv, function(slide) {
							$scope.slides.push(slide);
						});
					}
				});

				//$log.log('slides', $scope.slides);

				$scope.pager = attrs.pager;
			},
			controller: ['$scope', function($scope) {
				$scope.slides = [];

				$scope.slide = function(index) {
					dishGalleryService.slide(index);
				};

				//We need this so that we can force the slider to update it's dimensions whenever it's loaded, as it won't display otherwise
				$scope.updateSlider = function() {
					dishGalleryService.update();
				}

				$scope.preview = function _preview(slide) {
					//$log.log('preview!', slide);
					$scope.previewImage = slide;
					dishModalService.open($scope, 'preview');
				};
			}],
			template: '<ion-slide-box class="dish-gallery" show-pager="{{pager}}" delegate-handle="dishGallery" active-slide="0"><ion-slide class="dish-gallery-slide" ng-repeat="slide in slides" style="background-image:url({{slide}});" ng-init="updateSlider()"></ion-slide></ion-slide-box>'
		};
	}

	DishGalleryDirective.$inject = ['$log', '$window', '$q', '$timeout', '$ionicSlideBoxDelegate', 'dishGalleryService', 'dishModalService'];

	angular.module('dish.gallery')
		.directive('dishGallery', DishGalleryDirective);
})();
/*
 * angular-read-more v1.0.0
 * (c) 2014-2015 Hitesh Modha
 * License: MIT
 */

'use strict';

angular
	.module('dish.more', ['ngAnimate'])
	.directive('readMore', readMore)
	.config(function($logProvider) {
		$logProvider.debugEnabled(false);
	});

/** @ngInject */
function readMore($templateCache) {
	var directive = {
		restrict: 'AE',
		scope: {
			text: '@',
			limit: '@',
			dotsClass: '@'
		},
		template: $templateCache.get('readmore.template.html'),
		controller: ReadMoreController,
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

	/** @ngInject */
	// "bindToController: true" binds scope variables to Controller
	function ReadMoreController($filter, $scope, $log) {
		var vm = this;
		vm.toggle = {
			dots: '...',
			dotsClass: vm.dotsClass
		}

		function setShowToggle() {
			$log.debug('setShowToggle');
			vm.toggle.show = vm.moreText && vm.moreText.length > 0;
		}

		$scope.$watch('vm.dotsClass', function(newValue, oldValue) {
			if (newValue != oldValue) {
				$log.debug('DotsClass changed');
				vm.toggle.dotsClass = vm.dotsClass;
			}
		});

		// ----------

		// If negative number, set to undefined
		function validateLimit() {
			$log.debug('validateLimit');
			vm.limit = (vm.limit && vm.limit <= 0) ? undefined : vm.limit;
		}

		function getMoreTextLimit() {
			$log.debug('getMoreTextLimit');
			return vm.limit && vm.limit < vm.text.length ? vm.limit - vm.text.length : 0;
		}

		function setLessAndMoreText() {
			vm.lessText = $filter('limitTo')(vm.text, vm.limit);
			vm.moreText = $filter('limitTo')(vm.text, getMoreTextLimit());
			$log.debug('setLessAndMoreText', vm.text, vm.limit, vm.lessText, vm.moreText);
		}

		function initialize() {
			$log.debug('initialize');
			validateLimit();
			setLessAndMoreText();
			setShowToggle();
		}

		initialize();

		$scope.$watch('vm.text', function(newValue, oldValue) {
			$log.debug('vm.text', vm.text, newValue, oldValue);
			$log.debug('Text changed');
			validateLimit();
			setLessAndMoreText();
			setShowToggle();
		});

		$scope.$watch('vm.limit', function(newValue, oldValue) {
			$log.debug('vm.limit', vm.limit);
			if (newValue != oldValue) {
				$log.debug('Limit changed');
				validateLimit();
				setLessAndMoreText();
				setShowToggle();
			}
		});
	}
};

angular.module("dish.more").run(["$templateCache", function($templateCache) {
	$templateCache.put("readmore.template.html", "<span name=\"text\">\n	<span>{{ vm.lessText }}</span><span ng-show=\"vm.showMoreText\" class=\"more-show-hide\">{{ vm.moreText }}</span>\n</span>\n\n<span class=\"more\" name=\"toggle\" ng-show=\"vm.toggle.show\">\n	<span ng-class=\"vm.toggle.dotsClass\" ng-show=\"!vm.toggle.state\">{{ vm.toggle.dots }}</span>\n	<a ng-class=\"vm.toggle.linkClass\" ng-click=\"vm.doToggle()\">{{ vm.toggle.text }}</a>\n</span>\n");
}]);
(function() {
  'use strict';

  angular.module('dish.tray', []);
})();
(function() {
  'use strict';

  function DishTrayFactory($scope) {
    return {
      transitionUp: function() {
        console.log('up');
        draggableTray.transitionUp();
      },
      transitionDown: function() {
        console.log('down');
        draggableTray.transitionDown();
      },
      transitionHide: function() {
        console.log('hide');
        draggableTray.transitionHide();
      }
    }
  };

  DishTrayFactory.$inject = ['$scope'];

  angular.module('dish.tray')
    .factory('$dishTrayDelegate', DishTrayFactory);
})();
(function(ionic) {
  'use strict';

  function DishTrayDirective($ionicScrollDelegate) {
    // Get transform origin poly
    var d = document.createElement('div');
    var transformKeys = ['webkitTransformOrigin', 'transform-origin', '-webkit-transform-origin', 'webkit-transform-origin',
      '-moz-transform-origin', 'moz-transform-origin', 'MozTransformOrigin', 'mozTransformOrigin'
    ];

    var TRANSFORM_ORIGIN = 'webkitTransformOrigin';
    for (var i = 0; i < transformKeys.length; i++) {
      if (d.style[transformKeys[i]] !== undefined) {
        TRANSFORM_ORIGIN = transformKeys[i];
        break;
      }
    }

    var transitionKeys = ['webkitTransition', 'transition', '-webkit-transition', 'webkit-transition',
      '-moz-transition', 'moz-transition', 'MozTransition', 'mozTransition'
    ];
    var TRANSITION = 'webkitTransition';
    for (var i = 0; i < transitionKeys.length; i++) {
      if (d.style[transitionKeys[i]] !== undefined) {
        TRANSITION = transitionKeys[i];
        break;
      }
    }

    var SwipeableCardView = ionic.views.View.inherit({
      /**
       * Initialize a card with the given options.
       */
      initialize: function(opts) {
        opts = ionic.extend({}, opts);

        ionic.extend(this, opts);

        this.el = opts.el;

        this.openY = opts.openY;

        this.closedY = opts.closedY;

        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.openY) + 'px, 0)';

        this.open = false;

        this.bindEvents();
      },

      /**
       * Disable transitions on the card (for when dragging)
       */
      disableTransition: function(animationClass) {
        this.el.classList.remove(animationClass);
      },

      /**
       * Fly the tray up or animate back into resting position.
       */
      transitionOut: function(e, direction) {
        $ionicScrollDelegate.freezeScroll(false);
        var self = this;

        //console.log('drag', this.y);

        //Bounce back threshold
        if (this.y < -400) {
          console.log('FLY UP', this.y);
          this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
          this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.openY) + 'px, 0)';
          this.open = true;
          setTimeout(function() {
            self.el.style[TRANSITION] = 'none';
          }, 200);
        } else {
          console.log('FLY DOWN', this.y);
          // Fly out
          this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
          this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.closedY) + 'px, 0)';
          this.open = false;
          setTimeout(function() {
            self.el.style[TRANSITION] = 'none';
          }, 200);
        }
      },

      transitionUp: function(e) {
        $ionicScrollDelegate.freezeScroll(false);
        console.log('transitionUp');
        var self = this;

        this.swiped = true;
        this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.openY) + 'px, 0)';
        this.open = true;
        setTimeout(function() {
          self.el.style[TRANSITION] = 'none';
          this.swiped = false;
        }, 200);
      },

      transitionDown: function(e) {
        $ionicScrollDelegate.freezeScroll(false);
        console.log('transitionDown');
        var self = this;

        this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.closedY) + 'px, 0)';
        this.open = false;
        setTimeout(function() {
          self.el.style[TRANSITION] = 'none';
          this.swiped = false;
        }, 200);
      },

      /**
       * Bind drag events on the card.
       */
      bindEvents: function() {
        var self = this;
        ionic.onGesture('dragstart', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doDragStart(e)
          });
        }, this.el);

        ionic.onGesture('dragup', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doDrag(e)
          });
        }, this.el);

        ionic.onGesture('dragdown', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doDrag(e)
          });
        }, this.el);

        ionic.onGesture('dragend', function(e) {
          ionic.requestAnimationFrame(function() {
            if (self.swiped) {
              return false;
            } else {
              self._doDragEnd(e);
            }
          });
        }, this.el);

        ionic.onGesture('swipeup', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doSwipeUp(e)
          });
        }, this.el);

        ionic.onGesture('swipedown', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doSwipeDown(e)
          });
        }, this.el);
      },

      _doDragStart: function(e) {
        //$ionicScrollDelegate.freezeScroll(true);
        var width = this.el.offsetWidth;
        var point = window.innerWidth / 2 + this.rotationDirection * (width / 2)
        var distance = Math.abs(point - e.gesture.touches[0].pageX); // - window.innerWidth/2);
        //console.log('dragStart',distance);

        this.touchDistance = distance * 10;

      },

      _doDrag: function(e) {
        $ionicScrollDelegate.freezeScroll(true);
        var o = e.gesture.deltaY / 3;

        /*if (this.open) {
          this.y = this.openY + (e.gesture.deltaY * 0.4);
        } else {
          this.y = this.closedY + (e.gesture.deltaY * 0.50);
        }*/

        if (this.open) {
          this.y = this.openY + (e.gesture.deltaY * 0.75);
        } else {
          this.y = this.closedY + (e.gesture.deltaY * 0.75);
        }

        this.swiped = false;

        console.log('drag', this.y);

        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + this.y + 'px, 0)';
      },
      _doDragEnd: function(e, direction) {
        this.transitionOut(e, direction);
      },
      _doSwipeUp: function(e, direction) {
        this.transitionUp(e, direction);
      },
      _doSwipeDown: function(e, direction) {
        this.transitionDown(e, direction);
      }
    });

    return {
      restrict: 'E',
      template: '<div class="dish-tray" ng-transclude></div>',
      replace: true,
      transclude: true,
      compile: function(element, attr) {
        return function($scope, $element, $attr, swipeCards) {
          var el = $element[0];
          // Instantiate our card view - lazy hack to get events going
          window.draggableTray = new SwipeableCardView({
            el: el,
            openY: -window.innerHeight,
            closedY: 0
          });
        }
      }
    }
  };

  DishTrayDirective.$inject = ['$ionicScrollDelegate'];

  angular.module('dish.tray')
    .directive('dishTray', DishTrayDirective);
})(window.ionic);
(function() {
	'use strict';

	angular.module('dish.drawer', []);
})();
(function() {
	'use strict';

	function DishDrawerController($log, $element, $attr, $ionicGesture, $document, dishCardsService) {
		var el = $element[0];
		$log.log('el', el);
		var dragging = false;
		var open = false;
		var startX, lastX, offsetX, newX;
		var side;

		// How far to drag before triggering
		var thresholdX = 15;
		// How far from edge before triggering
		var edgeX = 40;

		//Formula used to calculate dragging
		var calcX;

		var LEFT = 0;
		var RIGHT = 1;

		var isTargetDrag = false;

		var width = $element[0].clientWidth;
		var lastWidth = 0;

		var enableAnimation = function() {
			$element.addClass('animate');
		};
		var disableAnimation = function() {
			$element.removeClass('animate');
		};

		// Check if this is on target or not
		var isTarget = function(el) {
			while (el) {
				if (el === $element[0]) {
					return true;
				}
				el = el.parentNode;
			}
		};

		var startDrag = function(e) {
			dishCardsService.disable();
			disableAnimation();
			dragging = true;
			offsetX = lastX - startX;
			//$log.log('Starting drag',lastX,startX,offsetX);
			//$log.log('Offset:', offsetX);
		};

		var startTargetDrag = function(e) {
			dishCardsService.disable();
			disableAnimation();

			dragging = true;
			isTargetDrag = true;
			//lastX = 0;
			offsetX = lastX - startX;
			console.log('startTargetDrag', lastX, startX);
			/*if (newX === 0) {
				$log.log('drawer is already open and we\'re dragging in that region');
				lastX = 0;
				startX = 0;
			}*/
			//$log.log('Starting target drag', offsetX, lastX, startX);
			//$log.log('Offset:', offsetX);
		};

		var doDrag = function(e) {
			if (e.defaultPrevented) {
				return;
			}

			if (!lastX) {
				startX = e.gesture.touches[0].pageX;
			}

			//If the drawer is open, set startX to the lastX value so that we don't get the drawer jumping if the user drags in the middle of the drawer instead of on the edge of the screen
			if (open) {
				startX = lastX;
			}

			lastX = e.gesture.touches[0].pageX;

			if (!dragging) {
				// Dragged 15 pixels and finger is by edge
				if (Math.abs(lastX - startX) > thresholdX) {
					if (isTarget(e.target)) {
						startTargetDrag(e);
					} else if (startX < edgeX) {
						startDrag(e);
					}
				}
			} else {
				if (open) {
					calcX = (0 + (lastX - offsetX));
					newX = Math.min(0, calcX);
					//$log.log('values', lastX, startX, offsetX);
				} else {
					calcX = (-width + (lastX - offsetX));
					newX = Math.min(0, calcX);
				}
				ionic.requestAnimationFrame(function() {
					el.style.transform = el.style.webkitTransform = 'translate3d(' + newX + 'px, 0, 0)';
				});

			}
			if (dragging) {
				e.gesture.srcEvent.preventDefault();
			}
		};

		var doEndDrag = function(e) {
			//$log.log('doEndDrag');
			startX = null;
			lastX = null;
			offsetX = null;
			isTargetDrag = false;

			if (!dragging) {
				return;
			}

			dragging = false;

			//$log.log('End drag');
			enableAnimation();

			//Don't re-enable the dishCardsService if a card is currently active
			var activeCard = dishCardsService.activeCard;
			if (!activeCard) {
				dishCardsService.enable();
			}

			ionic.requestAnimationFrame(function() {
				var calc;
				if (open) {
					calc = (newX < (-width / 4));
				} else {
					calc = (newX < (-width / 2));
				}
				//$log.log('calc', calc);
				if (calc) {
					//$log.log('close');
					open = false;
					el.style.transform = el.style.webkitTransform = 'translate3d(' + -width + 'px, 0, 0)';
				} else {
					open = true;
					//$log.log('open');
					el.style.transform = el.style.webkitTransform = 'translate3d(0px, 0, 0)';
				}
			});
		};

		side = $attr.side == 'left' ? LEFT : RIGHT;
		//$log.log(side);

		//We listen to the touchStart events so that we can disable the dishCardsService and prevent any scrolling if the user wants to drag open the drawer.
		var touchStart = function(e) {
			//$log.log('drawer touchStart', e);
			//Check if we're in the drag region and disable the dishCardsService if we are
			startX = e.touches[0].pageX;

			if (!dragging) {
				// If the finger is by the edge by within 15 pixels
				if (startX < thresholdX) {
					$log.log('edge disable');
					dishCardsService.disable();
				}
			}
		};

		document.body.addEventListener('touchstart', touchStart, false);

		$ionicGesture.on('drag', function(e) {
			doDrag(e);
		}, $document);
		$ionicGesture.on('dragend', function(e) {
			doEndDrag(e);
		}, $document);


		this.close = function() {
			open = false;
			//Don't re-enable the dishCardsService if a card is currently active
			var activeCard = dishCardsService.activeCard;
			if (!activeCard) {
				dishCardsService.enable();
			}
			enableAnimation();
			ionic.requestAnimationFrame(function() {
				if (side === LEFT) {
					el.style.transform = el.style.webkitTransform = 'translate3d(-100%, 0, 0)';
				} else {
					el.style.transform = el.style.webkitTransform = 'translate3d(100%, 0, 0)';
				}
			});
		};

		this.open = function() {
			open = true;
			dishCardsService.disable();
			enableAnimation();
			ionic.requestAnimationFrame(function() {
				//$log.log('run open', el);
				if (side === LEFT) {
					el.style.transform = el.style.webkitTransform = 'translate3d(0%, 0, 0)';
				} else {
					el.style.transform = el.style.webkitTransform = 'translate3d(0%, 0, 0)';
				}
			});
		};
	}

	DishDrawerController.$inject = ['$log', '$element', '$attrs', '$ionicGesture', '$document', 'dishCardsService'];

	angular.module('dish.drawer')
		.controller('dishDrawerController', DishDrawerController);
})();
(function() {
	'use strict';

	function DishDrawerDirective($log) {
		return {
			restrict: 'E',
			controller: 'dishDrawerController',
			link: function($scope, $element, $attr, ctrl) {
				$element.addClass($attr.side);
				$scope.openDrawer = function() {
					//$log.log('open');
					ctrl.open();
				};
				$scope.closeDrawer = function() {
					//$log.log('close');
					ctrl.close();
				};
			}
		}
	}

	function DishDrawerCloseDirective($log) {
		return {
			restrict: 'A',
			link: function($scope, $element) {
				//$log.log('element', $element);
				$element.bind('click', function() {
					$scope.closeDrawer();
				});
			}
		}
	}

	function DishDrawerOpenDirective($log) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attr, ctrl) {
				$element.bind('click', function() {
					$scope.openDrawer();
				});
			}
		}
	}

	DishDrawerDirective.$inject = ['$log'];
	DishDrawerCloseDirective.$inject = ['$log'];
	DishDrawerOpenDirective.$inject = ['$log'];

	angular.module('dish.drawer')
		.directive('dishDrawer', DishDrawerDirective)
		.directive('dishDrawerClose', DishDrawerCloseDirective)
		.directive('dishDrawerOpen', DishDrawerOpenDirective);
})();
(function() {
	'use strict';

	angular.module('dish.modal', []);
})();
(function() {
	'use strict';

	function DishModalService($window, $q, $ionicModal) {
		var _self = this;
		var dishModal, modalUrl;

		_self.open = function open($scope, name) {
			if (!name) return;
			modalUrl = 'views/dish-' + name + '/' + 'dish-' + name + '-modal.html';
			$ionicModal.fromTemplateUrl(modalUrl, {
				scope: $scope,
				hardwareBackButtonClose: false,
				focusFirstInput: true,
				animation: 'slide-in-up'
			}).then(function(modal) {
				dishModal = modal;
				dishModal.show();
			});
		};

		_self.close = function close() {
			if (!dishModal) return;
			dishModal.hide();
			dishModal.remove();
		};
	}

	DishModalService.$inject = ['$window', '$q', '$ionicModal'];

	angular.module('dish.modal')
		.service('dishModalService', DishModalService);
})();
(function() {
	'use strict';
	angular.module('dish.photo', []);
})();
(function() {
	'use strict';

	function DishPhoto($q, $cordovaCamera, dishSheetService, dishAlertService) {
		return {
			restrict: 'E',
			replace: true,
			require: 'ngModel',
			scope: {
				ngModel: '='
			},
			link: function(scope, elm, attrs, ctrl) {
				//console.log('Dish-photo', scope, attrs);
			},
			controller: ['$scope', function($scope) {
				var _self = $scope;
				var options = [];
				var message = {};
				if (navigator.camera) {
					var imageOptions;
				}

				//Set the photo if the model exists
				//if (_self.ngModel) {
				console.log('_self', _self.ngModel);
				_self.photo = _self.ngModel;
				//}

				_self.openPicker = function() {
					console.log('DishPhoto', $scope.ngModel, $scope.type, imageOptions);
					options[0] = {
						text: 'Choose from Library'
					};
					options[1] = {
						text: 'Take Photo'
					};
					dishSheetService.show(options).then(function(button) {
						if (button === 0) {
							console.log('Take from library');
							imageOptions = {
								quality: 50,
								destinationType: Camera.DestinationType.DATA_URL,
								sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
								allowEdit: false,
								targetWidth: 800,
								targetHeight: 800,
								encodingType: Camera.EncodingType.JPEG,
								popoverOptions: CameraPopoverOptions,
								saveToPhotoAlbum: false
							};
						}
						if (button === 1) {
							console.log('Take photo');
							imageOptions = {
								quality: 50,
								destinationType: Camera.DestinationType.DATA_URL,
								sourceType: Camera.PictureSourceType.CAMERA,
								allowEdit: false,
								targetWidth: 800,
								targetHeight: 800,
								encodingType: Camera.EncodingType.JPEG,
								popoverOptions: CameraPopoverOptions,
								saveToPhotoAlbum: false
							};
						}
						$cordovaCamera.getPicture(imageOptions).then(function(imageURI) {
							_self.photo = "data:image/jpeg;base64," + imageURI;
						}, function(err) {
							// error
							message.message = err;
							message.buttonText = 'Sure Thing.';
							dishAlertService.show(message);
						});
					});
				};
			}],
			template: '<div><div class="dish-photo"><div class="uploaded-photo" style="background-image:url({{photo}});"></div></div><div class="add-photo" ng-click="openPicker()"></div></div>'
		};
	}

	DishPhoto.$inject = ['$q', '$cordovaCamera', 'dishSheetService', 'dishAlertService'];

	angular.module('dish.photo')
		.directive('dishPhoto', DishPhoto);
})();
angular.module('dish').factory('Auth', function(FURL, $firebaseAuth, $firebaseArray, $firebaseObject, $localStorage, Utils) {

  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    user: {},

    createProfile: function(uid, user) {
      var profile = {
        id: uid,
        email: user.email,
        username: user.username,
        gravatar: get_gravatar(user.email, 40),
        registered_in: Date()
      };

      var profileRef = $firebaseArray(ref.child('profile'));
      return profileRef.$add(profile).then(function(ref) {
        var id = ref.key();
        //console.log("added record with id " + id);
        profileRef.$indexFor(id); // returns location in the array
      });
    },

    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },

    signup: function(user) {
      return auth.$createUser({
          email: user.email,
          password: user.password
        })
        .then(function() {
          // authenticate so we have permission to write to Firebase
          return Auth.login(user);
        })
        .then(function(data) {
          // store user data in Firebase after creating account
          //console.log("datos del usuario:" + JSON.stringify(data));
          return Auth.createProfile(data.uid, user);
        });
    },

    logout: function() {
      auth.$unauth();
      console.log("Logout.");
    },

    resetPassword: function(user) {
      return auth.$resetPassword({
        email: user.email
      }).then(function() {
        Utils.alertshow("Password Reset.", "Check Your Email.");
        //console.log("Password reset email sent successfully!");
      }).catch(function(error) {
        Utils.errMessage(error);
        //console.error("Error: ", error.message);
      });
    },

    changePassword: function(user) {
      return auth.$changePassword({
        email: user.email,
        oldPassword: user.oldPass,
        newPassword: user.newPass
      });
    },

    signedIn: function() {
      return !!Auth.user.provider; //using !! means (0, undefined, null, etc) = false | otherwise = true
    }
  };

  auth.$onAuth(function(authData) {
    console.log('Authed', authData);
    if (authData) {
      angular.copy(authData, Auth.user);
      var obj = $firebaseObject(ref.child('profile').child($localStorage.userkey));

      obj.$loaded().then(function(data) {
        console.log('Loaded', data);
        Auth.user.profile = data;
      });

    } else {
      if (Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();

      }

      angular.copy({}, Auth.user);
    }
  });

  function get_gravatar(email, size) {

    email = email.toLowerCase();

    var MD5 = function(s) {
      function L(k, d) {
        return (k << d) | (k >>> (32 - d))
      }

      function K(G, k) {
        var I, d, F, H, x;
        F = (G & 2147483648);
        H = (k & 2147483648);
        I = (G & 1073741824);
        d = (k & 1073741824);
        x = (G & 1073741823) + (k & 1073741823);
        if (I & d) {
          return (x ^ 2147483648 ^ F ^ H)
        }
        if (I | d) {
          if (x & 1073741824) {
            return (x ^ 3221225472 ^ F ^ H)
          } else {
            return (x ^ 1073741824 ^ F ^ H)
          }
        } else {
          return (x ^ F ^ H)
        }
      }

      function r(d, F, k) {
        return (d & F) | ((~d) & k)
      }

      function q(d, F, k) {
        return (d & k) | (F & (~k))
      }

      function p(d, F, k) {
        return (d ^ F ^ k)
      }

      function n(d, F, k) {
        return (F ^ (d | (~k)))
      }

      function u(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(r(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function f(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(q(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function D(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(p(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function t(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(n(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function e(G) {
        var Z;
        var F = G.length;
        var x = F + 8;
        var k = (x - (x % 64)) / 64;
        var I = (k + 1) * 16;
        var aa = Array(I - 1);
        var d = 0;
        var H = 0;
        while (H < F) {
          Z = (H - (H % 4)) / 4;
          d = (H % 4) * 8;
          aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
          H++
        }
        Z = (H - (H % 4)) / 4;
        d = (H % 4) * 8;
        aa[Z] = aa[Z] | (128 << d);
        aa[I - 2] = F << 3;
        aa[I - 1] = F >>> 29;
        return aa
      }

      function B(x) {
        var k = "",
          F = "",
          G, d;
        for (d = 0; d <= 3; d++) {
          G = (x >>> (d * 8)) & 255;
          F = "0" + G.toString(16);
          k = k + F.substr(F.length - 2, 2)
        }
        return k
      }

      function J(k) {
        k = k.replace(/rn/g, "n");
        var d = "";
        for (var F = 0; F < k.length; F++) {
          var x = k.charCodeAt(F);
          if (x < 128) {
            d += String.fromCharCode(x)
          } else {
            if ((x > 127) && (x < 2048)) {
              d += String.fromCharCode((x >> 6) | 192);
              d += String.fromCharCode((x & 63) | 128)
            } else {
              d += String.fromCharCode((x >> 12) | 224);
              d += String.fromCharCode(((x >> 6) & 63) | 128);
              d += String.fromCharCode((x & 63) | 128)
            }
          }
        }
        return d
      }
      var C = Array();
      var P, h, E, v, g, Y, X, W, V;
      var S = 7,
        Q = 12,
        N = 17,
        M = 22;
      var A = 5,
        z = 9,
        y = 14,
        w = 20;
      var o = 4,
        m = 11,
        l = 16,
        j = 23;
      var U = 6,
        T = 10,
        R = 15,
        O = 21;
      s = J(s);
      C = e(s);
      Y = 1732584193;
      X = 4023233417;
      W = 2562383102;
      V = 271733878;
      for (P = 0; P < C.length; P += 16) {
        h = Y;
        E = X;
        v = W;
        g = V;
        Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
        V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
        W = u(W, V, Y, X, C[P + 2], N, 606105819);
        X = u(X, W, V, Y, C[P + 3], M, 3250441966);
        Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
        V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
        W = u(W, V, Y, X, C[P + 6], N, 2821735955);
        X = u(X, W, V, Y, C[P + 7], M, 4249261313);
        Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
        V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
        W = u(W, V, Y, X, C[P + 10], N, 4294925233);
        X = u(X, W, V, Y, C[P + 11], M, 2304563134);
        Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
        V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
        W = u(W, V, Y, X, C[P + 14], N, 2792965006);
        X = u(X, W, V, Y, C[P + 15], M, 1236535329);
        Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
        V = f(V, Y, X, W, C[P + 6], z, 3225465664);
        W = f(W, V, Y, X, C[P + 11], y, 643717713);
        X = f(X, W, V, Y, C[P + 0], w, 3921069994);
        Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
        V = f(V, Y, X, W, C[P + 10], z, 38016083);
        W = f(W, V, Y, X, C[P + 15], y, 3634488961);
        X = f(X, W, V, Y, C[P + 4], w, 3889429448);
        Y = f(Y, X, W, V, C[P + 9], A, 568446438);
        V = f(V, Y, X, W, C[P + 14], z, 3275163606);
        W = f(W, V, Y, X, C[P + 3], y, 4107603335);
        X = f(X, W, V, Y, C[P + 8], w, 1163531501);
        Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
        V = f(V, Y, X, W, C[P + 2], z, 4243563512);
        W = f(W, V, Y, X, C[P + 7], y, 1735328473);
        X = f(X, W, V, Y, C[P + 12], w, 2368359562);
        Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
        V = D(V, Y, X, W, C[P + 8], m, 2272392833);
        W = D(W, V, Y, X, C[P + 11], l, 1839030562);
        X = D(X, W, V, Y, C[P + 14], j, 4259657740);
        Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
        V = D(V, Y, X, W, C[P + 4], m, 1272893353);
        W = D(W, V, Y, X, C[P + 7], l, 4139469664);
        X = D(X, W, V, Y, C[P + 10], j, 3200236656);
        Y = D(Y, X, W, V, C[P + 13], o, 681279174);
        V = D(V, Y, X, W, C[P + 0], m, 3936430074);
        W = D(W, V, Y, X, C[P + 3], l, 3572445317);
        X = D(X, W, V, Y, C[P + 6], j, 76029189);
        Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
        V = D(V, Y, X, W, C[P + 12], m, 3873151461);
        W = D(W, V, Y, X, C[P + 15], l, 530742520);
        X = D(X, W, V, Y, C[P + 2], j, 3299628645);
        Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
        V = t(V, Y, X, W, C[P + 7], T, 1126891415);
        W = t(W, V, Y, X, C[P + 14], R, 2878612391);
        X = t(X, W, V, Y, C[P + 5], O, 4237533241);
        Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
        V = t(V, Y, X, W, C[P + 3], T, 2399980690);
        W = t(W, V, Y, X, C[P + 10], R, 4293915773);
        X = t(X, W, V, Y, C[P + 1], O, 2240044497);
        Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
        V = t(V, Y, X, W, C[P + 15], T, 4264355552);
        W = t(W, V, Y, X, C[P + 6], R, 2734768916);
        X = t(X, W, V, Y, C[P + 13], O, 1309151649);
        Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
        V = t(V, Y, X, W, C[P + 11], T, 3174756917);
        W = t(W, V, Y, X, C[P + 2], R, 718787259);
        X = t(X, W, V, Y, C[P + 9], O, 3951481745);
        Y = K(Y, h);
        X = K(X, E);
        W = K(W, v);
        V = K(V, g)
      }
      var i = B(Y) + B(X) + B(W) + B(V);
      return i.toLowerCase()
    };

    var size = size || 80;

    return 'https://www.gravatar.com/avatar/' + MD5(email) + '.jpg?d=identicon';
  }

  return Auth;

});
angular.module('dish').factory('Utils', function($ionicLoading, $ionicPopup) {

	var Utils = {

		show: function() {
			$ionicLoading.show({
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500,
				template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
			});
		},

		hide: function() {
			$ionicLoading.hide();
		},

		alertshow: function(tit, msg) {
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

		errMessage: function(err) {

			var msg = "Unknown Error...";

			if (err && err.code) {
				switch (err.code) {
					case "EMAIL_TAKEN":
						msg = "This Email has been taken.";
						break;
					case "INVALID_EMAIL":
						msg = "Invalid Email.";
						break;
					case "NETWORK_ERROR":
						msg = "Network Error.";
						break;
					case "INVALID_PASSWORD":
						msg = "Invalid Password.";
						break;
					case "INVALID_USER":
						msg = "Invalid User.";
						break;
				}
			}
			Utils.alertshow("Error", msg);
		},


	};

	return Utils;

});
(function() {
	'use strict';

	angular.module('dish.forgot', []);
})();
(function() {
  'use strict';

  function DishForgotController($scope, $log, Auth, dishSliderService) {

    $scope.resetPassword = function(user) {
      $log.log('oh', user);
      if (angular.isDefined(user)) {
        Auth.resetPassword(user).then(function() {
          $log.log("Password reset email sent successfully!");
        }, function(err) {
          $log.error("Error: ", err);
        });
      }
    };

    $scope.toLogin = function() {
      dishSliderService.slide(1);
    };
  }

  DishForgotController.$inject = ['$scope', '$log', 'Auth', 'dishSliderService'];

  angular.module('dish.forgot')
    .controller('dishForgotController', DishForgotController);
})();
(function() {
	'use strict';

	angular.module('dish.login', []);
})();
(function() {
	'use strict';

	function DishLoginController($scope, $log, $localStorage, $firebaseObject, Utils, Auth, FURL, dishSliderService, dishModalService) {
		var ref = new Firebase(FURL);
		var userkey = '';

		$scope.login = function(user) {
			$log.log('Logging In', user);
			if (angular.isDefined(user)) {
				Utils.show();
				Auth.login(user).then(function(authData) {
					//console.log('user id:' + JSON.stringify(authData));

					ref.child('profile').orderByChild('id').equalTo(authData.uid).on('child_added', function(snapshot) {
						console.log(snapshot.key());
						userkey = snapshot.key();
						$log.log('userkey', userkey);
						var obj = $firebaseObject(ref.child('profile').child(userkey));
						$log.log('profile', obj);

						obj.$loaded().then(function(data) {
								$log.log('the data', data);
								$localStorage.email = obj.email;
								$localStorage.userkey = userkey;

								$log.log('userkey', $localStorage.userkey);

								Auth.user.profile = data;
								$scope.currentUser = Auth.user;

								Utils.hide();
								dishModalService.close();
							})
							.catch(function(error) {
								console.error('Error:', error);
							});
					});

				}, function(err) {
					Utils.hide();
					Utils.errMessage(err);
				});
			}
		};

		$scope.toSignup = function() {
			dishSliderService.slide(0);
		};

		$scope.toForgot = function() {
			dishSliderService.slide(2);
		}
	}

	DishLoginController.$inject = ['$scope', '$log', '$localStorage', '$firebaseObject', 'Utils', 'Auth', 'FURL', 'dishSliderService', 'dishModalService'];

	angular.module('dish.login')
		.controller('dishLoginController', DishLoginController);
})();
(function() {
	'use strict';

	angular.module('dish.signup', []);
})();
(function() {
  'use strict';

  function DishSignupController($scope, $log, $controller, Auth, Utils, dishSliderService) {

    //This allows us to reference the loginController from within signup
    var dishLoginController = $scope.$new(); //You need to supply a scope while instantiating.
    //Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
    //In this case it is the child scope of this scope.
    $controller('dishLoginController', {
      $scope: dishLoginController
    });

    $scope.signup = function(user) {
      $log.log('signup', user);
      if (angular.isDefined(user)) {
        Utils.show();
        Auth.signup(user).then(function(authData) {
          $log.log('User successfully created:', authData);
          dishLoginController.login(user);
        }, function(err) {
          Utils.hide();
          Utils.errMessage(err);
        });
      }
    };

    $scope.toLogin = function() {
      dishSliderService.slide(1);
    };
  }

  DishSignupController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils', 'dishSliderService'];

  angular.module('dish.signup')
    .controller('dishSignupController', DishSignupController);
})();
(function() {
	'use strict';

	angular.module('dish.home', []);
})();
(function() {
	'use strict';

	function DishHomeController($scope, $log, $timeout, $firebaseObject, $firebaseArray, FURL, Auth, dishKeyboardService, dishModalService, dishGalleryService, dishCardsService) {
		var vm = this;
		var url = FURL + '/profile';
		var ref = new Firebase(url);
		vm.cooks = $firebaseArray(ref);

		vm.now = moment();
		vm.hour = vm.now.hours();

		vm.location = 'Current Location';

		vm.timeActive = false;
		vm.cooksLoaded = false;

		vm.cooks.$loaded().then(function(cooks) {
			$log.log('loaded', cooks);
			vm.cooksLoaded = true;
		}).catch(function(error) {
			$log.log('error', error)
		});

		vm.viewCook = function(cook) {
			if (!cook) return;
			vm.activeCard = cook.$id;
			dishCardsService.setActiveCard(true);
			dishCardsService.disable();
			//Populate some stub data with firebase for this user
			stubData(cook);
		};

		vm.closeCook = function() {
			vm.activeCard = null;
			dishCardsService.setActiveCard(false);
			dishCardsService.enable();
		};

		vm.viewMeal = function(meal) {
			if (!meal) return;
			$log.log('viewMeal', meal);
		};

		vm.decreaseOrder = function(meal) {
			if (!meal) return;
			$log.log('decreaseOrder', meal);
		};

		vm.increaseOrder = function(meal) {
			if (!meal) return;
			$log.log('increaseOrder', meal);
		}

		vm.viewDescription = function() {
			$log.log('viewDescription');
		};

		vm.viewReviews = function() {
			$log.log('viewReviews');
		}

		vm.becomeCook = function() {
			$log.log('becomeCook');
		};

		vm.viewCart = function() {
			$log.log('viewCart');
		};

		var stubData = function(cook) {
			//var cookUrl = FURL + '/profile/' + cookId;
			//var cookRef = new Firebase(cookUrl);
			var cookPhotos = [
				'http://expresskitchenindy.com/wp/wp-content/images/gallery/kitchen-remodel-projects/kitchen_contemporary3.jpg',
				'http://autovim.com/wp-content/uploads/2015/11/Best-Kitchen-Island-Designs-Modern-With-Photo-Of-Interior-For-Fresh-On-Images.jpg',
				'https://lh4.ggpht.com/eWXdc61Wo__Am8rLUKwQD-x_PC5ru9dE6ayoS_r1FH4YRk-ji4OzFM23VrFdihZQhg=h900',
				'https://lh6.ggpht.com/BnDGDfI0tHGiRPBQnTb3GkD1W8B7zmQfosDVrMVK0lJDUU1Upa988qCv4l_0OvzZkJM=h900',
				'https://33.media.tumblr.com/tumblr_m3rhjx9dtN1qh6qsx.jpg'
			];

			//Cook and Kitchen Photos
			cook.cookPhotos = cookPhotos;

			//Cook Metadata
			cook.verified = true;
			cook.phone = '780-934-5426';
			cook.address = '11432 78 Ave NW';

			//Cook Delivery Options
			cook.delivery = {
				enabled: true,
				price: '$2'
			};

			cook.pickup = {
				enabled: true
			};

			cook.dineIn = {
				enabled: true,
				price: '$5',
				seats: 20
			}

			var schedule = [{
				day: 'Monday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Tuesday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Wednesday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Thursday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Friday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Saturday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Sunday',
				startTime: '9:00',
				endTime: '3:00'
			}];

			//Cook Schedule (This isn't shown to the user on the f/e)
			cook.schedule = schedule;

			var exceptions = [{
				startDate: '03/11/2016', //DD/MM/YYYY
				endDate: '05/11/2016'
			}, {
				startDate: '12/12/2016',
				endDate: '12/30/2016'
			}];

			//Exceptions Schedule (This isn't shown to the user on the f/e)
			cook.exceptions = exceptions;

			//Cook Description
			cook.description = 'I am passionate about wholesome and thoughtful cooking.  My cooking style is meant to be an exploration of diverse textures and flavours in a way that delivers a nutritious and satisfying meal.  Growing up in Canada, I’ ve never felt limited to stick with the culture of my birth - country(Iran).  Because of this multiculturalism, along with the wide variety of food available all the time, I take a higher - level approach to buying ingredients and making food.  This way, I focus on health, quality, and experience rather than attempting to follow a custom.  The skill that sets me apart in my cooking is the ability to accurately predict whether a diverse combination of ingredients will result in a delicious and well - balanced meal.  For example, it’ s[sometimes] possible to combine ingredients that are typically served sweet in a dish that is savoury and have it turn out amazing(such as in my vanilla parmesan chicken).  Therefore, when you taste my food, I want to pleasantly surprise you and expand your imagination about the combinations of ingredients that are possible while you take each bite and say“ SO GOOD”.  In regards to health, I have thoroughly studied safe food - handling procedures and the transfer mechanisms of foodborne illnesses, in addition to having been formally trained in aseptic technique and preparation for sterile surgeries in a laboratory setting.  I only buy and use fresh ingredients but I’ m also additionally incentivized to do this because when I cook for you, I’ m cooking for myself too.  For fun, I like to design and write.  In Edmonton I’ ve designed approximately 25 homes(which have been built / are being built) and I maintain a blog of ideas about improving life in the future.  I also love to be outdoors.  Whenever I have the chance, I like to go to the rocky mountains for camping and hiking.';

			var meals = [{
				name: 'Vegan Stir Fry',
				image: 'http://graphics8.nytimes.com/images/2011/11/08/health/well_veggie_stir2/well_veggie_stir2-blog480.jpg',
				description: 'Featuring a wholesome vegan stir fry that\'s balanced with roasted veggies, nuts, and sauciness. The stir fry will include celery, mushrooms, carrots (organic), chopped almonds, pumpkin seeds, bell peppers, ginger, spicy hummus (for sauciness that\'s vegan), rice noodles, fried in extra virgin olive oil, and extra virgin organic coconut oil (makes the carrots super-yummy).',
				price: '$5.00', //If the customerId's rating is low, we'll raise the prices on the server end so that the customer has to pay more
				ingredients: [
					'celery',
					'mushrooms',
					'organic carrots',
					'chopped almonds',
					'pumpkin seeds',
					'bell peppers',
					'ginger',
					'spicy hummus',
					'rice noodles',
					'extra virgin olive oil',
					'organic extra virgin coconut oil'
				]
			}, {
				name: 'Parmesan Chicken',
				image: 'http://www.missouriwomenbloggers.com/wp-content/uploads/2014/10/Nicole-Foodie-Friday-Post-finished.jpg',
				description: 'Featuring parmesan chicken, served with linguini in a mushroom alfredo sauce. Ingredients are chicken breast (hormone-free, free-range), bread crumbs, extra-virgin olive oil, parmesan cheese, a very small amount of vanilla (the authentic mexican kind), linguine, mushrooms, garlic (fried), and parsley (on the side). A gluten-free version is also available that substitutes the linguine for a baked potato and no bread-crumbs on the chicken breast.',
				price: '$8.00',
				ingredients: [
					'parmesan cheese',
					'chicken breast',
					'linguine',
					'mushrooms',
					'alfredo',
					'olive oil',
					'fried garlic',
					'parsley',
					'vanilla'
				]
			}, {
				name: 'Pizza',
				image: 'http://static5.businessinsider.com/image/53908351ecad04ca746ba577-480/pizza-hut-cmo-sp.jpg',
				description: 'So good you won\'t know what to do with yourself.',
				price: '$10.00',
				ingredients: [
					'cheese',
					'pepperoni',
					'ham',
					'whole wheat crust',
					'pasta sauce'
				]
			}, {
				name: 'Lasagna',
				image: 'http://static.food2fork.com/29439_vegan_lasagna_2_620c9bf.jpg',
				description: 'If Garfield approves of our Lasagna, you will too!',
				price: '$15.00',
				ingredients: [
					'layered noodles',
					'ricotta cheese',
					'cheddar',
					'pasta sauce',
					'spinach'
				]
			}, {
				name: 'Dragon Roll',
				image: 'https://sparkpeo.hs.llnwd.net/e4/nw/8/7/l873222782.jpg',
				description: 'So good, you\'ll think we were Japanese. Even though we\'re not.',
				price: '$5.00',
				ingredients: [
					'rice',
					'seaweed',
					'lobster',
					'crab',
					'special sauce'
				]
			}];

			//Cook Meals
			cook.meals = meals;

			var reviews = [{
				rating: 5,
				description: 'Love the Parmesan Chicken!',
				reviewer: 'otherUserId'
			}, {
				rating: 5,
				description: 'The Vegan Stir Fry is to die for!',
				reviewer: 'otherUserId'
			}, {
				rating: 4,
				description: 'Great food, would love some more meat options!',
				reviewer: 'otherUserId'
			}, {
				rating: 4,
				description: 'Incredible!',
				reviewer: 'otherUserId'
			}, {
				rating: 1,
				description: 'I hate everything',
				reviewer: 'otherUserId'
			}];

			//Cook Reviews
			cook.reviews = reviews;

			//Cook Orders (This is for any incoming orders the cook may currently have coming in)
			var orders = [{
				meals: [{
					mealId: 'mealId',
					name: 'Parmesan Chicken',
					price: '$10.00',
					quantity: 5 //Customer cannot order more of a quantity than the cook has, and quantity can't be 0
				}, {
					mealId: 'otherMealId',
					name: 'Vegan Stir Fry',
					price: '$10.00',
					quantity: 3
				}],
				date: '02/11/2015 5:00PM',
				delivery: 'delivery', //If it's a delivery, deliveryInfo is required
				deliveryInfo: 'Address is #8128 102 Street NW Edmonton, AB, please call 780.265.3416 upon arrival',
				customer: 'otherUserId', //We can use the customerId to display a customer rating to the cook so they can make an informed decision on whether to accept the order or not
				subtotal: '$53.00',
				deliveryCharges: '$10.00',
				customerModifier: '-$1.00', //If a customer is a good customer and is high rated, they can receive discounts on meals they purchase automatically. Alternatively, if they're low rated, they'll be charged more. This is all calculated server side.
				promotionCode: null,
				promotionModifier: null,
				dishFee: '$10.00',
				taxes: '$5.00',
				orderStatus: 'pending', //Can be either pending, approved, or rejected. If rejected, a rejectionReason must be provided.
				rejectionReason: null
			}, {
				meals: [{
					mealId: 'mealId',
					name: 'Parmesan Chicken',
					price: '$10.00',
					quantity: 1
				}],
				date: '02/11/2015 1:00PM',
				delivery: 'pickup',
				customer: 'otherUserId',
				subtotal: '$13.00',
				deliveryCharges: '$0.00',
				customerModifier: null, //This customer is in neutral standing
				promotionCode: null,
				promotionModifier: null,
				dishFee: '$1.00',
				taxes: '$0.50',
				orderStatus: 'approved', //Once approved, the cook's address is shown to the customer
				rejectionReason: null
			}, {
				meals: [{
					mealId: 'mealId',
					name: 'Vegan Stir Fry',
					price: '$10.00',
					quantity: 2
				}],
				date: '02/10/2015 5:00PM',
				delivery: 'dineIn', //Can be delivery,pickup,or dineIn
				reservationTime: '02/11/2015 9:00PM', //If the customer picks dineIn, they must choose a reservationTime
				reservationSeats: 2, //How many seats they need
				remainingReservationSeats: 1, //How many seats the cook currently has available at that time. The cook can set how many seats they have available if they've picked the dineIn option, and we can automatically catch this on the front end if the reservation won't work, but we'll do this logic on the server as well anyways
				customer: 'otherUserId', //We can use the customerId to display a customer rating to the cook so they can make an informed decision on whether to accept the order or not
				subtotal: '$23.00',
				deliveryCharges: '$15.00',
				customerModifier: '$2.00',
				promotionCode: null,
				promotionModifier: null,
				dishFee: '$6.00',
				taxes: '$3.00',
				orderStatus: 'rejected', //Can be either pending, approved, or rejected. If rejected, a rejectionReason must be provided.
				rejectionReason: 'Sorry, but we are all booked up for the night'
			}];

			cook.orders = orders;

			//Transactions History (Meals the cook has ordered from Dish), even the one they just entered miliseconds ago.
			var transactions = [{
				meals: [{
					mealId: 'mealId',
					name: 'Big Ben Burger',
					price: '$10.00',
					quantity: 3
				}],
				date: '02/16/2015 4:00PM',
				delivery: 'pickup',
				customer: 'myProfileId',
				cookId: 'cookId',
				subtotal: '$43.00',
				deliveryCharges: '0.00',
				customerModifier: '-$2.00', //If a customer is a good customer and is high rated, they can receive discounts on meals they purchase automatically. Alternatively, if they're low rated, they'll be charged more.
				promotionCode: 'WELCOME',
				promotionModifier: '-$10.50', //If it's for a free meal, the promotionModifier can never discount more than the total of the meal.
				dishFee: '$12.00',
				taxes: '$5.50',
				orderStatus: 'approved', //Once approved, the cook's address is shown to the customer
				rejectionReason: null
			}, {
				meals: [{
					mealId: 'mealId',
					name: 'Pizza For Days',
					price: '$10.00',
					quantity: 1
				}],
				date: '01/10/2015 1:00PM',
				delivery: 'delivery',
				deliveryInfo: 'Address is #8128 102 Street NW Edmonton, AB, please call 780.265.3416 upon arrival',
				customer: 'myProfileId',
				cookId: 'cookId',
				subtotal: '$8.00',
				deliveryCharges: '$2.00',
				customerModifier: '-$2.00',
				promotionCode: 'FREE',
				promotionModifier: '-$10.50',
				dishFee: '$1.00',
				taxes: '$0.50',
				orderStatus: 'approved', //Once approved, the cook's address is shown to the customer
				rejectionReason: null
			}];

			cook.transactions = transactions;

			//Promotions (Promotions that either Dish has given to the user or the user has earned) All the Promotions that Dish has will be available in the Promotions Firebase section (That will eventually be utilized with the Promotions creator)
			var promotions = [{
				promotionId: 'promotionId',
				name: 'Welcome to Dish',
				code: 'WELCOME',
				description: 'Thanks for joining Dish! Have a free meal on us.'
			}, {
				promotionId: 'promotionId',
				name: 'One of Us',
				code: 'COOK',
				description: 'Thanks for contributing to Dish by posting a meal! Your next one\'s on us.'
			}, {
				promotionId: 'promotionId',
				name: 'We are legion',
				code: 'ASSIMILATE',
				description: 'Thanks for helping Dish grow by inviting one of your friends! We hope both of you enjoy a free meal of your choosing on the house!'
			}, {
				promotionId: 'promotionId',
				name: 'Get Better Soon',
				code: 'SORRY',
				description: 'We\'re sorry to hear that you got sick using Dish, so please let us make it up to you by offering you this free meal.'
			}];

			cook.promotions = promotions;

			//Nested value test
			var nested = [{
				name: 'Hi'
			}];

			cook.nested = nested;

			vm.cooks.$save(cook);
		}

		//Handle animating out any model changes that may have occurred
		vm.changed = function(cook, key) {
			if (!cook) return false;
			if (!cook.animating) return false;
			if (!vm.cooksLoaded) return false;
			var animating = cook.animating;
			var valueIsChanged = _.contains(animating, key);
			//$log.log('valueIsChanged', animating, valueIsChanged);
			return valueIsChanged;
		};

		vm.cardIsActive = function(cook) {
			if (!cook) return;
			if (cook.$id === vm.activeCard) {
				return true;
			}
			return false;
		};

		vm.selectTime = function() {
			if (vm.timeActive) {
				vm.timeActive = false;
			} else {
				vm.timeActive = true;
			}
		};
	}

	DishHomeController.$inject = ['$scope', '$log', '$timeout', '$firebaseObject', '$firebaseArray', 'FURL', 'Auth', 'dishKeyboardService', 'dishModalService', 'dishGalleryService', 'dishCardsService'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();
(function() {
	'use strict';

	angular.module('dish.food', []);
})();
(function() {
	'use strict';

	function DishFoodController($scope, $log, $firebaseArray, FURL) {

		$scope.buy = function() {
			$log.log('buy');
		};

	}

	DishFoodController.$inject = ['$scope', '$log', '$firebaseArray', 'FURL'];

	angular.module('dish.forgot')
		.controller('dishFoodController', DishFoodController);
})();
(function() {
	'use strict';

	angular.module('dish.cook', []);
})();
(function() {
  'use strict';

  function DishCookController($scope, $log, $firebaseArray, FURL) {
    var url = FURL + '/meals';
    var ref = new Firebase(url);

    // create a query for the most recent 25 meals on the server
    var query = ref.orderByChild("cookedTime").limitToLast(25);

    $scope.recipes = $firebaseArray(ref);

    //Push a recipe card into the beginning of the recipes array that isn't synced back to the server so that users can create recipes
    $scope.recipes.$loaded(function() {
      $scope.recipes.unshift({});
      $log.log('loaded', $scope.recipes);
    });

    $scope.valid = function(recipe) {
      if (!recipe) {
        return false;
      }
      recipe.photo = 'https://s-media-cache-ak0.pinimg.com/474x/53/4d/7b/534d7b4630c75ac608bd6b46461f1d8d.jpg'; //Shim for local testing
      if (!recipe.photo) return false;
      if (!recipe.name) return false;
      if (!recipe.ingredients) return false;
      if (!recipe.portions) return false;
      if (!recipe.price) return false;
      return true;
    };

    $scope.cook = function(recipe) {
      $log.log('cook', recipe);
      if (!$scope.currentUser) return;
      recipe.user = $scope.currentUser.profile.$id;
      recipe.cookedTime = new Date().getTime();
      recipe.state = 'pickup';
      recipe.timestamp = Firebase.ServerValue.TIMESTAMP;
      $scope.meals.$add(recipe);
    };

  }

  DishCookController.$inject = ['$scope', '$log', '$firebaseArray', 'FURL'];

  angular.module('dish.cook')
    .controller('dishCookController', DishCookController);
})();
(function() {
	'use strict';

	angular.module('dish.profile', []);
})();
(function() {
	'use strict';

	function DishProfileController($scope, $log, Auth, dishModalService) {}

	DishProfileController.$inject = ['$scope', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.profile')
		.controller('dishProfileController', DishProfileController);
})();
(function() {
	'use strict';

	angular.module('dish.preview', []);
})();
(function() {
	'use strict';

	function DishPreviewController($q, $scope, $log, $ionicScrollDelegate, dishModalService) {
		var _self = this;

		_self.resetZoom = function() {
			$log.log('resetZoom');
			$ionicScrollDelegate.$getByHandle('dishZoom').zoomTo(1, true);
		}
	}

	DishPreviewController.$inject = ['$q', '$scope', '$log', '$ionicScrollDelegate', 'dishModalService'];

	angular.module('dish.preview')
		.controller('dishPreviewController', DishPreviewController);
})();
(function() {
	'use strict';

	angular.module('dish.favorites', []);
})();
(function() {
	'use strict';

	function DishFavoritesController($scope, $log) {

		//In order to display the profile card, we'll always have an empty object as the first element in the array, and populate favorites accordingly after that.
		$scope.favorites = [{}, {}, {}];

		$scope.favorite = function() {
			$log.log('favorite');
		};
	}

	DishFavoritesController.$inject = ['$scope', '$log'];

	angular.module('dish.favorites')
		.controller('dishFavoritesController', DishFavoritesController);
})();
(function() {
	'use strict';

	angular.module('dish.payment', []);
})();
(function() {
	'use strict';

	function DishPaymentController($scope, $log, $controller, Auth, Utils) {

		$scope.delete = function() {
			$log.log('delete');
		}

		$scope.add = function() {
			$log.log('add');
		};

		$scope.getCardHeight = function(payment, index) {
			if (index === 0) {
				return 271;
			} else if (index === $scope.payments.length - 1) {
				return 236;
			} else {
				return 226;
			}
		};

		$scope.payments = [{
			type: 'delete'
		}, {
			type: 'delete'
		}, {
			type: 'add'
		}];

	}

	DishPaymentController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

	angular.module('dish.payment')
		.controller('dishPaymentController', DishPaymentController);
})();
(function() {
	'use strict';

	angular.module('dish.transactions', []);
})();
(function() {
	'use strict';

	function DishTransactionsController($scope, $log) {

		//In order to display the profile card, we'll always have an empty object as the first element in the array, and populate transactions accordingly after that.
		$scope.transactions = [{}, {}, {}];

		$scope.transaction = function() {
			$log.log('transaction');
		};
	}

	DishTransactionsController.$inject = ['$scope', '$log'];

	angular.module('dish.transactions')
		.controller('dishTransactionsController', DishTransactionsController);
})();
(function() {
	'use strict';

	angular.module('dish.promotions', []);
})();
(function() {
	'use strict';

	function DishPromotionsController($scope, $log, $controller, Auth, Utils) {

		$scope.invite = function() {
			$log.log('invite');
		};

		$scope.rate = function() {
			$log.log('rate');
		};

		$scope.share = function() {
			$log.log('share');
		};

		$scope.getCardHeight = function(promotion, index) {
			if (index === 0) {
				return 165;
			} else if (index === $scope.promotions.length - 1) {
				return 125;
			} else {
				return 115;
			}
		};

		$scope.promotions = [{
			icon: 'ion-android-person',
			command: $scope.invite,
			button: 'Invite a Friend and<br/>Get a meal for free'
		}, {
			icon: 'ion-ios-heart',
			command: $scope.rate,
			button: 'Recommend Dish and get a free meal'
		}, {
			icon: 'ion-ios-upload',
			command: $scope.share,
			button: 'Share Dish and get<br/>a meal for free'
		}];

	}

	DishPromotionsController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

	angular.module('dish.promotions')
		.controller('dishPromotionsController', DishPromotionsController);
})();
(function() {
	'use strict';

	angular.module('dish.help', []);
})();
(function() {
  'use strict';

  function DishHelpController($scope, $log, $controller, Auth, Utils) {

    $scope.help = function() {
      $log.log('help');
    };

  }

  DishHelpController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

  angular.module('dish.help')
    .controller('dishHelpController', DishHelpController);
})();
(function() {
	'use strict';

	angular.module('dish.settings', []);
})();
(function() {
  'use strict';

  function DishSettingsController($scope, $log, $controller, Auth, Utils, dishModalService) {

    $scope.logout = function() {
      $log.log('logout');
      Auth.logout();
      dishModalService.open($scope, 'signup');
    };

  }

  DishSettingsController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils', 'dishModalService'];

  angular.module('dish.settings')
    .controller('dishSettingsController', DishSettingsController);
})();
/*!
 * ngCordova
 * v0.1.23-alpha
 * Copyright 2015 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
!function(){angular.module("ngCordova",["ngCordova.plugins"]),angular.module("ngCordova.plugins.actionSheet",[]).factory("$cordovaActionSheet",["$q","$window",function(e,n){return{show:function(t){var r=e.defer();return n.plugins.actionsheet.show(t,function(e){r.resolve(e)}),r.promise},hide:function(){return n.plugins.actionsheet.hide()}}}]),angular.module("ngCordova.plugins.adMob",[]).factory("$cordovaAdMob",["$q","$window",function(e,n){return{createBannerView:function(t){var r=e.defer();return n.plugins.AdMob.createBannerView(t,function(){r.resolve()},function(){r.reject()}),r.promise},createInterstitialView:function(t){var r=e.defer();return n.plugins.AdMob.createInterstitialView(t,function(){r.resolve()},function(){r.reject()}),r.promise},requestAd:function(t){var r=e.defer();return n.plugins.AdMob.requestAd(t,function(){r.resolve()},function(){r.reject()}),r.promise},showAd:function(t){var r=e.defer();return n.plugins.AdMob.showAd(t,function(){r.resolve()},function(){r.reject()}),r.promise},requestInterstitialAd:function(t){var r=e.defer();return n.plugins.AdMob.requestInterstitialAd(t,function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.appAvailability",[]).factory("$cordovaAppAvailability",["$q",function(e){return{check:function(n){var t=e.defer();return appAvailability.check(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.appRate",[]).provider("$cordovaAppRate",[function(){this.setPreferences=function(e){e&&angular.isObject(e)&&(AppRate.preferences.useLanguage=e.language||null,AppRate.preferences.displayAppName=e.appName||"",AppRate.preferences.promptAgainForEachNewVersion=e.promptForNewVersion||!0,AppRate.preferences.openStoreInApp=e.openStoreInApp||!1,AppRate.preferences.usesUntilPrompt=e.usesUntilPrompt||3,AppRate.preferences.useCustomRateDialog=e.useCustomRateDialog||!1,AppRate.preferences.storeAppURL.ios=e.iosURL||null,AppRate.preferences.storeAppURL.android=e.androidURL||null,AppRate.preferences.storeAppURL.blackberry=e.blackberryURL||null,AppRate.preferences.storeAppURL.windows8=e.windowsURL||null)},this.setCustomLocale=function(e){var n={title:"Rate %@",message:"If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",cancelButtonLabel:"No, Thanks",laterButtonLabel:"Remind Me Later",rateButtonLabel:"Rate It Now"};n=angular.extend(n,e),AppRate.preferences.customLocale=n},this.$get=["$q",function(e){return{promptForRating:function(n){var t=e.defer(),r=AppRate.promptForRating(n);return t.resolve(r),t.promise},navigateToAppStore:function(){var n=e.defer(),t=AppRate.navigateToAppStore();return n.resolve(t),n.promise},onButtonClicked:function(e){AppRate.onButtonClicked=function(n){e.call(this,n)}},onRateDialogShow:function(e){AppRate.onRateDialogShow=e()}}}]}]),angular.module("ngCordova.plugins.appVersion",[]).factory("$cordovaAppVersion",["$q",function(e){return{getVersionNumber:function(){var n=e.defer();return cordova.getAppVersion.getVersionNumber(function(e){n.resolve(e)}),n.promise},getVersionCode:function(){var n=e.defer();return cordova.getAppVersion.getVersionCode(function(e){n.resolve(e)}),n.promise}}}]),angular.module("ngCordova.plugins.backgroundGeolocation",[]).factory("$cordovaBackgroundGeolocation",["$q","$window",function(e,n){return{init:function(){n.navigator.geolocation.getCurrentPosition(function(e){return e})},configure:function(t){this.init();var r=e.defer();return n.plugins.backgroundGeoLocation.configure(function(e){r.notify(e),n.plugins.backgroundGeoLocation.finish()},function(e){r.reject(e)},t),this.start(),r.promise},start:function(){var t=e.defer();return n.plugins.backgroundGeoLocation.start(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},stop:function(){var t=e.defer();return n.plugins.backgroundGeoLocation.stop(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.badge",[]).factory("$cordovaBadge",["$q",function(e){return{hasPermission:function(){var n=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?n.resolve(!0):n.reject("You do not have permission")}),n.promise},promptForPermission:function(){return cordova.plugins.notification.badge.promptForPermission()},set:function(n,t,r){var o=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?o.resolve(cordova.plugins.notification.badge.set(n,t,r)):o.reject("You do not have permission to set Badge")}),o.promise},get:function(){var n=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?cordova.plugins.notification.badge.get(function(e){n.resolve(e)}):n.reject("You do not have permission to get Badge")}),n.promise},clear:function(n,t){var r=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?r.resolve(cordova.plugins.notification.badge.clear(n,t)):r.reject("You do not have permission to clear Badge")}),r.promise},increase:function(n,t,r){var o=e.defer();return this.hasPermission().then(function(){o.resolve(cordova.plugins.notification.badge.increase(n,t,r))},function(){o.reject("You do not have permission to increase Badge")}),o.promise},decrease:function(n,t,r){var o=e.defer();return this.hasPermission().then(function(){o.resolve(cordova.plugins.notification.badge.decrease(n,t,r))},function(){o.reject("You do not have permission to decrease Badge")}),o.promise},configure:function(e){return cordova.plugins.notification.badge.configure(e)}}}]),angular.module("ngCordova.plugins.barcodeScanner",[]).factory("$cordovaBarcodeScanner",["$q",function(e){return{scan:function(n){var t=e.defer();return cordova.plugins.barcodeScanner.scan(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},encode:function(n,t){var r=e.defer();return n=n||"TEXT_TYPE",cordova.plugins.barcodeScanner.encode(n,t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.batteryStatus",[]).factory("$cordovaBatteryStatus",["$rootScope","$window","$timeout",function(e,n,t){var r=function(n){t(function(){e.$broadcast("$cordovaBatteryStatus:status",n)})},o=function(n){t(function(){e.$broadcast("$cordovaBatteryStatus:critical",n)})},i=function(n){t(function(){e.$broadcast("$cordovaBatteryStatus:low",n)})};return document.addEventListener("deviceready",function(){navigator.battery&&(n.addEventListener("batterystatus",r,!1),n.addEventListener("batterycritical",o,!1),n.addEventListener("batterylow",i,!1))},!1),!0}]).run(["$injector",function(e){e.get("$cordovaBatteryStatus")}]),angular.module("ngCordova.plugins.beacon",[]).factory("$cordovaBeacon",["$window","$rootScope","$timeout","$q",function(e,n,t,r){var o=null,i=null,a=null,c=null,s=null,u=null,l=null,d=null;return document.addEventListener("deviceready",function(){if(e.cordova&&e.cordova.plugins&&e.cordova.plugins.locationManager){var r=new e.cordova.plugins.locationManager.Delegate;r.didDetermineStateForRegion=function(e){t(function(){n.$broadcast("$cordovaBeacon:didDetermineStateForRegion",e)}),o&&o(e)},r.didStartMonitoringForRegion=function(e){t(function(){n.$broadcast("$cordovaBeacon:didStartMonitoringForRegion",e)}),i&&i(e)},r.didExitRegion=function(e){t(function(){n.$broadcast("$cordovaBeacon:didExitRegion",e)}),a&&a(e)},r.didEnterRegion=function(e){t(function(){n.$broadcast("$cordovaBeacon:didEnterRegion",e)}),c&&c(e)},r.didRangeBeaconsInRegion=function(e){t(function(){n.$broadcast("$cordovaBeacon:didRangeBeaconsInRegion",e)}),s&&s(e)},r.peripheralManagerDidStartAdvertising=function(e){t(function(){n.$broadcast("$cordovaBeacon:peripheralManagerDidStartAdvertising",e)}),u&&u(e)},r.peripheralManagerDidUpdateState=function(e){t(function(){n.$broadcast("$cordovaBeacon:peripheralManagerDidUpdateState",e)}),l&&l(e)},r.didChangeAuthorizationStatus=function(e){t(function(){n.$broadcast("$cordovaBeacon:didChangeAuthorizationStatus",e)}),d&&d(e)},e.cordova.plugins.locationManager.setDelegate(r)}},!1),{setCallbackDidDetermineStateForRegion:function(e){o=e},setCallbackDidStartMonitoringForRegion:function(e){i=e},setCallbackDidExitRegion:function(e){a=e},setCallbackDidEnterRegion:function(e){c=e},setCallbackDidRangeBeaconsInRegion:function(e){s=e},setCallbackPeripheralManagerDidStartAdvertising:function(e){u=e},setCallbackPeripheralManagerDidUpdateState:function(e){l=e},setCallbackDidChangeAuthorizationStatus:function(e){d=e},createBeaconRegion:function(n,t,r,o,i){return r=r||void 0,o=o||void 0,new e.cordova.plugins.locationManager.BeaconRegion(n,t,r,o,i)},isBluetoothEnabled:function(){return r.when(e.cordova.plugins.locationManager.isBluetoothEnabled())},enableBluetooth:function(){return r.when(e.cordova.plugins.locationManager.enableBluetooth())},disableBluetooth:function(){return r.when(e.cordova.plugins.locationManager.disableBluetooth())},startMonitoringForRegion:function(n){return r.when(e.cordova.plugins.locationManager.startMonitoringForRegion(n))},stopMonitoringForRegion:function(n){return r.when(e.cordova.plugins.locationManager.stopMonitoringForRegion(n))},requestStateForRegion:function(n){return r.when(e.cordova.plugins.locationManager.requestStateForRegion(n))},startRangingBeaconsInRegion:function(n){return r.when(e.cordova.plugins.locationManager.startRangingBeaconsInRegion(n))},stopRangingBeaconsInRegion:function(n){return r.when(e.cordova.plugins.locationManager.stopRangingBeaconsInRegion(n))},getAuthorizationStatus:function(){return r.when(e.cordova.plugins.locationManager.getAuthorizationStatus())},requestWhenInUseAuthorization:function(){return r.when(e.cordova.plugins.locationManager.requestWhenInUseAuthorization())},requestAlwaysAuthorization:function(){return r.when(e.cordova.plugins.locationManager.requestAlwaysAuthorization())},getMonitoredRegions:function(){return r.when(e.cordova.plugins.locationManager.getMonitoredRegions())},getRangedRegions:function(){return r.when(e.cordova.plugins.locationManager.getRangedRegions())},isRangingAvailable:function(){return r.when(e.cordova.plugins.locationManager.isRangingAvailable())},isMonitoringAvailableForClass:function(n){return r.when(e.cordova.plugins.locationManager.isMonitoringAvailableForClass(n))},startAdvertising:function(n,t){return r.when(e.cordova.plugins.locationManager.startAdvertising(n,t))},stopAdvertising:function(){return r.when(e.cordova.plugins.locationManager.stopAdvertising())},isAdvertisingAvailable:function(){return r.when(e.cordova.plugins.locationManager.isAdvertisingAvailable())},isAdvertising:function(){return r.when(e.cordova.plugins.locationManager.isAdvertising())},disableDebugLogs:function(){return r.when(e.cordova.plugins.locationManager.disableDebugLogs())},enableDebugNotifications:function(){return r.when(e.cordova.plugins.locationManager.enableDebugNotifications())},disableDebugNotifications:function(){return r.when(e.cordova.plugins.locationManager.disableDebugNotifications())},enableDebugLogs:function(){return r.when(e.cordova.plugins.locationManager.enableDebugLogs())},appendToDeviceLog:function(n){return r.when(e.cordova.plugins.locationManager.appendToDeviceLog(n))}}}]),angular.module("ngCordova.plugins.ble",[]).factory("$cordovaBLE",["$q","$timeout",function(e,n){return{scan:function(t,r){var o=e.defer();return ble.startScan(t,function(e){o.notify(e)},function(e){o.reject(e)}),n(function(){ble.stopScan(function(){o.resolve()},function(e){o.reject(e)})},1e3*r),o.promise},connect:function(n){var t=e.defer();return ble.connect(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},disconnect:function(n){var t=e.defer();return ble.disconnect(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},read:function(n,t,r){var o=e.defer();return ble.read(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},write:function(n,t,r,o){var i=e.defer();return ble.write(n,t,r,o,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},writeCommand:function(n,t,r,o){var i=e.defer();return ble.writeCommand(n,t,r,o,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},startNotification:function(n,t,r){var o=e.defer();return ble.startNotification(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},stopNotification:function(n,t,r){var o=e.defer();return ble.stopNotification(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},isConnected:function(n){var t=e.defer();return ble.isConnected(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},isEnabled:function(){var n=e.defer();return ble.isEnabled(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.bluetoothSerial",[]).factory("$cordovaBluetoothSerial",["$q","$window",function(e,n){return{connect:function(t){var r=e.defer(),o=e.defer(),i=!1;return n.bluetoothSerial.connect(t,function(){i=!0,r.resolve(o)},function(e){i===!1&&o.reject(e),r.reject(e)}),r.promise},connectInsecure:function(t){var r=e.defer();return n.bluetoothSerial.connectInsecure(t,function(){r.resolve()},function(e){r.reject(e)}),r.promise},disconnect:function(){var t=e.defer();return n.bluetoothSerial.disconnect(function(){t.resolve()},function(e){t.reject(e)}),t.promise},list:function(){var t=e.defer();return n.bluetoothSerial.list(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},discoverUnpaired:function(){var t=e.defer();return n.bluetoothSerial.discoverUnpaired(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},setDeviceDiscoveredListener:function(){var t=e.defer();return n.bluetoothSerial.setDeviceDiscoveredListener(function(e){t.notify(e)}),t.promise},clearDeviceDiscoveredListener:function(){n.bluetoothSerial.clearDeviceDiscoveredListener()},showBluetoothSettings:function(){var t=e.defer();return n.bluetoothSerial.showBluetoothSettings(function(){t.resolve()},function(e){t.reject(e)}),t.promise},isEnabled:function(){var t=e.defer();return n.bluetoothSerial.isEnabled(function(){t.resolve()},function(){t.reject()}),t.promise},enable:function(){var t=e.defer();return n.bluetoothSerial.enable(function(){t.resolve()},function(){t.reject()}),t.promise},isConnected:function(){var t=e.defer();return n.bluetoothSerial.isConnected(function(){t.resolve()},function(){t.reject()}),t.promise},available:function(){var t=e.defer();return n.bluetoothSerial.available(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},read:function(){var t=e.defer();return n.bluetoothSerial.read(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},readUntil:function(t){var r=e.defer();return n.bluetoothSerial.readUntil(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},write:function(t){var r=e.defer();return n.bluetoothSerial.write(t,function(){r.resolve()},function(e){r.reject(e)}),r.promise},subscribe:function(t){var r=e.defer();return n.bluetoothSerial.subscribe(t,function(e){r.notify(e)},function(e){r.reject(e)}),r.promise},subscribeRawData:function(){var t=e.defer();return n.bluetoothSerial.subscribeRawData(function(e){t.notify(e)},function(e){t.reject(e)}),t.promise},unsubscribe:function(){var t=e.defer();return n.bluetoothSerial.unsubscribe(function(){t.resolve()},function(e){t.reject(e)}),t.promise},unsubscribeRawData:function(){var t=e.defer();return n.bluetoothSerial.unsubscribeRawData(function(){t.resolve()},function(e){t.reject(e)}),t.promise},clear:function(){var t=e.defer();return n.bluetoothSerial.clear(function(){t.resolve()},function(e){t.reject(e)}),t.promise},readRSSI:function(){var t=e.defer();return n.bluetoothSerial.readRSSI(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.brightness",[]).factory("$cordovaBrightness",["$q","$window",function(e,n){return{get:function(){var t=e.defer();return n.cordova?n.cordova.plugins.brightness.getBrightness(function(e){t.resolve(e)},function(e){t.reject(e)}):t.reject("Not supported without cordova.js"),t.promise},set:function(t){var r=e.defer();return n.cordova?n.cordova.plugins.brightness.setBrightness(t,function(e){r.resolve(e)},function(e){r.reject(e)}):r.reject("Not supported without cordova.js"),r.promise},setKeepScreenOn:function(t){var r=e.defer();return n.cordova?n.cordova.plugins.brightness.setKeepScreenOn(t,function(e){r.resolve(e)},function(e){r.reject(e)}):r.reject("Not supported without cordova.js"),r.promise}}}]),angular.module("ngCordova.plugins.calendar",[]).factory("$cordovaCalendar",["$q","$window",function(e,n){return{createCalendar:function(t){var r=e.defer(),o=n.plugins.calendar.getCreateCalendarOptions();return"string"==typeof t?o.calendarName=t:o=angular.extend(o,t),n.plugins.calendar.createCalendar(o,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},deleteCalendar:function(t){var r=e.defer();return n.plugins.calendar.deleteCalendar(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEvent:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.createEvent(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEventWithOptions:function(t){var r=e.defer(),o=[],i=window.plugins.calendar.getCalendarOptions(),a={title:null,location:null,notes:null,startDate:null,endDate:null};o=Object.keys(a);for(var c in t)-1===o.indexOf(c)?i[c]=t[c]:a[c]=t[c];return n.plugins.calendar.createEventWithOptions(a.title,a.location,a.notes,new Date(a.startDate),new Date(a.endDate),i,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEventInteractively:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.createEventInteractively(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEventInNamedCalendar:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null,calendarName:null};return o=angular.extend(o,t),n.plugins.calendar.createEventInNamedCalendar(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),o.calendarName,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},findEvent:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.findEvent(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},listEventsInRange:function(t,r){var o=e.defer();return n.plugins.calendar.listEventsInRange(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},listCalendars:function(){var t=e.defer();return n.plugins.calendar.listCalendars(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},findAllEventsInNamedCalendar:function(t){var r=e.defer();return n.plugins.calendar.findAllEventsInNamedCalendar(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},modifyEvent:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null,newTitle:null,newLocation:null,newNotes:null,newStartDate:null,newEndDate:null};return o=angular.extend(o,t),n.plugins.calendar.modifyEvent(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),o.newTitle,o.newLocation,o.newNotes,new Date(o.newStartDate),new Date(o.newEndDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},deleteEvent:function(t){var r=e.defer(),o={newTitle:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.deleteEvent(o.newTitle,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.camera",[]).factory("$cordovaCamera",["$q",function(e){return{getPicture:function(n){var t=e.defer();return navigator.camera?(navigator.camera.getPicture(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)},cleanup:function(){var n=e.defer();return navigator.camera.cleanup(function(){n.resolve()},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.capture",[]).factory("$cordovaCapture",["$q",function(e){return{captureAudio:function(n){var t=e.defer();return navigator.device.capture?(navigator.device.capture.captureAudio(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)},captureImage:function(n){var t=e.defer();return navigator.device.capture?(navigator.device.capture.captureImage(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)},captureVideo:function(n){var t=e.defer();return navigator.device.capture?(navigator.device.capture.captureVideo(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)}}}]),angular.module("ngCordova.plugins.cardIO",[]).provider("$cordovaNgCardIO",[function(){var e=["card_type","redacted_card_number","card_number","expiry_month","expiry_year","short_expiry_year","cvv","zip"],n={expiry:!0,cvv:!0,zip:!1,suppressManual:!1,suppressConfirm:!1,hideLogo:!0};this.setCardIOResponseFields=function(n){n&&angular.isArray(n)&&(e=n)},this.setScanerConfig=function(e){e&&angular.isObject(e)&&(n.expiry=e.expiry||!0,n.cvv=e.cvv||!0,n.zip=e.zip||!1,n.suppressManual=e.suppressManual||!1,n.suppressConfirm=e.suppressConfirm||!1,n.hideLogo=e.hideLogo||!0)},this.$get=["$q",function(t){return{scanCard:function(){var r=t.defer();return CardIO.scan(n,function(n){if(null===n)r.reject(null);else{for(var t={},o=0,i=e.length;i>o;o++){var a=e[o];"short_expiry_year"===a?t[a]=String(n.expiry_year).substr(2,2)||"":t[a]=n[a]||""}r.resolve(t)}},function(){r.reject(null)}),r.promise}}}]}]),angular.module("ngCordova.plugins.clipboard",[]).factory("$cordovaClipboard",["$q","$window",function(e,n){return{copy:function(t){var r=e.defer();return n.cordova.plugins.clipboard.copy(t,function(){r.resolve()},function(){r.reject()}),r.promise},paste:function(){var t=e.defer();return n.cordova.plugins.clipboard.paste(function(e){t.resolve(e)},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.contacts",[]).factory("$cordovaContacts",["$q",function(e){return{save:function(n){var t=e.defer(),r=navigator.contacts.create(n);return r.save(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},remove:function(n){var t=e.defer(),r=navigator.contacts.create(n);return r.remove(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},clone:function(e){var n=navigator.contacts.create(e);return n.clone(e)},find:function(n){var t=e.defer(),r=n.fields||["id","displayName"];return delete n.fields,0===Object.keys(n).length?navigator.contacts.find(r,function(e){t.resolve(e)},function(e){t.reject(e)}):navigator.contacts.find(r,function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},pickContact:function(){var n=e.defer();return navigator.contacts.pickContact(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.datePicker",[]).factory("$cordovaDatePicker",["$window","$q",function(e,n){return{show:function(t){var r=n.defer();return t=t||{date:new Date,mode:"date"},e.datePicker.show(t,function(e){r.resolve(e)}),r.promise}}}]),angular.module("ngCordova.plugins.device",[]).factory("$cordovaDevice",[function(){return{getDevice:function(){return device},getCordova:function(){return device.cordova},getModel:function(){return device.model},getName:function(){return device.name},getPlatform:function(){return device.platform},getUUID:function(){return device.uuid},getVersion:function(){return device.version},getManufacturer:function(){return device.manufacturer}}}]),angular.module("ngCordova.plugins.deviceMotion",[]).factory("$cordovaDeviceMotion",["$q",function(e){return{getCurrentAcceleration:function(){var n=e.defer();return(angular.isUndefined(navigator.accelerometer)||!angular.isFunction(navigator.accelerometer.getCurrentAcceleration))&&n.reject("Device do not support watchAcceleration"),navigator.accelerometer.getCurrentAcceleration(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},watchAcceleration:function(n){var t=e.defer();(angular.isUndefined(navigator.accelerometer)||!angular.isFunction(navigator.accelerometer.watchAcceleration))&&t.reject("Device do not support watchAcceleration");var r=navigator.accelerometer.watchAcceleration(function(e){t.notify(e)},function(e){t.reject(e)},n);return t.promise.cancel=function(){navigator.accelerometer.clearWatch(r)},t.promise.clearWatch=function(e){navigator.accelerometer.clearWatch(e||r)},t.promise.watchID=r,t.promise},clearWatch:function(e){return navigator.accelerometer.clearWatch(e)}}}]),angular.module("ngCordova.plugins.deviceOrientation",[]).factory("$cordovaDeviceOrientation",["$q",function(e){var n={frequency:3e3};return{getCurrentHeading:function(){var n=e.defer();return navigator.compass?(navigator.compass.getCurrentHeading(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise):(n.reject("No compass on Device"),n.promise)},watchHeading:function(t){var r=e.defer();if(!navigator.compass)return r.reject("No compass on Device"),r.promise;var o=angular.extend(n,t),i=navigator.compass.watchHeading(function(e){r.notify(e)},function(e){r.reject(e)},o);return r.promise.cancel=function(){navigator.compass.clearWatch(i)},r.promise.clearWatch=function(e){navigator.compass.clearWatch(e||i)},r.promise.watchID=i,r.promise},clearWatch:function(e){return navigator.compass.clearWatch(e)}}}]),angular.module("ngCordova.plugins.dialogs",[]).factory("$cordovaDialogs",["$q","$window",function(e,n){return{alert:function(t,r,o){var i=e.defer();return n.navigator.notification?navigator.notification.alert(t,function(){i.resolve()},r,o):(n.alert(t),i.resolve()),i.promise},confirm:function(t,r,o){var i=e.defer();return n.navigator.notification?navigator.notification.confirm(t,function(e){i.resolve(e)},r,o):n.confirm(t)?i.resolve(1):i.resolve(2),i.promise},prompt:function(t,r,o,i){var a=e.defer();if(n.navigator.notification)navigator.notification.prompt(t,function(e){a.resolve(e)},r,o,i);else{var c=n.prompt(t,i);null!==c?a.resolve({input1:c,buttonIndex:1}):a.resolve({input1:c,buttonIndex:2})}return a.promise},beep:function(e){return navigator.notification.beep(e)}}}]),angular.module("ngCordova.plugins.emailComposer",[]).factory("$cordovaEmailComposer",["$q",function(e){return{isAvailable:function(){var n=e.defer();return cordova.plugins.email.isAvailable(function(e){e?n.resolve():n.reject()}),n.promise},open:function(n){var t=e.defer();return cordova.plugins.email.open(n,function(){t.reject()}),t.promise},addAlias:function(e,n){cordova.plugins.email.addAlias(e,n)}}}]),angular.module("ngCordova.plugins.facebook",[]).provider("$cordovaFacebook",[function(){this.browserInit=function(e,n){this.appID=e,this.appVersion=n||"v2.0",facebookConnectPlugin.browserInit(this.appID,this.appVersion)},this.$get=["$q",function(e){return{login:function(n){var t=e.defer();return facebookConnectPlugin.login(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},showDialog:function(n){var t=e.defer();return facebookConnectPlugin.showDialog(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},api:function(n,t){var r=e.defer();return facebookConnectPlugin.api(n,t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},getAccessToken:function(){var n=e.defer();return facebookConnectPlugin.getAccessToken(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getLoginStatus:function(){var n=e.defer();return facebookConnectPlugin.getLoginStatus(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},logout:function(){var n=e.defer();return facebookConnectPlugin.logout(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]}]),angular.module("ngCordova.plugins.facebookAds",[]).factory("$cordovaFacebookAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.FacebookAds.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.FacebookAds.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.FacebookAds.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.FacebookAds.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.FacebookAds.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.FacebookAds.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.FacebookAds.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.FacebookAds.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.file",[]).constant("$cordovaFileError",{1:"NOT_FOUND_ERR",2:"SECURITY_ERR",3:"ABORT_ERR",4:"NOT_READABLE_ERR",5:"ENCODING_ERR",6:"NO_MODIFICATION_ALLOWED_ERR",7:"INVALID_STATE_ERR",8:"SYNTAX_ERR",9:"INVALID_MODIFICATION_ERR",10:"QUOTA_EXCEEDED_ERR",11:"TYPE_MISMATCH_ERR",12:"PATH_EXISTS_ERR"}).provider("$cordovaFile",[function(){this.$get=["$q","$window","$cordovaFileError",function(e,n,t){return{getFreeDiskSpace:function(){var n=e.defer();return cordova.exec(function(e){n.resolve(e)},function(e){n.reject(e)},"File","getFreeDiskSpace",[]),n.promise},checkDir:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("directory cannot start with /");try{var a=r+o;n.resolveLocalFileSystemURL(a,function(e){e.isDirectory===!0?i.resolve(e):i.reject({code:13,message:"input is not a directory"})},function(e){e.message=t[e.code],i.reject(e)})}catch(c){c.message=t[c.code],i.reject(c)}return i.promise},checkFile:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("directory cannot start with /");try{var a=r+o;n.resolveLocalFileSystemURL(a,function(e){e.isFile===!0?i.resolve(e):i.reject({code:13,message:"input is not a file"})},function(e){e.message=t[e.code],i.reject(e)})}catch(c){c.message=t[c.code],i.reject(c)}return i.promise},createDir:function(r,o,i){var a=e.defer();/^\//.test(o)&&a.reject("directory cannot start with /"),i=i?!1:!0;var c={create:!0,exclusive:i};try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,c,function(e){a.resolve(e)},function(e){e.message=t[e.code],a.reject(e)})},function(e){e.message=t[e.code],a.reject(e)})}catch(s){s.message=t[s.code],a.reject(s)}return a.promise},createFile:function(r,o,i){var a=e.defer();/^\//.test(o)&&a.reject("file-name cannot start with /"),i=i?!1:!0;var c={create:!0,exclusive:i};try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,c,function(e){a.resolve(e)},function(e){e.message=t[e.code],a.reject(e)})},function(e){e.message=t[e.code],a.reject(e)})}catch(s){s.message=t[s.code],a.reject(s)}return a.promise},removeDir:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,{create:!1},function(e){e.remove(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},removeFile:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.remove(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],
i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},removeRecursively:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,{create:!1},function(e){e.removeRecursively(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},writeFile:function(r,o,i,a){var c=e.defer();/^\//.test(o)&&c.reject("file-name cannot start with /"),a=a?!1:!0;var s={create:!0,exclusive:a};try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,s,function(e){e.createWriter(function(e){s.append===!0&&e.seek(e.length),s.truncate&&e.truncate(s.truncate),e.onwriteend=function(e){this.error?c.reject(this.error):c.resolve(e)},e.write(i),c.promise.abort=function(){e.abort()}})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})}catch(u){u.message=t[u.code],c.reject(u)}return c.promise},writeExistingFile:function(r,o,i){var a=e.defer();/^\//.test(o)&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.createWriter(function(e){e.seek(e.length),e.onwriteend=function(e){this.error?a.reject(this.error):a.resolve(e)},e.write(i),a.promise.abort=function(){e.abort()}})},function(e){e.message=t[e.code],a.reject(e)})},function(e){e.message=t[e.code],a.reject(e)})}catch(c){c.message=t[c.code],a.reject(c)}return a.promise},readAsText:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsText(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},readAsDataURL:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsDataURL(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},readAsBinaryString:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsBinaryString(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},readAsArrayBuffer:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsArrayBuffer(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},moveFile:function(t,r,o,i){var a=e.defer();i=i||r,(/^\//.test(r)||/^\//.test(i))&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(t,function(e){e.getFile(r,{create:!1},function(e){n.resolveLocalFileSystemURL(o,function(n){e.moveTo(n,i,function(e){a.resolve(e)},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})}catch(c){a.reject(c)}return a.promise},moveDir:function(t,r,o,i){var a=e.defer();i=i||r,(/^\//.test(r)||/^\//.test(i))&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(t,function(e){e.getDirectory(r,{create:!1},function(e){n.resolveLocalFileSystemURL(o,function(n){e.moveTo(n,i,function(e){a.resolve(e)},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})}catch(c){a.reject(c)}return a.promise},copyDir:function(r,o,i,a){var c=e.defer();a=a||o,(/^\//.test(o)||/^\//.test(a))&&c.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,{create:!1,exclusive:!1},function(e){n.resolveLocalFileSystemURL(i,function(n){e.copyTo(n,a,function(e){c.resolve(e)},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})}catch(s){s.message=t[s.code],c.reject(s)}return c.promise},copyFile:function(r,o,i,a){var c=e.defer();a=a||o,/^\//.test(o)&&c.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1,exclusive:!1},function(e){n.resolveLocalFileSystemURL(i,function(n){e.copyTo(n,a,function(e){c.resolve(e)},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})}catch(s){s.message=t[s.code],c.reject(s)}return c.promise}}}]}]),angular.module("ngCordova.plugins.fileOpener2",[]).factory("$cordovaFileOpener2",["$q",function(e){return{open:function(n,t){var r=e.defer();return cordova.plugins.fileOpener2.open(n,t,{error:function(e){r.reject(e)},success:function(){r.resolve()}}),r.promise},uninstall:function(n){var t=e.defer();return cordova.plugins.fileOpener2.uninstall(n,{error:function(e){t.reject(e)},success:function(){t.resolve()}}),t.promise},appIsInstalled:function(n){var t=e.defer();return cordova.plugins.fileOpener2.appIsInstalled(n,{success:function(e){t.resolve(e)}}),t.promise}}}]),angular.module("ngCordova.plugins.fileTransfer",[]).factory("$cordovaFileTransfer",["$q","$timeout",function(e,n){return{download:function(t,r,o,i){var a=e.defer(),c=new FileTransfer,s=o&&o.encodeURI===!1?t:encodeURI(t);return o&&void 0!==o.timeout&&null!==o.timeout&&(n(function(){c.abort()},o.timeout),o.timeout=null),c.onprogress=function(e){a.notify(e)},a.promise.abort=function(){c.abort()},c.download(s,r,a.resolve,a.reject,i,o),a.promise},upload:function(t,r,o,i){var a=e.defer(),c=new FileTransfer,s=o&&o.encodeURI===!1?t:encodeURI(t);return o&&void 0!==o.timeout&&null!==o.timeout&&(n(function(){c.abort()},o.timeout),o.timeout=null),c.onprogress=function(e){a.notify(e)},a.promise.abort=function(){c.abort()},c.upload(r,s,a.resolve,a.reject,o,i),a.promise}}}]),angular.module("ngCordova.plugins.flashlight",[]).factory("$cordovaFlashlight",["$q","$window",function(e,n){return{available:function(){var t=e.defer();return n.plugins.flashlight.available(function(e){t.resolve(e)}),t.promise},switchOn:function(){var t=e.defer();return n.plugins.flashlight.switchOn(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},switchOff:function(){var t=e.defer();return n.plugins.flashlight.switchOff(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},toggle:function(){var t=e.defer();return n.plugins.flashlight.toggle(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.flurryAds",[]).factory("$cordovaFlurryAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.FlurryAds.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.FlurryAds.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.FlurryAds.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.FlurryAds.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.FlurryAds.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.FlurryAds.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.FlurryAds.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.FlurryAds.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.ga",[]).factory("$cordovaGA",["$q","$window",function(e,n){return{init:function(t,r){var o=e.defer();return r=r>=0?r:10,n.plugins.gaPlugin.init(function(e){o.resolve(e)},function(e){o.reject(e)},t,r),o.promise},trackEvent:function(t,r,o,i,a,c){var s=e.defer();return n.plugins.gaPlugin.trackEvent(function(e){s.resolve(e)},function(e){s.reject(e)},o,i,a,c),s.promise},trackPage:function(t,r,o){var i=e.defer();return n.plugins.gaPlugin.trackPage(function(e){i.resolve(e)},function(e){i.reject(e)},o),i.promise},setVariable:function(t,r,o,i){var a=e.defer();return n.plugins.gaPlugin.setVariable(function(e){a.resolve(e)},function(e){a.reject(e)},o,i),a.promise},exit:function(){var t=e.defer();return n.plugins.gaPlugin.exit(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.geolocation",[]).factory("$cordovaGeolocation",["$q",function(e){return{getCurrentPosition:function(n){var t=e.defer();return navigator.geolocation.getCurrentPosition(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},watchPosition:function(n){var t=e.defer(),r=navigator.geolocation.watchPosition(function(e){t.notify(e)},function(e){t.reject(e)},n);return t.promise.cancel=function(){navigator.geolocation.clearWatch(r)},t.promise.clearWatch=function(e){navigator.geolocation.clearWatch(e||r)},t.promise.watchID=r,t.promise},clearWatch:function(e){return navigator.geolocation.clearWatch(e)}}}]),angular.module("ngCordova.plugins.globalization",[]).factory("$cordovaGlobalization",["$q",function(e){return{getPreferredLanguage:function(){var n=e.defer();return navigator.globalization.getPreferredLanguage(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getLocaleName:function(){var n=e.defer();return navigator.globalization.getLocaleName(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getFirstDayOfWeek:function(){var n=e.defer();return navigator.globalization.getFirstDayOfWeek(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},dateToString:function(n,t){var r=e.defer();return navigator.globalization.dateToString(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},stringToDate:function(n,t){var r=e.defer();return navigator.globalization.stringToDate(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},getDatePattern:function(n){var t=e.defer();return navigator.globalization.getDatePattern(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},getDateNames:function(n){var t=e.defer();return navigator.globalization.getDateNames(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},isDayLightSavingsTime:function(n){var t=e.defer();return navigator.globalization.isDayLightSavingsTime(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},numberToString:function(n,t){var r=e.defer();return navigator.globalization.numberToString(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},stringToNumber:function(n,t){var r=e.defer();return navigator.globalization.stringToNumber(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},getNumberPattern:function(n){var t=e.defer();return navigator.globalization.getNumberPattern(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},getCurrencyPattern:function(n){var t=e.defer();return navigator.globalization.getCurrencyPattern(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.googleAds",[]).factory("$cordovaGoogleAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.AdMob.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.AdMob.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.AdMob.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.AdMob.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.AdMob.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.AdMob.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.AdMob.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.AdMob.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.googleAnalytics",[]).factory("$cordovaGoogleAnalytics",["$q","$window",function(e,n){return{startTrackerWithId:function(t){var r=e.defer();return n.analytics.startTrackerWithId(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},setUserId:function(t){var r=e.defer();return n.analytics.setUserId(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},debugMode:function(){var t=e.defer();return n.analytics.debugMode(function(e){t.resolve(e)},function(){t.reject()}),t.promise},trackView:function(t){var r=e.defer();return n.analytics.trackView(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},addCustomDimension:function(t,r){var o=e.defer();return n.analytics.addCustomDimension(t,r,function(){o.resolve()},function(e){o.reject(e)}),o.promise},trackEvent:function(t,r,o,i){var a=e.defer();return n.analytics.trackEvent(t,r,o,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},trackException:function(t,r){var o=e.defer();return n.analytics.trackException(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},trackTiming:function(t,r,o,i){var a=e.defer();return n.analytics.trackTiming(t,r,o,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},addTransaction:function(t,r,o,i,a,c){var s=e.defer();return n.analytics.addTransaction(t,r,o,i,a,c,function(e){s.resolve(e)},function(e){s.reject(e)}),s.promise},addTransactionItem:function(t,r,o,i,a,c,s){var u=e.defer();return n.analytics.addTransactionItem(t,r,o,i,a,c,s,function(e){u.resolve(e)},function(e){u.reject(e)}),u.promise}}}]),angular.module("ngCordova.plugins.googleMap",[]).factory("$cordovaGoogleMap",["$q","$window",function(e,n){var t=null;return{getMap:function(r){var o=e.defer();if(n.plugin.google.maps){var i=document.getElementById("map_canvas");t=n.plugin.google.maps.Map.getMap(r),t.setDiv(i),o.resolve(t)}else o.reject(null);return o.promise},isMapLoaded:function(){return!!t},addMarker:function(n){var r=e.defer();return t.addMarker(n,function(e){r.resolve(e)}),r.promise},getMapTypeIds:function(){return n.plugin.google.maps.mapTypeId},setVisible:function(n){var r=e.defer();return t.setVisible(n),r.promise},cleanup:function(){t=null}}}]),angular.module("ngCordova.plugins.googlePlayGame",[]).factory("$cordovaGooglePlayGame",["$q",function(e){return{auth:function(){var n=e.defer();return googleplaygame.auth(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},signout:function(){var n=e.defer();return googleplaygame.signout(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},isSignedIn:function(){var n=e.defer();return googleplaygame.isSignedIn(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},showPlayer:function(){var n=e.defer();return googleplaygame.showPlayer(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},submitScore:function(n){var t=e.defer();return googleplaygame.submitScore(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},showAllLeaderboards:function(){var n=e.defer();return googleplaygame.showAllLeaderboards(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},showLeaderboard:function(n){var t=e.defer();return googleplaygame.showLeaderboard(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},unlockAchievement:function(n){var t=e.defer();return googleplaygame.unlockAchievement(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},incrementAchievement:function(n){var t=e.defer();return googleplaygame.incrementAchievement(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},showAchievements:function(){var n=e.defer();return googleplaygame.showAchievements(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.googlePlus",[]).factory("$cordovaGooglePlus",["$q","$window",function(e,n){return{login:function(t){var r=e.defer();return void 0===t&&(t={}),n.plugins.googleplus.login({iOSApiKey:t},function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},silentLogin:function(t){var r=e.defer();return void 0===t&&(t={}),n.plugins.googleplus.trySilentLogin({iOSApiKey:t},function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},logout:function(){var t=e.defer();n.plugins.googleplus.logout(function(e){t.resolve(e)})},disconnect:function(){var t=e.defer();n.plugins.googleplus.disconnect(function(e){t.resolve(e)})},isAvailable:function(){var t=e.defer();return n.plugins.googleplus.isAvailable(function(e){e?t.resolve(e):t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.healthKit",[]).factory("$cordovaHealthKit",["$q","$window",function(e,n){return{isAvailable:function(){var t=e.defer();return n.plugins.healthkit.available(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},checkAuthStatus:function(t){var r=e.defer();return t=t||"HKQuantityTypeIdentifierHeight",n.plugins.healthkit.checkAuthStatus({type:t},function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},requestAuthorization:function(t,r){var o=e.defer();return t=t||["HKCharacteristicTypeIdentifierDateOfBirth","HKQuantityTypeIdentifierActiveEnergyBurned","HKQuantityTypeIdentifierHeight"],r=r||["HKQuantityTypeIdentifierActiveEnergyBurned","HKQuantityTypeIdentifierHeight","HKQuantityTypeIdentifierDistanceCycling"],n.plugins.healthkit.requestAuthorization({readTypes:t,writeTypes:r},function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},readDateOfBirth:function(){var t=e.defer();return n.plugins.healthkit.readDateOfBirth(function(e){t.resolve(e)},function(e){t.resolve(e)}),t.promise},readGender:function(){var t=e.defer();return n.plugins.healthkit.readGender(function(e){t.resolve(e)},function(e){t.resolve(e)}),t.promise},saveWeight:function(t,r,o){var i=e.defer();return n.plugins.healthkit.saveWeight({unit:r||"lb",amount:t,date:o||new Date},function(e){i.resolve(e)},function(e){i.resolve(e)}),i.promise},readWeight:function(t){var r=e.defer();return n.plugins.healthkit.readWeight({unit:t||"lb"},function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},saveHeight:function(t,r,o){var i=e.defer();return n.plugins.healthkit.saveHeight({unit:r||"in",amount:t,date:o||new Date},function(e){i.resolve(e)},function(e){i.resolve(e)}),i.promise},readHeight:function(t){var r=e.defer();return n.plugins.healthkit.readHeight({unit:t||"in"},function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},findWorkouts:function(){var t=e.defer();return n.plugins.healthkit.findWorkouts({},function(e){t.resolve(e)},function(e){t.resolve(e)}),t.promise},saveWorkout:function(t){var r=e.defer();return n.plugins.healthkit.saveWorkout(t,function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},querySampleType:function(t){var r=e.defer();return n.plugins.healthkit.querySampleType(t,function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise}}}]),angular.module("ngCordova.plugins.httpd",[]).factory("$cordovaHttpd",["$q",function(e){return{startServer:function(n){var t=e.defer();return cordova.plugins.CorHttpd.startServer(n,function(){t.resolve()},function(){t.reject()}),t.promise},stopServer:function(){var n=e.defer();return cordova.plugins.CorHttpd.stopServer(function(){n.resolve()},function(){n.reject()}),n.promise},getURL:function(){var n=e.defer();return cordova.plugins.CorHttpd.getURL(function(e){n.resolve(e)},function(){n.reject()}),n.promise},getLocalPath:function(){var n=e.defer();return cordova.plugins.CorHttpd.getLocalPath(function(e){n.resolve(e)},function(){n.reject()}),n.promise}}}]),angular.module("ngCordova.plugins.iAd",[]).factory("$cordovaiAd",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.iAd.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.iAd.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.iAd.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.iAd.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.iAd.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.iAd.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.iAd.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.iAd.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.imagePicker",[]).factory("$cordovaImagePicker",["$q","$window",function(e,n){return{getPictures:function(t){var r=e.defer();return n.imagePicker.getPictures(function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise}}}]),angular.module("ngCordova.plugins.inAppBrowser",[]).provider("$cordovaInAppBrowser",[function(){var e,n=this.defaultOptions={};this.setDefaultOptions=function(e){n=angular.extend(n,e)},this.$get=["$rootScope","$q","$window","$timeout",function(t,r,o,i){return{open:function(a,c,s){var u=r.defer();if(s&&!angular.isObject(s))return u.reject("options must be an object"),u.promise;var l=angular.extend({},n,s),d=[];angular.forEach(l,function(e,n){d.push(n+"="+e)});var f=d.join();return e=o.open(a,c,f),e.addEventListener("loadstart",function(e){i(function(){t.$broadcast("$cordovaInAppBrowser:loadstart",e)})},!1),e.addEventListener("loadstop",function(e){u.resolve(e),i(function(){t.$broadcast("$cordovaInAppBrowser:loadstop",e)})},!1),e.addEventListener("loaderror",function(e){u.reject(e),i(function(){t.$broadcast("$cordovaInAppBrowser:loaderror",e)})},!1),e.addEventListener("exit",function(e){i(function(){t.$broadcast("$cordovaInAppBrowser:exit",e)})},!1),u.promise},close:function(){e.close(),e=null},show:function(){e.show()},executeScript:function(n){var t=r.defer();return e.executeScript(n,function(e){t.resolve(e)}),t.promise},insertCSS:function(n){var t=r.defer();return e.insertCSS(n,function(e){t.resolve(e)}),t.promise}}}]}]),angular.module("ngCordova.plugins.insomnia",[]).factory("$cordovaInsomnia",["$window",function(e){return{keepAwake:function(){return e.plugins.insomnia.keepAwake()},allowSleepAgain:function(){return e.plugins.insomnia.allowSleepAgain()}}}]),angular.module("ngCordova.plugins.instagram",[]).factory("$cordovaInstagram",["$q",function(e){return{share:function(n){var t=e.defer();return window.Instagram?(Instagram.share(n.image,n.caption,function(e){e?t.reject(e):t.resolve(!0)}),t.promise):(console.error("Tried to call Instagram.share but the Instagram plugin isn't installed!"),t.resolve(null),t.promise)},isInstalled:function(){var n=e.defer();return window.Instagram?(Instagram.isInstalled(function(e,t){e?n.reject(e):n.resolve(t)}),n.promise):(console.error("Tried to call Instagram.isInstalled but the Instagram plugin isn't installed!"),n.resolve(null),n.promise)}}}]),angular.module("ngCordova.plugins.keyboard",[]).factory("$cordovaKeyboard",["$rootScope",function(e){var n=function(){e.$evalAsync(function(){e.$broadcast("$cordovaKeyboard:show")})},t=function(){e.$evalAsync(function(){e.$broadcast("$cordovaKeyboard:hide")})};return document.addEventListener("deviceready",function(){cordova.plugins.Keyboard&&(window.addEventListener("native.keyboardshow",n,!1),window.addEventListener("native.keyboardhide",t,!1))}),{hideAccessoryBar:function(e){return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(e)},close:function(){return cordova.plugins.Keyboard.close()},show:function(){return cordova.plugins.Keyboard.show()},disableScroll:function(e){return cordova.plugins.Keyboard.disableScroll(e)},isVisible:function(){return cordova.plugins.Keyboard.isVisible},clearShowWatch:function(){document.removeEventListener("native.keyboardshow",n),e.$$listeners["$cordovaKeyboard:show"]=[]},clearHideWatch:function(){document.removeEventListener("native.keyboardhide",t),e.$$listeners["$cordovaKeyboard:hide"]=[]}}}]),angular.module("ngCordova.plugins.keychain",[]).factory("$cordovaKeychain",["$q",function(e){return{getForKey:function(n,t){var r=e.defer(),o=new Keychain;return o.getForKey(r.resolve,r.reject,n,t),r.promise},setForKey:function(n,t,r){var o=e.defer(),i=new Keychain;return i.setForKey(o.resolve,o.reject,n,t,r),o.promise},removeForKey:function(n,t){var r=e.defer(),o=new Keychain;return o.removeForKey(r.resolve,r.reject,n,t),r.promise}}}]),angular.module("ngCordova.plugins.launchNavigator",[]).factory("$cordovaLaunchNavigator",["$q",function(e){return{navigate:function(n,t,r){var o=e.defer();return launchnavigator.navigate(n,t,function(){o.resolve()},function(e){o.reject(e)},r),o.promise}}}]),angular.module("ngCordova.plugins.localNotification",[]).factory("$cordovaLocalNotification",["$q","$window","$rootScope","$timeout",function(e,n,t,r){return document.addEventListener("deviceready",function(){n.cordova&&n.cordova.plugins&&n.cordova.plugins.notification&&n.cordova.plugins.notification.local&&(n.cordova.plugins.notification.local.on("schedule",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:schedule",e,n)})}),n.cordova.plugins.notification.local.on("trigger",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:trigger",e,n)})}),n.cordova.plugins.notification.local.on("update",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:update",e,n)})}),n.cordova.plugins.notification.local.on("clear",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:clear",e,n)})}),n.cordova.plugins.notification.local.on("clearall",function(e){r(function(){t.$broadcast("$cordovaLocalNotification:clearall",e)})}),n.cordova.plugins.notification.local.on("cancel",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:cancel",e,n)})}),n.cordova.plugins.notification.local.on("cancelall",function(e){r(function(){t.$broadcast("$cordovaLocalNotification:cancelall",e)})}),n.cordova.plugins.notification.local.on("click",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:click",e,n)})}))},!1),{schedule:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.schedule(t,function(e){o.resolve(e)},r),o.promise},add:function(t,r){console.warn('Deprecated: use "schedule" instead.');var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.schedule(t,function(e){o.resolve(e)},r),o.promise},update:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.update(t,function(e){o.resolve(e)},r),o.promise},clear:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.clear(t,function(e){o.resolve(e)},r),o.promise},clearAll:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.clearAll(function(e){r.resolve(e)},t),r.promise},cancel:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.cancel(t,function(e){o.resolve(e)},r),o.promise},cancelAll:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.cancelAll(function(e){r.resolve(e)},t),r.promise},isPresent:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.isPresent(t,function(e){o.resolve(e)},r),o.promise},isScheduled:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.isScheduled(t,function(e){o.resolve(e)},r),o.promise},isTriggered:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.isTriggered(t,function(e){o.resolve(e)},r),o.promise},hasPermission:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.hasPermission(function(e){e?r.resolve(e):r.reject(e)},t),r.promise},registerPermission:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.registerPermission(function(e){e?r.resolve(e):r.reject(e)},t),r.promise},promptForPermission:function(t){console.warn('Deprecated: use "registerPermission" instead.');var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.registerPermission(function(e){e?r.resolve(e):r.reject(e)},t),r.promise},getAllIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAllIds(function(e){r.resolve(e)},t),r.promise},getIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getIds(function(e){r.resolve(e)},t),r.promise},getScheduledIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getScheduledIds(function(e){r.resolve(e)},t),r.promise},getTriggeredIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getTriggeredIds(function(e){r.resolve(e)},t),r.promise},get:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.get(t,function(e){o.resolve(e)},r),o.promise},getAll:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAll(function(e){r.resolve(e)},t),r.promise},getScheduled:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getScheduled(t,function(e){o.resolve(e)},r),o.promise},getAllScheduled:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAllScheduled(function(e){r.resolve(e)},t),r.promise},getTriggered:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getTriggered(t,function(e){o.resolve(e)},r),o.promise},getAllTriggered:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAllTriggered(function(e){r.resolve(e)},t),r.promise},getDefaults:function(){return n.cordova.plugins.notification.local.getDefaults()},setDefaults:function(e){n.cordova.plugins.notification.local.setDefaults(e)}}}]),angular.module("ngCordova.plugins.mMediaAds",[]).factory("$cordovaMMediaAds",["$q","$window",function(e,n){
return{setOptions:function(t){var r=e.defer();return n.mMedia.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.mMedia.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.mMedia.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.mMedia.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.mMedia.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.mMedia.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.mMedia.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.mMedia.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.media",[]).service("NewMedia",["$q","$interval",function(e,n){function t(e){angular.isDefined(u)||(u=n(function(){0>f&&(f=e.getDuration(),a&&f>0&&a.notify({duration:f})),e.getCurrentPosition(function(e){e>-1&&(d=e)},function(e){console.log("Error getting pos="+e)}),a&&a.notify({position:d})},1e3))}function r(){angular.isDefined(u)&&(n.cancel(u),u=void 0)}function o(){d=-1,f=-1}function i(e){this.media=new Media(e,function(e){r(),o(),a.resolve(e)},function(e){r(),o(),a.reject(e)},function(e){l=e,a.notify({status:l})})}var a,c,s,u,l=null,d=-1,f=-1;return i.prototype.play=function(n){return a=e.defer(),"object"!=typeof n&&(n={}),this.media.play(n),t(this.media),a.promise},i.prototype.pause=function(){r(),this.media.pause()},i.prototype.stop=function(){this.media.stop()},i.prototype.release=function(){this.media.release(),this.media=void 0},i.prototype.seekTo=function(e){this.media.seekTo(e)},i.prototype.setVolume=function(e){this.media.setVolume(e)},i.prototype.startRecord=function(){this.media.startRecord()},i.prototype.stopRecord=function(){this.media.stopRecord()},i.prototype.currentTime=function(){return c=e.defer(),this.media.getCurrentPosition(function(e){c.resolve(e)}),c.promise},i.prototype.getDuration=function(){return s=e.defer(),this.media.getDuration(function(e){s.resolve(e)}),s.promise},i}]).factory("$cordovaMedia",["NewMedia",function(e){return{newMedia:function(n){return new e(n)}}}]),angular.module("ngCordova.plugins.mobfoxAds",[]).factory("$cordovaMobFoxAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.MobFox.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.MobFox.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.MobFox.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.MobFox.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.MobFox.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.MobFox.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.MobFox.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.MobFox.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins",["ngCordova.plugins.actionSheet","ngCordova.plugins.adMob","ngCordova.plugins.appAvailability","ngCordova.plugins.appRate","ngCordova.plugins.appVersion","ngCordova.plugins.backgroundGeolocation","ngCordova.plugins.badge","ngCordova.plugins.barcodeScanner","ngCordova.plugins.batteryStatus","ngCordova.plugins.beacon","ngCordova.plugins.ble","ngCordova.plugins.bluetoothSerial","ngCordova.plugins.brightness","ngCordova.plugins.calendar","ngCordova.plugins.camera","ngCordova.plugins.capture","ngCordova.plugins.clipboard","ngCordova.plugins.contacts","ngCordova.plugins.datePicker","ngCordova.plugins.device","ngCordova.plugins.deviceMotion","ngCordova.plugins.deviceOrientation","ngCordova.plugins.dialogs","ngCordova.plugins.emailComposer","ngCordova.plugins.facebook","ngCordova.plugins.facebookAds","ngCordova.plugins.file","ngCordova.plugins.fileTransfer","ngCordova.plugins.fileOpener2","ngCordova.plugins.flashlight","ngCordova.plugins.flurryAds","ngCordova.plugins.ga","ngCordova.plugins.geolocation","ngCordova.plugins.globalization","ngCordova.plugins.googleAds","ngCordova.plugins.googleAnalytics","ngCordova.plugins.googleMap","ngCordova.plugins.googlePlayGame","ngCordova.plugins.googlePlus","ngCordova.plugins.healthKit","ngCordova.plugins.httpd","ngCordova.plugins.iAd","ngCordova.plugins.imagePicker","ngCordova.plugins.inAppBrowser","ngCordova.plugins.instagram","ngCordova.plugins.keyboard","ngCordova.plugins.keychain","ngCordova.plugins.launchNavigator","ngCordova.plugins.localNotification","ngCordova.plugins.media","ngCordova.plugins.mMediaAds","ngCordova.plugins.mobfoxAds","ngCordova.plugins.mopubAds","ngCordova.plugins.nativeAudio","ngCordova.plugins.network","ngCordovaOauth","ngCordova.plugins.pinDialog","ngCordova.plugins.preferences","ngCordova.plugins.printer","ngCordova.plugins.progressIndicator","ngCordova.plugins.push","ngCordova.plugins.push_v5","ngCordova.plugins.sms","ngCordova.plugins.socialSharing","ngCordova.plugins.spinnerDialog","ngCordova.plugins.splashscreen","ngCordova.plugins.sqlite","ngCordova.plugins.statusbar","ngCordova.plugins.toast","ngCordova.plugins.touchid","ngCordova.plugins.vibration","ngCordova.plugins.videoCapturePlus","ngCordova.plugins.zip","ngCordova.plugins.insomnia"]),angular.module("ngCordova.plugins.mopubAds",[]).factory("$cordovaMoPubAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.MoPub.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.MoPub.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.MoPub.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.MoPub.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.MoPub.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.MoPub.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.MoPub.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.MoPub.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.nativeAudio",[]).factory("$cordovaNativeAudio",["$q","$window",function(e,n){return{preloadSimple:function(t,r){var o=e.defer();return n.plugins.NativeAudio.preloadSimple(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},preloadComplex:function(t,r,o,i){var a=e.defer();return n.plugins.NativeAudio.preloadComplex(t,r,o,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},play:function(t,r){var o=e.defer();return n.plugins.NativeAudio.play(t,r,function(e){o.reject(e)},function(e){o.resolve(e)}),o.promise},stop:function(t){var r=e.defer();return n.plugins.NativeAudio.stop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},loop:function(t){var r=e.defer();return n.plugins.NativeAudio.loop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},unload:function(t){var r=e.defer();return n.plugins.NativeAudio.unload(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},setVolumeForComplexAsset:function(t,r){var o=e.defer();return n.plugins.NativeAudio.setVolumeForComplexAsset(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.network",[]).factory("$cordovaNetwork",["$rootScope","$timeout",function(e,n){var t=function(){var t=navigator.connection.type;n(function(){e.$broadcast("$cordovaNetwork:offline",t)})},r=function(){var t=navigator.connection.type;n(function(){e.$broadcast("$cordovaNetwork:online",t)})};return document.addEventListener("deviceready",function(){navigator.connection&&(document.addEventListener("offline",t,!1),document.addEventListener("online",r,!1))}),{getNetwork:function(){return navigator.connection.type},isOnline:function(){var e=navigator.connection.type;return e!==Connection.UNKNOWN&&e!==Connection.NONE},isOffline:function(){var e=navigator.connection.type;return e===Connection.UNKNOWN||e===Connection.NONE},clearOfflineWatch:function(){document.removeEventListener("offline",t),e.$$listeners["$cordovaNetwork:offline"]=[]},clearOnlineWatch:function(){document.removeEventListener("online",r),e.$$listeners["$cordovaNetwork:online"]=[]}}}]).run(["$injector",function(e){e.get("$cordovaNetwork")}]),angular.module("ngCordova.plugins.pinDialog",[]).factory("$cordovaPinDialog",["$q","$window",function(e,n){return{prompt:function(t,r,o){var i=e.defer();return n.plugins.pinDialog.prompt(t,function(e){i.resolve(e)},r,o),i.promise}}}]),angular.module("ngCordova.plugins.preferences",[]).factory("$cordovaPreferences",["$window","$q",function(e,n){return{pluginNotEnabledMessage:"Plugin not enabled",decoratePromise:function(e){e.success=function(n){return e.then(n),e},e.error=function(n){return e.then(null,n),e}},store:function(t,r,o){function i(e){c.resolve(e)}function a(e){c.reject(new Error(e))}var c=n.defer(),s=c.promise;if(e.plugins){var u;u=3===arguments.length?e.plugins.appPreferences.store(o,t,r):e.plugins.appPreferences.store(t,r),u.then(i,a)}else c.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(s),s},fetch:function(t,r){function o(e){a.resolve(e)}function i(e){a.reject(new Error(e))}var a=n.defer(),c=a.promise;if(e.plugins){var s;s=2===arguments.length?e.plugins.appPreferences.fetch(r,t):e.plugins.appPreferences.fetch(t),s.then(o,i)}else a.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(c),c},remove:function(t,r){function o(e){a.resolve(e)}function i(e){a.reject(new Error(e))}var a=n.defer(),c=a.promise;if(e.plugins){var s;s=2===arguments.length?e.plugins.appPreferences.remove(r,t):e.plugins.appPreferences.remove(t),s.then(o,i)}else a.reject(new Error(this.pluginNotEnabledMessage));return this.decoratePromise(c),c},show:function(){function t(e){o.resolve(e)}function r(e){o.reject(new Error(e))}var o=n.defer(),i=o.promise;return e.plugins?e.plugins.appPreferences.show().then(t,r):o.reject(new Error(this.pluginNotEnabledMessage)),this.decoratePromise(i),i}}}]),angular.module("ngCordova.plugins.printer",[]).factory("$cordovaPrinter",["$q","$window",function(e,n){return{isAvailable:function(){var t=e.defer();return n.plugin.printer.isAvailable(function(e){t.resolve(e)}),t.promise},print:function(t,r){var o=e.defer();return n.plugin.printer.print(t,r,function(){o.resolve()}),o.promise}}}]),angular.module("ngCordova.plugins.progressIndicator",[]).factory("$cordovaProgress",[function(){return{show:function(e){var n=e||"Please wait...";return ProgressIndicator.show(n)},showSimple:function(e){var n=e||!1;return ProgressIndicator.showSimple(n)},showSimpleWithLabel:function(e,n){var t=e||!1,r=n||"Loading...";return ProgressIndicator.showSimpleWithLabel(t,r)},showSimpleWithLabelDetail:function(e,n,t){var r=e||!1,o=n||"Loading...",i=t||"Please wait";return ProgressIndicator.showSimpleWithLabelDetail(r,o,i)},showDeterminate:function(e,n){var t=e||!1,r=n||5e4;return ProgressIndicator.showDeterminate(t,r)},showDeterminateWithLabel:function(e,n,t){var r=e||!1,o=n||5e4,i=t||"Loading...";return ProgressIndicator.showDeterminateWithLabel(r,o,i)},showAnnular:function(e,n){var t=e||!1,r=n||5e4;return ProgressIndicator.showAnnular(t,r)},showAnnularWithLabel:function(e,n,t){var r=e||!1,o=n||5e4,i=t||"Loading...";return ProgressIndicator.showAnnularWithLabel(r,o,i)},showBar:function(e,n){var t=e||!1,r=n||5e4;return ProgressIndicator.showBar(t,r)},showBarWithLabel:function(e,n,t){var r=e||!1,o=n||5e4,i=t||"Loading...";return ProgressIndicator.showBarWithLabel(r,o,i)},showSuccess:function(e,n){var t=e||!1,r=n||"Success";return ProgressIndicator.showSuccess(t,r)},showText:function(e,n,t){var r=e||!1,o=n||"Warning",i=t||"center";return ProgressIndicator.showText(r,o,i)},hide:function(){return ProgressIndicator.hide()}}}]),angular.module("ngCordova.plugins.push",[]).factory("$cordovaPush",["$q","$window","$rootScope","$timeout",function(e,n,t,r){return{onNotification:function(e){r(function(){t.$broadcast("$cordovaPush:notificationReceived",e)})},register:function(t){var r,o=e.defer();return void 0!==t&&void 0===t.ecb&&(r=null===document.querySelector("[ng-app]")?"document.body":"document.querySelector('[ng-app]')",t.ecb="angular.element("+r+").injector().get('$cordovaPush').onNotification"),n.plugins.pushNotification.register(function(e){o.resolve(e)},function(e){o.reject(e)},t),o.promise},unregister:function(t){var r=e.defer();return n.plugins.pushNotification.unregister(function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},setBadgeNumber:function(t){var r=e.defer();return n.plugins.pushNotification.setApplicationIconBadgeNumber(function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise}}}]),angular.module("ngCordova.plugins.push_v5",[]).factory("$cordovaPushV5",["$q","$rootScope","$timeout",function(e,n,t){var r;return{initialize:function(n){var t=e.defer();return r=PushNotification.init(n),t.resolve(r),t.promise},onNotification:function(){t(function(){r.on("notification",function(e){n.$emit("$cordovaPushV5:notificationReceived",e)})})},onError:function(){t(function(){r.on("error",function(e){n.$emit("$cordovaPushV5:errorOccurred",e)})})},register:function(){var n=e.defer();return void 0===r?n.reject(new Error("init must be called before any other operation")):r.on("registration",function(e){n.resolve(e.registrationId)}),n.promise},unregister:function(){var n=e.defer();return void 0===r?n.reject(new Error("init must be called before any other operation")):r.unregister(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},setBadgeNumber:function(n){var t=e.defer();return void 0===r?t.reject(new Error("init must be called before any other operation")):r.setApplicationIconBadgeNumber(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise}}}]),angular.module("ngCordova.plugins.sms",[]).factory("$cordovaSms",["$q",function(e){return{send:function(n,t,r){var o=e.defer();return sms.send(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.socialSharing",[]).factory("$cordovaSocialSharing",["$q","$window",function(e,n){return{share:function(t,r,o,i){var a=e.defer();return r=r||null,o=o||null,i=i||null,n.plugins.socialsharing.share(t,r,o,i,function(){a.resolve(!0)},function(){a.reject(!1)}),a.promise},shareViaTwitter:function(t,r,o){var i=e.defer();return r=r||null,o=o||null,n.plugins.socialsharing.shareViaTwitter(t,r,o,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaWhatsApp:function(t,r,o){var i=e.defer();return r=r||null,o=o||null,n.plugins.socialsharing.shareViaWhatsApp(t,r,o,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaFacebook:function(t,r,o){var i=e.defer();return t=t||null,r=r||null,o=o||null,n.plugins.socialsharing.shareViaFacebook(t,r,o,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaFacebookWithPasteMessageHint:function(t,r,o,i){var a=e.defer();return r=r||null,o=o||null,n.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(t,r,o,i,function(){a.resolve(!0)},function(){a.reject(!1)}),a.promise},shareViaSMS:function(t,r){var o=e.defer();return n.plugins.socialsharing.shareViaSMS(t,r,function(){o.resolve(!0)},function(){o.reject(!1)}),o.promise},shareViaEmail:function(t,r,o,i,a,c){var s=e.defer();return o=o||null,i=i||null,a=a||null,c=c||null,n.plugins.socialsharing.shareViaEmail(t,r,o,i,a,c,function(){s.resolve(!0)},function(){s.reject(!1)}),s.promise},shareVia:function(t,r,o,i,a){var c=e.defer();return r=r||null,o=o||null,i=i||null,a=a||null,n.plugins.socialsharing.shareVia(t,r,o,i,a,function(){c.resolve(!0)},function(){c.reject(!1)}),c.promise},canShareViaEmail:function(){var t=e.defer();return n.plugins.socialsharing.canShareViaEmail(function(){t.resolve(!0)},function(){t.reject(!1)}),t.promise},canShareVia:function(t,r,o,i,a){var c=e.defer();return n.plugins.socialsharing.canShareVia(t,r,o,i,a,function(e){c.resolve(e)},function(e){c.reject(e)}),c.promise},available:function(){var n=e.defer();window.plugins.socialsharing.available(function(e){e?n.resolve():n.reject()})}}}]),angular.module("ngCordova.plugins.spinnerDialog",[]).factory("$cordovaSpinnerDialog",["$window",function(e){return{show:function(n,t,r){return r=r||!1,e.plugins.spinnerDialog.show(n,t,r)},hide:function(){return e.plugins.spinnerDialog.hide()}}}]),angular.module("ngCordova.plugins.splashscreen",[]).factory("$cordovaSplashscreen",[function(){return{hide:function(){return navigator.splashscreen.hide()},show:function(){return navigator.splashscreen.show()}}}]),angular.module("ngCordova.plugins.sqlite",[]).factory("$cordovaSQLite",["$q","$window",function(e,n){return{openDB:function(e,t){return angular.isObject(e)&&!angular.isString(e)?("undefined"!=typeof t&&(e.bgType=t),n.sqlitePlugin.openDatabase(e)):n.sqlitePlugin.openDatabase({name:e,bgType:t})},execute:function(n,t,r){var o=e.defer();return n.transaction(function(e){e.executeSql(t,r,function(e,n){o.resolve(n)},function(e,n){o.reject(n)})}),o.promise},insertCollection:function(n,t,r){var o=e.defer(),i=r.slice(0);return n.transaction(function(e){!function n(){var r=i.splice(0,1)[0];try{e.executeSql(t,r,function(e,t){0===i.length?o.resolve(t):n()},function(e,n){o.reject(n)})}catch(a){o.reject(a)}}()}),o.promise},nestedExecute:function(n,t,r,o,i){var a=e.defer();return n.transaction(function(e){e.executeSql(t,o,function(e,n){a.resolve(n),e.executeSql(r,i,function(e,n){a.resolve(n)})})},function(e,n){a.reject(n)}),a.promise},deleteDB:function(t){var r=e.defer();return n.sqlitePlugin.deleteDatabase(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.statusbar",[]).factory("$cordovaStatusbar",[function(){return{overlaysWebView:function(e){return StatusBar.overlaysWebView(!!e)},STYLES:{DEFAULT:0,LIGHT_CONTENT:1,BLACK_TRANSLUCENT:2,BLACK_OPAQUE:3},style:function(e){switch(e){case 0:return StatusBar.styleDefault();case 1:return StatusBar.styleLightContent();case 2:return StatusBar.styleBlackTranslucent();case 3:return StatusBar.styleBlackOpaque();default:return StatusBar.styleDefault()}},styleColor:function(e){return StatusBar.backgroundColorByName(e)},styleHex:function(e){return StatusBar.backgroundColorByHexString(e)},hide:function(){return StatusBar.hide()},show:function(){return StatusBar.show()},isVisible:function(){return StatusBar.isVisible}}}]),angular.module("ngCordova.plugins.toast",[]).factory("$cordovaToast",["$q","$window",function(e,n){return{showShortTop:function(t){var r=e.defer();return n.plugins.toast.showShortTop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showShortCenter:function(t){var r=e.defer();return n.plugins.toast.showShortCenter(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showShortBottom:function(t){var r=e.defer();return n.plugins.toast.showShortBottom(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showLongTop:function(t){var r=e.defer();return n.plugins.toast.showLongTop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showLongCenter:function(t){var r=e.defer();return n.plugins.toast.showLongCenter(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showLongBottom:function(t){var r=e.defer();return n.plugins.toast.showLongBottom(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},show:function(t,r,o){var i=e.defer();return n.plugins.toast.show(t,r,o,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise}}}]),angular.module("ngCordova.plugins.touchid",[]).factory("$cordovaTouchID",["$q",function(e){return{checkSupport:function(){var n=e.defer();return window.cordova?touchid.checkSupport(function(e){n.resolve(e)},function(e){n.reject(e)}):n.reject("Not supported without cordova.js"),n.promise},authenticate:function(n){var t=e.defer();return window.cordova?touchid.authenticate(function(e){t.resolve(e)},function(e){t.reject(e)},n):t.reject("Not supported without cordova.js"),t.promise}}}]),angular.module("ngCordova.plugins.upsPush",[]).factory("$cordovaUpsPush",["$q","$window","$rootScope","$timeout",function(e,n,t,r){return{register:function(o){var i=e.defer();return n.push.register(function(e){r(function(){t.$broadcast("$cordovaUpsPush:notificationReceived",e)})},function(){i.resolve()},function(e){i.reject(e)},o),i.promise},unregister:function(t){var r=e.defer();return n.push.unregister(function(){r.resolve()},function(e){r.reject(e)},t),r.promise},setBadgeNumber:function(t){var r=e.defer();return n.push.setApplicationIconBadgeNumber(function(){r.resolve()},t),r.promise}}}]),angular.module("ngCordova.plugins.vibration",[]).factory("$cordovaVibration",[function(){return{vibrate:function(e){return navigator.notification.vibrate(e)},vibrateWithPattern:function(e,n){return navigator.notification.vibrateWithPattern(e,n)},cancelVibration:function(){return navigator.notification.cancelVibration()}}}]),angular.module("ngCordova.plugins.videoCapturePlus",[]).provider("$cordovaVideoCapturePlus",[function(){var e={};this.setLimit=function(n){e.limit=n},this.setMaxDuration=function(n){e.duration=n},this.setHighQuality=function(n){e.highquality=n},this.useFrontCamera=function(n){e.frontcamera=n},this.setPortraitOverlay=function(n){e.portraitOverlay=n},this.setLandscapeOverlay=function(n){e.landscapeOverlay=n},this.setOverlayText=function(n){e.overlayText=n},this.$get=["$q","$window",function(n,t){return{captureVideo:function(r){var o=n.defer();return t.plugins.videocaptureplus?(t.plugins.videocaptureplus.captureVideo(o.resolve,o.reject,angular.extend({},e,r)),o.promise):(o.resolve(null),o.promise)}}}]}]),angular.module("ngCordova.plugins.zip",[]).factory("$cordovaZip",["$q","$window",function(e,n){return{unzip:function(t,r){var o=e.defer();return n.zip.unzip(t,r,function(e){0===e?o.resolve():o.reject()},function(e){o.notify(e)}),o.promise}}}]),angular.module("oauth.providers",["oauth.utils"]).factory("$cordovaOauth",["$q","$http","$cordovaOauthUtility",function(e,n,t){return{azureAD:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s=window.open("https://login.microsoftonline.com/"+o+"/oauth2/authorize?response_type=code&client_id="+r+"&redirect_uri=http://localhost/callback","_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){var t=e.url.split("code=")[1];console.log(t),n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://login.microsoftonline.com/"+o+"/oauth2/token",data:"client_id="+r+"&code="+t+"&redirect_uri=http://localhost/callback&grant_type=authorization_code&resource="+i}).success(function(e){a.resolve(e)}).error(function(e,n){a.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){s.close()},10)})}}),s.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},adfs:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s=window.open(o+"/adfs/oauth2/authorize?response_type=code&client_id="+r+"&redirect_uri=http://localhost/callback&resource="+i,"_blank","location=no");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){var t=e.url.split("code=")[1];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:o+"/adfs/oauth2/token",data:"client_id="+r+"&code="+t+"&redirect_uri=http://localhost/callback&grant_type=authorization_code"}).success(function(e){a.resolve(e)}).error(function(e,n){a.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){s.close()},10)})}}),s.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},dropbox:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://www.dropbox.com/1/oauth2/authorize?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,token_type:r.token_type,uid:r.uid}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},digitalOcean:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s="http://localhost/callback";void 0!==i&&i.hasOwnProperty("redirect_uri")&&(s=i.redirect_uri);var u=window.open("https://cloud.digitalocean.com/v1/oauth/authorize?client_id="+r+"&redirect_uri="+s+"&response_type=code&scope=read%20write","_blank","location=no,clearsessioncache=yes,clearcache=yes");u.addEventListener("loadstart",function(e){if(0===e.url.indexOf(s)){var t=e.url.split("code=")[1];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://cloud.digitalocean.com/v1/oauth/token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+s+"&grant_type=authorization_code&code="+t}).success(function(e){a.resolve(e)}).error(function(e,n){a.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){u.close()},10)})}}),u.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},google:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://accounts.google.com/o/oauth2/auth?client_id="+n+"&redirect_uri="+c+"&scope="+r.join(" ")+"&approval_prompt=force&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,token_type:r.token_type,expires_in:r.expires_in}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},github:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://github.com/login/oauth/authorize?client_id="+r+"&redirect_uri="+u+"&scope="+i.join(","),"_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n.defaults.headers.post.accept="application/json",n({method:"post",url:"https://github.com/login/oauth/access_token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},facebook:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s="https://www.facebook.com/v2.0/dialog/oauth?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(",");void 0!==o&&o.hasOwnProperty("auth_type")&&(s+="&auth_type="+o.auth_type);var u=window.open(s,"_blank","location=no,clearsessioncache=yes,clearcache=yes");u.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){u.removeEventListener("exit",function(e){}),u.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in}):0!==e.url.indexOf("error_code=100")?i.reject("Facebook returned error_code=100: Invalid permissions"):i.reject("Problem authenticating")}}),u.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},linkedin:function(r,o,i,a,c){var s=e.defer();if(window.cordova){var u=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(u)===!0){var l="http://localhost/callback";void 0!==c&&c.hasOwnProperty("redirect_uri")&&(l=c.redirect_uri);var d=window.open("https://www.linkedin.com/uas/oauth2/authorization?client_id="+r+"&redirect_uri="+l+"&scope="+i.join(" ")+"&response_type=code&state="+a,"_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){0===e.url.indexOf(l)&&(requestToken=e.url.split("code=")[1].split("&")[0],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://www.linkedin.com/uas/oauth2/accessToken",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+l+"&grant_type=authorization_code&code="+requestToken}).success(function(e){s.resolve(e)}).error(function(e,n){s.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){d.close()},10)}))}),d.addEventListener("exit",function(e){s.reject("The sign in flow was canceled")})}else s.reject("Could not find InAppBrowser plugin");
}else s.reject("Cannot authenticate via a web browser");return s.promise},instagram:function(n,r,o){var i=e.defer(),a={code:"?",token:"#"};if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s="http://localhost/callback",u="token";void 0!==o&&(o.hasOwnProperty("redirect_uri")&&(s=o.redirect_uri),o.hasOwnProperty("response_type")&&(u=o.response_type));var l="";r&&r.length>0&&(l="&scope"+r.join("+"));var d=window.open("https://api.instagram.com/oauth/authorize/?client_id="+n+"&redirect_uri="+s+l+"&response_type="+u,"_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){if(0===e.url.indexOf(s)){d.removeEventListener("exit",function(e){}),d.close();var n=e.url.split(a[u])[1],r=t.parseResponseParameters(n);void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token}):void 0!==r.code&&null!==r.code?i.resolve({code:r.code}):i.reject("Problem authenticating")}}),d.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},box:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://app.box.com/api/oauth2/authorize/?client_id="+r+"&redirect_uri="+u+"&state="+i+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://app.box.com/api/oauth2/token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&grant_type=authorization_code&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},reddit:function(r,o,i,a,c){var s=e.defer();if(window.cordova){var u=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(u)===!0){var l="http://localhost/callback";void 0!==c&&c.hasOwnProperty("redirect_uri")&&(l=c.redirect_uri);var d=window.open("https://ssl.reddit.com/api/v1/authorize"+(a?".compact":"")+"?client_id="+r+"&redirect_uri="+l+"&duration=permanent&state=ngcordovaoauth&scope="+i.join(",")+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){0===e.url.indexOf(l)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n.defaults.headers.post.Authorization="Basic "+btoa(r+":"+o),n({method:"post",url:"https://ssl.reddit.com/api/v1/access_token",data:"redirect_uri="+l+"&grant_type=authorization_code&code="+requestToken}).success(function(e){s.resolve(e)}).error(function(e,n){s.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){d.close()},10)}))}),d.addEventListener("exit",function(e){s.reject("The sign in flow was canceled")})}else s.reject("Could not find InAppBrowser plugin")}else s.reject("Cannot authenticate via a web browser");return s.promise},slack:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://slack.com/oauth/authorize?client_id="+r+"&redirect_uri="+u+"&state=ngcordovaoauth&scope="+i.join(","),"_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],console.log("Request token is "+requestToken),n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://slack.com/api/oauth.access",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&grant_type=authorization_code&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},twitter:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s="http://localhost/callback";if(void 0!==i&&i.hasOwnProperty("redirect_uri")&&(s=i.redirect_uri),"undefined"!=typeof jsSHA){var u={oauth_consumer_key:r,oauth_nonce:t.createNonce(10),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.round((new Date).getTime()/1e3),oauth_version:"1.0"},l=t.createSignature("POST","https://api.twitter.com/oauth/request_token",u,{oauth_callback:s},o);n({method:"post",url:"https://api.twitter.com/oauth/request_token",headers:{Authorization:l.authorization_header,"Content-Type":"application/x-www-form-urlencoded"},data:"oauth_callback="+encodeURIComponent(s)}).success(function(e){for(var r=e.split("&"),i={},c=0;c<r.length;c++)i[r[c].split("=")[0]]=r[c].split("=")[1];i.hasOwnProperty("oauth_token")===!1&&a.reject("Oauth request token was not received");var l=window.open("https://api.twitter.com/oauth/authenticate?oauth_token="+i.oauth_token,"_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){if(0===e.url.indexOf(s)){for(var r=e.url.split("?")[1],i=r.split("&"),c={},d=0;d<i.length;d++)c[i[d].split("=")[0]]=i[d].split("=")[1];c.hasOwnProperty("oauth_verifier")===!1&&a.reject("Browser authentication failed to complete.  No oauth_verifier was returned"),delete u.oauth_signature,u.oauth_token=c.oauth_token;var f=t.createSignature("POST","https://api.twitter.com/oauth/access_token",u,{oauth_verifier:c.oauth_verifier},o);n({method:"post",url:"https://api.twitter.com/oauth/access_token",headers:{Authorization:f.authorization_header},params:{oauth_verifier:c.oauth_verifier}}).success(function(e){for(var n=e.split("&"),t={},r=0;r<n.length;r++)t[n[r].split("=")[0]]=n[r].split("=")[1];t.hasOwnProperty("oauth_token_secret")===!1&&a.reject("Oauth access token was not received"),a.resolve(t)}).error(function(e){a.reject(e)})["finally"](function(){setTimeout(function(){l.close()},10)})}}),l.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}).error(function(e){a.reject(e)})}else a.reject("Missing jsSHA JavaScript library")}else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},meetup:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://secure.meetup.com/oauth2/authorize/?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r={},i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve(r):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},salesforce:function(n,r){var o="http://localhost/callback",i=function(e,n,t){return e+"services/oauth2/authorize?display=touch&response_type=token&client_id="+escape(n)+"&redirect_uri="+escape(t)},a=function(e,n){return e.substr(0,n.length)===n},c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u=window.open(i(n,r,o),"_blank","location=no,clearsessioncache=yes,clearcache=yes");u.addEventListener("loadstart",function(e){if(a(e.url,o)){var n={},t=e.url.split("#")[1];if(t){var r=t.split("&");for(var i in r){var s=r[i].split("=");n[s[0]]=unescape(s[1])}}"undefined"==typeof n||"undefined"==typeof n.access_token?c.reject("Problem authenticating"):c.resolve(n),setTimeout(function(){u.close()},10)}}),u.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},strava:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://www.strava.com/oauth/authorize?client_id="+r+"&redirect_uri="+u+"&scope="+i.join(",")+"&response_type=code&approval_prompt=force","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://www.strava.com/oauth/token",data:"client_id="+r+"&client_secret="+o+"&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},withings:function(r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0)if("undefined"!=typeof jsSHA){var c=t.generateOauthParametersInstance(r);c.oauth_callback="http://localhost/callback";var s="https://oauth.withings.com/account/request_token",u=t.createSignature("GET",s,{},c,o);c.oauth_signature=u.signature;var l=t.generateUrlParameters(c);n({method:"get",url:s+"?"+l}).success(function(e){var a=t.parseResponseParameters(e);a.hasOwnProperty("oauth_token")===!1&&i.reject("Oauth request token was not received");var c=t.generateOauthParametersInstance(r);c.oauth_token=a.oauth_token;var s=a.oauth_token_secret,u="https://oauth.withings.com/account/authorize",l=t.createSignature("GET",u,{},c,o);c.oauth_signature=l.signature;var d=t.generateUrlParameters(c),f=window.open(u+"?"+d,"_blank","location=no,clearsessioncache=yes,clearcache=yes");f.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){var c=e.url.split("?")[1];a=t.parseResponseParameters(c),a.hasOwnProperty("oauth_verifier")===!1&&i.reject("Browser authentication failed to complete.  No oauth_verifier was returned");var u=t.generateOauthParametersInstance(r);u.oauth_token=a.oauth_token;var l="https://oauth.withings.com/account/access_token",d=t.createSignature("GET",l,{},u,o,s);u.oauth_signature=d.signature;var p=t.generateUrlParameters(u);n({method:"get",url:l+"?"+p}).success(function(e){var n=t.parseResponseParameters(e);n.hasOwnProperty("oauth_token_secret")===!1&&i.reject("Oauth access token was not received"),i.resolve(n)}).error(function(e){i.reject(e)})["finally"](function(){setTimeout(function(){f.close()},10)})}}),f.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}).error(function(e){i.reject(e)})}else i.reject("Missing jsSHA JavaScript library");else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},foursquare:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://foursquare.com/oauth2/authenticate?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];if(void 0!==r.access_token&&null!==r.access_token){var s={access_token:r.access_token,expires_in:r.expires_in};o.resolve(s)}else o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},magento:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0)if("undefined"!=typeof jsSHA){var s={oauth_callback:"http://localhost/callback",oauth_consumer_key:o,oauth_nonce:t.createNonce(5),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.round((new Date).getTime()/1e3),oauth_version:"1.0"},u=t.createSignature("POST",r+"/oauth/initiate",s,{oauth_callback:"http://localhost/callback"},i);n.defaults.headers.post.Authorization=u.authorization_header,n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:r+"/oauth/initiate",data:"oauth_callback=http://localhost/callback"}).success(function(e){for(var o=e.split("&"),c={},u=0;u<o.length;u++)c[o[u].split("=")[0]]=o[u].split("=")[1];c.hasOwnProperty("oauth_token")===!1&&a.reject("Oauth request token was not received");var l=c.oauth_token_secret,d=window.open(r+"/oauth/authorize?oauth_token="+c.oauth_token,"_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){for(var o=e.url.split("?")[1],c=o.split("&"),u={},f=0;f<c.length;f++)u[c[f].split("=")[0]]=c[f].split("=")[1];u.hasOwnProperty("oauth_verifier")===!1&&a.reject("Browser authentication failed to complete.  No oauth_verifier was returned"),delete s.oauth_signature,delete s.oauth_callback,s.oauth_token=u.oauth_token,s.oauth_nonce=t.createNonce(5),s.oauth_verifier=u.oauth_verifier;var p=t.createSignature("POST",r+"/oauth/token",s,{},i,l);n.defaults.headers.post.Authorization=p.authorization_header,n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:r+"/oauth/token"}).success(function(e){for(var n=e.split("&"),t={},r=0;r<n.length;r++)t[n[r].split("=")[0]]=n[r].split("=")[1];t.hasOwnProperty("oauth_token_secret")===!1&&a.reject("Oauth access token was not received"),a.resolve(t)}).error(function(e){a.reject(e)})["finally"](function(){setTimeout(function(){d.close()},10)})}}),d.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}).error(function(e){a.reject(e)})}else a.reject("Missing jsSHA JavaScript library");else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},vkontakte:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a=window.open("https://oauth.vk.com/authorize?client_id="+n+"&redirect_uri=http://oauth.vk.com/blank.html&response_type=token&scope="+r.join(",")+"&display=touch&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");a.addEventListener("loadstart",function(e){var n=e.url.split("#");if("https://oauth.vk.com/blank.html"==n[0]||"http://oauth.vk.com/blank.html"==n[0]){a.removeEventListener("exit",function(e){}),a.close();for(var t=e.url.split("#")[1],r=t.split("&"),i=[],c=0;c<r.length;c++)i[r[c].split("=")[0]]=r[c].split("=")[1];if(void 0!==i.access_token&&null!==i.access_token){var s={access_token:i.access_token,expires_in:i.expires_in};void 0!==i.email&&null!==i.email&&(s.email=i.email),o.resolve(s)}else o.reject("Problem authenticating")}}),a.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},odnoklassniki:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a=window.open("http://www.odnoklassniki.ru/oauth/authorize?client_id="+n+"&scope="+r.join(",")+"&response_type=token&redirect_uri=http://localhost/callback&layout=m","_blank","location=no,clearsessioncache=yes,clearcache=yes");a.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,session_secret_key:r.session_secret_key}):o.reject("Problem authenticating"),setTimeout(function(){a.close()},10)}}),a.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},imgur:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://api.imgur.com/oauth2/authorize?client_id="+n+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,expires_in:r.expires_in,account_username:r.account_username}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},spotify:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://accounts.spotify.com/authorize?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(" "),"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in,account_username:r.account_username}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},uber:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://login.uber.com/oauth/authorize?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(" "),"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,token_type:r.token_type,expires_in:r.expires_in,scope:r.scope}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},windowsLive:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="https://login.live.com/oauth20_desktop.srf";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://login.live.com/oauth20_authorize.srf?client_id="+n+"&scope="+r.join(",")+"&response_type=token&display=touch&redirect_uri="+c,"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},yammer:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://www.yammer.com/dialog/oauth?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},venmo:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://api.venmo.com/v1/oauth/authorize?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(" "),"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},stripe:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://connect.stripe.com/oauth/authorize?client_id="+r+"&redirect_uri="+u+"&scope="+i+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf("http://localhost/callback")&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://connect.stripe.com/oauth/token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&grant_type=authorization_code&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},rally:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://rally1.rallydev.com/login/oauth2/auth?client_id="+r+"&redirect_uri="+u+"&scope="+i+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf("http://localhost/callback")&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://rally1.rallydev.com/login/oauth2/auth",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&grant_type=authorization_code&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},familySearch:function(t,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(a.hasOwnProperty("cordova-plugin-inappbrowser")===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://ident.familysearch.org/cis-web/oauth2/v3/authorization?client_id="+t+"&redirect_uri="+c+"&response_type=code&state="+r,"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){var r=e.url.split("code=")[1];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://ident.familysearch.org/cis-web/oauth2/v3/token",data:"client_id="+t+"&redirect_uri="+c+"&grant_type=authorization_code&code="+r}).success(function(e){i.resolve(e)}).error(function(e,n){i.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){s.close()},10)})}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},envato:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://api.envato.com/authorization?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,expires_in:r.expires_in}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},weibo:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l="https://open.weibo.cn/oauth2/authorize?display=mobile&client_id="+r+"&redirect_uri="+u+"&scope="+i.join(",");void 0!==a&&(a.hasOwnProperty("language")&&(l+="&language="+a.language),a.hasOwnProperty("forcelogin")&&(l+="&forcelogin="+a.forcelogin));var d=window.open(l,"_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://api.weibo.com/oauth2/access_token",data:"client_id="+r+"&client_secret="+o+"&grant_type=authorization_code&code="+requestToken+"&redirect_uri="+u}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){d.close()},10)}))}),d.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},jawbone:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://jawbone.com/auth/oauth2/auth?client_id="+r+"&redirect_uri="+u+"&response_type=code&scope="+i.join(" "),"_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){if(0===e.url.indexOf(u)){var t=e.url.split("code=")[1];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://jawbone.com/auth/oauth2/token",data:"client_id="+r+"&client_secret="+o+"&grant_type=authorization_code&code="+t}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)})}}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},untappd:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_url")&&(a=r.redirect_url);var c=window.open("https://untappd.com/oauth/authenticate/?client_id="+n+"&redirect_url="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];if(void 0!==r.access_token&&null!==r.access_token){var s={access_token:r.access_token};o.resolve(s)}else o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");
return o.promise},dribble:function(r,o,i,a,c){var s=e.defer();if(window.cordova){var u=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(u)===!0){var l="http://localhost/callback",d="https://dribbble.com/oauth/authorize",f="https://dribbble.com/oauth/token";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(l=a.redirect_uri),void 0===c&&(c=t.createNonce(5));var p=i.join(",").replace(/,/g,"+"),v=window.open(d+"?client_id="+r+"&redirect_uri="+l+"&scope="+p+"&state="+c,"_blank","location=no,clearsessioncache=yes,clearcache=yes");v.addEventListener("loadstart",function(e){if(0===e.url.indexOf(l)){var t=e.url.split("code=")[1],i=t.split("&")[0];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:f,data:"client_id="+r+"&redirect_uri="+l+"&client_secret="+o+"&code="+i}).success(function(e){s.resolve(e)}).error(function(e,n){s.reject("Problem authenticating ")})["finally"](function(){setTimeout(function(){v.close()},10)})}}),v.addEventListener("exit",function(e){s.reject("The sign in flow was canceled")})}else s.reject("Could not find InAppBrowser plugin")}else s.reject("Cannot authenticate via a web browser");return s.promise}}}]),angular.module("ngCordovaOauth",["oauth.providers","oauth.utils"]),angular.module("oauth.utils",[]).factory("$cordovaOauthUtility",["$q",function(e){return{isInAppBrowserInstalled:function(e){var n=["cordova-plugin-inappbrowser","org.apache.cordova.inappbrowser"];return n.some(function(n){return e.hasOwnProperty(n)})},createSignature:function(e,n,t,r,o,i){if("undefined"!=typeof jsSHA){for(var a=angular.copy(t),c=Object.keys(r),s=0;s<c.length;s++)a[c[s]]=encodeURIComponent(r[c[s]]);var u=e+"&"+encodeURIComponent(n)+"&",l=Object.keys(a).sort();for(s=0;s<l.length;s++)u+=s==l.length-1?encodeURIComponent(l[s]+"="+a[l[s]]):encodeURIComponent(l[s]+"="+a[l[s]]+"&");var d=new jsSHA(u,"TEXT"),f="";i&&(f=encodeURIComponent(i)),t.oauth_signature=encodeURIComponent(d.getHMAC(encodeURIComponent(o)+"&"+f,"TEXT","SHA-1","B64"));var p=Object.keys(t),v="OAuth ";for(s=0;s<p.length;s++)v+=s==p.length-1?p[s]+'="'+t[p[s]]+'"':p[s]+'="'+t[p[s]]+'",';return{signature_base_string:u,authorization_header:v,signature:t.oauth_signature}}return"Missing jsSHA JavaScript library"},createNonce:function(e){for(var n="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=0;e>r;r++)n+=t.charAt(Math.floor(Math.random()*t.length));return n},generateUrlParameters:function(e){var n=Object.keys(e);n.sort();for(var t="",r="",o=0;o<n.length;o++)t+=r+n[o]+"="+e[n[o]],r="&";return t},parseResponseParameters:function(e){if(e.split){for(var n=e.split("&"),t={},r=0;r<n.length;r++)t[n[r].split("=")[0]]=n[r].split("=")[1];return t}return{}},generateOauthParametersInstance:function(e){var n=new jsSHA(Math.round((new Date).getTime()/1e3),"TEXT"),t={oauth_consumer_key:e,oauth_nonce:n.getHash("SHA-1","HEX"),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.round((new Date).getTime()/1e3),oauth_version:"1.0"};return t}}}])}();
/*! ngstorage 0.3.10 | Copyright (c) 2015 Gias Kay Lee | MIT License */!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["angular"],b):a.hasOwnProperty("angular")?b(a.angular):"object"==typeof exports&&(module.exports=b(require("angular")))}(this,function(a){"use strict";function b(b){return function(){var c="ngStorage-";this.setKeyPrefix=function(a){if("string"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setKeyPrefix() expects a String.");c=a};var d=a.toJson,e=a.fromJson;this.setSerializer=function(a){if("function"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setSerializer expects a function.");d=a},this.setDeserializer=function(a){if("function"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setDeserializer expects a function.");e=a},this.get=function(a){return e(window[b].getItem(c+a))},this.set=function(a,e){return window[b].setItem(c+a,d(e))},this.$get=["$rootScope","$window","$log","$timeout","$document",function(f,g,h,i,j){function k(a){var b;try{b=g[a]}catch(c){b=!1}if(b&&"localStorage"===a){var d="__"+Math.round(1e7*Math.random());try{localStorage.setItem(d,d),localStorage.removeItem(d)}catch(c){b=!1}}return b}var l,m,n=c.length,o=k(b)||(h.warn("This browser does not support Web Storage!"),{setItem:a.noop,getItem:a.noop,removeItem:a.noop}),p={$default:function(b){for(var c in b)a.isDefined(p[c])||(p[c]=a.copy(b[c]));return p.$sync(),p},$reset:function(a){for(var b in p)"$"===b[0]||delete p[b]&&o.removeItem(c+b);return p.$default(a)},$sync:function(){for(var a,b=0,d=o.length;d>b;b++)(a=o.key(b))&&c===a.slice(0,n)&&(p[a.slice(n)]=e(o.getItem(a)))},$apply:function(){var b;if(m=null,!a.equals(p,l)){b=a.copy(l),a.forEach(p,function(e,f){a.isDefined(e)&&"$"!==f[0]&&(o.setItem(c+f,d(e)),delete b[f])});for(var e in b)o.removeItem(c+e);l=a.copy(p)}}};return p.$sync(),l=a.copy(p),f.$watch(function(){m||(m=i(p.$apply,100,!1))}),g.addEventListener&&g.addEventListener("storage",function(b){if(b.key){var d=j[0];d.hasFocus&&d.hasFocus()||c!==b.key.slice(0,n)||(b.newValue?p[b.key.slice(n)]=e(b.newValue):delete p[b.key.slice(n)],l=a.copy(p),f.$apply())}}),g.addEventListener&&g.addEventListener("beforeunload",function(){p.$apply()}),p}]}}return a=a&&a.module?a:window.angular,a.module("ngStorage",[]).provider("$localStorage",b("localStorage")).provider("$sessionStorage",b("sessionStorage"))});
/*! @license Firebase v2.3.2
    License: https://www.firebase.com/terms/terms-of-service.html */
(function() {var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.ub=function(){return a.uf?a.uf:a.uf=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}var la=Date.now||function(){return+new Date};
function ma(a,b){function c(){}c.prototype=b.prototype;a.bh=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Yg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function na(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function oa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function pa(a){var b=0,c;for(c in a)b++;return b}function qa(a){for(var b in a)return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ta(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function ua(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function va(a,b){var c=ua(a,b,void 0);return c&&a[c]}function wa(a){for(var b in a)return!1;return!0}function xa(a){var b={},c;for(c in a)b[c]=a[c];return b}var ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function za(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ya.length;f++)c=ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Aa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ba(){this.Sd=void 0}
function Ca(a,b,c){switch(typeof b){case "string":Da(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ca(a,a.Sd?a.Sd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Da(f,c),
c.push(":"),Ca(a,a.Sd?a.Sd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ea={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function Da(a,b){b.push('"',a.replace(Fa,function(a){if(a in Ea)return Ea[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Ea[a]=e+b.toString(16)}),'"')};function Ga(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^la()).toString(36)};var Ha;a:{var Ia=aa.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){Ha=Ja;break a}}Ha=""};function Ka(){this.Va=-1};function La(){this.Va=-1;this.Va=64;this.N=[];this.me=[];this.Wf=[];this.Ld=[];this.Ld[0]=128;for(var a=1;a<this.Va;++a)this.Ld[a]=0;this.de=this.ac=0;this.reset()}ma(La,Ka);La.prototype.reset=function(){this.N[0]=1732584193;this.N[1]=4023233417;this.N[2]=2562383102;this.N[3]=271733878;this.N[4]=3285377520;this.de=this.ac=0};
function Ma(a,b,c){c||(c=0);var d=a.Wf;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.N[0];c=a.N[1];for(var h=a.N[2],k=a.N[3],l=a.N[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),m=1518500249):(f=c^h^k,m=1859775393):60>e?(f=c&h|k&(c|h),m=2400959708):(f=c^h^k,m=3395469782),f=(b<<
5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.N[0]=a.N[0]+b&4294967295;a.N[1]=a.N[1]+c&4294967295;a.N[2]=a.N[2]+h&4294967295;a.N[3]=a.N[3]+k&4294967295;a.N[4]=a.N[4]+l&4294967295}
La.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Va,d=0,e=this.me,f=this.ac;d<b;){if(0==f)for(;d<=c;)Ma(this,a,d),d+=this.Va;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Va){Ma(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Va){Ma(this,e);f=0;break}}this.ac=f;this.de+=b}};var u=Array.prototype,Na=u.indexOf?function(a,b,c){return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=u.forEach?function(a,b,c){u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=u.filter?function(a,b,c){return u.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
a.split(""):a,k=0;k<d;k++)if(k in h){var l=h[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Qa=u.map?function(a,b,c){return u.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ra=u.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return u.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Oa(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Sa=u.every?function(a,b,
c){return u.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ta(a,b){var c=Ua(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ua(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Va(a,b){var c=Na(a,b);0<=c&&u.splice.call(a,c,1)}function Wa(a,b,c){return 2>=arguments.length?u.slice.call(a,b):u.slice.call(a,b,c)}
function Xa(a,b){a.sort(b||Ya)}function Ya(a,b){return a>b?1:a<b?-1:0};var Za=-1!=Ha.indexOf("Opera")||-1!=Ha.indexOf("OPR"),$a=-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE"),ab=-1!=Ha.indexOf("Gecko")&&-1==Ha.toLowerCase().indexOf("webkit")&&!(-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE")),bb=-1!=Ha.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Za&&aa.opera)return a=aa.opera.version,ha(a)?a():a;ab?b=/rv\:([^\);]+)(\)|;)/:$a?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:bb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Ha))?a[1]:"");return $a&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var cb=null,db=null,eb=null;function fb(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");gb();for(var c=b?db:cb,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,t=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,h||(k=64));d.push(c[t],c[f],c[k],c[m])}return d.join("")}
function gb(){if(!cb){cb={};db={};eb={};for(var a=0;65>a;a++)cb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),eb[db[a]]=a,62<=a&&(eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};var hb=hb||"2.3.2";function v(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function ib(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function jb(a){var b={};ib(a,function(a,d){b[a]=d});return b};function kb(a){var b=[];ib(a,function(a,d){ea(d)?Oa(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function lb(a){var b={};a=a.replace(/^\?/,"").split("&");Oa(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function y(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(y(a,b,d)+"must be a valid function.");}function mb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(y(a,b,!0)+"must be a valid context object.");};function nb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Aa(a)}function B(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ca(new Ba,a,b);a=b.join("")}return a};function ob(){this.Wd=C}ob.prototype.j=function(a){return this.Wd.Q(a)};ob.prototype.toString=function(){return this.Wd.toString()};function pb(){}pb.prototype.qf=function(){return null};pb.prototype.ye=function(){return null};var qb=new pb;function rb(a,b,c){this.Tf=a;this.Ka=b;this.Kd=c}rb.prototype.qf=function(a){var b=this.Ka.O;if(sb(b,a))return b.j().R(a);b=null!=this.Kd?new tb(this.Kd,!0,!1):this.Ka.w();return this.Tf.xc(a,b)};rb.prototype.ye=function(a,b,c){var d=null!=this.Kd?this.Kd:ub(this.Ka);a=this.Tf.ne(d,b,1,c,a);return 0===a.length?null:a[0]};function vb(){this.tb=[]}function wb(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.ca(c.Zb())||(a.tb.push(c),c=null);null===c&&(c=new xb(f));c.add(e)}c&&a.tb.push(c)}function yb(a,b,c){wb(a,c);zb(a,function(a){return a.ca(b)})}function Ab(a,b,c){wb(a,c);zb(a,function(a){return a.contains(b)||b.contains(a)})}
function zb(a,b){for(var c=!0,d=0;d<a.tb.length;d++){var e=a.tb[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.tb[d],f=0;f<e.vd.length;f++){var h=e.vd[f];if(null!==h){e.vd[f]=null;var k=h.Vb();Bb&&Cb("event: "+h.toString());Db(k)}}a.tb[d]=null}else c=!1}c&&(a.tb=[])}function xb(a){this.ra=a;this.vd=[]}xb.prototype.add=function(a){this.vd.push(a)};xb.prototype.Zb=function(){return this.ra};function D(a,b,c,d){this.type=a;this.Ja=b;this.Wa=c;this.Ke=d;this.Qd=void 0}function Eb(a){return new D(Fb,a)}var Fb="value";function Gb(a,b,c,d){this.ue=b;this.Zd=c;this.Qd=d;this.ud=a}Gb.prototype.Zb=function(){var a=this.Zd.Ib();return"value"===this.ud?a.path:a.parent().path};Gb.prototype.ze=function(){return this.ud};Gb.prototype.Vb=function(){return this.ue.Vb(this)};Gb.prototype.toString=function(){return this.Zb().toString()+":"+this.ud+":"+B(this.Zd.mf())};function Hb(a,b,c){this.ue=a;this.error=b;this.path=c}Hb.prototype.Zb=function(){return this.path};Hb.prototype.ze=function(){return"cancel"};
Hb.prototype.Vb=function(){return this.ue.Vb(this)};Hb.prototype.toString=function(){return this.path.toString()+":cancel"};function tb(a,b,c){this.A=a;this.ea=b;this.Ub=c}function Ib(a){return a.ea}function Jb(a){return a.Ub}function Kb(a,b){return b.e()?a.ea&&!a.Ub:sb(a,E(b))}function sb(a,b){return a.ea&&!a.Ub||a.A.Da(b)}tb.prototype.j=function(){return this.A};function Lb(a){this.gg=a;this.Dd=null}Lb.prototype.get=function(){var a=this.gg.get(),b=xa(a);if(this.Dd)for(var c in this.Dd)b[c]-=this.Dd[c];this.Dd=a;return b};function Mb(a,b){this.Of={};this.fd=new Lb(a);this.ba=b;var c=1E4+2E4*Math.random();setTimeout(q(this.If,this),Math.floor(c))}Mb.prototype.If=function(){var a=this.fd.get(),b={},c=!1,d;for(d in a)0<a[d]&&v(this.Of,d)&&(b[d]=a[d],c=!0);c&&this.ba.Ue(b);setTimeout(q(this.If,this),Math.floor(6E5*Math.random()))};function Nb(){this.Ec={}}function Ob(a,b,c){n(c)||(c=1);v(a.Ec,b)||(a.Ec[b]=0);a.Ec[b]+=c}Nb.prototype.get=function(){return xa(this.Ec)};var Pb={},Qb={};function Rb(a){a=a.toString();Pb[a]||(Pb[a]=new Nb);return Pb[a]}function Sb(a,b){var c=a.toString();Qb[c]||(Qb[c]=b());return Qb[c]};function F(a,b){this.name=a;this.S=b}function Tb(a,b){return new F(a,b)};function Ub(a,b){return Vb(a.name,b.name)}function Wb(a,b){return Vb(a,b)};function Xb(a,b,c){this.type=Yb;this.source=a;this.path=b;this.Ga=c}Xb.prototype.Xc=function(a){return this.path.e()?new Xb(this.source,G,this.Ga.R(a)):new Xb(this.source,H(this.path),this.Ga)};Xb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};function Zb(a,b){this.type=$b;this.source=a;this.path=b}Zb.prototype.Xc=function(){return this.path.e()?new Zb(this.source,G):new Zb(this.source,H(this.path))};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ac(a,b){this.La=a;this.wa=b?b:bc}g=ac.prototype;g.Oa=function(a,b){return new ac(this.La,this.wa.Oa(a,b,this.La).Y(null,null,!1,null,null))};g.remove=function(a){return new ac(this.La,this.wa.remove(a,this.La).Y(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.wa;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function cc(a,b){for(var c,d=a.wa,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.wa.e()};g.count=function(){return this.wa.count()};g.Sc=function(){return this.wa.Sc()};g.fc=function(){return this.wa.fc()};g.ia=function(a){return this.wa.ia(a)};
g.Xb=function(a){return new dc(this.wa,null,this.La,!1,a)};g.Yb=function(a,b){return new dc(this.wa,a,this.La,!1,b)};g.$b=function(a,b){return new dc(this.wa,a,this.La,!0,b)};g.sf=function(a){return new dc(this.wa,null,this.La,!0,a)};function dc(a,b,c,d,e){this.Ud=e||null;this.Fe=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Fe?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.Fe?a.right:a.left}
function J(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value};if(a.Fe)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function ec(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value}}function fc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:bc;this.right=null!=e?e:bc}g=fc.prototype;
g.Y=function(a,b,c,d,e){return new fc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function gc(a){return a.left.e()?a:gc(a.left)}g.Sc=function(){return gc(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Oa(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Oa(a,b,c));return hc(e)};function ic(a){if(a.left.e())return bc;a.left.fa()||a.left.left.fa()||(a=jc(a));a=a.Y(null,null,null,ic(a.left),null);return hc(a)}
g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=jc(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=kc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=lc(c),c.left.left.fa()&&(c=kc(c),c=lc(c)));if(0===b(a,c.key)){if(c.right.e())return bc;d=gc(c.right);c=c.Y(d.key,d.value,null,null,ic(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return hc(c)};g.fa=function(){return this.color};
function hc(a){a.right.fa()&&!a.left.fa()&&(a=mc(a));a.left.fa()&&a.left.left.fa()&&(a=kc(a));a.left.fa()&&a.right.fa()&&(a=lc(a));return a}function jc(a){a=lc(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,kc(a.right)),a=mc(a),a=lc(a));return a}function mc(a){return a.right.Y(null,null,a.color,a.Y(null,null,!0,null,a.right.left),null)}function kc(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,!0,a.left.right,null))}
function lc(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function nc(){}g=nc.prototype;g.Y=function(){return this};g.Oa=function(a,b){return new fc(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Sc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var bc=new nc;function oc(a,b){return a&&"object"===typeof a?(K(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function pc(a,b){var c=new qc;rc(a,new L(""),function(a,e){c.nc(a,sc(e,b))});return c}function sc(a,b){var c=a.C().I(),c=oc(c,b),d;if(a.K()){var e=oc(a.Ca(),b);return e!==a.Ca()||c!==a.C().I()?new tc(e,M(c)):a}d=a;c!==a.C().I()&&(d=d.ga(new tc(c)));a.P(N,function(a,c){var e=sc(c,b);e!==c&&(d=d.U(a,e))});return d};function uc(){this.wc={}}uc.prototype.set=function(a,b){null==b?delete this.wc[a]:this.wc[a]=b};uc.prototype.get=function(a){return v(this.wc,a)?this.wc[a]:null};uc.prototype.remove=function(a){delete this.wc[a]};uc.prototype.wf=!0;function vc(a){this.Fc=a;this.Pd="firebase:"}g=vc.prototype;g.set=function(a,b){null==b?this.Fc.removeItem(this.Pd+a):this.Fc.setItem(this.Pd+a,B(b))};g.get=function(a){a=this.Fc.getItem(this.Pd+a);return null==a?null:nb(a)};g.remove=function(a){this.Fc.removeItem(this.Pd+a)};g.wf=!1;g.toString=function(){return this.Fc.toString()};function wc(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new vc(b)}}catch(c){}return new uc}var xc=wc("localStorage"),yc=wc("sessionStorage");function zc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.kb=b;this.hc=c;this.Wg=d;this.Od=e||"";this.Ya=xc.get("host:"+a)||this.host}function Ac(a,b){b!==a.Ya&&(a.Ya=b,"s-"===a.Ya.substr(0,2)&&xc.set("host:"+a.host,a.Ya))}
function Bc(a,b,c){K("string"===typeof b,"typeof type must == string");K("object"===typeof c,"typeof params must == object");if(b===Cc)b=(a.kb?"wss://":"ws://")+a.Ya+"/.ws?";else if(b===Dc)b=(a.kb?"https://":"http://")+a.Ya+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.Ya&&(c.ns=a.hc);var d=[];r(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}zc.prototype.toString=function(){var a=(this.kb?"https://":"http://")+this.host;this.Od&&(a+="<"+this.Od+">");return a};var Ec=function(){var a=1;return function(){return a++}}();function K(a,b){if(!a)throw Fc(b);}function Fc(a){return Error("Firebase ("+hb+") INTERNAL ASSERT FAILED: "+a)}
function Gc(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{gb();for(var c=eb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==l)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Wa(d,c,
c+8192));b=a}}return b}catch(m){Cb("base64Decode failed: ",m)}return null}function Hc(a){var b=Ic(a);a=new La;a.update(b);var b=[],c=8*a.de;56>a.ac?a.update(a.Ld,56-a.ac):a.update(a.Ld,a.Va-(a.ac-56));for(var d=a.Va-1;56<=d;d--)a.me[d]=c&255,c/=256;Ma(a,a.me);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.N[d]>>e&255,++c;return fb(b)}
function Jc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Jc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var Bb=null,Kc=!0;function Cb(a){!0===Kc&&(Kc=!1,null===Bb&&!0===yc.get("logging_enabled")&&Lc(!0));if(Bb){var b=Jc.apply(null,arguments);Bb(b)}}function Mc(a){return function(){Cb(a,arguments)}}
function Nc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Jc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Oc(a){var b=Jc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function O(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Jc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Pc(a){var b="",c="",d="",e="",f=!0,h="https",k=443;if(p(a)){var l=a.indexOf("//");0<=l&&(h=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(t){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===h||"wss"===h,k=b.substring(l+1),isFinite(k)&&
(k=String(k)),k=p(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,Tg:d,kb:f,scheme:h,$c:e}}function Qc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function Rc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function Vb(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Sc(a),d=Sc(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Tc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
function Uc(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=Uc(a[b[d]]);return c+"}"}function Vc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Wc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
function Xc(a){K(!Qc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var Yc=/^-?\d{1,10}$/;function Sc(a){return Yc.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Db(a){try{a()}catch(b){setTimeout(function(){O("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function P(a,b){if(ha(a)){var c=Array.prototype.slice.call(arguments,1).slice();Db(function(){a.apply(null,c)})}};function Ic(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,K(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Zc(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function $c(a){var b={},c={},d={},e="";try{var f=a.split("."),b=nb(Gc(f[0])||""),c=nb(Gc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{Zg:b,Bc:c,data:d,Qg:e}}function ad(a){a=$c(a).Bc;return"object"===typeof a&&a.hasOwnProperty("iat")?w(a,"iat"):null}function bd(a){a=$c(a);var b=a.Bc;return!!a.Qg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function cd(a){this.W=a;this.g=a.n.g}function dd(a,b,c,d){var e=[],f=[];Oa(b,function(b){"child_changed"===b.type&&a.g.Ad(b.Ke,b.Ja)&&f.push(new D("child_moved",b.Ja,b.Wa))});ed(a,e,"child_removed",b,d,c);ed(a,e,"child_added",b,d,c);ed(a,e,"child_moved",f,d,c);ed(a,e,"child_changed",b,d,c);ed(a,e,Fb,b,d,c);return e}function ed(a,b,c,d,e,f){d=Pa(d,function(a){return a.type===c});Xa(d,q(a.hg,a));Oa(d,function(c){var d=fd(a,c,f);Oa(e,function(e){e.Kf(c.type)&&b.push(e.createEvent(d,a.W))})})}
function fd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Qd=c.rf(b.Wa,b.Ja,a.g));return b}cd.prototype.hg=function(a,b){if(null==a.Wa||null==b.Wa)throw Fc("Should only compare child_ events.");return this.g.compare(new F(a.Wa,a.Ja),new F(b.Wa,b.Ja))};function gd(){this.bb={}}
function hd(a,b){var c=b.type,d=b.Wa;K("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");K(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.bb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.bb[d];else if("child_removed"==c&&"child_changed"==f)a.bb[d]=new D("child_removed",e.Ke,d);else if("child_changed"==c&&
"child_added"==f)a.bb[d]=new D("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Ke);else throw Fc("Illegal combination of changes: "+b+" occurred after "+e);}else a.bb[d]=b};function id(a,b,c){this.Rb=a;this.pb=b;this.rb=c||null}g=id.prototype;g.Kf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.n.g;return new Gb("value",this,new Q(a.Ja,b.Ib(),c))};g.Vb=function(a){var b=this.rb;if("cancel"===a.ze()){K(this.pb,"Raising a cancel event on a listener with no cancel callback");var c=this.pb;return function(){c.call(b,a.error)}}var d=this.Rb;return function(){d.call(b,a.Zd)}};g.gf=function(a,b){return this.pb?new Hb(this,a,b):null};
g.matches=function(a){return a instanceof id?a.Rb&&this.Rb?a.Rb===this.Rb&&a.rb===this.rb:!0:!1};g.tf=function(){return null!==this.Rb};function jd(a,b,c){this.ha=a;this.pb=b;this.rb=c}g=jd.prototype;g.Kf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.gf=function(a,b){return this.pb?new Hb(this,a,b):null};
g.createEvent=function(a,b){K(null!=a.Wa,"Child events should have a childName.");var c=b.Ib().u(a.Wa);return new Gb(a.type,this,new Q(a.Ja,c,b.n.g),a.Qd)};g.Vb=function(a){var b=this.rb;if("cancel"===a.ze()){K(this.pb,"Raising a cancel event on a listener with no cancel callback");var c=this.pb;return function(){c.call(b,a.error)}}var d=this.ha[a.ud];return function(){d.call(b,a.Zd,a.Qd)}};
g.matches=function(a){if(a instanceof jd){if(!this.ha||!a.ha)return!0;if(this.rb===a.rb){var b=pa(a.ha);if(b===pa(this.ha)){if(1===b){var b=qa(a.ha),c=qa(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return oa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.tf=function(){return null!==this.ha};function kd(a){this.g=a}g=kd.prototype;g.G=function(a,b,c,d,e,f){K(a.Jc(this.g),"A node must be indexed if only a child is updated");e=a.R(b);if(e.Q(d).ca(c.Q(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?hd(f,new D("child_removed",e,b)):K(a.K(),"A child remove without an old child only makes sense on a leaf node"):e.e()?hd(f,new D("child_added",c,b)):hd(f,new D("child_changed",c,b,e)));return a.K()&&c.e()?a:a.U(b,c).lb(this.g)};
g.xa=function(a,b,c){null!=c&&(a.K()||a.P(N,function(a,e){b.Da(a)||hd(c,new D("child_removed",e,a))}),b.K()||b.P(N,function(b,e){if(a.Da(b)){var f=a.R(b);f.ca(e)||hd(c,new D("child_changed",e,b,f))}else hd(c,new D("child_added",e,b))}));return b.lb(this.g)};g.ga=function(a,b){return a.e()?C:a.ga(b)};g.Na=function(){return!1};g.Wb=function(){return this};function ld(a){this.Be=new kd(a.g);this.g=a.g;var b;a.ma?(b=md(a),b=a.g.Pc(nd(a),b)):b=a.g.Tc();this.ed=b;a.pa?(b=od(a),a=a.g.Pc(pd(a),b)):a=a.g.Qc();this.Gc=a}g=ld.prototype;g.matches=function(a){return 0>=this.g.compare(this.ed,a)&&0>=this.g.compare(a,this.Gc)};g.G=function(a,b,c,d,e,f){this.matches(new F(b,c))||(c=C);return this.Be.G(a,b,c,d,e,f)};
g.xa=function(a,b,c){b.K()&&(b=C);var d=b.lb(this.g),d=d.ga(C),e=this;b.P(N,function(a,b){e.matches(new F(a,b))||(d=d.U(a,C))});return this.Be.xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.Be};function qd(a){this.sa=new ld(a);this.g=a.g;K(a.ja,"Only valid if limit has been set");this.ka=a.ka;this.Jb=!rd(a)}g=qd.prototype;g.G=function(a,b,c,d,e,f){this.sa.matches(new F(b,c))||(c=C);return a.R(b).ca(c)?a:a.Db()<this.ka?this.sa.Wb().G(a,b,c,d,e,f):sd(this,a,b,c,e,f)};
g.xa=function(a,b,c){var d;if(b.K()||b.e())d=C.lb(this.g);else if(2*this.ka<b.Db()&&b.Jc(this.g)){d=C.lb(this.g);b=this.Jb?b.$b(this.sa.Gc,this.g):b.Yb(this.sa.ed,this.g);for(var e=0;0<b.Pa.length&&e<this.ka;){var f=J(b),h;if(h=this.Jb?0>=this.g.compare(this.sa.ed,f):0>=this.g.compare(f,this.sa.Gc))d=d.U(f.name,f.S),e++;else break}}else{d=b.lb(this.g);d=d.ga(C);var k,l,m;if(this.Jb){b=d.sf(this.g);k=this.sa.Gc;l=this.sa.ed;var t=td(this.g);m=function(a,b){return t(b,a)}}else b=d.Xb(this.g),k=this.sa.ed,
l=this.sa.Gc,m=td(this.g);for(var e=0,z=!1;0<b.Pa.length;)f=J(b),!z&&0>=m(k,f)&&(z=!0),(h=z&&e<this.ka&&0>=m(f,l))?e++:d=d.U(f.name,C)}return this.sa.Wb().xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.sa.Wb()};
function sd(a,b,c,d,e,f){var h;if(a.Jb){var k=td(a.g);h=function(a,b){return k(b,a)}}else h=td(a.g);K(b.Db()==a.ka,"");var l=new F(c,d),m=a.Jb?ud(b,a.g):vd(b,a.g),t=a.sa.matches(l);if(b.Da(c)){for(var z=b.R(c),m=e.ye(a.g,m,a.Jb);null!=m&&(m.name==c||b.Da(m.name));)m=e.ye(a.g,m,a.Jb);e=null==m?1:h(m,l);if(t&&!d.e()&&0<=e)return null!=f&&hd(f,new D("child_changed",d,c,z)),b.U(c,d);null!=f&&hd(f,new D("child_removed",z,c));b=b.U(c,C);return null!=m&&a.sa.matches(m)?(null!=f&&hd(f,new D("child_added",
m.S,m.name)),b.U(m.name,m.S)):b}return d.e()?b:t&&0<=h(m,l)?(null!=f&&(hd(f,new D("child_removed",m.S,m.name)),hd(f,new D("child_added",d,c))),b.U(c,d).U(m.name,C)):b};function wd(a,b){this.je=a;this.fg=b}function xd(a){this.V=a}
xd.prototype.ab=function(a,b,c,d){var e=new gd,f;if(b.type===Yb)b.source.we?c=yd(this,a,b.path,b.Ga,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.af||Jb(a.w())&&!b.path.e(),c=Ad(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===Bd)b.source.we?c=Cd(this,a,b.path,b.children,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.af||Jb(a.w()),c=Dd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Ed)if(b.Vd)if(b=b.path,null!=c.tc(b))c=a;else{f=new rb(c,a,d);d=a.O.j();if(b.e()||".priority"===E(b))Ib(a.w())?
b=c.za(ub(a)):(b=a.w().j(),K(b instanceof R,"serverChildren would be complete if leaf node"),b=c.yc(b)),b=this.V.xa(d,b,e);else{var h=E(b),k=c.xc(h,a.w());null==k&&sb(a.w(),h)&&(k=d.R(h));b=null!=k?this.V.G(d,h,k,H(b),f,e):a.O.j().Da(h)?this.V.G(d,h,C,H(b),f,e):d;b.e()&&Ib(a.w())&&(d=c.za(ub(a)),d.K()&&(b=this.V.xa(b,d,e)))}d=Ib(a.w())||null!=c.tc(G);c=Fd(a,b,d,this.V.Na())}else c=Gd(this,a,b.path,b.Qb,c,d,e);else if(b.type===$b)d=b.path,b=a.w(),f=b.j(),h=b.ea||d.e(),c=Hd(this,new Id(a.O,new tb(f,
h,b.Ub)),d,c,qb,e);else throw Fc("Unknown operation type: "+b.type);e=ra(e.bb);d=c;b=d.O;b.ea&&(f=b.j().K()||b.j().e(),h=Jd(a),(0<e.length||!a.O.ea||f&&!b.j().ca(h)||!b.j().C().ca(h.C()))&&e.push(Eb(Jd(d))));return new wd(c,e)};
function Hd(a,b,c,d,e,f){var h=b.O;if(null!=d.tc(c))return b;var k;if(c.e())K(Ib(b.w()),"If change path is empty, we must have complete server data"),Jb(b.w())?(e=ub(b),d=d.yc(e instanceof R?e:C)):d=d.za(ub(b)),f=a.V.xa(b.O.j(),d,f);else{var l=E(c);if(".priority"==l)K(1==Kd(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.ld(c,f,k),f=null!=d?a.V.ga(f,d):h.j();else{var m=H(c);sb(h,l)?(k=b.w().j(),d=d.ld(c,h.j(),k),d=null!=d?h.j().R(l).G(m,d):h.j().R(l)):d=d.xc(l,
b.w());f=null!=d?a.V.G(h.j(),l,d,m,e,f):h.j()}}return Fd(b,f,h.ea||c.e(),a.V.Na())}function Ad(a,b,c,d,e,f,h,k){var l=b.w();h=h?a.V:a.V.Wb();if(c.e())d=h.xa(l.j(),d,null);else if(h.Na()&&!l.Ub)d=l.j().G(c,d),d=h.xa(l.j(),d,null);else{var m=E(c);if(!Kb(l,c)&&1<Kd(c))return b;var t=H(c);d=l.j().R(m).G(t,d);d=".priority"==m?h.ga(l.j(),d):h.G(l.j(),m,d,t,qb,null)}l=l.ea||c.e();b=new Id(b.O,new tb(d,l,h.Na()));return Hd(a,b,c,e,new rb(e,b,f),k)}
function yd(a,b,c,d,e,f,h){var k=b.O;e=new rb(e,b,f);if(c.e())h=a.V.xa(b.O.j(),d,h),a=Fd(b,h,!0,a.V.Na());else if(f=E(c),".priority"===f)h=a.V.ga(b.O.j(),d),a=Fd(b,h,k.ea,k.Ub);else{c=H(c);var l=k.j().R(f);if(!c.e()){var m=e.qf(f);d=null!=m?".priority"===Ld(c)&&m.Q(c.parent()).e()?m:m.G(c,d):C}l.ca(d)?a=b:(h=a.V.G(k.j(),f,d,c,e,h),a=Fd(b,h,k.ea,a.V.Na()))}return a}
function Cd(a,b,c,d,e,f,h){var k=b;Md(d,function(d,m){var t=c.u(d);sb(b.O,E(t))&&(k=yd(a,k,t,m,e,f,h))});Md(d,function(d,m){var t=c.u(d);sb(b.O,E(t))||(k=yd(a,k,t,m,e,f,h))});return k}function Nd(a,b){Md(b,function(b,d){a=a.G(b,d)});return a}
function Dd(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!Ib(b.w()))return b;var l=b;c=c.e()?d:Od(Pd,c,d);var m=b.w().j();c.children.ia(function(c,d){if(m.Da(c)){var I=b.w().j().R(c),I=Nd(I,d);l=Ad(a,l,new L(c),I,e,f,h,k)}});c.children.ia(function(c,d){var I=!sb(b.w(),c)&&null==d.value;m.Da(c)||I||(I=b.w().j().R(c),I=Nd(I,d),l=Ad(a,l,new L(c),I,e,f,h,k))});return l}
function Gd(a,b,c,d,e,f,h){if(null!=e.tc(c))return b;var k=Jb(b.w()),l=b.w();if(null!=d.value){if(c.e()&&l.ea||Kb(l,c))return Ad(a,b,c,l.j().Q(c),e,f,k,h);if(c.e()){var m=Pd;l.j().P(Qd,function(a,b){m=m.set(new L(a),b)});return Dd(a,b,c,m,e,f,k,h)}return b}m=Pd;Md(d,function(a){var b=c.u(a);Kb(l,b)&&(m=m.set(a,l.j().Q(b)))});return Dd(a,b,c,m,e,f,k,h)};function Rd(){}var Sd={};function td(a){return q(a.compare,a)}Rd.prototype.Ad=function(a,b){return 0!==this.compare(new F("[MIN_NAME]",a),new F("[MIN_NAME]",b))};Rd.prototype.Tc=function(){return Td};function Ud(a){K(!a.e()&&".priority"!==E(a),"Can't create PathIndex with empty path or .priority key");this.cc=a}ma(Ud,Rd);g=Ud.prototype;g.Ic=function(a){return!a.Q(this.cc).e()};g.compare=function(a,b){var c=a.S.Q(this.cc),d=b.S.Q(this.cc),c=c.Dc(d);return 0===c?Vb(a.name,b.name):c};
g.Pc=function(a,b){var c=M(a),c=C.G(this.cc,c);return new F(b,c)};g.Qc=function(){var a=C.G(this.cc,Vd);return new F("[MAX_NAME]",a)};g.toString=function(){return this.cc.slice().join("/")};function Wd(){}ma(Wd,Rd);g=Wd.prototype;g.compare=function(a,b){var c=a.S.C(),d=b.S.C(),c=c.Dc(d);return 0===c?Vb(a.name,b.name):c};g.Ic=function(a){return!a.C().e()};g.Ad=function(a,b){return!a.C().ca(b.C())};g.Tc=function(){return Td};g.Qc=function(){return new F("[MAX_NAME]",new tc("[PRIORITY-POST]",Vd))};
g.Pc=function(a,b){var c=M(a);return new F(b,new tc("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new Wd;function Xd(){}ma(Xd,Rd);g=Xd.prototype;g.compare=function(a,b){return Vb(a.name,b.name)};g.Ic=function(){throw Fc("KeyIndex.isDefinedOn not expected to be called.");};g.Ad=function(){return!1};g.Tc=function(){return Td};g.Qc=function(){return new F("[MAX_NAME]",C)};g.Pc=function(a){K(p(a),"KeyIndex indexValue must always be a string.");return new F(a,C)};g.toString=function(){return".key"};
var Qd=new Xd;function Yd(){}ma(Yd,Rd);g=Yd.prototype;g.compare=function(a,b){var c=a.S.Dc(b.S);return 0===c?Vb(a.name,b.name):c};g.Ic=function(){return!0};g.Ad=function(a,b){return!a.ca(b)};g.Tc=function(){return Td};g.Qc=function(){return Zd};g.Pc=function(a,b){var c=M(a);return new F(b,c)};g.toString=function(){return".value"};var $d=new Yd;function ae(){this.Tb=this.pa=this.Lb=this.ma=this.ja=!1;this.ka=0;this.Nb="";this.ec=null;this.xb="";this.bc=null;this.vb="";this.g=N}var be=new ae;function rd(a){return""===a.Nb?a.ma:"l"===a.Nb}function nd(a){K(a.ma,"Only valid if start has been set");return a.ec}function md(a){K(a.ma,"Only valid if start has been set");return a.Lb?a.xb:"[MIN_NAME]"}function pd(a){K(a.pa,"Only valid if end has been set");return a.bc}
function od(a){K(a.pa,"Only valid if end has been set");return a.Tb?a.vb:"[MAX_NAME]"}function ce(a){var b=new ae;b.ja=a.ja;b.ka=a.ka;b.ma=a.ma;b.ec=a.ec;b.Lb=a.Lb;b.xb=a.xb;b.pa=a.pa;b.bc=a.bc;b.Tb=a.Tb;b.vb=a.vb;b.g=a.g;return b}g=ae.prototype;g.He=function(a){var b=ce(this);b.ja=!0;b.ka=a;b.Nb="";return b};g.Ie=function(a){var b=ce(this);b.ja=!0;b.ka=a;b.Nb="l";return b};g.Je=function(a){var b=ce(this);b.ja=!0;b.ka=a;b.Nb="r";return b};
g.$d=function(a,b){var c=ce(this);c.ma=!0;n(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.xb=b):(c.Lb=!1,c.xb="");return c};g.td=function(a,b){var c=ce(this);c.pa=!0;n(a)||(a=null);c.bc=a;n(b)?(c.Tb=!0,c.vb=b):(c.ah=!1,c.vb="");return c};function de(a,b){var c=ce(a);c.g=b;return c}function ee(a){var b={};a.ma&&(b.sp=a.ec,a.Lb&&(b.sn=a.xb));a.pa&&(b.ep=a.bc,a.Tb&&(b.en=a.vb));if(a.ja){b.l=a.ka;var c=a.Nb;""===c&&(c=rd(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}
function S(a){return!(a.ma||a.pa||a.ja)}function fe(a){return S(a)&&a.g==N}function ge(a){var b={};if(fe(a))return b;var c;a.g===N?c="$priority":a.g===$d?c="$value":a.g===Qd?c="$key":(K(a.g instanceof Ud,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.ma&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.xb)));a.pa&&(b.endAt=B(a.bc),a.Tb&&(b.endAt+=","+B(a.vb)));a.ja&&(rd(a)?b.limitToFirst=a.ka:b.limitToLast=a.ka);return b}g.toString=function(){return B(ee(this))};function he(a,b){this.Bd=a;this.dc=b}he.prototype.get=function(a){var b=w(this.Bd,a);if(!b)throw Error("No index defined for "+a);return b===Sd?null:b};function ie(a,b,c){var d=na(a.Bd,function(d,f){var h=w(a.dc,f);K(h,"Missing index implementation for "+f);if(d===Sd){if(h.Ic(b.S)){for(var k=[],l=c.Xb(Tb),m=J(l);m;)m.name!=b.name&&k.push(m),m=J(l);k.push(b);return je(k,td(h))}return Sd}h=c.get(b.name);k=d;h&&(k=k.remove(new F(b.name,h)));return k.Oa(b,b.S)});return new he(d,a.dc)}
function ke(a,b,c){var d=na(a.Bd,function(a){if(a===Sd)return a;var d=c.get(b.name);return d?a.remove(new F(b.name,d)):a});return new he(d,a.dc)}var le=new he({".priority":Sd},{".priority":N});function tc(a,b){this.B=a;K(n(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||C;me(this.aa);this.Cb=null}var ne=["object","boolean","number","string"];g=tc.prototype;g.K=function(){return!0};g.C=function(){return this.aa};g.ga=function(a){return new tc(this.B,a)};g.R=function(a){return".priority"===a?this.aa:C};g.Q=function(a){return a.e()?this:".priority"===E(a)?this.aa:C};g.Da=function(){return!1};g.rf=function(){return null};
g.U=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:C.U(a,b).ga(this.aa)};g.G=function(a,b){var c=E(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;K(".priority"!==c||1===Kd(a),".priority must be the last token in a path");return this.U(c,C.G(H(a),b))};g.e=function(){return!1};g.Db=function(){return 0};g.P=function(){return!1};g.I=function(a){return a&&!this.C().e()?{".value":this.Ca(),".priority":this.C().I()}:this.Ca()};
g.hash=function(){if(null===this.Cb){var a="";this.aa.e()||(a+="priority:"+oe(this.aa.I())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+Xc(this.B):a+this.B;this.Cb=Hc(a)}return this.Cb};g.Ca=function(){return this.B};g.Dc=function(a){if(a===C)return 1;if(a instanceof R)return-1;K(a.K(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Na(ne,b),e=Na(ne,c);K(0<=d,"Unknown leaf type: "+b);K(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
g.lb=function(){return this};g.Jc=function(){return!0};g.ca=function(a){return a===this?!0:a.K()?this.B===a.B&&this.aa.ca(a.aa):!1};g.toString=function(){return B(this.I(!0))};function R(a,b,c){this.m=a;(this.aa=b)&&me(this.aa);a.e()&&K(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.wb=c;this.Cb=null}g=R.prototype;g.K=function(){return!1};g.C=function(){return this.aa||C};g.ga=function(a){return this.m.e()?this:new R(this.m,a,this.wb)};g.R=function(a){if(".priority"===a)return this.C();a=this.m.get(a);return null===a?C:a};g.Q=function(a){var b=E(a);return null===b?this:this.R(b).Q(H(a))};g.Da=function(a){return null!==this.m.get(a)};
g.U=function(a,b){K(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new F(a,b),d,e;b.e()?(d=this.m.remove(a),c=ke(this.wb,c,this.m)):(d=this.m.Oa(a,b),c=ie(this.wb,c,this.m));e=d.e()?C:this.aa;return new R(d,e,c)};g.G=function(a,b){var c=E(a);if(null===c)return b;K(".priority"!==E(a)||1===Kd(a),".priority must be the last token in a path");var d=this.R(c).G(H(a),b);return this.U(c,d)};g.e=function(){return this.m.e()};g.Db=function(){return this.m.count()};
var pe=/^(0|[1-9]\d*)$/;g=R.prototype;g.I=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.P(N,function(f,h){b[f]=h.I(a);c++;e&&pe.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().I());return b};g.hash=function(){if(null===this.Cb){var a="";this.C().e()||(a+="priority:"+oe(this.C().I())+":");this.P(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Cb=""===a?"":Hc(a)}return this.Cb};
g.rf=function(a,b,c){return(c=qe(this,c))?(a=cc(c,new F(a,b)))?a.name:null:cc(this.m,a)};function ud(a,b){var c;c=(c=qe(a,b))?(c=c.Sc())&&c.name:a.m.Sc();return c?new F(c,a.m.get(c)):null}function vd(a,b){var c;c=(c=qe(a,b))?(c=c.fc())&&c.name:a.m.fc();return c?new F(c,a.m.get(c)):null}g.P=function(a,b){var c=qe(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.m.ia(b)};g.Xb=function(a){return this.Yb(a.Tc(),a)};
g.Yb=function(a,b){var c=qe(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.m.Yb(a.name,Tb),d=ec(c);null!=d&&0>b.compare(d,a);)J(c),d=ec(c);return c};g.sf=function(a){return this.$b(a.Qc(),a)};g.$b=function(a,b){var c=qe(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.m.$b(a.name,Tb),d=ec(c);null!=d&&0<b.compare(d,a);)J(c),d=ec(c);return c};g.Dc=function(a){return this.e()?a.e()?0:-1:a.K()||a.e()?1:a===Vd?-1:0};
g.lb=function(a){if(a===Qd||ta(this.wb.dc,a.toString()))return this;var b=this.wb,c=this.m;K(a!==Qd,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(Tb),f=J(c);f;)e=e||a.Ic(f.S),d.push(f),f=J(c);d=e?je(d,td(a)):Sd;e=a.toString();c=xa(b.dc);c[e]=a;a=xa(b.Bd);a[e]=d;return new R(this.m,this.aa,new he(a,c))};g.Jc=function(a){return a===Qd||ta(this.wb.dc,a.toString())};
g.ca=function(a){if(a===this)return!0;if(a.K())return!1;if(this.C().ca(a.C())&&this.m.count()===a.m.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=J(b),d=J(a);c&&d;){if(c.name!==d.name||!c.S.ca(d.S))return!1;c=J(b);d=J(a)}return null===c&&null===d}return!1};function qe(a,b){return b===Qd?null:a.wb.get(b.toString())}g.toString=function(){return B(this.I(!0))};function M(a,b){if(null===a)return C;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);K(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new tc(a,M(c));if(a instanceof Array){var d=C,e=a;r(e,function(a,b){if(v(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.K()||!c.e())d=
d.U(b,c)}});return d.ga(M(c))}var f=[],h=!1,k=a;ib(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.C().e(),f.push(new F(a,b)))}});if(0==f.length)return C;var l=je(f,Ub,function(a){return a.name},Wb);if(h){var m=je(f,td(N));return new R(l,M(c),new he({".priority":m},{".priority":N}))}return new R(l,M(c),le)}var re=Math.log(2);
function se(a){this.count=parseInt(Math.log(a+1)/re,10);this.jf=this.count-1;this.eg=a+1&parseInt(Array(this.count+1).join("1"),2)}function te(a){var b=!(a.eg&1<<a.jf);a.jf--;return b}
function je(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],t=c?c(m):m;return new fc(t,m.S,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),z=e(m+1,d),m=a[m],t=c?c(m):m;return new fc(t,m.S,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=t-b,z=t;t-=b;var z=e(k+1,z),k=a[k],I=c?c(k):k,z=new fc(I,k.S,h,null,z);f?f.left=z:m=z;f=z}for(var f=null,m=null,t=a.length,z=0;z<b.count;++z){var I=te(b),zd=Math.pow(2,b.count-(z+1));I?d(zd,!1):(d(zd,!1),d(zd,!0))}return m}(new se(a.length));
return null!==f?new ac(d||b,f):new ac(d||b)}function oe(a){return"number"===typeof a?"number:"+Xc(a):"string:"+a}function me(a){if(a.K()){var b=a.I();K("string"===typeof b||"number"===typeof b||"object"===typeof b&&v(b,".sv"),"Priority must be a string or number.")}else K(a===Vd||a.e(),"priority of unexpected type.");K(a===Vd||a.C().e(),"Priority nodes can't have a priority of their own.")}var C=new R(new ac(Wb),null,le);function ue(){R.call(this,new ac(Wb),C,le)}ma(ue,R);g=ue.prototype;
g.Dc=function(a){return a===this?0:1};g.ca=function(a){return a===this};g.C=function(){return this};g.R=function(){return C};g.e=function(){return!1};var Vd=new ue,Td=new F("[MIN_NAME]",C),Zd=new F("[MAX_NAME]",Vd);function Id(a,b){this.O=a;this.Yd=b}function Fd(a,b,c,d){return new Id(new tb(b,c,d),a.Yd)}function Jd(a){return a.O.ea?a.O.j():null}Id.prototype.w=function(){return this.Yd};function ub(a){return a.Yd.ea?a.Yd.j():null};function ve(a,b){this.W=a;var c=a.n,d=new kd(c.g),c=S(c)?new kd(c.g):c.ja?new qd(c):new ld(c);this.Hf=new xd(c);var e=b.w(),f=b.O,h=d.xa(C,e.j(),null),k=c.xa(C,f.j(),null);this.Ka=new Id(new tb(k,f.ea,c.Na()),new tb(h,e.ea,d.Na()));this.Xa=[];this.lg=new cd(a)}function we(a){return a.W}g=ve.prototype;g.w=function(){return this.Ka.w().j()};g.fb=function(a){var b=ub(this.Ka);return b&&(S(this.W.n)||!a.e()&&!b.R(E(a)).e())?b.Q(a):null};g.e=function(){return 0===this.Xa.length};g.Pb=function(a){this.Xa.push(a)};
g.jb=function(a,b){var c=[];if(b){K(null==a,"A cancel should cancel all event registrations.");var d=this.W.path;Oa(this.Xa,function(a){(a=a.gf(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Xa.length;++f){var h=this.Xa[f];if(!h.matches(a))e.push(h);else if(a.tf()){e=e.concat(this.Xa.slice(f+1));break}}this.Xa=e}else this.Xa=[];return c};
g.ab=function(a,b,c){a.type===Bd&&null!==a.source.Hb&&(K(ub(this.Ka),"We should always have a full cache before handling merges"),K(Jd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.Hf.ab(d,a,b,c);b=this.Hf;c=a.je;K(c.O.j().Jc(b.V.g),"Event snap not indexed");K(c.w().j().Jc(b.V.g),"Server snap not indexed");K(Ib(a.je.w())||!Ib(d.w()),"Once a server snap is complete, it should never go back");this.Ka=a.je;return xe(this,a.fg,a.je.O.j(),null)};
function ye(a,b){var c=a.Ka.O,d=[];c.j().K()||c.j().P(N,function(a,b){d.push(new D("child_added",b,a))});c.ea&&d.push(Eb(c.j()));return xe(a,d,c.j(),b)}function xe(a,b,c,d){return dd(a.lg,b,c,d?[d]:a.Xa)};function ze(a,b,c){this.type=Bd;this.source=a;this.path=b;this.children=c}ze.prototype.Xc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new Xb(this.source,G,a.value):new ze(this.source,G,a);K(E(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new ze(this.source,H(this.path),this.children)};ze.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function Ae(a,b){this.f=Mc("p:rest:");this.F=a;this.Gb=b;this.Aa=null;this.$={}}function Be(a,b){if(n(b))return"tag$"+b;K(fe(a.n),"should have a tag if it's not a default query.");return a.path.toString()}g=Ae.prototype;
g.yf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.va());var f=Be(a,c),h={};this.$[f]=h;a=ge(a.n);var k=this;Ce(this,e+".json",a,function(a,b){var t=b;404===a&&(a=t=null);null===a&&k.Gb(e,t,!1,c);w(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Rf=function(a,b){var c=Be(a,b);delete this.$[c]};g.M=function(a,b){this.Aa=a;var c=$c(a),d=c.data,c=c.Bc&&c.Bc.exp;b&&b("ok",{auth:d,expires:c})};g.ge=function(a){this.Aa=null;a("ok",null)};g.Me=function(){};
g.Cf=function(){};g.Jd=function(){};g.put=function(){};g.zf=function(){};g.Ue=function(){};
function Ce(a,b,c,d){c=c||{};c.format="export";a.Aa&&(c.auth=a.Aa);var e=(a.F.kb?"https://":"http://")+a.F.host+b+"?"+kb(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=nb(f.responseText)}catch(c){O("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
f.status&&O("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function De(a){K(ea(a)&&0<a.length,"Requires a non-empty array");this.Xf=a;this.Oc={}}De.prototype.fe=function(a,b){var c;c=this.Oc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].zc.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};De.prototype.Eb=function(a,b,c){Ee(this,a);this.Oc[a]=this.Oc[a]||[];this.Oc[a].push({zc:b,Ma:c});(a=this.Ae(a))&&b.apply(c,a)};
De.prototype.ic=function(a,b,c){Ee(this,a);a=this.Oc[a]||[];for(var d=0;d<a.length;d++)if(a[d].zc===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};function Ee(a,b){K(Ta(a.Xf,function(a){return a===b}),"Unknown event: "+b)};var Fe=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);K(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);K(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Ge(){De.call(this,["online"]);this.kc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.kc||(a.kc=!0,a.fe("online",!0))},!1);window.addEventListener("offline",function(){a.kc&&(a.kc=!1,a.fe("online",!1))},!1)}}ma(Ge,De);Ge.prototype.Ae=function(a){K("online"===a,"Unknown event type: "+a);return[this.kc]};ca(Ge);function He(){De.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Ob=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.Ob&&(c.Ob=b,c.fe("visible",b))},!1)}}ma(He,De);He.prototype.Ae=function(a){K("visible"===a,"Unknown event type: "+a);return[this.Ob]};ca(He);function L(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Z=0}else this.o=a,this.Z=b}function T(a,b){var c=E(a);if(null===c)return b;if(c===E(b))return T(H(a),H(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
function Ie(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=Vb(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function E(a){return a.Z>=a.o.length?null:a.o[a.Z]}function Kd(a){return a.o.length-a.Z}function H(a){var b=a.Z;b<a.o.length&&b++;return new L(a.o,b)}function Ld(a){return a.Z<a.o.length?a.o[a.o.length-1]:null}g=L.prototype;
g.toString=function(){for(var a="",b=this.Z;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.o.length)return null;for(var a=[],b=this.Z;b<this.o.length-1;b++)a.push(this.o[b]);return new L(a,0)};
g.u=function(a){for(var b=[],c=this.Z;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof L)for(c=a.Z;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Z>=this.o.length};g.ca=function(a){if(Kd(this)!==Kd(a))return!1;for(var b=this.Z,c=a.Z;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
g.contains=function(a){var b=this.Z,c=a.Z;if(Kd(this)>Kd(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var G=new L("");function Je(a,b){this.Qa=a.slice();this.Ha=Math.max(1,this.Qa.length);this.lf=b;for(var c=0;c<this.Qa.length;c++)this.Ha+=Zc(this.Qa[c]);Ke(this)}Je.prototype.push=function(a){0<this.Qa.length&&(this.Ha+=1);this.Qa.push(a);this.Ha+=Zc(a);Ke(this)};Je.prototype.pop=function(){var a=this.Qa.pop();this.Ha-=Zc(a);0<this.Qa.length&&--this.Ha};
function Ke(a){if(768<a.Ha)throw Error(a.lf+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Qa.length)throw Error(a.lf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Le(a));}function Le(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Me(a,b){this.value=a;this.children=b||Ne}var Ne=new ac(function(a,b){return a===b?0:a<b?-1:1});function Oe(a){var b=Pd;r(a,function(a,d){b=b.set(new L(d),a)});return b}g=Me.prototype;g.e=function(){return null===this.value&&this.children.e()};function Pe(a,b,c){if(null!=a.value&&c(a.value))return{path:G,value:a.value};if(b.e())return null;var d=E(b);a=a.children.get(d);return null!==a?(b=Pe(a,H(b),c),null!=b?{path:(new L(d)).u(b.path),value:b.value}:null):null}
function Qe(a,b){return Pe(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(E(a));return null!==b?b.subtree(H(a)):Pd};g.set=function(a,b){if(a.e())return new Me(b,this.children);var c=E(a),d=(this.children.get(c)||Pd).set(H(a),b),c=this.children.Oa(c,d);return new Me(this.value,c)};
g.remove=function(a){if(a.e())return this.children.e()?Pd:new Me(null,this.children);var b=E(a),c=this.children.get(b);return c?(a=c.remove(H(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?Pd:new Me(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(E(a));return b?b.get(H(a)):null};
function Od(a,b,c){if(b.e())return c;var d=E(b);b=Od(a.children.get(d)||Pd,H(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new Me(a.value,d)}function Re(a,b){return Se(a,G,b)}function Se(a,b,c){var d={};a.children.ia(function(a,f){d[a]=Se(f,b.u(a),c)});return c(b,a.value,d)}function Te(a,b,c){return Ue(a,b,G,c)}function Ue(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=E(b);return(a=a.children.get(e))?Ue(a,H(b),c.u(e),d):null}
function Ve(a,b,c){We(a,b,G,c)}function We(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=E(b);return(a=a.children.get(e))?We(a,H(b),c.u(e),d):Pd}function Md(a,b){Xe(a,G,b)}function Xe(a,b,c){a.children.ia(function(a,e){Xe(e,b.u(a),c)});a.value&&c(b,a.value)}function Ye(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Pd=new Me(null);Me.prototype.toString=function(){var a={};Md(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Ze(a,b,c){this.type=Ed;this.source=$e;this.path=a;this.Qb=b;this.Vd=c}Ze.prototype.Xc=function(a){if(this.path.e()){if(null!=this.Qb.value)return K(this.Qb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Qb.subtree(new L(a));return new Ze(G,a,this.Vd)}K(E(this.path)===a,"operationForChild called for unrelated child.");return new Ze(H(this.path),this.Qb,this.Vd)};
Ze.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Vd+" affectedTree="+this.Qb+")"};var Yb=0,Bd=1,Ed=2,$b=3;function af(a,b,c,d){this.we=a;this.pf=b;this.Hb=c;this.af=d;K(!d||b,"Tagged queries must be from server.")}var $e=new af(!0,!1,null,!1),bf=new af(!1,!0,null,!1);af.prototype.toString=function(){return this.we?"user":this.af?"server(queryID="+this.Hb+")":"server"};function cf(a){this.X=a}var df=new cf(new Me(null));function ef(a,b,c){if(b.e())return new cf(new Me(c));var d=Qe(a.X,b);if(null!=d){var e=d.path,d=d.value;b=T(e,b);d=d.G(b,c);return new cf(a.X.set(e,d))}a=Od(a.X,b,new Me(c));return new cf(a)}function ff(a,b,c){var d=a;ib(c,function(a,c){d=ef(d,b.u(a),c)});return d}cf.prototype.Rd=function(a){if(a.e())return df;a=Od(this.X,a,Pd);return new cf(a)};function gf(a,b){var c=Qe(a.X,b);return null!=c?a.X.get(c.path).Q(T(c.path,b)):null}
function hf(a){var b=[],c=a.X.value;null!=c?c.K()||c.P(N,function(a,c){b.push(new F(a,c))}):a.X.children.ia(function(a,c){null!=c.value&&b.push(new F(a,c.value))});return b}function jf(a,b){if(b.e())return a;var c=gf(a,b);return null!=c?new cf(new Me(c)):new cf(a.X.subtree(b))}cf.prototype.e=function(){return this.X.e()};cf.prototype.apply=function(a){return kf(G,this.X,a)};
function kf(a,b,c){if(null!=b.value)return c.G(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(K(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=kf(a.u(b),f,c)});c.Q(a).e()||null===d||(c=c.G(a.u(".priority"),d));return c};function lf(){this.T=df;this.na=[];this.Mc=-1}function mf(a,b){for(var c=0;c<a.na.length;c++){var d=a.na[c];if(d.kd===b)return d}return null}g=lf.prototype;
g.Rd=function(a){var b=Ua(this.na,function(b){return b.kd===a});K(0<=b,"removeWrite called with nonexistent writeId.");var c=this.na[b];this.na.splice(b,1);for(var d=c.visible,e=!1,f=this.na.length-1;d&&0<=f;){var h=this.na[f];h.visible&&(f>=b&&nf(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=of(this.na,pf,G),this.Mc=0<this.na.length?this.na[this.na.length-1].kd:-1;else if(c.Ga)this.T=this.T.Rd(c.path);else{var k=this;r(c.children,function(a,b){k.T=k.T.Rd(c.path.u(b))})}return!0}return!1};
g.za=function(a,b,c,d){if(c||d){var e=jf(this.T,a);return!d&&e.e()?b:d||null!=b||null!=gf(e,G)?(e=of(this.na,function(b){return(b.visible||d)&&(!c||!(0<=Na(c,b.kd)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||C,e.apply(b)):null}e=gf(this.T,a);if(null!=e)return e;e=jf(this.T,a);return e.e()?b:null!=b||null!=gf(e,G)?(b=b||C,e.apply(b)):null};
g.yc=function(a,b){var c=C,d=gf(this.T,a);if(d)d.K()||d.P(N,function(a,b){c=c.U(a,b)});else if(b){var e=jf(this.T,a);b.P(N,function(a,b){var d=jf(e,new L(a)).apply(b);c=c.U(a,d)});Oa(hf(e),function(a){c=c.U(a.name,a.S)})}else e=jf(this.T,a),Oa(hf(e),function(a){c=c.U(a.name,a.S)});return c};g.ld=function(a,b,c,d){K(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.u(b);if(null!=gf(this.T,a))return null;a=jf(this.T,a);return a.e()?d.Q(b):a.apply(d.Q(b))};
g.xc=function(a,b,c){a=a.u(b);var d=gf(this.T,a);return null!=d?d:sb(c,b)?jf(this.T,a).apply(c.j().R(b)):null};g.tc=function(a){return gf(this.T,a)};g.ne=function(a,b,c,d,e,f){var h;a=jf(this.T,a);h=gf(a,G);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.lb(f);if(h.e()||h.K())return[];b=[];a=td(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=J(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=J(e);return b};
function nf(a,b){return a.Ga?a.path.contains(b):!!ua(a.children,function(c,d){return a.path.u(d).contains(b)})}function pf(a){return a.visible}
function of(a,b,c){for(var d=df,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=T(c,h),d=ef(d,h,f.Ga)):h.contains(c)&&(h=T(h,c),d=ef(d,G,f.Ga.Q(h)));else if(f.children)if(c.contains(h))h=T(c,h),d=ff(d,h,f.children);else{if(h.contains(c))if(h=T(h,c),h.e())d=ff(d,G,f.children);else if(f=w(f.children,E(h)))f=f.Q(H(h)),d=ef(d,G,f)}else throw Fc("WriteRecord should have .snap or .children");}}return d}function qf(a,b){this.Mb=a;this.X=b}g=qf.prototype;
g.za=function(a,b,c){return this.X.za(this.Mb,a,b,c)};g.yc=function(a){return this.X.yc(this.Mb,a)};g.ld=function(a,b,c){return this.X.ld(this.Mb,a,b,c)};g.tc=function(a){return this.X.tc(this.Mb.u(a))};g.ne=function(a,b,c,d,e){return this.X.ne(this.Mb,a,b,c,d,e)};g.xc=function(a,b){return this.X.xc(this.Mb,a,b)};g.u=function(a){return new qf(this.Mb.u(a),this.X)};function rf(){this.ya={}}g=rf.prototype;g.e=function(){return wa(this.ya)};g.ab=function(a,b,c){var d=a.source.Hb;if(null!==d)return d=w(this.ya,d),K(null!=d,"SyncTree gave us an op for an invalid query."),d.ab(a,b,c);var e=[];r(this.ya,function(d){e=e.concat(d.ab(a,b,c))});return e};g.Pb=function(a,b,c,d,e){var f=a.va(),h=w(this.ya,f);if(!h){var h=c.za(e?d:null),k=!1;h?k=!0:(h=d instanceof R?c.yc(d):C,k=!1);h=new ve(a,new Id(new tb(h,k,!1),new tb(d,e,!1)));this.ya[f]=h}h.Pb(b);return ye(h,b)};
g.jb=function(a,b,c){var d=a.va(),e=[],f=[],h=null!=sf(this);if("default"===d){var k=this;r(this.ya,function(a,d){f=f.concat(a.jb(b,c));a.e()&&(delete k.ya[d],S(a.W.n)||e.push(a.W))})}else{var l=w(this.ya,d);l&&(f=f.concat(l.jb(b,c)),l.e()&&(delete this.ya[d],S(l.W.n)||e.push(l.W)))}h&&null==sf(this)&&e.push(new U(a.k,a.path));return{Kg:e,mg:f}};function tf(a){return Pa(ra(a.ya),function(a){return!S(a.W.n)})}g.fb=function(a){var b=null;r(this.ya,function(c){b=b||c.fb(a)});return b};
function uf(a,b){if(S(b.n))return sf(a);var c=b.va();return w(a.ya,c)}function sf(a){return va(a.ya,function(a){return S(a.W.n)})||null};function vf(a){this.ta=Pd;this.ib=new lf;this.$e={};this.mc={};this.Nc=a}function wf(a,b,c,d,e){var f=a.ib,h=e;K(d>f.Mc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.na.push({path:b,Ga:c,kd:d,visible:h});h&&(f.T=ef(f.T,b,c));f.Mc=d;return e?xf(a,new Xb($e,b,c)):[]}function yf(a,b,c,d){var e=a.ib;K(d>e.Mc,"Stacking an older merge on top of newer ones");e.na.push({path:b,children:c,kd:d,visible:!0});e.T=ff(e.T,b,c);e.Mc=d;c=Oe(c);return xf(a,new ze($e,b,c))}
function zf(a,b,c){c=c||!1;var d=mf(a.ib,b);if(a.ib.Rd(b)){var e=Pd;null!=d.Ga?e=e.set(G,!0):ib(d.children,function(a,b){e=e.set(new L(a),b)});return xf(a,new Ze(d.path,e,c))}return[]}function Af(a,b,c){c=Oe(c);return xf(a,new ze(bf,b,c))}function Bf(a,b,c,d){d=Cf(a,d);if(null!=d){var e=Df(d);d=e.path;e=e.Hb;b=T(d,b);c=new Xb(new af(!1,!0,e,!0),b,c);return Ef(a,d,c)}return[]}
function Ff(a,b,c,d){if(d=Cf(a,d)){var e=Df(d);d=e.path;e=e.Hb;b=T(d,b);c=Oe(c);c=new ze(new af(!1,!0,e,!0),b,c);return Ef(a,d,c)}return[]}
vf.prototype.Pb=function(a,b){var c=a.path,d=null,e=!1;Ve(this.ta,c,function(a,b){var f=T(a,c);d=d||b.fb(f);e=e||null!=sf(b)});var f=this.ta.get(c);f?(e=e||null!=sf(f),d=d||f.fb(G)):(f=new rf,this.ta=this.ta.set(c,f));var h;null!=d?h=!0:(h=!1,d=C,Ye(this.ta.subtree(c),function(a,b){var c=b.fb(G);c&&(d=d.U(a,c))}));var k=null!=uf(f,a);if(!k&&!S(a.n)){var l=Gf(a);K(!(l in this.mc),"View does not exist, but we have a tag");var m=Hf++;this.mc[l]=m;this.$e["_"+m]=l}h=f.Pb(a,b,new qf(c,this.ib),d,h);k||
e||(f=uf(f,a),h=h.concat(If(this,a,f)));return h};
vf.prototype.jb=function(a,b,c){var d=a.path,e=this.ta.get(d),f=[];if(e&&("default"===a.va()||null!=uf(e,a))){f=e.jb(a,b,c);e.e()&&(this.ta=this.ta.remove(d));e=f.Kg;f=f.mg;b=-1!==Ua(e,function(a){return S(a.n)});var h=Te(this.ta,d,function(a,b){return null!=sf(b)});if(b&&!h&&(d=this.ta.subtree(d),!d.e()))for(var d=Jf(d),k=0;k<d.length;++k){var l=d[k],m=l.W,l=Kf(this,l);this.Nc.Xe(Lf(m),Mf(this,m),l.xd,l.H)}if(!h&&0<e.length&&!c)if(b)this.Nc.ae(Lf(a),null);else{var t=this;Oa(e,function(a){a.va();
var b=t.mc[Gf(a)];t.Nc.ae(Lf(a),b)})}Nf(this,e)}return f};vf.prototype.za=function(a,b){var c=this.ib,d=Te(this.ta,a,function(b,c){var d=T(b,a);if(d=c.fb(d))return d});return c.za(a,d,b,!0)};function Jf(a){return Re(a,function(a,c,d){if(c&&null!=sf(c))return[sf(c)];var e=[];c&&(e=tf(c));r(d,function(a){e=e.concat(a)});return e})}function Nf(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!S(d.n)){var d=Gf(d),e=a.mc[d];delete a.mc[d];delete a.$e["_"+e]}}}
function Lf(a){return S(a.n)&&!fe(a.n)?a.Ib():a}function If(a,b,c){var d=b.path,e=Mf(a,b);c=Kf(a,c);b=a.Nc.Xe(Lf(b),e,c.xd,c.H);d=a.ta.subtree(d);if(e)K(null==sf(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Re(d,function(a,b,c){if(!a.e()&&b&&null!=sf(b))return[we(sf(b))];var d=[];b&&(d=d.concat(Qa(tf(b),function(a){return a.W})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Nc.ae(Lf(c),Mf(a,c));return b}
function Kf(a,b){var c=b.W,d=Mf(a,c);return{xd:function(){return(b.w()||C).hash()},H:function(b){if("ok"===b){if(d){var f=c.path;if(b=Cf(a,d)){var h=Df(b);b=h.path;h=h.Hb;f=T(b,f);f=new Zb(new af(!1,!0,h,!0),f);b=Ef(a,b,f)}else b=[]}else b=xf(a,new Zb(bf,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.jb(c,null,f)}}}function Gf(a){return a.path.toString()+"$"+a.va()}function Df(a){var b=a.indexOf("$");K(-1!==b&&b<a.length-1,"Bad queryKey.");return{Hb:a.substr(b+1),path:new L(a.substr(0,b))}}function Cf(a,b){var c=a.$e,d="_"+b;return d in c?c[d]:void 0}function Mf(a,b){var c=Gf(b);return w(a.mc,c)}var Hf=1;
function Ef(a,b,c){var d=a.ta.get(b);K(d,"Missing sync point for query tag that we're tracking");return d.ab(c,new qf(b,a.ib),null)}function xf(a,b){return Of(a,b,a.ta,null,new qf(G,a.ib))}function Of(a,b,c,d,e){if(b.path.e())return Pf(a,b,c,d,e);var f=c.get(G);null==d&&null!=f&&(d=f.fb(G));var h=[],k=E(b.path),l=b.Xc(k);if((c=c.children.get(k))&&l)var m=d?d.R(k):null,k=e.u(k),h=h.concat(Of(a,l,c,m,k));f&&(h=h.concat(f.ab(b,e,d)));return h}
function Pf(a,b,c,d,e){var f=c.get(G);null==d&&null!=f&&(d=f.fb(G));var h=[];c.children.ia(function(c,f){var m=d?d.R(c):null,t=e.u(c),z=b.Xc(c);z&&(h=h.concat(Pf(a,z,f,m,t)))});f&&(h=h.concat(f.ab(b,e,d)));return h};function Qf(){this.children={};this.nd=0;this.value=null}function Rf(a,b,c){this.Gd=a?a:"";this.Zc=b?b:null;this.A=c?c:new Qf}function Sf(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=E(c));)d=new Rf(e,d,w(d.A.children,e)||new Qf),c=H(c);return d}g=Rf.prototype;g.Ca=function(){return this.A.value};function Tf(a,b){K("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Uf(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.nd=0;Uf(this)};
g.wd=function(){return 0<this.A.nd};g.e=function(){return null===this.Ca()&&!this.wd()};g.P=function(a){var b=this;r(this.A.children,function(c,d){a(new Rf(d,b,c))})};function Vf(a,b,c,d){c&&!d&&b(a);a.P(function(a){Vf(a,b,!0,d)});c&&d&&b(a)}function Wf(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Zc?this.Gd:this.Zc.path()+"/"+this.Gd)};g.name=function(){return this.Gd};g.parent=function(){return this.Zc};
function Uf(a){if(null!==a.Zc){var b=a.Zc,c=a.Gd,d=a.e(),e=v(b.A.children,c);d&&e?(delete b.A.children[c],b.A.nd--,Uf(b)):d||e||(b.A.children[c]=a.A,b.A.nd++,Uf(b))}};var Xf=/[\[\].#$\/\u0000-\u001F\u007F]/,Yf=/[\[\].#$\u0000-\u001F\u007F]/,Zf=/^[a-zA-Z][a-zA-Z._\-+]+$/;function $f(a){return p(a)&&0!==a.length&&!Xf.test(a)}function ag(a){return null===a||p(a)||ga(a)&&!Qc(a)||ia(a)&&v(a,".sv")}function bg(a,b,c,d){d&&!n(b)||cg(y(a,1,d),b,c)}
function cg(a,b,c){c instanceof L&&(c=new Je(c,a));if(!n(b))throw Error(a+"contains undefined "+Le(c));if(ha(b))throw Error(a+"contains a function "+Le(c)+" with contents: "+b.toString());if(Qc(b))throw Error(a+"contains "+b.toString()+" "+Le(c));if(p(b)&&b.length>10485760/3&&10485760<Zc(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Le(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;ib(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!$f(b)))throw Error(a+" contains an invalid key ("+b+") "+Le(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);cg(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Le(c)+" in addition to actual children.");}}
function dg(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!$f(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Ie);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
function eg(a,b,c){var d=y(a,1,!1);if(!ia(b)||ea(b))throw Error(d+" must be an object containing the children to replace.");var e=[];ib(b,function(a,b){var k=new L(a);cg(d,b,c.u(k));if(".priority"===Ld(k)&&!ag(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});dg(d,e)}
function fg(a,b,c){if(Qc(c))throw Error(y(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ag(c))throw Error(y(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function gg(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(y(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function hg(a,b){if(n(b)&&!$f(b))throw Error(y(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function ig(a,b){if(!p(b)||0===b.length||Yf.test(b))throw Error(y(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function jg(a,b){if(".info"===E(b))throw Error(a+" failed: Can't modify data under /.info/");}function kg(a,b){if(!p(b))throw Error(y(a,1,!1)+"must be a valid credential (a string).");}function lg(a,b,c){if(!p(c))throw Error(y(a,b,!1)+"must be a valid string.");}
function mg(a,b){lg(a,1,b);if(!Zf.test(b))throw Error(y(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function ng(a,b,c,d){if(!d||n(c))if(!ia(c)||null===c)throw Error(y(a,b,d)+"must be a valid object.");}function og(a,b,c){if(!ia(b)||!v(b,c))throw Error(y(a,1,!1)+'must contain the key "'+c+'"');if(!p(w(b,c)))throw Error(y(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function pg(){this.set={}}g=pg.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return v(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return wa(this.set)};g.count=function(){return pa(this.set)};function qg(a,b){r(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function qc(){this.m=this.B=null}qc.prototype.find=function(a){if(null!=this.B)return this.B.Q(a);if(a.e()||null==this.m)return null;var b=E(a);a=H(a);return this.m.contains(b)?this.m.get(b).find(a):null};qc.prototype.nc=function(a,b){if(a.e())this.B=b,this.m=null;else if(null!==this.B)this.B=this.B.G(a,b);else{null==this.m&&(this.m=new pg);var c=E(a);this.m.contains(c)||this.m.add(c,new qc);c=this.m.get(c);a=H(a);c.nc(a,b)}};
function rg(a,b){if(b.e())return a.B=null,a.m=null,!0;if(null!==a.B){if(a.B.K())return!1;var c=a.B;a.B=null;c.P(N,function(b,c){a.nc(new L(b),c)});return rg(a,b)}return null!==a.m?(c=E(b),b=H(b),a.m.contains(c)&&rg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function rc(a,b,c){null!==a.B?c(b,a.B):a.P(function(a,e){var f=new L(b.toString()+"/"+a);rc(e,f,c)})}qc.prototype.P=function(a){null!==this.m&&qg(this.m,function(b,c){a(b,c)})};var sg="auth.firebase.com";function tg(a,b,c){this.od=a||{};this.ee=b||{};this.$a=c||{};this.od.remember||(this.od.remember="default")}var ug=["remember","redirectTo"];function vg(a){var b={},c={};ib(a||{},function(a,e){0<=Na(ug,a)?b[a]=e:c[a]=e});return new tg(b,{},c)};function wg(a,b){this.Qe=["session",a.Od,a.hc].join(":");this.be=b}wg.prototype.set=function(a,b){if(!b)if(this.be.length)b=this.be[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Qe,a)};wg.prototype.get=function(){var a=Qa(this.be,q(this.qg,this)),a=Pa(a,function(a){return null!==a});Xa(a,function(a,c){return ad(c.token)-ad(a.token)});return 0<a.length?a.shift():null};wg.prototype.qg=function(a){try{var b=a.get(this.Qe);if(b&&b.token)return b}catch(c){}return null};
wg.prototype.clear=function(){var a=this;Oa(this.be,function(b){b.remove(a.Qe)})};function xg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function yg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xg())}function zg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
function Ag(a){var b=xg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function Bg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function Cg(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function Dg(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
function Eg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function Fg(a){var b="";try{a=a.replace("#","");var c=lb(a);c&&v(c,"__firebase_request_key")&&(b=w(c,"__firebase_request_key"))}catch(d){}return b}function Gg(){var a=Pc(sg);return a.scheme+"://"+a.host+"/v2"}function Hg(a){return Gg()+"/"+a+"/auth/channel"};function Ig(a){var b=this;this.Ac=a;this.ce="*";Ag(8)?this.Rc=this.zd=Bg():(this.Rc=window.opener,this.zd=window);if(!b.Rc)throw"Unable to find relay frame";Cg(this.zd,"message",q(this.jc,this));Cg(this.zd,"message",q(this.Bf,this));try{Jg(this,{a:"ready"})}catch(c){Cg(this.Rc,"load",function(){Jg(b,{a:"ready"})})}Cg(window,"unload",q(this.Bg,this))}function Jg(a,b){b=B(b);Ag(8)?a.Rc.doPost(b,a.ce):a.Rc.postMessage(b,a.ce)}
Ig.prototype.jc=function(a){var b=this,c;try{c=nb(a.data)}catch(d){}c&&"request"===c.a&&(Dg(window,"message",this.jc),this.ce=a.origin,this.Ac&&setTimeout(function(){b.Ac(b.ce,c.d,function(a,c){b.dg=!c;b.Ac=void 0;Jg(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};Ig.prototype.Bg=function(){try{Dg(this.zd,"message",this.Bf)}catch(a){}this.Ac&&(Jg(this,{a:"error",d:"unknown closed window"}),this.Ac=void 0);try{window.close()}catch(b){}};Ig.prototype.Bf=function(a){if(this.dg&&"die"===a.data)try{window.close()}catch(b){}};function Kg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}Kg.prototype.open=function(a,b){yc.set("redirect_request_id",this.pc);yc.set("redirect_request_id",this.pc);b.requestId=this.pc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+kb(b);window.location=a};Kg.isAvailable=function(){return!zg()&&!yg()};Kg.prototype.Cc=function(){return"redirect"};var Lg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Mg(a){var b=Error(w(Lg,a),a);b.code=a;return b};function Ng(a){var b;(b=!a.window_features)||(b=xg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
Ng.prototype.open=function(a,b,c){function d(a){h&&(document.body.removeChild(h),h=void 0);t&&(t=clearInterval(t));Dg(window,"message",e);Dg(window,"unload",d);if(m&&!a)try{m.close()}catch(b){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=nb(a.data);"ready"===b.a?k.postMessage(z,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=Ag(8),h,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
var l=Eg(a);if(l!==Eg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(h=document.createElement("iframe"),h.setAttribute("src",this.options.relay_url),h.style.display="none",h.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(h),k=h.contentWindow);a+=(/\?/.test(a)?"":"?")+kb(b);var m=window.open(a,this.options.window_name,this.options.window_features);k||(k=m);var t=setInterval(function(){m&&m.closed&&
(d(!1),c&&(c(Mg("USER_CANCELLED")),c=null))},500),z=B({a:"request",d:b});Cg(window,"unload",d);Cg(window,"message",e)}};
Ng.isAvailable=function(){var a;if(a="postMessage"in window&&!zg())(a=yg()||"undefined"!==typeof navigator&&(!!xg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=xg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!xg().match(/PhantomJS/)};Ng.prototype.Cc=function(){return"popup"};function Og(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
Og.prototype.open=function(a,b,c){function d(){c&&(c(Mg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),h;Cg(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=nb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Mg("SERVER_ERROR")):c(Mg("NETWORK_ERROR"));c=null;Dg(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+kb(b),h=null;else{var k=this.options.headers.content_type;
"application/json"===k&&(h=B(b));"application/x-www-form-urlencoded"===k&&(h=kb(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};za(a,this.options.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(h)};Og.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=xg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||Ag(10);return a};Og.prototype.Cc=function(){return"json"};function Pg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}
Pg.prototype.open=function(a,b,c){function d(){c&&(c(Mg("USER_CANCELLED")),c=null)}var e=this,f=Pc(sg),h;b.requestId=this.pc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=kb(b);(h=window.open(a,"_blank","location=no"))&&ha(h.addEventListener)?(h.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var m=document.createElement("a");m.href=a.url;b=m.host===f.host&&"/blank/page.html"===m.pathname;break a}catch(t){}b=!1}b&&(a=Fg(a.url),h.removeEventListener("exit",
d),h.close(),a=new tg(null,null,{requestId:e.pc,requestKey:a}),e.Ef.requestWithCredential("/auth/session",a,c),c=null)}),h.addEventListener("exit",d)):c(Mg("TRANSPORT_UNAVAILABLE"))};Pg.isAvailable=function(){return yg()};Pg.prototype.Cc=function(){return"redirect"};function Qg(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
Qg.prototype.open=function(a,b,c){function d(){c&&(c(Mg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;wa(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);Dg(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+kb(b);
Cg(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Rg(f,a,c)};
function Rg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Mg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Mg("NETWORK_ERROR"))}},0)}Qg.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
Qg.prototype.Cc=function(){return"json"};function Sg(a,b,c,d){De.call(this,["auth_status"]);this.F=a;this.df=b;this.Vg=c;this.Le=d;this.sc=new wg(a,[xc,yc]);this.mb=null;this.Se=!1;Tg(this)}ma(Sg,De);g=Sg.prototype;g.xe=function(){return this.mb||null};function Tg(a){yc.get("redirect_request_id")&&Ug(a);var b=a.sc.get();b&&b.token?(Vg(a,b),a.df(b.token,function(c,d){Wg(a,c,d,!1,b.token,b)},function(b,d){Xg(a,"resumeSession()",b,d)})):Vg(a,null)}
function Yg(a,b,c,d,e,f){"firebaseio-demo.com"===a.F.domain&&O("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.df(b,function(f,k){Wg(a,f,k,!0,b,c,d||{},e)},function(b,c){Xg(a,"auth()",b,c,f)})}function Zg(a,b){a.sc.clear();Vg(a,null);a.Vg(function(a,d){if("ok"===a)P(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;P(b,f)}})}
function Wg(a,b,c,d,e,f,h,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=bd(e)?e:"",c=null,b&&v(b,"uid")?c=w(b,"uid"):v(f,"uid")&&(c=w(f,"uid")),f.uid=c,c="custom",b&&v(b,"provider")?c=w(b,"provider"):v(f,"provider")&&(c=w(f,"provider")),f.provider=c,a.sc.clear(),bd(e)&&(h=h||{},c=xc,"sessionOnly"===h.remember&&(c=yc),"none"!==h.remember&&a.sc.set(f,c)),Vg(a,f)),P(k,null,f)):(a.sc.clear(),Vg(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,P(k,f))}
function Xg(a,b,c,d,e){O(b+" was canceled: "+d);a.sc.clear();Vg(a,null);a=Error(d);a.code=c.toUpperCase();P(e,a)}function $g(a,b,c,d,e){ah(a);c=new tg(d||{},{},c||{});bh(a,[Og,Qg],"/auth/"+b,c,e)}
function ch(a,b,c,d){ah(a);var e=[Ng,Pg];c=vg(c);"anonymous"===b||"password"===b?setTimeout(function(){P(d,Mg("TRANSPORT_UNAVAILABLE"))},0):(c.ee.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.ee.relay_url=Hg(a.F.hc),c.ee.requestWithCredential=q(a.qc,a),bh(a,e,"/auth/"+b,c,d))}
function Ug(a){var b=yc.get("redirect_request_id");if(b){var c=yc.get("redirect_client_options");yc.remove("redirect_request_id");yc.remove("redirect_client_options");var d=[Og,Qg],b={requestId:b,requestKey:Fg(document.location.hash)},c=new tg(c,{},b);a.Se=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}bh(a,d,"/auth/session",c,function(){this.Se=!1}.bind(a))}}
g.se=function(a,b){ah(this);var c=vg(a);c.$a._method="POST";this.qc("/users",c,function(a,c){a?P(b,a):P(b,a,c)})};g.Te=function(a,b){var c=this;ah(this);var d="/users/"+encodeURIComponent(a.email),e=vg(a);e.$a._method="DELETE";this.qc(d,e,function(a,d){!a&&d&&d.uid&&c.mb&&c.mb.uid&&c.mb.uid===d.uid&&Zg(c);P(b,a)})};g.pe=function(a,b){ah(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=vg(a);d.$a._method="PUT";d.$a.password=a.newPassword;this.qc(c,d,function(a){P(b,a)})};
g.oe=function(a,b){ah(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=vg(a);d.$a._method="PUT";d.$a.email=a.newEmail;d.$a.password=a.password;this.qc(c,d,function(a){P(b,a)})};g.Ve=function(a,b){ah(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=vg(a);d.$a._method="POST";this.qc(c,d,function(a){P(b,a)})};g.qc=function(a,b,c){dh(this,[Og,Qg],a,b,c)};
function bh(a,b,c,d,e){dh(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?Yg(a,c.token,c,d.od,function(a,b){a?P(e,a):P(e,null,b)}):P(e,b||Mg("UNKNOWN_ERROR"))})}
function dh(a,b,c,d,e){b=Pa(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){P(e,Mg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.ee),d=jb(d.$a),d.v="js-"+hb,d.transport=b.Cc(),d.suppress_status_codes=!0,a=Gg()+"/"+a.F.hc+c,b.open(a,d,function(a,b){if(a)P(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;P(e,c)}else P(e,null,b)}))}
function Vg(a,b){var c=null!==a.mb||null!==b;a.mb=b;c&&a.fe("auth_status",b);a.Le(null!==b)}g.Ae=function(a){K("auth_status"===a,'initial event must be of type "auth_status"');return this.Se?null:[this.mb]};function ah(a){var b=a.F;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===sg)throw Error("This custom Firebase server ('"+a.F.domain+"') does not support delegated login.");};var Cc="websocket",Dc="long_polling";function eh(a){this.jc=a;this.Nd=[];this.Sb=0;this.qe=-1;this.Fb=null}function fh(a,b,c){a.qe=b;a.Fb=c;a.qe<a.Sb&&(a.Fb(),a.Fb=null)}function gh(a,b,c){for(a.Nd[b]=c;a.Nd[a.Sb];){var d=a.Nd[a.Sb];delete a.Nd[a.Sb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Db(function(){f.jc(d[e])})}if(a.Sb===a.qe){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Sb++}};function hh(a,b,c,d){this.re=a;this.f=Mc(a);this.nb=this.ob=0;this.Ua=Rb(b);this.Qf=c;this.Hc=!1;this.Bb=d;this.jd=function(a){return Bc(b,Dc,a)}}var ih,jh;
hh.prototype.open=function(a,b){this.hf=0;this.la=b;this.Af=new eh(a);this.zb=!1;var c=this;this.qb=setTimeout(function(){c.f("Timed out trying to connect.");c.gb();c.qb=null},Math.floor(3E4));Rc(function(){if(!c.zb){c.Sa=new kh(function(a,b,d,k,l){lh(c,arguments);if(c.Sa)if(c.qb&&(clearTimeout(c.qb),c.qb=null),c.Hc=!0,"start"==a)c.id=b,c.Gf=d;else if("close"===a)b?(c.Sa.Xd=!1,fh(c.Af,b,function(){c.gb()})):c.gb();else throw Error("Unrecognized command received: "+a);},function(a,b){lh(c,arguments);
gh(c.Af,a,b)},function(){c.gb()},c.jd);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Sa.he&&(a.cb=c.Sa.he);a.v="5";c.Qf&&(a.s=c.Qf);c.Bb&&(a.ls=c.Bb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.jd(a);c.f("Connecting via long-poll to "+a);mh(c.Sa,a,function(){})}})};
hh.prototype.start=function(){var a=this.Sa,b=this.Gf;a.ug=this.id;a.vg=b;for(a.le=!0;nh(a););a=this.id;b=this.Gf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.jd(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
hh.isAvailable=function(){return ih||!jh&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Xg)&&!0};g=hh.prototype;g.Ed=function(){};g.dd=function(){this.zb=!0;this.Sa&&(this.Sa.close(),this.Sa=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.qb&&(clearTimeout(this.qb),this.qb=null)};
g.gb=function(){this.zb||(this.f("Longpoll is closing itself"),this.dd(),this.la&&(this.la(this.Hc),this.la=null))};g.close=function(){this.zb||(this.f("Longpoll is being closed."),this.dd())};g.send=function(a){a=B(a);this.ob+=a.length;Ob(this.Ua,"bytes_sent",a.length);a=Ic(a);a=fb(a,!0);a=Vc(a,1840);for(var b=0;b<a.length;b++){var c=this.Sa;c.ad.push({Mg:this.hf,Ug:a.length,kf:a[b]});c.le&&nh(c);this.hf++}};function lh(a,b){var c=B(b).length;a.nb+=c;Ob(a.Ua,"bytes_received",c)}
function kh(a,b,c,d){this.jd=d;this.hb=c;this.Pe=new pg;this.ad=[];this.te=Math.floor(1E8*Math.random());this.Xd=!0;this.he=Ec();window["pLPCommand"+this.he]=a;window["pRTLPCB"+this.he]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||Cb("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.eb=a.contentDocument:a.contentWindow?a.eb=a.contentWindow.document:a.document&&(a.eb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.eb.open(),this.Ea.eb.write(a),this.Ea.eb.close()}catch(f){Cb("frame writing exception"),f.stack&&Cb(f.stack),Cb(f)}}
kh.prototype.close=function(){this.le=!1;if(this.Ea){this.Ea.eb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.hb;b&&(this.hb=null,b())};
function nh(a){if(a.le&&a.Xd&&a.Pe.count()<(0<a.ad.length?2:1)){a.te++;var b={};b.id=a.ug;b.pw=a.vg;b.ser=a.te;for(var b=a.jd(b),c="",d=0;0<a.ad.length;)if(1870>=a.ad[0].kf.length+30+c.length){var e=a.ad.shift(),c=c+"&seg"+d+"="+e.Mg+"&ts"+d+"="+e.Ug+"&d"+d+"="+e.kf;d++}else break;oh(a,b+c,a.te);return!0}return!1}function oh(a,b,c){function d(){a.Pe.remove(c);nh(a)}a.Pe.add(c,1);var e=setTimeout(d,Math.floor(25E3));mh(a,b,function(){clearTimeout(e);d()})}
function mh(a,b,c){setTimeout(function(){try{if(a.Xd){var d=a.Ea.eb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){Cb("Long-poll script failed to load: "+b);a.Xd=!1;a.close()};a.Ea.eb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var ph=null;"undefined"!==typeof MozWebSocket?ph=MozWebSocket:"undefined"!==typeof WebSocket&&(ph=WebSocket);function qh(a,b,c,d){this.re=a;this.f=Mc(this.re);this.frames=this.Kc=null;this.nb=this.ob=this.bf=0;this.Ua=Rb(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.ef=Bc(b,Cc,a)}var rh;
qh.prototype.open=function(a,b){this.hb=b;this.zg=a;this.f("Websocket connecting to "+this.ef);this.Hc=!1;xc.set("previous_websocket_failure",!0);try{this.ua=new ph(this.ef)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.gb();return}var e=this;this.ua.onopen=function(){e.f("Websocket connected.");e.Hc=!0};this.ua.onclose=function(){e.f("Websocket connection was disconnected.");e.ua=null;e.gb()};this.ua.onmessage=function(a){if(null!==e.ua)if(a=a.data,e.nb+=
a.length,Ob(e.Ua,"bytes_received",a.length),sh(e),null!==e.frames)th(e,a);else{a:{K(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.bf=b;e.frames=[];a=null;break a}}e.bf=1;e.frames=[]}null!==a&&th(e,a)}};this.ua.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.gb()}};qh.prototype.start=function(){};
qh.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==ph&&!rh};qh.responsesRequiredToBeHealthy=2;qh.healthyTimeout=3E4;g=qh.prototype;g.Ed=function(){xc.remove("previous_websocket_failure")};function th(a,b){a.frames.push(b);if(a.frames.length==a.bf){var c=a.frames.join("");a.frames=null;c=nb(c);a.zg(c)}}
g.send=function(a){sh(this);a=B(a);this.ob+=a.length;Ob(this.Ua,"bytes_sent",a.length);a=Vc(a,16384);1<a.length&&this.ua.send(String(a.length));for(var b=0;b<a.length;b++)this.ua.send(a[b])};g.dd=function(){this.zb=!0;this.Kc&&(clearInterval(this.Kc),this.Kc=null);this.ua&&(this.ua.close(),this.ua=null)};g.gb=function(){this.zb||(this.f("WebSocket is closing itself"),this.dd(),this.hb&&(this.hb(this.Hc),this.hb=null))};g.close=function(){this.zb||(this.f("WebSocket is being closed"),this.dd())};
function sh(a){clearInterval(a.Kc);a.Kc=setInterval(function(){a.ua&&a.ua.send("0");sh(a)},Math.floor(45E3))};function uh(a){vh(this,a)}var wh=[hh,qh];function vh(a,b){var c=qh&&qh.isAvailable(),d=c&&!(xc.wf||!0===xc.get("previous_websocket_failure"));b.Wg&&(c||O("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.gd=[qh];else{var e=a.gd=[];Wc(wh,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function xh(a){if(0<a.gd.length)return a.gd[0];throw Error("No transports available");};function yh(a,b,c,d,e,f,h){this.id=a;this.f=Mc("c:"+this.id+":");this.jc=c;this.Wc=d;this.la=e;this.Ne=f;this.F=b;this.Md=[];this.ff=0;this.Pf=new uh(b);this.Ta=0;this.Bb=h;this.f("Connection created");zh(this)}
function zh(a){var b=xh(a.Pf);a.J=new b("c:"+a.id+":"+a.ff++,a.F,void 0,a.Bb);a.Re=b.responsesRequiredToBeHealthy||0;var c=Ah(a,a.J),d=Bh(a,a.J);a.hd=a.J;a.cd=a.J;a.D=null;a.Ab=!1;setTimeout(function(){a.J&&a.J.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.yd=setTimeout(function(){a.yd=null;a.Ab||(a.J&&102400<a.J.nb?(a.f("Connection exceeded healthy timeout but has received "+a.J.nb+" bytes.  Marking connection healthy."),a.Ab=!0,a.J.Ed()):a.J&&10240<a.J.ob?a.f("Connection exceeded healthy timeout but has sent "+
a.J.ob+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function Bh(a,b){return function(c){b===a.J?(a.J=null,c||0!==a.Ta?1===a.Ta&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.F.Ya.substr(0,2)&&(xc.remove("host:"+a.F.host),a.F.Ya=a.F.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.hd!==c&&a.cd!==c||a.close()):a.f("closing an old connection")}}
function Ah(a,b){return function(c){if(2!=a.Ta)if(b===a.cd){var d=Tc("t",c);c=Tc("d",c);if("c"==d){if(d=Tc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Nf=c.s;Ac(a.F,f);0==a.Ta&&(a.J.start(),Ch(a,a.J,d),"5"!==e&&O("Protocol version mismatch detected"),c=a.Pf,(c=1<c.gd.length?c.gd[1]:null)&&Dh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.cd=a.D;for(c=0;c<a.Md.length;++c)a.Id(a.Md[c]);a.Md=[];Eh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.Ne&&(a.Ne(c),a.Ne=null),a.la=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ac(a.F,c),1===a.Ta?a.close():(Fh(a),zh(a))):"e"===d?Nc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Gh(a),Hh(a)):Nc("Unknown control packet command: "+d)}else"d"==d&&a.Id(c)}else if(b===a.D)if(d=Tc("t",c),c=Tc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Ih(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.hd!==a.D&&a.cd!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.Mf--,Ih(a)));else if("d"==d)a.Md.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}yh.prototype.Fa=function(a){Jh(this,{t:"d",d:a})};function Eh(a){a.hd===a.D&&a.cd===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.re),a.J=a.D,a.D=null)}
function Ih(a){0>=a.Mf?(a.f("Secondary connection is healthy."),a.Ab=!0,a.D.Ed(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.J.send({t:"c",d:{t:"n",d:{}}}),a.hd=a.D,Eh(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}yh.prototype.Id=function(a){Gh(this);this.jc(a)};function Gh(a){a.Ab||(a.Re--,0>=a.Re&&(a.f("Primary connection is healthy."),a.Ab=!0,a.J.Ed()))}
function Dh(a,b){a.D=new b("c:"+a.id+":"+a.ff++,a.F,a.Nf);a.Mf=b.responsesRequiredToBeHealthy||0;a.D.open(Ah(a,a.D),Bh(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function Ch(a,b,c){a.f("Realtime connection established.");a.J=b;a.Ta=1;a.Wc&&(a.Wc(c,a.Nf),a.Wc=null);0===a.Re?(a.f("Primary connection is healthy."),a.Ab=!0):setTimeout(function(){Hh(a)},Math.floor(5E3))}
function Hh(a){a.Ab||1!==a.Ta||(a.f("sending ping on primary."),Jh(a,{t:"c",d:{t:"p",d:{}}}))}function Jh(a,b){if(1!==a.Ta)throw"Connection is not connected";a.hd.send(b)}yh.prototype.close=function(){2!==this.Ta&&(this.f("Closing realtime connection."),this.Ta=2,Fh(this),this.la&&(this.la(),this.la=null))};function Fh(a){a.f("Shutting down all connections");a.J&&(a.J.close(),a.J=null);a.D&&(a.D.close(),a.D=null);a.yd&&(clearTimeout(a.yd),a.yd=null)};function Kh(a,b,c,d){this.id=Lh++;this.f=Mc("p:"+this.id+":");this.xf=this.Ee=!1;this.$={};this.qa=[];this.Yc=0;this.Vc=[];this.oa=!1;this.Za=1E3;this.Fd=3E5;this.Gb=b;this.Uc=c;this.Oe=d;this.F=a;this.sb=this.Aa=this.Ia=this.Bb=this.We=null;this.Ob=!1;this.Td={};this.Lg=0;this.nf=!0;this.Lc=this.Ge=null;Mh(this,0);He.ub().Eb("visible",this.Cg,this);-1===a.host.indexOf("fblocal")&&Ge.ub().Eb("online",this.Ag,this)}var Lh=0,Nh=0;g=Kh.prototype;
g.Fa=function(a,b,c){var d=++this.Lg;a={r:d,a:a,b:b};this.f(B(a));K(this.oa,"sendRequest call when we're not connected not allowed.");this.Ia.Fa(a);c&&(this.Td[d]=c)};g.yf=function(a,b,c,d){var e=a.va(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};K(fe(a.n)||!S(a.n),"listen() called for non-default but complete query");K(!this.$[f][e],"listen() called twice for same path/queryId.");a={H:d,xd:b,Ig:a,tag:c};this.$[f][e]=a;this.oa&&Oh(this,a)};
function Oh(a,b){var c=b.Ig,d=c.path.toString(),e=c.va();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=ee(c.n),f.t=b.tag);f.h=b.xd();a.Fa("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&v(k,"w")){var m=w(k,"w");ea(m)&&0<=Na(m,"no_index")&&O("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Ph(a,d,e),b.H&&b.H(l,
k))})}g.M=function(a,b,c){this.Aa={ig:a,of:!1,zc:b,md:c};this.f("Authenticating using credential: "+a);Qh(this);(b=40==a.length)||(a=$c(a).Bc,b="object"===typeof a&&!0===w(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Fd=3E4)};g.ge=function(a){delete this.Aa;this.oa&&this.Fa("unauth",{},function(b){a(b.s,b.d)})};
function Qh(a){var b=a.Aa;a.oa&&b&&a.Fa("auth",{cred:b.ig},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Aa===b&&delete a.Aa;b.of?"ok"!==d&&b.md&&b.md(d,c):(b.of=!0,b.zc&&b.zc(d,c))})}g.Rf=function(a,b){var c=a.path.toString(),d=a.va();this.f("Unlisten called for "+c+" "+d);K(fe(a.n)||!S(a.n),"unlisten() called for non-default but complete query");if(Ph(this,c,d)&&this.oa){var e=ee(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Fa("n",c)}};
g.Me=function(a,b,c){this.oa?Rh(this,"o",a,b,c):this.Vc.push({$c:a,action:"o",data:b,H:c})};g.Cf=function(a,b,c){this.oa?Rh(this,"om",a,b,c):this.Vc.push({$c:a,action:"om",data:b,H:c})};g.Jd=function(a,b){this.oa?Rh(this,"oc",a,null,b):this.Vc.push({$c:a,action:"oc",data:null,H:b})};function Rh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Fa(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Sh(this,"p",a,b,c,d)};
g.zf=function(a,b,c,d){Sh(this,"m",a,b,c,d)};function Sh(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.qa.push({action:b,Jf:d,H:e});a.Yc++;b=a.qa.length-1;a.oa?Th(a,b):a.f("Buffering put: "+c)}function Th(a,b){var c=a.qa[b].action,d=a.qa[b].Jf,e=a.qa[b].H;a.qa[b].Jg=a.oa;a.Fa(c,d,function(d){a.f(c+" response",d);delete a.qa[b];a.Yc--;0===a.Yc&&(a.qa=[]);e&&e(d.s,d.d)})}
g.Ue=function(a){this.oa&&(a={c:a},this.f("reportStats",a),this.Fa("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
g.Id=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Td[b];c&&(delete this.Td[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Gb(c.p,c.d,!1,c.t):"m"===b?this.Gb(c.p,c.d,!0,c.t):"c"===b?Uh(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Aa,delete this.Aa,c&&c.md&&c.md(a,b)):"sd"===b?this.We?this.We(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
"\nFIREBASE: ")):Nc("Unrecognized action received from server: "+B(b)+"\nAre you using the latest client?"))}};g.Wc=function(a,b){this.f("connection ready");this.oa=!0;this.Lc=(new Date).getTime();this.Oe({serverTimeOffset:a-(new Date).getTime()});this.Bb=b;if(this.nf){var c={};c["sdk.js."+hb.replace(/\./g,"-")]=1;yg()&&(c["framework.cordova"]=1);this.Ue(c)}Vh(this);this.nf=!1;this.Uc(!0)};
function Mh(a,b){K(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.sb&&clearTimeout(a.sb);a.sb=setTimeout(function(){a.sb=null;Wh(a)},Math.floor(b))}g.Cg=function(a){a&&!this.Ob&&this.Za===this.Fd&&(this.f("Window became visible.  Reducing delay."),this.Za=1E3,this.Ia||Mh(this,0));this.Ob=a};g.Ag=function(a){a?(this.f("Browser went online."),this.Za=1E3,this.Ia||Mh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
g.Df=function(){this.f("data client disconnected");this.oa=!1;this.Ia=null;for(var a=0;a<this.qa.length;a++){var b=this.qa[a];b&&"h"in b.Jf&&b.Jg&&(b.H&&b.H("disconnect"),delete this.qa[a],this.Yc--)}0===this.Yc&&(this.qa=[]);this.Td={};Xh(this)&&(this.Ob?this.Lc&&(3E4<(new Date).getTime()-this.Lc&&(this.Za=1E3),this.Lc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Za=this.Fd,this.Ge=(new Date).getTime()),a=Math.max(0,this.Za-((new Date).getTime()-this.Ge)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),Mh(this,a),this.Za=Math.min(this.Fd,1.3*this.Za));this.Uc(!1)};function Wh(a){if(Xh(a)){a.f("Making a connection attempt");a.Ge=(new Date).getTime();a.Lc=null;var b=q(a.Id,a),c=q(a.Wc,a),d=q(a.Df,a),e=a.id+":"+Nh++;a.Ia=new yh(e,a.F,b,c,d,function(b){O(b+" ("+a.F.toString()+")");a.xf=!0},a.Bb)}}g.yb=function(){this.Ee=!0;this.Ia?this.Ia.close():(this.sb&&(clearTimeout(this.sb),this.sb=null),this.oa&&this.Df())};g.rc=function(){this.Ee=!1;this.Za=1E3;this.Ia||Mh(this,0)};
function Uh(a,b,c){c=c?Qa(c,function(a){return Uc(a)}).join("$"):"default";(a=Ph(a,b,c))&&a.H&&a.H("permission_denied")}function Ph(a,b,c){b=(new L(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===pa(a.$[b])&&delete a.$[b]):d=void 0;return d}function Vh(a){Qh(a);r(a.$,function(b){r(b,function(b){Oh(a,b)})});for(var b=0;b<a.qa.length;b++)a.qa[b]&&Th(a,b);for(;a.Vc.length;)b=a.Vc.shift(),Rh(a,b.action,b.$c,b.data,b.H)}function Xh(a){var b;b=Ge.ub().kc;return!a.xf&&!a.Ee&&b};var V={og:function(){ih=rh=!0}};V.forceLongPolling=V.og;V.pg=function(){jh=!0};V.forceWebSockets=V.pg;V.Pg=function(a,b){a.k.Ra.We=b};V.setSecurityDebugCallback=V.Pg;V.Ye=function(a,b){a.k.Ye(b)};V.stats=V.Ye;V.Ze=function(a,b){a.k.Ze(b)};V.statsIncrementCounter=V.Ze;V.sd=function(a){return a.k.sd};V.dataUpdateCount=V.sd;V.sg=function(a,b){a.k.De=b};V.interceptServerData=V.sg;V.yg=function(a){new Ig(a)};V.onPopupOpen=V.yg;V.Ng=function(a){sg=a};V.setAuthenticationServer=V.Ng;function Q(a,b,c){this.A=a;this.W=b;this.g=c}Q.prototype.I=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.I()};Q.prototype.val=Q.prototype.I;Q.prototype.mf=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.I(!0)};Q.prototype.exportVal=Q.prototype.mf;Q.prototype.ng=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};Q.prototype.exists=Q.prototype.ng;
Q.prototype.u=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));ig("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.W.u(b);return new Q(this.A.Q(b),c,N)};Q.prototype.child=Q.prototype.u;Q.prototype.Da=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ig("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.A.Q(b).e()};Q.prototype.hasChild=Q.prototype.Da;
Q.prototype.C=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().I()};Q.prototype.getPriority=Q.prototype.C;Q.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.K())return!1;var b=this;return!!this.A.P(this.g,function(c,d){return a(new Q(d,b.W.u(c),N))})};Q.prototype.forEach=Q.prototype.forEach;
Q.prototype.wd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.K()?!1:!this.A.e()};Q.prototype.hasChildren=Q.prototype.wd;Q.prototype.name=function(){O("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");x("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};Q.prototype.name=Q.prototype.name;Q.prototype.key=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.W.key()};
Q.prototype.key=Q.prototype.key;Q.prototype.Db=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Db()};Q.prototype.numChildren=Q.prototype.Db;Q.prototype.Ib=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.W};Q.prototype.ref=Q.prototype.Ib;function Yh(a,b){this.F=a;this.Ua=Rb(a);this.fd=null;this.da=new vb;this.Hd=1;this.Ra=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.ba=new Ae(this.F,q(this.Gb,this)),setTimeout(q(this.Uc,this,!0),0)):this.ba=this.Ra=new Kh(this.F,q(this.Gb,this),q(this.Uc,this),q(this.Oe,this));this.Sg=Sb(a,q(function(){return new Mb(this.Ua,this.ba)},this));this.uc=new Rf;
this.Ce=new ob;var c=this;this.Cd=new vf({Xe:function(a,b,f,h){b=[];f=c.Ce.j(a.path);f.e()||(b=xf(c.Cd,new Xb(bf,a.path,f)),setTimeout(function(){h("ok")},0));return b},ae:ba});Zh(this,"connected",!1);this.la=new qc;this.M=new Sg(a,q(this.ba.M,this.ba),q(this.ba.ge,this.ba),q(this.Le,this));this.sd=0;this.De=null;this.L=new vf({Xe:function(a,b,f,h){c.ba.yf(a,f,b,function(b,e){var f=h(b,e);Ab(c.da,a.path,f)});return[]},ae:function(a,b){c.ba.Rf(a,b)}})}g=Yh.prototype;
g.toString=function(){return(this.F.kb?"https://":"http://")+this.F.host};g.name=function(){return this.F.hc};function $h(a){a=a.Ce.j(new L(".info/serverTimeOffset")).I()||0;return(new Date).getTime()+a}function ai(a){a=a={timestamp:$h(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
g.Gb=function(a,b,c,d){this.sd++;var e=new L(a);b=this.De?this.De(a,b):b;a=[];d?c?(b=na(b,function(a){return M(a)}),a=Ff(this.L,e,b,d)):(b=M(b),a=Bf(this.L,e,b,d)):c?(d=na(b,function(a){return M(a)}),a=Af(this.L,e,d)):(d=M(b),a=xf(this.L,new Xb(bf,e,d)));d=e;0<a.length&&(d=bi(this,e));Ab(this.da,d,a)};g.Uc=function(a){Zh(this,"connected",a);!1===a&&ci(this)};g.Oe=function(a){var b=this;Wc(a,function(a,d){Zh(b,d,a)})};g.Le=function(a){Zh(this,"authenticated",a)};
function Zh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.Ce;d.Wd=d.Wd.G(b,c);c=xf(a.Cd,new Xb(bf,b,c));Ab(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,$g:c});var e=ai(this);b=M(b,c);var e=sc(b,e),f=this.Hd++,e=wf(this.L,a,e,f,!0);wb(this.da,e);var h=this;this.ba.put(a.toString(),b.I(!0),function(b,c){var e="ok"===b;e||O("set at "+a+" failed: "+b);e=zf(h.L,f,!e);Ab(h.da,a,e);di(d,b,c)});e=ei(this,a);bi(this,e);Ab(this.da,e,[])};
g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=ai(this),f={};r(b,function(a,b){d=!1;var c=M(a);f[b]=sc(c,e)});if(d)Cb("update() called with empty data.  Don't do anything."),di(c,"ok");else{var h=this.Hd++,k=yf(this.L,a,f,h);wb(this.da,k);var l=this;this.ba.zf(a.toString(),b,function(b,d){var e="ok"===b;e||O("update at "+a+" failed: "+b);var e=zf(l.L,h,!e),f=a;0<e.length&&(f=bi(l,a));Ab(l.da,f,e);di(c,b,d)});b=ei(this,a);bi(this,b);Ab(this.da,a,[])}};
function ci(a){a.f("onDisconnectEvents");var b=ai(a),c=[];rc(pc(a.la,b),G,function(b,e){c=c.concat(xf(a.L,new Xb(bf,b,e)));var f=ei(a,b);bi(a,f)});a.la=new qc;Ab(a.da,G,c)}g.Jd=function(a,b){var c=this;this.ba.Jd(a.toString(),function(d,e){"ok"===d&&rg(c.la,a);di(b,d,e)})};function fi(a,b,c,d){var e=M(c);a.ba.Me(b.toString(),e.I(!0),function(c,h){"ok"===c&&a.la.nc(b,e);di(d,c,h)})}function gi(a,b,c,d,e){var f=M(c,d);a.ba.Me(b.toString(),f.I(!0),function(c,d){"ok"===c&&a.la.nc(b,f);di(e,c,d)})}
function hi(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(Cb("onDisconnect().update() called with empty data.  Don't do anything."),di(d,"ok")):a.ba.Cf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=M(c[l]);a.la.nc(b.u(l),m)}di(d,e,f)})}function ii(a,b,c){c=".info"===E(b.path)?a.Cd.Pb(b,c):a.L.Pb(b,c);yb(a.da,b.path,c)}g.yb=function(){this.Ra&&this.Ra.yb()};g.rc=function(){this.Ra&&this.Ra.rc()};
g.Ye=function(a){if("undefined"!==typeof console){a?(this.fd||(this.fd=new Lb(this.Ua)),a=this.fd.get()):a=this.Ua.get();var b=Ra(sa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ze=function(a){Ob(this.Ua,a);this.Sg.Of[a]=!0};g.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");Cb(b,arguments)};
function di(a,b,c){a&&Db(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ji(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.Eb("value",f);c={path:b,update:c,H:d,status:null,Ff:Ec(),cf:e,Lf:0,ie:function(){h.ic("value",f)},ke:null,Ba:null,pd:null,qd:null,rd:null};d=a.L.za(b,void 0)||C;c.pd=d;d=c.update(d.I());if(n(d)){cg("transaction failed: Data returned ",d,c.path);c.status=1;e=Sf(a.uc,b);var k=e.Ca()||[];k.push(c);Tf(e,k);"object"===typeof d&&null!==d&&v(d,".priority")?(k=w(d,".priority"),K(ag(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.L.za(b)||C).C().I();e=ai(a);d=M(d,k);e=sc(d,e);c.qd=d;c.rd=e;c.Ba=a.Hd++;c=wf(a.L,b,e,c.Ba,c.cf);Ab(a.da,b,c);ki(a)}else c.ie(),c.qd=null,c.rd=null,c.H&&(a=new Q(c.pd,new U(a,c.path),N),c.H(null,!1,a))}function ki(a,b){var c=b||a.uc;b||li(a,c);if(null!==c.Ca()){var d=mi(a,c);K(0<d.length,"Sending zero length transaction queue");Sa(d,function(a){return 1===a.status})&&ni(a,c.path(),d)}else c.wd()&&c.P(function(b){ki(a,b)})}
function ni(a,b,c){for(var d=Qa(c,function(a){return a.Ba}),e=a.L.za(b,d)||C,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];K(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.Lf++;var k=T(b,h.path),d=d.G(k,h.qd)}d=d.I(!0);a.ba.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(zf(a.L,c[f].Ba));if(c[f].H){var h=c[f].rd,k=new U(a,c[f].path);d.push(q(c[f].H,
null,null,!0,new Q(h,k,N)))}c[f].ie()}li(a,Sf(a.uc,b));ki(a);Ab(a.da,b,e);for(f=0;f<d.length;f++)Db(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(O("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].ke=d;bi(a,b)}},e)}function bi(a,b){var c=oi(a,b),d=c.path(),c=mi(a,c);pi(a,c,d);return d}
function pi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Qa(b,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],l=T(c,k.path),m=!1,t;K(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,t=k.ke,e=e.concat(zf(a.L,k.Ba,!0));else if(1===k.status)if(25<=k.Lf)m=!0,t="maxretry",e=e.concat(zf(a.L,k.Ba,!0));else{var z=a.L.za(k.path,f)||C;k.pd=z;var I=b[h].update(z.I());n(I)?(cg("transaction failed: Data returned ",I,k.path),l=M(I),"object"===typeof I&&null!=
I&&v(I,".priority")||(l=l.ga(z.C())),z=k.Ba,I=ai(a),I=sc(l,I),k.qd=l,k.rd=I,k.Ba=a.Hd++,Va(f,z),e=e.concat(wf(a.L,k.path,I,k.Ba,k.cf)),e=e.concat(zf(a.L,z,!0))):(m=!0,t="nodata",e=e.concat(zf(a.L,k.Ba,!0)))}Ab(a.da,c,e);e=[];m&&(b[h].status=3,setTimeout(b[h].ie,Math.floor(0)),b[h].H&&("nodata"===t?(k=new U(a,b[h].path),d.push(q(b[h].H,null,null,!1,new Q(b[h].pd,k,N)))):d.push(q(b[h].H,null,Error(t),!1,null))))}li(a,a.uc);for(h=0;h<d.length;h++)Db(d[h]);ki(a)}}
function oi(a,b){for(var c,d=a.uc;null!==(c=E(b))&&null===d.Ca();)d=Sf(d,c),b=H(b);return d}function mi(a,b){var c=[];qi(a,b,c);c.sort(function(a,b){return a.Ff-b.Ff});return c}function qi(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.P(function(b){qi(a,b,c)})}function li(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Tf(b,0<c.length?c:null)}b.P(function(b){li(a,b)})}
function ei(a,b){var c=oi(a,b).path(),d=Sf(a.uc,b);Wf(d,function(b){ri(a,b)});ri(a,d);Vf(d,function(b){ri(a,b)});return c}
function ri(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(K(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].ke="set"):(K(1===c[h].status,"Unexpected transaction status in abort"),c[h].ie(),e=e.concat(zf(a.L,c[h].Ba,!0)),c[h].H&&d.push(q(c[h].H,null,Error("set"),!1,null))));-1===f?Tf(b,null):c.length=f+1;Ab(a.da,b.path(),e);for(h=0;h<d.length;h++)Db(d[h])}};function W(){this.oc={};this.Sf=!1}W.prototype.yb=function(){for(var a in this.oc)this.oc[a].yb()};W.prototype.rc=function(){for(var a in this.oc)this.oc[a].rc()};W.prototype.ve=function(){this.Sf=!0};ca(W);W.prototype.interrupt=W.prototype.yb;W.prototype.resume=W.prototype.rc;function X(a,b){this.bd=a;this.ra=b}X.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);this.bd.Jd(this.ra,a||null)};X.prototype.cancel=X.prototype.cancel;X.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);jg("Firebase.onDisconnect().remove",this.ra);A("Firebase.onDisconnect().remove",1,a,!0);fi(this.bd,this.ra,null,a)};X.prototype.remove=X.prototype.remove;
X.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);jg("Firebase.onDisconnect().set",this.ra);bg("Firebase.onDisconnect().set",a,this.ra,!1);A("Firebase.onDisconnect().set",2,b,!0);fi(this.bd,this.ra,a,b)};X.prototype.set=X.prototype.set;
X.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);jg("Firebase.onDisconnect().setWithPriority",this.ra);bg("Firebase.onDisconnect().setWithPriority",a,this.ra,!1);fg("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);gi(this.bd,this.ra,a,b,c)};X.prototype.setWithPriority=X.prototype.Kb;
X.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);jg("Firebase.onDisconnect().update",this.ra);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}eg("Firebase.onDisconnect().update",a,this.ra);A("Firebase.onDisconnect().update",2,b,!0);
hi(this.bd,this.ra,a,b)};X.prototype.update=X.prototype.update;function Y(a,b,c,d){this.k=a;this.path=b;this.n=c;this.lc=d}
function si(a){var b=null,c=null;a.ma&&(b=nd(a));a.pa&&(c=pd(a));if(a.g===Qd){if(a.ma){if("[MIN_NAME]"!=md(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.pa){if("[MAX_NAME]"!=od(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!ag(b)||null!=c&&!ag(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(K(a.g instanceof Ud||a.g===$d,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function ti(a){if(a.ma&&a.pa&&a.ja&&(!a.ja||""===a.Nb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function ui(a,b){if(!0===a.lc)throw Error(b+": You can't combine multiple orderBy calls.");}g=Y.prototype;g.Ib=function(){x("Query.ref",0,0,arguments.length);return new U(this.k,this.path)};
g.Eb=function(a,b,c,d){x("Query.on",2,4,arguments.length);gg("Query.on",a,!1);A("Query.on",2,b,!1);var e=vi("Query.on",c,d);if("value"===a)ii(this.k,this,new id(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;ii(this.k,this,new jd(f,e.cancel,e.Ma))}return b};
g.ic=function(a,b,c){x("Query.off",0,3,arguments.length);gg("Query.off",a,!0);A("Query.off",2,b,!0);mb("Query.off",3,c);var d=null,e=null;"value"===a?d=new id(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new jd(e,null,c||null));e=this.k;d=".info"===E(this.path)?e.Cd.jb(this,d):e.L.jb(this,d);yb(e.da,this.path,d)};
g.Dg=function(a,b){function c(h){f&&(f=!1,e.ic(a,c),b.call(d.Ma,h))}x("Query.once",2,4,arguments.length);gg("Query.once",a,!1);A("Query.once",2,b,!1);var d=vi("Query.once",arguments[2],arguments[3]),e=this,f=!0;this.Eb(a,c,function(b){e.ic(a,c);d.cancel&&d.cancel.call(d.Ma,b)})};
g.He=function(a){O("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");x("Query.limit",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.n.ja)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.n.He(a);ti(b);return new Y(this.k,this.path,b,this.lc)};
g.Ie=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.ja)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Ie(a),this.lc)};
g.Je=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.ja)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Je(a),this.lc)};
g.Eg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ig("Query.orderByChild",a);ui(this,"Query.orderByChild");var b=new L(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
b=new Ud(b);b=de(this.n,b);si(b);return new Y(this.k,this.path,b,!0)};g.Fg=function(){x("Query.orderByKey",0,0,arguments.length);ui(this,"Query.orderByKey");var a=de(this.n,Qd);si(a);return new Y(this.k,this.path,a,!0)};g.Gg=function(){x("Query.orderByPriority",0,0,arguments.length);ui(this,"Query.orderByPriority");var a=de(this.n,N);si(a);return new Y(this.k,this.path,a,!0)};
g.Hg=function(){x("Query.orderByValue",0,0,arguments.length);ui(this,"Query.orderByValue");var a=de(this.n,$d);si(a);return new Y(this.k,this.path,a,!0)};g.$d=function(a,b){x("Query.startAt",0,2,arguments.length);bg("Query.startAt",a,this.path,!0);hg("Query.startAt",b);var c=this.n.$d(a,b);ti(c);si(c);if(this.n.ma)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new Y(this.k,this.path,c,this.lc)};
g.td=function(a,b){x("Query.endAt",0,2,arguments.length);bg("Query.endAt",a,this.path,!0);hg("Query.endAt",b);var c=this.n.td(a,b);ti(c);si(c);if(this.n.pa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.lc)};
g.kg=function(a,b){x("Query.equalTo",1,2,arguments.length);bg("Query.equalTo",a,this.path,!1);hg("Query.equalTo",b);if(this.n.ma)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.pa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.$d(a,b).td(a,b)};
g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.k.toString()+(b||"/")};g.va=function(){var a=Uc(ee(this.n));return"{}"===a?"default":a};
function vi(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,mb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(y(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.ref=Y.prototype.Ib;Y.prototype.on=Y.prototype.Eb;Y.prototype.off=Y.prototype.ic;Y.prototype.once=Y.prototype.Dg;Y.prototype.limit=Y.prototype.He;Y.prototype.limitToFirst=Y.prototype.Ie;
Y.prototype.limitToLast=Y.prototype.Je;Y.prototype.orderByChild=Y.prototype.Eg;Y.prototype.orderByKey=Y.prototype.Fg;Y.prototype.orderByPriority=Y.prototype.Gg;Y.prototype.orderByValue=Y.prototype.Hg;Y.prototype.startAt=Y.prototype.$d;Y.prototype.endAt=Y.prototype.td;Y.prototype.equalTo=Y.prototype.kg;Y.prototype.toString=Y.prototype.toString;var Z={};Z.vc=Kh;Z.DataConnection=Z.vc;Kh.prototype.Rg=function(a,b){this.Fa("q",{p:a},b)};Z.vc.prototype.simpleListen=Z.vc.prototype.Rg;Kh.prototype.jg=function(a,b){this.Fa("echo",{d:a},b)};Z.vc.prototype.echo=Z.vc.prototype.jg;Kh.prototype.interrupt=Kh.prototype.yb;Z.Vf=yh;Z.RealTimeConnection=Z.Vf;yh.prototype.sendRequest=yh.prototype.Fa;yh.prototype.close=yh.prototype.close;
Z.rg=function(a){var b=Kh.prototype.put;Kh.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Kh.prototype.put=b}};Z.hijackHash=Z.rg;Z.Uf=zc;Z.ConnectionTarget=Z.Uf;Z.va=function(a){return a.va()};Z.queryIdentifier=Z.va;Z.tg=function(a){return a.k.Ra.$};Z.listens=Z.tg;Z.ve=function(a){a.ve()};Z.forceRestClient=Z.ve;function U(a,b){var c,d,e;if(a instanceof Yh)c=a,d=b;else{x("new Firebase",1,2,arguments.length);d=Pc(arguments[0]);c=d.Tg;"firebase"===d.domain&&Oc(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||Oc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.kb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&O("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
c=new zc(d.host,d.kb,c,"ws"===d.scheme||"wss"===d.scheme);d=new L(d.$c);e=d.toString();var f;!(f=!p(c.host)||0===c.host.length||!$f(c.hc))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(p(e)&&0!==e.length&&!Yf.test(e)));if(f)throw Error(y("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof W)e=b;else if(p(b))e=W.ub(),c.Od=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
else e=W.ub();f=c.toString();var h=w(e.oc,f);h||(h=new Yh(c,e.Sf),e.oc[f]=h);c=h}Y.call(this,c,d,be,!1)}ma(U,Y);var wi=U,xi=["Firebase"],yi=aa;xi[0]in yi||!yi.execScript||yi.execScript("var "+xi[0]);for(var zi;xi.length&&(zi=xi.shift());)!xi.length&&n(wi)?yi[zi]=wi:yi=yi[zi]?yi[zi]:yi[zi]={};U.goOffline=function(){x("Firebase.goOffline",0,0,arguments.length);W.ub().yb()};U.goOnline=function(){x("Firebase.goOnline",0,0,arguments.length);W.ub().rc()};
function Lc(a,b){K(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Bb=q(console.log,console):"object"===typeof console.log&&(Bb=function(a){console.log(a)})),b&&yc.set("logging_enabled",!0)):a?Bb=a:(Bb=null,yc.remove("logging_enabled"))}U.enableLogging=Lc;U.ServerValue={TIMESTAMP:{".sv":"timestamp"}};U.SDK_VERSION=hb;U.INTERNAL=V;U.Context=W;U.TEST_ACCESS=Z;
U.prototype.name=function(){O("Firebase.name() being deprecated. Please use Firebase.key() instead.");x("Firebase.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;U.prototype.key=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:Ld(this.path)};U.prototype.key=U.prototype.key;
U.prototype.u=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof L))if(null===E(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ig("Firebase.child",b)}else ig("Firebase.child",a);return new U(this.k,this.path.u(a))};U.prototype.child=U.prototype.u;U.prototype.parent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.k,a)};U.prototype.parent=U.prototype.parent;
U.prototype.root=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};U.prototype.root=U.prototype.root;U.prototype.set=function(a,b){x("Firebase.set",1,2,arguments.length);jg("Firebase.set",this.path);bg("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);this.k.Kb(this.path,a,null,b||null)};U.prototype.set=U.prototype.set;
U.prototype.update=function(a,b){x("Firebase.update",1,2,arguments.length);jg("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}eg("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);this.k.update(this.path,a,b||null)};U.prototype.update=U.prototype.update;
U.prototype.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);jg("Firebase.setWithPriority",this.path);bg("Firebase.setWithPriority",a,this.path,!1);fg("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";this.k.Kb(this.path,a,b,c||null)};U.prototype.setWithPriority=U.prototype.Kb;
U.prototype.remove=function(a){x("Firebase.remove",0,1,arguments.length);jg("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);this.set(null,a)};U.prototype.remove=U.prototype.remove;
U.prototype.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);jg("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(y("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);ji(this.k,this.path,a,b||null,c)};U.prototype.transaction=U.prototype.transaction;
U.prototype.Og=function(a,b){x("Firebase.setPriority",1,2,arguments.length);jg("Firebase.setPriority",this.path);fg("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);this.k.Kb(this.path.u(".priority"),a,null,b)};U.prototype.setPriority=U.prototype.Og;
U.prototype.push=function(a,b){x("Firebase.push",0,2,arguments.length);jg("Firebase.push",this.path);bg("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=$h(this.k),c=Fe(c),c=this.u(c);"undefined"!==typeof a&&null!==a&&c.set(a,b);return c};U.prototype.push=U.prototype.push;U.prototype.hb=function(){jg("Firebase.onDisconnect",this.path);return new X(this.k,this.path)};U.prototype.onDisconnect=U.prototype.hb;
U.prototype.M=function(a,b,c){O("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");x("Firebase.auth",1,3,arguments.length);kg("Firebase.auth",a);A("Firebase.auth",2,b,!0);A("Firebase.auth",3,b,!0);Yg(this.k.M,a,{},{remember:"none"},b,c)};U.prototype.auth=U.prototype.M;U.prototype.ge=function(a){x("Firebase.unauth",0,1,arguments.length);A("Firebase.unauth",1,a,!0);Zg(this.k.M,a)};U.prototype.unauth=U.prototype.ge;
U.prototype.xe=function(){x("Firebase.getAuth",0,0,arguments.length);return this.k.M.xe()};U.prototype.getAuth=U.prototype.xe;U.prototype.xg=function(a,b){x("Firebase.onAuth",1,2,arguments.length);A("Firebase.onAuth",1,a,!1);mb("Firebase.onAuth",2,b);this.k.M.Eb("auth_status",a,b)};U.prototype.onAuth=U.prototype.xg;U.prototype.wg=function(a,b){x("Firebase.offAuth",1,2,arguments.length);A("Firebase.offAuth",1,a,!1);mb("Firebase.offAuth",2,b);this.k.M.ic("auth_status",a,b)};U.prototype.offAuth=U.prototype.wg;
U.prototype.Zf=function(a,b,c){x("Firebase.authWithCustomToken",2,3,arguments.length);kg("Firebase.authWithCustomToken",a);A("Firebase.authWithCustomToken",2,b,!1);ng("Firebase.authWithCustomToken",3,c,!0);Yg(this.k.M,a,{},c||{},b)};U.prototype.authWithCustomToken=U.prototype.Zf;U.prototype.$f=function(a,b,c){x("Firebase.authWithOAuthPopup",2,3,arguments.length);mg("Firebase.authWithOAuthPopup",a);A("Firebase.authWithOAuthPopup",2,b,!1);ng("Firebase.authWithOAuthPopup",3,c,!0);ch(this.k.M,a,c,b)};
U.prototype.authWithOAuthPopup=U.prototype.$f;U.prototype.ag=function(a,b,c){x("Firebase.authWithOAuthRedirect",2,3,arguments.length);mg("Firebase.authWithOAuthRedirect",a);A("Firebase.authWithOAuthRedirect",2,b,!1);ng("Firebase.authWithOAuthRedirect",3,c,!0);var d=this.k.M;ah(d);var e=[Kg],f=vg(c);"anonymous"===a||"firebase"===a?P(b,Mg("TRANSPORT_UNAVAILABLE")):(yc.set("redirect_client_options",f.od),bh(d,e,"/auth/"+a,f,b))};U.prototype.authWithOAuthRedirect=U.prototype.ag;
U.prototype.bg=function(a,b,c,d){x("Firebase.authWithOAuthToken",3,4,arguments.length);mg("Firebase.authWithOAuthToken",a);A("Firebase.authWithOAuthToken",3,c,!1);ng("Firebase.authWithOAuthToken",4,d,!0);p(b)?(lg("Firebase.authWithOAuthToken",2,b),$g(this.k.M,a+"/token",{access_token:b},d,c)):(ng("Firebase.authWithOAuthToken",2,b,!1),$g(this.k.M,a+"/token",b,d,c))};U.prototype.authWithOAuthToken=U.prototype.bg;
U.prototype.Yf=function(a,b){x("Firebase.authAnonymously",1,2,arguments.length);A("Firebase.authAnonymously",1,a,!1);ng("Firebase.authAnonymously",2,b,!0);$g(this.k.M,"anonymous",{},b,a)};U.prototype.authAnonymously=U.prototype.Yf;
U.prototype.cg=function(a,b,c){x("Firebase.authWithPassword",2,3,arguments.length);ng("Firebase.authWithPassword",1,a,!1);og("Firebase.authWithPassword",a,"email");og("Firebase.authWithPassword",a,"password");A("Firebase.authWithPassword",2,b,!1);ng("Firebase.authWithPassword",3,c,!0);$g(this.k.M,"password",a,c,b)};U.prototype.authWithPassword=U.prototype.cg;
U.prototype.se=function(a,b){x("Firebase.createUser",2,2,arguments.length);ng("Firebase.createUser",1,a,!1);og("Firebase.createUser",a,"email");og("Firebase.createUser",a,"password");A("Firebase.createUser",2,b,!1);this.k.M.se(a,b)};U.prototype.createUser=U.prototype.se;U.prototype.Te=function(a,b){x("Firebase.removeUser",2,2,arguments.length);ng("Firebase.removeUser",1,a,!1);og("Firebase.removeUser",a,"email");og("Firebase.removeUser",a,"password");A("Firebase.removeUser",2,b,!1);this.k.M.Te(a,b)};
U.prototype.removeUser=U.prototype.Te;U.prototype.pe=function(a,b){x("Firebase.changePassword",2,2,arguments.length);ng("Firebase.changePassword",1,a,!1);og("Firebase.changePassword",a,"email");og("Firebase.changePassword",a,"oldPassword");og("Firebase.changePassword",a,"newPassword");A("Firebase.changePassword",2,b,!1);this.k.M.pe(a,b)};U.prototype.changePassword=U.prototype.pe;
U.prototype.oe=function(a,b){x("Firebase.changeEmail",2,2,arguments.length);ng("Firebase.changeEmail",1,a,!1);og("Firebase.changeEmail",a,"oldEmail");og("Firebase.changeEmail",a,"newEmail");og("Firebase.changeEmail",a,"password");A("Firebase.changeEmail",2,b,!1);this.k.M.oe(a,b)};U.prototype.changeEmail=U.prototype.oe;
U.prototype.Ve=function(a,b){x("Firebase.resetPassword",2,2,arguments.length);ng("Firebase.resetPassword",1,a,!1);og("Firebase.resetPassword",a,"email");A("Firebase.resetPassword",2,b,!1);this.k.M.Ve(a,b)};U.prototype.resetPassword=U.prototype.Ve;})();


/*!
 * AngularFire is the officially supported AngularJS binding for Firebase. Firebase
 * is a full backend so you don't need servers to build your Angular app. AngularFire
 * provides you with the $firebase service which allows you to easily keep your $scope
 * variables in sync with your Firebase backend.
 *
 * AngularFire 1.1.3
 * https://github.com/firebase/angularfire/
 * Date: 09/29/2015
 * License: MIT
 */
!function(a){"use strict";angular.module("firebase",[]).value("Firebase",a.Firebase)}(window),function(){"use strict";angular.module("firebase").factory("$firebaseArray",["$log","$firebaseUtils","$q",function(a,b,c){function d(a){if(!(this instanceof d))return new d(a);var c=this;return this._observers=[],this.$list=[],this._ref=a,this._sync=new e(this),b.assertValidRef(a,"Must pass a valid Firebase reference to $firebaseArray (not a string or URL)"),this._indexCache={},b.getPublicMethods(c,function(a,b){c.$list[b]=a.bind(c)}),this._sync.init(this.$list),this.$list}function e(d){function e(a){if(!r.isDestroyed){r.isDestroyed=!0;var b=d.$ref();b.off("child_added",j),b.off("child_moved",l),b.off("child_changed",k),b.off("child_removed",m),d=null,q(a||"destroyed")}}function f(b){var c=d.$ref();c.on("child_added",j,p),c.on("child_moved",l,p),c.on("child_changed",k,p),c.on("child_removed",m,p),c.once("value",function(c){angular.isArray(c.val())&&a.warn("Storing data using array indices in Firebase can result in unexpected behavior. See https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase for more information."),q(null,b)},q)}function g(a,b){o||(o=!0,a?i.reject(a):i.resolve(b))}function h(a,b){var d=c.when(a);d.then(function(a){a&&b(a)}),o||n.push(d)}var i=b.defer(),j=function(a,b){h(d.$$added(a,b),function(a){d.$$process("child_added",a,b)})},k=function(a){var c=d.$getRecord(b.getKey(a));c&&h(d.$$updated(a),function(){d.$$process("child_changed",c)})},l=function(a,c){var e=d.$getRecord(b.getKey(a));e&&h(d.$$moved(a,c),function(){d.$$process("child_moved",e,c)})},m=function(a){var c=d.$getRecord(b.getKey(a));c&&h(d.$$removed(a),function(){d.$$process("child_removed",c)})},n=[],o=!1,p=b.batch(function(a){g(a),d&&d.$$error(a)}),q=b.batch(g),r={destroy:e,isDestroyed:!1,init:f,ready:function(){return i.promise.then(function(a){return c.all(n).then(function(){return a})})}};return r}return d.prototype={$add:function(a){this._assertNotDestroyed("$add");var c=b.defer(),d=this.$ref().ref().push();return d.set(b.toJSON(a),b.makeNodeResolver(c)),c.promise.then(function(){return d})},$save:function(a){this._assertNotDestroyed("$save");var c=this,d=c._resolveItem(a),e=c.$keyAt(d);if(null!==e){var f=c.$ref().ref().child(e),g=b.toJSON(d);return b.doSet(f,g).then(function(){return c.$$notify("child_changed",e),f})}return b.reject("Invalid record; could determine key for "+a)},$remove:function(a){this._assertNotDestroyed("$remove");var c=this.$keyAt(a);if(null!==c){var d=this.$ref().ref().child(c);return b.doRemove(d).then(function(){return d})}return b.reject("Invalid record; could not determine key for "+a)},$keyAt:function(a){var b=this._resolveItem(a);return this.$$getKey(b)},$indexFor:function(a){var b=this,c=b._indexCache;if(!c.hasOwnProperty(a)||b.$keyAt(c[a])!==a){var d=b.$list.findIndex(function(c){return b.$$getKey(c)===a});-1!==d&&(c[a]=d)}return c.hasOwnProperty(a)?c[a]:-1},$loaded:function(a,b){var c=this._sync.ready();return arguments.length&&(c=c.then.call(c,a,b)),c},$ref:function(){return this._ref},$watch:function(a,b){var c=this._observers;return c.push([a,b]),function(){var d=c.findIndex(function(c){return c[0]===a&&c[1]===b});d>-1&&c.splice(d,1)}},$destroy:function(a){this._isDestroyed||(this._isDestroyed=!0,this._sync.destroy(a),this.$list.length=0)},$getRecord:function(a){var b=this.$indexFor(a);return b>-1?this.$list[b]:null},$$added:function(a){var c=this.$indexFor(b.getKey(a));if(-1===c){var d=a.val();return angular.isObject(d)||(d={$value:d}),d.$id=b.getKey(a),d.$priority=a.getPriority(),b.applyDefaults(d,this.$$defaults),d}return!1},$$removed:function(a){return this.$indexFor(b.getKey(a))>-1},$$updated:function(a){var c=!1,d=this.$getRecord(b.getKey(a));return angular.isObject(d)&&(c=b.updateRec(d,a),b.applyDefaults(d,this.$$defaults)),c},$$moved:function(a){var c=this.$getRecord(b.getKey(a));return angular.isObject(c)?(c.$priority=a.getPriority(),!0):!1},$$error:function(b){a.error(b),this.$destroy(b)},$$getKey:function(a){return angular.isObject(a)?a.$id:null},$$process:function(a,b,c){var d,e=this.$$getKey(b),f=!1;switch(a){case"child_added":d=this.$indexFor(e);break;case"child_moved":d=this.$indexFor(e),this._spliceOut(e);break;case"child_removed":f=null!==this._spliceOut(e);break;case"child_changed":f=!0;break;default:throw new Error("Invalid event type: "+a)}return angular.isDefined(d)&&(f=this._addAfter(b,c)!==d),f&&this.$$notify(a,e,c),f},$$notify:function(a,b,c){var d={event:a,key:b};angular.isDefined(c)&&(d.prevChild=c),angular.forEach(this._observers,function(a){a[0].call(a[1],d)})},_addAfter:function(a,b){var c;return null===b?c=0:(c=this.$indexFor(b)+1,0===c&&(c=this.$list.length)),this.$list.splice(c,0,a),this._indexCache[this.$$getKey(a)]=c,c},_spliceOut:function(a){var b=this.$indexFor(a);return b>-1?(delete this._indexCache[a],this.$list.splice(b,1)[0]):null},_resolveItem:function(a){var b=this.$list;if(angular.isNumber(a)&&a>=0&&b.length>=a)return b[a];if(angular.isObject(a)){var c=this.$$getKey(a),d=this.$getRecord(c);return d===a?d:null}return null},_assertNotDestroyed:function(a){if(this._isDestroyed)throw new Error("Cannot call "+a+" method on a destroyed $firebaseArray object")}},d.$extend=function(a,c){return 1===arguments.length&&angular.isObject(a)&&(c=a,a=function(b){return this instanceof a?(d.apply(this,arguments),this.$list):new a(b)}),b.inherit(a,d,c)},d}]),angular.module("firebase").factory("$FirebaseArray",["$log","$firebaseArray",function(a,b){return function(){return a.warn("$FirebaseArray has been renamed. Use $firebaseArray instead."),b.apply(null,arguments)}}])}(),function(){"use strict";var a;angular.module("firebase").factory("$firebaseAuth",["$q","$firebaseUtils",function(b,c){return function(d){var e=new a(b,c,d);return e.construct()}}]),a=function(a,b,c){if(this._q=a,this._utils=b,"string"==typeof c)throw new Error("Please provide a Firebase reference instead of a URL when creating a `$firebaseAuth` object.");this._ref=c,this._initialAuthResolver=this._initAuthResolver()},a.prototype={construct:function(){return this._object={$authWithCustomToken:this.authWithCustomToken.bind(this),$authAnonymously:this.authAnonymously.bind(this),$authWithPassword:this.authWithPassword.bind(this),$authWithOAuthPopup:this.authWithOAuthPopup.bind(this),$authWithOAuthRedirect:this.authWithOAuthRedirect.bind(this),$authWithOAuthToken:this.authWithOAuthToken.bind(this),$unauth:this.unauth.bind(this),$onAuth:this.onAuth.bind(this),$getAuth:this.getAuth.bind(this),$requireAuth:this.requireAuth.bind(this),$waitForAuth:this.waitForAuth.bind(this),$createUser:this.createUser.bind(this),$changePassword:this.changePassword.bind(this),$changeEmail:this.changeEmail.bind(this),$removeUser:this.removeUser.bind(this),$resetPassword:this.resetPassword.bind(this)},this._object},authWithCustomToken:function(a,b){var c=this._q.defer();try{this._ref.authWithCustomToken(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authAnonymously:function(a){var b=this._q.defer();try{this._ref.authAnonymously(this._utils.makeNodeResolver(b),a)}catch(c){b.reject(c)}return b.promise},authWithPassword:function(a,b){var c=this._q.defer();try{this._ref.authWithPassword(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authWithOAuthPopup:function(a,b){var c=this._q.defer();try{this._ref.authWithOAuthPopup(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authWithOAuthRedirect:function(a,b){var c=this._q.defer();try{this._ref.authWithOAuthRedirect(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authWithOAuthToken:function(a,b,c){var d=this._q.defer();try{this._ref.authWithOAuthToken(a,b,this._utils.makeNodeResolver(d),c)}catch(e){d.reject(e)}return d.promise},unauth:function(){null!==this.getAuth()&&this._ref.unauth()},onAuth:function(a,b){var c=this,d=this._utils.debounce(a,b,0);return this._ref.onAuth(d),function(){c._ref.offAuth(d)}},getAuth:function(){return this._ref.getAuth()},_routerMethodOnAuthPromise:function(a){var b=this._ref,c=this._utils;return this._initialAuthResolver.then(function(){var d=b.getAuth(),e=null;return e=a&&null===d?c.reject("AUTH_REQUIRED"):c.resolve(d)})},_initAuthResolver:function(){var a=this._ref;return this._utils.promise(function(b){function c(){a.offAuth(c),b()}a.onAuth(c)})},requireAuth:function(){return this._routerMethodOnAuthPromise(!0)},waitForAuth:function(){return this._routerMethodOnAuthPromise(!1)},createUser:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$createUser() expects an object containing 'email' and 'password', but got a string.");try{this._ref.createUser(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},changePassword:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$changePassword() expects an object containing 'email', 'oldPassword', and 'newPassword', but got a string.");try{this._ref.changePassword(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},changeEmail:function(a){var b=this._q.defer();if("function"!=typeof this._ref.changeEmail)throw new Error("$firebaseAuth.$changeEmail() requires Firebase version 2.1.0 or greater.");if("string"==typeof a)throw new Error("$changeEmail() expects an object containing 'oldEmail', 'newEmail', and 'password', but got a string.");try{this._ref.changeEmail(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},removeUser:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$removeUser() expects an object containing 'email' and 'password', but got a string.");try{this._ref.removeUser(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},resetPassword:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$resetPassword() expects an object containing 'email', but got a string.");try{this._ref.resetPassword(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise}}}(),function(){"use strict";angular.module("firebase").factory("$firebaseObject",["$parse","$firebaseUtils","$log",function(a,b,c){function d(a){return this instanceof d?(this.$$conf={sync:new f(this,a),ref:a,binding:new e(this),listeners:[]},Object.defineProperty(this,"$$conf",{value:this.$$conf}),this.$id=b.getKey(a.ref()),this.$priority=null,b.applyDefaults(this,this.$$defaults),void this.$$conf.sync.init()):new d(a)}function e(a){this.subs=[],this.scope=null,this.key=null,this.rec=a}function f(a,d){function e(b){m.isDestroyed||(m.isDestroyed=!0,d.off("value",j),a=null,l(b||"destroyed"))}function f(){d.on("value",j,k),d.once("value",function(a){angular.isArray(a.val())&&c.warn("Storing data using array indices in Firebase can result in unexpected behavior. See https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase for more information. Also note that you probably wanted $firebaseArray and not $firebaseObject."),l(null)},l)}function g(b){h||(h=!0,b?i.reject(b):i.resolve(a))}var h=!1,i=b.defer(),j=b.batch(function(b){var c=a.$$updated(b);c&&a.$$notify()}),k=b.batch(function(b){g(b),a&&a.$$error(b)}),l=b.batch(g),m={isDestroyed:!1,destroy:e,init:f,ready:function(){return i.promise}};return m}return d.prototype={$save:function(){var a=this,c=a.$ref(),d=b.toJSON(a);return b.doSet(c,d).then(function(){return a.$$notify(),a.$ref()})},$remove:function(){var a=this;return b.trimKeys(a,{}),a.$value=null,b.doRemove(a.$ref()).then(function(){return a.$$notify(),a.$ref()})},$loaded:function(a,b){var c=this.$$conf.sync.ready();return arguments.length&&(c=c.then.call(c,a,b)),c},$ref:function(){return this.$$conf.ref},$bindTo:function(a,b){var c=this;return c.$loaded().then(function(){return c.$$conf.binding.bindTo(a,b)})},$watch:function(a,b){var c=this.$$conf.listeners;return c.push([a,b]),function(){var d=c.findIndex(function(c){return c[0]===a&&c[1]===b});d>-1&&c.splice(d,1)}},$destroy:function(a){var c=this;c.$isDestroyed||(c.$isDestroyed=!0,c.$$conf.sync.destroy(a),c.$$conf.binding.destroy(),b.each(c,function(a,b){delete c[b]}))},$$updated:function(a){var c=b.updateRec(this,a);return b.applyDefaults(this,this.$$defaults),c},$$error:function(a){c.error(a),this.$destroy(a)},$$scopeUpdated:function(a){var c=b.defer();return this.$ref().set(b.toJSON(a),b.makeNodeResolver(c)),c.promise},$$notify:function(){var a=this,b=this.$$conf.listeners.slice();angular.forEach(b,function(b){b[0].call(b[1],{event:"value",key:a.$id})})},forEach:function(a,c){return b.each(this,a,c)}},d.$extend=function(a,c){return 1===arguments.length&&angular.isObject(a)&&(c=a,a=function(b){return this instanceof a?void d.apply(this,arguments):new a(b)}),b.inherit(a,d,c)},e.prototype={assertNotBound:function(a){if(this.scope){var d="Cannot bind to "+a+" because this instance is already bound to "+this.key+"; one binding per instance (call unbind method or create another FirebaseObject instance)";return c.error(d),b.reject(d)}},bindTo:function(c,d){function e(e){function f(a){return angular.equals(a,k)&&a.$priority===k.$priority&&a.$value===k.$value}function g(a){j.assign(c,b.scopeData(a))}function h(){var a=j(c);return[a,a.$priority,a.$value]}var i=!1,j=a(d),k=e.rec;e.scope=c,e.varName=d;var l=b.debounce(function(a){var d=b.scopeData(a);k.$$scopeUpdated(d)["finally"](function(){i=!1,d.hasOwnProperty("$value")||(delete k.$value,delete j(c).$value)})},50,500),m=function(a){a=a[0],f(a)||(i=!0,l(a))},n=function(){i||f(j(c))||g(k)};return g(k),e.subs.push(c.$on("$destroy",e.unbind.bind(e))),e.subs.push(c.$watch(h,m,!0)),e.subs.push(k.$watch(n)),e.unbind.bind(e)}return this.assertNotBound(d)||e(this)},unbind:function(){this.scope&&(angular.forEach(this.subs,function(a){a()}),this.subs=[],this.scope=null,this.key=null)},destroy:function(){this.unbind(),this.rec=null}},d}]),angular.module("firebase").factory("$FirebaseObject",["$log","$firebaseObject",function(a,b){return function(){return a.warn("$FirebaseObject has been renamed. Use $firebaseObject instead."),b.apply(null,arguments)}}])}(),function(){"use strict";angular.module("firebase").factory("$firebase",function(){return function(){throw new Error("$firebase has been removed. You may instantiate $firebaseArray and $firebaseObject directly now. For simple write operations, just use the Firebase ref directly. See the AngularFire 1.0.0 changelog for details: https://www.firebase.com/docs/web/libraries/angular/changelog.html")}})}(),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===this||null===this)throw new TypeError("'this' is null or not defined");var c=this.length>>>0;for(b=+b||0,Math.abs(b)===1/0&&(b=0),0>b&&(b+=c,0>b&&(b=0));c>b;b++)if(this[b]===a)return b;return-1}),Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e}),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{enumerable:!1,configurable:!0,writable:!0,value:function(a){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var b,c=Object(this),d=c.length>>>0,e=arguments[1],f=0;d>f;f++)if(f in c&&(b=c[f],a.call(e,b,f,c)))return f;return-1}}),"function"!=typeof Object.create&&!function(){var a=function(){};Object.create=function(b){if(arguments.length>1)throw new Error("Second argument not supported");if(null===b)throw new Error("Cannot set a null [[Prototype]]");if("object"!=typeof b)throw new TypeError("Argument must be an object");return a.prototype=b,new a}}(),Object.keys||(Object.keys=function(){"use strict";var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if("object"!=typeof e&&("function"!=typeof e||null===e))throw new TypeError("Object.keys called on non-object");var f,g,h=[];for(f in e)a.call(e,f)&&h.push(f);if(b)for(g=0;d>g;g++)a.call(e,c[g])&&h.push(c[g]);return h}}()),"function"!=typeof Object.getPrototypeOf&&("object"==typeof"test".__proto__?Object.getPrototypeOf=function(a){return a.__proto__}:Object.getPrototypeOf=function(a){return a.constructor.prototype}),function(){"use strict";function a(b){if(!angular.isObject(b))return b;var c=angular.isArray(b)?[]:{};return angular.forEach(b,function(b,d){("string"!=typeof d||"$"!==d.charAt(0))&&(c[d]=a(b))}),c}angular.module("firebase").factory("$firebaseConfig",["$firebaseArray","$firebaseObject","$injector",function(a,b,c){return function(d){var e=angular.extend({},d);return"string"==typeof e.objectFactory&&(e.objectFactory=c.get(e.objectFactory)),"string"==typeof e.arrayFactory&&(e.arrayFactory=c.get(e.arrayFactory)),angular.extend({arrayFactory:a,objectFactory:b},e)}}]).factory("$firebaseUtils",["$q","$timeout","$rootScope",function(b,c,d){function e(a){function c(a){e.resolve(a)}function d(a){e.reject(a)}if(!angular.isFunction(a))throw new Error("missing resolver function");var e=b.defer();return a(c,d),e.promise}var f={batch:function(a,b){return function(){var c=Array.prototype.slice.call(arguments,0);f.compile(function(){a.apply(b,c)})}},debounce:function(a,b,c,d){function e(){j&&(j(),j=null),i&&Date.now()-i>d?l||(l=!0,f.compile(g)):(i||(i=Date.now()),j=f.wait(g,c))}function g(){j=null,i=null,l=!1,a.apply(b,k)}function h(){k=Array.prototype.slice.call(arguments,0),e()}var i,j,k,l;if("number"==typeof b&&(d=c,c=b,b=null),"number"!=typeof c)throw new Error("Must provide a valid integer for wait. Try 0 for a default");if("function"!=typeof a)throw new Error("Must provide a valid function to debounce");return d||(d=10*c||100),h.running=function(){return i>0},h},assertValidRef:function(a,b){if(!angular.isObject(a)||"function"!=typeof a.ref||"function"!=typeof a.ref().transaction)throw new Error(b||"Invalid Firebase reference")},inherit:function(a,b,c){var d=a.prototype;return a.prototype=Object.create(b.prototype),a.prototype.constructor=a,angular.forEach(Object.keys(d),function(b){a.prototype[b]=d[b]}),angular.isObject(c)&&angular.extend(a.prototype,c),a},getPrototypeMethods:function(a,b,c){for(var d={},e=Object.getPrototypeOf({}),f=angular.isFunction(a)&&angular.isObject(a.prototype)?a.prototype:Object.getPrototypeOf(a);f&&f!==e;){for(var g in f)f.hasOwnProperty(g)&&!d.hasOwnProperty(g)&&(d[g]=!0,b.call(c,f[g],g,f));f=Object.getPrototypeOf(f)}},getPublicMethods:function(a,b,c){f.getPrototypeMethods(a,function(a,d){"function"==typeof a&&"_"!==d.charAt(0)&&b.call(c,a,d)})},defer:b.defer,reject:b.reject,resolve:b.when,promise:angular.isFunction(b)?b:e,makeNodeResolver:function(a){return function(b,c){null===b?(arguments.length>2&&(c=Array.prototype.slice.call(arguments,1)),a.resolve(c)):a.reject(b)}},wait:function(a,b){var d=c(a,b||0);return function(){d&&(c.cancel(d),d=null)}},compile:function(a){return d.$evalAsync(a||function(){})},deepCopy:function(a){if(!angular.isObject(a))return a;var b=angular.isArray(a)?a.slice():angular.extend({},a);for(var c in b)b.hasOwnProperty(c)&&angular.isObject(b[c])&&(b[c]=f.deepCopy(b[c]));return b},trimKeys:function(a,b){f.each(a,function(c,d){b.hasOwnProperty(d)||delete a[d]})},scopeData:function(a){var b={$id:a.$id,$priority:a.$priority},c=!1;return f.each(a,function(a,d){c=!0,b[d]=f.deepCopy(a)}),!c&&a.hasOwnProperty("$value")&&(b.$value=a.$value),b},updateRec:function(a,b){var c=b.val(),d=angular.extend({},a);return angular.isObject(c)?delete a.$value:(a.$value=c,c={}),f.trimKeys(a,c),angular.extend(a,c),a.$priority=b.getPriority(),!angular.equals(d,a)||d.$value!==a.$value||d.$priority!==a.$priority},applyDefaults:function(a,b){return angular.isObject(b)&&angular.forEach(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)}),a},dataKeys:function(a){var b=[];return f.each(a,function(a,c){b.push(c)}),b},each:function(a,b,c){if(angular.isObject(a)){for(var d in a)if(a.hasOwnProperty(d)){var e=d.charAt(0);"_"!==e&&"$"!==e&&"."!==e&&b.call(c,a[d],d,a)}}else if(angular.isArray(a))for(var f=0,g=a.length;g>f;f++)b.call(c,a[f],f,a);return a},getKey:function(a){return"function"==typeof a.key?a.key():a.name()},toJSON:function(b){var c;return angular.isObject(b)||(b={$value:b}),angular.isFunction(b.toJSON)?c=b.toJSON():(c={},f.each(b,function(b,d){c[d]=a(b)})),angular.isDefined(b.$value)&&0===Object.keys(c).length&&null!==b.$value&&(c[".value"]=b.$value),angular.isDefined(b.$priority)&&Object.keys(c).length>0&&null!==b.$priority&&(c[".priority"]=b.$priority),angular.forEach(c,function(a,b){if(b.match(/[.$\[\]#\/]/)&&".value"!==b&&".priority"!==b)throw new Error("Invalid key "+b+" (cannot contain .$[]#)");if(angular.isUndefined(a))throw new Error("Key "+b+" was undefined. Cannot pass undefined in JSON. Use null instead.")}),c},doSet:function(a,b){var c=f.defer();if(angular.isFunction(a.set)||!angular.isObject(b))a.set(b,f.makeNodeResolver(c));else{var d=angular.extend({},b);a.once("value",function(b){b.forEach(function(a){d.hasOwnProperty(f.getKey(a))||(d[f.getKey(a)]=null)}),a.ref().update(d,f.makeNodeResolver(c))},function(a){c.reject(a)})}return c.promise},doRemove:function(a){var b=f.defer();return angular.isFunction(a.remove)?a.remove(f.makeNodeResolver(b)):a.once("value",function(c){var d=[];c.forEach(function(a){var c=f.defer();d.push(c.promise),a.ref().remove(f.makeNodeResolver(b))}),f.allPromises(d).then(function(){b.resolve(a)},function(a){b.reject(a)})},function(a){b.reject(a)}),b.promise},VERSION:"1.1.3",allPromises:b.all.bind(b)};return f}])}();
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("dish-cook/dish-cook.html","<div ng-controller=\"dishCookController\">\n  <!--<div class=\"nav-icon left profile-icon\" ng-click=\"toProfile()\"></div>-->\n	<div class=\"title\">Cook</div>\n  <div class=\"nav-icon right food-icon\" ng-click=\"toFood()\"></div>\n	<ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n    <div class=\"card-holder\" collection-repeat=\"recipe in recipes\" item-width=\"getCardWidth(recipe, $index)\" item-height=\"getCardHeight(recipe, $index)\">\n      <div class=\"card\">\n        {{recipe.photo}}\n        <dish-photo class=\"card-image {{recipe.photo ? \'filled\' : \'empty\'}}\" ng-model=\"recipe.photo\"></dish-photo>\n        <dish-input class=\"input-first\" ng-model=\"recipe.name\" placeholder=\"Name\"></dish-input>\n        <dish-input class=\"input-second\" ng-model=\"recipe.ingredients\" placeholder=\"Ingredients\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"recipe.portions\" placeholder=\"Portions\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"recipe.price\" placeholder=\"Price\"></dish-input>\n        <dish-button class=\" {{ valid(recipe) ? \'active\' : \'inactive\'}}\" text=\"Post Meal\" ng-click=\"cook(recipe)\"></dish-button>\n      </div>\n    </div>\n  </ion-scroll>\n</div>");
$templateCache.put("dish-favorites/dish-favorites.html","<div class=\"favorites\" ng-controller=\"dishFavoritesController\">\n	<div class=\"nav-icon left food-icon\" ng-click=\"toFood()\"></div>\n	<div class=\"title\">{{currentUser.profile.username}}</div>\n	<!--<div class=\"nav-icon right cook-icon\" ng-click=\"toCook()\"></div>-->\n  <ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"favorite in favorites\" item-width=\"getCardWidth(favorite, $index)\" item-height=\"getCardHeight(favorite, $index)\">\n  		<div ng-if=\"$index === 0\" class=\"card-holder profile\">\n  			<ng-include src=\"&apos;dish-profile/dish-profile.html&apos;\"></ng-include>\n  		</div>\n  		<div class=\"card-holder favorite\">\n				<div class=\"card\">\n					<div class=\"card-image\" style=\"background-image:url({{favorite.photo}});\"></div>\n	        <dish-input class=\"input-first\" ng-model=\"favorite.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-second\" ng-model=\"favorite.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"favorite.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"favorite.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n	        <dish-button text=\"Request Meal\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</div>\n");
$templateCache.put("dish-food/dish-food.html","<div ng-controller=\"dishFoodController\">\n  <div class=\"nav-icon left cook-icon\" ng-click=\"toCook()\"></div>\n	<div class=\"title\">Eat</div>\n  <div class=\"nav-icon right profile-icon\" ng-click=\"toProfile()\"></div>\n	<ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n    <div class=\"card-holder meal\" collection-repeat=\"meal in meals\" item-width=\"getCardWidth(meal, $index)\" item-height=\"getCardHeight(meal, $index)\">\n      {{currentUser.profile.$id}}\n      <div class=\"card\">\n      	<div class=\"card-image {{meal.photo ? \'filled\' : \'empty\'}}\" style=\"background-image:url({{meal.photo}});\"></div>\n        <dish-input class=\"input-first\" ng-model=\"meal.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n        <dish-input class=\"input-second\" ng-model=\"meal.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"meal.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"meal.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n        <dish-button text=\"Buy Meal\" ng-click=\"buy()\"></dish-button>\n      </div>\n    </div>\n  </ion-scroll>\n</div>");
$templateCache.put("dish-forgot/dish-forgot.html","<div ng-controller=\"dishForgotController\">\n	<form novalidate class=\"forgotForm\" name=\"forgotForm\" novalidate ng-submit=\"forgotForm.$valid && resetPassword(forgotData.user)\">\n	  <div class=\"list list-inset\">\n	    <label class=\"item item-input\">\n	      <input type=\"text\" ng-model=\"forgotData.user.email\" placeholder=\"Enter Your Email\">\n	    </label>\n	  </div>\n	  <button class=\"button button-block form-button\" type=\"submit\">Recover Password</button>\n	  <div class=\"button button-full button-clear button-light\" ng-click=\"toLogin()\">\n	    Back to Login\n	  </div>\n	</form>\n</div>");
$templateCache.put("dish-help/dish-help-modal.html","<ion-modal-view class=\"modal help-modal\" ng-controller=\"dishHelpController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n  <div class=\"title\">How Can We Help?</div>\n  <ion-scroll class=\"cards\" direction=\"y\" scrollbar-y=\"false\" on-scroll=\"onScroll()\">\n	  <div class=\"card-holder issues\">\n	  	<div class=\"card-holder-title\">Issue With Your Meal</div>\n	  	<div class=\"card\">\n	  		<div class=\"card-image\" style=\"background-image:url({{previousMeal.photo}});\"></div>\n	  		<div class=\"card-metadata\">\n	  			<div class=\"card-date\">Today, 11:29 AM</div>\n	  			<div class=\"card-food\">Pizza</div>\n	  			<div class=\"card-price\">$10.00</div>\n	  		</div>\n	  	</div>\n	  </div>\n	  <div class=\"card-holder other-issues\">\n		  <div class=\"card\">\n		  	<div class=\"dish-input advance\">View Previous Meals</div>\n	  	</div>\n  	</div>\n	  <div class=\"card-holder other\">\n	  	<div class=\"card-holder-title\">Other Topics</div>\n	  	<div class=\"card\">\n	  		<div class=\"dish-input advance\">Account</div>\n	  		<div class=\"dish-input advance\">Payment</div>\n	  		<div class=\"dish-input advance\">How to use Dish</div>\n	  		<div class=\"dish-input advance\">Making Your First Meal</div>\n	  	</div>\n	  </div>\n  </ion-scroll>\n</ion-modal-view>\n\n<!-- Potential help topics\nAccount:\n	-Update my profile information\n	-Reset my password\n	-My account is suspended\n	-I\'m not receiving emails from Dish\n	-My email or phone number is in use\n	-I can\'t change my email or mobile number\n	-I\'d like to delete my account\n	-I think my account is compromised\n	-I\'d like to know my rating\nPayment:\n	-How can I earn free meals?\n	-Payment Options\n	-Update payment information\n	-Settle an outstanding balance\n	-About authorization holds\n	-Can I use a prepaid card?\n	-I was charged incorrectly\n	-Identify an unknown charge\n	-About recurring charges\n	-How do I tip?\nHow to use Dish\n	-Finding a meal\n	-Requesting a meal\n	-Picking up a meal\n	-Favoriting a meal\n	-Rating a meal\n	-Paying for your meal\n	-Rating a cook\n	-Understanding\n	-Using the app\n	-What cities is Dish available in?\n	-How old must I be to use Dish?\n	-Code of Conduct\nMaking Your First Meal\n	-How do I sell a meal on Dish?\n	-Leaving a meal for pickup\n	-Delivering a meal\n	-How much of a cut does Dish take from my sales?\n	-When does Dish pay me?\n	-Become a verified cook\n	-Rating a customer\n	-Professionalism & Respect\n	-Safety\n	-Emergencies\n-->");
$templateCache.put("dish-home/dish-home.html","<dish-drawer side=\"left\">\n	<div class=\"drawer-dismiss\" dish-drawer-close></div>\n  <div class=\"drawer-content\">\n    <div class=\"drawer-item\">Menu Item</div>\n    <div class=\"drawer-item\">Menu Item</div>\n    <div class=\"drawer-item\">Menu Item</div>\n  </div>\n</dish-drawer>\n<div class=\"home hour{{vmCooks.hour}}\" ng-controller=\"dishHomeController as vmCooks\">\n	<div class=\"card-dismiss {{vmCooks.activeCard ? \'active\' : \'\'}}\" ng-click=\"vmCooks.closeCook()\"></div>\n	<div class=\"header\">\n		<div class=\"header-icon icon ion-navicon left\" dish-drawer-open></div>\n		<div class=\"header-title time\" ng-click=\"vmCooks.selectTime()\">{{vmCooks.now}}</div>\n		<div class=\"header-subtitle location\" ng-click=\"vmCooks.selectLocation()\">{{vmCooks.location}}</div>\n		<div class=\"header-icon icon ion-ios-search right\"></div>\n	</div>\n	<div class=\"card-holder {{vmCooks.cardIsActive(cook) ? \'active\' : \'\'}}\" card-repeat=\"cook in vmCooks.cooks track by $index\">\n		<div class=\"card {{vmCooks.cooksLoaded ? \'loaded\' : \'\'}}\">\n			<div class=\"card-preview\" ng-click=\"vmCooks.viewCook(cook)\">\n				<div class=\"card-preview-content\">\n					<div class=\"masthead\" style=\"background-image:url({{cook.meals[0].image}});\"></div>\n					<div class=\"masthead-banner\">\n						<div class=\"card-title change {{vmCooks.changed(cook,\'restaurant\') ? \'changing\' : \'\'}}\">{{cook.restaurant}}</div>\n						<div class=\"card-subtitle change {{vmCooks.changed(cook,\'username\') ? \'changing\' : \'\'}} {{cook.verified ? \'verified\' : \'\'}}\">{{cook.username}}</div>\n					</div>\n					<div class=\"masthead-row\">\n						<div class=\"masthead-col\" style=\"background-image:url({{cook.meals[1].image}});\"></div>\n						<div class=\"masthead-col\" style=\"background-image:url({{cook.meals[2].image}});\"></div>\n					</div>\n					<div class=\"masthead-row\">\n						<div class=\"masthead-col\" style=\"background-image:url({{cook.meals[3].image}});\"></div>\n						<div class=\"masthead-col\" style=\"background-image:url({{cook.meals[4].image}});\"></div>\n					</div>\n				</div>\n				<div class=\"card-button\">\n					See Menu\n				</div>\n			</div>\n			<ion-content class=\"card-content\" scrollbar-y=\"false\">\n				<div class=\"card-banner\">\n					<div class=\"card-title change {{vmCooks.changed(cook,\'restaurant\') ? \'changing\' : \'\'}}\">{{cook.restaurant}}</div>\n					<div class=\"card-subtitle change {{vmCooks.changed(cook,\'username\') ? \'changing\' : \'\'}} {{cook.verified ? \'verified\' : \'\'}}\">{{cook.username}}</div>\n					<div class=\"ratings\">\n						<div class=\"rating full\"></div>\n						<div class=\"rating full\"></div>\n						<div class=\"rating full\"></div>\n						<div class=\"rating half\"></div>\n						<div class=\"rating\"></div>\n					</div>\n					<div class=\"delivery-options\">\n						<div class=\"delivery-option pickup {{cook.pickup.enabled ? \'active\' : \'\'}}\">\n							<div class=\"delivery-option-price\">$0</div>\n						</div>\n						<div class=\"delivery-option delivery {{cook.delivery.enabled ? \'active\' : \'\'}}\">\n							<div class=\"delivery-option-price\">{{cook.delivery.price}}</div>\n						</div>\n						<div class=\"delivery-option dine-in {{cook.dineIn.enabled ? \'active\' : \'\'}}\">\n							<div class=\"delivery-option-price\">{{cook.dineIn.price}}</div>\n						</div>\n					</div>\n					<div class=\"contact-options\">\n						<div class=\"contact-option phone\"></div>\n						<div class=\"contact-option text\"></div>\n						<div class=\"contact-option address\"></div>\n					</div>\n				</div>\n				<div class=\"card-info\">\n					<dish-gallery class=\"card-gallery\" pager=\"true\" ng-model=\"cook.cookPhotos\"></dish-gallery>\n					<div class=\"description\" read-more text=\"{{cook.description}}\" limit=\"120\" ng-click=\"vmCooks.viewDescription()\"></div>\n					<div class=\"card-section-title\">Meals</div>\n					<div class=\"meals\">\n						<div class=\"meal\" ng-repeat=\"meal in cook.meals\">\n							<div class=\"meal-image\" style=\"background-image:url({{meal.image}});\" ng-click=\"vmCooks.viewMeal(meal)\"></div>\n							<div class=\"meal-name\" ng-click=\"vmCooks.viewMeal(meal)\">{{meal.name}}</div>\n							<div class=\"meal-quantity-option decrease\" ng-click=\"vmCooks.decreaseOrder(meal)\"></div>\n							<div class=\"meal-price\">{{meal.price}}</div>\n							<div class=\"meal-quantity-option increase\" ng-click=\"vmCooks.increaseOrder(meal)\"></div>\n							<!--<div class=\"meal-description\">\n								{{meal.description}}\n								<div class=\"meal-ingredients\">\n									<div class=\"meal-ingredient\" ng-repeat=\"ingredient in meal.ingredients\">{{ingredient}}</div>\n								</div>\n							</div>-->\n						</div>\n					</div>\n					<div class=\"card-section-title\">Reviews</div>\n					<div class=\"reviews\">\n						<div class=\"review\" ng-repeat=\"review in cook.reviews\">\n							<div class=\"ratings\">\n								<div class=\"rating full\"></div>\n								<div class=\"rating full\"></div>\n								<div class=\"rating full\"></div>\n								<div class=\"rating half\"></div>\n								<div class=\"rating\"></div>\n							</div>\n							<div class=\"review-text\">{{review.description}}</div>\n						</div>\n						<div class=\"see-all\" ng-click=\"vmCooks.viewReviews()\">See All {{cook.reviews.length}} Reviews</div>\n					</div>\n				</div>\n			</ion-content>\n		</div>\n	</div>\n	<div class=\"footer-button\" ng-click=\"vmCooks.becomeCook()\">\n		Become a Cook\n	</div>\n	<div class=\"cart {{vmCooks.activeCard ? \'active\' : \'\'}}\">\n		<div class=\"cart-header\" ng-click=\"vmCooks.viewCart()\">Cart</div>\n	</div>\n	<div class=\"time-overlay {{vmCooks.timeActive ? \'active\' : \'\'}}\">\n		<ion-content>\n			Hello\n		</ion-content>\n	</div>\n</div>");
$templateCache.put("dish-login/dish-login.html","<div ng-controller=\"dishLoginController\">\n  <form novalidate class=\"loginForm\" name=\"loginForm\" ng-submit=\"loginForm.$valid && login(loginData.user)\">\n    <div class=\"list list-inset\">\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"loginData.user.email\" placeholder=\"Email\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" ng-model=\"loginData.user.password\" placeholder=\"Password\">\n      </label>\n    </div>\n    <button class=\"button button-block form-button\" type=\"submit\">Log in</button>\n    <div class=\"button button-full button-clear button-light\" ng-click=\"toSignup()\">\n      Signup\n    </div>\n  </form>\n  <div class=\"button button-clear button-light forgotLink\" ng-click=\"toForgot()\">Forgot Password?</div>\n</div>");
$templateCache.put("dish-payment/dish-payment-modal.html","<ion-modal-view class=\"modal payment-modal\" ng-controller=\"dishPaymentController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\" ng-click=\"payment()\">Payment</div>\n	<ion-scroll class=\"cards\" direction=\"y\" scrollbar-y=\"false\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"payment in payments\" item-width=\"getCardWidth(payment, $index)\" item-height=\"getCardHeight(payment, $index)\">\n  		<div class=\"card-holder payment {{$index === 0 ? \'first\' : \'\'}}\">\n				<div class=\"card\">\n	        <dish-input ng-model=\"payment.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input ng-model=\"payment.creditcard\" placeholder=\"Card No.\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"payment.exp\" placeholder=\"Expiration\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"payment.ccv\" placeholder=\"CCV\" readonly=\"true\"></dish-input>\n	        <dish-button ng-if=\"payment.type === \'delete\'\" type=\"assertive\" text=\"Delete Credit Card\" ng-click=\"delete()\"></dish-button>\n	        <dish-button ng-if=\"payment.type === \'add\'\" text=\"Add Credit Card\" ng-click=\"add()\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");
$templateCache.put("dish-preview/dish-preview-modal.html","<div class=\"preview\" ng-controller=\"dishPreviewController as vmPreview\" ng-click=\"vmPreview.resetZoom()\">\n	<ion-scroll delegate-handle=\"dishZoom\" zooming=\"true\" direction=\"xy\" scrollbar-x=\"false\" scrollbar-y=\"false\" min-zoom=\"1\">\n	  <div class=\"preview-image\" style=\"background-image:url({{previewImage}});\"></div>\n	 </ion-scroll>\n</div>");
$templateCache.put("dish-profile/dish-profile.html","<div class=\"card profile\" ng-controller=\"dishProfileController\">\n	<dish-photo class=\"card-image\" ng-model=\"currentUser.profile.photo\"></dish-photo>\n	<div class=\"card-options\">\n		<div class=\"dish-input\" ng-click=\"openModal(\'transactions\')\">History</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'promotions\')\">Free Meals</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'payment\')\">Payment</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'help\')\">Help</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'settings\')\">Settings</div>\n	</div>\n	<dish-button text=\"Recommend Dish\"></dish-button>\n</div>");
$templateCache.put("dish-promotions/dish-promotions-modal.html","<ion-modal-view class=\"modal promotions-modal\" ng-controller=\"dishPromotionsController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\">Promotions</div>\n	<ion-scroll class=\"cards\" direction=\"y\" scrollbar-y=\"false\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"promotion in promotions\" item-width=\"getCardWidth(promotion, $index)\" item-height=\"getCardHeight(promotion, $index)\">\n  		<div class=\"card-holder promotion {{$index === 0 ? \'first\' : \'\'}}\">\n				<div class=\"card\" ng-click=\"promotion.command()\">\n	        <dish-button ng-bind-html=\"promotion.button\"></dish-button>\n	        <div class=\"card-icon icon {{promotion.icon}}\"></div>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");
$templateCache.put("dish-settings/dish-settings-modal.html","<ion-modal-view class=\"modal settings\" ng-controller=\"dishSettingsController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\">Settings</div>\n	<dish-button type=\"assertive\" text=\"Logout\" ng-click=\"logout()\"></dish-button>\n</ion-modal-view>\n\n<!-- Potential Settings\nUser:\n	-Edit Username\n	-Edit Email\n	-Change Password\n	-Become Verified Cook\nApp:\n	-Toggle GPS\n	-Toggle Notifications\n-->");
$templateCache.put("dish-signup/dish-signup-modal.html","<ion-modal-view class=\"modal signup\">\n  <dish-slider>\n    <dish-slide template=\"dish-signup/dish-signup.html\"></dish-slide>\n    <dish-slide template=\"dish-login/dish-login.html\"></dish-slide>\n    <dish-slide template=\"dish-forgot/dish-forgot.html\"></dish-slide>\n  </dish-slider>\n  <div class=\"logo\"></div>\n</ion-modal-view>");
$templateCache.put("dish-signup/dish-signup.html","<div ng-controller=\"dishSignupController\">\n  <form class=\"signupForm\" name=\"signupForm\" novalidate ng-submit=\"signupForm.$valid && signup(signupData.user)\">\n    <div class=\"list list-inset\">\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"signupData.user.username\" placeholder=\"Full Name\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"signupData.user.email\" placeholder=\"Email\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" ng-model=\"signupData.user.password\" placeholder=\"Password\">\n      </label>\n    </div>\n    <button class=\"button button-block form-button\" type=\"submit\">Signup</button>\n    <div class=\"button button-full button-clear button-light\" ng-click=\"toLogin()\">\n      Login\n    </div>\n  </form>\n</div>");
$templateCache.put("dish-transactions/dish-transactions-modal.html","<ion-modal-view class=\"modal transactions\" ng-controller=\"dishTransactionsController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\">History</div>\n  <ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"transaction in transactions\" item-width=\"getCardWidth(transaction, $index)\" item-height=\"getCardHeight(transaction, $index)\">\n  		<div class=\"card-holder transaction\">\n				<div class=\"card\">\n					<div class=\"card-image\" style=\"background-image:url({{transaction.photo}});\"></div>\n	        <dish-input class=\"input-first\" ng-model=\"transaction.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-second\" ng-model=\"transaction.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"transaction.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"transaction.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n	        <dish-button text=\"View Meal\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");}]);