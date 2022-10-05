// 1.创建一个plugin类
// 2.类里面需要有一个apply方法
// 3.在apply方法里面去注册事件
//   compiler类是webpack的支柱，扩展自tap类，能够接受到所有的钩子
//   compiler.hooks.done.tap('', ()=>{}) compiler.hooks能够访问到钩子
//   tap表示注册事件 done和emit都是生命周期 done是所有编译完成 emit是生成资源到output之后
module.exports = class HelloWorldPlugin {
  constructor() {}
  apply(compiler) {
    // console.log(Object.keys(compiler)); // 是webpack的整个打包对象
    compiler.hooks.emit.tap("HelloWorldPlugin", (compilation) => {
      console.log("HelloWorldPlugin emit", Object.keys(compilation));
      // 随时可以变化的某个项目文件 只要项目文件改变，compilation就会发生改变
      // console.log(compilation);
      // console.log("emit HelloWorldPlugin");
    });
    compiler.hooks.done.tap("HelloWorldPlugin", (stats) => {
      console.log(stats); // 打印编译完毕后的数据
      // console.log("done HelloWorldPlugin");
    });
  }
};
