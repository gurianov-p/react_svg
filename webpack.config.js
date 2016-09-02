var path = require('path');
var webpack = require('webpack');


var baseConfig = {
  cache: true,
  entry: './index.js',
  context: path.join(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', "react"]
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
};


module.exports = baseConfig;
