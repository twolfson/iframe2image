# iframe2image

Convert an iframe to an image

## Getting Started
### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/twolfson/iframe2image/master/dist/iframe2image.min.js
[max]: https://raw.github.com/twolfson/iframe2image/master/dist/iframe2image.js

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
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## License
Copyright (c) 2012 Todd Wolfson
Licensed under the MIT license.
