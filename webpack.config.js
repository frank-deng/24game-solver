const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    './dist/24game-solver':{
      publicPath:'/dist/',
      import:['./src/index.js'],
      library:{
        name: 'solve24game',
        export: 'default',
        type: 'umd',
      }
    },
    '__index__':{
      publicPath:'/',
      import:['./page/index.js']
    }
  },
  output:{
    globalObject: 'this',
    path: __dirname,
    filename:'[name].js'
  },
  devServer:{
    static:__dirname,
    liveReload:false,
    open:true,
    port:8082
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader:"raw-loader"
          },
          {
            loader:"postcss-loader",
            options: {
              postcssOptions:{
                plugins: {
                  'cssnano': {}
                }
              }
            }
          },
          {
            loader:"less-loader"
          }
        ]
      }
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname,'index.html'),
      template: 'page/index.ejs',
      inject:false,
      templateParameters:{
        env:process.env
      }
    })
  ],
};
