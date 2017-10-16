/* eslint-disable no-var */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2', // necessary for the babel plugin
    path: path.join(__dirname, 'lib-css'), // where to place webpack files
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?importLoaders=1!postcss-loader' }),
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader' }),
      //   include: [
      //     path.join(__dirname, 'src', 'playerStyles'),
      //   ]
      // },
    ],
  },

  plugins: [
    new ExtractTextPlugin({ filename: `${path.parse(process.argv[2]).name}.css` }),
  ],
};
