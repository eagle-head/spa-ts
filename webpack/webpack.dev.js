const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "../"),

  target: "web",

  mode: "development",

  entry: {
    bundle: path.resolve(__dirname, "../src"),
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.AutomaticPrefetchPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(
        dotenv.config({
          path: path.resolve(__dirname, "../.env.dev"),
        }).parsed
      ),
    }),
    new CopyPlugin({
      patterns: [{ from: "./assets/robots.txt", to: "build" }],
    }),
    new HtmlWebpackPlugin({
      title: process.env.PAGE_TITLE,
      template: path.resolve(
        __dirname,
        "../assets",
        "templates",
        "index.template.html"
      ),
      favicon: path.resolve(__dirname, "../assets", "icons", "favicon.ico"),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],

  optimization: {
    minimize: false,
  },

  devtool: "eval-source-map",

  devServer: {
    historyApiFallback: true,
    compress: true,
    port: Number(process.env.PORT),
    host: process.env.HOST,
    hot: true,
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
    static: {
      directory: path.join(__dirname, "build"),
      watch: {
        ignored: /node_modules/,
      },
    },
  },
};
