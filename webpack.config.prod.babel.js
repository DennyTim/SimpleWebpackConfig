require('@babel/polyfill');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  devtool: false,
  entry: {
    main: [
      '@babel/polyfill',
      './src/js/script.js',
      './src/scss/style.scss',
      'bootstrap/dist/css/bootstrap.min.css',
    ],
    bundle: ['jquery', 'popper.js', 'bootstrap'],
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }],
      },
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'nunjucks-isomorphic-loader',
            query: {
              root: [path.resolve(__dirname, 'src/html')]
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/favicon',
        to: './favicon'
      },
      {
        from: './src/img',
        to: './img'
      },
      {
        from: './src/uploads',
        to: './uploads'
      },
      {
        from: './src/json',
        to: './json'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      myOptions: { foo: 'bar' },
      template: 'src/html/index.njk'
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin({ sourceMap: true }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { sourceMap: true },
      })
    ]
  }
};

module.exports = config;