/**
 * SuperEmbed.js
 */
;(function() {
  /**
   * @returns {HTMLIFrameElement[]}
   */
  var getElements = function() {
    var selectors = [];

    for (var type in superEmbed.services) {
      var start = '';
      var end = '';

      switch (type) {
        case 'iframe':
          start = type + '[src*="//';
          end = '"]';
          break;

        case 'object':
          start = type + '[data*="//';
          end = '"]';
          break;
      }

      selectors.push(start + superEmbed.services[type].join(end + ',' + start) + end);
    }

    // Transform NodeList object into plain array.
    // @see http://stackoverflow.com/a/6545450
    return [].slice.call(document.body.querySelectorAll(selectors.join(',')));
  };

  /**
   * Execute this function when DOM is ready for manipulations.
   *
   * @returns {Function}
   *   Callback to keep video sizes updated.
   */
  var superEmbed = function() {
    var elements = getElements();

    elements.forEach(function(iframe, index) {
      // Remove ignored videos from a list of elements which will be processed
      // on every resizing. This reduce checks that class list contains needed.
      iframe.classList.contains('superembed-ignore') && elements.splice(index);
    });

    // Execute logic once and return the function to do the same whenever needed.
    return (function resize() {
      elements.forEach(function(iframe) {
        var ratio = 0;
        var width = 0;
        var height = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        var needsUpdate = false;

        // If responsive Gfycat embed, strip existing responsive code
        if ((iframe.getAttribute('style') === "position:absolute;top:0;left:0;") && (iframe.src.includes("gfycat.com/ifr/")) && (!(iframe.getAttribute('data-width')))) {
          // Remove existing responsive code
          iframe.setAttribute('style', '');
          iframe.parentElement.setAttribute('style', '');
          // Set 16:9 ratio
          iframe.setAttribute('data-width', '16');
          iframe.setAttribute('data-height', '9');
        }

        // SoundCloud has two embed types, a "Visual Embed" that shows the full album art, and a "Classic Embed" that is not as tall
        // SuperEmbed will force the visual embed to be square, and leave alone the classic embed (besides making sure width is set to 100%)
        if ((iframe.getAttribute('src').indexOf('w.soundcloud.com') != -1) && (!(iframe.getAttribute('data-width')))) {
          // Remove existing responsive code
          iframe.setAttribute('width', '');
          iframe.setAttribute('height', '');
          if (iframe.getAttribute('src').indexOf('visual=true') != -1) {
            // Visual embed
            iframe.setAttribute('data-width', '1');
            iframe.setAttribute('data-height', '1');
          } else {
            // Classic Embed
            iframe.setAttribute('data-width', '10');
            iframe.setAttribute('data-height', '4');
          }
        }

        // Original aspect ratio is kept in data attribute to maintain scaling.
        if (iframe.hasAttribute('data-width')) {
          width = iframe.getAttribute('data-width');
          height = iframe.getAttribute('data-height');
        } else {
          if (iframe.classList.contains('superembed-square')) {
            width = 1;
            height = 1;
          } else if (iframe.hasAttribute('width')) {
            width = iframe.offsetWidth;
            height = iframe.offsetHeight;
          } else {
            // Use 16:9 ratio if element doesn't have specified width and height.
            width = 16;
            height = 9;
          }

          iframe.setAttribute('data-width', width);
          iframe.setAttribute('data-height', height);
        }

        // Get width and height of parent container.
        // @see http://stackoverflow.com/a/3971875

        if (!window.getComputedStyle) {
          window.getComputedStyle = function(el, pseudo) {
            this.el = el;
            this.getPropertyValue = function(prop) {
              var re = /(\-([a-z]){1})/g;
              if (prop == 'float') prop = 'styleFloat';
              if (re.test(prop)) {
                prop = prop.replace(re, function () {
                  return arguments[2].toUpperCase();
                });
              }
              return el.currentStyle[prop] ? el.currentStyle[prop] : null;
            }
            return this;
          }
        }

        if (window.getComputedStyle) {
          maxWidth = parseInt(window.getComputedStyle(iframe.parentElement, null).getPropertyValue('width'));
          maxHeight = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('height'));
        } else if (iframe.currentStyle) {
          maxWidth = iframe.parentElement.clientWidth;
          maxHeight = document.body.clientHeight;
          console.log(maxWidth + ' ' + maxHeight + ', ' + iframe.currentStyle.margin);
        } else {
          maxWidth = iframe.parentElement.offsetWidth;
          maxHeight = document.body.clientHeight;
          console.log(maxWidth + ' ' + maxHeight);
        }

        if (width != maxWidth) {
          ratio = maxWidth / width;
          maxHeight = height * ratio;
          needsUpdate = true;
        }

        if (height > maxHeight) {
          ratio = maxHeight / height;
          maxWidth = width * ratio;
          needsUpdate = true;
        }

        if (needsUpdate) {
          iframe.setAttribute('width', maxWidth);
          iframe.setAttribute('height', maxHeight);
          // Reset width and height to match scaled video.
          width *= ratio;
          height *= ratio;
        }
      });

      return resize;
    })();
  };

  superEmbed.services = {
    // iframe[src*="//www.youtube.com/embed"]
    iframe: [
      'www.youtube.com/embed',
      'player.vimeo.com/video',
      'www.kickstarter.com/projects',
      'players.brightcove.net',
      'www.hulu.com/embed',
      'vine.co/v',
      'videopress.com/embed',
      'www.dailymotion.com/embed',
      'vid.me/e',
      'player.twitch.tv',
      'facebook.com/plugins/video.php',
      'gfycat.com/ifr/',
      'liveleak.com/ll_embed',
      'media.myspace.com',
      'archive.org/embed',
      'w.soundcloud.com/player',
      'channel9.msdn.com'
    ],
    // object[data*="//www.flickr.com/apps/video"]
    object: [
      'www.flickr.com/apps/video'
    ],
    css: [
      '.superembed-force'
    ]
  };

  window.superEmbed = superEmbed;
})();

if (window.jQuery) {
  jQuery(document).ready(function() {
    jQuery(window).resize(superEmbed());
  });
} else if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('resize', superEmbed());
  });
} else {
  window.onload = function() {
    window.attachEvent('onresize', superEmbed());
  }
}