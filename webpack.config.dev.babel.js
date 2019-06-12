import '@babel/polyfill';
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //для генерации html файла
const CopyWebpackPlugin = require('copy-webpack-plugin');

const conf = {
  entry: {
    main: [
      '@babel/polyfill',
      './src/js/script.js',
      'bootstrap/dist/css/bootstrap.min.css',
      './src/scss/style.scss',
    ],
    bundle: ['jquery', 'popper.js', 'bootstrap'],
  },
  output: {
    filename: '[name].js',
  },
  devServer: {
    overlay: true,
    historyApiFallback: true,
    port: 3000,
    hot: true,
    inline: true,
    contentBase: './src',
    proxy: { "/api/**": { target: 'http://localhost:3000', secure: false } }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
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
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
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
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          'img-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        devServer: true
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
    ]),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['bundle.js'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      myOptions: { foo: 'bar' },
      filename: 'index.html',
      template: 'src/html/index.njk'
    })
  ],
};

module.exports = (env, options) => {
  conf.devtool = options.mode === "production" ? false : "cheap-module-eval-source-map";
  return conf;
};