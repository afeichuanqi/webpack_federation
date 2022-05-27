const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    filename: "[name].[contenthash:8].js",
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".html", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 8086,
    // 配置允许跨域
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "GET,POST,PUT,OPTIONS",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "main_app",
      // filename: "remoteEntry.js",
      remotes: {
        lib_remote: "lib_remote@http://localhost:8085/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
    }),
    new HtmlPlugin({
      template: path.resolve("./index.html"),
      title: "webpack",
    }),
  ],
};
