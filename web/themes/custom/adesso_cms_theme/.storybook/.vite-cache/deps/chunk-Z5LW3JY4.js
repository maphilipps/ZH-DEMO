import {
  __export
} from "./chunk-5TRC4X3Y.js";
import {
  dedent
} from "./chunk-ZXEUJ2YP.js";
import {
  require_global
} from "./chunk-OTKDPOBU.js";
import {
  require_preview_api
} from "./chunk-G5ALH5OE.js";
import {
  __toESM
} from "./chunk-OL46QLBJ.js";

// node_modules/@storybook/html/dist/chunk-EVBQXENU.mjs
var import_preview_api = __toESM(require_preview_api(), 1);
var import_global = __toESM(require_global(), 1);
var entry_preview_exports = {};
__export(entry_preview_exports, { parameters: () => parameters, render: () => render, renderToCanvas: () => renderToCanvas });
var { Node } = import_global.global;
var render = (args, context) => {
  let { id, component: Component } = context;
  if (typeof Component == "string") {
    let output = Component;
    return Object.keys(args).forEach((key) => {
      output = output.replace(`{{${key}}}`, args[key]);
    }), output;
  }
  if (Component instanceof HTMLElement) {
    let output = Component.cloneNode(true);
    return Object.keys(args).forEach((key) => {
      output.setAttribute(key, typeof args[key] == "string" ? args[key] : JSON.stringify(args[key]));
    }), output;
  }
  if (typeof Component == "function") return Component(args, context);
  throw console.warn(dedent`
    Storybook's HTML renderer only supports rendering DOM elements and strings.
    Received: ${Component}
  `), new Error(`Unable to render story ${id}`);
};
function renderToCanvas({ storyFn, kind, name, showMain, showError, forceRemount }, canvasElement) {
  let element = storyFn();
  if (showMain(), typeof element == "string") canvasElement.innerHTML = element, (0, import_preview_api.simulatePageLoad)(canvasElement);
  else if (element instanceof Node) {
    if (canvasElement.firstChild === element && forceRemount === false) return;
    canvasElement.innerHTML = "", canvasElement.appendChild(element), (0, import_preview_api.simulateDOMContentLoaded)();
  } else showError({ title: `Expecting an HTML snippet or DOM node from the story: "${name}" of "${kind}".`, description: dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      ` });
}
var parameters = { renderer: "html" };

export {
  entry_preview_exports,
  render,
  renderToCanvas,
  parameters
};
//# sourceMappingURL=chunk-Z5LW3JY4.js.map
