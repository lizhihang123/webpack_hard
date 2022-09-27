const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
// 因为引入的ES6的模块 export default function 这边用CommonJS来进行引入 必须.deafult
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
class Compiler {
  constructor(config) {
    this.config = config;
    this.root = process.cwd(); // 获取代码运行的时候的配置
    this.entry = config.entry; // 入口配置
  }
  start() {
    // process.cwd()能够获取执行zh-pack命令的目录
    // 当前nodejs进程执行时的目录
    // this.depAnalysis(path.resolve(this.root, this.entry));
    this.depAnalysis(path.resolve(this.entry));
    // __dirname拼接的是compiler.js文件所在的目录 所以是 /lib 当前模块的目录名
    // this.depAnalysis(path.resolve(__dirname, this.entry));
    // D:\heima\front\8. webpack学习\demo5\zh-pack\lib\src\index.js
  }
  depAnalysis(modulePath) {
    const result = this.getSource(modulePath);
    // console.log(result);
    const ast = parser.parse(result);
    console.log(ast.program.body); // CallExpression是我们需要的
    traverse(ast, {
      CallExpression(p) {
        // console.log(p.node.callee.name);
        if (p.node.callee.name === "require") {
          p.node.callee.name = "__webpack_require__";
        }
      },
    });

    const ouput = generate(ast).code;
    console.log(ouput);
  }
  getSource(path) {
    return fs.readFileSync(path, "utf-8");
  }
}
module.exports = Compiler;
