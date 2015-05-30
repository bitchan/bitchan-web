"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var DEBUG = process.env.NODE_ENV !== "production";

function q(loaders, query) {
  return loaders + "?" + JSON.stringify(query);
}

function st(filename) {
  return path.join("static", filename);
}

function getNameBySuffix(suffix, stats) {
  return stats.assets.filter(function(asset) {
    return asset.name.slice(-suffix.length) === suffix;
  })[0].name;
}

var commonPlugins = [
  new HtmlWebpackPlugin({
    template: path.join("src", "index.html"),
    bySuffix: getNameBySuffix,
    DEBUG: DEBUG,
  }),
];

module.exports = {
  entry: {
    vendor: "./src/vendor",
    bitchan: "./src/bitchan",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: st(DEBUG ? "[name].js" : "[chunkhash:15].[name].js"),
  },

  module: {
    loaders: [
      // All JS sources except vendor.
      // TODO(Kagami): Move React and babel runtime code to vendor.
      {
        test: new RegExp("^" + path.join(__dirname, "src", "(?!vendor).+\\.js$")),
        loaders: ["babel"],
      },
      // Vendor SCSS.
      {
        test: /\.scss$/,
        loaders: [
          q("file", {
            name: st(DEBUG ? "[name].css" : "[hash:15].[name].css"),
          }),
          q("sass", {
            outputStyle: DEBUG ? "expanded" : "compressed",
            includePaths: ["bower_components/foundation/scss"],
          }),
        ],
      },
    ],
  },

  plugins: DEBUG ? commonPlugins : commonPlugins.concat([
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]),

};
