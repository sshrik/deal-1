const fs = require("fs");
const path = require("path");

const entries = fs.readdirSync("./asset/view");
const filenames = entries.map(f => {
  return f.split(".");
});

/*
  entry : {
      ${나올 파일 이름 - js가 붙어 나옴} : ['${내보낼 파일 이름}.js']
  }
*/
const config = {
  mode: 'development',
  entry: filenames.reduce((acc, val) => {
    const [filename, ] = val;
    acc[filename] = path.resolve(__dirname, `asset/view/${filename}.js`);
    return acc;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'public/javascript/'),
    filename: '[name].js'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-throw-expressions"]
          }
        }
      }
    ]
  },
  plugins: [],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
}

module.exports = config;