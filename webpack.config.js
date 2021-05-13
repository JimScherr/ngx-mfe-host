const path = require('path');
const helpers = require('./helpers');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: {
    main: './src/main.ts',
    vendor: './src/vendor.ts'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },

  devtool: 'inline-source-map',
  mode: 'development',

  resolve: {
    extensions: [
      ".ts", ".js", ".json", ".css"
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new ModuleFederationPlugin({
      remotes: {
        // TBD
      }
    })
  ]
};
