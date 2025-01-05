import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'node:path';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

console.log('isProduction', isProduction);

const config: Configuration = {
  entry: './src/index.tsx',
  mode: isProduction ? 'production' : 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          isProduction
            ? { loader: MiniCssExtractPlugin.loader }
            : {
                loader: 'style-loader',
              },
          isProduction
            ? {
                loader: 'css-loader',
                options: {
                  url: false,
                },
              }
            : {
                loader: 'css-loader',
                options: {
                  url: false,
                  sourceMap: true,
                },
              },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
  bail: true,
};

export default config;
