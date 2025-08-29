import {
  require_isObject
} from "./chunk-CQV677S2.js";
import {
  require_baseGetTag
} from "./chunk-H5BW3ZBD.js";
import {
  __commonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

export {
  require_isFunction
};
//# sourceMappingURL=chunk-OHTM4Z6L.js.map
