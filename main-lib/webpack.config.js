const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index'),
  output: {
    publicPath: 'auto',
    filename: '[name].[contenthash:8].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.html', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8085,
    // 配置允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': 'GET,POST,PUT,OPTIONS',
    },
  },
  devtool: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'lib_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Main': './src/Main',
        './Main1': './src/Main1',
        './Main2': './src/Main2',
      },
    }),
    new HtmlPlugin({
      template: path.resolve('./index.html'),
      title: 'webpack',
    }),
  ],
};
