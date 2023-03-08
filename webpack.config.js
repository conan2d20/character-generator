const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

function getVersion() {
  const now = new Date();
  return [
    now.getUTCFullYear(),
    (now.getUTCMonth() + 1).toString().padStart(2, 0),
    now.getUTCDate().toString().padStart(2, 0),
    now.getUTCHours().toString().padStart(2, 0),
    now.getUTCMinutes().toString().padStart(2, 0),
    now.getUTCSeconds().toString().padStart(2, 0),
  ].join('');
}

module.exports = (env, arg) => {
  const isProdMode = arg.mode === 'production';
  const VERSION = isProdMode ? getVersion() : 'DEV';

  return {
    mode: isProdMode ? 'production' : 'development',
    // Stop compilation early in production
    bail: isProdMode,
    devtool: isProdMode ? false : 'cheap-module-source-map',
    entry: './src/app.tsx',
    module: {
      rules: [
        {
          test: /\.ts|\.tsx$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: isProdMode ? '[name].[contenthash:8].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      pathinfo: !isProdMode,
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(VERSION),
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            template: 'public/index.html',
            templateParameters: {
              TITLE: `Robert E Howard's CONAN`,
              VERSION,
            },
          },
          isProdMode
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: { ignore: ['**/index.html'] },
          },
        ],
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
    },
  };
};
