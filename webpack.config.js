"use strict";

var path = require("path");

function q(loaders, query) {
  return loaders + "?" + JSON.stringify(query);
};

module.exports = {
  entry: {
    nekogrid: "./src/nekogrid",
    vendor: "./src/vendor",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
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
          "style/url",
          q("file", {
            name: "[name].css",
          }),
          q("sass", {
            outputStyle: "expanded",
            includePaths: ["bower_components/foundation/scss"],
          }),
        ],
      },
    ],
  },

};
