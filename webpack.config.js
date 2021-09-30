const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./lib/utils.js",
  module: {
    rules: [
      {
        test: /\.md$/i,
        use: "raw-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "lib")],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: __dirname + "/bundle",
    filename: "[name].js",
    library: "neeto-utis",
    libraryTarget: "umd",
  },
  plugins: [new PeerDepsExternalsPlugin()],
};
