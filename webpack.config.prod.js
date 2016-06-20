var webpack = require('webpack');
var config = require('./webpack.config.base');

config.output.filename = 'js/[name].[chunkhash:8].js';
config.output.publicPath = 'http://static.zhongan.com/website/health/iyb/assets/';

config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  __DEBUG__: false
}));

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false,
  }
}));

module.exports = config;
