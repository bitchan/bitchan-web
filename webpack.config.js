"use strict";

var path = require("path");
var webpack = require("webpack");

var DEBUG = process.env.NODE_ENV !== "production";

function q(loaders, query) {
  return loaders + "?" + JSON.stringify(query);
}

module.exports = {
  entry: {
    nekogrid: "./src/nekogrid",
    vendor: "./src/vendor",
  },
  output: {
    path: path.join(__dirname, "dist", "static"),
    filename: DEBUG ? "[name].js" : "[chunkhash:15].[name].js",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "traceur",
      },
      {
        test: /\.scss$/,
        loaders: [
          q("file", {
            name: DEBUG ? "[name].css" : "[hash:15].[name].css",
          }),
          q("sass", {
            outputStyle: DEBUG ? "expanded" : "compressed",
            includePaths: ["bower_components/foundation/scss"],
          }),
        ],
      },
    ],
  },

  plugins: DEBUG ? [] : [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

};
