import {
  require_upperFirst
} from "./chunk-ZWRV76PG.js";
import {
  require_createCompounder
} from "./chunk-RYE6WFZC.js";
import {
  require_toString
} from "./chunk-VIXO7HLY.js";
import {
  __commonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/lodash/capitalize.js
var require_capitalize = __commonJS({
  "node_modules/lodash/capitalize.js"(exports, module) {
    var toString = require_toString();
    var upperFirst = require_upperFirst();
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }
    module.exports = capitalize;
  }
});

// node_modules/lodash/camelCase.js
var require_camelCase = __commonJS({
  "node_modules/lodash/camelCase.js"(exports, module) {
    var capitalize = require_capitalize();
    var createCompounder = require_createCompounder();
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });
    module.exports = camelCase;
  }
});

export {
  require_camelCase
};
//# sourceMappingURL=chunk-ORVNEOXY.js.map
