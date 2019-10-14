const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: {
    javascript: "./src/index.jsx",
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, "build"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      fileName: "build/index.html"
    }),
  ],

  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },

  mode: "development",
  devtool: "source-map",

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.html$/,
      use: [{
        loader: "html-loader"
      }]
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [{
        loader: "url-loader",
        options: {
          limit: 30000,
          name: "[name].[ext]"
        }
      }]
    }
    ]
  },
}
