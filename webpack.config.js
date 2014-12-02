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
  }),
];

module.exports = {
  entry: {
    vendor: "./src/vendor",
    nekogrid: "./src/nekogrid",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: st(DEBUG ? "[name].js" : "[chunkhash:15].[name].js"),
  },

  module: {
    loaders: [
      // All JS sources except vendor.
      {
        test: new RegExp("^" + path.join(__dirname, "src", "(?!vendor).+\\.js$")),
        loader: q("traceur", {
          // Don't use sourcemaps at this stage.
          sourceMaps: false,
        }),
      },
      // Vendor javascript.
      {
        test: path.join(__dirname, "src", "vendor.js"),
        loader: q("traceur", {
          runtime: true,
          sourceMaps: false,
        }),
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
