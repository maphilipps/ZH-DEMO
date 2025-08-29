import {
  require_createCompounder
} from "./chunk-RYE6WFZC.js";
import {
  __commonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/lodash/kebabCase.js
var require_kebabCase = __commonJS({
  "node_modules/lodash/kebabCase.js"(exports, module) {
    var createCompounder = require_createCompounder();
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? "-" : "") + word.toLowerCase();
    });
    module.exports = kebabCase;
  }
});

export {
  require_kebabCase
};
//# sourceMappingURL=chunk-NBAGNDWL.js.map
