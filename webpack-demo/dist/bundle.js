(() => {
  // webpackBootstrap
  var __webpack_modules__ = {
    "./src/index.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'const message = __webpack_require__(/*! ./message */ "./src/message.js")\r\nconsole.log(message);\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?'
      );
    },

    "./src/message.js": (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        "const news = __webpack_require__(/*! ./news */ \"./src/news.js\")\r\nconsole.log(news);\r\nlet a = '我是第二个听到新闻的'\r\nmodule.exports = {\r\n    message: a\r\n}\n\n//# sourceURL=webpack://webpack-demo/./src/message.js?"
      );
    },

    "./src/news.js": (module) => {
      eval(
        "module.exports = {\r\n    news: '有一个爆炸的新闻，你想不想听，小明脸上第一次长了一颗痘'\r\n}\n\n//# sourceURL=webpack://webpack-demo/./src/news.js?"
      );
    },
  };
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.

  // 函数已经被执行了
  var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
