const { SyncHook } = require("tapable");
console.log(SyncHook);
class Lesson {
  constructor() {
    this.hooks = {
      html: new SyncHook(),
      css: new SyncHook(),
      js: new SyncHook(),
      vue: new SyncHook(),
    };
  }
  study() {
    console.log("开始学习前端啦");
    console.log("开始学习HTML啦");
    this.hooks.html.call();
    console.log("开始学习CSS啦");
    this.hooks.css.call();
    console.log("开始学习JavaScript啦");
    this.hooks.js.call();
    console.log("开始学习Vue啦");
    this.hooks.vue.call();
  }
}
let l = new Lesson();
l.hooks.html.tap("html", () => {
  console.log("我能够写页面啦");
});
l.hooks.css.tap("html", () => {
  console.log("我能够写样式啦啦");
});
l.hooks.js.tap("js", () => {
  console.log("我能够写逻辑啦");
});
l.hooks.vue.tap("vue", () => {
  console.log("我能用框架啦");
});
l.study();
