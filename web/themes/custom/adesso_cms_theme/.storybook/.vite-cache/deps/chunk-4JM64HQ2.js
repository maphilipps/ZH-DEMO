import {
  require_upperFirst
} from "./chunk-ZWRV76PG.js";
import {
  require_createCompounder
} from "./chunk-RYE6WFZC.js";
import {
  __commonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/lodash/startCase.js
var require_startCase = __commonJS({
  "node_modules/lodash/startCase.js"(exports, module) {
    var createCompounder = require_createCompounder();
    var upperFirst = require_upperFirst();
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? " " : "") + upperFirst(word);
    });
    module.exports = startCase;
  }
});

export {
  require_startCase
};
//# sourceMappingURL=chunk-4JM64HQ2.js.map
