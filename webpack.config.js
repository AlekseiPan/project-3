const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'js/main.bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/nouislider.bundle.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
