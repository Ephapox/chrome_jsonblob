# Chrome JSONblob

[Download here](https://chrome.google.com/webstore/detail/jsonblob/cljhoojcdfijamkmaejeplcebkpindob)

Chrome Extension for the wonderfully helpful [JSONblob](https://jsonblob.com/).

Technology

* [React](https://facebook.github.io/react/)
* [Webpack](webpack.github.io)

Build


```
webpack

or

npm run build // uglify + zip the build directory.

or

npm run start // enables watch.

```

The build directory will move the manfiest.production.json file to build/manifest.json

The paths in the build file, content scripts, and background scripts should be relative to the build directory paths.
