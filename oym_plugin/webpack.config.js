"use strict";

module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          // test: /\.json$/,
          // loader: "json-loader",
          exclude: /node_modules/,
          query: {
            presets: ["es2016"]
          }
        }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};