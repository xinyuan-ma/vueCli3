(function(e){function n(n){for(var o,r,u=n[0],c=n[1],l=n[2],d=0,s=[];d<u.length;d++)r=u[d],i[r]&&s.push(i[r][0]),i[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);f&&f(n);while(s.length)s.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],o=!0,r=1;r<t.length;r++){var u=t[r];0!==i[u]&&(o=!1)}o&&(a.splice(n--,1),e=c(c.s=t[0]))}return e}var o={},r={yuan:0},i={yuan:0},a=[];function u(e){return c.p+"js/"+({about:"about",directive:"directive"}[e]||e)+"."+{about:"82d6d3ce",directive:"031f3efc"}[e]+".js"}function c(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.e=function(e){var n=[],t={about:1,directive:1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise(function(n,t){for(var o="css/"+({about:"about",directive:"directive"}[e]||e)+"."+{about:"babf1977",directive:"742a7520"}[e]+".css",i=c.p+o,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===o||d===i))return n()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){l=s[u],d=l.getAttribute("data-href");if(d===o||d===i)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var o=n&&n.target&&n.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete r[e],f.parentNode.removeChild(f),t(a)},f.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){r[e]=0}));var o=i[e];if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(function(n,t){o=i[e]=[n,t]});n.push(o[2]=a);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=u(e),l=function(n){d.onerror=d.onload=null,clearTimeout(s);var t=i[e];if(0!==t){if(t){var o=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src,a=new Error("Loading chunk "+e+" failed.\n("+o+": "+r+")");a.type=o,a.request=r,t[1](a)}i[e]=void 0}};var s=setTimeout(function(){l({type:"timeout",target:d})},12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(n)},c.m=e,c.c=o,c.d=function(e,n,t){c.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,n){if(1&n&&(e=c(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)c.d(t,o,function(n){return e[n]}.bind(null,o));return t},c.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=n,l=l.slice();for(var s=0;s<l.length;s++)n(l[s]);var f=d;a.push([1,"chunk-vendors"]),t()})({"0fad":function(e,n,t){"use strict";t.r(n);t("5466"),t("450d");var o=t("ecdf"),r=t.n(o),i=(t("38a0"),t("ad41")),a=t.n(i),u=(t("cadf"),t("551c"),t("f751"),t("097d"),t("2b0e")),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},l=[],d=t("f121"),s={mounted:function(){console.log(window.location,"window.location"),console.log(Object({NODE_ENV:"production",VUE_APP_YUAN:"blue",BASE_URL:"/"}),"process.env"),console.log(d["a"],"url")}},f=s,p=(t("ed6b"),t("2877")),h=Object(p["a"])(f,c,l,!1,null,null,null),m=h.exports,v=t("8c4f"),b=function(){return t.e("directive").then(t.bind(null,"7238"))},w=function(){return t.e("directive").then(t.bind(null,"6e70"))},g=function(){return t.e("directive").then(t.bind(null,"2744"))},y=function(){return t.e("directive").then(t.bind(null,"7f0e"))},_=function(){return t.e("directive").then(t.bind(null,"4aec"))},P=function(){return t.e("directive").then(t.bind(null,"9b32"))},j=function(){return t.e("directive").then(t.bind(null,"ec20"))},x=function(){return t.e("directive").then(t.bind(null,"7173"))},E=function(){return t.e("directive").then(t.bind(null,"e349"))},O=function(){return t.e("directive").then(t.bind(null,"50f0"))},k=function(){return t.e("directive").then(t.bind(null,"b11e"))},C=function(){return t.e("directive").then(t.bind(null,"2830"))},S=function(){return t.e("directive").then(t.bind(null,"c13a"))},A=function(){return t.e("directive").then(t.bind(null,"0836"))},N=function(){return t.e("directive").then(t.bind(null,"5fab"))},T=function(){return t.e("directive").then(t.bind(null,"d517"))};u["default"].use(v["a"]);var L=new v["a"]({routes:[{path:"/choujiangPrize",name:"ChoujiangPrize",component:T},{path:"/download_Excel",name:"download_Excel",component:N},{path:"/",name:"scrollTest",component:w},{path:"/directive",name:"directive",component:b},{path:"/mapHot",name:"mapHot",component:E},{path:"/iconfont",name:"iconfont",component:O},{path:"/scaleX",name:"scaleX",component:k},{path:"/onePx",name:"onePx",component:C},{path:"/transition",name:"transition",component:S},{path:"/jump",name:"jump",component:A},{path:"/photoLiu",name:"photoLiu",component:g},{path:"/audioTest",name:"audioTest",component:P},{path:"/videoDemo",name:"videoDemo",component:j},{path:"/commit_animation",name:"commit_animation",component:x},{path:"/orderPhotoLiu",name:"orderPhotoLiu",component:y},{path:"/sprite",name:"spritePhoto",component:_},{path:"/about",name:"about",component:function(){return t.e("about").then(t.bind(null,"f820"))}}]}),$=t("2f62");u["default"].use($["a"]);var U=new $["a"].Store({state:{},mutations:{},actions:{}}),D=(t("77ed"),t("3e8e"),t("96b1"),t("440f"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"toast_container",on:{click:function(n){return n.stopPropagation(),e.hidden(n)}}},[t("div",{staticClass:"content",on:{click:function(n){return n.stopPropagation(),e.hidden1(n)}}},[e._v(e._s(e.content))])])}),B=[],M={name:"toast",data:function(){return{show:!1}},methods:{hidden:function(){console.log(111),this.show=!1},hidden1:function(){console.log(222)}}},H=M,V=(t("a7ea"),Object(p["a"])(H,D,B,!1,null,null,null)),q=V.exports,z="";console.log(11111),u["default"].prototype.$toast=function(e){var n=e.content;if(z)return z;var t=u["default"].extend(q);z=new t({data:function(){return{content:n}}}),z.$mount(),document.body.appendChild(z.$el)};var J=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"toast_container",on:{click:function(n){return n.stopPropagation(),e.hidden(n)}}},[t("div",{staticClass:"content",on:{click:function(n){return n.stopPropagation(),e.hidden1(n)}}},[e._v(e._s(e.content))])])},X=[],Y={name:"toast",data:function(){return{content:"toast页面",show:!1}},methods:{openShow:function(){this.show=!1},hidden:function(){this.show=!1},hidden1:function(){console.log("hidden1")}}},F=Y,I=(t("e22d"),Object(p["a"])(F,J,X,!1,null,null,null)),K=I.exports,R="",G=function(){if(R)return R;var e=u["default"].extend(K);return R=new e,R.$mount(),document.body.appendChild(R.$el),R},Q=G();Q.openShow(),u["default"].use(a.a),u["default"].use(r.a);var W=t("3a34"),Z=new W;u["default"].use(Z),u["default"].config.productionTip=!1,new u["default"]({router:L,store:U,render:function(e){return e(m)}}).$mount("#app")},1:function(e,n,t){e.exports=t("0fad")},"3e8e":function(e,n,t){},"440f":function(e,n,t){},6779:function(e,n,t){},"96b1":function(e,n,t){},a532:function(e,n,t){},a7ea:function(e,n,t){"use strict";var o=t("a532"),r=t.n(o);r.a},bbe4:function(e,n,t){},e22d:function(e,n,t){"use strict";var o=t("bbe4"),r=t.n(o);r.a},ed6b:function(e,n,t){"use strict";var o=t("6779"),r=t.n(o);r.a},f121:function(e,n,t){"use strict";var o="";switch(console.log("blue","process.env.VUE_APP_YUAN"),"blue"){case"red":o="redred";break;case"blue":o="http:blue";break;default:o=window.location.origin;break}n["a"]={url:o}}});