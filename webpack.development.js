/*eslint-disable*/
var webpack = require('webpack')
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var path = require('path')
var pkg = require('./package.json')
var theme = require('./src/themes/theme')
var argv = require('yargs').argv
var deps = Object.keys(pkg.dependencies)
var dashboard = new Dashboard();

module.exports = {
  resolve: {
    alias: {
      components: path.join(__dirname, '/src/components'),
      page: path.join(__dirname, '/src/page'),
      common: path.join(__dirname, '/src/common'),
      images: path.join(__dirname, '/src/images'),
      style: path.join(__dirname, '/src/style')
    }
  },
  entry: {
    vendor: deps,
    app: ['./src/index-mock.js']
  },
  output: {
    filename: './dist/app.js',
    publicPath: ''
  },
  module: {
    loaders:[
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0'
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname, '/src/style'), /node_modules/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '../../'
        })
      },
      {
        test: /\.css$/,
        exclude: [path.join(__dirname, '/src/style'), /node_modules/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '../../'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: `css-loader!less-loader?{"sourceMap":true,"modifyVars": ${JSON.stringify(theme)}}`,
          publicPath: '../../'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: `url-loader?limit=1024&name=./dist/images/[hash].[ext]`
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=./dist/fonts/[hash].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": `"development"`
      }
    }),
    new ExtractTextPlugin({
      filename: './dist/bundle.css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './dist/common.js'
    }),
    new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: `http://127.0.0.1:8089/dev.html`
    })
  ],
}

