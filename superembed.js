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

        // Original aspect ratio is kept in data attribute to maintain scaling.
        if (iframe.hasAttribute('data-width')) {
          width = iframe.getAttribute('data-width');
          height = iframe.getAttribute('data-height');
        }
        else {
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
        if (window.getComputedStyle) {
          maxWidth = parseInt(window.getComputedStyle(iframe.parentElement, null).getPropertyValue('width'));
          maxHeight = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('height'));
        } else {
          maxWidth = iframe.parentElement.offsetWidth;
          maxHeight = document.body.clientHeight;
        }

        if (width > maxWidth) {
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
      'player.twitch.tv'
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
} else {
  window.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('resize', superEmbed())
  });
}
