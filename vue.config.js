const path = require('path')
const loader = {
  loader: 'sass-resources-loader',
  options: {
    resources: path.resolve(__dirname, './src/assets/scss/global.scss')
  }
}

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            loader,
            'sass-loader'
          ]
        }
      ]
    }
  }
}
