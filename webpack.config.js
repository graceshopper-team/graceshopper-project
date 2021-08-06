module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.(png)/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              optipng: {
                optimizationLevel: 7,
              }
            }
          }
        ]
      }
    ]
  }
}
