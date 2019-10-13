const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
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

  plugins: [
    new HtmlWebpackPlugin()
  ],

  entry: {
    javascript: "./src/index.jsx",
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, "build"),
  }
}
