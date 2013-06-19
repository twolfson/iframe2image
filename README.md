# iframe2image [![Donate on Gittip](http://badgr.co/gittip/twolfson.png)](https://www.gittip.com/twolfson/)

Convert an iframe to an image

## Getting Started
### On the server
Install the module with: `npm install iframe2image`. This is only practical with a tool like [browserify](https://github.com/substack/node-browserify).

### In the browser
Download the [production version][min] or the [development version][max].

You will also need [domvas](https://github.com/pbakaus/domvas) on your site. iframe2image pre-packaged with domvas can be found in both [production version][minWithDomvas] and [development version[maxWithDomvas].

[min]: https://raw.github.com/twolfson/iframe2image/master/dist/iframe2image.min.js
[max]: https://raw.github.com/twolfson/iframe2image/master/dist/iframe2image.js
[minWithDomvas]: https://raw.github.com/twolfson/iframe2image/master/dist/iframe2image.withdomvas.min.js
[maxWithDomvas]: https://raw.github.com/twolfson/iframe2image/master/dist/iframe2image.withdomvas.js

In your web page:

```html
<script src="dist/iframe2image.min.js"></script>
<script>
iframe2image(myIframe, cb);
</script>
```

In your code, you can attach iframe2image's methods to any object.

```html
<script>
this.exports = MyGlobal.utils;
</script>
<script src="dist/iframe2image.min.js"></script>
<script>
MyGlobal.utils.iframe2image(myIframe, cb);
</script>
```

## Documentation
iframe2image is exposed via a single function
```js
/**
 * Convert an iframe to an image
 * @param {Object|HtmlElement} params If it is an object, properties will be looked up. If it is an iframe, it will be converted into an image.
 * @param {HTMLElement} params.iframe Iframe to convert over
 * @param {Function} cb Callback to execute once iframe is converted
 * @callback arguments[0] Error if any occurred
 * @callback arguments[1] Image element of rendered content
 */
 ```

## Examples
Taken from the `demo` folder:
```js
// Set up the canvas dimensions
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 600;

// Grab the iframe
var inner = document.getElementById('inner');

// Get the image
iframe2image(inner, function (err, img) {
  // If there is an error, log it
  if (err) { return console.error(err); }

  // Otherwise, add the image to the canvas
  context.drawImage(img, 0, 0);
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## License
Copyright (c) 2012 Todd Wolfson
Licensed under the MIT license.
