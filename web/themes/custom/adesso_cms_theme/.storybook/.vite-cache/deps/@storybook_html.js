import {
  entry_preview_exports
} from "./chunk-Z5LW3JY4.js";
import "./chunk-5TRC4X3Y.js";
import "./chunk-ZXEUJ2YP.js";
import {
  require_global
} from "./chunk-OTKDPOBU.js";
import {
  require_preview_api
} from "./chunk-G5ALH5OE.js";
import {
  __toESM
} from "./chunk-OL46QLBJ.js";

// node_modules/@storybook/html/dist/index.mjs
var import_global = __toESM(require_global(), 1);
var import_preview_api = __toESM(require_preview_api(), 1);
var { window: globalWindow } = import_global.global;
globalWindow.STORYBOOK_ENV = "HTML";
function setProjectAnnotations(projectAnnotations) {
  return (0, import_preview_api.setDefaultProjectAnnotations)(entry_preview_exports), (0, import_preview_api.setProjectAnnotations)(projectAnnotations);
}
var _a;
typeof module < "u" && ((_a = module == null ? void 0 : module.hot) == null ? void 0 : _a.decline());
export {
  setProjectAnnotations
};
//# sourceMappingURL=@storybook_html.js.map
