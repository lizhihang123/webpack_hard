(() => {
var __webpack_modules__ = {

  "./src/news.js": (
    module,
    __unused_webpack_exports,
    __webpack_require__
    ) => {
    eval(
    `module.exports = {
  news: '有一个aolifobufo1111的新闻，你想不想听，小明脸上第一次长了一颗痘'
};`
      );
      },
      
  "./src/message.js": (
    module,
    __unused_webpack_exports,
    __webpack_require__
    ) => {
    eval(
    `const news = __webpack_require__("./src/news.js");

console.log(news);
let a = "我是第二个听到新闻的";
module.exports = {
  message: a
};`
      );
      },
      
  "./src/index.js": (
    module,
    __unused_webpack_exports,
    __webpack_require__
    ) => {
    eval(
    `const message = __webpack_require__("./src/message.js");

console.log(message);`
      );
      },
      
        };
        /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/
        /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports;
        /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/ exports: {},
        /******/
        });
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__
        );
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/
        }
        /******/
        /************************************************************************/
        /******/
        /******/ // startup
        /******/ // Load entry module and return exports
        /******/ // This entry module can't be inlined because the eval devtool is used.
        /******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
          /******/
          /******/
          })();