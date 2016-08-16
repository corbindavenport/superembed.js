/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
*/

// Search for video embeds and modify them
function resizeVids() {
	var embeds = document.body.querySelectorAll("iframe[src*='//www.youtube.com/embed'],iframe[src*='//player.vimeo.com/video'],iframe[src*='//www.kickstarter.com/projects'],iframe[src*='//players.brightcove.net/'],iframe[src*='//www.hulu.com/embed'],object[data*='//www.flickr.com/apps/video'],iframe[src*='//vine.co/v/'],iframe[src*='//videopress.com/embed'],iframe[src*='//www.dailymotion.com/embed'],iframe[src*='//vid.me/e/'],iframe[src*='//player.twitch.tv/'],.superembed-force");

	[].forEach.call(embeds, function(iframe) {
		if (!(iframe.classList.contains("superembed-ignore"))) {
			// Original aspect ratio is kept in data attribute to maintain scaling
			if (!(iframe.hasAttribute("data-width"))) {
				if (iframe.classList.contains("superembed-square")) {
					iframe.setAttribute("data-width", "1");
					iframe.setAttribute("data-height", "1");
				} else if ((iframe.hasAttribute("width")) && (iframe.hasAttribute("height"))) {
					iframe.setAttribute("data-width", iframe.offsetWidth);
					iframe.setAttribute("data-height", iframe.offsetHeight);
				} else {
					// Use 16:9 ratio if element doesn't have specified width and height
					iframe.setAttribute("data-width", "16");
					iframe.setAttribute("data-height", "9");
				}
			}
			// Resizing code based on http://stackoverflow.com/a/3971875
			var maxWidth = iframe.parentElement.offsetWidth; // Width of parent container
			var maxHeight = document.body.clientHeight; // Height of page
			var ratio = 0; // Used for aspect ratio
			var width = iframe.getAttribute("data-width"); // Original video width
			var height = iframe.getAttribute("data-height"); // Original video height
			// Check if the current width is larger than the max
			if (width != maxWidth) {
				ratio = maxWidth / width; // get ratio for scaling video
				iframe.setAttribute("width", maxWidth);
				iframe.setAttribute("height", height * ratio);
				height = height * ratio; // Reset height to match scaled video
				width = width * ratio; // Reset width to match scaled video
			}
			// Check if current height is larger than max
			if (height > maxHeight) {
				ratio = maxHeight / height; // Get ratio for scaling video
				iframe.setAttribute("height", maxHeight);
				iframe.setAttribute("width", width * ratio);
				width = width * ratio; // Reset width to match scaled video
				height = height * ratio; // Reset height to match scaled video
			}
		}
	});
}

// Resize videos on page load and after window is resized

// If JQuery is loaded, it uses JQuery's browser events for higher browser compatibility
// Otherwise, the DOMContentLoaded event listener is used
if (window.jQuery) {
	jQuery(document).ready(function() {resizeVids();});
	jQuery(window).resize(function() {resizeVids();});
} else {
	window.addEventListener("DOMContentLoaded", resizeVids);
	window.addEventListener("resize", resizeVids);
}
