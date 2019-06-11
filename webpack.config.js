var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// library configuration
var libraryName = 'tritra';
var outputFile = path.join('js', libraryName + '.js');

module.exports = {
  entry: './src/lib/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Triangle Tracker Example',
      template: './src/examples/tracker/index.ejs',
      filename: 'examples/index-tracker.html',
      inject: 'head'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    host: '0.0.0.0',
    port: 8080
  }
};
