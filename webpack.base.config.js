var isArray = require('lodash/isArray');
var mergeWith = require('lodash/mergeWith');
var path = require('path');

var defaults = {
  entry: [
    './src'
  ],
  output: {
    path: path.resolve('public'),
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    root: [
      path.resolve('src')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  postcss: [
    require('postcss-import')({ path: ['src']}),
    require('postcss-cssnext')
  ],
  devtool: 'source-map'
};

module.exports = function (config) {
  return mergeWith(defaults, config, function (a, b) {
    if (isArray(a)) {
      return a.concat(b);
    }
  });
};
