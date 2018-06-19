/*eslint-disable*/
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
var WebpackMd5Hash = require('webpack-md5-hash')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
var path = require('path')
var pkg = require('./package.json')
var theme = require('./src/themes/theme')
var argv = require('yargs').argv
var deps = Object.keys(pkg.dependencies)
var index = deps.findIndex(item => item === 'babel-polyfill')
deps.splice(index, 1);

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
    app: ['./src/index.js'],
  },
  output: {
    filename: './dist/app.[chunkhash:8].js',
    publicPath: ''
  },
  module: {
    loaders:[
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
        loader: `url-loader?limit=1024&name=./dist/images/[name]-[hash:8].[ext]`
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*)?$/,
        loader: `file-loader?name=./dist/fonts/[name]-[hash:8].[ext]`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": `"production"`
      }
    }),
    new ExtractTextPlugin({
      filename: './dist/bundle.[contenthash:8].css',
      allChunks: true
    }),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './dist/common.[chunkhash:8].js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: `./index.html`,
      template: `./index.tpl.html`
    }),
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    alias: {
       'react': 'anujs',
       'react-dom': 'anujs',
         // 若要兼容 IE 请使用以下配置
         // 'react': 'anujs/dist/ReactIE',
         // 'react-dom': 'anujs/dist/ReactIE',
         // 'redux': 'anujs/lib/ReduxIE',//这主要用于IE6－8，因为官方源码中的isPlainObject方法性能超差
         // 如果引用了 prop-types 或 create-react-class
         // 需要添加如下别名
         'prop-types': 'anujs/lib/ReactPropTypes'
    }
 },
}
