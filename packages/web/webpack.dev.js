require('dotenv').config();
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PreactRefreshPlugin = require('@prefresh/webpack');

module.exports = (env) => merge(common(env), {
  mode: "development",
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/,
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
      },
    ]
  },
  plugins: [
    new PreactRefreshPlugin(),
  ]
});