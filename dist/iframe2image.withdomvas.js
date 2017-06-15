/*! iframe2image - v0.2.1 - 2017-06-14
* https://github.com/twolfson/iframe2image
* Copyright (c) 2017 Todd Wolfson; Licensed MIT */

(function() {
  "use strict";

  var supportsCSSText = getComputedStyle(document.body).cssText !== "";

  function copyCSS(elem, origElem, log) {

    var computedStyle = getComputedStyle(origElem);

    if(supportsCSSText) {
      elem.style.cssText = computedStyle.cssText;

    } else {

      // Really, Firefox?
      for(var prop in computedStyle) {
        if(isNaN(parseInt(prop, 10)) && typeof computedStyle[prop] !== 'function' && !(/^(cssText|length|parentRule)$/).test(prop)) {
          elem.style[prop] = computedStyle[prop];
        }
      }

    }

  }

  function inlineStyles(elem, origElem) {

    var children = elem.querySelectorAll('*');
    var origChildren = origElem.querySelectorAll('*');

    // copy the current style to the clone
    copyCSS(elem, origElem, 1);

    // collect all nodes within the element, copy the current style to the clone
    Array.prototype.forEach.call(children, function(child, i) {
      copyCSS(child, origChildren[i]);
    });

    // strip margins from the outer element
    elem.style.margin = elem.style.marginLeft = elem.style.marginTop = elem.style.marginBottom = elem.style.marginRight = '';

  }

  window.domvas = {

    toImage: function(origElem, callback, width, height, left, top) {

      left = (left || 0);
      top = (top || 0);

      var elem = origElem.cloneNode(true);

      // inline all CSS (ugh..)
      inlineStyles(elem, origElem);

      // unfortunately, SVG can only eat well formed XHTML
      elem.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

      // serialize the DOM node to a String
      var serialized = new XMLSerializer().serializeToString(elem);

      // Create well formed data URL with our DOM string wrapped in SVG
      var dataUri = "data:image/svg+xml," +
        "<svg xmlns='http://www.w3.org/2000/svg' width='" + ((width || origElem.offsetWidth) + left) + "' height='" + ((height || origElem.offsetHeight) + top) + "'>" +
          "<foreignObject width='100%' height='100%' x='" + left + "' y='" + top + "'>" +
          serialized +
          "</foreignObject>" +
        "</svg>";

      // create new, actual image
      var img = new Image();
      img.src = dataUri;

      // when loaded, fire onload callback with actual image node
      img.onload = function() {
        if(callback) {
          callback.call(this, this);
        }
      };

    }

  };

})();


(function(exports) {

  /**
   * Convert an iframe to an image
   * @param {Object|HtmlElement} params If it is an object, properties will be looked up. If it is an iframe, it will be converted into an image.
   * @param {HTMLElement} params.iframe Iframe to convert over
   * @param {Function} cb Callback to execute once iframe is converted
   * @callback arguments[0] Error if any occurred
   * @callback arguments[1] Image element of rendered content
   */
  function iframe2image(params, cb) {
    // Attempt to access our window
    var iframe = params.iframe || params;
    if (!iframe.contentWindow) {
      throw new Error('Unable to access iframe contents. Please verify it\'s hosted on the same domain');
    }

    // If our iframe has already loaded, then run `next` immediately
    var contentDocument = iframe.contentWindow.document;
    if (contentDocument && contentDocument.readyState === 'complete') {
      next();
    // Otherwise, wait for our document to load
    } else {
      function handleLoad(evt) { // jshint ignore:line
        iframe.removeEventListener('load', handleLoad);
        next();
      }
      iframe.addEventListener('load', handleLoad);
    }

    // When our page is loaded
    function next() {
      // Grab the body of the element
      // DEV: We don't reuse `contentDocument` as the iframe may have switched pages while loading
      var iframeBody = iframe.contentWindow.document.body;

      // Obtain the dimensions of the iframe
      // TODO: Cross-browser this (even though domvas uses exactly this)
      // TODO: Allow for specification of iframe dimension, body dimensions, or custom
      var iframeStyle = getComputedStyle(iframe),
          iframeHeight = parseInt(iframeStyle.height, '10'),
          iframeWidth = parseInt(iframeStyle.width, '10');

      // Convert the DOM body via domvas
      domvas.toImage(iframeBody, function (img) {
        // Callback with the image
        cb(null, img);
      }, iframeWidth, iframeHeight);
    }
  }
  exports.iframe2image = iframe2image;

}(typeof exports === 'object' && exports || this));
