const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
module.exports = class HTMLPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.done.tap("HTMLPlugin", (stats) => {
      //   console.log(stats);
      //   console.log(Object.keys(stats));
      //   console.log(stats.compilation);
      //   console.log(Object.keys(stats.compilation));
      //   console.log(stats.compilation.startTime);
      //   console.log(stats.compilation.endTime);
      //   console.log(stats.compilation.hooks);
      //   console.log(stats.compilation.hash);
    });
    // 1. 编写一个自定义插件，注册`afterEmit`钩子
    compiler.hooks.afterEmit.tap("HTMLPlugin", (compilation) => {
      console.log(111, compilation.assets);
      // 2. 根据创建对象时传入的template属性来读取html模板
      const result = fs.readFileSync(this.options.template, "utf-8");
      console.log(result);
      // 3. 使用工具分析HTML，推荐使用cheerio，可以直接使用jQuery api
      // 获取模板
      const $ = cheerio.load(result);
      //   console.log($);
      //   console.log(compilation.assets, 111);
      // 4. 循环遍历webpack打包的资源文件列表，如果有多个bundle就都打包进去（可以根据需求自己修改，因为可能有chunk，一般只引入第一个即可）
      // 有多少个bundle.js就有多少个script 一般只有一个
      // bundle.js-> <body><script src="bundle.js"></script></body>
      Object.keys(compilation.assets).forEach((item) => {
        // console.log("item", item);
        $(`<script src='./${item}'></script>`).appendTo("body");
      });
      // 5. 输出新生成的HTML字符串到dist目录中
      //   console.log($.html()); // 生成的整个html标签
      fs.writeFileSync(
        path.join(process.cwd(), "dist", this.options.filename),
        $.html()
      );
    });
  }
};
