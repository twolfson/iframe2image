"use strict";

(function() {

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

      // // serialize the DOM node to a String
      var serialized = new XMLSerializer().serializeToString(elem);
console.log(serialized);

var inlineStyle = 'word-spacing: 0px;';
var serialized = '\
<body style="background: none repeat scroll 0% 0% rgb(255, 239, 213);' + inlineStyle + ' z-index: auto; clip-path: none; clip-rule: nonzero; color-interpolation: srgb; color-interpolation-filters: linearrgb; dominant-baseline: auto; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: nonzero; filter: none; flood-color: rgb(0, 0, 0); flood-opacity: 1; image-rendering: auto; lighting-color: rgb(255, 255, 255); marker: none; mask: none; shape-rendering: auto; stop-color: rgb(0, 0, 0); stop-opacity: 1; stroke: none; stroke-dasharray: none; stroke-dashoffset: 0px; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 1px; text-anchor: start; text-rendering: auto; -moz-appearance: none; -moz-background-inline-policy: continuous; -moz-binding: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; -moz-box-align: stretch; -moz-box-direction: normal; -moz-box-flex: 0; -moz-box-orient: horizontal; -moz-box-ordinal-group: 1; -moz-box-pack: start; -moz-box-sizing: content-box; -moz-column-gap: 16px; -moz-float-edge: content-box; -moz-force-broken-image-icon: 0; -moz-image-region: auto; -moz-orient: horizontal; -moz-outline-radius: 0px 0px 0px 0px; -moz-user-focus: none; -moz-user-input: auto; -moz-user-modify: read-only; -moz-user-select: auto; opacity: 1; outline-offset: 0px; -moz-text-align-last: auto; ime-mode: auto; -moz-stack-sizing: stretch-to-fit; -moz-border-image: none; -moz-column-rule: 0px none rgb(0, 0, 0); word-wrap: normal; -moz-hyphens: manual; -moz-transform: none; -moz-transform-origin: 135.5px 250px; -moz-perspective: none; -moz-perspective-origin: 135.5px 250px; -moz-backface-visibility: visible; -moz-transform-style: flat; -moz-window-shadow: default; pointer-events: auto; -moz-tab-size: 8; resize: none;" xmlns="http://www.w3.org/1999/xhtml">\
  <div style="height: 500px; background: none repeat scroll 0% 0% rgb(0, 0, 255); border-collapse: separate; border-spacing: 0px; border-color: rgb(0, 0, 0); border-style: none; border-radius: 0px 0px 0px 0px; bottom: auto; box-shadow: none; caption-side: top; clear: none; clip: auto; color: rgb(0, 0, 0); content: none; counter-increment: none; counter-reset: none; cursor: auto; direction: ltr; display: block; empty-cells: show; float: none; font: 400 16px/19px serif; left: auto; letter-spacing: normal; list-style: disc outside none; margin: 0px; marker-offset: auto; max-height: none; max-width: none; min-height: 0px; min-width: 0px; outline: 0px none rgb(0, 0, 0); overflow: visible; padding: 0px; page-break-after: auto; page-break-before: auto; position: static; quotes: &quot;“&quot; &quot;”&quot; &quot;‘&quot; &quot;’&quot;; right: auto; table-layout: auto; text-align: start; -moz-text-blink: none; -moz-text-decoration-color: rgb(0, 0, 0); -moz-text-decoration-line: none; -moz-text-decoration-style: solid; text-indent: 0px; text-overflow: clip; text-shadow: none; text-transform: none; top: auto; unicode-bidi: -moz-isolate; vertical-align: baseline; visibility: visible; white-space: normal; width: 271px; word-spacing: 0px; z-index: auto; clip-path: none; clip-rule: nonzero; color-interpolation: srgb; color-interpolation-filters: linearrgb; dominant-baseline: auto; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: nonzero; filter: none; flood-color: rgb(0, 0, 0); flood-opacity: 1; image-rendering: auto; lighting-color: rgb(255, 255, 255); marker: none; mask: none; shape-rendering: auto; stop-color: rgb(0, 0, 0); stop-opacity: 1; stroke: none; stroke-dasharray: none; stroke-dashoffset: 0px; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 1px; text-anchor: start; text-rendering: auto; -moz-appearance: none; -moz-background-inline-policy: continuous; -moz-binding: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; -moz-box-align: stretch; -moz-box-direction: normal; -moz-box-flex: 0; -moz-box-orient: horizontal; -moz-box-ordinal-group: 1; -moz-box-pack: start; -moz-box-sizing: content-box; -moz-column-gap: 16px; -moz-float-edge: content-box; -moz-force-broken-image-icon: 0; -moz-image-region: auto; -moz-orient: horizontal; -moz-outline-radius: 0px 0px 0px 0px; -moz-user-focus: none; -moz-user-input: auto; -moz-user-modify: read-only; -moz-user-select: auto; opacity: 1; outline-offset: 0px; -moz-text-align-last: auto; ime-mode: auto; -moz-stack-sizing: stretch-to-fit; -moz-border-image: none; -moz-column-rule: 0px none rgb(0, 0, 0); word-wrap: normal; -moz-hyphens: manual; -moz-transform: none; -moz-transform-origin: 135.5px 250px; -moz-perspective: none; -moz-perspective-origin: 135.5px 250px; -moz-backface-visibility: visible; -moz-transform-style: flat; -moz-window-shadow: default; pointer-events: auto; -moz-tab-size: 8; resize: none; -moz-animation-play-state: running; -moz-text-size-adjust: auto;" id="dom">\
    Hello World!\
  </div>\
</body>';

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

