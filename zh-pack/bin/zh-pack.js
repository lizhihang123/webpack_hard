#!/usr/bin/env node
// console.log("我要来段高级的代码");
const path = require("path");

// 1. 获取到config的配置文件
const config = require(path.resolve("webpack.config.js"));
// console.log(config);

// 2. 把配置文件丢到compiler的类里面
const Compiler = require("../lib/compiler");
// .start()立即执行
const compiler = new Compiler(config).start();
