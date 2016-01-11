/**
 * jquery.flipshow.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
!function(t,i,s){"use strict";var n="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";t.fn.imagesLoaded=function(i){function e(){var s=t(f),n=t(p);h&&(p.length?h.reject(c,s,n):h.resolve(c)),t.isFunction(i)&&i.call(o,c,s,n)}function a(t){r(t.target,"error"===t.type)}function r(i,s){i.src!==n&&-1===t.inArray(i,l)&&(l.push(i),s?p.push(i):f.push(i),t.data(i,"imagesLoaded",{isBroken:s,src:i.src}),d&&h.notifyWith(t(i),[s,c,t(f),t(p)]),c.length===l.length&&(setTimeout(e),c.unbind(".imagesLoaded",a)))}var o=this,h=t.isFunction(t.Deferred)?t.Deferred():0,d=t.isFunction(h.notify),c=o.find("img").add(o.filter("img")),l=[],f=[],p=[];return t.isPlainObject(i)&&t.each(i,function(t,s){"callback"===t?i=s:h&&h[t](s)}),c.length?c.bind("load.imagesLoaded error.imagesLoaded",a).each(function(i,e){var a=e.src,o=t.data(e,"imagesLoaded");return o&&o.src===a?void r(e,o.isBroken):e.complete&&e.naturalWidth!==s?void r(e,0===e.naturalWidth||0===e.naturalHeight):void((e.readyState||e.complete)&&(e.src=n,e.src=a))}):e(),h?h.promise(o):o};var e=i.Modernizr;t.Flipshow=function(i,s){this.$el=t(s),this._init(i)},t.Flipshow.defaults={speed:700,easing:"ease-out"},t.Flipshow.prototype={_init:function(i){this.options=t.extend(!0,{},t.Flipshow.defaults,i),this.support=e.csstransitions&&e.csstransforms3d&&!/MSIE (\d+\.\d+);/.test(navigator.userAgent);var s={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},n={WebkitTransform:"-webkit-transform",MozTransform:"-moz-transform",OTransform:"-o-transform",msTransform:"-ms-transform",transform:"transform"};this.support&&(this.transEndEventName=s[e.prefixed("transition")]+".cbpFWSlider",this.transformName=n[e.prefixed("transform")]),this.transitionProperties=this.transformName+" "+this.options.speed+"ms "+this.options.easing,this.$listItems=this.$el.children("ul.fc-slides"),this.$items=this.$listItems.children("li").hide(),this.itemsCount=this.$items.length,this.current=0,this.$listItems.imagesLoaded(t.proxy(function(){this.$items.eq(this.current).show(),this.itemsCount>0&&(this._addNav(),this.support&&this._layout())},this))},_addNav:function(){var i=this,s=t('<div class="fc-left"><span></span><span></span><span></span><i class="fa fa-arrow-left"></i></div>'),n=t('<div class="fc-right"><span></span><span></span><span></span><i class="fa fa-arrow-right"></i></div>');t("<nav></nav>").append(s,n).appendTo(this.$el),s.find("span").on("click.flipshow touchstart.flipshow",function(){i._navigate(t(this),"left")}),n.find("span").on("click.flipshow touchstart.flipshow",function(){i._navigate(t(this),"right")})},_layout:function(i,s){this.$flipFront=t('<div class="fc-front"><div></div></div>'),this.$frontContent=this.$flipFront.children("div:first"),this.$flipBack=t('<div class="fc-back"><div></div></div>'),this.$backContent=this.$flipBack.children("div:first"),this.$flipEl=t('<div class="fc-flip"></div>').append(this.$flipFront,this.$flipBack).hide().appendTo(this.$el)},_navigate:function(t,i){if(this.isAnimating&&this.support)return!1;this.isAnimating=!0;var s=this.$items.eq(this.current).hide();"right"===i?this.current<this.itemsCount-1?++this.current:this.current=0:"left"===i&&(this.current>0?--this.current:this.current=this.itemsCount-1);var n=this.$items.eq(this.current);this.support?this._flip(s,n,i,t.index()):n.show()},_flip:function(i,s,n,e){var a="",r=t('<div class="fc-overlay-light"></div>'),o=t('<div class="fc-overlay-dark"></div>');if("undefined"!=typeof this.$flipEl){this.$flipEl.css("transition",this.transitionProperties),this.$flipFront.find("div.fc-overlay-light, div.fc-overlay-dark").remove(),this.$flipBack.find("div.fc-overlay-light, div.fc-overlay-dark").remove(),"right"===n?(this.$flipFront.append(r),this.$flipBack.append(o),o.css("opacity",1)):"left"===n&&(this.$flipFront.append(o),this.$flipBack.append(r),r.css("opacity",1));var h={transition:"opacity "+this.options.speed/1.3+"ms"};switch(r.css(h),o.css(h),e){case 0:a="left"===n?"rotate3d(-1,1,0,-179deg) rotate3d(-1,1,0,-1deg)":"rotate3d(1,1,0,180deg)";break;case 1:a="left"===n?"rotate3d(0,1,0,-179deg) rotate3d(0,1,0,-1deg)":"rotate3d(0,1,0,180deg)";break;case 2:a="left"===n?"rotate3d(1,1,0,-179deg) rotate3d(1,1,0,-1deg)":"rotate3d(-1,1,0,179deg) rotate3d(-1,1,0,1deg)"}this.$flipBack.css("transform",a),this.$frontContent.empty().html(i.html()),this.$backContent.empty().html(s.html()),this.$flipEl.show();var d=this;setTimeout(function(){d.$flipEl.css("transform",a),r.css("opacity","right"===n?1:0),o.css("opacity","right"===n?0:1),d.$flipEl.on(d.transEndEventName,function(t){"fc-overlay-light"!==t.target.className&&"fc-overlay-dark"!==t.target.className&&d._ontransitionend(s)})},25)}},_ontransitionend:function(t){t.show(),this.$flipEl.off(this.transEndEventName).css({transition:"none",transform:"none"}).hide(),this.isAnimating=!1}};var a=function(t){i.console&&i.console.error(t)};t.fn.flipshow=function(i){if("string"==typeof i){var s=Array.prototype.slice.call(arguments,1);this.each(function(){var n=t.data(this,"flipshow");return n?t.isFunction(n[i])&&"_"!==i.charAt(0)?void n[i].apply(n,s):void a("no such method '"+i+"' for flipshow instance"):void a("cannot call methods on flipshow prior to initialization; attempted to call method '"+i+"'")})}else this.each(function(){var s=t.data(this,"flipshow");s?s._init():s=t.data(this,"flipshow",new t.Flipshow(i,this))});return this}}(jQuery,window);