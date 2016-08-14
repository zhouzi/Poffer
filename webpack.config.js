var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  resolve: {
    root: [
      path.join(__dirname, './src')
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },
  postcss: [
    require('postcss-import')({ path: ['src']}),
    require('postcss-cssnext')
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
    }),
    new ExtractTextPlugin('styles.css')
  ]
};
