import {
  cn,
  gt,
  yn
} from "./chunk-M4V5F6U6.js";
import "./chunk-3EEQ2EH2.js";
import "./chunk-5TRC4X3Y.js";
import "./chunk-V5DQZ5ZK.js";
import {
  require_preview_api
} from "./chunk-G5ALH5OE.js";
import {
  __toESM
} from "./chunk-OL46QLBJ.js";

// node_modules/@storybook/html/dist/entry-preview-docs.mjs
var import_preview_api = __toESM(require_preview_api(), 1);
function skipSourceRender(context) {
  var _a;
  let sourceParams = (_a = context == null ? void 0 : context.parameters.docs) == null ? void 0 : _a.source, isArgsStory = context == null ? void 0 : context.parameters.__isArgsStory;
  return (sourceParams == null ? void 0 : sourceParams.type) === gt.DYNAMIC ? false : !isArgsStory || (sourceParams == null ? void 0 : sourceParams.code) || (sourceParams == null ? void 0 : sourceParams.type) === gt.CODE;
}
var sourceDecorator = (storyFn, context) => {
  var _a, _b;
  let story = storyFn(), renderedForSource = ((_b = (_a = context == null ? void 0 : context.parameters.docs) == null ? void 0 : _a.source) == null ? void 0 : _b.excludeDecorators) ? context.originalStoryFn(context.args, context) : story, source;
  return skipSourceRender(context) || (typeof renderedForSource == "string" ? source = renderedForSource : renderedForSource instanceof Element && (source = renderedForSource.outerHTML)), (0, import_preview_api.useEffect)(() => {
    let { id, unmappedArgs } = context;
    source && import_preview_api.addons.getChannel().emit(yn, { id, args: unmappedArgs, source });
  }), story;
};
var decorators = [sourceDecorator];
var parameters = { docs: { story: { inline: true }, source: { type: gt.DYNAMIC, language: "html", code: void 0, excludeDecorators: void 0 } } };
var argTypesEnhancers = [cn];
export {
  argTypesEnhancers,
  decorators,
  parameters
};
//# sourceMappingURL=@storybook_html_dist_entry-preview-docs__mjs.js.map
