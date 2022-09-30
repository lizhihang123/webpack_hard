module.exports = function (source) {
  console.log("loader1");
  // console.log(this.query); // this.query能够获取到 使用当前loader时传入的options选项里面的内容
  return source.replace(/炸弹炸弹/g, "炸弹炸弹炸弹"); // 使用loader 必须要返回源码的处理操作
};
