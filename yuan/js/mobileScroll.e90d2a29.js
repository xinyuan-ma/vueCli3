(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mobileScroll"],{"11e9":function(t,e,r){var i=r("52a7"),s=r("4630"),o=r("6821"),n=r("6a99"),a=r("69a8"),l=r("c69a"),c=Object.getOwnPropertyDescriptor;e.f=r("9e1e")?c:function(t,e){if(t=o(t),e=n(e,!0),l)try{return c(t,e)}catch(r){}if(a(t,e))return s(!i.f.call(t,e),t[e])}},"1dde":function(t,e,r){"use strict";var i=r("792b"),s=r.n(i);s.a},3835:function(t,e,r){"use strict";function i(t){if(Array.isArray(t))return t}function s(t,e){var r=[],i=!0,s=!1,o=void 0;try{for(var n,a=t[Symbol.iterator]();!(i=(n=a.next()).done);i=!0)if(r.push(n.value),e&&r.length===e)break}catch(l){s=!0,o=l}finally{try{i||null==a["return"]||a["return"]()}finally{if(s)throw o}}return r}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function n(t,e){return i(t)||s(t,e)||o()}r.d(e,"a",(function(){return n}))},"5dbc":function(t,e,r){var i=r("d3f4"),s=r("8b97").set;t.exports=function(t,e,r){var o,n=e.constructor;return n!==r&&"function"==typeof n&&(o=n.prototype)!==r.prototype&&i(o)&&s&&s(t,o),t}},"792b":function(t,e,r){},"7dee":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"wrapper",attrs:{id:"mobileScroll"},on:{scroll:t.handleScroll}},[r("div",{ref:"fixed",class:{visible:t.fixedBack},attrs:{id:"fixed-back"}},[r("div",{attrs:{id:"fixed-title"}},[t._v(t._s(t.title))])]),r("div",{ref:"top",attrs:{id:"bg"}},[r("div",{ref:"title",attrs:{id:"title"}},[t._v(t._s(t.title))]),r("img",{ref:"img",attrs:{id:"top-img",src:"http://hhh.images.visitshanghai.com.cn/app/travel_1.jpg",alt:""}})]),r("div",{ref:"main",attrs:{id:"main"}},[r("div",{attrs:{id:"nav"}},t._l(t.nav,(function(e,i){return r("div",{key:"nav"+i,staticClass:"nav-item"},[r("div",{staticClass:"nav-item-bg",style:{backgroundImage:"url("+e.url+")"}}),r("div",{staticClass:"nav-item-label"},[t._v(t._s(e.label))])])})),0)]),r("overscroll",{attrs:{forceScrollTop:!0},on:{overscroll:t.overscroll,end:t.clearTransform}})],1)},s=[],o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"wrapper",attrs:{id:"overscroll"}})},n=[],a=r("3835");r("c5f6");function l(t){var e=getComputedStyle(t)["overflow-y"];return"scroll"===e||"auto"===e||t===document.body?t:l(t.parentNode)}var c={name:"overscroll",props:{damp:{type:Number,default:20,validator:function(t){return t>0}},inertia:{type:Boolean,default:!0},forceScrollTop:{type:Boolean,default:!1},btm:{type:Boolean,default:!1}},data:function(){return{scrollParent:null,markPosition:0,initParentOverflow:"",startX:0,startY:0,scrollDisabled:!1,maxScrollTop:0,pullOrDrop:"",lastScrollTop:0,isTouch:!1,inertiaAnimationId:null}},mounted:function(){var t=this.getRealMove(10);console.log(t,"this.getRealMove(touchMove)"),this.scrollParent=l(this.$refs.wrapper),this.initParentOverflow=getComputedStyle(this.scrollParent).overflowY,this.scrollParent.addEventListener("touchstart",this.handleTouch,!1),this.scrollParent.addEventListener("touchmove",this.handleTouchMove,!1),this.scrollParent.addEventListener("touchend",this.handleTouchEnd,!1)},methods:{handleTouch:function(t){cancelAnimationFrame(this.inertiaAnimationId),this.isTouch=!0;var e=Object(a["a"])(t.touches,1),r=e[0],i=r.clientX,s=r.clientY;this.startY=s,this.startX=i,this.maxScrollTop=this.scrollParent.scrollHeight-this.scrollParent.clientHeight},handleTouchMove:function(t){var e=Object(a["a"])(t.touches,1),r=e[0],i=r.clientX,s=r.clientY;if(!(i<0)){var o=Math.abs(i-this.startX)<Math.abs(s-this.startY),n=this.scrollParent.scrollTop,l=s-this.startY,c=n<=0&&l>0,h=(n>=this.maxScrollTop||0===this.maxScrollTop)&&l<0;if(c&&(this.disableScroll(),this.pullOrDrop="pull",o&&t.preventDefault(),this.markPosition||(this.markPosition=s)),h&&(o&&t.preventDefault(),this.btm&&(this.disableScroll(!0),this.pullOrDrop="drop",this.markPosition||(this.markPosition=s))),this.markPosition){var f="pull"===this.pullOrDrop?"overscroll":"overscroll-btm",u=s-this.markPosition;this.scrollParent.scrollTop="pull"===this.pullOrDrop?0:this.maxScrollTop;var d=this.getRealMove(u);this.$emit(f,d)}}},disableScroll:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.scrollDisabled||(this.scrollParent.style.overflowY="hidden",this.scrollDisabled=!0)},handleScroll:function(t){var e=this.scrollParent.scrollTop,r=this.maxScrollTop-e,i=e-this.lastScrollTop;i<0&&2*Math.abs(i)>e&&e>0?((this.forceScrollTop||this.isTouch)&&(this.scrollParent.scrollTop=0),this.disableScroll(),this.isTouch||(this.inertia?this.simulateInertia(Math.abs(i)/5):this.$nextTick(this.enableScroll))):this.btm&&i>0&&2*i>r&&e<this.maxScrollTop&&((this.forceScrollTop||this.isTouch)&&(this.scrollParent.scrollTop=this.maxScrollTop),this.disableScroll(),this.$nextTick(this.enableScroll)),this.lastScrollTop=e},simulateInertia:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,i=0,s=0,o=function o(n){i||(i=n);var a=n-i;if(a<r){s+=t*(1-a/r);var l=e.getRealMove(s);e.$emit("overscroll",l),e.inertiaAnimationId=requestAnimationFrame(o)}else e.enableScroll(),e.$emit("end")};this.inertiaAnimationId=requestAnimationFrame(o)},enableScroll:function(){this.scrollDisabled&&(this.scrollParent.style.overflowY=this.initParentOverflow,this.scrollDisabled=!1)},getRealMove:function(t){return Math.min(Math.sqrt(2*this.damp*t),t)},handleTouchEnd:function(){this.isTouch=!1,this.clearMark(),this.enableScroll()},clearMark:function(){this.$emit("end"),this.markPosition=0}},beforeDestroy:function(){this.enableScroll(),this.scrollParent.removeEventListener("scroll",this.handleScroll),this.scrollParent.removeEventListener("touchstart",this.handleTouch,!1),this.scrollParent.removeEventListener("touchmove",this.handleTouchMove,!1),this.scrollParent.removeEventListener("touchend",this.handleTouchEnd,!1)}},h=c,f=r("2877"),u=Object(f["a"])(h,o,n,!1,null,null,null),d=u.exports,p={name:"mobileScroll",components:{overscroll:d},data:function(){return{nav:[{url:"http://hhh.images.visitshanghai.com.cn/app/travel_1.jpg",label:"阻止默认滚动，产生动效"}],fixedBack:!1,topHeight:0,clearTransformTimer:null,title:"测试"}},created:function(){for(var t=0;t<4;t++)this.nav=this.nav.concat(this.nav)},mounted:function(){this.topHeight=parseInt(300*window.innerWidth/750)},methods:{handleScroll:function(){var t=this.$refs.wrapper.scrollTop;t>this.topHeight?this.fixedBack=!0:this.fixedBack=!1},overscroll:function(t){clearTimeout(this.clearTransformTimer);var e=(this.topHeight+t)/this.topHeight;this.$refs.main.classList.remove("transition"),this.$refs.img.classList.remove("transition"),this.$refs.title.classList.remove("transition"),this.$refs.main.style.transform="translateY(".concat(t,"px)"),this.$refs.title.style.transform="translate(-50%,calc(-50% + ".concat(t/2,"px))"),this.$refs.img.style.transform="scale(".concat(e,")")},removeTransition:function(){this.$refs.main.classList.remove("transition"),this.$refs.img.classList.remove("transition"),this.$refs.title.classList.remove("transition"),this.$refs.wrapper.classList.remove("transition")},clearTransform:function(){this.$refs.main.classList.add("transition"),this.$refs.img.classList.add("transition"),this.$refs.title.classList.add("transition"),this.$refs.main.style.transform="translateY(0px)",this.$refs.title.style.transform="translate(-50%,-50%)",this.$refs.img.style.transform="scale(1)",this.clearTransformTimer=setTimeout(this.removeTransition,300)}}},v=p,m=(r("1dde"),Object(f["a"])(v,i,s,!1,null,"7355b402",null));e["default"]=m.exports},"8b97":function(t,e,r){var i=r("d3f4"),s=r("cb7c"),o=function(t,e){if(s(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(s){e=!0}return function(t,r){return o(t,r),e?t.__proto__=r:i(t,r),t}}({},!1):void 0),check:o}},9093:function(t,e,r){var i=r("ce10"),s=r("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,s)}},aa77:function(t,e,r){var i=r("5ca1"),s=r("be13"),o=r("79e5"),n=r("fdef"),a="["+n+"]",l="​",c=RegExp("^"+a+a+"*"),h=RegExp(a+a+"*$"),f=function(t,e,r){var s={},a=o((function(){return!!n[t]()||l[t]()!=l})),c=s[t]=a?e(u):n[t];r&&(s[r]=c),i(i.P+i.F*a,"String",s)},u=f.trim=function(t,e){return t=String(s(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(h,"")),t};t.exports=f},c5f6:function(t,e,r){"use strict";var i=r("7726"),s=r("69a8"),o=r("2d95"),n=r("5dbc"),a=r("6a99"),l=r("79e5"),c=r("9093").f,h=r("11e9").f,f=r("86cc").f,u=r("aa77").trim,d="Number",p=i[d],v=p,m=p.prototype,b=o(r("2aeb")(m))==d,T="trim"in String.prototype,g=function(t){var e=a(t,!1);if("string"==typeof e&&e.length>2){e=T?e.trim():u(e,3);var r,i,s,o=e.charCodeAt(0);if(43===o||45===o){if(r=e.charCodeAt(2),88===r||120===r)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:i=2,s=49;break;case 79:case 111:i=8,s=55;break;default:return+e}for(var n,l=e.slice(2),c=0,h=l.length;c<h;c++)if(n=l.charCodeAt(c),n<48||n>s)return NaN;return parseInt(l,i)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof p&&(b?l((function(){m.valueOf.call(r)})):o(r)!=d)?n(new v(g(e)),r,p):g(e)};for(var y,S=r("9e1e")?c(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),P=0;S.length>P;P++)s(v,y=S[P])&&!s(p,y)&&f(p,y,h(v,y));p.prototype=m,m.constructor=p,r("2aba")(i,d,p)}},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);