const path = require("path")
const webpack = require("webpack")

module.exports = {
  devtool: "eval",
  entry: {
    "CheckAddress": "./src/js/CheckAddress",
    "CreateCertificate": "./src/js/CreateCertificate",
    "ViewCertificate": "./src/js/ViewCertificate",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist/",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.json$/, // To load the json files
        loader: "json-loader",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
}
