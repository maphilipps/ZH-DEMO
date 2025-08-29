import {
  require_isArray
} from "./chunk-AWFT5ALD.js";
import {
  require_isObjectLike
} from "./chunk-HV2SGTDK.js";
import {
  require_baseGetTag
} from "./chunk-H5BW3ZBD.js";
import {
  __commonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/lodash/isString.js
var require_isString = __commonJS({
  "node_modules/lodash/isString.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isArray = require_isArray();
    var isObjectLike = require_isObjectLike();
    var stringTag = "[object String]";
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
    }
    module.exports = isString;
  }
});

export {
  require_isString
};
//# sourceMappingURL=chunk-WZDPPS2U.js.map
