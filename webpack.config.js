const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",

  target: "web",

  mode: "development",

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
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devtool: "eval-source-map",

  devServer: {
    historyApiFallback: true,
    compress: true,
    // port: Number(process.env.PORT),
    // host: process.env.HOST,
    hot: true,
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
    static: {
      directory: path.join(__dirname, "dist"),
      watch: {
        ignored: /node_modules/,
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "spa",
      template: path.resolve(
        __dirname,
        "assets",
        "templates",
        "index.template.html"
      ),
    }),
  ],
};
