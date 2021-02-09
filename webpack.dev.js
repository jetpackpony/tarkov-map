require('dotenv').config();
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const PreactRefreshPlugin = require('@prefresh/webpack');

module.exports = (env) => merge(common(env), {
  mode: "development",
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "h",
                "pragmaFrag": "Fragment"
              }],
              "@prefresh/babel-plugin"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new PreactRefreshPlugin(),
    new webpack.DefinePlugin({
      'process.env.OFFLINE': JSON.stringify(process.env.OFFLINE),
      'process.env.DB_COLLECTION_NAME': JSON.stringify(process.env.DB_COLLECTION_NAME)
    }),
  ]
});