const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
require("dotenv").config({ path: "./.env" });

module.exports = (env) => ({
  entry: {
    main: path.resolve(__dirname, "./src/index.tsx"),
  },
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Map of Tarkov",
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.OFFLINE": JSON.stringify(process.env.OFFLINE),
      "process.env.FIREBASE_API_KEY": JSON.stringify(
        process.env.FIREBASE_API_KEY
      ),
      "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
        process.env.FIREBASE_PROJECT_ID
      ),
      "process.env.SESSION_COLLECTION_PROD": JSON.stringify(
        process.env.SESSION_COLLECTION_PROD
      ),
      "process.env.SESSION_COLLECTION_DEV": JSON.stringify(
        process.env.SESSION_COLLECTION_DEV
      ),
    }),
  ],
});
