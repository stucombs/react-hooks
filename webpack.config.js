const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"], "plugins": ["@babel/plugin-proposal-class-properties"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff(2)?|eot|ps)$/i,
        use: ['file-loader']
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "./dist/",
    filename: "bundle.js"
  }
};
