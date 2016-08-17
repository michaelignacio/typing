const rucksack = require('rucksack-css');
const webpack = require('webpack');
const path = require('path');

const WebpackErrorNotificationPlugin = require('webpack-error-notification');

const ENV = process.env.NODE_ENV || 'development';
const isProd = ENV === 'production';

module.exports = {
  debug: !isProd,
  cache: !isProd,
  devtool: isProd ? '#source-map' : '#cheap-module-eval-source-map',
  context: path.join(__dirname, './client'),
  entry: {
    index: ['bootstrap-loader', './index.js']
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './client'),
        exclude: path.join(__dirname, './server'),
        loader: 'babel'
      },
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.json$/,
        exclude: path.join(__dirname, './server'),
        loaders: ['json']
      },
      {
        test: /\.html$/,
        exclude: path.join(__dirname, './server'),
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, './server'),
        include: path.join(__dirname, './client'),
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg|)$/,
        exclude: path.join(__dirname, './server'),
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: path.join(__dirname, './server'),
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(woff(2)|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: path.join(__dirname, './server'),
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    unsafeCache: true
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: (function () {
    const plugins = [
      new WebpackErrorNotificationPlugin()
    ];

    if (isProd) {
      plugins.push(new webpack.optimize.OccurrenceOrderPlugin(false));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        screwIe8: true,
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }));
    }

    return plugins;
  }())
};
