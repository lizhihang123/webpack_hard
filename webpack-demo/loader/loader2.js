module.exports = function (source) {
  console.log("loader2");
  return source.replace(/炸弹/g, "炸弹炸弹"); // 使用loader 必须要返回源码的处理操作
};
