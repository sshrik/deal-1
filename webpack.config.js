const fs = require('fs');
const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const entries = fs.readdirSync('./frontend/pages');
const filenames = entries.map((f) => f.split('.'));

/*
  entry : {
      ${나올 파일 이름 - js가 붙어 나옴} : ['${내보낼 파일 이름}.js']
  }
*/
const config = {
  mode: 'development',
  entry: filenames.reduce((acc, val) => {
    const [filename] = val;
    acc[filename] = path.resolve(__dirname, `frontend/pages/${filename}.js`);
    return acc;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-throw-expressions'],
          },
        },
      },
      {
        test: /\.otf$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    ...fs.readdirSync('./views').map((file) => {
      const [fileName, extension] = file.split('.');
      return new HtmlWebpackPlugin({
        filename: file,
        template: path.resolve(__dirname, `/views/${file}`),
        chunks: [fileName],
      });
    }),
  ],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
    plugins: [new DirectoryNamedWebpackPlugin()],
  },
  devtool: 'eval-cheap-source-map',
};

async function bundle() {
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    compiler.close((closeErr) => {
      if (err || closeErr) console.log('build 실패');
    });
  });
}

module.exports = { config, bundle };
