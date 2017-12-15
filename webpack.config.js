const path = require('path');

module.exports = {
  entry: ['./src/Test02.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
