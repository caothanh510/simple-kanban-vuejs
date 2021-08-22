const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    contentBase: './public'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
          }
        }
      },
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            {
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          ]
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      '@': path.resolve('src')
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
}
