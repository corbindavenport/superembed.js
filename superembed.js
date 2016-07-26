/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
*/

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csscalc-setclasses !*/
!function(e,n,s){function t(e,n){return typeof e===n}function o(){var e,n,s,o,a,i,c;for(var f in r)if(r.hasOwnProperty(f)){if(e=[],n=r[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],c=i.split("."),1===c.length?Modernizr[c[0]]=o:(!Modernizr[c[0]]||Modernizr[c[0]]instanceof Boolean||(Modernizr[c[0]]=new Boolean(Modernizr[c[0]])),Modernizr[c[0]][c[1]]=o),l.push((o?"":"no-")+c.join("-"))}}function a(e){var n=f.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?f.className.baseVal=n:f.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var l=[],r=[],c={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){r.push({name:e,fn:n,options:s})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr;var f=n.documentElement,u="svg"===f.nodeName.toLowerCase(),p=c._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];c._prefixes=p,Modernizr.addTest("csscalc",function(){var e="width:",n="calc(10px);",s=i("a");return s.style.cssText=e+p.join(n+e),!!s.style.length}),o(),a(l),delete c.addTest,delete c.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);

// Docready.js from https://github.com/jfriend00/docReady
!function(t,e){"use strict";function n(){if(!a){a=!0;for(var t=0;t<o.length;t++)o[t].fn.call(window,o[t].ctx);o=[]}}function d(){"complete"===document.readyState&&n()}t=t||"docReady",e=e||window;var o=[],a=!1,c=!1;e[t]=function(t,e){return a?void setTimeout(function(){t(e)},1):(o.push({fn:t,ctx:e}),void("complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(n,1):c||(document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):(document.attachEvent("onreadystatechange",d),window.attachEvent("onload",n)),c=!0)))}}("docReady",window);

// Search for video embeds at page ready and modify them
docReady(function() {
	// Supports YouTube, Vimeo, Kickstarter, CollegeHumor, Hulu, Flickr, Vine, VideoPress, DailyMotion, Vid.Me, Twitch.tv, and all other elements with superembed-force class
	var embeds = document.body.querySelectorAll("iframe[src*='//www.youtube.com/embed'],iframe[src*='//player.vimeo.com/video'],iframe[src*='//www.kickstarter.com/projects'],iframe[src*='//players.brightcove.net/'],iframe[src*='//www.hulu.com/embed'],object[data*='//www.flickr.com/apps/video'],iframe[src*='//vine.co/v/'],iframe[src*='//videopress.com/embed'],iframe[src*='//www.dailymotion.com/embed'],iframe[src*='//vid.me/e/'],iframe[src*='//player.twitch.tv/'],.superembed-force");

	if (Modernizr.csscalc) {
		// If calc() is supported, use that instead of injecting DIVs
		[].forEach.call(embeds, function(iframe) {
			if (!(iframe.classList.contains("superembed-ignore"))) {
				if ((iframe.classList.contains("superembed-square")) || (iframe.src.includes("//vine.co/v/"))) {
					iframe.setAttribute("style", "width: 100%; top: 5px; margin-bottom: -5px; height: calc(100vw*(4/4.25)); /* 4:3 */");
				} else {
					iframe.setAttribute("style", "width: 100%; top: 5px; margin-bottom: -5px; height: calc(100vw*(9/16)); /* 16:9 */");
				}
			}
		});
	} else {
		// If calc() is NOT supported, inject parent div and apply styles to both the parent and child embed
		[].forEach.call(embeds, function(iframe) {
			if (!(iframe.classList.contains("superembed-ignore"))) {
				// Add parent element
				var parent = iframe.parentNode;
				var wrapper = document.createElement('div');
				if ((iframe.classList.contains("superembed-square")) || (iframe.src.includes("//vine.co/v/"))) {
					wrapper.setAttribute("style", "position: relative; padding-bottom: 95%; /* 4:3 */ padding-top: 25px; height: 0;");
				} else {
					wrapper.setAttribute("style", "position: relative; padding-bottom: 53%; /* 16:9 */ padding-top: 25px; height: 0;");
				}
				parent.replaceChild(wrapper, iframe);
				wrapper.appendChild(iframe);
				iframe.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%;");
			}
		});
	}
});