module.exports = function (source) {
  // console.log("loader3");
  return source.replace(/爆炸/g, this.query.name); // 使用loader 必须要返回源码的处理操作
};
