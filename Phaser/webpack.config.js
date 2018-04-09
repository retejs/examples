const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: `${APP_DIR}/index.js`,
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [APP_DIR, 'node_modules'],
      alias: {
        // https://github.com/webpack/webpack/issues/4666
        constants: `${APP_DIR}/constants`,
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
          include: APP_DIR
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: [/\.vert$/, /\.frag$/],
          use: ['raw-loader'],
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        CANVAS_RENDERER: true,
        WEBGL_RENDERER: true,
      })
    ],
    devServer: {
      contentBase: BUILD_DIR,
      port: 4200,
      stats: 'minimal',
    }
}