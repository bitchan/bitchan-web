var path = require("path");

module.exports = {
  entry: "./src/nekogrid",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "nekogrid.js",
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: "traceur"},
    ],
  },
};
