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
    var iframe = params.iframe || params;

    // TODO: Detect if iframe has already loaded
    iframe.onload = function () {
      // Grab the body of the element
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
    };
  }
  exports.iframe2image = iframe2image;

}(typeof exports === 'object' && exports || this));
