const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/Test01.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    publicPath: './dist',
    hot: true,
    port: 3000,
    historyApiFallback: false,
  },
};
