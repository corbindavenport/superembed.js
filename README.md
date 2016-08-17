SuperEmbed.js
================
Live demo now available at [jsfiddle.net/h6x04LuL](https://jsfiddle.net/h6x04LuL/)
---
SuperEmbed.js detects YouTube, Vimeo, Vine, VideoPress, DailyMotion, and more embedded videos on webpages and makes them responsive. Essentially, this means they strech to fill their container while still maintaining the original aspect ratio.

There's a lot of existing libraries that do this, but I had issues or just didn't like all the ones I tried, so I made my own. And this is it.

**Features**
* Works without external libraries like JQuery
* Works automatically with YouTube, Vimeo, Kickstarter, CollegeHumor, Hulu, Flickr, Vine, VideoPress, DailyMotion, Twitch.tv, and Vid.me embedded videos
* Responsive videos maintain their original aspect ratio
* Responsive layout can be forced or blocked with classes applied to the embed code
* Extremely tiny, the minified version is only 1.4 KB

**Browser support**

| Chrome | Internet Explorer | Firefox | Safari | Opera |
| :-----:| :-----:| :-----:| :-----:| :-----:|
| 4.0+ | 9.0+ | 3.5+ | 3.2+ | 10+ |

**How to use**

You can put the SuperEmbed script wherever you want on the page:
```
<script src="superembed.min.js"></script>
```
Then it will automatically resize any supported embedded videos. That's it.

*Note: If you already use JQuery, and you load SuperEmbed sometime after it, it will use JQuery to detect when the page is loaded and the window is resized (instead of DOM JavaScript).*

**Advanced features**

If you want to make an embedded video (or really any element) responsive, but it's not automatically detected by SuperEmbed, you can add the `.superembed-force` class to it like this:
```
<iframe src="http://www.example.com/video" class="superembed-force"></iframe>
```
You can also tell SuperEmbed to not resize a specific embed by adding the `.superembed-ignore` class, like this:
```
<iframe src="http://www.example.com/video" class="superembed-ignore"></iframe>
```
And finally, you can force a 1:1 aspect ratio by adding the `.superembed-square` class, like this:
```
<iframe src="http://www.example.com/video" class="superembed-square"></iframe>
```

---------------------------------------------------------
__New in SuperEmbed.js 2.2:__
* Fixes to avoid conflict with other libraries

__New in SuperEmbed.js 2.1:__
* Now optionally uses JQuery for detecting page load and page resize, if JQuery is loaded before SuperEmbed

__New in SuperEmbed.js 2.0:__
* Almost completely re-written, resizing is now handled by JS instead of CSS
* Now videos maintain their original aspect ratio when resized, no more letterboxing
* Minimum Internet Explorer version dropped to IE 9
* The `.superembed-square` class now applies a 1:1 ratio, instead of a 4:3 ratio

---------------------------------------------------------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
