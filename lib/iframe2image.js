/*
 * iframe2image
 * https://github.com/twolfson/iframe2image
 *
 * Copyright (c) 2012 Todd Wolfson
 * Licensed under the MIT license.
 */

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
