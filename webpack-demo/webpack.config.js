const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "./loader/loader3.js",
          options: {
            name: "aolifobufo1111",
          },
        },
      },
      // { test: /\.js$/, use: "./loader/loader1.js" },
      // { test: /\.js$/, use: "./loader/loader2.js" },
      // { test: /\.js$/, use: "./loader/loader3.js" },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "./loader/loader1.js",
      //       options: {
      //         name: "xiaohangge",
      //       },
      //     },
      //     {
      //       loader: "./loader/loader2.js",
      //     },
      //     {
      //       loader: "./loader/loader3.js",
      //     },
      //   ],
      // },
    ],
  },
};
