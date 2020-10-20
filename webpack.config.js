const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { compilation } = require('webpack');

module.exports = {
 mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'cron-expression-input.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [ 
      {
        test: /\.m?js$/,
        exclude: /(node_modules )/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      templateContent:
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
  </head>
  <body>
    <cron-expression-input height="34px" width="250px" color="d58512"></cron-expression-input>
  </body>
</html>`
    })
  ]
};
