const path = require('path');
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: "dist/"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
              loader: "style-loader"
          }, 
          {
              loader: "css-loader"
          }, 
          {
            loader: "sass-loader",
            options: 
              {
                includePaths: ["absolute/path/a", "absolute/path/b"]
              }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ],
  },
  devtool: "eval-sourcemap",
  plugins: [
    new PrettierPlugin()
  ]
};
