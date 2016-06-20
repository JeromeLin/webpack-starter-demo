var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('stylesheet/[name].[chunkhash:8].css');

var config = {

  entry: {
    'vendors': [
      './src/css/utils/normalize.scss',
    ],
    'index': [
      './src/css/pages/index.scss',
      './src/js/pages/index.js',
    ],
    'page1': [
      './src/css/pages/page1.scss',
      './src/js/pages/page1.js',
    ]
  },

  output: {
    path: __dirname + '/assets',
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },

  plugins: [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      js : __dirname + '/src/js',
      css: __dirname + '/src/css'
    }
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      { 
        test: /\.scss$/,
        loader: extractCSS.extract("style", "css?sourceMap&-minimize!autoprefixer!sass?sourceMap")
      },
      { 
        test: /\.css$/,
        loader: extractCSS.extract("style", "css?sourceMap&-minimize!autoprefixer")
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
      },
      {
        test: /\.(html)$/,
        loader: 'html'
      }
    ]
  }
}

for (var key in config.entry) {
  if (key == 'vendors') {
    continue;
  }
  config.plugins.push(new HtmlWebpackPlugin({
    template: './src/' + key + '.html',
    filename: key + '.html',
    chunks: ['vendors', key]
  }));
}

module.exports = config;