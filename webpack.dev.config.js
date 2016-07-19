var base = require('./webpack.base.config');
var webpack = require('webpack');

module.exports = base({
  devServer: {
    contentBase: {
      target: 'http://localhost:1234'
    },
    port: 1235,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
