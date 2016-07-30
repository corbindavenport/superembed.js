/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
*/

// Docready.js from https://github.com/jfriend00/docReady
!function(t,e){"use strict";function n(){if(!a){a=!0;for(var t=0;t<o.length;t++)o[t].fn.call(window,o[t].ctx);o=[]}}function d(){"complete"===document.readyState&&n()}t=t||"docReady",e=e||window;var o=[],a=!1,c=!1;e[t]=function(t,e){return a?void setTimeout(function(){t(e)},1):(o.push({fn:t,ctx:e}),void("complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(n,1):c||(document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):(document.attachEvent("onreadystatechange",d),window.attachEvent("onload",n)),c=!0)))}}("docReady",window);

// Search for video embeds at page ready and modify them
docReady(function() {
	// Supports YouTube, Vimeo, Kickstarter, CollegeHumor, Hulu, Flickr, Vine, VideoPress, DailyMotion, Vid.Me, Twitch.tv, and all other elements with superembed-force class
	var embeds = document.body.querySelectorAll("iframe[src*='//www.youtube.com/embed'],iframe[src*='//player.vimeo.com/video'],iframe[src*='//www.kickstarter.com/projects'],iframe[src*='//players.brightcove.net/'],iframe[src*='//www.hulu.com/embed'],object[data*='//www.flickr.com/apps/video'],iframe[src*='//vine.co/v/'],iframe[src*='//videopress.com/embed'],iframe[src*='//www.dailymotion.com/embed'],iframe[src*='//vid.me/e/'],iframe[src*='//player.twitch.tv/'],.superembed-force");

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
});