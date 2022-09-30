const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
// 因为引入的ES6的模块 export default function 这边用CommonJS来进行引入 必须.deafult
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const ejs = require("ejs");
class Compiler {
  constructor(config) {
    this.config = config;
    this.root = process.cwd(); // 获取代码运行的时候的配置
    this.entry = config.entry; // 入口配置
    this.modules = {}; // 键值对 路径对应的源码
  }
  start() {
    // process.cwd()能够获取执行zh-pack命令的目录
    // 当前nodejs进程执行时的目录
    // this.depAnalysis(path.resolve(this.root, this.entry));
    this.depAnalysis(path.resolve(this.entry));
    // __dirname拼接的是compiler.js文件所在的目录 所以是 /lib 当前模块的目录名
    // this.depAnalysis(path.resolve(__dirname, this.entry));
    // D:\heima\front\8. webpack学习\demo5\zh-pack\lib\src\index.js
    this.emitFile();
  }
  // 解析模块路径的依赖
  depAnalysis(modulePath) {
    const result = this.getSource(modulePath);
    // console.log(result);
    const ast = parser.parse(result);
    // console.log(ast.program.body); // CallExpression是我们需要的

    // 数组 存储路径
    let depDependencies = [];
    traverse(ast, {
      CallExpression(p) {
        // console.log(p.node.callee.name);
        // 修改require
        if (p.node.callee.name === "require") {
          p.node.callee.name = "__webpack_require__";
          // 修改引入内部的文件
          let oldValue = p.node.arguments[0].value;
          // 前面拼上 ./
          p.node.arguments[0].value = "./" + path.join("src", oldValue);
          // 替换所有的反斜杠为正斜杠
          p.node.arguments[0].value = p.node.arguments[0].value.replace(
            /\\+/g,
            "/"
          );
          // 每次解析到一个require 都push到数组
          depDependencies.push(p.node.arguments[0].value);
          // 修改引入第三方包
          if (p.node.arguments[0].value === "moment") {
            let oldValue = p.node.arguments[0].value;
            p.node.arguments[0].value =
              "./" + path.join("node_modules", oldValue);
            p.node.arguments[0].value = p.node.arguments[0].value.replace(
              /\\+/g,
              "/"
            );
          }
        }
      },
    });
    depDependencies.forEach((dep) => {
      this.depAnalysis(path.resolve(this.root, dep));
    });
    let ouput = generate(ast).code;

    let readAndHandle = (use, target) => {
      // 因为使用了 this.root 我们要把普通函数 改变为箭头函数
      let usePath = path.join(this.root, use);
      let loader = require(usePath);
      ouput = loader.call(target, ouput);
    };
    // console.log(ouput);
    // 读取webpack.config.js的配置项，进行倒序迭代，rules的每项匹配规则，按倒序匹配
    let rules = this.config.module.rules;
    for (let i = rules.length - 1; i >= 0; i--) {
      // console.log(rules[i]);
      // rules里面的一个配置
      let { test, use } = rules[i];
      if (test.test(modulePath)) {
        // console.log(modulePath);
        // use是数组时才去进行遍历

        if (Array.isArray(use)) {
          for (let j = use.length - 1; j >= 0; j--) {
            // // console.log(use[j]);
            // let usePath = path.join(this.root, use[j].loader);
            // let loader = require(usePath);
            // // console.log(loader);
            // ouput = loader(ouput);
            // // console.log(ouput);
            readAndHandle(use[j].loader);
          }
        } else if (typeof use === "string") {
          // use是字符串
          // let usePath = path.join(this.root, use);
          // let loader = require(usePath);
          // // console.log(loader);
          // ouput = loader(ouput);
          readAndHandle(use);
        } else if (use instanceof Object) {
          // // use是对象
          // let usePath = path.join(this.root, use.loader);
          // let loader = require(usePath);
          // // console.log(loader);
          // ouput = loader.call({ query: use.options }, ouput);
          readAndHandle(use.loader, { query: use.options });
        }
      }
    }

    let moduleRelativePath = path.relative(this.root, modulePath);
    moduleRelativePath = ("./" + moduleRelativePath).replace(/\\+/g, "/");
    this.modules[moduleRelativePath] = ouput;
    // console.log(this.module);
  }

  emitFile() {
    // 1、获取模板引擎的内容
    let template = this.getSource(
      path.join(__dirname, "../template/artTemplate.ejs")
    );
    // 2、利用ejs的render函数，传入参数，渲染出拼接后的内容
    // console.log(this.modules);
    let result = ejs.render(template, {
      entry: this.entry,
      modules: this.modules,
    });
    // console.log(result);
    // 3、根据this.config.ouput的path和filename来拼接出路径
    let outputPath = path.join(
      this.config.output.path,
      this.config.output.filename
    );
    // 4、把result渲染好的内容 发送到 指定的outputPath目录
    fs.writeFileSync(outputPath, result);
  }
  getSource(path) {
    return fs.readFileSync(path, "utf-8");
  }
}
module.exports = Compiler;
