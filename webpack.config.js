const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: './client/src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  // module rules for processing different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // module resolution configuration
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'client/src'), 'node_modules'],
  },
  // plugins for additional build steps
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      inject: true,
    }),
    new Dotenv(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devServer: {
    headers: {"Access-Control-Allow-Origin": "*"},
    historyApiFallback: true,
    hot: true,
    static: {
      //   publicPath: '/dist',
      // directory: path.resolve(__dirname, 'dist'),
      directory: path.resolve(__dirname, 'client/public'), // ensure access to static files in the public directory
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3003',
        logLevel: 'info',
      },
    ],
  },
};
