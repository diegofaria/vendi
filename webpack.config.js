module.exports = {
  entry: './public/javascripts/index',
  output: {
    path: __dirname + '/public/dist',
    filename: 'index-bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};
