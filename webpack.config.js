module.exports = {
  entry: ["./src/index.js"],
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
  },
  watch: true,
  devServer: {
    contentBase: "./src",
    compress: true,
    port: 9002,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [require("@babel/plugin-proposal-object-rest-spread")],
          },
        },
      },
    ],
  },
};
