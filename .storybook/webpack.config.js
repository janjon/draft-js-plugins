// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line no-var


console.log('yooooo', path.join(__dirname, '..', 'draft-js-focus-plugin', 'src'));

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      videojs: 'video.js',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          },
        ],
        include: [
          path.join(__dirname, '..', 'stories'),
          path.join(__dirname, '..', 'draft-js-plugins-editor', 'src'),
          path.join(__dirname, '..', 'draft-js-hashtag-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-linkify-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-anchor-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-mention-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-sticker-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-undo-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-emoji-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-drag-n-drop-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-drag-n-drop-upload-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-inline-toolbar-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-static-toolbar-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-side-toolbar-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-counter-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-focus-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-alignment-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-image-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-table-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-resizeable-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-buttons', 'src'),
          path.join(__dirname, '..', 'draft-js-audio-plugin', 'src'),
        ],
        exclude: path.join(__dirname, '..', 'draft-js-video-plugin', 'src'),
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
          },
        ],
        include: [
          path.join(__dirname, '..', 'draft-js-video-plugin', 'src'),
        ]
      },
      {
        test: /plugin\.css$/,
        loaders: [
          'style-loader', 'css-loader',
        ],
        include: [
          path.join('..', 'stories'),
          path.join(__dirname, '..', 'draft-js-plugins-editor', 'src'),
          path.join(__dirname, '..', 'draft-js-hashtag-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-linkify-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-anchor-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-mention-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-sticker-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-undo-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-emoji-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-drag-n-drop-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-drag-n-drop-upload-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-inline-toolbar-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-static-toolbar-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-side-toolbar-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-counter-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-focus-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-alignment-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-image-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-table-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-resizeable-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-buttons', 'src'),
          path.join(__dirname, '..', 'draft-js-video-plugin', 'src'),
          path.join(__dirname, '..', 'draft-js-audio-plugin', 'src'),
        ],
      }, {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
        ],
      }, {
        test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
      }
    ],
  },
  resolve: {
    alias: {
      'draft-js-plugins-editor': path.join(__dirname, '..', 'draft-js-plugins-editor', 'src'),
      'draft-js-hashtag-plugin': path.join(__dirname, '..', 'draft-js-hashtag-plugin', 'src'),
      'draft-js-linkify-plugin': path.join(__dirname, '..', 'draft-js-linkify-plugin', 'src'),
      'draft-js-anchor-plugin': path.join(__dirname, '..', 'draft-js-anchor-plugin', 'src'),
      'draft-js-mention-plugin': path.join(__dirname, '..', 'draft-js-mention-plugin', 'src'),
      'draft-js-sticker-plugin': path.join(__dirname, '..', 'draft-js-sticker-plugin', 'src'),
      'draft-js-undo-plugin': path.join(__dirname, '..', 'draft-js-undo-plugin', 'src'),
      'draft-js-emoji-plugin': path.join(__dirname, '..', 'draft-js-emoji-plugin', 'src'),
      'draft-js-counter-plugin': path.join(__dirname, '..', 'draft-js-counter-plugin', 'src'),
      'draft-js-drag-n-drop-plugin': path.join(__dirname, '..', 'draft-js-drag-n-drop-plugin', 'src'),
      'draft-js-drag-n-drop-upload-plugin': path.join(__dirname, '..', 'draft-js-drag-n-drop-upload-plugin', 'src'),
      'draft-js-inline-toolbar-plugin': path.join(__dirname, '..', 'draft-js-inline-toolbar-plugin', 'src'),
      'draft-js-static-toolbar-plugin': path.join(__dirname, '..', 'draft-js-static-toolbar-plugin', 'src'),
      'draft-js-side-toolbar-plugin': path.join(__dirname, '..', 'draft-js-side-toolbar-plugin', 'src'),
      'draft-js-focus-plugin': path.join(__dirname, '..', 'draft-js-focus-plugin', 'src'),
      'draft-js-alignment-plugin': path.join(__dirname, '..', 'draft-js-alignment-plugin', 'src'),
      'draft-js-image-plugin': path.join(__dirname, '..', 'draft-js-image-plugin', 'src'),
      'draft-js-table-plugin': path.join(__dirname, '..', 'draft-js-table-plugin', 'src'),
      'draft-js-resizeable-plugin': path.join(__dirname, '..', 'draft-js-resizeable-plugin', 'src'),
      'draft-js-buttons': path.join(__dirname, '..', 'draft-js-buttons', 'src'),
      '@yfmd/draft-js-buttons': path.join(__dirname, '..', 'draft-js-buttons', 'src'),
      'draft-js-video-plugin': path.join(__dirname, '..', 'draft-js-video-plugin', 'src'),
      'draft-js-audio-plugin': path.join(__dirname, '..', 'draft-js-audio-plugin', 'src'),
      react: path.join(__dirname, '..', 'node_modules', 'react'),
    },
  }
};
