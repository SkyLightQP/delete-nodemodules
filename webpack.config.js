const path = require("path");

module.exports = {
  mode: "production",

  target: "node",

  entry: "./index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js"],
  },
};
