module.exports = {
  entry: {
    "event-page": "./dev/event-page",
    "content-script": "./dev/content-script"
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ]
  }
}
