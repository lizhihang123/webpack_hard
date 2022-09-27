const path = require("path");
// 1.path.join返回的只是里面字符的拼接
console.log(path.join("/path", "./test")); // \path\test
console.log(path.join("/path", "../test")); // \test
console.log(path.join(__dirname, "/test")); // D:\heima\front\8. webpack学习\demo5\test\src\test __dirname表示的是当前文件所在的根目录

// 2.path.resolve()
// 会自动带上当前项目的根目录
console.log(path.resolve("/test")); // D:\test
console.log(path.resolve("test")); // D:\heima\front\8. webpack学习\demo5\test\test
console.log(path.resolve("path", "/test")); // D:\test
console.log(path.resolve("path", "test")); // D:\heima\front\8. webpack学习\demo5\test\path\test
