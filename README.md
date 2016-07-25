SuperEmbed.js
================
Live demo now available at [jsfiddle.net/gzsy52tm](https://jsfiddle.net/gzsy52tm/)
---
SuperEmbed.js detects YouTube, Vimeo, Vine, VideoPress, DailyMotion, and more embedded videos on webpages and makes them responsive. Essentially, this means they strech to fill their container while still maintaining the original aspect ratio.

There's a lot of existing libraries that do this, but I had issues or just didn't like all the ones I tried, so I made my own. And this is it.

**Features**
* Works without external libraries like JQuery
* Works automatically with YouTube, Vimeo, Kickstarter, CollegeHumor, Hulu, Flickr, Vine, VideoPress, and DailyMotion embedded videos
* Responsive layout can be forced or blocked with classes applied to the embed code
* Uses CSS `calc()` property if the browser supports it, so no messy injected DIV tags
* Extremely tiny, the minified version is only 3.3KB

**How to use**

You can put the SuperEmbed script wherever you want on the page:
```
<script src="superembed.min.js"></script>
```
Then it will automatically resize any supported embedded videos. That's it.

**Advanced features**

If you want to make an embedded video (or really any element) responsive and locked to a 16:9 ratio, but it's not automatically detected by SuperEmbed, you can add the `.superembed-force` class to it like this:
```
<iframe src="http://www.example.com/video" class="superembed-force"></iframe>
```
You can also tell SuperEmbed to not resize a specific embed by adding the `.superembed-ignore` class, like this:
```
<iframe src="http://www.example.com/video" class="superembed-ignore"></iframe>
```

---------------------------------------------------------
__New in SuperEmbed.js 1.0:__
* Initial release

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
