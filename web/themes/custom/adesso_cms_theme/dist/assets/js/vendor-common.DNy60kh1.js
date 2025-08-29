var flowbite = { exports: {} };
var hasRequiredFlowbite;
function requireFlowbite() {
  if (hasRequiredFlowbite) return flowbite.exports;
  hasRequiredFlowbite = 1;
  (function(module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module.exports = factory();
    })(self, function() {
      return (
        /******/
        (function() {
          var __webpack_modules__ = {
            /***/
            765: (
              /***/
              (function(__unused_webpack_module, __webpack_exports__2, __webpack_require__2) {
                __webpack_require__2.r(__webpack_exports__2);
              })
            ),
            /***/
            853: (
              /***/
              (function(__unused_webpack_module, __webpack_exports__2, __webpack_require__2) {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  "afterMain": function() {
                    return (
                      /* reexport */
                      afterMain2
                    );
                  },
                  "afterRead": function() {
                    return (
                      /* reexport */
                      afterRead2
                    );
                  },
                  "afterWrite": function() {
                    return (
                      /* reexport */
                      afterWrite2
                    );
                  },
                  "applyStyles": function() {
                    return (
                      /* reexport */
                      modifiers_applyStyles
                    );
                  },
                  "arrow": function() {
                    return (
                      /* reexport */
                      modifiers_arrow
                    );
                  },
                  "auto": function() {
                    return (
                      /* reexport */
                      auto2
                    );
                  },
                  "basePlacements": function() {
                    return (
                      /* reexport */
                      basePlacements2
                    );
                  },
                  "beforeMain": function() {
                    return (
                      /* reexport */
                      beforeMain2
                    );
                  },
                  "beforeRead": function() {
                    return (
                      /* reexport */
                      beforeRead2
                    );
                  },
                  "beforeWrite": function() {
                    return (
                      /* reexport */
                      beforeWrite2
                    );
                  },
                  "bottom": function() {
                    return (
                      /* reexport */
                      bottom2
                    );
                  },
                  "clippingParents": function() {
                    return (
                      /* reexport */
                      clippingParents2
                    );
                  },
                  "computeStyles": function() {
                    return (
                      /* reexport */
                      modifiers_computeStyles
                    );
                  },
                  "createPopper": function() {
                    return (
                      /* reexport */
                      popper_createPopper
                    );
                  },
                  "createPopperBase": function() {
                    return (
                      /* reexport */
                      createPopper2
                    );
                  },
                  "createPopperLite": function() {
                    return (
                      /* reexport */
                      popper_lite_createPopper
                    );
                  },
                  "detectOverflow": function() {
                    return (
                      /* reexport */
                      detectOverflow2
                    );
                  },
                  "end": function() {
                    return (
                      /* reexport */
                      end2
                    );
                  },
                  "eventListeners": function() {
                    return (
                      /* reexport */
                      eventListeners2
                    );
                  },
                  "flip": function() {
                    return (
                      /* reexport */
                      modifiers_flip
                    );
                  },
                  "hide": function() {
                    return (
                      /* reexport */
                      modifiers_hide
                    );
                  },
                  "left": function() {
                    return (
                      /* reexport */
                      left2
                    );
                  },
                  "main": function() {
                    return (
                      /* reexport */
                      main2
                    );
                  },
                  "modifierPhases": function() {
                    return (
                      /* reexport */
                      modifierPhases2
                    );
                  },
                  "offset": function() {
                    return (
                      /* reexport */
                      modifiers_offset
                    );
                  },
                  "placements": function() {
                    return (
                      /* reexport */
                      enums_placements
                    );
                  },
                  "popper": function() {
                    return (
                      /* reexport */
                      popper2
                    );
                  },
                  "popperGenerator": function() {
                    return (
                      /* reexport */
                      popperGenerator2
                    );
                  },
                  "popperOffsets": function() {
                    return (
                      /* reexport */
                      modifiers_popperOffsets
                    );
                  },
                  "preventOverflow": function() {
                    return (
                      /* reexport */
                      modifiers_preventOverflow
                    );
                  },
                  "read": function() {
                    return (
                      /* reexport */
                      read2
                    );
                  },
                  "reference": function() {
                    return (
                      /* reexport */
                      reference2
                    );
                  },
                  "right": function() {
                    return (
                      /* reexport */
                      right2
                    );
                  },
                  "start": function() {
                    return (
                      /* reexport */
                      start2
                    );
                  },
                  "top": function() {
                    return (
                      /* reexport */
                      enums_top
                    );
                  },
                  "variationPlacements": function() {
                    return (
                      /* reexport */
                      variationPlacements2
                    );
                  },
                  "viewport": function() {
                    return (
                      /* reexport */
                      viewport2
                    );
                  },
                  "write": function() {
                    return (
                      /* reexport */
                      write2
                    );
                  }
                });
                var enums_top = "top";
                var bottom2 = "bottom";
                var right2 = "right";
                var left2 = "left";
                var auto2 = "auto";
                var basePlacements2 = [enums_top, bottom2, right2, left2];
                var start2 = "start";
                var end2 = "end";
                var clippingParents2 = "clippingParents";
                var viewport2 = "viewport";
                var popper2 = "popper";
                var reference2 = "reference";
                var variationPlacements2 = /* @__PURE__ */ basePlacements2.reduce(function(acc, placement) {
                  return acc.concat([placement + "-" + start2, placement + "-" + end2]);
                }, []);
                var enums_placements = /* @__PURE__ */ [].concat(basePlacements2, [auto2]).reduce(function(acc, placement) {
                  return acc.concat([placement, placement + "-" + start2, placement + "-" + end2]);
                }, []);
                var beforeRead2 = "beforeRead";
                var read2 = "read";
                var afterRead2 = "afterRead";
                var beforeMain2 = "beforeMain";
                var main2 = "main";
                var afterMain2 = "afterMain";
                var beforeWrite2 = "beforeWrite";
                var write2 = "write";
                var afterWrite2 = "afterWrite";
                var modifierPhases2 = [beforeRead2, read2, afterRead2, beforeMain2, main2, afterMain2, beforeWrite2, write2, afterWrite2];
                function getNodeName2(element) {
                  return element ? (element.nodeName || "").toLowerCase() : null;
                }
                function getWindow2(node) {
                  if (node == null) {
                    return window;
                  }
                  if (node.toString() !== "[object Window]") {
                    var ownerDocument = node.ownerDocument;
                    return ownerDocument ? ownerDocument.defaultView || window : window;
                  }
                  return node;
                }
                function isElement2(node) {
                  var OwnElement = getWindow2(node).Element;
                  return node instanceof OwnElement || node instanceof Element;
                }
                function isHTMLElement2(node) {
                  var OwnElement = getWindow2(node).HTMLElement;
                  return node instanceof OwnElement || node instanceof HTMLElement;
                }
                function isShadowRoot2(node) {
                  if (typeof ShadowRoot === "undefined") {
                    return false;
                  }
                  var OwnElement = getWindow2(node).ShadowRoot;
                  return node instanceof OwnElement || node instanceof ShadowRoot;
                }
                function applyStyles2(_ref) {
                  var state = _ref.state;
                  Object.keys(state.elements).forEach(function(name) {
                    var style = state.styles[name] || {};
                    var attributes = state.attributes[name] || {};
                    var element = state.elements[name];
                    if (!isHTMLElement2(element) || !getNodeName2(element)) {
                      return;
                    }
                    Object.assign(element.style, style);
                    Object.keys(attributes).forEach(function(name2) {
                      var value = attributes[name2];
                      if (value === false) {
                        element.removeAttribute(name2);
                      } else {
                        element.setAttribute(name2, value === true ? "" : value);
                      }
                    });
                  });
                }
                function effect2(_ref2) {
                  var state = _ref2.state;
                  var initialStyles = {
                    popper: {
                      position: state.options.strategy,
                      left: "0",
                      top: "0",
                      margin: "0"
                    },
                    arrow: {
                      position: "absolute"
                    },
                    reference: {}
                  };
                  Object.assign(state.elements.popper.style, initialStyles.popper);
                  state.styles = initialStyles;
                  if (state.elements.arrow) {
                    Object.assign(state.elements.arrow.style, initialStyles.arrow);
                  }
                  return function() {
                    Object.keys(state.elements).forEach(function(name) {
                      var element = state.elements[name];
                      var attributes = state.attributes[name] || {};
                      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
                      var style = styleProperties.reduce(function(style2, property) {
                        style2[property] = "";
                        return style2;
                      }, {});
                      if (!isHTMLElement2(element) || !getNodeName2(element)) {
                        return;
                      }
                      Object.assign(element.style, style);
                      Object.keys(attributes).forEach(function(attribute) {
                        element.removeAttribute(attribute);
                      });
                    });
                  };
                }
                var modifiers_applyStyles = {
                  name: "applyStyles",
                  enabled: true,
                  phase: "write",
                  fn: applyStyles2,
                  effect: effect2,
                  requires: ["computeStyles"]
                };
                function getBasePlacement2(placement) {
                  return placement.split("-")[0];
                }
                var math_max = Math.max;
                var math_min = Math.min;
                var round2 = Math.round;
                function getUAString2() {
                  var uaData = navigator.userAgentData;
                  if (uaData != null && uaData.brands) {
                    return uaData.brands.map(function(item) {
                      return item.brand + "/" + item.version;
                    }).join(" ");
                  }
                  return navigator.userAgent;
                }
                function isLayoutViewport2() {
                  return !/^((?!chrome|android).)*safari/i.test(getUAString2());
                }
                function getBoundingClientRect2(element, includeScale, isFixedStrategy) {
                  if (includeScale === void 0) {
                    includeScale = false;
                  }
                  if (isFixedStrategy === void 0) {
                    isFixedStrategy = false;
                  }
                  var clientRect = element.getBoundingClientRect();
                  var scaleX = 1;
                  var scaleY = 1;
                  if (includeScale && isHTMLElement2(element)) {
                    scaleX = element.offsetWidth > 0 ? round2(clientRect.width) / element.offsetWidth || 1 : 1;
                    scaleY = element.offsetHeight > 0 ? round2(clientRect.height) / element.offsetHeight || 1 : 1;
                  }
                  var _ref = isElement2(element) ? getWindow2(element) : window, visualViewport = _ref.visualViewport;
                  var addVisualOffsets = !isLayoutViewport2() && isFixedStrategy;
                  var x2 = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
                  var y3 = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
                  var width = clientRect.width / scaleX;
                  var height = clientRect.height / scaleY;
                  return {
                    width,
                    height,
                    top: y3,
                    right: x2 + width,
                    bottom: y3 + height,
                    left: x2,
                    x: x2,
                    y: y3
                  };
                }
                function getLayoutRect2(element) {
                  var clientRect = getBoundingClientRect2(element);
                  var width = element.offsetWidth;
                  var height = element.offsetHeight;
                  if (Math.abs(clientRect.width - width) <= 1) {
                    width = clientRect.width;
                  }
                  if (Math.abs(clientRect.height - height) <= 1) {
                    height = clientRect.height;
                  }
                  return {
                    x: element.offsetLeft,
                    y: element.offsetTop,
                    width,
                    height
                  };
                }
                function contains2(parent, child) {
                  var rootNode = child.getRootNode && child.getRootNode();
                  if (parent.contains(child)) {
                    return true;
                  } else if (rootNode && isShadowRoot2(rootNode)) {
                    var next = child;
                    do {
                      if (next && parent.isSameNode(next)) {
                        return true;
                      }
                      next = next.parentNode || next.host;
                    } while (next);
                  }
                  return false;
                }
                function getComputedStyle2(element) {
                  return getWindow2(element).getComputedStyle(element);
                }
                function isTableElement2(element) {
                  return ["table", "td", "th"].indexOf(getNodeName2(element)) >= 0;
                }
                function getDocumentElement2(element) {
                  return ((isElement2(element) ? element.ownerDocument : (
                    // $FlowFixMe[prop-missing]
                    element.document
                  )) || window.document).documentElement;
                }
                function getParentNode2(element) {
                  if (getNodeName2(element) === "html") {
                    return element;
                  }
                  return (
                    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
                    // $FlowFixMe[incompatible-return]
                    // $FlowFixMe[prop-missing]
                    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
                    element.parentNode || // DOM Element detected
                    (isShadowRoot2(element) ? element.host : null) || // ShadowRoot detected
                    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
                    getDocumentElement2(element)
                  );
                }
                function getTrueOffsetParent2(element) {
                  if (!isHTMLElement2(element) || // https://github.com/popperjs/popper-core/issues/837
                  getComputedStyle2(element).position === "fixed") {
                    return null;
                  }
                  return element.offsetParent;
                }
                function getContainingBlock2(element) {
                  var isFirefox = /firefox/i.test(getUAString2());
                  var isIE = /Trident/i.test(getUAString2());
                  if (isIE && isHTMLElement2(element)) {
                    var elementCss = getComputedStyle2(element);
                    if (elementCss.position === "fixed") {
                      return null;
                    }
                  }
                  var currentNode = getParentNode2(element);
                  if (isShadowRoot2(currentNode)) {
                    currentNode = currentNode.host;
                  }
                  while (isHTMLElement2(currentNode) && ["html", "body"].indexOf(getNodeName2(currentNode)) < 0) {
                    var css = getComputedStyle2(currentNode);
                    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
                      return currentNode;
                    } else {
                      currentNode = currentNode.parentNode;
                    }
                  }
                  return null;
                }
                function getOffsetParent2(element) {
                  var window2 = getWindow2(element);
                  var offsetParent = getTrueOffsetParent2(element);
                  while (offsetParent && isTableElement2(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
                    offsetParent = getTrueOffsetParent2(offsetParent);
                  }
                  if (offsetParent && (getNodeName2(offsetParent) === "html" || getNodeName2(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
                    return window2;
                  }
                  return offsetParent || getContainingBlock2(element) || window2;
                }
                function getMainAxisFromPlacement2(placement) {
                  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
                }
                function within2(min2, value, max2) {
                  return math_max(min2, math_min(value, max2));
                }
                function withinMaxClamp2(min2, value, max2) {
                  var v = within2(min2, value, max2);
                  return v > max2 ? max2 : v;
                }
                function getFreshSideObject2() {
                  return {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                  };
                }
                function mergePaddingObject2(paddingObject) {
                  return Object.assign({}, getFreshSideObject2(), paddingObject);
                }
                function expandToHashMap2(value, keys) {
                  return keys.reduce(function(hashMap, key) {
                    hashMap[key] = value;
                    return hashMap;
                  }, {});
                }
                var toPaddingObject3 = function toPaddingObject4(padding, state) {
                  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
                    placement: state.placement
                  })) : padding;
                  return mergePaddingObject2(typeof padding !== "number" ? padding : expandToHashMap2(padding, basePlacements2));
                };
                function arrow2(_ref) {
                  var _state$modifiersData$;
                  var state = _ref.state, name = _ref.name, options = _ref.options;
                  var arrowElement = state.elements.arrow;
                  var popperOffsets3 = state.modifiersData.popperOffsets;
                  var basePlacement = getBasePlacement2(state.placement);
                  var axis = getMainAxisFromPlacement2(basePlacement);
                  var isVertical = [left2, right2].indexOf(basePlacement) >= 0;
                  var len = isVertical ? "height" : "width";
                  if (!arrowElement || !popperOffsets3) {
                    return;
                  }
                  var paddingObject = toPaddingObject3(options.padding, state);
                  var arrowRect = getLayoutRect2(arrowElement);
                  var minProp = axis === "y" ? enums_top : left2;
                  var maxProp = axis === "y" ? bottom2 : right2;
                  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets3[axis] - state.rects.popper[len];
                  var startDiff = popperOffsets3[axis] - state.rects.reference[axis];
                  var arrowOffsetParent = getOffsetParent2(arrowElement);
                  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
                  var centerToReference = endDiff / 2 - startDiff / 2;
                  var min2 = paddingObject[minProp];
                  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
                  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
                  var offset3 = within2(min2, center, max2);
                  var axisProp = axis;
                  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset3, _state$modifiersData$.centerOffset = offset3 - center, _state$modifiersData$);
                }
                function arrow_effect(_ref2) {
                  var state = _ref2.state, options = _ref2.options;
                  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
                  if (arrowElement == null) {
                    return;
                  }
                  if (typeof arrowElement === "string") {
                    arrowElement = state.elements.popper.querySelector(arrowElement);
                    if (!arrowElement) {
                      return;
                    }
                  }
                  if (!contains2(state.elements.popper, arrowElement)) {
                    return;
                  }
                  state.elements.arrow = arrowElement;
                }
                var modifiers_arrow = {
                  name: "arrow",
                  enabled: true,
                  phase: "main",
                  fn: arrow2,
                  effect: arrow_effect,
                  requires: ["popperOffsets"],
                  requiresIfExists: ["preventOverflow"]
                };
                function getVariation2(placement) {
                  return placement.split("-")[1];
                }
                var unsetSides2 = {
                  top: "auto",
                  right: "auto",
                  bottom: "auto",
                  left: "auto"
                };
                function roundOffsetsByDPR2(_ref) {
                  var x2 = _ref.x, y3 = _ref.y;
                  var win = window;
                  var dpr = win.devicePixelRatio || 1;
                  return {
                    x: round2(x2 * dpr) / dpr || 0,
                    y: round2(y3 * dpr) / dpr || 0
                  };
                }
                function mapToStyles2(_ref2) {
                  var _Object$assign2;
                  var popper3 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
                  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y3 = _offsets$y === void 0 ? 0 : _offsets$y;
                  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
                    x: x2,
                    y: y3
                  }) : {
                    x: x2,
                    y: y3
                  };
                  x2 = _ref3.x;
                  y3 = _ref3.y;
                  var hasX = offsets.hasOwnProperty("x");
                  var hasY = offsets.hasOwnProperty("y");
                  var sideX = left2;
                  var sideY = enums_top;
                  var win = window;
                  if (adaptive) {
                    var offsetParent = getOffsetParent2(popper3);
                    var heightProp = "clientHeight";
                    var widthProp = "clientWidth";
                    if (offsetParent === getWindow2(popper3)) {
                      offsetParent = getDocumentElement2(popper3);
                      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
                        heightProp = "scrollHeight";
                        widthProp = "scrollWidth";
                      }
                    }
                    offsetParent = offsetParent;
                    if (placement === enums_top || (placement === left2 || placement === right2) && variation === end2) {
                      sideY = bottom2;
                      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
                        // $FlowFixMe[prop-missing]
                        offsetParent[heightProp]
                      );
                      y3 -= offsetY - popperRect.height;
                      y3 *= gpuAcceleration ? 1 : -1;
                    }
                    if (placement === left2 || (placement === enums_top || placement === bottom2) && variation === end2) {
                      sideX = right2;
                      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
                        // $FlowFixMe[prop-missing]
                        offsetParent[widthProp]
                      );
                      x2 -= offsetX - popperRect.width;
                      x2 *= gpuAcceleration ? 1 : -1;
                    }
                  }
                  var commonStyles = Object.assign({
                    position
                  }, adaptive && unsetSides2);
                  var _ref4 = roundOffsets === true ? roundOffsetsByDPR2({
                    x: x2,
                    y: y3
                  }) : {
                    x: x2,
                    y: y3
                  };
                  x2 = _ref4.x;
                  y3 = _ref4.y;
                  if (gpuAcceleration) {
                    var _Object$assign;
                    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y3 + "px)" : "translate3d(" + x2 + "px, " + y3 + "px, 0)", _Object$assign));
                  }
                  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y3 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
                }
                function computeStyles2(_ref5) {
                  var state = _ref5.state, options = _ref5.options;
                  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
                  var commonStyles = {
                    placement: getBasePlacement2(state.placement),
                    variation: getVariation2(state.placement),
                    popper: state.elements.popper,
                    popperRect: state.rects.popper,
                    gpuAcceleration,
                    isFixed: state.options.strategy === "fixed"
                  };
                  if (state.modifiersData.popperOffsets != null) {
                    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles2(Object.assign({}, commonStyles, {
                      offsets: state.modifiersData.popperOffsets,
                      position: state.options.strategy,
                      adaptive,
                      roundOffsets
                    })));
                  }
                  if (state.modifiersData.arrow != null) {
                    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles2(Object.assign({}, commonStyles, {
                      offsets: state.modifiersData.arrow,
                      position: "absolute",
                      adaptive: false,
                      roundOffsets
                    })));
                  }
                  state.attributes.popper = Object.assign({}, state.attributes.popper, {
                    "data-popper-placement": state.placement
                  });
                }
                var modifiers_computeStyles = {
                  name: "computeStyles",
                  enabled: true,
                  phase: "beforeWrite",
                  fn: computeStyles2,
                  data: {}
                };
                var passive2 = {
                  passive: true
                };
                function eventListeners_effect(_ref) {
                  var state = _ref.state, instance = _ref.instance, options = _ref.options;
                  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
                  var window2 = getWindow2(state.elements.popper);
                  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
                  if (scroll) {
                    scrollParents.forEach(function(scrollParent) {
                      scrollParent.addEventListener("scroll", instance.update, passive2);
                    });
                  }
                  if (resize) {
                    window2.addEventListener("resize", instance.update, passive2);
                  }
                  return function() {
                    if (scroll) {
                      scrollParents.forEach(function(scrollParent) {
                        scrollParent.removeEventListener("scroll", instance.update, passive2);
                      });
                    }
                    if (resize) {
                      window2.removeEventListener("resize", instance.update, passive2);
                    }
                  };
                }
                var eventListeners2 = {
                  name: "eventListeners",
                  enabled: true,
                  phase: "write",
                  fn: function fn3() {
                  },
                  effect: eventListeners_effect,
                  data: {}
                };
                var hash2 = {
                  left: "right",
                  right: "left",
                  bottom: "top",
                  top: "bottom"
                };
                function getOppositePlacement2(placement) {
                  return placement.replace(/left|right|bottom|top/g, function(matched) {
                    return hash2[matched];
                  });
                }
                var getOppositeVariationPlacement_hash = {
                  start: "end",
                  end: "start"
                };
                function getOppositeVariationPlacement2(placement) {
                  return placement.replace(/start|end/g, function(matched) {
                    return getOppositeVariationPlacement_hash[matched];
                  });
                }
                function getWindowScroll2(node) {
                  var win = getWindow2(node);
                  var scrollLeft = win.pageXOffset;
                  var scrollTop = win.pageYOffset;
                  return {
                    scrollLeft,
                    scrollTop
                  };
                }
                function getWindowScrollBarX2(element) {
                  return getBoundingClientRect2(getDocumentElement2(element)).left + getWindowScroll2(element).scrollLeft;
                }
                function getViewportRect2(element, strategy) {
                  var win = getWindow2(element);
                  var html = getDocumentElement2(element);
                  var visualViewport = win.visualViewport;
                  var width = html.clientWidth;
                  var height = html.clientHeight;
                  var x2 = 0;
                  var y3 = 0;
                  if (visualViewport) {
                    width = visualViewport.width;
                    height = visualViewport.height;
                    var layoutViewport = isLayoutViewport2();
                    if (layoutViewport || !layoutViewport && strategy === "fixed") {
                      x2 = visualViewport.offsetLeft;
                      y3 = visualViewport.offsetTop;
                    }
                  }
                  return {
                    width,
                    height,
                    x: x2 + getWindowScrollBarX2(element),
                    y: y3
                  };
                }
                function getDocumentRect2(element) {
                  var _element$ownerDocumen;
                  var html = getDocumentElement2(element);
                  var winScroll = getWindowScroll2(element);
                  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
                  var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
                  var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
                  var x2 = -winScroll.scrollLeft + getWindowScrollBarX2(element);
                  var y3 = -winScroll.scrollTop;
                  if (getComputedStyle2(body || html).direction === "rtl") {
                    x2 += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
                  }
                  return {
                    width,
                    height,
                    x: x2,
                    y: y3
                  };
                }
                function isScrollParent2(element) {
                  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
                  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
                }
                function getScrollParent2(node) {
                  if (["html", "body", "#document"].indexOf(getNodeName2(node)) >= 0) {
                    return node.ownerDocument.body;
                  }
                  if (isHTMLElement2(node) && isScrollParent2(node)) {
                    return node;
                  }
                  return getScrollParent2(getParentNode2(node));
                }
                function listScrollParents2(element, list) {
                  var _element$ownerDocumen;
                  if (list === void 0) {
                    list = [];
                  }
                  var scrollParent = getScrollParent2(element);
                  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
                  var win = getWindow2(scrollParent);
                  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent2(scrollParent) ? scrollParent : []) : scrollParent;
                  var updatedList = list.concat(target);
                  return isBody ? updatedList : (
                    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
                    updatedList.concat(listScrollParents2(getParentNode2(target)))
                  );
                }
                function rectToClientRect2(rect) {
                  return Object.assign({}, rect, {
                    left: rect.x,
                    top: rect.y,
                    right: rect.x + rect.width,
                    bottom: rect.y + rect.height
                  });
                }
                function getInnerBoundingClientRect2(element, strategy) {
                  var rect = getBoundingClientRect2(element, false, strategy === "fixed");
                  rect.top = rect.top + element.clientTop;
                  rect.left = rect.left + element.clientLeft;
                  rect.bottom = rect.top + element.clientHeight;
                  rect.right = rect.left + element.clientWidth;
                  rect.width = element.clientWidth;
                  rect.height = element.clientHeight;
                  rect.x = rect.left;
                  rect.y = rect.top;
                  return rect;
                }
                function getClientRectFromMixedType2(element, clippingParent, strategy) {
                  return clippingParent === viewport2 ? rectToClientRect2(getViewportRect2(element, strategy)) : isElement2(clippingParent) ? getInnerBoundingClientRect2(clippingParent, strategy) : rectToClientRect2(getDocumentRect2(getDocumentElement2(element)));
                }
                function getClippingParents2(element) {
                  var clippingParents3 = listScrollParents2(getParentNode2(element));
                  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
                  var clipperElement = canEscapeClipping && isHTMLElement2(element) ? getOffsetParent2(element) : element;
                  if (!isElement2(clipperElement)) {
                    return [];
                  }
                  return clippingParents3.filter(function(clippingParent) {
                    return isElement2(clippingParent) && contains2(clippingParent, clipperElement) && getNodeName2(clippingParent) !== "body";
                  });
                }
                function getClippingRect2(element, boundary, rootBoundary, strategy) {
                  var mainClippingParents = boundary === "clippingParents" ? getClippingParents2(element) : [].concat(boundary);
                  var clippingParents3 = [].concat(mainClippingParents, [rootBoundary]);
                  var firstClippingParent = clippingParents3[0];
                  var clippingRect = clippingParents3.reduce(function(accRect, clippingParent) {
                    var rect = getClientRectFromMixedType2(element, clippingParent, strategy);
                    accRect.top = math_max(rect.top, accRect.top);
                    accRect.right = math_min(rect.right, accRect.right);
                    accRect.bottom = math_min(rect.bottom, accRect.bottom);
                    accRect.left = math_max(rect.left, accRect.left);
                    return accRect;
                  }, getClientRectFromMixedType2(element, firstClippingParent, strategy));
                  clippingRect.width = clippingRect.right - clippingRect.left;
                  clippingRect.height = clippingRect.bottom - clippingRect.top;
                  clippingRect.x = clippingRect.left;
                  clippingRect.y = clippingRect.top;
                  return clippingRect;
                }
                function computeOffsets2(_ref) {
                  var reference3 = _ref.reference, element = _ref.element, placement = _ref.placement;
                  var basePlacement = placement ? getBasePlacement2(placement) : null;
                  var variation = placement ? getVariation2(placement) : null;
                  var commonX = reference3.x + reference3.width / 2 - element.width / 2;
                  var commonY = reference3.y + reference3.height / 2 - element.height / 2;
                  var offsets;
                  switch (basePlacement) {
                    case enums_top:
                      offsets = {
                        x: commonX,
                        y: reference3.y - element.height
                      };
                      break;
                    case bottom2:
                      offsets = {
                        x: commonX,
                        y: reference3.y + reference3.height
                      };
                      break;
                    case right2:
                      offsets = {
                        x: reference3.x + reference3.width,
                        y: commonY
                      };
                      break;
                    case left2:
                      offsets = {
                        x: reference3.x - element.width,
                        y: commonY
                      };
                      break;
                    default:
                      offsets = {
                        x: reference3.x,
                        y: reference3.y
                      };
                  }
                  var mainAxis = basePlacement ? getMainAxisFromPlacement2(basePlacement) : null;
                  if (mainAxis != null) {
                    var len = mainAxis === "y" ? "height" : "width";
                    switch (variation) {
                      case start2:
                        offsets[mainAxis] = offsets[mainAxis] - (reference3[len] / 2 - element[len] / 2);
                        break;
                      case end2:
                        offsets[mainAxis] = offsets[mainAxis] + (reference3[len] / 2 - element[len] / 2);
                        break;
                    }
                  }
                  return offsets;
                }
                function detectOverflow2(state, options) {
                  if (options === void 0) {
                    options = {};
                  }
                  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents2 : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport2 : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper2 : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
                  var paddingObject = mergePaddingObject2(typeof padding !== "number" ? padding : expandToHashMap2(padding, basePlacements2));
                  var altContext = elementContext === popper2 ? reference2 : popper2;
                  var popperRect = state.rects.popper;
                  var element = state.elements[altBoundary ? altContext : elementContext];
                  var clippingClientRect = getClippingRect2(isElement2(element) ? element : element.contextElement || getDocumentElement2(state.elements.popper), boundary, rootBoundary, strategy);
                  var referenceClientRect = getBoundingClientRect2(state.elements.reference);
                  var popperOffsets3 = computeOffsets2({
                    reference: referenceClientRect,
                    element: popperRect,
                    placement
                  });
                  var popperClientRect = rectToClientRect2(Object.assign({}, popperRect, popperOffsets3));
                  var elementClientRect = elementContext === popper2 ? popperClientRect : referenceClientRect;
                  var overflowOffsets = {
                    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
                    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
                    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
                    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
                  };
                  var offsetData = state.modifiersData.offset;
                  if (elementContext === popper2 && offsetData) {
                    var offset3 = offsetData[placement];
                    Object.keys(overflowOffsets).forEach(function(key) {
                      var multiply = [right2, bottom2].indexOf(key) >= 0 ? 1 : -1;
                      var axis = [enums_top, bottom2].indexOf(key) >= 0 ? "y" : "x";
                      overflowOffsets[key] += offset3[axis] * multiply;
                    });
                  }
                  return overflowOffsets;
                }
                function computeAutoPlacement2(state, options) {
                  if (options === void 0) {
                    options = {};
                  }
                  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? enums_placements : _options$allowedAutoP;
                  var variation = getVariation2(placement);
                  var placements2 = variation ? flipVariations ? variationPlacements2 : variationPlacements2.filter(function(placement2) {
                    return getVariation2(placement2) === variation;
                  }) : basePlacements2;
                  var allowedPlacements = placements2.filter(function(placement2) {
                    return allowedAutoPlacements.indexOf(placement2) >= 0;
                  });
                  if (allowedPlacements.length === 0) {
                    allowedPlacements = placements2;
                  }
                  var overflows = allowedPlacements.reduce(function(acc, placement2) {
                    acc[placement2] = detectOverflow2(state, {
                      placement: placement2,
                      boundary,
                      rootBoundary,
                      padding
                    })[getBasePlacement2(placement2)];
                    return acc;
                  }, {});
                  return Object.keys(overflows).sort(function(a, b) {
                    return overflows[a] - overflows[b];
                  });
                }
                function getExpandedFallbackPlacements2(placement) {
                  if (getBasePlacement2(placement) === auto2) {
                    return [];
                  }
                  var oppositePlacement = getOppositePlacement2(placement);
                  return [getOppositeVariationPlacement2(placement), oppositePlacement, getOppositeVariationPlacement2(oppositePlacement)];
                }
                function flip2(_ref) {
                  var state = _ref.state, options = _ref.options, name = _ref.name;
                  if (state.modifiersData[name]._skip) {
                    return;
                  }
                  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
                  var preferredPlacement = state.options.placement;
                  var basePlacement = getBasePlacement2(preferredPlacement);
                  var isBasePlacement = basePlacement === preferredPlacement;
                  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement2(preferredPlacement)] : getExpandedFallbackPlacements2(preferredPlacement));
                  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
                    return acc.concat(getBasePlacement2(placement2) === auto2 ? computeAutoPlacement2(state, {
                      placement: placement2,
                      boundary,
                      rootBoundary,
                      padding,
                      flipVariations,
                      allowedAutoPlacements
                    }) : placement2);
                  }, []);
                  var referenceRect = state.rects.reference;
                  var popperRect = state.rects.popper;
                  var checksMap = /* @__PURE__ */ new Map();
                  var makeFallbackChecks = true;
                  var firstFittingPlacement = placements2[0];
                  for (var i = 0; i < placements2.length; i++) {
                    var placement = placements2[i];
                    var _basePlacement = getBasePlacement2(placement);
                    var isStartVariation = getVariation2(placement) === start2;
                    var isVertical = [enums_top, bottom2].indexOf(_basePlacement) >= 0;
                    var len = isVertical ? "width" : "height";
                    var overflow = detectOverflow2(state, {
                      placement,
                      boundary,
                      rootBoundary,
                      altBoundary,
                      padding
                    });
                    var mainVariationSide = isVertical ? isStartVariation ? right2 : left2 : isStartVariation ? bottom2 : enums_top;
                    if (referenceRect[len] > popperRect[len]) {
                      mainVariationSide = getOppositePlacement2(mainVariationSide);
                    }
                    var altVariationSide = getOppositePlacement2(mainVariationSide);
                    var checks = [];
                    if (checkMainAxis) {
                      checks.push(overflow[_basePlacement] <= 0);
                    }
                    if (checkAltAxis) {
                      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
                    }
                    if (checks.every(function(check) {
                      return check;
                    })) {
                      firstFittingPlacement = placement;
                      makeFallbackChecks = false;
                      break;
                    }
                    checksMap.set(placement, checks);
                  }
                  if (makeFallbackChecks) {
                    var numberOfChecks = flipVariations ? 3 : 1;
                    var _loop = function _loop2(_i2) {
                      var fittingPlacement = placements2.find(function(placement2) {
                        var checks2 = checksMap.get(placement2);
                        if (checks2) {
                          return checks2.slice(0, _i2).every(function(check) {
                            return check;
                          });
                        }
                      });
                      if (fittingPlacement) {
                        firstFittingPlacement = fittingPlacement;
                        return "break";
                      }
                    };
                    for (var _i = numberOfChecks; _i > 0; _i--) {
                      var _ret = _loop(_i);
                      if (_ret === "break") break;
                    }
                  }
                  if (state.placement !== firstFittingPlacement) {
                    state.modifiersData[name]._skip = true;
                    state.placement = firstFittingPlacement;
                    state.reset = true;
                  }
                }
                var modifiers_flip = {
                  name: "flip",
                  enabled: true,
                  phase: "main",
                  fn: flip2,
                  requiresIfExists: ["offset"],
                  data: {
                    _skip: false
                  }
                };
                function getSideOffsets2(overflow, rect, preventedOffsets) {
                  if (preventedOffsets === void 0) {
                    preventedOffsets = {
                      x: 0,
                      y: 0
                    };
                  }
                  return {
                    top: overflow.top - rect.height - preventedOffsets.y,
                    right: overflow.right - rect.width + preventedOffsets.x,
                    bottom: overflow.bottom - rect.height + preventedOffsets.y,
                    left: overflow.left - rect.width - preventedOffsets.x
                  };
                }
                function isAnySideFullyClipped2(overflow) {
                  return [enums_top, right2, bottom2, left2].some(function(side) {
                    return overflow[side] >= 0;
                  });
                }
                function hide2(_ref) {
                  var state = _ref.state, name = _ref.name;
                  var referenceRect = state.rects.reference;
                  var popperRect = state.rects.popper;
                  var preventedOffsets = state.modifiersData.preventOverflow;
                  var referenceOverflow = detectOverflow2(state, {
                    elementContext: "reference"
                  });
                  var popperAltOverflow = detectOverflow2(state, {
                    altBoundary: true
                  });
                  var referenceClippingOffsets = getSideOffsets2(referenceOverflow, referenceRect);
                  var popperEscapeOffsets = getSideOffsets2(popperAltOverflow, popperRect, preventedOffsets);
                  var isReferenceHidden = isAnySideFullyClipped2(referenceClippingOffsets);
                  var hasPopperEscaped = isAnySideFullyClipped2(popperEscapeOffsets);
                  state.modifiersData[name] = {
                    referenceClippingOffsets,
                    popperEscapeOffsets,
                    isReferenceHidden,
                    hasPopperEscaped
                  };
                  state.attributes.popper = Object.assign({}, state.attributes.popper, {
                    "data-popper-reference-hidden": isReferenceHidden,
                    "data-popper-escaped": hasPopperEscaped
                  });
                }
                var modifiers_hide = {
                  name: "hide",
                  enabled: true,
                  phase: "main",
                  requiresIfExists: ["preventOverflow"],
                  fn: hide2
                };
                function distanceAndSkiddingToXY2(placement, rects, offset3) {
                  var basePlacement = getBasePlacement2(placement);
                  var invertDistance = [left2, enums_top].indexOf(basePlacement) >= 0 ? -1 : 1;
                  var _ref = typeof offset3 === "function" ? offset3(Object.assign({}, rects, {
                    placement
                  })) : offset3, skidding = _ref[0], distance = _ref[1];
                  skidding = skidding || 0;
                  distance = (distance || 0) * invertDistance;
                  return [left2, right2].indexOf(basePlacement) >= 0 ? {
                    x: distance,
                    y: skidding
                  } : {
                    x: skidding,
                    y: distance
                  };
                }
                function offset2(_ref2) {
                  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
                  var _options$offset = options.offset, offset3 = _options$offset === void 0 ? [0, 0] : _options$offset;
                  var data = enums_placements.reduce(function(acc, placement) {
                    acc[placement] = distanceAndSkiddingToXY2(placement, state.rects, offset3);
                    return acc;
                  }, {});
                  var _data$state$placement = data[state.placement], x2 = _data$state$placement.x, y3 = _data$state$placement.y;
                  if (state.modifiersData.popperOffsets != null) {
                    state.modifiersData.popperOffsets.x += x2;
                    state.modifiersData.popperOffsets.y += y3;
                  }
                  state.modifiersData[name] = data;
                }
                var modifiers_offset = {
                  name: "offset",
                  enabled: true,
                  phase: "main",
                  requires: ["popperOffsets"],
                  fn: offset2
                };
                function popperOffsets2(_ref) {
                  var state = _ref.state, name = _ref.name;
                  state.modifiersData[name] = computeOffsets2({
                    reference: state.rects.reference,
                    element: state.rects.popper,
                    placement: state.placement
                  });
                }
                var modifiers_popperOffsets = {
                  name: "popperOffsets",
                  enabled: true,
                  phase: "read",
                  fn: popperOffsets2,
                  data: {}
                };
                function getAltAxis2(axis) {
                  return axis === "x" ? "y" : "x";
                }
                function preventOverflow2(_ref) {
                  var state = _ref.state, options = _ref.options, name = _ref.name;
                  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
                  var overflow = detectOverflow2(state, {
                    boundary,
                    rootBoundary,
                    padding,
                    altBoundary
                  });
                  var basePlacement = getBasePlacement2(state.placement);
                  var variation = getVariation2(state.placement);
                  var isBasePlacement = !variation;
                  var mainAxis = getMainAxisFromPlacement2(basePlacement);
                  var altAxis = getAltAxis2(mainAxis);
                  var popperOffsets3 = state.modifiersData.popperOffsets;
                  var referenceRect = state.rects.reference;
                  var popperRect = state.rects.popper;
                  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
                    placement: state.placement
                  })) : tetherOffset;
                  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
                    mainAxis: tetherOffsetValue,
                    altAxis: tetherOffsetValue
                  } : Object.assign({
                    mainAxis: 0,
                    altAxis: 0
                  }, tetherOffsetValue);
                  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
                  var data = {
                    x: 0,
                    y: 0
                  };
                  if (!popperOffsets3) {
                    return;
                  }
                  if (checkMainAxis) {
                    var _offsetModifierState$;
                    var mainSide = mainAxis === "y" ? enums_top : left2;
                    var altSide = mainAxis === "y" ? bottom2 : right2;
                    var len = mainAxis === "y" ? "height" : "width";
                    var offset3 = popperOffsets3[mainAxis];
                    var min2 = offset3 + overflow[mainSide];
                    var max2 = offset3 - overflow[altSide];
                    var additive = tether ? -popperRect[len] / 2 : 0;
                    var minLen = variation === start2 ? referenceRect[len] : popperRect[len];
                    var maxLen = variation === start2 ? -popperRect[len] : -referenceRect[len];
                    var arrowElement = state.elements.arrow;
                    var arrowRect = tether && arrowElement ? getLayoutRect2(arrowElement) : {
                      width: 0,
                      height: 0
                    };
                    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject2();
                    var arrowPaddingMin = arrowPaddingObject[mainSide];
                    var arrowPaddingMax = arrowPaddingObject[altSide];
                    var arrowLen = within2(0, referenceRect[len], arrowRect[len]);
                    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
                    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
                    var arrowOffsetParent = state.elements.arrow && getOffsetParent2(state.elements.arrow);
                    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
                    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
                    var tetherMin = offset3 + minOffset - offsetModifierValue - clientOffset;
                    var tetherMax = offset3 + maxOffset - offsetModifierValue;
                    var preventedOffset = within2(tether ? math_min(min2, tetherMin) : min2, offset3, tether ? math_max(max2, tetherMax) : max2);
                    popperOffsets3[mainAxis] = preventedOffset;
                    data[mainAxis] = preventedOffset - offset3;
                  }
                  if (checkAltAxis) {
                    var _offsetModifierState$2;
                    var _mainSide = mainAxis === "x" ? enums_top : left2;
                    var _altSide = mainAxis === "x" ? bottom2 : right2;
                    var _offset = popperOffsets3[altAxis];
                    var _len = altAxis === "y" ? "height" : "width";
                    var _min = _offset + overflow[_mainSide];
                    var _max = _offset - overflow[_altSide];
                    var isOriginSide = [enums_top, left2].indexOf(basePlacement) !== -1;
                    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
                    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
                    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
                    var _preventedOffset = tether && isOriginSide ? withinMaxClamp2(_tetherMin, _offset, _tetherMax) : within2(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
                    popperOffsets3[altAxis] = _preventedOffset;
                    data[altAxis] = _preventedOffset - _offset;
                  }
                  state.modifiersData[name] = data;
                }
                var modifiers_preventOverflow = {
                  name: "preventOverflow",
                  enabled: true,
                  phase: "main",
                  fn: preventOverflow2,
                  requiresIfExists: ["offset"]
                };
                function getHTMLElementScroll2(element) {
                  return {
                    scrollLeft: element.scrollLeft,
                    scrollTop: element.scrollTop
                  };
                }
                function getNodeScroll2(node) {
                  if (node === getWindow2(node) || !isHTMLElement2(node)) {
                    return getWindowScroll2(node);
                  } else {
                    return getHTMLElementScroll2(node);
                  }
                }
                function isElementScaled2(element) {
                  var rect = element.getBoundingClientRect();
                  var scaleX = round2(rect.width) / element.offsetWidth || 1;
                  var scaleY = round2(rect.height) / element.offsetHeight || 1;
                  return scaleX !== 1 || scaleY !== 1;
                }
                function getCompositeRect2(elementOrVirtualElement, offsetParent, isFixed) {
                  if (isFixed === void 0) {
                    isFixed = false;
                  }
                  var isOffsetParentAnElement = isHTMLElement2(offsetParent);
                  var offsetParentIsScaled = isHTMLElement2(offsetParent) && isElementScaled2(offsetParent);
                  var documentElement = getDocumentElement2(offsetParent);
                  var rect = getBoundingClientRect2(elementOrVirtualElement, offsetParentIsScaled, isFixed);
                  var scroll = {
                    scrollLeft: 0,
                    scrollTop: 0
                  };
                  var offsets = {
                    x: 0,
                    y: 0
                  };
                  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
                    if (getNodeName2(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
                    isScrollParent2(documentElement)) {
                      scroll = getNodeScroll2(offsetParent);
                    }
                    if (isHTMLElement2(offsetParent)) {
                      offsets = getBoundingClientRect2(offsetParent, true);
                      offsets.x += offsetParent.clientLeft;
                      offsets.y += offsetParent.clientTop;
                    } else if (documentElement) {
                      offsets.x = getWindowScrollBarX2(documentElement);
                    }
                  }
                  return {
                    x: rect.left + scroll.scrollLeft - offsets.x,
                    y: rect.top + scroll.scrollTop - offsets.y,
                    width: rect.width,
                    height: rect.height
                  };
                }
                function order2(modifiers) {
                  var map = /* @__PURE__ */ new Map();
                  var visited = /* @__PURE__ */ new Set();
                  var result = [];
                  modifiers.forEach(function(modifier) {
                    map.set(modifier.name, modifier);
                  });
                  function sort(modifier) {
                    visited.add(modifier.name);
                    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
                    requires.forEach(function(dep) {
                      if (!visited.has(dep)) {
                        var depModifier = map.get(dep);
                        if (depModifier) {
                          sort(depModifier);
                        }
                      }
                    });
                    result.push(modifier);
                  }
                  modifiers.forEach(function(modifier) {
                    if (!visited.has(modifier.name)) {
                      sort(modifier);
                    }
                  });
                  return result;
                }
                function orderModifiers2(modifiers) {
                  var orderedModifiers = order2(modifiers);
                  return modifierPhases2.reduce(function(acc, phase) {
                    return acc.concat(orderedModifiers.filter(function(modifier) {
                      return modifier.phase === phase;
                    }));
                  }, []);
                }
                function debounce2(fn3) {
                  var pending;
                  return function() {
                    if (!pending) {
                      pending = new Promise(function(resolve) {
                        Promise.resolve().then(function() {
                          pending = void 0;
                          resolve(fn3());
                        });
                      });
                    }
                    return pending;
                  };
                }
                function mergeByName2(modifiers) {
                  var merged = modifiers.reduce(function(merged2, current) {
                    var existing = merged2[current.name];
                    merged2[current.name] = existing ? Object.assign({}, existing, current, {
                      options: Object.assign({}, existing.options, current.options),
                      data: Object.assign({}, existing.data, current.data)
                    }) : current;
                    return merged2;
                  }, {});
                  return Object.keys(merged).map(function(key) {
                    return merged[key];
                  });
                }
                var DEFAULT_OPTIONS2 = {
                  placement: "bottom",
                  modifiers: [],
                  strategy: "absolute"
                };
                function areValidElements2() {
                  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }
                  return !args.some(function(element) {
                    return !(element && typeof element.getBoundingClientRect === "function");
                  });
                }
                function popperGenerator2(generatorOptions) {
                  if (generatorOptions === void 0) {
                    generatorOptions = {};
                  }
                  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS2 : _generatorOptions$def2;
                  return function createPopper3(reference3, popper3, options) {
                    if (options === void 0) {
                      options = defaultOptions2;
                    }
                    var state = {
                      placement: "bottom",
                      orderedModifiers: [],
                      options: Object.assign({}, DEFAULT_OPTIONS2, defaultOptions2),
                      modifiersData: {},
                      elements: {
                        reference: reference3,
                        popper: popper3
                      },
                      attributes: {},
                      styles: {}
                    };
                    var effectCleanupFns = [];
                    var isDestroyed = false;
                    var instance = {
                      state,
                      setOptions: function setOptions(setOptionsAction) {
                        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
                        cleanupModifierEffects();
                        state.options = Object.assign({}, defaultOptions2, state.options, options2);
                        state.scrollParents = {
                          reference: isElement2(reference3) ? listScrollParents2(reference3) : reference3.contextElement ? listScrollParents2(reference3.contextElement) : [],
                          popper: listScrollParents2(popper3)
                        };
                        var orderedModifiers = orderModifiers2(mergeByName2([].concat(defaultModifiers3, state.options.modifiers)));
                        state.orderedModifiers = orderedModifiers.filter(function(m3) {
                          return m3.enabled;
                        });
                        runModifierEffects();
                        return instance.update();
                      },
                      // Sync update – it will always be executed, even if not necessary. This
                      // is useful for low frequency updates where sync behavior simplifies the
                      // logic.
                      // For high frequency updates (e.g. `resize` and `scroll` events), always
                      // prefer the async Popper#update method
                      forceUpdate: function forceUpdate() {
                        if (isDestroyed) {
                          return;
                        }
                        var _state$elements = state.elements, reference4 = _state$elements.reference, popper4 = _state$elements.popper;
                        if (!areValidElements2(reference4, popper4)) {
                          return;
                        }
                        state.rects = {
                          reference: getCompositeRect2(reference4, getOffsetParent2(popper4), state.options.strategy === "fixed"),
                          popper: getLayoutRect2(popper4)
                        };
                        state.reset = false;
                        state.placement = state.options.placement;
                        state.orderedModifiers.forEach(function(modifier) {
                          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                        });
                        for (var index = 0; index < state.orderedModifiers.length; index++) {
                          if (state.reset === true) {
                            state.reset = false;
                            index = -1;
                            continue;
                          }
                          var _state$orderedModifie = state.orderedModifiers[index], fn3 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                          if (typeof fn3 === "function") {
                            state = fn3({
                              state,
                              options: _options,
                              name,
                              instance
                            }) || state;
                          }
                        }
                      },
                      // Async and optimistically optimized update – it will not be executed if
                      // not necessary (debounced to run at most once-per-tick)
                      update: debounce2(function() {
                        return new Promise(function(resolve) {
                          instance.forceUpdate();
                          resolve(state);
                        });
                      }),
                      destroy: function destroy() {
                        cleanupModifierEffects();
                        isDestroyed = true;
                      }
                    };
                    if (!areValidElements2(reference3, popper3)) {
                      return instance;
                    }
                    instance.setOptions(options).then(function(state2) {
                      if (!isDestroyed && options.onFirstUpdate) {
                        options.onFirstUpdate(state2);
                      }
                    });
                    function runModifierEffects() {
                      state.orderedModifiers.forEach(function(_ref3) {
                        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
                        if (typeof effect3 === "function") {
                          var cleanupFn = effect3({
                            state,
                            name,
                            instance,
                            options: options2
                          });
                          var noopFn = function noopFn2() {
                          };
                          effectCleanupFns.push(cleanupFn || noopFn);
                        }
                      });
                    }
                    function cleanupModifierEffects() {
                      effectCleanupFns.forEach(function(fn3) {
                        return fn3();
                      });
                      effectCleanupFns = [];
                    }
                    return instance;
                  };
                }
                var createPopper2 = /* @__PURE__ */ popperGenerator2();
                var defaultModifiers2 = [eventListeners2, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide];
                var popper_createPopper = /* @__PURE__ */ popperGenerator2({
                  defaultModifiers: defaultModifiers2
                });
                var popper_lite_defaultModifiers = [eventListeners2, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles];
                var popper_lite_createPopper = /* @__PURE__ */ popperGenerator2({
                  defaultModifiers: popper_lite_defaultModifiers
                });
              })
            ),
            /***/
            554: (
              /***/
              (function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", { value: true });
                function _arrayLikeToArray2(r, a) {
                  (null == a || a > r.length) && (a = r.length);
                  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
                  return n;
                }
                function _arrayWithHoles2(r) {
                  if (Array.isArray(r)) return r;
                }
                function _arrayWithoutHoles2(r) {
                  if (Array.isArray(r)) return _arrayLikeToArray2(r);
                }
                function _assertThisInitialized2(e) {
                  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return e;
                }
                function _callSuper2(t, o, e) {
                  return o = _getPrototypeOf2(o), _possibleConstructorReturn2(t, _isNativeReflectConstruct2() ? Reflect.construct(o, e || [], _getPrototypeOf2(t).constructor) : o.apply(t, e));
                }
                function _classCallCheck2(a, n) {
                  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
                }
                function _defineProperties2(e, r) {
                  for (var t = 0; t < r.length; t++) {
                    var o = r[t];
                    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey2(o.key), o);
                  }
                }
                function _createClass2(e, r, t) {
                  return r && _defineProperties2(e.prototype, r), t && _defineProperties2(e, t), Object.defineProperty(e, "prototype", {
                    writable: false
                  }), e;
                }
                function _get2() {
                  return _get2 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
                    var p = _superPropBase2(e, t);
                    if (p) {
                      var n = Object.getOwnPropertyDescriptor(p, t);
                      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
                    }
                  }, _get2.apply(null, arguments);
                }
                function _getPrototypeOf2(t) {
                  return _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
                    return t2.__proto__ || Object.getPrototypeOf(t2);
                  }, _getPrototypeOf2(t);
                }
                function _inherits2(t, e) {
                  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                  t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      writable: true,
                      configurable: true
                    }
                  }), Object.defineProperty(t, "prototype", {
                    writable: false
                  }), e && _setPrototypeOf2(t, e);
                }
                function _isNativeReflectConstruct2() {
                  try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                    }));
                  } catch (t2) {
                  }
                  return (_isNativeReflectConstruct2 = function() {
                    return !!t;
                  })();
                }
                function _iterableToArray2(r) {
                  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
                }
                function _iterableToArrayLimit2(r, l) {
                  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                  if (null != t) {
                    var e, n, i, u, a = [], f2 = true, o = false;
                    try {
                      if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f2 = false;
                      } else for (; !(f2 = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f2 = true) ;
                    } catch (r2) {
                      o = true, n = r2;
                    } finally {
                      try {
                        if (!f2 && null != t.return && (u = t.return(), Object(u) !== u)) return;
                      } finally {
                        if (o) throw n;
                      }
                    }
                    return a;
                  }
                }
                function _nonIterableRest2() {
                  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function _nonIterableSpread2() {
                  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function _possibleConstructorReturn2(t, e) {
                  if (e && ("object" == typeof e || "function" == typeof e)) return e;
                  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                  return _assertThisInitialized2(t);
                }
                function _setPrototypeOf2(t, e) {
                  return _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
                    return t2.__proto__ = e2, t2;
                  }, _setPrototypeOf2(t, e);
                }
                function _slicedToArray2(r, e) {
                  return _arrayWithHoles2(r) || _iterableToArrayLimit2(r, e) || _unsupportedIterableToArray2(r, e) || _nonIterableRest2();
                }
                function _superPropBase2(t, o) {
                  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf2(t)); ) ;
                  return t;
                }
                function _toConsumableArray2(r) {
                  return _arrayWithoutHoles2(r) || _iterableToArray2(r) || _unsupportedIterableToArray2(r) || _nonIterableSpread2();
                }
                function _toPrimitive2(t, r) {
                  if ("object" != typeof t || !t) return t;
                  var e = t[Symbol.toPrimitive];
                  if (void 0 !== e) {
                    var i = e.call(t, r);
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                  }
                  return String(t);
                }
                function _toPropertyKey2(t) {
                  var i = _toPrimitive2(t, "string");
                  return "symbol" == typeof i ? i : i + "";
                }
                function _typeof2(o) {
                  "@babel/helpers - typeof";
                  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
                    return typeof o2;
                  } : function(o2) {
                    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
                  }, _typeof2(o);
                }
                function _unsupportedIterableToArray2(r, a) {
                  if (r) {
                    if ("string" == typeof r) return _arrayLikeToArray2(r, a);
                    var t = {}.toString.call(r).slice(8, -1);
                    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0;
                  }
                }
                function hasProperty2(obj, prop) {
                  return Object.prototype.hasOwnProperty.call(obj, prop);
                }
                function lastItemOf2(arr) {
                  return arr[arr.length - 1];
                }
                function pushUnique2(arr) {
                  for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    items[_key - 1] = arguments[_key];
                  }
                  items.forEach(function(item) {
                    if (arr.includes(item)) {
                      return;
                    }
                    arr.push(item);
                  });
                  return arr;
                }
                function stringToArray2(str, separator) {
                  return str ? str.split(separator) : [];
                }
                function isInRange2(testVal, min2, max2) {
                  var minOK = min2 === void 0 || testVal >= min2;
                  var maxOK = max2 === void 0 || testVal <= max2;
                  return minOK && maxOK;
                }
                function limitToRange2(val, min2, max2) {
                  if (val < min2) {
                    return min2;
                  }
                  if (val > max2) {
                    return max2;
                  }
                  return val;
                }
                function createTagRepeat2(tagName, repeat) {
                  var attributes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                  var index = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
                  var html = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "";
                  var openTagSrc = Object.keys(attributes).reduce(function(src, attr) {
                    var val = attributes[attr];
                    if (typeof val === "function") {
                      val = val(index);
                    }
                    return "".concat(src, " ").concat(attr, '="').concat(val, '"');
                  }, tagName);
                  html += "<".concat(openTagSrc, "></").concat(tagName, ">");
                  var next = index + 1;
                  return next < repeat ? createTagRepeat2(tagName, repeat, attributes, next, html) : html;
                }
                function optimizeTemplateHTML2(html) {
                  return html.replace(/>\s+/g, ">").replace(/\s+</, "<");
                }
                function stripTime2(timeValue) {
                  return new Date(timeValue).setHours(0, 0, 0, 0);
                }
                function today2() {
                  return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
                }
                function dateValue2() {
                  switch (arguments.length) {
                    case 0:
                      return today2();
                    case 1:
                      return stripTime2(arguments.length <= 0 ? void 0 : arguments[0]);
                  }
                  var newDate = /* @__PURE__ */ new Date(0);
                  newDate.setFullYear.apply(newDate, arguments);
                  return newDate.setHours(0, 0, 0, 0);
                }
                function addDays2(date, amount) {
                  var newDate = new Date(date);
                  return newDate.setDate(newDate.getDate() + amount);
                }
                function addWeeks2(date, amount) {
                  return addDays2(date, amount * 7);
                }
                function addMonths2(date, amount) {
                  var newDate = new Date(date);
                  var monthsToSet = newDate.getMonth() + amount;
                  var expectedMonth = monthsToSet % 12;
                  if (expectedMonth < 0) {
                    expectedMonth += 12;
                  }
                  var time = newDate.setMonth(monthsToSet);
                  return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
                }
                function addYears2(date, amount) {
                  var newDate = new Date(date);
                  var expectedMonth = newDate.getMonth();
                  var time = newDate.setFullYear(newDate.getFullYear() + amount);
                  return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
                }
                function dayDiff2(day, from) {
                  return (day - from + 7) % 7;
                }
                function dayOfTheWeekOf2(baseDate, dayOfWeek) {
                  var weekStart = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
                  var baseDay = new Date(baseDate).getDay();
                  return addDays2(baseDate, dayDiff2(dayOfWeek, weekStart) - dayDiff2(baseDay, weekStart));
                }
                function getWeek2(date) {
                  var thuOfTheWeek = dayOfTheWeekOf2(date, 4, 1);
                  var firstThu = dayOfTheWeekOf2(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
                  return Math.round((thuOfTheWeek - firstThu) / 6048e5) + 1;
                }
                function startOfYearPeriod2(date, years) {
                  var year = new Date(date).getFullYear();
                  return Math.floor(year / years) * years;
                }
                var reFormatTokens2 = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
                var reNonDateParts2 = /[\s!-/:-@[-`{-~年月日]+/;
                var knownFormats2 = {};
                var parseFns2 = {
                  y: function y3(date, year) {
                    return new Date(date).setFullYear(parseInt(year, 10));
                  },
                  m: function m3(date, month, locale) {
                    var newDate = new Date(date);
                    var monthIndex = parseInt(month, 10) - 1;
                    if (isNaN(monthIndex)) {
                      if (!month) {
                        return NaN;
                      }
                      var monthName = month.toLowerCase();
                      var compareNames = function compareNames2(name) {
                        return name.toLowerCase().startsWith(monthName);
                      };
                      monthIndex = locale.monthsShort.findIndex(compareNames);
                      if (monthIndex < 0) {
                        monthIndex = locale.months.findIndex(compareNames);
                      }
                      if (monthIndex < 0) {
                        return NaN;
                      }
                    }
                    newDate.setMonth(monthIndex);
                    return newDate.getMonth() !== normalizeMonth2(monthIndex) ? newDate.setDate(0) : newDate.getTime();
                  },
                  d: function d3(date, day) {
                    return new Date(date).setDate(parseInt(day, 10));
                  }
                };
                var formatFns2 = {
                  d: function d3(date) {
                    return date.getDate();
                  },
                  dd: function dd2(date) {
                    return padZero2(date.getDate(), 2);
                  },
                  D: function D2(date, locale) {
                    return locale.daysShort[date.getDay()];
                  },
                  DD: function DD2(date, locale) {
                    return locale.days[date.getDay()];
                  },
                  m: function m3(date) {
                    return date.getMonth() + 1;
                  },
                  mm: function mm2(date) {
                    return padZero2(date.getMonth() + 1, 2);
                  },
                  M: function M3(date, locale) {
                    return locale.monthsShort[date.getMonth()];
                  },
                  MM: function MM2(date, locale) {
                    return locale.months[date.getMonth()];
                  },
                  y: function y3(date) {
                    return date.getFullYear();
                  },
                  yy: function yy2(date) {
                    return padZero2(date.getFullYear(), 2).slice(-2);
                  },
                  yyyy: function yyyy2(date) {
                    return padZero2(date.getFullYear(), 4);
                  }
                };
                function normalizeMonth2(monthIndex) {
                  return monthIndex > -1 ? monthIndex % 12 : normalizeMonth2(monthIndex + 12);
                }
                function padZero2(num, length) {
                  return num.toString().padStart(length, "0");
                }
                function parseFormatString2(format) {
                  if (typeof format !== "string") {
                    throw new Error("Invalid date format.");
                  }
                  if (format in knownFormats2) {
                    return knownFormats2[format];
                  }
                  var separators = format.split(reFormatTokens2);
                  var parts = format.match(new RegExp(reFormatTokens2, "g"));
                  if (separators.length === 0 || !parts) {
                    throw new Error("Invalid date format.");
                  }
                  var partFormatters = parts.map(function(token) {
                    return formatFns2[token];
                  });
                  var partParserKeys = Object.keys(parseFns2).reduce(function(keys, key) {
                    var token = parts.find(function(part) {
                      return part[0] !== "D" && part[0].toLowerCase() === key;
                    });
                    if (token) {
                      keys.push(key);
                    }
                    return keys;
                  }, []);
                  return knownFormats2[format] = {
                    parser: function parser(dateStr, locale) {
                      var dateParts = dateStr.split(reNonDateParts2).reduce(function(dtParts, part, index) {
                        if (part.length > 0 && parts[index]) {
                          var token = parts[index][0];
                          if (token === "M") {
                            dtParts.m = part;
                          } else if (token !== "D") {
                            dtParts[token] = part;
                          }
                        }
                        return dtParts;
                      }, {});
                      return partParserKeys.reduce(function(origDate, key) {
                        var newDate = parseFns2[key](origDate, dateParts[key], locale);
                        return isNaN(newDate) ? origDate : newDate;
                      }, today2());
                    },
                    formatter: function formatter(date, locale) {
                      var dateStr = partFormatters.reduce(function(str, fn3, index) {
                        return str += "".concat(separators[index]).concat(fn3(date, locale));
                      }, "");
                      return dateStr += lastItemOf2(separators);
                    }
                  };
                }
                function parseDate2(dateStr, format, locale) {
                  if (dateStr instanceof Date || typeof dateStr === "number") {
                    var date = stripTime2(dateStr);
                    return isNaN(date) ? void 0 : date;
                  }
                  if (!dateStr) {
                    return void 0;
                  }
                  if (dateStr === "today") {
                    return today2();
                  }
                  if (format && format.toValue) {
                    var _date = format.toValue(dateStr, format, locale);
                    return isNaN(_date) ? void 0 : stripTime2(_date);
                  }
                  return parseFormatString2(format).parser(dateStr, locale);
                }
                function formatDate2(date, format, locale) {
                  if (isNaN(date) || !date && date !== 0) {
                    return "";
                  }
                  var dateObj = typeof date === "number" ? new Date(date) : date;
                  if (format.toDisplay) {
                    return format.toDisplay(dateObj, format, locale);
                  }
                  return parseFormatString2(format).formatter(dateObj, locale);
                }
                var listenerRegistry2 = /* @__PURE__ */ new WeakMap();
                var _EventTarget$prototyp2 = EventTarget.prototype, addEventListener2 = _EventTarget$prototyp2.addEventListener, removeEventListener2 = _EventTarget$prototyp2.removeEventListener;
                function registerListeners2(keyObj, listeners) {
                  var registered = listenerRegistry2.get(keyObj);
                  if (!registered) {
                    registered = [];
                    listenerRegistry2.set(keyObj, registered);
                  }
                  listeners.forEach(function(listener) {
                    addEventListener2.call.apply(addEventListener2, _toConsumableArray2(listener));
                    registered.push(listener);
                  });
                }
                function unregisterListeners2(keyObj) {
                  var listeners = listenerRegistry2.get(keyObj);
                  if (!listeners) {
                    return;
                  }
                  listeners.forEach(function(listener) {
                    removeEventListener2.call.apply(removeEventListener2, _toConsumableArray2(listener));
                  });
                  listenerRegistry2["delete"](keyObj);
                }
                if (!Event.prototype.composedPath) {
                  var getComposedPath = function getComposedPath2(node) {
                    var path = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
                    path.push(node);
                    var parent;
                    if (node.parentNode) {
                      parent = node.parentNode;
                    } else if (node.host) {
                      parent = node.host;
                    } else if (node.defaultView) {
                      parent = node.defaultView;
                    }
                    return parent ? getComposedPath2(parent, path) : path;
                  };
                  Event.prototype.composedPath = function() {
                    return getComposedPath(this.target);
                  };
                }
                function findFromPath2(path, criteria, currentTarget) {
                  var index = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
                  var el = path[index];
                  if (criteria(el)) {
                    return el;
                  } else if (el === currentTarget || !el.parentElement) {
                    return;
                  }
                  return findFromPath2(path, criteria, currentTarget, index + 1);
                }
                function findElementInEventPath2(ev, selector) {
                  var criteria = typeof selector === "function" ? selector : function(el) {
                    return el.matches(selector);
                  };
                  return findFromPath2(ev.composedPath(), criteria, ev.currentTarget);
                }
                var locales2 = {
                  en: {
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    today: "Today",
                    clear: "Clear",
                    titleFormat: "MM y"
                  }
                };
                var defaultOptions2 = {
                  autohide: false,
                  beforeShowDay: null,
                  beforeShowDecade: null,
                  beforeShowMonth: null,
                  beforeShowYear: null,
                  calendarWeeks: false,
                  clearBtn: false,
                  dateDelimiter: ",",
                  datesDisabled: [],
                  daysOfWeekDisabled: [],
                  daysOfWeekHighlighted: [],
                  defaultViewDate: void 0,
                  // placeholder, defaults to today() by the program
                  disableTouchKeyboard: false,
                  format: "mm/dd/yyyy",
                  language: "en",
                  maxDate: null,
                  maxNumberOfDates: 1,
                  maxView: 3,
                  minDate: null,
                  nextArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>',
                  orientation: "auto",
                  pickLevel: 0,
                  prevArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>',
                  showDaysOfWeek: true,
                  showOnClick: true,
                  showOnFocus: true,
                  startView: 0,
                  title: "",
                  todayBtn: false,
                  todayBtnMode: 0,
                  todayHighlight: false,
                  updateOnBlur: true,
                  weekStart: 0
                };
                var range2 = null;
                function parseHTML2(html) {
                  if (range2 == null) {
                    range2 = document.createRange();
                  }
                  return range2.createContextualFragment(html);
                }
                function hideElement2(el) {
                  if (el.style.display === "none") {
                    return;
                  }
                  if (el.style.display) {
                    el.dataset.styleDisplay = el.style.display;
                  }
                  el.style.display = "none";
                }
                function showElement2(el) {
                  if (el.style.display !== "none") {
                    return;
                  }
                  if (el.dataset.styleDisplay) {
                    el.style.display = el.dataset.styleDisplay;
                    delete el.dataset.styleDisplay;
                  } else {
                    el.style.display = "";
                  }
                }
                function emptyChildNodes2(el) {
                  if (el.firstChild) {
                    el.removeChild(el.firstChild);
                    emptyChildNodes2(el);
                  }
                }
                function replaceChildNodes2(el, newChildNodes) {
                  emptyChildNodes2(el);
                  if (newChildNodes instanceof DocumentFragment) {
                    el.appendChild(newChildNodes);
                  } else if (typeof newChildNodes === "string") {
                    el.appendChild(parseHTML2(newChildNodes));
                  } else if (typeof newChildNodes.forEach === "function") {
                    newChildNodes.forEach(function(node) {
                      el.appendChild(node);
                    });
                  }
                }
                var defaultLang2 = defaultOptions2.language, defaultFormat2 = defaultOptions2.format, defaultWeekStart2 = defaultOptions2.weekStart;
                function sanitizeDOW2(dow, day) {
                  return dow.length < 6 && day >= 0 && day < 7 ? pushUnique2(dow, day) : dow;
                }
                function calcEndOfWeek2(startOfWeek) {
                  return (startOfWeek + 6) % 7;
                }
                function validateDate2(value, format, locale, origValue) {
                  var date = parseDate2(value, format, locale);
                  return date !== void 0 ? date : origValue;
                }
                function validateViewId2(value, origValue) {
                  var max2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 3;
                  var viewId = parseInt(value, 10);
                  return viewId >= 0 && viewId <= max2 ? viewId : origValue;
                }
                function processOptions2(options, datepicker) {
                  var inOpts = Object.assign({}, options);
                  var config = {};
                  var locales3 = datepicker.constructor.locales;
                  var _ref = datepicker.config || {}, format = _ref.format, language = _ref.language, locale = _ref.locale, maxDate = _ref.maxDate, maxView = _ref.maxView, minDate = _ref.minDate, pickLevel = _ref.pickLevel, startView = _ref.startView, weekStart = _ref.weekStart;
                  if (inOpts.language) {
                    var lang;
                    if (inOpts.language !== language) {
                      if (locales3[inOpts.language]) {
                        lang = inOpts.language;
                      } else {
                        lang = inOpts.language.split("-")[0];
                        if (locales3[lang] === void 0) {
                          lang = false;
                        }
                      }
                    }
                    delete inOpts.language;
                    if (lang) {
                      language = config.language = lang;
                      var origLocale = locale || locales3[defaultLang2];
                      locale = Object.assign({
                        format: defaultFormat2,
                        weekStart: defaultWeekStart2
                      }, locales3[defaultLang2]);
                      if (language !== defaultLang2) {
                        Object.assign(locale, locales3[language]);
                      }
                      config.locale = locale;
                      if (format === origLocale.format) {
                        format = config.format = locale.format;
                      }
                      if (weekStart === origLocale.weekStart) {
                        weekStart = config.weekStart = locale.weekStart;
                        config.weekEnd = calcEndOfWeek2(locale.weekStart);
                      }
                    }
                  }
                  if (inOpts.format) {
                    var hasToDisplay = typeof inOpts.format.toDisplay === "function";
                    var hasToValue = typeof inOpts.format.toValue === "function";
                    var validFormatString = reFormatTokens2.test(inOpts.format);
                    if (hasToDisplay && hasToValue || validFormatString) {
                      format = config.format = inOpts.format;
                    }
                    delete inOpts.format;
                  }
                  var minDt = minDate;
                  var maxDt = maxDate;
                  if (inOpts.minDate !== void 0) {
                    minDt = inOpts.minDate === null ? dateValue2(0, 0, 1) : validateDate2(inOpts.minDate, format, locale, minDt);
                    delete inOpts.minDate;
                  }
                  if (inOpts.maxDate !== void 0) {
                    maxDt = inOpts.maxDate === null ? void 0 : validateDate2(inOpts.maxDate, format, locale, maxDt);
                    delete inOpts.maxDate;
                  }
                  if (maxDt < minDt) {
                    minDate = config.minDate = maxDt;
                    maxDate = config.maxDate = minDt;
                  } else {
                    if (minDate !== minDt) {
                      minDate = config.minDate = minDt;
                    }
                    if (maxDate !== maxDt) {
                      maxDate = config.maxDate = maxDt;
                    }
                  }
                  if (inOpts.datesDisabled) {
                    config.datesDisabled = inOpts.datesDisabled.reduce(function(dates, dt2) {
                      var date = parseDate2(dt2, format, locale);
                      return date !== void 0 ? pushUnique2(dates, date) : dates;
                    }, []);
                    delete inOpts.datesDisabled;
                  }
                  if (inOpts.defaultViewDate !== void 0) {
                    var viewDate = parseDate2(inOpts.defaultViewDate, format, locale);
                    if (viewDate !== void 0) {
                      config.defaultViewDate = viewDate;
                    }
                    delete inOpts.defaultViewDate;
                  }
                  if (inOpts.weekStart !== void 0) {
                    var wkStart = Number(inOpts.weekStart) % 7;
                    if (!isNaN(wkStart)) {
                      weekStart = config.weekStart = wkStart;
                      config.weekEnd = calcEndOfWeek2(wkStart);
                    }
                    delete inOpts.weekStart;
                  }
                  if (inOpts.daysOfWeekDisabled) {
                    config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW2, []);
                    delete inOpts.daysOfWeekDisabled;
                  }
                  if (inOpts.daysOfWeekHighlighted) {
                    config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW2, []);
                    delete inOpts.daysOfWeekHighlighted;
                  }
                  if (inOpts.maxNumberOfDates !== void 0) {
                    var maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);
                    if (maxNumberOfDates >= 0) {
                      config.maxNumberOfDates = maxNumberOfDates;
                      config.multidate = maxNumberOfDates !== 1;
                    }
                    delete inOpts.maxNumberOfDates;
                  }
                  if (inOpts.dateDelimiter) {
                    config.dateDelimiter = String(inOpts.dateDelimiter);
                    delete inOpts.dateDelimiter;
                  }
                  var newPickLevel = pickLevel;
                  if (inOpts.pickLevel !== void 0) {
                    newPickLevel = validateViewId2(inOpts.pickLevel, 2);
                    delete inOpts.pickLevel;
                  }
                  if (newPickLevel !== pickLevel) {
                    pickLevel = config.pickLevel = newPickLevel;
                  }
                  var newMaxView = maxView;
                  if (inOpts.maxView !== void 0) {
                    newMaxView = validateViewId2(inOpts.maxView, maxView);
                    delete inOpts.maxView;
                  }
                  newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;
                  if (newMaxView !== maxView) {
                    maxView = config.maxView = newMaxView;
                  }
                  var newStartView = startView;
                  if (inOpts.startView !== void 0) {
                    newStartView = validateViewId2(inOpts.startView, newStartView);
                    delete inOpts.startView;
                  }
                  if (newStartView < pickLevel) {
                    newStartView = pickLevel;
                  } else if (newStartView > maxView) {
                    newStartView = maxView;
                  }
                  if (newStartView !== startView) {
                    config.startView = newStartView;
                  }
                  if (inOpts.prevArrow) {
                    var prevArrow = parseHTML2(inOpts.prevArrow);
                    if (prevArrow.childNodes.length > 0) {
                      config.prevArrow = prevArrow.childNodes;
                    }
                    delete inOpts.prevArrow;
                  }
                  if (inOpts.nextArrow) {
                    var nextArrow = parseHTML2(inOpts.nextArrow);
                    if (nextArrow.childNodes.length > 0) {
                      config.nextArrow = nextArrow.childNodes;
                    }
                    delete inOpts.nextArrow;
                  }
                  if (inOpts.disableTouchKeyboard !== void 0) {
                    config.disableTouchKeyboard = "ontouchstart" in document && !!inOpts.disableTouchKeyboard;
                    delete inOpts.disableTouchKeyboard;
                  }
                  if (inOpts.orientation) {
                    var orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
                    config.orientation = {
                      x: orientation.find(function(x2) {
                        return x2 === "left" || x2 === "right";
                      }) || "auto",
                      y: orientation.find(function(y3) {
                        return y3 === "top" || y3 === "bottom";
                      }) || "auto"
                    };
                    delete inOpts.orientation;
                  }
                  if (inOpts.todayBtnMode !== void 0) {
                    switch (inOpts.todayBtnMode) {
                      case 0:
                      case 1:
                        config.todayBtnMode = inOpts.todayBtnMode;
                    }
                    delete inOpts.todayBtnMode;
                  }
                  Object.keys(inOpts).forEach(function(key) {
                    if (inOpts[key] !== void 0 && hasProperty2(defaultOptions2, key)) {
                      config[key] = inOpts[key];
                    }
                  });
                  return config;
                }
                var pickerTemplate2 = optimizeTemplateHTML2('<div class="datepicker hidden">\n  <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">\n    <div class="datepicker-header">\n      <div class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"></div>\n      <div class="datepicker-controls flex justify-between mb-2">\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>\n        <button type="button" class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>\n      </div>\n    </div>\n    <div class="datepicker-main p-1"></div>\n    <div class="datepicker-footer">\n      <div class="datepicker-controls flex space-x-2 rtl:space-x-reverse mt-2">\n        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 !bg-primary-700 dark:bg-blue-600 dark:!bg-primary-600 hover:bg-blue-800 hover:!bg-primary-800 dark:hover:bg-blue-700 dark:hover:!bg-primary-700 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n        <button type="button" class="%buttonClass% clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n      </div>\n    </div>\n  </div>\n</div>');
                var daysTemplate2 = optimizeTemplateHTML2('<div class="days">\n  <div class="days-of-week grid grid-cols-7 mb-1">'.concat(createTagRepeat2("span", 7, {
                  "class": "dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"
                }), '</div>\n  <div class="datepicker-grid w-64 grid grid-cols-7">').concat(createTagRepeat2("span", 42, {
                  "class": "block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"
                }), "</div>\n</div>"));
                var calendarWeeksTemplate2 = optimizeTemplateHTML2('<div class="calendar-weeks">\n  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"></span></div>\n  <div class="weeks">'.concat(createTagRepeat2("span", 6, {
                  "class": "week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"
                }), "</div>\n</div>"));
                var View2 = /* @__PURE__ */ (function() {
                  function View3(picker, config) {
                    _classCallCheck2(this, View3);
                    Object.assign(this, config, {
                      picker,
                      element: parseHTML2('<div class="datepicker-view flex"></div>').firstChild,
                      selected: []
                    });
                    this.init(this.picker.datepicker.config);
                  }
                  return _createClass2(View3, [{
                    key: "init",
                    value: function init(options) {
                      if (options.pickLevel !== void 0) {
                        this.isMinView = this.id === options.pickLevel;
                      }
                      this.setOptions(options);
                      this.updateFocus();
                      this.updateSelection();
                    }
                    // Execute beforeShow() callback and apply the result to the element
                    // args:
                    // - current - current value on the iteration on view rendering
                    // - timeValue - time value of the date to pass to beforeShow()
                  }, {
                    key: "performBeforeHook",
                    value: function performBeforeHook(el, current, timeValue) {
                      var result = this.beforeShow(new Date(timeValue));
                      switch (_typeof2(result)) {
                        case "boolean":
                          result = {
                            enabled: result
                          };
                          break;
                        case "string":
                          result = {
                            classes: result
                          };
                      }
                      if (result) {
                        if (result.enabled === false) {
                          el.classList.add("disabled");
                          pushUnique2(this.disabled, current);
                        }
                        if (result.classes) {
                          var _el$classList;
                          var extraClasses = result.classes.split(/\s+/);
                          (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray2(extraClasses));
                          if (extraClasses.includes("disabled")) {
                            pushUnique2(this.disabled, current);
                          }
                        }
                        if (result.content) {
                          replaceChildNodes2(el, result.content);
                        }
                      }
                    }
                  }]);
                })();
                var DaysView2 = /* @__PURE__ */ (function(_View) {
                  function DaysView3(picker) {
                    _classCallCheck2(this, DaysView3);
                    return _callSuper2(this, DaysView3, [picker, {
                      id: 0,
                      name: "days",
                      cellClass: "day"
                    }]);
                  }
                  _inherits2(DaysView3, _View);
                  return _createClass2(DaysView3, [{
                    key: "init",
                    value: function init(options) {
                      var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
                      if (onConstruction) {
                        var inner = parseHTML2(daysTemplate2).firstChild;
                        this.dow = inner.firstChild;
                        this.grid = inner.lastChild;
                        this.element.appendChild(inner);
                      }
                      _get2(_getPrototypeOf2(DaysView3.prototype), "init", this).call(this, options);
                    }
                  }, {
                    key: "setOptions",
                    value: function setOptions(options) {
                      var _this = this;
                      var updateDOW;
                      if (hasProperty2(options, "minDate")) {
                        this.minDate = options.minDate;
                      }
                      if (hasProperty2(options, "maxDate")) {
                        this.maxDate = options.maxDate;
                      }
                      if (options.datesDisabled) {
                        this.datesDisabled = options.datesDisabled;
                      }
                      if (options.daysOfWeekDisabled) {
                        this.daysOfWeekDisabled = options.daysOfWeekDisabled;
                        updateDOW = true;
                      }
                      if (options.daysOfWeekHighlighted) {
                        this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
                      }
                      if (options.todayHighlight !== void 0) {
                        this.todayHighlight = options.todayHighlight;
                      }
                      if (options.weekStart !== void 0) {
                        this.weekStart = options.weekStart;
                        this.weekEnd = options.weekEnd;
                        updateDOW = true;
                      }
                      if (options.locale) {
                        var locale = this.locale = options.locale;
                        this.dayNames = locale.daysMin;
                        this.switchLabelFormat = locale.titleFormat;
                        updateDOW = true;
                      }
                      if (options.beforeShowDay !== void 0) {
                        this.beforeShow = typeof options.beforeShowDay === "function" ? options.beforeShowDay : void 0;
                      }
                      if (options.calendarWeeks !== void 0) {
                        if (options.calendarWeeks && !this.calendarWeeks) {
                          var weeksElem = parseHTML2(calendarWeeksTemplate2).firstChild;
                          this.calendarWeeks = {
                            element: weeksElem,
                            dow: weeksElem.firstChild,
                            weeks: weeksElem.lastChild
                          };
                          this.element.insertBefore(weeksElem, this.element.firstChild);
                        } else if (this.calendarWeeks && !options.calendarWeeks) {
                          this.element.removeChild(this.calendarWeeks.element);
                          this.calendarWeeks = null;
                        }
                      }
                      if (options.showDaysOfWeek !== void 0) {
                        if (options.showDaysOfWeek) {
                          showElement2(this.dow);
                          if (this.calendarWeeks) {
                            showElement2(this.calendarWeeks.dow);
                          }
                        } else {
                          hideElement2(this.dow);
                          if (this.calendarWeeks) {
                            hideElement2(this.calendarWeeks.dow);
                          }
                        }
                      }
                      if (updateDOW) {
                        Array.from(this.dow.children).forEach(function(el, index) {
                          var dow = (_this.weekStart + index) % 7;
                          el.textContent = _this.dayNames[dow];
                          el.className = _this.daysOfWeekDisabled.includes(dow) ? "dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed" : "dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400";
                        });
                      }
                    }
                    // Apply update on the focused date to view's settings
                  }, {
                    key: "updateFocus",
                    value: function updateFocus() {
                      var viewDate = new Date(this.picker.viewDate);
                      var viewYear = viewDate.getFullYear();
                      var viewMonth = viewDate.getMonth();
                      var firstOfMonth = dateValue2(viewYear, viewMonth, 1);
                      var start2 = dayOfTheWeekOf2(firstOfMonth, this.weekStart, this.weekStart);
                      this.first = firstOfMonth;
                      this.last = dateValue2(viewYear, viewMonth + 1, 0);
                      this.start = start2;
                      this.focused = this.picker.viewDate;
                    }
                    // Apply update on the selected dates to view's settings
                  }, {
                    key: "updateSelection",
                    value: function updateSelection() {
                      var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
                      this.selected = dates;
                      if (rangepicker) {
                        this.range = rangepicker.dates;
                      }
                    }
                    // Update the entire view UI
                  }, {
                    key: "render",
                    value: function render() {
                      var _this2 = this;
                      this.today = this.todayHighlight ? today2() : void 0;
                      this.disabled = _toConsumableArray2(this.datesDisabled);
                      var switchLabel = formatDate2(this.focused, this.switchLabelFormat, this.locale);
                      this.picker.setViewSwitchLabel(switchLabel);
                      this.picker.setPrevBtnDisabled(this.first <= this.minDate);
                      this.picker.setNextBtnDisabled(this.last >= this.maxDate);
                      if (this.calendarWeeks) {
                        var startOfWeek = dayOfTheWeekOf2(this.first, 1, 1);
                        Array.from(this.calendarWeeks.weeks.children).forEach(function(el, index) {
                          el.textContent = getWeek2(addWeeks2(startOfWeek, index));
                        });
                      }
                      Array.from(this.grid.children).forEach(function(el, index) {
                        var classList = el.classList;
                        var current = addDays2(_this2.start, index);
                        var date = new Date(current);
                        var day = date.getDay();
                        el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this2.cellClass);
                        el.dataset.date = current;
                        el.textContent = date.getDate();
                        if (current < _this2.first) {
                          classList.add("prev", "text-gray-500", "dark:text-white");
                        } else if (current > _this2.last) {
                          classList.add("next", "text-gray-500", "dark:text-white");
                        }
                        if (_this2.today === current) {
                          classList.add("today", "bg-gray-100", "dark:bg-gray-600");
                        }
                        if (current < _this2.minDate || current > _this2.maxDate || _this2.disabled.includes(current)) {
                          classList.add("disabled", "cursor-not-allowed", "text-gray-400", "dark:text-gray-500");
                          classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-600", "text-gray-900", "dark:text-white", "cursor-pointer");
                        }
                        if (_this2.daysOfWeekDisabled.includes(day)) {
                          classList.add("disabled", "cursor-not-allowed", "text-gray-400", "dark:text-gray-500");
                          classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-600", "text-gray-900", "dark:text-white", "cursor-pointer");
                          pushUnique2(_this2.disabled, current);
                        }
                        if (_this2.daysOfWeekHighlighted.includes(day)) {
                          classList.add("highlighted");
                        }
                        if (_this2.range) {
                          var _this2$range = _slicedToArray2(_this2.range, 2), rangeStart = _this2$range[0], rangeEnd = _this2$range[1];
                          if (current > rangeStart && current < rangeEnd) {
                            classList.add("range", "bg-gray-200", "dark:bg-gray-600");
                            classList.remove("rounded-lg", "rounded-l-lg", "rounded-r-lg");
                          }
                          if (current === rangeStart) {
                            classList.add("range-start", "bg-gray-100", "dark:bg-gray-600", "rounded-l-lg");
                            classList.remove("rounded-lg", "rounded-r-lg");
                          }
                          if (current === rangeEnd) {
                            classList.add("range-end", "bg-gray-100", "dark:bg-gray-600", "rounded-r-lg");
                            classList.remove("rounded-lg", "rounded-l-lg");
                          }
                        }
                        if (_this2.selected.includes(current)) {
                          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
                          classList.remove("text-gray-900", "text-gray-500", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "dark:bg-gray-600", "bg-gray-100", "bg-gray-200");
                        }
                        if (current === _this2.focused) {
                          classList.add("focused");
                        }
                        if (_this2.beforeShow) {
                          _this2.performBeforeHook(el, current, current);
                        }
                      });
                    }
                    // Update the view UI by applying the changes of selected and focused items
                  }, {
                    key: "refresh",
                    value: function refresh() {
                      var _this3 = this;
                      var _ref = this.range || [], _ref2 = _slicedToArray2(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
                      this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
                        el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white", "focused");
                        el.classList.add("text-gray-900", "rounded-lg", "dark:text-white");
                      });
                      Array.from(this.grid.children).forEach(function(el) {
                        var current = Number(el.dataset.date);
                        var classList = el.classList;
                        classList.remove("bg-gray-200", "dark:bg-gray-600", "rounded-l-lg", "rounded-r-lg");
                        if (current > rangeStart && current < rangeEnd) {
                          classList.add("range", "bg-gray-200", "dark:bg-gray-600");
                          classList.remove("rounded-lg");
                        }
                        if (current === rangeStart) {
                          classList.add("range-start", "bg-gray-200", "dark:bg-gray-600", "rounded-l-lg");
                          classList.remove("rounded-lg");
                        }
                        if (current === rangeEnd) {
                          classList.add("range-end", "bg-gray-200", "dark:bg-gray-600", "rounded-r-lg");
                          classList.remove("rounded-lg");
                        }
                        if (_this3.selected.includes(current)) {
                          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
                          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "bg-gray-100", "bg-gray-200", "dark:bg-gray-600");
                        }
                        if (current === _this3.focused) {
                          classList.add("focused");
                        }
                      });
                    }
                    // Update the view UI by applying the change of focused item
                  }, {
                    key: "refreshFocus",
                    value: function refreshFocus() {
                      var index = Math.round((this.focused - this.start) / 864e5);
                      this.grid.querySelectorAll(".focused").forEach(function(el) {
                        el.classList.remove("focused");
                      });
                      this.grid.children[index].classList.add("focused");
                    }
                  }]);
                })(View2);
                function computeMonthRange2(range3, thisYear) {
                  if (!range3 || !range3[0] || !range3[1]) {
                    return;
                  }
                  var _range = _slicedToArray2(range3, 2), _range$ = _slicedToArray2(_range[0], 2), startY = _range$[0], startM = _range$[1], _range$2 = _slicedToArray2(_range[1], 2), endY = _range$2[0], endM = _range$2[1];
                  if (startY > thisYear || endY < thisYear) {
                    return;
                  }
                  return [startY === thisYear ? startM : -1, endY === thisYear ? endM : 12];
                }
                var MonthsView2 = /* @__PURE__ */ (function(_View) {
                  function MonthsView3(picker) {
                    _classCallCheck2(this, MonthsView3);
                    return _callSuper2(this, MonthsView3, [picker, {
                      id: 1,
                      name: "months",
                      cellClass: "month"
                    }]);
                  }
                  _inherits2(MonthsView3, _View);
                  return _createClass2(MonthsView3, [{
                    key: "init",
                    value: function init(options) {
                      var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
                      if (onConstruction) {
                        this.grid = this.element;
                        this.element.classList.add("months", "datepicker-grid", "w-64", "grid", "grid-cols-4");
                        this.grid.appendChild(parseHTML2(createTagRepeat2("span", 12, {
                          "data-month": function dataMonth(ix) {
                            return ix;
                          }
                        })));
                      }
                      _get2(_getPrototypeOf2(MonthsView3.prototype), "init", this).call(this, options);
                    }
                  }, {
                    key: "setOptions",
                    value: function setOptions(options) {
                      if (options.locale) {
                        this.monthNames = options.locale.monthsShort;
                      }
                      if (hasProperty2(options, "minDate")) {
                        if (options.minDate === void 0) {
                          this.minYear = this.minMonth = this.minDate = void 0;
                        } else {
                          var minDateObj = new Date(options.minDate);
                          this.minYear = minDateObj.getFullYear();
                          this.minMonth = minDateObj.getMonth();
                          this.minDate = minDateObj.setDate(1);
                        }
                      }
                      if (hasProperty2(options, "maxDate")) {
                        if (options.maxDate === void 0) {
                          this.maxYear = this.maxMonth = this.maxDate = void 0;
                        } else {
                          var maxDateObj = new Date(options.maxDate);
                          this.maxYear = maxDateObj.getFullYear();
                          this.maxMonth = maxDateObj.getMonth();
                          this.maxDate = dateValue2(this.maxYear, this.maxMonth + 1, 0);
                        }
                      }
                      if (options.beforeShowMonth !== void 0) {
                        this.beforeShow = typeof options.beforeShowMonth === "function" ? options.beforeShowMonth : void 0;
                      }
                    }
                    // Update view's settings to reflect the viewDate set on the picker
                  }, {
                    key: "updateFocus",
                    value: function updateFocus() {
                      var viewDate = new Date(this.picker.viewDate);
                      this.year = viewDate.getFullYear();
                      this.focused = viewDate.getMonth();
                    }
                    // Update view's settings to reflect the selected dates
                  }, {
                    key: "updateSelection",
                    value: function updateSelection() {
                      var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
                      this.selected = dates.reduce(function(selected, timeValue) {
                        var date = new Date(timeValue);
                        var year = date.getFullYear();
                        var month = date.getMonth();
                        if (selected[year] === void 0) {
                          selected[year] = [month];
                        } else {
                          pushUnique2(selected[year], month);
                        }
                        return selected;
                      }, {});
                      if (rangepicker && rangepicker.dates) {
                        this.range = rangepicker.dates.map(function(timeValue) {
                          var date = new Date(timeValue);
                          return isNaN(date) ? void 0 : [date.getFullYear(), date.getMonth()];
                        });
                      }
                    }
                    // Update the entire view UI
                  }, {
                    key: "render",
                    value: function render() {
                      var _this = this;
                      this.disabled = [];
                      this.picker.setViewSwitchLabel(this.year);
                      this.picker.setPrevBtnDisabled(this.year <= this.minYear);
                      this.picker.setNextBtnDisabled(this.year >= this.maxYear);
                      var selected = this.selected[this.year] || [];
                      var yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
                      var isMinYear = this.year === this.minYear;
                      var isMaxYear = this.year === this.maxYear;
                      var range3 = computeMonthRange2(this.range, this.year);
                      Array.from(this.grid.children).forEach(function(el, index) {
                        var classList = el.classList;
                        var date = dateValue2(_this.year, index, 1);
                        el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this.cellClass);
                        if (_this.isMinView) {
                          el.dataset.date = date;
                        }
                        el.textContent = _this.monthNames[index];
                        if (yrOutOfRange || isMinYear && index < _this.minMonth || isMaxYear && index > _this.maxMonth) {
                          classList.add("disabled");
                        }
                        if (range3) {
                          var _range2 = _slicedToArray2(range3, 2), rangeStart = _range2[0], rangeEnd = _range2[1];
                          if (index > rangeStart && index < rangeEnd) {
                            classList.add("range");
                          }
                          if (index === rangeStart) {
                            classList.add("range-start");
                          }
                          if (index === rangeEnd) {
                            classList.add("range-end");
                          }
                        }
                        if (selected.includes(index)) {
                          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
                          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
                        }
                        if (index === _this.focused) {
                          classList.add("focused");
                        }
                        if (_this.beforeShow) {
                          _this.performBeforeHook(el, index, date);
                        }
                      });
                    }
                    // Update the view UI by applying the changes of selected and focused items
                  }, {
                    key: "refresh",
                    value: function refresh() {
                      var _this2 = this;
                      var selected = this.selected[this.year] || [];
                      var _ref = computeMonthRange2(this.range, this.year) || [], _ref2 = _slicedToArray2(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
                      this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
                        el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "dark:bg-blue-600", "dark:!bg-primary-700", "dark:text-white", "text-white", "focused");
                        el.classList.add("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
                      });
                      Array.from(this.grid.children).forEach(function(el, index) {
                        var classList = el.classList;
                        if (index > rangeStart && index < rangeEnd) {
                          classList.add("range");
                        }
                        if (index === rangeStart) {
                          classList.add("range-start");
                        }
                        if (index === rangeEnd) {
                          classList.add("range-end");
                        }
                        if (selected.includes(index)) {
                          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
                          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
                        }
                        if (index === _this2.focused) {
                          classList.add("focused");
                        }
                      });
                    }
                    // Update the view UI by applying the change of focused item
                  }, {
                    key: "refreshFocus",
                    value: function refreshFocus() {
                      this.grid.querySelectorAll(".focused").forEach(function(el) {
                        el.classList.remove("focused");
                      });
                      this.grid.children[this.focused].classList.add("focused");
                    }
                  }]);
                })(View2);
                function toTitleCase2(word) {
                  return _toConsumableArray2(word).reduce(function(str, ch, ix) {
                    return str += ix ? ch : ch.toUpperCase();
                  }, "");
                }
                var YearsView2 = /* @__PURE__ */ (function(_View) {
                  function YearsView3(picker, config) {
                    _classCallCheck2(this, YearsView3);
                    return _callSuper2(this, YearsView3, [picker, config]);
                  }
                  _inherits2(YearsView3, _View);
                  return _createClass2(YearsView3, [{
                    key: "init",
                    value: function init(options) {
                      var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
                      if (onConstruction) {
                        this.navStep = this.step * 10;
                        this.beforeShowOption = "beforeShow".concat(toTitleCase2(this.cellClass));
                        this.grid = this.element;
                        this.element.classList.add(this.name, "datepicker-grid", "w-64", "grid", "grid-cols-4");
                        this.grid.appendChild(parseHTML2(createTagRepeat2("span", 12)));
                      }
                      _get2(_getPrototypeOf2(YearsView3.prototype), "init", this).call(this, options);
                    }
                  }, {
                    key: "setOptions",
                    value: function setOptions(options) {
                      if (hasProperty2(options, "minDate")) {
                        if (options.minDate === void 0) {
                          this.minYear = this.minDate = void 0;
                        } else {
                          this.minYear = startOfYearPeriod2(options.minDate, this.step);
                          this.minDate = dateValue2(this.minYear, 0, 1);
                        }
                      }
                      if (hasProperty2(options, "maxDate")) {
                        if (options.maxDate === void 0) {
                          this.maxYear = this.maxDate = void 0;
                        } else {
                          this.maxYear = startOfYearPeriod2(options.maxDate, this.step);
                          this.maxDate = dateValue2(this.maxYear, 11, 31);
                        }
                      }
                      if (options[this.beforeShowOption] !== void 0) {
                        var beforeShow = options[this.beforeShowOption];
                        this.beforeShow = typeof beforeShow === "function" ? beforeShow : void 0;
                      }
                    }
                    // Update view's settings to reflect the viewDate set on the picker
                  }, {
                    key: "updateFocus",
                    value: function updateFocus() {
                      var viewDate = new Date(this.picker.viewDate);
                      var first = startOfYearPeriod2(viewDate, this.navStep);
                      var last = first + 9 * this.step;
                      this.first = first;
                      this.last = last;
                      this.start = first - this.step;
                      this.focused = startOfYearPeriod2(viewDate, this.step);
                    }
                    // Update view's settings to reflect the selected dates
                  }, {
                    key: "updateSelection",
                    value: function updateSelection() {
                      var _this = this;
                      var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
                      this.selected = dates.reduce(function(years, timeValue) {
                        return pushUnique2(years, startOfYearPeriod2(timeValue, _this.step));
                      }, []);
                      if (rangepicker && rangepicker.dates) {
                        this.range = rangepicker.dates.map(function(timeValue) {
                          if (timeValue !== void 0) {
                            return startOfYearPeriod2(timeValue, _this.step);
                          }
                        });
                      }
                    }
                    // Update the entire view UI
                  }, {
                    key: "render",
                    value: function render() {
                      var _this2 = this;
                      this.disabled = [];
                      this.picker.setViewSwitchLabel("".concat(this.first, "-").concat(this.last));
                      this.picker.setPrevBtnDisabled(this.first <= this.minYear);
                      this.picker.setNextBtnDisabled(this.last >= this.maxYear);
                      Array.from(this.grid.children).forEach(function(el, index) {
                        var classList = el.classList;
                        var current = _this2.start + index * _this2.step;
                        var date = dateValue2(current, 0, 1);
                        el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this2.cellClass);
                        if (_this2.isMinView) {
                          el.dataset.date = date;
                        }
                        el.textContent = el.dataset.year = current;
                        if (index === 0) {
                          classList.add("prev");
                        } else if (index === 11) {
                          classList.add("next");
                        }
                        if (current < _this2.minYear || current > _this2.maxYear) {
                          classList.add("disabled");
                        }
                        if (_this2.range) {
                          var _this2$range = _slicedToArray2(_this2.range, 2), rangeStart = _this2$range[0], rangeEnd = _this2$range[1];
                          if (current > rangeStart && current < rangeEnd) {
                            classList.add("range");
                          }
                          if (current === rangeStart) {
                            classList.add("range-start");
                          }
                          if (current === rangeEnd) {
                            classList.add("range-end");
                          }
                        }
                        if (_this2.selected.includes(current)) {
                          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
                          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
                        }
                        if (current === _this2.focused) {
                          classList.add("focused");
                        }
                        if (_this2.beforeShow) {
                          _this2.performBeforeHook(el, current, date);
                        }
                      });
                    }
                    // Update the view UI by applying the changes of selected and focused items
                  }, {
                    key: "refresh",
                    value: function refresh() {
                      var _this3 = this;
                      var _ref = this.range || [], _ref2 = _slicedToArray2(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
                      this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
                        el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark!bg-primary-600", "dark:text-white", "focused");
                      });
                      Array.from(this.grid.children).forEach(function(el) {
                        var current = Number(el.textContent);
                        var classList = el.classList;
                        if (current > rangeStart && current < rangeEnd) {
                          classList.add("range");
                        }
                        if (current === rangeStart) {
                          classList.add("range-start");
                        }
                        if (current === rangeEnd) {
                          classList.add("range-end");
                        }
                        if (_this3.selected.includes(current)) {
                          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
                          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
                        }
                        if (current === _this3.focused) {
                          classList.add("focused");
                        }
                      });
                    }
                    // Update the view UI by applying the change of focused item
                  }, {
                    key: "refreshFocus",
                    value: function refreshFocus() {
                      var index = Math.round((this.focused - this.start) / this.step);
                      this.grid.querySelectorAll(".focused").forEach(function(el) {
                        el.classList.remove("focused");
                      });
                      this.grid.children[index].classList.add("focused");
                    }
                  }]);
                })(View2);
                function triggerDatepickerEvent2(datepicker, type) {
                  var detail = {
                    date: datepicker.getDate(),
                    viewDate: new Date(datepicker.picker.viewDate),
                    viewId: datepicker.picker.currentView.id,
                    datepicker
                  };
                  datepicker.element.dispatchEvent(new CustomEvent(type, {
                    detail
                  }));
                }
                function goToPrevOrNext2(datepicker, direction) {
                  var _datepicker$config = datepicker.config, minDate = _datepicker$config.minDate, maxDate = _datepicker$config.maxDate;
                  var _datepicker$picker = datepicker.picker, currentView = _datepicker$picker.currentView, viewDate = _datepicker$picker.viewDate;
                  var newViewDate;
                  switch (currentView.id) {
                    case 0:
                      newViewDate = addMonths2(viewDate, direction);
                      break;
                    case 1:
                      newViewDate = addYears2(viewDate, direction);
                      break;
                    default:
                      newViewDate = addYears2(viewDate, direction * currentView.navStep);
                  }
                  newViewDate = limitToRange2(newViewDate, minDate, maxDate);
                  datepicker.picker.changeFocus(newViewDate).render();
                }
                function switchView2(datepicker) {
                  var viewId = datepicker.picker.currentView.id;
                  if (viewId === datepicker.config.maxView) {
                    return;
                  }
                  datepicker.picker.changeView(viewId + 1).render();
                }
                function unfocus2(datepicker) {
                  if (datepicker.config.updateOnBlur) {
                    datepicker.update({
                      autohide: true
                    });
                  } else {
                    datepicker.refresh("input");
                    datepicker.hide();
                  }
                }
                function goToSelectedMonthOrYear2(datepicker, selection) {
                  var picker = datepicker.picker;
                  var viewDate = new Date(picker.viewDate);
                  var viewId = picker.currentView.id;
                  var newDate = viewId === 1 ? addMonths2(viewDate, selection - viewDate.getMonth()) : addYears2(viewDate, selection - viewDate.getFullYear());
                  picker.changeFocus(newDate).changeView(viewId - 1).render();
                }
                function onClickTodayBtn2(datepicker) {
                  var picker = datepicker.picker;
                  var currentDate = today2();
                  if (datepicker.config.todayBtnMode === 1) {
                    if (datepicker.config.autohide) {
                      datepicker.setDate(currentDate);
                      return;
                    }
                    datepicker.setDate(currentDate, {
                      render: false
                    });
                    picker.update();
                  }
                  if (picker.viewDate !== currentDate) {
                    picker.changeFocus(currentDate);
                  }
                  picker.changeView(0).render();
                }
                function onClickClearBtn2(datepicker) {
                  datepicker.setDate({
                    clear: true
                  });
                }
                function onClickViewSwitch2(datepicker) {
                  switchView2(datepicker);
                }
                function onClickPrevBtn2(datepicker) {
                  goToPrevOrNext2(datepicker, -1);
                }
                function onClickNextBtn2(datepicker) {
                  goToPrevOrNext2(datepicker, 1);
                }
                function onClickView2(datepicker, ev) {
                  var target = findElementInEventPath2(ev, ".datepicker-cell");
                  if (!target || target.classList.contains("disabled")) {
                    return;
                  }
                  var _datepicker$picker$cu = datepicker.picker.currentView, id = _datepicker$picker$cu.id, isMinView = _datepicker$picker$cu.isMinView;
                  if (isMinView) {
                    datepicker.setDate(Number(target.dataset.date));
                  } else if (id === 1) {
                    goToSelectedMonthOrYear2(datepicker, Number(target.dataset.month));
                  } else {
                    goToSelectedMonthOrYear2(datepicker, Number(target.dataset.year));
                  }
                }
                function onClickPicker2(datepicker) {
                  if (!datepicker.inline && !datepicker.config.disableTouchKeyboard) {
                    datepicker.inputField.focus();
                  }
                }
                function processPickerOptions2(picker, options) {
                  if (options.title !== void 0) {
                    if (options.title) {
                      picker.controls.title.textContent = options.title;
                      showElement2(picker.controls.title);
                    } else {
                      picker.controls.title.textContent = "";
                      hideElement2(picker.controls.title);
                    }
                  }
                  if (options.prevArrow) {
                    var prevBtn = picker.controls.prevBtn;
                    emptyChildNodes2(prevBtn);
                    options.prevArrow.forEach(function(node) {
                      prevBtn.appendChild(node.cloneNode(true));
                    });
                  }
                  if (options.nextArrow) {
                    var nextBtn = picker.controls.nextBtn;
                    emptyChildNodes2(nextBtn);
                    options.nextArrow.forEach(function(node) {
                      nextBtn.appendChild(node.cloneNode(true));
                    });
                  }
                  if (options.locale) {
                    picker.controls.todayBtn.textContent = options.locale.today;
                    picker.controls.clearBtn.textContent = options.locale.clear;
                  }
                  if (options.todayBtn !== void 0) {
                    if (options.todayBtn) {
                      showElement2(picker.controls.todayBtn);
                    } else {
                      hideElement2(picker.controls.todayBtn);
                    }
                  }
                  if (hasProperty2(options, "minDate") || hasProperty2(options, "maxDate")) {
                    var _picker$datepicker$co = picker.datepicker.config, minDate = _picker$datepicker$co.minDate, maxDate = _picker$datepicker$co.maxDate;
                    picker.controls.todayBtn.disabled = !isInRange2(today2(), minDate, maxDate);
                  }
                  if (options.clearBtn !== void 0) {
                    if (options.clearBtn) {
                      showElement2(picker.controls.clearBtn);
                    } else {
                      hideElement2(picker.controls.clearBtn);
                    }
                  }
                }
                function computeResetViewDate2(datepicker) {
                  var dates = datepicker.dates, config = datepicker.config;
                  var viewDate = dates.length > 0 ? lastItemOf2(dates) : config.defaultViewDate;
                  return limitToRange2(viewDate, config.minDate, config.maxDate);
                }
                function setViewDate2(picker, newDate) {
                  var oldViewDate = new Date(picker.viewDate);
                  var newViewDate = new Date(newDate);
                  var _picker$currentView = picker.currentView, id = _picker$currentView.id, year = _picker$currentView.year, first = _picker$currentView.first, last = _picker$currentView.last;
                  var viewYear = newViewDate.getFullYear();
                  picker.viewDate = newDate;
                  if (viewYear !== oldViewDate.getFullYear()) {
                    triggerDatepickerEvent2(picker.datepicker, "changeYear");
                  }
                  if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
                    triggerDatepickerEvent2(picker.datepicker, "changeMonth");
                  }
                  switch (id) {
                    case 0:
                      return newDate < first || newDate > last;
                    case 1:
                      return viewYear !== year;
                    default:
                      return viewYear < first || viewYear > last;
                  }
                }
                function getTextDirection2(el) {
                  return window.getComputedStyle(el).direction;
                }
                var Picker2 = /* @__PURE__ */ (function() {
                  function Picker3(datepicker) {
                    _classCallCheck2(this, Picker3);
                    this.datepicker = datepicker;
                    var template = pickerTemplate2.replace(/%buttonClass%/g, datepicker.config.buttonClass);
                    var element = this.element = parseHTML2(template).firstChild;
                    var _element$firstChild$c = _slicedToArray2(element.firstChild.children, 3), header = _element$firstChild$c[0], main2 = _element$firstChild$c[1], footer = _element$firstChild$c[2];
                    var title = header.firstElementChild;
                    var _header$lastElementCh = _slicedToArray2(header.lastElementChild.children, 3), prevBtn = _header$lastElementCh[0], viewSwitch = _header$lastElementCh[1], nextBtn = _header$lastElementCh[2];
                    var _footer$firstChild$ch = _slicedToArray2(footer.firstChild.children, 2), todayBtn = _footer$firstChild$ch[0], clearBtn = _footer$firstChild$ch[1];
                    var controls = {
                      title,
                      prevBtn,
                      viewSwitch,
                      nextBtn,
                      todayBtn,
                      clearBtn
                    };
                    this.main = main2;
                    this.controls = controls;
                    var elementClass = datepicker.inline ? "inline" : "dropdown";
                    element.classList.add("datepicker-".concat(elementClass));
                    elementClass === "dropdown" ? element.classList.add("dropdown", "absolute", "top-0", "left-0", "z-50", "pt-2") : null;
                    processPickerOptions2(this, datepicker.config);
                    this.viewDate = computeResetViewDate2(datepicker);
                    registerListeners2(datepicker, [[element, "click", onClickPicker2.bind(null, datepicker), {
                      capture: true
                    }], [main2, "click", onClickView2.bind(null, datepicker)], [controls.viewSwitch, "click", onClickViewSwitch2.bind(null, datepicker)], [controls.prevBtn, "click", onClickPrevBtn2.bind(null, datepicker)], [controls.nextBtn, "click", onClickNextBtn2.bind(null, datepicker)], [controls.todayBtn, "click", onClickTodayBtn2.bind(null, datepicker)], [controls.clearBtn, "click", onClickClearBtn2.bind(null, datepicker)]]);
                    this.views = [new DaysView2(this), new MonthsView2(this), new YearsView2(this, {
                      id: 2,
                      name: "years",
                      cellClass: "year",
                      step: 1
                    }), new YearsView2(this, {
                      id: 3,
                      name: "decades",
                      cellClass: "decade",
                      step: 10
                    })];
                    this.currentView = this.views[datepicker.config.startView];
                    this.currentView.render();
                    this.main.appendChild(this.currentView.element);
                    datepicker.config.container.appendChild(this.element);
                  }
                  return _createClass2(Picker3, [{
                    key: "setOptions",
                    value: function setOptions(options) {
                      processPickerOptions2(this, options);
                      this.views.forEach(function(view) {
                        view.init(options, false);
                      });
                      this.currentView.render();
                    }
                  }, {
                    key: "detach",
                    value: function detach() {
                      this.datepicker.config.container.removeChild(this.element);
                    }
                  }, {
                    key: "show",
                    value: function show() {
                      if (this.active) {
                        return;
                      }
                      this.element.classList.add("active", "block");
                      this.element.classList.remove("hidden");
                      this.active = true;
                      var datepicker = this.datepicker;
                      if (!datepicker.inline) {
                        var inputDirection = getTextDirection2(datepicker.inputField);
                        if (inputDirection !== getTextDirection2(datepicker.config.container)) {
                          this.element.dir = inputDirection;
                        } else if (this.element.dir) {
                          this.element.removeAttribute("dir");
                        }
                        this.place();
                        if (datepicker.config.disableTouchKeyboard) {
                          datepicker.inputField.blur();
                        }
                      }
                      triggerDatepickerEvent2(datepicker, "show");
                    }
                  }, {
                    key: "hide",
                    value: function hide2() {
                      if (!this.active) {
                        return;
                      }
                      this.datepicker.exitEditMode();
                      this.element.classList.remove("active", "block");
                      this.element.classList.add("active", "block", "hidden");
                      this.active = false;
                      triggerDatepickerEvent2(this.datepicker, "hide");
                    }
                  }, {
                    key: "place",
                    value: function place() {
                      var _this$element = this.element, classList = _this$element.classList, style = _this$element.style;
                      var _this$datepicker = this.datepicker, config = _this$datepicker.config, inputField = _this$datepicker.inputField;
                      var container = config.container;
                      var _this$element$getBoun = this.element.getBoundingClientRect(), calendarWidth = _this$element$getBoun.width, calendarHeight = _this$element$getBoun.height;
                      var _container$getBoundin = container.getBoundingClientRect(), containerLeft = _container$getBoundin.left, containerTop = _container$getBoundin.top, containerWidth = _container$getBoundin.width;
                      var _inputField$getBoundi = inputField.getBoundingClientRect(), inputLeft = _inputField$getBoundi.left, inputTop = _inputField$getBoundi.top, inputWidth = _inputField$getBoundi.width, inputHeight = _inputField$getBoundi.height;
                      var _config$orientation = config.orientation, orientX = _config$orientation.x, orientY = _config$orientation.y;
                      var scrollTop;
                      var left2;
                      var top2;
                      if (container === document.body) {
                        scrollTop = window.scrollY;
                        left2 = inputLeft + window.scrollX;
                        top2 = inputTop + scrollTop;
                      } else {
                        scrollTop = container.scrollTop;
                        left2 = inputLeft - containerLeft;
                        top2 = inputTop - containerTop + scrollTop;
                      }
                      if (orientX === "auto") {
                        if (left2 < 0) {
                          orientX = "left";
                          left2 = 10;
                        } else if (left2 + calendarWidth > containerWidth) {
                          orientX = "right";
                        } else {
                          orientX = getTextDirection2(inputField) === "rtl" ? "right" : "left";
                        }
                      }
                      if (orientX === "right") {
                        left2 -= calendarWidth - inputWidth;
                      }
                      if (orientY === "auto") {
                        orientY = top2 - calendarHeight < scrollTop ? "bottom" : "top";
                      }
                      if (orientY === "top") {
                        top2 -= calendarHeight;
                      } else {
                        top2 += inputHeight;
                      }
                      classList.remove("datepicker-orient-top", "datepicker-orient-bottom", "datepicker-orient-right", "datepicker-orient-left");
                      classList.add("datepicker-orient-".concat(orientY), "datepicker-orient-".concat(orientX));
                      style.top = top2 ? "".concat(top2, "px") : top2;
                      style.left = left2 ? "".concat(left2, "px") : left2;
                    }
                  }, {
                    key: "setViewSwitchLabel",
                    value: function setViewSwitchLabel(labelText) {
                      this.controls.viewSwitch.textContent = labelText;
                    }
                  }, {
                    key: "setPrevBtnDisabled",
                    value: function setPrevBtnDisabled(disabled) {
                      this.controls.prevBtn.disabled = disabled;
                    }
                  }, {
                    key: "setNextBtnDisabled",
                    value: function setNextBtnDisabled(disabled) {
                      this.controls.nextBtn.disabled = disabled;
                    }
                  }, {
                    key: "changeView",
                    value: function changeView(viewId) {
                      var oldView = this.currentView;
                      var newView = this.views[viewId];
                      if (newView.id !== oldView.id) {
                        this.currentView = newView;
                        this._renderMethod = "render";
                        triggerDatepickerEvent2(this.datepicker, "changeView");
                        this.main.replaceChild(newView.element, oldView.element);
                      }
                      return this;
                    }
                    // Change the focused date (view date)
                  }, {
                    key: "changeFocus",
                    value: function changeFocus(newViewDate) {
                      this._renderMethod = setViewDate2(this, newViewDate) ? "render" : "refreshFocus";
                      this.views.forEach(function(view) {
                        view.updateFocus();
                      });
                      return this;
                    }
                    // Apply the change of the selected dates
                  }, {
                    key: "update",
                    value: function update() {
                      var newViewDate = computeResetViewDate2(this.datepicker);
                      this._renderMethod = setViewDate2(this, newViewDate) ? "render" : "refresh";
                      this.views.forEach(function(view) {
                        view.updateFocus();
                        view.updateSelection();
                      });
                      return this;
                    }
                    // Refresh the picker UI
                  }, {
                    key: "render",
                    value: function render() {
                      var quickRender = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
                      var renderMethod = quickRender && this._renderMethod || "render";
                      delete this._renderMethod;
                      this.currentView[renderMethod]();
                    }
                  }]);
                })();
                function findNextAvailableOne2(date, addFn, increase, testFn, min2, max2) {
                  if (!isInRange2(date, min2, max2)) {
                    return;
                  }
                  if (testFn(date)) {
                    var newDate = addFn(date, increase);
                    return findNextAvailableOne2(newDate, addFn, increase, testFn, min2, max2);
                  }
                  return date;
                }
                function moveByArrowKey2(datepicker, ev, direction, vertical) {
                  var picker = datepicker.picker;
                  var currentView = picker.currentView;
                  var step = currentView.step || 1;
                  var viewDate = picker.viewDate;
                  var addFn;
                  var testFn;
                  switch (currentView.id) {
                    case 0:
                      if (vertical) {
                        viewDate = addDays2(viewDate, direction * 7);
                      } else if (ev.ctrlKey || ev.metaKey) {
                        viewDate = addYears2(viewDate, direction);
                      } else {
                        viewDate = addDays2(viewDate, direction);
                      }
                      addFn = addDays2;
                      testFn = function testFn2(date) {
                        return currentView.disabled.includes(date);
                      };
                      break;
                    case 1:
                      viewDate = addMonths2(viewDate, vertical ? direction * 4 : direction);
                      addFn = addMonths2;
                      testFn = function testFn2(date) {
                        var dt2 = new Date(date);
                        var year = currentView.year, disabled = currentView.disabled;
                        return dt2.getFullYear() === year && disabled.includes(dt2.getMonth());
                      };
                      break;
                    default:
                      viewDate = addYears2(viewDate, direction * (vertical ? 4 : 1) * step);
                      addFn = addYears2;
                      testFn = function testFn2(date) {
                        return currentView.disabled.includes(startOfYearPeriod2(date, step));
                      };
                  }
                  viewDate = findNextAvailableOne2(viewDate, addFn, direction < 0 ? -step : step, testFn, currentView.minDate, currentView.maxDate);
                  if (viewDate !== void 0) {
                    picker.changeFocus(viewDate).render();
                  }
                }
                function onKeydown2(datepicker, ev) {
                  if (ev.key === "Tab") {
                    unfocus2(datepicker);
                    return;
                  }
                  var picker = datepicker.picker;
                  var _picker$currentView = picker.currentView, id = _picker$currentView.id, isMinView = _picker$currentView.isMinView;
                  if (!picker.active) {
                    switch (ev.key) {
                      case "ArrowDown":
                      case "Escape":
                        picker.show();
                        break;
                      case "Enter":
                        datepicker.update();
                        break;
                      default:
                        return;
                    }
                  } else if (datepicker.editMode) {
                    switch (ev.key) {
                      case "Escape":
                        picker.hide();
                        break;
                      case "Enter":
                        datepicker.exitEditMode({
                          update: true,
                          autohide: datepicker.config.autohide
                        });
                        break;
                      default:
                        return;
                    }
                  } else {
                    switch (ev.key) {
                      case "Escape":
                        picker.hide();
                        break;
                      case "ArrowLeft":
                        if (ev.ctrlKey || ev.metaKey) {
                          goToPrevOrNext2(datepicker, -1);
                        } else if (ev.shiftKey) {
                          datepicker.enterEditMode();
                          return;
                        } else {
                          moveByArrowKey2(datepicker, ev, -1, false);
                        }
                        break;
                      case "ArrowRight":
                        if (ev.ctrlKey || ev.metaKey) {
                          goToPrevOrNext2(datepicker, 1);
                        } else if (ev.shiftKey) {
                          datepicker.enterEditMode();
                          return;
                        } else {
                          moveByArrowKey2(datepicker, ev, 1, false);
                        }
                        break;
                      case "ArrowUp":
                        if (ev.ctrlKey || ev.metaKey) {
                          switchView2(datepicker);
                        } else if (ev.shiftKey) {
                          datepicker.enterEditMode();
                          return;
                        } else {
                          moveByArrowKey2(datepicker, ev, -1, true);
                        }
                        break;
                      case "ArrowDown":
                        if (ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
                          datepicker.enterEditMode();
                          return;
                        }
                        moveByArrowKey2(datepicker, ev, 1, true);
                        break;
                      case "Enter":
                        if (isMinView) {
                          datepicker.setDate(picker.viewDate);
                        } else {
                          picker.changeView(id - 1).render();
                        }
                        break;
                      case "Backspace":
                      case "Delete":
                        datepicker.enterEditMode();
                        return;
                      default:
                        if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey) {
                          datepicker.enterEditMode();
                        }
                        return;
                    }
                  }
                  ev.preventDefault();
                  ev.stopPropagation();
                }
                function onFocus2(datepicker) {
                  if (datepicker.config.showOnFocus && !datepicker._showing) {
                    datepicker.show();
                  }
                }
                function onMousedown2(datepicker, ev) {
                  var el = ev.target;
                  if (datepicker.picker.active || datepicker.config.showOnClick) {
                    el._active = el === document.activeElement;
                    el._clicking = setTimeout(function() {
                      delete el._active;
                      delete el._clicking;
                    }, 2e3);
                  }
                }
                function onClickInput2(datepicker, ev) {
                  var el = ev.target;
                  if (!el._clicking) {
                    return;
                  }
                  clearTimeout(el._clicking);
                  delete el._clicking;
                  if (el._active) {
                    datepicker.enterEditMode();
                  }
                  delete el._active;
                  if (datepicker.config.showOnClick) {
                    datepicker.show();
                  }
                }
                function onPaste2(datepicker, ev) {
                  if (ev.clipboardData.types.includes("text/plain")) {
                    datepicker.enterEditMode();
                  }
                }
                function onClickOutside2(datepicker, ev) {
                  var element = datepicker.element;
                  if (element !== document.activeElement) {
                    return;
                  }
                  var pickerElem = datepicker.picker.element;
                  if (findElementInEventPath2(ev, function(el) {
                    return el === element || el === pickerElem;
                  })) {
                    return;
                  }
                  unfocus2(datepicker);
                }
                function stringifyDates2(dates, config) {
                  return dates.map(function(dt2) {
                    return formatDate2(dt2, config.format, config.locale);
                  }).join(config.dateDelimiter);
                }
                function processInputDates2(datepicker, inputDates) {
                  var clear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                  var config = datepicker.config, origDates = datepicker.dates, rangepicker = datepicker.rangepicker;
                  if (inputDates.length === 0) {
                    return clear ? [] : void 0;
                  }
                  var rangeEnd = rangepicker && datepicker === rangepicker.datepickers[1];
                  var newDates = inputDates.reduce(function(dates, dt2) {
                    var date = parseDate2(dt2, config.format, config.locale);
                    if (date === void 0) {
                      return dates;
                    }
                    if (config.pickLevel > 0) {
                      var _dt = new Date(date);
                      if (config.pickLevel === 1) {
                        date = rangeEnd ? _dt.setMonth(_dt.getMonth() + 1, 0) : _dt.setDate(1);
                      } else {
                        date = rangeEnd ? _dt.setFullYear(_dt.getFullYear() + 1, 0, 0) : _dt.setMonth(0, 1);
                      }
                    }
                    if (isInRange2(date, config.minDate, config.maxDate) && !dates.includes(date) && !config.datesDisabled.includes(date) && !config.daysOfWeekDisabled.includes(new Date(date).getDay())) {
                      dates.push(date);
                    }
                    return dates;
                  }, []);
                  if (newDates.length === 0) {
                    return;
                  }
                  if (config.multidate && !clear) {
                    newDates = newDates.reduce(function(dates, date) {
                      if (!origDates.includes(date)) {
                        dates.push(date);
                      }
                      return dates;
                    }, origDates.filter(function(date) {
                      return !newDates.includes(date);
                    }));
                  }
                  return config.maxNumberOfDates && newDates.length > config.maxNumberOfDates ? newDates.slice(config.maxNumberOfDates * -1) : newDates;
                }
                function refreshUI2(datepicker) {
                  var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
                  var quickRender = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                  var config = datepicker.config, picker = datepicker.picker, inputField = datepicker.inputField;
                  if (mode & 2) {
                    var newView = picker.active ? config.pickLevel : config.startView;
                    picker.update().changeView(newView).render(quickRender);
                  }
                  if (mode & 1 && inputField) {
                    inputField.value = stringifyDates2(datepicker.dates, config);
                  }
                }
                function _setDate2(datepicker, inputDates, options) {
                  var clear = options.clear, render = options.render, autohide = options.autohide;
                  if (render === void 0) {
                    render = true;
                  }
                  if (!render) {
                    autohide = false;
                  } else if (autohide === void 0) {
                    autohide = datepicker.config.autohide;
                  }
                  var newDates = processInputDates2(datepicker, inputDates, clear);
                  if (!newDates) {
                    return;
                  }
                  if (newDates.toString() !== datepicker.dates.toString()) {
                    datepicker.dates = newDates;
                    refreshUI2(datepicker, render ? 3 : 1);
                    triggerDatepickerEvent2(datepicker, "changeDate");
                  } else {
                    refreshUI2(datepicker, 1);
                  }
                  if (autohide) {
                    datepicker.hide();
                  }
                }
                var Datepicker2 = /* @__PURE__ */ (function() {
                  function Datepicker3(element) {
                    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                    var rangepicker = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
                    _classCallCheck2(this, Datepicker3);
                    element.datepicker = this;
                    this.element = element;
                    var config = this.config = Object.assign({
                      buttonClass: options.buttonClass && String(options.buttonClass) || "button",
                      container: document.body,
                      defaultViewDate: today2(),
                      maxDate: void 0,
                      minDate: void 0
                    }, processOptions2(defaultOptions2, this));
                    this._options = options;
                    Object.assign(config, processOptions2(options, this));
                    var inline = this.inline = element.tagName !== "INPUT";
                    var inputField;
                    var initialDates;
                    if (inline) {
                      config.container = element;
                      initialDates = stringToArray2(element.dataset.date, config.dateDelimiter);
                      delete element.dataset.date;
                    } else {
                      var container = options.container ? document.querySelector(options.container) : null;
                      if (container) {
                        config.container = container;
                      }
                      inputField = this.inputField = element;
                      inputField.classList.add("datepicker-input");
                      initialDates = stringToArray2(inputField.value, config.dateDelimiter);
                    }
                    if (rangepicker) {
                      var index = rangepicker.inputs.indexOf(inputField);
                      var datepickers = rangepicker.datepickers;
                      if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
                        throw Error("Invalid rangepicker object.");
                      }
                      datepickers[index] = this;
                      Object.defineProperty(this, "rangepicker", {
                        get: function get() {
                          return rangepicker;
                        }
                      });
                    }
                    this.dates = [];
                    var inputDateValues = processInputDates2(this, initialDates);
                    if (inputDateValues && inputDateValues.length > 0) {
                      this.dates = inputDateValues;
                    }
                    if (inputField) {
                      inputField.value = stringifyDates2(this.dates, config);
                    }
                    var picker = this.picker = new Picker2(this);
                    if (inline) {
                      this.show();
                    } else {
                      var onMousedownDocument = onClickOutside2.bind(null, this);
                      var listeners = [[inputField, "keydown", onKeydown2.bind(null, this)], [inputField, "focus", onFocus2.bind(null, this)], [inputField, "mousedown", onMousedown2.bind(null, this)], [inputField, "click", onClickInput2.bind(null, this)], [inputField, "paste", onPaste2.bind(null, this)], [document, "mousedown", onMousedownDocument], [document, "touchstart", onMousedownDocument], [window, "resize", picker.place.bind(picker)]];
                      registerListeners2(this, listeners);
                    }
                  }
                  return _createClass2(Datepicker3, [{
                    key: "active",
                    get: (
                      /**
                       * @type {Boolean} - Whether the picker element is shown. `true` whne shown
                       */
                      function get() {
                        return !!(this.picker && this.picker.active);
                      }
                    )
                    /**
                     * @type {HTMLDivElement} - DOM object of picker element
                     */
                  }, {
                    key: "pickerElement",
                    get: function get() {
                      return this.picker ? this.picker.element : void 0;
                    }
                    /**
                     * Set new values to the config options
                     * @param {Object} options - config options to update
                     */
                  }, {
                    key: "setOptions",
                    value: function setOptions(options) {
                      var picker = this.picker;
                      var newOptions = processOptions2(options, this);
                      Object.assign(this._options, options);
                      Object.assign(this.config, newOptions);
                      picker.setOptions(newOptions);
                      refreshUI2(this, 3);
                    }
                    /**
                     * Show the picker element
                     */
                  }, {
                    key: "show",
                    value: function show() {
                      if (this.inputField) {
                        if (this.inputField.disabled) {
                          return;
                        }
                        if (this.inputField !== document.activeElement) {
                          this._showing = true;
                          this.inputField.focus();
                          delete this._showing;
                        }
                      }
                      this.picker.show();
                    }
                    /**
                     * Hide the picker element
                     * Not available on inline picker
                     */
                  }, {
                    key: "hide",
                    value: function hide2() {
                      if (this.inline) {
                        return;
                      }
                      this.picker.hide();
                      this.picker.update().changeView(this.config.startView).render();
                    }
                    /**
                     * Destroy the Datepicker instance
                     * @return {Detepicker} - the instance destroyed
                     */
                  }, {
                    key: "destroy",
                    value: function destroy() {
                      this.hide();
                      unregisterListeners2(this);
                      this.picker.detach();
                      if (!this.inline) {
                        this.inputField.classList.remove("datepicker-input");
                      }
                      delete this.element.datepicker;
                      return this;
                    }
                    /**
                     * Get the selected date(s)
                     *
                     * The method returns a Date object of selected date by default, and returns
                     * an array of selected dates in multidate mode. If format string is passed,
                     * it returns date string(s) formatted in given format.
                     *
                     * @param  {String} [format] - Format string to stringify the date(s)
                     * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
                     * selected, empty array in multidate mode and untitled in sigledate mode
                     */
                  }, {
                    key: "getDate",
                    value: function getDate() {
                      var _this = this;
                      var format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
                      var callback = format ? function(date) {
                        return formatDate2(date, format, _this.config.locale);
                      } : function(date) {
                        return new Date(date);
                      };
                      if (this.config.multidate) {
                        return this.dates.map(callback);
                      }
                      if (this.dates.length > 0) {
                        return callback(this.dates[0]);
                      }
                    }
                    /**
                     * Set selected date(s)
                     *
                     * In multidate mode, you can pass multiple dates as a series of arguments
                     * or an array. (Since each date is parsed individually, the type of the
                     * dates doesn't have to be the same.)
                     * The given dates are used to toggle the select status of each date. The
                     * number of selected dates is kept from exceeding the length set to
                     * maxNumberOfDates.
                     *
                     * With clear: true option, the method can be used to clear the selection
                     * and to replace the selection instead of toggling in multidate mode.
                     * If the option is passed with no date arguments or an empty dates array,
                     * it works as "clear" (clear the selection then set nothing), and if the
                     * option is passed with new dates to select, it works as "replace" (clear
                     * the selection then set the given dates)
                     *
                     * When render: false option is used, the method omits re-rendering the
                     * picker element. In this case, you need to call refresh() method later in
                     * order for the picker element to reflect the changes. The input field is
                     * refreshed always regardless of this option.
                     *
                     * When invalid (unparsable, repeated, disabled or out-of-range) dates are
                     * passed, the method ignores them and applies only valid ones. In the case
                     * that all the given dates are invalid, which is distinguished from passing
                     * no dates, the method considers it as an error and leaves the selection
                     * untouched.
                     *
                     * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
                     * objects, time values or mix of those for new selection
                     * @param {Object} [options] - function options
                     * - clear: {boolean} - Whether to clear the existing selection
                     *     defualt: false
                     * - render: {boolean} - Whether to re-render the picker element
                     *     default: true
                     * - autohide: {boolean} - Whether to hide the picker element after re-render
                     *     Ignored when used with render: false
                     *     default: config.autohide
                     */
                  }, {
                    key: "setDate",
                    value: function setDate() {
                      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                      }
                      var dates = [].concat(args);
                      var opts = {};
                      var lastArg = lastItemOf2(args);
                      if (_typeof2(lastArg) === "object" && !Array.isArray(lastArg) && !(lastArg instanceof Date) && lastArg) {
                        Object.assign(opts, dates.pop());
                      }
                      var inputDates = Array.isArray(dates[0]) ? dates[0] : dates;
                      _setDate2(this, inputDates, opts);
                    }
                    /**
                     * Update the selected date(s) with input field's value
                     * Not available on inline picker
                     *
                     * The input field will be refreshed with properly formatted date string.
                     *
                     * @param  {Object} [options] - function options
                     * - autohide: {boolean} - whether to hide the picker element after refresh
                     *     default: false
                     */
                  }, {
                    key: "update",
                    value: function update() {
                      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
                      if (this.inline) {
                        return;
                      }
                      var opts = {
                        clear: true,
                        autohide: !!(options && options.autohide)
                      };
                      var inputDates = stringToArray2(this.inputField.value, this.config.dateDelimiter);
                      _setDate2(this, inputDates, opts);
                    }
                    /**
                     * Refresh the picker element and the associated input field
                     * @param {String} [target] - target item when refreshing one item only
                     * 'picker' or 'input'
                     * @param {Boolean} [forceRender] - whether to re-render the picker element
                     * regardless of its state instead of optimized refresh
                     */
                  }, {
                    key: "refresh",
                    value: function refresh() {
                      var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
                      var forceRender = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                      if (target && typeof target !== "string") {
                        forceRender = target;
                        target = void 0;
                      }
                      var mode;
                      if (target === "picker") {
                        mode = 2;
                      } else if (target === "input") {
                        mode = 1;
                      } else {
                        mode = 3;
                      }
                      refreshUI2(this, mode, !forceRender);
                    }
                    /**
                     * Enter edit mode
                     * Not available on inline picker or when the picker element is hidden
                     */
                  }, {
                    key: "enterEditMode",
                    value: function enterEditMode() {
                      if (this.inline || !this.picker.active || this.editMode) {
                        return;
                      }
                      this.editMode = true;
                      this.inputField.classList.add("in-edit", "border-blue-700", "!border-primary-700");
                    }
                    /**
                     * Exit from edit mode
                     * Not available on inline picker
                     * @param  {Object} [options] - function options
                     * - update: {boolean} - whether to call update() after exiting
                     *     If false, input field is revert to the existing selection
                     *     default: false
                     */
                  }, {
                    key: "exitEditMode",
                    value: function exitEditMode() {
                      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
                      if (this.inline || !this.editMode) {
                        return;
                      }
                      var opts = Object.assign({
                        update: false
                      }, options);
                      delete this.editMode;
                      this.inputField.classList.remove("in-edit", "border-blue-700", "!border-primary-700");
                      if (opts.update) {
                        this.update(opts);
                      }
                    }
                  }], [{
                    key: "formatDate",
                    value: function formatDate$1(date, format, lang) {
                      return formatDate2(date, format, lang && locales2[lang] || locales2.en);
                    }
                    /**
                     * Parse date string
                     * @param  {String|Date|Number} dateStr - date string, Date object or time
                     * value to parse
                     * @param  {String|Object} format - format string or object that contains
                     * toValue() custom parser, whose signature is
                     * - args:
                     *   - dateStr: {String|Date|Number} - the dateStr passed to the method
                     *   - format: {Object} - the format object passed to the method
                     *   - locale: {Object} - locale for the language specified by `lang`
                     * - return:
                     *     {Date|Number} parsed date or its time value
                     * @param  {String} [lang=en] - language code for the locale to use
                     * @return {Number} time value of parsed date
                     */
                  }, {
                    key: "parseDate",
                    value: function parseDate$1(dateStr, format, lang) {
                      return parseDate2(dateStr, format, lang && locales2[lang] || locales2.en);
                    }
                    /**
                     * @type {Object} - Installed locales in `[languageCode]: localeObject` format
                     * en`:_English (US)_ is pre-installed.
                     */
                  }, {
                    key: "locales",
                    get: function get() {
                      return locales2;
                    }
                  }]);
                })();
                function filterOptions2(options) {
                  var newOpts = Object.assign({}, options);
                  delete newOpts.inputs;
                  delete newOpts.allowOneSidedRange;
                  delete newOpts.maxNumberOfDates;
                  return newOpts;
                }
                function setupDatepicker2(rangepicker, changeDateListener, el, options) {
                  registerListeners2(rangepicker, [[el, "changeDate", changeDateListener]]);
                  new Datepicker2(el, options, rangepicker);
                }
                function onChangeDate2(rangepicker, ev) {
                  if (rangepicker._updating) {
                    return;
                  }
                  rangepicker._updating = true;
                  var target = ev.target;
                  if (target.datepicker === void 0) {
                    return;
                  }
                  var datepickers = rangepicker.datepickers;
                  var setDateOptions = {
                    render: false
                  };
                  var changedSide = rangepicker.inputs.indexOf(target);
                  var otherSide = changedSide === 0 ? 1 : 0;
                  var changedDate = datepickers[changedSide].dates[0];
                  var otherDate = datepickers[otherSide].dates[0];
                  if (changedDate !== void 0 && otherDate !== void 0) {
                    if (changedSide === 0 && changedDate > otherDate) {
                      datepickers[0].setDate(otherDate, setDateOptions);
                      datepickers[1].setDate(changedDate, setDateOptions);
                    } else if (changedSide === 1 && changedDate < otherDate) {
                      datepickers[0].setDate(changedDate, setDateOptions);
                      datepickers[1].setDate(otherDate, setDateOptions);
                    }
                  } else if (!rangepicker.allowOneSidedRange) {
                    if (changedDate !== void 0 || otherDate !== void 0) {
                      setDateOptions.clear = true;
                      datepickers[otherSide].setDate(datepickers[changedSide].dates, setDateOptions);
                    }
                  }
                  datepickers[0].picker.update().render();
                  datepickers[1].picker.update().render();
                  delete rangepicker._updating;
                }
                var DateRangePicker2 = /* @__PURE__ */ (function() {
                  function DateRangePicker3(element) {
                    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                    _classCallCheck2(this, DateRangePicker3);
                    var inputs = Array.isArray(options.inputs) ? options.inputs : Array.from(element.querySelectorAll("input"));
                    if (inputs.length < 2) {
                      return;
                    }
                    element.rangepicker = this;
                    this.element = element;
                    this.inputs = inputs.slice(0, 2);
                    this.allowOneSidedRange = !!options.allowOneSidedRange;
                    var changeDateListener = onChangeDate2.bind(null, this);
                    var cleanOptions = filterOptions2(options);
                    var datepickers = [];
                    Object.defineProperty(this, "datepickers", {
                      get: function get() {
                        return datepickers;
                      }
                    });
                    setupDatepicker2(this, changeDateListener, this.inputs[0], cleanOptions);
                    setupDatepicker2(this, changeDateListener, this.inputs[1], cleanOptions);
                    Object.freeze(datepickers);
                    if (datepickers[0].dates.length > 0) {
                      onChangeDate2(this, {
                        target: this.inputs[0]
                      });
                    } else if (datepickers[1].dates.length > 0) {
                      onChangeDate2(this, {
                        target: this.inputs[1]
                      });
                    }
                  }
                  return _createClass2(DateRangePicker3, [{
                    key: "dates",
                    get: function get() {
                      return this.datepickers.length === 2 ? [this.datepickers[0].dates[0], this.datepickers[1].dates[0]] : void 0;
                    }
                    /**
                     * Set new values to the config options
                     * @param {Object} options - config options to update
                     */
                  }, {
                    key: "setOptions",
                    value: function setOptions(options) {
                      this.allowOneSidedRange = !!options.allowOneSidedRange;
                      var cleanOptions = filterOptions2(options);
                      this.datepickers[0].setOptions(cleanOptions);
                      this.datepickers[1].setOptions(cleanOptions);
                    }
                    /**
                     * Destroy the DateRangePicker instance
                     * @return {DateRangePicker} - the instance destroyed
                     */
                  }, {
                    key: "destroy",
                    value: function destroy() {
                      this.datepickers[0].destroy();
                      this.datepickers[1].destroy();
                      unregisterListeners2(this);
                      delete this.element.rangepicker;
                    }
                    /**
                     * Get the start and end dates of the date range
                     *
                     * The method returns Date objects by default. If format string is passed,
                     * it returns date strings formatted in given format.
                     * The result array always contains 2 items (start date/end date) and
                     * undefined is used for unselected side. (e.g. If none is selected,
                     * the result will be [undefined, undefined]. If only the end date is set
                     * when allowOneSidedRange config option is true, [undefined, endDate] will
                     * be returned.)
                     *
                     * @param  {String} [format] - Format string to stringify the dates
                     * @return {Array} - Start and end dates
                     */
                  }, {
                    key: "getDates",
                    value: function getDates() {
                      var _this = this;
                      var format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
                      var callback = format ? function(date) {
                        return formatDate2(date, format, _this.datepickers[0].config.locale);
                      } : function(date) {
                        return new Date(date);
                      };
                      return this.dates.map(function(date) {
                        return date === void 0 ? date : callback(date);
                      });
                    }
                    /**
                     * Set the start and end dates of the date range
                     *
                     * The method calls datepicker.setDate() internally using each of the
                     * arguments in start→end order.
                     *
                     * When a clear: true option object is passed instead of a date, the method
                     * clears the date.
                     *
                     * If an invalid date, the same date as the current one or an option object
                     * without clear: true is passed, the method considers that argument as an
                     * "ineffective" argument because calling datepicker.setDate() with those
                     * values makes no changes to the date selection.
                     *
                     * When the allowOneSidedRange config option is false, passing {clear: true}
                     * to clear the range works only when it is done to the last effective
                     * argument (in other words, passed to rangeEnd or to rangeStart along with
                     * ineffective rangeEnd). This is because when the date range is changed,
                     * it gets normalized based on the last change at the end of the changing
                     * process.
                     *
                     * @param {Date|Number|String|Object} rangeStart - Start date of the range
                     * or {clear: true} to clear the date
                     * @param {Date|Number|String|Object} rangeEnd - End date of the range
                     * or {clear: true} to clear the date
                     */
                  }, {
                    key: "setDates",
                    value: function setDates(rangeStart, rangeEnd) {
                      var _this$datepickers = _slicedToArray2(this.datepickers, 2), datepicker0 = _this$datepickers[0], datepicker1 = _this$datepickers[1];
                      var origDates = this.dates;
                      this._updating = true;
                      datepicker0.setDate(rangeStart);
                      datepicker1.setDate(rangeEnd);
                      delete this._updating;
                      if (datepicker1.dates[0] !== origDates[1]) {
                        onChangeDate2(this, {
                          target: this.inputs[1]
                        });
                      } else if (datepicker0.dates[0] !== origDates[0]) {
                        onChangeDate2(this, {
                          target: this.inputs[0]
                        });
                      }
                    }
                  }]);
                })();
                exports2.DateRangePicker = DateRangePicker2;
                exports2.Datepicker = Datepicker2;
              })
            ),
            /***/
            902: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initAccordions = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  alwaysOpen: false,
                  activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
                  inactiveClasses: "text-gray-500 dark:text-gray-400",
                  onOpen: function() {
                  },
                  onClose: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Accordion2 = (
                  /** @class */
                  (function() {
                    function Accordion3(accordionEl, items, options, instanceOptions) {
                      if (accordionEl === void 0) {
                        accordionEl = null;
                      }
                      if (items === void 0) {
                        items = [];
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : accordionEl.id;
                      this._accordionEl = accordionEl;
                      this._items = items;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Accordion", this, this._instanceId, instanceOptions.override);
                    }
                    Accordion3.prototype.init = function() {
                      var _this = this;
                      if (this._items.length && !this._initialized) {
                        this._items.forEach(function(item) {
                          if (item.active) {
                            _this.open(item.id);
                          }
                          var clickHandler = function() {
                            _this.toggle(item.id);
                          };
                          item.triggerEl.addEventListener("click", clickHandler);
                          item.clickHandler = clickHandler;
                        });
                        this._initialized = true;
                      }
                    };
                    Accordion3.prototype.destroy = function() {
                      if (this._items.length && this._initialized) {
                        this._items.forEach(function(item) {
                          item.triggerEl.removeEventListener("click", item.clickHandler);
                          delete item.clickHandler;
                        });
                        this._initialized = false;
                      }
                    };
                    Accordion3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Accordion", this._instanceId);
                    };
                    Accordion3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Accordion3.prototype.getItem = function(id) {
                      return this._items.filter(function(item) {
                        return item.id === id;
                      })[0];
                    };
                    Accordion3.prototype.open = function(id) {
                      var _a, _b;
                      var _this = this;
                      var item = this.getItem(id);
                      if (!this._options.alwaysOpen) {
                        this._items.map(function(i) {
                          var _a2, _b2;
                          if (i !== item) {
                            (_a2 = i.triggerEl.classList).remove.apply(_a2, _this._options.activeClasses.split(" "));
                            (_b2 = i.triggerEl.classList).add.apply(_b2, _this._options.inactiveClasses.split(" "));
                            i.targetEl.classList.add("hidden");
                            i.triggerEl.setAttribute("aria-expanded", "false");
                            i.active = false;
                            if (i.iconEl) {
                              i.iconEl.classList.add("rotate-180");
                            }
                          }
                        });
                      }
                      (_a = item.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(" "));
                      (_b = item.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(" "));
                      item.triggerEl.setAttribute("aria-expanded", "true");
                      item.targetEl.classList.remove("hidden");
                      item.active = true;
                      if (item.iconEl) {
                        item.iconEl.classList.remove("rotate-180");
                      }
                      this._options.onOpen(this, item);
                    };
                    Accordion3.prototype.toggle = function(id) {
                      var item = this.getItem(id);
                      if (item.active) {
                        this.close(id);
                      } else {
                        this.open(id);
                      }
                      this._options.onToggle(this, item);
                    };
                    Accordion3.prototype.close = function(id) {
                      var _a, _b;
                      var item = this.getItem(id);
                      (_a = item.triggerEl.classList).remove.apply(_a, this._options.activeClasses.split(" "));
                      (_b = item.triggerEl.classList).add.apply(_b, this._options.inactiveClasses.split(" "));
                      item.targetEl.classList.add("hidden");
                      item.triggerEl.setAttribute("aria-expanded", "false");
                      item.active = false;
                      if (item.iconEl) {
                        item.iconEl.classList.add("rotate-180");
                      }
                      this._options.onClose(this, item);
                    };
                    Accordion3.prototype.updateOnOpen = function(callback) {
                      this._options.onOpen = callback;
                    };
                    Accordion3.prototype.updateOnClose = function(callback) {
                      this._options.onClose = callback;
                    };
                    Accordion3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Accordion3;
                  })()
                );
                function initAccordions2() {
                  document.querySelectorAll("[data-accordion]").forEach(function($accordionEl) {
                    var alwaysOpen = $accordionEl.getAttribute("data-accordion");
                    var activeClasses = $accordionEl.getAttribute("data-active-classes");
                    var inactiveClasses = $accordionEl.getAttribute("data-inactive-classes");
                    var items = [];
                    $accordionEl.querySelectorAll("[data-accordion-target]").forEach(function($triggerEl) {
                      if ($triggerEl.closest("[data-accordion]") === $accordionEl) {
                        var item = {
                          id: $triggerEl.getAttribute("data-accordion-target"),
                          triggerEl: $triggerEl,
                          targetEl: document.querySelector($triggerEl.getAttribute("data-accordion-target")),
                          iconEl: $triggerEl.querySelector("[data-accordion-icon]"),
                          active: $triggerEl.getAttribute("aria-expanded") === "true" ? true : false
                        };
                        items.push(item);
                      }
                    });
                    new Accordion2($accordionEl, items, {
                      alwaysOpen: alwaysOpen === "open" ? true : false,
                      activeClasses: activeClasses ? activeClasses : Default2.activeClasses,
                      inactiveClasses: inactiveClasses ? inactiveClasses : Default2.inactiveClasses
                    });
                  });
                }
                exports2.initAccordions = initAccordions2;
                if (typeof window !== "undefined") {
                  window.Accordion = Accordion2;
                  window.initAccordions = initAccordions2;
                }
                exports2["default"] = Accordion2;
              })
            ),
            /***/
            33: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initCarousels = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  defaultPosition: 0,
                  indicators: {
                    items: [],
                    activeClasses: "bg-white dark:bg-gray-800",
                    inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                  },
                  interval: 3e3,
                  onNext: function() {
                  },
                  onPrev: function() {
                  },
                  onChange: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Carousel2 = (
                  /** @class */
                  (function() {
                    function Carousel3(carouselEl, items, options, instanceOptions) {
                      if (carouselEl === void 0) {
                        carouselEl = null;
                      }
                      if (items === void 0) {
                        items = [];
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : carouselEl.id;
                      this._carouselEl = carouselEl;
                      this._items = items;
                      this._options = __assign2(__assign2(__assign2({}, Default2), options), { indicators: __assign2(__assign2({}, Default2.indicators), options.indicators) });
                      this._activeItem = this.getItem(this._options.defaultPosition);
                      this._indicators = this._options.indicators.items;
                      this._intervalDuration = this._options.interval;
                      this._intervalInstance = null;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Carousel", this, this._instanceId, instanceOptions.override);
                    }
                    Carousel3.prototype.init = function() {
                      var _this = this;
                      if (this._items.length && !this._initialized) {
                        this._items.map(function(item) {
                          item.el.classList.add("absolute", "inset-0", "transition-transform", "transform");
                        });
                        if (this.getActiveItem()) {
                          this.slideTo(this.getActiveItem().position);
                        } else {
                          this.slideTo(0);
                        }
                        this._indicators.map(function(indicator, position) {
                          indicator.el.addEventListener("click", function() {
                            _this.slideTo(position);
                          });
                        });
                        this._initialized = true;
                      }
                    };
                    Carousel3.prototype.destroy = function() {
                      if (this._initialized) {
                        this._initialized = false;
                      }
                    };
                    Carousel3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Carousel", this._instanceId);
                    };
                    Carousel3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Carousel3.prototype.getItem = function(position) {
                      return this._items[position];
                    };
                    Carousel3.prototype.slideTo = function(position) {
                      var nextItem = this._items[position];
                      var rotationItems = {
                        left: nextItem.position === 0 ? this._items[this._items.length - 1] : this._items[nextItem.position - 1],
                        middle: nextItem,
                        right: nextItem.position === this._items.length - 1 ? this._items[0] : this._items[nextItem.position + 1]
                      };
                      this._rotate(rotationItems);
                      this._setActiveItem(nextItem);
                      if (this._intervalInstance) {
                        this.pause();
                        this.cycle();
                      }
                      this._options.onChange(this);
                    };
                    Carousel3.prototype.next = function() {
                      var activeItem = this.getActiveItem();
                      var nextItem = null;
                      if (activeItem.position === this._items.length - 1) {
                        nextItem = this._items[0];
                      } else {
                        nextItem = this._items[activeItem.position + 1];
                      }
                      this.slideTo(nextItem.position);
                      this._options.onNext(this);
                    };
                    Carousel3.prototype.prev = function() {
                      var activeItem = this.getActiveItem();
                      var prevItem = null;
                      if (activeItem.position === 0) {
                        prevItem = this._items[this._items.length - 1];
                      } else {
                        prevItem = this._items[activeItem.position - 1];
                      }
                      this.slideTo(prevItem.position);
                      this._options.onPrev(this);
                    };
                    Carousel3.prototype._rotate = function(rotationItems) {
                      this._items.map(function(item) {
                        item.el.classList.add("hidden");
                      });
                      if (this._items.length === 1) {
                        rotationItems.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10");
                        rotationItems.middle.el.classList.add("translate-x-0", "z-20");
                        return;
                      }
                      rotationItems.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20");
                      rotationItems.left.el.classList.add("-translate-x-full", "z-10");
                      rotationItems.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10");
                      rotationItems.middle.el.classList.add("translate-x-0", "z-30");
                      rotationItems.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-30");
                      rotationItems.right.el.classList.add("translate-x-full", "z-20");
                    };
                    Carousel3.prototype.cycle = function() {
                      var _this = this;
                      if (typeof window !== "undefined") {
                        this._intervalInstance = window.setInterval(function() {
                          _this.next();
                        }, this._intervalDuration);
                      }
                    };
                    Carousel3.prototype.pause = function() {
                      clearInterval(this._intervalInstance);
                    };
                    Carousel3.prototype.getActiveItem = function() {
                      return this._activeItem;
                    };
                    Carousel3.prototype._setActiveItem = function(item) {
                      var _a, _b;
                      var _this = this;
                      this._activeItem = item;
                      var position = item.position;
                      if (this._indicators.length) {
                        this._indicators.map(function(indicator) {
                          var _a2, _b2;
                          indicator.el.setAttribute("aria-current", "false");
                          (_a2 = indicator.el.classList).remove.apply(_a2, _this._options.indicators.activeClasses.split(" "));
                          (_b2 = indicator.el.classList).add.apply(_b2, _this._options.indicators.inactiveClasses.split(" "));
                        });
                        (_a = this._indicators[position].el.classList).add.apply(_a, this._options.indicators.activeClasses.split(" "));
                        (_b = this._indicators[position].el.classList).remove.apply(_b, this._options.indicators.inactiveClasses.split(" "));
                        this._indicators[position].el.setAttribute("aria-current", "true");
                      }
                    };
                    Carousel3.prototype.updateOnNext = function(callback) {
                      this._options.onNext = callback;
                    };
                    Carousel3.prototype.updateOnPrev = function(callback) {
                      this._options.onPrev = callback;
                    };
                    Carousel3.prototype.updateOnChange = function(callback) {
                      this._options.onChange = callback;
                    };
                    return Carousel3;
                  })()
                );
                function initCarousels2() {
                  document.querySelectorAll("[data-carousel]").forEach(function($carouselEl) {
                    var interval = $carouselEl.getAttribute("data-carousel-interval");
                    var slide = $carouselEl.getAttribute("data-carousel") === "slide" ? true : false;
                    var items = [];
                    var defaultPosition = 0;
                    if ($carouselEl.querySelectorAll("[data-carousel-item]").length) {
                      Array.from($carouselEl.querySelectorAll("[data-carousel-item]")).map(function($carouselItemEl, position) {
                        items.push({
                          position,
                          el: $carouselItemEl
                        });
                        if ($carouselItemEl.getAttribute("data-carousel-item") === "active") {
                          defaultPosition = position;
                        }
                      });
                    }
                    var indicators = [];
                    if ($carouselEl.querySelectorAll("[data-carousel-slide-to]").length) {
                      Array.from($carouselEl.querySelectorAll("[data-carousel-slide-to]")).map(function($indicatorEl) {
                        indicators.push({
                          position: parseInt($indicatorEl.getAttribute("data-carousel-slide-to")),
                          el: $indicatorEl
                        });
                      });
                    }
                    var carousel = new Carousel2($carouselEl, items, {
                      defaultPosition,
                      indicators: {
                        items: indicators
                      },
                      interval: interval ? interval : Default2.interval
                    });
                    if (slide) {
                      carousel.cycle();
                    }
                    var carouselNextEl = $carouselEl.querySelector("[data-carousel-next]");
                    var carouselPrevEl = $carouselEl.querySelector("[data-carousel-prev]");
                    if (carouselNextEl) {
                      carouselNextEl.addEventListener("click", function() {
                        carousel.next();
                      });
                    }
                    if (carouselPrevEl) {
                      carouselPrevEl.addEventListener("click", function() {
                        carousel.prev();
                      });
                    }
                  });
                }
                exports2.initCarousels = initCarousels2;
                if (typeof window !== "undefined") {
                  window.Carousel = Carousel2;
                  window.initCarousels = initCarousels2;
                }
                exports2["default"] = Carousel2;
              })
            ),
            /***/
            673: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initCopyClipboards = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  htmlEntities: false,
                  contentType: "input",
                  onCopy: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var CopyClipboard2 = (
                  /** @class */
                  (function() {
                    function CopyClipboard3(triggerEl, targetEl, options, instanceOptions) {
                      if (triggerEl === void 0) {
                        triggerEl = null;
                      }
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._triggerEl = triggerEl;
                      this._targetEl = targetEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("CopyClipboard", this, this._instanceId, instanceOptions.override);
                    }
                    CopyClipboard3.prototype.init = function() {
                      var _this = this;
                      if (this._targetEl && this._triggerEl && !this._initialized) {
                        this._triggerElClickHandler = function() {
                          _this.copy();
                        };
                        if (this._triggerEl) {
                          this._triggerEl.addEventListener("click", this._triggerElClickHandler);
                        }
                        this._initialized = true;
                      }
                    };
                    CopyClipboard3.prototype.destroy = function() {
                      if (this._triggerEl && this._targetEl && this._initialized) {
                        if (this._triggerEl) {
                          this._triggerEl.removeEventListener("click", this._triggerElClickHandler);
                        }
                        this._initialized = false;
                      }
                    };
                    CopyClipboard3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("CopyClipboard", this._instanceId);
                    };
                    CopyClipboard3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    CopyClipboard3.prototype.getTargetValue = function() {
                      if (this._options.contentType === "input") {
                        return this._targetEl.value;
                      }
                      if (this._options.contentType === "innerHTML") {
                        return this._targetEl.innerHTML;
                      }
                      if (this._options.contentType === "textContent") {
                        return this._targetEl.textContent.replace(/\s+/g, " ").trim();
                      }
                    };
                    CopyClipboard3.prototype.copy = function() {
                      var textToCopy = this.getTargetValue();
                      if (this._options.htmlEntities) {
                        textToCopy = this.decodeHTML(textToCopy);
                      }
                      var tempTextArea = document.createElement("textarea");
                      tempTextArea.value = textToCopy;
                      document.body.appendChild(tempTextArea);
                      tempTextArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(tempTextArea);
                      this._options.onCopy(this);
                      return textToCopy;
                    };
                    CopyClipboard3.prototype.decodeHTML = function(html) {
                      var textarea = document.createElement("textarea");
                      textarea.innerHTML = html;
                      return textarea.textContent;
                    };
                    CopyClipboard3.prototype.updateOnCopyCallback = function(callback) {
                      this._options.onCopy = callback;
                    };
                    return CopyClipboard3;
                  })()
                );
                function initCopyClipboards2() {
                  document.querySelectorAll("[data-copy-to-clipboard-target]").forEach(function($triggerEl) {
                    var targetId = $triggerEl.getAttribute("data-copy-to-clipboard-target");
                    var $targetEl = document.getElementById(targetId);
                    var contentType = $triggerEl.getAttribute("data-copy-to-clipboard-content-type");
                    var htmlEntities = $triggerEl.getAttribute("data-copy-to-clipboard-html-entities");
                    if ($targetEl) {
                      if (!instances_1.default.instanceExists("CopyClipboard", $targetEl.getAttribute("id"))) {
                        new CopyClipboard2($triggerEl, $targetEl, {
                          htmlEntities: htmlEntities && htmlEntities === "true" ? true : Default2.htmlEntities,
                          contentType: contentType ? contentType : Default2.contentType
                        });
                      }
                    } else {
                    }
                  });
                }
                exports2.initCopyClipboards = initCopyClipboards2;
                if (typeof window !== "undefined") {
                  window.CopyClipboard = CopyClipboard2;
                  window.initClipboards = initCopyClipboards2;
                }
                exports2["default"] = CopyClipboard2;
              })
            ),
            /***/
            922: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initCollapses = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  onCollapse: function() {
                  },
                  onExpand: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Collapse2 = (
                  /** @class */
                  (function() {
                    function Collapse3(targetEl, triggerEl, options, instanceOptions) {
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (triggerEl === void 0) {
                        triggerEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._targetEl = targetEl;
                      this._triggerEl = triggerEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._visible = false;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Collapse", this, this._instanceId, instanceOptions.override);
                    }
                    Collapse3.prototype.init = function() {
                      var _this = this;
                      if (this._triggerEl && this._targetEl && !this._initialized) {
                        if (this._triggerEl.hasAttribute("aria-expanded")) {
                          this._visible = this._triggerEl.getAttribute("aria-expanded") === "true";
                        } else {
                          this._visible = !this._targetEl.classList.contains("hidden");
                        }
                        this._clickHandler = function() {
                          _this.toggle();
                        };
                        this._triggerEl.addEventListener("click", this._clickHandler);
                        this._initialized = true;
                      }
                    };
                    Collapse3.prototype.destroy = function() {
                      if (this._triggerEl && this._initialized) {
                        this._triggerEl.removeEventListener("click", this._clickHandler);
                        this._initialized = false;
                      }
                    };
                    Collapse3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Collapse", this._instanceId);
                    };
                    Collapse3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Collapse3.prototype.collapse = function() {
                      this._targetEl.classList.add("hidden");
                      if (this._triggerEl) {
                        this._triggerEl.setAttribute("aria-expanded", "false");
                      }
                      this._visible = false;
                      this._options.onCollapse(this);
                    };
                    Collapse3.prototype.expand = function() {
                      this._targetEl.classList.remove("hidden");
                      if (this._triggerEl) {
                        this._triggerEl.setAttribute("aria-expanded", "true");
                      }
                      this._visible = true;
                      this._options.onExpand(this);
                    };
                    Collapse3.prototype.toggle = function() {
                      if (this._visible) {
                        this.collapse();
                      } else {
                        this.expand();
                      }
                      this._options.onToggle(this);
                    };
                    Collapse3.prototype.updateOnCollapse = function(callback) {
                      this._options.onCollapse = callback;
                    };
                    Collapse3.prototype.updateOnExpand = function(callback) {
                      this._options.onExpand = callback;
                    };
                    Collapse3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Collapse3;
                  })()
                );
                function initCollapses2() {
                  document.querySelectorAll("[data-collapse-toggle]").forEach(function($triggerEl) {
                    var targetId = $triggerEl.getAttribute("data-collapse-toggle");
                    var $targetEl = document.getElementById(targetId);
                    if ($targetEl) {
                      if (!instances_1.default.instanceExists("Collapse", $targetEl.getAttribute("id"))) {
                        new Collapse2($targetEl, $triggerEl);
                      } else {
                        new Collapse2($targetEl, $triggerEl, {}, {
                          id: $targetEl.getAttribute("id") + "_" + instances_1.default._generateRandomId()
                        });
                      }
                    } else {
                    }
                  });
                }
                exports2.initCollapses = initCollapses2;
                if (typeof window !== "undefined") {
                  window.Collapse = Collapse2;
                  window.initCollapses = initCollapses2;
                }
                exports2["default"] = Collapse2;
              })
            ),
            /***/
            132: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initDatepickers = void 0;
                var instances_1 = __webpack_require__2(423);
                var flowbite_datepicker_1 = __webpack_require__2(554);
                var Default2 = {
                  defaultDatepickerId: null,
                  autohide: false,
                  format: "mm/dd/yyyy",
                  maxDate: null,
                  minDate: null,
                  orientation: "bottom",
                  buttons: false,
                  autoSelectToday: 0,
                  title: null,
                  language: "en",
                  rangePicker: false,
                  onShow: function() {
                  },
                  onHide: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Datepicker2 = (
                  /** @class */
                  (function() {
                    function Datepicker3(datepickerEl, options, instanceOptions) {
                      if (datepickerEl === void 0) {
                        datepickerEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : datepickerEl.id;
                      this._datepickerEl = datepickerEl;
                      this._datepickerInstance = null;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Datepicker", this, this._instanceId, instanceOptions.override);
                    }
                    Datepicker3.prototype.init = function() {
                      if (this._datepickerEl && !this._initialized) {
                        if (this._options.rangePicker) {
                          this._datepickerInstance = new flowbite_datepicker_1.DateRangePicker(this._datepickerEl, this._getDatepickerOptions(this._options));
                        } else {
                          this._datepickerInstance = new flowbite_datepicker_1.Datepicker(this._datepickerEl, this._getDatepickerOptions(this._options));
                        }
                        this._initialized = true;
                      }
                    };
                    Datepicker3.prototype.destroy = function() {
                      if (this._initialized) {
                        this._initialized = false;
                        this._datepickerInstance.destroy();
                      }
                    };
                    Datepicker3.prototype.removeInstance = function() {
                      this.destroy();
                      instances_1.default.removeInstance("Datepicker", this._instanceId);
                    };
                    Datepicker3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Datepicker3.prototype.getDatepickerInstance = function() {
                      return this._datepickerInstance;
                    };
                    Datepicker3.prototype.getDate = function() {
                      if (this._options.rangePicker && this._datepickerInstance instanceof flowbite_datepicker_1.DateRangePicker) {
                        return this._datepickerInstance.getDates();
                      }
                      if (!this._options.rangePicker && this._datepickerInstance instanceof flowbite_datepicker_1.Datepicker) {
                        return this._datepickerInstance.getDate();
                      }
                    };
                    Datepicker3.prototype.setDate = function(date) {
                      if (this._options.rangePicker && this._datepickerInstance instanceof flowbite_datepicker_1.DateRangePicker) {
                        return this._datepickerInstance.setDates(date);
                      }
                      if (!this._options.rangePicker && this._datepickerInstance instanceof flowbite_datepicker_1.Datepicker) {
                        return this._datepickerInstance.setDate(date);
                      }
                    };
                    Datepicker3.prototype.show = function() {
                      this._datepickerInstance.show();
                      this._options.onShow(this);
                    };
                    Datepicker3.prototype.hide = function() {
                      this._datepickerInstance.hide();
                      this._options.onHide(this);
                    };
                    Datepicker3.prototype._getDatepickerOptions = function(options) {
                      var datepickerOptions = {};
                      if (options.buttons) {
                        datepickerOptions.todayBtn = true;
                        datepickerOptions.clearBtn = true;
                        if (options.autoSelectToday) {
                          datepickerOptions.todayBtnMode = 1;
                        }
                      }
                      if (options.autohide) {
                        datepickerOptions.autohide = true;
                      }
                      if (options.format) {
                        datepickerOptions.format = options.format;
                      }
                      if (options.maxDate) {
                        datepickerOptions.maxDate = options.maxDate;
                      }
                      if (options.minDate) {
                        datepickerOptions.minDate = options.minDate;
                      }
                      if (options.orientation) {
                        datepickerOptions.orientation = options.orientation;
                      }
                      if (options.title) {
                        datepickerOptions.title = options.title;
                      }
                      if (options.language) {
                        datepickerOptions.language = options.language;
                      }
                      return datepickerOptions;
                    };
                    Datepicker3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    Datepicker3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    return Datepicker3;
                  })()
                );
                function initDatepickers2() {
                  document.querySelectorAll("[datepicker], [inline-datepicker], [date-rangepicker]").forEach(function($datepickerEl) {
                    if ($datepickerEl) {
                      var buttons = $datepickerEl.hasAttribute("datepicker-buttons");
                      var autoselectToday = $datepickerEl.hasAttribute("datepicker-autoselect-today");
                      var autohide = $datepickerEl.hasAttribute("datepicker-autohide");
                      var format = $datepickerEl.getAttribute("datepicker-format");
                      var maxDate = $datepickerEl.getAttribute("datepicker-max-date");
                      var minDate = $datepickerEl.getAttribute("datepicker-min-date");
                      var orientation = $datepickerEl.getAttribute("datepicker-orientation");
                      var title = $datepickerEl.getAttribute("datepicker-title");
                      var language = $datepickerEl.getAttribute("datepicker-language");
                      var rangePicker = $datepickerEl.hasAttribute("date-rangepicker");
                      new Datepicker2($datepickerEl, {
                        buttons: buttons ? buttons : Default2.buttons,
                        autoSelectToday: autoselectToday ? autoselectToday : Default2.autoSelectToday,
                        autohide: autohide ? autohide : Default2.autohide,
                        format: format ? format : Default2.format,
                        maxDate: maxDate ? maxDate : Default2.maxDate,
                        minDate: minDate ? minDate : Default2.minDate,
                        orientation: orientation ? orientation : Default2.orientation,
                        title: title ? title : Default2.title,
                        language: language ? language : Default2.language,
                        rangePicker: rangePicker ? rangePicker : Default2.rangePicker
                      });
                    } else {
                    }
                  });
                }
                exports2.initDatepickers = initDatepickers2;
                if (typeof window !== "undefined") {
                  window.Datepicker = Datepicker2;
                  window.initDatepickers = initDatepickers2;
                }
                exports2["default"] = Datepicker2;
              })
            ),
            /***/
            556: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initDials = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  triggerType: "hover",
                  onShow: function() {
                  },
                  onHide: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Dial2 = (
                  /** @class */
                  (function() {
                    function Dial3(parentEl, triggerEl, targetEl, options, instanceOptions) {
                      if (parentEl === void 0) {
                        parentEl = null;
                      }
                      if (triggerEl === void 0) {
                        triggerEl = null;
                      }
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._parentEl = parentEl;
                      this._triggerEl = triggerEl;
                      this._targetEl = targetEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._visible = false;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Dial", this, this._instanceId, instanceOptions.override);
                    }
                    Dial3.prototype.init = function() {
                      var _this = this;
                      if (this._triggerEl && this._targetEl && !this._initialized) {
                        var triggerEventTypes = this._getTriggerEventTypes(this._options.triggerType);
                        this._showEventHandler = function() {
                          _this.show();
                        };
                        triggerEventTypes.showEvents.forEach(function(ev) {
                          _this._triggerEl.addEventListener(ev, _this._showEventHandler);
                          _this._targetEl.addEventListener(ev, _this._showEventHandler);
                        });
                        this._hideEventHandler = function() {
                          if (!_this._parentEl.matches(":hover")) {
                            _this.hide();
                          }
                        };
                        triggerEventTypes.hideEvents.forEach(function(ev) {
                          _this._parentEl.addEventListener(ev, _this._hideEventHandler);
                        });
                        this._initialized = true;
                      }
                    };
                    Dial3.prototype.destroy = function() {
                      var _this = this;
                      if (this._initialized) {
                        var triggerEventTypes = this._getTriggerEventTypes(this._options.triggerType);
                        triggerEventTypes.showEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._showEventHandler);
                          _this._targetEl.removeEventListener(ev, _this._showEventHandler);
                        });
                        triggerEventTypes.hideEvents.forEach(function(ev) {
                          _this._parentEl.removeEventListener(ev, _this._hideEventHandler);
                        });
                        this._initialized = false;
                      }
                    };
                    Dial3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Dial", this._instanceId);
                    };
                    Dial3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Dial3.prototype.hide = function() {
                      this._targetEl.classList.add("hidden");
                      if (this._triggerEl) {
                        this._triggerEl.setAttribute("aria-expanded", "false");
                      }
                      this._visible = false;
                      this._options.onHide(this);
                    };
                    Dial3.prototype.show = function() {
                      this._targetEl.classList.remove("hidden");
                      if (this._triggerEl) {
                        this._triggerEl.setAttribute("aria-expanded", "true");
                      }
                      this._visible = true;
                      this._options.onShow(this);
                    };
                    Dial3.prototype.toggle = function() {
                      if (this._visible) {
                        this.hide();
                      } else {
                        this.show();
                      }
                    };
                    Dial3.prototype.isHidden = function() {
                      return !this._visible;
                    };
                    Dial3.prototype.isVisible = function() {
                      return this._visible;
                    };
                    Dial3.prototype._getTriggerEventTypes = function(triggerType) {
                      switch (triggerType) {
                        case "hover":
                          return {
                            showEvents: ["mouseenter", "focus"],
                            hideEvents: ["mouseleave", "blur"]
                          };
                        case "click":
                          return {
                            showEvents: ["click", "focus"],
                            hideEvents: ["focusout", "blur"]
                          };
                        case "none":
                          return {
                            showEvents: [],
                            hideEvents: []
                          };
                        default:
                          return {
                            showEvents: ["mouseenter", "focus"],
                            hideEvents: ["mouseleave", "blur"]
                          };
                      }
                    };
                    Dial3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    Dial3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    Dial3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Dial3;
                  })()
                );
                function initDials2() {
                  document.querySelectorAll("[data-dial-init]").forEach(function($parentEl) {
                    var $triggerEl = $parentEl.querySelector("[data-dial-toggle]");
                    if ($triggerEl) {
                      var dialId = $triggerEl.getAttribute("data-dial-toggle");
                      var $dialEl = document.getElementById(dialId);
                      if ($dialEl) {
                        var triggerType = $triggerEl.getAttribute("data-dial-trigger");
                        new Dial2($parentEl, $triggerEl, $dialEl, {
                          triggerType: triggerType ? triggerType : Default2.triggerType
                        });
                      } else {
                      }
                    } else {
                    }
                  });
                }
                exports2.initDials = initDials2;
                if (typeof window !== "undefined") {
                  window.Dial = Dial2;
                  window.initDials = initDials2;
                }
                exports2["default"] = Dial2;
              })
            ),
            /***/
            791: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initDismisses = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  transition: "transition-opacity",
                  duration: 300,
                  timing: "ease-out",
                  onHide: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Dismiss2 = (
                  /** @class */
                  (function() {
                    function Dismiss3(targetEl, triggerEl, options, instanceOptions) {
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (triggerEl === void 0) {
                        triggerEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._targetEl = targetEl;
                      this._triggerEl = triggerEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Dismiss", this, this._instanceId, instanceOptions.override);
                    }
                    Dismiss3.prototype.init = function() {
                      var _this = this;
                      if (this._triggerEl && this._targetEl && !this._initialized) {
                        this._clickHandler = function() {
                          _this.hide();
                        };
                        this._triggerEl.addEventListener("click", this._clickHandler);
                        this._initialized = true;
                      }
                    };
                    Dismiss3.prototype.destroy = function() {
                      if (this._triggerEl && this._initialized) {
                        this._triggerEl.removeEventListener("click", this._clickHandler);
                        this._initialized = false;
                      }
                    };
                    Dismiss3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Dismiss", this._instanceId);
                    };
                    Dismiss3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Dismiss3.prototype.hide = function() {
                      var _this = this;
                      this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0");
                      setTimeout(function() {
                        _this._targetEl.classList.add("hidden");
                      }, this._options.duration);
                      this._options.onHide(this, this._targetEl);
                    };
                    Dismiss3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    return Dismiss3;
                  })()
                );
                function initDismisses2() {
                  document.querySelectorAll("[data-dismiss-target]").forEach(function($triggerEl) {
                    var targetId = $triggerEl.getAttribute("data-dismiss-target");
                    var $dismissEl = document.querySelector(targetId);
                    if ($dismissEl) {
                      new Dismiss2($dismissEl, $triggerEl);
                    } else {
                    }
                  });
                }
                exports2.initDismisses = initDismisses2;
                if (typeof window !== "undefined") {
                  window.Dismiss = Dismiss2;
                  window.initDismisses = initDismisses2;
                }
                exports2["default"] = Dismiss2;
              })
            ),
            /***/
            340: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initDrawers = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  placement: "left",
                  bodyScrolling: false,
                  backdrop: true,
                  edge: false,
                  edgeOffset: "bottom-[60px]",
                  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
                  onShow: function() {
                  },
                  onHide: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Drawer2 = (
                  /** @class */
                  (function() {
                    function Drawer3(targetEl, options, instanceOptions) {
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._eventListenerInstances = [];
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._targetEl = targetEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._visible = false;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Drawer", this, this._instanceId, instanceOptions.override);
                    }
                    Drawer3.prototype.init = function() {
                      var _this = this;
                      if (this._targetEl && !this._initialized) {
                        this._targetEl.setAttribute("aria-hidden", "true");
                        this._targetEl.classList.add("transition-transform");
                        this._getPlacementClasses(this._options.placement).base.map(function(c) {
                          _this._targetEl.classList.add(c);
                        });
                        this._handleEscapeKey = function(event) {
                          if (event.key === "Escape") {
                            if (_this.isVisible()) {
                              _this.hide();
                            }
                          }
                        };
                        document.addEventListener("keydown", this._handleEscapeKey);
                        this._initialized = true;
                      }
                    };
                    Drawer3.prototype.destroy = function() {
                      if (this._initialized) {
                        this.removeAllEventListenerInstances();
                        this._destroyBackdropEl();
                        document.removeEventListener("keydown", this._handleEscapeKey);
                        this._initialized = false;
                      }
                    };
                    Drawer3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Drawer", this._instanceId);
                    };
                    Drawer3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Drawer3.prototype.hide = function() {
                      var _this = this;
                      if (this._options.edge) {
                        this._getPlacementClasses(this._options.placement + "-edge").active.map(function(c) {
                          _this._targetEl.classList.remove(c);
                        });
                        this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(c) {
                          _this._targetEl.classList.add(c);
                        });
                      } else {
                        this._getPlacementClasses(this._options.placement).active.map(function(c) {
                          _this._targetEl.classList.remove(c);
                        });
                        this._getPlacementClasses(this._options.placement).inactive.map(function(c) {
                          _this._targetEl.classList.add(c);
                        });
                      }
                      this._targetEl.setAttribute("aria-hidden", "true");
                      this._targetEl.removeAttribute("aria-modal");
                      this._targetEl.removeAttribute("role");
                      if (!this._options.bodyScrolling) {
                        document.body.classList.remove("overflow-hidden");
                      }
                      if (this._options.backdrop) {
                        this._destroyBackdropEl();
                      }
                      this._visible = false;
                      this._options.onHide(this);
                    };
                    Drawer3.prototype.show = function() {
                      var _this = this;
                      if (this._options.edge) {
                        this._getPlacementClasses(this._options.placement + "-edge").active.map(function(c) {
                          _this._targetEl.classList.add(c);
                        });
                        this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(c) {
                          _this._targetEl.classList.remove(c);
                        });
                      } else {
                        this._getPlacementClasses(this._options.placement).active.map(function(c) {
                          _this._targetEl.classList.add(c);
                        });
                        this._getPlacementClasses(this._options.placement).inactive.map(function(c) {
                          _this._targetEl.classList.remove(c);
                        });
                      }
                      this._targetEl.setAttribute("aria-modal", "true");
                      this._targetEl.setAttribute("role", "dialog");
                      this._targetEl.removeAttribute("aria-hidden");
                      if (!this._options.bodyScrolling) {
                        document.body.classList.add("overflow-hidden");
                      }
                      if (this._options.backdrop) {
                        this._createBackdrop();
                      }
                      this._visible = true;
                      this._options.onShow(this);
                    };
                    Drawer3.prototype.toggle = function() {
                      if (this.isVisible()) {
                        this.hide();
                      } else {
                        this.show();
                      }
                    };
                    Drawer3.prototype._createBackdrop = function() {
                      var _a;
                      var _this = this;
                      if (!this._visible) {
                        var backdropEl = document.createElement("div");
                        backdropEl.setAttribute("drawer-backdrop", "");
                        (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(" "));
                        document.querySelector("body").append(backdropEl);
                        backdropEl.addEventListener("click", function() {
                          _this.hide();
                        });
                      }
                    };
                    Drawer3.prototype._destroyBackdropEl = function() {
                      if (this._visible && document.querySelector("[drawer-backdrop]") !== null) {
                        document.querySelector("[drawer-backdrop]").remove();
                      }
                    };
                    Drawer3.prototype._getPlacementClasses = function(placement) {
                      switch (placement) {
                        case "top":
                          return {
                            base: ["top-0", "left-0", "right-0"],
                            active: ["transform-none"],
                            inactive: ["-translate-y-full"]
                          };
                        case "right":
                          return {
                            base: ["right-0", "top-0"],
                            active: ["transform-none"],
                            inactive: ["translate-x-full"]
                          };
                        case "bottom":
                          return {
                            base: ["bottom-0", "left-0", "right-0"],
                            active: ["transform-none"],
                            inactive: ["translate-y-full"]
                          };
                        case "left":
                          return {
                            base: ["left-0", "top-0"],
                            active: ["transform-none"],
                            inactive: ["-translate-x-full"]
                          };
                        case "bottom-edge":
                          return {
                            base: ["left-0", "top-0"],
                            active: ["transform-none"],
                            inactive: ["translate-y-full", this._options.edgeOffset]
                          };
                        default:
                          return {
                            base: ["left-0", "top-0"],
                            active: ["transform-none"],
                            inactive: ["-translate-x-full"]
                          };
                      }
                    };
                    Drawer3.prototype.isHidden = function() {
                      return !this._visible;
                    };
                    Drawer3.prototype.isVisible = function() {
                      return this._visible;
                    };
                    Drawer3.prototype.addEventListenerInstance = function(element, type, handler) {
                      this._eventListenerInstances.push({
                        element,
                        type,
                        handler
                      });
                    };
                    Drawer3.prototype.removeAllEventListenerInstances = function() {
                      this._eventListenerInstances.map(function(eventListenerInstance) {
                        eventListenerInstance.element.removeEventListener(eventListenerInstance.type, eventListenerInstance.handler);
                      });
                      this._eventListenerInstances = [];
                    };
                    Drawer3.prototype.getAllEventListenerInstances = function() {
                      return this._eventListenerInstances;
                    };
                    Drawer3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    Drawer3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    Drawer3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Drawer3;
                  })()
                );
                function initDrawers2() {
                  document.querySelectorAll("[data-drawer-target]").forEach(function($triggerEl) {
                    var drawerId = $triggerEl.getAttribute("data-drawer-target");
                    var $drawerEl = document.getElementById(drawerId);
                    if ($drawerEl) {
                      var placement = $triggerEl.getAttribute("data-drawer-placement");
                      var bodyScrolling = $triggerEl.getAttribute("data-drawer-body-scrolling");
                      var backdrop = $triggerEl.getAttribute("data-drawer-backdrop");
                      var edge = $triggerEl.getAttribute("data-drawer-edge");
                      var edgeOffset = $triggerEl.getAttribute("data-drawer-edge-offset");
                      new Drawer2($drawerEl, {
                        placement: placement ? placement : Default2.placement,
                        bodyScrolling: bodyScrolling ? bodyScrolling === "true" ? true : false : Default2.bodyScrolling,
                        backdrop: backdrop ? backdrop === "true" ? true : false : Default2.backdrop,
                        edge: edge ? edge === "true" ? true : false : Default2.edge,
                        edgeOffset: edgeOffset ? edgeOffset : Default2.edgeOffset
                      });
                    } else {
                    }
                  });
                  document.querySelectorAll("[data-drawer-toggle]").forEach(function($triggerEl) {
                    var drawerId = $triggerEl.getAttribute("data-drawer-toggle");
                    var $drawerEl = document.getElementById(drawerId);
                    if ($drawerEl) {
                      var drawer_1 = instances_1.default.getInstance("Drawer", drawerId);
                      if (drawer_1) {
                        var toggleDrawer = function() {
                          drawer_1.toggle();
                        };
                        $triggerEl.addEventListener("click", toggleDrawer);
                        drawer_1.addEventListenerInstance($triggerEl, "click", toggleDrawer);
                      } else {
                      }
                    } else {
                    }
                  });
                  document.querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]").forEach(function($triggerEl) {
                    var drawerId = $triggerEl.getAttribute("data-drawer-dismiss") ? $triggerEl.getAttribute("data-drawer-dismiss") : $triggerEl.getAttribute("data-drawer-hide");
                    var $drawerEl = document.getElementById(drawerId);
                    if ($drawerEl) {
                      var drawer_2 = instances_1.default.getInstance("Drawer", drawerId);
                      if (drawer_2) {
                        var hideDrawer = function() {
                          drawer_2.hide();
                        };
                        $triggerEl.addEventListener("click", hideDrawer);
                        drawer_2.addEventListenerInstance($triggerEl, "click", hideDrawer);
                      } else {
                      }
                    } else {
                    }
                  });
                  document.querySelectorAll("[data-drawer-show]").forEach(function($triggerEl) {
                    var drawerId = $triggerEl.getAttribute("data-drawer-show");
                    var $drawerEl = document.getElementById(drawerId);
                    if ($drawerEl) {
                      var drawer_3 = instances_1.default.getInstance("Drawer", drawerId);
                      if (drawer_3) {
                        var showDrawer = function() {
                          drawer_3.show();
                        };
                        $triggerEl.addEventListener("click", showDrawer);
                        drawer_3.addEventListenerInstance($triggerEl, "click", showDrawer);
                      } else {
                      }
                    } else {
                    }
                  });
                }
                exports2.initDrawers = initDrawers2;
                if (typeof window !== "undefined") {
                  window.Drawer = Drawer2;
                  window.initDrawers = initDrawers2;
                }
                exports2["default"] = Drawer2;
              })
            ),
            /***/
            316: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                var __spreadArray2 = this && this.__spreadArray || function(to2, from, pack) {
                  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar2; i < l; i++) {
                    if (ar2 || !(i in from)) {
                      if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i);
                      ar2[i] = from[i];
                    }
                  }
                  return to2.concat(ar2 || Array.prototype.slice.call(from));
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initDropdowns = void 0;
                var core_1 = __webpack_require__2(853);
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  placement: "bottom",
                  triggerType: "click",
                  offsetSkidding: 0,
                  offsetDistance: 10,
                  delay: 300,
                  ignoreClickOutsideClass: false,
                  onShow: function() {
                  },
                  onHide: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Dropdown2 = (
                  /** @class */
                  (function() {
                    function Dropdown3(targetElement, triggerElement, options, instanceOptions) {
                      if (targetElement === void 0) {
                        targetElement = null;
                      }
                      if (triggerElement === void 0) {
                        triggerElement = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetElement.id;
                      this._targetEl = targetElement;
                      this._triggerEl = triggerElement;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._popperInstance = null;
                      this._visible = false;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Dropdown", this, this._instanceId, instanceOptions.override);
                    }
                    Dropdown3.prototype.init = function() {
                      if (this._triggerEl && this._targetEl && !this._initialized) {
                        this._popperInstance = this._createPopperInstance();
                        this._setupEventListeners();
                        this._initialized = true;
                      }
                    };
                    Dropdown3.prototype.destroy = function() {
                      var _this = this;
                      var triggerEvents = this._getTriggerEvents();
                      if (this._options.triggerType === "click") {
                        triggerEvents.showEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._clickHandler);
                        });
                      }
                      if (this._options.triggerType === "hover") {
                        triggerEvents.showEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._hoverShowTriggerElHandler);
                          _this._targetEl.removeEventListener(ev, _this._hoverShowTargetElHandler);
                        });
                        triggerEvents.hideEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._hoverHideHandler);
                          _this._targetEl.removeEventListener(ev, _this._hoverHideHandler);
                        });
                      }
                      this._popperInstance.destroy();
                      this._initialized = false;
                    };
                    Dropdown3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Dropdown", this._instanceId);
                    };
                    Dropdown3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Dropdown3.prototype._setupEventListeners = function() {
                      var _this = this;
                      var triggerEvents = this._getTriggerEvents();
                      this._clickHandler = function() {
                        _this.toggle();
                      };
                      if (this._options.triggerType === "click") {
                        triggerEvents.showEvents.forEach(function(ev) {
                          _this._triggerEl.addEventListener(ev, _this._clickHandler);
                        });
                      }
                      this._hoverShowTriggerElHandler = function(ev) {
                        if (ev.type === "click") {
                          _this.toggle();
                        } else {
                          setTimeout(function() {
                            _this.show();
                          }, _this._options.delay);
                        }
                      };
                      this._hoverShowTargetElHandler = function() {
                        _this.show();
                      };
                      this._hoverHideHandler = function() {
                        setTimeout(function() {
                          if (!_this._targetEl.matches(":hover")) {
                            _this.hide();
                          }
                        }, _this._options.delay);
                      };
                      if (this._options.triggerType === "hover") {
                        triggerEvents.showEvents.forEach(function(ev) {
                          _this._triggerEl.addEventListener(ev, _this._hoverShowTriggerElHandler);
                          _this._targetEl.addEventListener(ev, _this._hoverShowTargetElHandler);
                        });
                        triggerEvents.hideEvents.forEach(function(ev) {
                          _this._triggerEl.addEventListener(ev, _this._hoverHideHandler);
                          _this._targetEl.addEventListener(ev, _this._hoverHideHandler);
                        });
                      }
                    };
                    Dropdown3.prototype._createPopperInstance = function() {
                      return (0, core_1.createPopper)(this._triggerEl, this._targetEl, {
                        placement: this._options.placement,
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [
                                this._options.offsetSkidding,
                                this._options.offsetDistance
                              ]
                            }
                          }
                        ]
                      });
                    };
                    Dropdown3.prototype._setupClickOutsideListener = function() {
                      var _this = this;
                      this._clickOutsideEventListener = function(ev) {
                        _this._handleClickOutside(ev, _this._targetEl);
                      };
                      document.body.addEventListener("click", this._clickOutsideEventListener, true);
                    };
                    Dropdown3.prototype._removeClickOutsideListener = function() {
                      document.body.removeEventListener("click", this._clickOutsideEventListener, true);
                    };
                    Dropdown3.prototype._handleClickOutside = function(ev, targetEl) {
                      var clickedEl = ev.target;
                      var ignoreClickOutsideClass = this._options.ignoreClickOutsideClass;
                      var isIgnored = false;
                      if (ignoreClickOutsideClass) {
                        var ignoredClickOutsideEls = document.querySelectorAll(".".concat(ignoreClickOutsideClass));
                        ignoredClickOutsideEls.forEach(function(el) {
                          if (el.contains(clickedEl)) {
                            isIgnored = true;
                            return;
                          }
                        });
                      }
                      if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && !isIgnored && this.isVisible()) {
                        this.hide();
                      }
                    };
                    Dropdown3.prototype._getTriggerEvents = function() {
                      switch (this._options.triggerType) {
                        case "hover":
                          return {
                            showEvents: ["mouseenter", "click"],
                            hideEvents: ["mouseleave"]
                          };
                        case "click":
                          return {
                            showEvents: ["click"],
                            hideEvents: []
                          };
                        case "none":
                          return {
                            showEvents: [],
                            hideEvents: []
                          };
                        default:
                          return {
                            showEvents: ["click"],
                            hideEvents: []
                          };
                      }
                    };
                    Dropdown3.prototype.toggle = function() {
                      if (this.isVisible()) {
                        this.hide();
                      } else {
                        this.show();
                      }
                      this._options.onToggle(this);
                    };
                    Dropdown3.prototype.isVisible = function() {
                      return this._visible;
                    };
                    Dropdown3.prototype.show = function() {
                      this._targetEl.classList.remove("hidden");
                      this._targetEl.classList.add("block");
                      this._targetEl.removeAttribute("aria-hidden");
                      this._popperInstance.setOptions(function(options) {
                        return __assign2(__assign2({}, options), { modifiers: __spreadArray2(__spreadArray2([], options.modifiers, true), [
                          { name: "eventListeners", enabled: true }
                        ], false) });
                      });
                      this._setupClickOutsideListener();
                      this._popperInstance.update();
                      this._visible = true;
                      this._options.onShow(this);
                    };
                    Dropdown3.prototype.hide = function() {
                      this._targetEl.classList.remove("block");
                      this._targetEl.classList.add("hidden");
                      this._targetEl.setAttribute("aria-hidden", "true");
                      this._popperInstance.setOptions(function(options) {
                        return __assign2(__assign2({}, options), { modifiers: __spreadArray2(__spreadArray2([], options.modifiers, true), [
                          { name: "eventListeners", enabled: false }
                        ], false) });
                      });
                      this._visible = false;
                      this._removeClickOutsideListener();
                      this._options.onHide(this);
                    };
                    Dropdown3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    Dropdown3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    Dropdown3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Dropdown3;
                  })()
                );
                function initDropdowns2() {
                  document.querySelectorAll("[data-dropdown-toggle]").forEach(function($triggerEl) {
                    var dropdownId = $triggerEl.getAttribute("data-dropdown-toggle");
                    var $dropdownEl = document.getElementById(dropdownId);
                    if ($dropdownEl) {
                      var placement = $triggerEl.getAttribute("data-dropdown-placement");
                      var offsetSkidding = $triggerEl.getAttribute("data-dropdown-offset-skidding");
                      var offsetDistance = $triggerEl.getAttribute("data-dropdown-offset-distance");
                      var triggerType = $triggerEl.getAttribute("data-dropdown-trigger");
                      var delay = $triggerEl.getAttribute("data-dropdown-delay");
                      var ignoreClickOutsideClass = $triggerEl.getAttribute("data-dropdown-ignore-click-outside-class");
                      new Dropdown2($dropdownEl, $triggerEl, {
                        placement: placement ? placement : Default2.placement,
                        triggerType: triggerType ? triggerType : Default2.triggerType,
                        offsetSkidding: offsetSkidding ? parseInt(offsetSkidding) : Default2.offsetSkidding,
                        offsetDistance: offsetDistance ? parseInt(offsetDistance) : Default2.offsetDistance,
                        delay: delay ? parseInt(delay) : Default2.delay,
                        ignoreClickOutsideClass: ignoreClickOutsideClass ? ignoreClickOutsideClass : Default2.ignoreClickOutsideClass
                      });
                    } else {
                    }
                  });
                }
                exports2.initDropdowns = initDropdowns2;
                if (typeof window !== "undefined") {
                  window.Dropdown = Dropdown2;
                  window.initDropdowns = initDropdowns2;
                }
                exports2["default"] = Dropdown2;
              })
            ),
            /***/
            311: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initFlowbite = void 0;
                var accordion_1 = __webpack_require__2(902);
                var carousel_1 = __webpack_require__2(33);
                var clipboard_1 = __webpack_require__2(673);
                var collapse_1 = __webpack_require__2(922);
                var dial_1 = __webpack_require__2(556);
                var dismiss_1 = __webpack_require__2(791);
                var drawer_1 = __webpack_require__2(340);
                var dropdown_1 = __webpack_require__2(316);
                var input_counter_1 = __webpack_require__2(656);
                var modal_1 = __webpack_require__2(16);
                var popover_1 = __webpack_require__2(903);
                var tabs_1 = __webpack_require__2(247);
                var tooltip_1 = __webpack_require__2(671);
                var datepicker_1 = __webpack_require__2(132);
                function initFlowbite2() {
                  (0, accordion_1.initAccordions)();
                  (0, collapse_1.initCollapses)();
                  (0, carousel_1.initCarousels)();
                  (0, dismiss_1.initDismisses)();
                  (0, dropdown_1.initDropdowns)();
                  (0, modal_1.initModals)();
                  (0, drawer_1.initDrawers)();
                  (0, tabs_1.initTabs)();
                  (0, tooltip_1.initTooltips)();
                  (0, popover_1.initPopovers)();
                  (0, dial_1.initDials)();
                  (0, input_counter_1.initInputCounters)();
                  (0, clipboard_1.initCopyClipboards)();
                  (0, datepicker_1.initDatepickers)();
                }
                exports2.initFlowbite = initFlowbite2;
                if (typeof window !== "undefined") {
                  window.initFlowbite = initFlowbite2;
                }
              })
            ),
            /***/
            656: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initInputCounters = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  minValue: null,
                  maxValue: null,
                  onIncrement: function() {
                  },
                  onDecrement: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var InputCounter2 = (
                  /** @class */
                  (function() {
                    function InputCounter3(targetEl, incrementEl, decrementEl, options, instanceOptions) {
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (incrementEl === void 0) {
                        incrementEl = null;
                      }
                      if (decrementEl === void 0) {
                        decrementEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._targetEl = targetEl;
                      this._incrementEl = incrementEl;
                      this._decrementEl = decrementEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("InputCounter", this, this._instanceId, instanceOptions.override);
                    }
                    InputCounter3.prototype.init = function() {
                      var _this = this;
                      if (this._targetEl && !this._initialized) {
                        this._inputHandler = function(event) {
                          {
                            var target = event.target;
                            if (!/^\d*$/.test(target.value)) {
                              target.value = target.value.replace(/[^\d]/g, "");
                            }
                            if (_this._options.maxValue !== null && parseInt(target.value) > _this._options.maxValue) {
                              target.value = _this._options.maxValue.toString();
                            }
                            if (_this._options.minValue !== null && parseInt(target.value) < _this._options.minValue) {
                              target.value = _this._options.minValue.toString();
                            }
                          }
                        };
                        this._incrementClickHandler = function() {
                          _this.increment();
                        };
                        this._decrementClickHandler = function() {
                          _this.decrement();
                        };
                        this._targetEl.addEventListener("input", this._inputHandler);
                        if (this._incrementEl) {
                          this._incrementEl.addEventListener("click", this._incrementClickHandler);
                        }
                        if (this._decrementEl) {
                          this._decrementEl.addEventListener("click", this._decrementClickHandler);
                        }
                        this._initialized = true;
                      }
                    };
                    InputCounter3.prototype.destroy = function() {
                      if (this._targetEl && this._initialized) {
                        this._targetEl.removeEventListener("input", this._inputHandler);
                        if (this._incrementEl) {
                          this._incrementEl.removeEventListener("click", this._incrementClickHandler);
                        }
                        if (this._decrementEl) {
                          this._decrementEl.removeEventListener("click", this._decrementClickHandler);
                        }
                        this._initialized = false;
                      }
                    };
                    InputCounter3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("InputCounter", this._instanceId);
                    };
                    InputCounter3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    InputCounter3.prototype.getCurrentValue = function() {
                      return parseInt(this._targetEl.value) || 0;
                    };
                    InputCounter3.prototype.increment = function() {
                      if (this._options.maxValue !== null && this.getCurrentValue() >= this._options.maxValue) {
                        return;
                      }
                      this._targetEl.value = (this.getCurrentValue() + 1).toString();
                      this._options.onIncrement(this);
                    };
                    InputCounter3.prototype.decrement = function() {
                      if (this._options.minValue !== null && this.getCurrentValue() <= this._options.minValue) {
                        return;
                      }
                      this._targetEl.value = (this.getCurrentValue() - 1).toString();
                      this._options.onDecrement(this);
                    };
                    InputCounter3.prototype.updateOnIncrement = function(callback) {
                      this._options.onIncrement = callback;
                    };
                    InputCounter3.prototype.updateOnDecrement = function(callback) {
                      this._options.onDecrement = callback;
                    };
                    return InputCounter3;
                  })()
                );
                function initInputCounters2() {
                  document.querySelectorAll("[data-input-counter]").forEach(function($targetEl) {
                    var targetId = $targetEl.id;
                    var $incrementEl = document.querySelector('[data-input-counter-increment="' + targetId + '"]');
                    var $decrementEl = document.querySelector('[data-input-counter-decrement="' + targetId + '"]');
                    var minValue = $targetEl.getAttribute("data-input-counter-min");
                    var maxValue = $targetEl.getAttribute("data-input-counter-max");
                    if ($targetEl) {
                      if (!instances_1.default.instanceExists("InputCounter", $targetEl.getAttribute("id"))) {
                        new InputCounter2($targetEl, $incrementEl ? $incrementEl : null, $decrementEl ? $decrementEl : null, {
                          minValue: minValue ? parseInt(minValue) : null,
                          maxValue: maxValue ? parseInt(maxValue) : null
                        });
                      }
                    } else {
                    }
                  });
                }
                exports2.initInputCounters = initInputCounters2;
                if (typeof window !== "undefined") {
                  window.InputCounter = InputCounter2;
                  window.initInputCounters = initInputCounters2;
                }
                exports2["default"] = InputCounter2;
              })
            ),
            /***/
            16: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initModals = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  placement: "center",
                  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
                  backdrop: "dynamic",
                  closable: true,
                  onHide: function() {
                  },
                  onShow: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Modal2 = (
                  /** @class */
                  (function() {
                    function Modal3(targetEl, options, instanceOptions) {
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._eventListenerInstances = [];
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._targetEl = targetEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._isHidden = true;
                      this._backdropEl = null;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Modal", this, this._instanceId, instanceOptions.override);
                    }
                    Modal3.prototype.init = function() {
                      var _this = this;
                      if (this._targetEl && !this._initialized) {
                        this._getPlacementClasses().map(function(c) {
                          _this._targetEl.classList.add(c);
                        });
                        this._initialized = true;
                      }
                    };
                    Modal3.prototype.destroy = function() {
                      if (this._initialized) {
                        this.removeAllEventListenerInstances();
                        this._destroyBackdropEl();
                        this._initialized = false;
                      }
                    };
                    Modal3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Modal", this._instanceId);
                    };
                    Modal3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Modal3.prototype._createBackdrop = function() {
                      var _a;
                      if (this._isHidden) {
                        var backdropEl = document.createElement("div");
                        (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(" "));
                        document.querySelector("body").append(backdropEl);
                        this._backdropEl = backdropEl;
                      }
                    };
                    Modal3.prototype._destroyBackdropEl = function() {
                      if (!this._isHidden && this._backdropEl) {
                        this._backdropEl.remove();
                        this._backdropEl = null;
                      }
                    };
                    Modal3.prototype._setupModalCloseEventListeners = function() {
                      var _this = this;
                      if (this._options.backdrop === "dynamic") {
                        this._clickOutsideEventListener = function(ev) {
                          _this._handleOutsideClick(ev.target);
                        };
                        this._targetEl.addEventListener("click", this._clickOutsideEventListener, true);
                      }
                      this._keydownEventListener = function(ev) {
                        if (ev.key === "Escape") {
                          _this.hide();
                        }
                      };
                      document.body.addEventListener("keydown", this._keydownEventListener, true);
                    };
                    Modal3.prototype._removeModalCloseEventListeners = function() {
                      if (this._options.backdrop === "dynamic") {
                        this._targetEl.removeEventListener("click", this._clickOutsideEventListener, true);
                      }
                      document.body.removeEventListener("keydown", this._keydownEventListener, true);
                    };
                    Modal3.prototype._handleOutsideClick = function(target) {
                      if (target === this._targetEl || target === this._backdropEl && this.isVisible()) {
                        this.hide();
                      }
                    };
                    Modal3.prototype._getPlacementClasses = function() {
                      switch (this._options.placement) {
                        // top
                        case "top-left":
                          return ["justify-start", "items-start"];
                        case "top-center":
                          return ["justify-center", "items-start"];
                        case "top-right":
                          return ["justify-end", "items-start"];
                        // center
                        case "center-left":
                          return ["justify-start", "items-center"];
                        case "center":
                          return ["justify-center", "items-center"];
                        case "center-right":
                          return ["justify-end", "items-center"];
                        // bottom
                        case "bottom-left":
                          return ["justify-start", "items-end"];
                        case "bottom-center":
                          return ["justify-center", "items-end"];
                        case "bottom-right":
                          return ["justify-end", "items-end"];
                        default:
                          return ["justify-center", "items-center"];
                      }
                    };
                    Modal3.prototype.toggle = function() {
                      if (this._isHidden) {
                        this.show();
                      } else {
                        this.hide();
                      }
                      this._options.onToggle(this);
                    };
                    Modal3.prototype.show = function() {
                      if (this.isHidden) {
                        this._targetEl.classList.add("flex");
                        this._targetEl.classList.remove("hidden");
                        this._targetEl.setAttribute("aria-modal", "true");
                        this._targetEl.setAttribute("role", "dialog");
                        this._targetEl.removeAttribute("aria-hidden");
                        this._createBackdrop();
                        this._isHidden = false;
                        if (this._options.closable) {
                          this._setupModalCloseEventListeners();
                        }
                        document.body.classList.add("overflow-hidden");
                        this._options.onShow(this);
                      }
                    };
                    Modal3.prototype.hide = function() {
                      if (this.isVisible) {
                        this._targetEl.classList.add("hidden");
                        this._targetEl.classList.remove("flex");
                        this._targetEl.setAttribute("aria-hidden", "true");
                        this._targetEl.removeAttribute("aria-modal");
                        this._targetEl.removeAttribute("role");
                        this._destroyBackdropEl();
                        this._isHidden = true;
                        document.body.classList.remove("overflow-hidden");
                        if (this._options.closable) {
                          this._removeModalCloseEventListeners();
                        }
                        this._options.onHide(this);
                      }
                    };
                    Modal3.prototype.isVisible = function() {
                      return !this._isHidden;
                    };
                    Modal3.prototype.isHidden = function() {
                      return this._isHidden;
                    };
                    Modal3.prototype.addEventListenerInstance = function(element, type, handler) {
                      this._eventListenerInstances.push({
                        element,
                        type,
                        handler
                      });
                    };
                    Modal3.prototype.removeAllEventListenerInstances = function() {
                      this._eventListenerInstances.map(function(eventListenerInstance) {
                        eventListenerInstance.element.removeEventListener(eventListenerInstance.type, eventListenerInstance.handler);
                      });
                      this._eventListenerInstances = [];
                    };
                    Modal3.prototype.getAllEventListenerInstances = function() {
                      return this._eventListenerInstances;
                    };
                    Modal3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    Modal3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    Modal3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Modal3;
                  })()
                );
                function initModals2() {
                  document.querySelectorAll("[data-modal-target]").forEach(function($triggerEl) {
                    var modalId = $triggerEl.getAttribute("data-modal-target");
                    var $modalEl = document.getElementById(modalId);
                    if ($modalEl) {
                      var placement = $modalEl.getAttribute("data-modal-placement");
                      var backdrop = $modalEl.getAttribute("data-modal-backdrop");
                      new Modal2($modalEl, {
                        placement: placement ? placement : Default2.placement,
                        backdrop: backdrop ? backdrop : Default2.backdrop
                      });
                    } else {
                    }
                  });
                  document.querySelectorAll("[data-modal-toggle]").forEach(function($triggerEl) {
                    var modalId = $triggerEl.getAttribute("data-modal-toggle");
                    var $modalEl = document.getElementById(modalId);
                    if ($modalEl) {
                      var modal_1 = instances_1.default.getInstance("Modal", modalId);
                      if (modal_1) {
                        var toggleModal = function() {
                          modal_1.toggle();
                        };
                        $triggerEl.addEventListener("click", toggleModal);
                        modal_1.addEventListenerInstance($triggerEl, "click", toggleModal);
                      } else {
                      }
                    } else {
                    }
                  });
                  document.querySelectorAll("[data-modal-show]").forEach(function($triggerEl) {
                    var modalId = $triggerEl.getAttribute("data-modal-show");
                    var $modalEl = document.getElementById(modalId);
                    if ($modalEl) {
                      var modal_2 = instances_1.default.getInstance("Modal", modalId);
                      if (modal_2) {
                        var showModal = function() {
                          modal_2.show();
                        };
                        $triggerEl.addEventListener("click", showModal);
                        modal_2.addEventListenerInstance($triggerEl, "click", showModal);
                      } else {
                      }
                    } else {
                    }
                  });
                  document.querySelectorAll("[data-modal-hide]").forEach(function($triggerEl) {
                    var modalId = $triggerEl.getAttribute("data-modal-hide");
                    var $modalEl = document.getElementById(modalId);
                    if ($modalEl) {
                      var modal_3 = instances_1.default.getInstance("Modal", modalId);
                      if (modal_3) {
                        var hideModal = function() {
                          modal_3.hide();
                        };
                        $triggerEl.addEventListener("click", hideModal);
                        modal_3.addEventListenerInstance($triggerEl, "click", hideModal);
                      } else {
                      }
                    } else {
                    }
                  });
                }
                exports2.initModals = initModals2;
                if (typeof window !== "undefined") {
                  window.Modal = Modal2;
                  window.initModals = initModals2;
                }
                exports2["default"] = Modal2;
              })
            ),
            /***/
            903: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                var __spreadArray2 = this && this.__spreadArray || function(to2, from, pack) {
                  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar2; i < l; i++) {
                    if (ar2 || !(i in from)) {
                      if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i);
                      ar2[i] = from[i];
                    }
                  }
                  return to2.concat(ar2 || Array.prototype.slice.call(from));
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initPopovers = void 0;
                var core_1 = __webpack_require__2(853);
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  placement: "top",
                  offset: 10,
                  triggerType: "hover",
                  onShow: function() {
                  },
                  onHide: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Popover2 = (
                  /** @class */
                  (function() {
                    function Popover3(targetEl, triggerEl, options, instanceOptions) {
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (triggerEl === void 0) {
                        triggerEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._targetEl = targetEl;
                      this._triggerEl = triggerEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._popperInstance = null;
                      this._visible = false;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Popover", this, instanceOptions.id ? instanceOptions.id : this._targetEl.id, instanceOptions.override);
                    }
                    Popover3.prototype.init = function() {
                      if (this._triggerEl && this._targetEl && !this._initialized) {
                        this._setupEventListeners();
                        this._popperInstance = this._createPopperInstance();
                        this._initialized = true;
                      }
                    };
                    Popover3.prototype.destroy = function() {
                      var _this = this;
                      if (this._initialized) {
                        var triggerEvents = this._getTriggerEvents();
                        triggerEvents.showEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._showHandler);
                          _this._targetEl.removeEventListener(ev, _this._showHandler);
                        });
                        triggerEvents.hideEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._hideHandler);
                          _this._targetEl.removeEventListener(ev, _this._hideHandler);
                        });
                        this._removeKeydownListener();
                        this._removeClickOutsideListener();
                        if (this._popperInstance) {
                          this._popperInstance.destroy();
                        }
                        this._initialized = false;
                      }
                    };
                    Popover3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Popover", this._instanceId);
                    };
                    Popover3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Popover3.prototype._setupEventListeners = function() {
                      var _this = this;
                      var triggerEvents = this._getTriggerEvents();
                      this._showHandler = function() {
                        _this.show();
                      };
                      this._hideHandler = function() {
                        setTimeout(function() {
                          if (!_this._targetEl.matches(":hover")) {
                            _this.hide();
                          }
                        }, 100);
                      };
                      triggerEvents.showEvents.forEach(function(ev) {
                        _this._triggerEl.addEventListener(ev, _this._showHandler);
                        _this._targetEl.addEventListener(ev, _this._showHandler);
                      });
                      triggerEvents.hideEvents.forEach(function(ev) {
                        _this._triggerEl.addEventListener(ev, _this._hideHandler);
                        _this._targetEl.addEventListener(ev, _this._hideHandler);
                      });
                    };
                    Popover3.prototype._createPopperInstance = function() {
                      return (0, core_1.createPopper)(this._triggerEl, this._targetEl, {
                        placement: this._options.placement,
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, this._options.offset]
                            }
                          }
                        ]
                      });
                    };
                    Popover3.prototype._getTriggerEvents = function() {
                      switch (this._options.triggerType) {
                        case "hover":
                          return {
                            showEvents: ["mouseenter", "focus"],
                            hideEvents: ["mouseleave", "blur"]
                          };
                        case "click":
                          return {
                            showEvents: ["click", "focus"],
                            hideEvents: ["focusout", "blur"]
                          };
                        case "none":
                          return {
                            showEvents: [],
                            hideEvents: []
                          };
                        default:
                          return {
                            showEvents: ["mouseenter", "focus"],
                            hideEvents: ["mouseleave", "blur"]
                          };
                      }
                    };
                    Popover3.prototype._setupKeydownListener = function() {
                      var _this = this;
                      this._keydownEventListener = function(ev) {
                        if (ev.key === "Escape") {
                          _this.hide();
                        }
                      };
                      document.body.addEventListener("keydown", this._keydownEventListener, true);
                    };
                    Popover3.prototype._removeKeydownListener = function() {
                      document.body.removeEventListener("keydown", this._keydownEventListener, true);
                    };
                    Popover3.prototype._setupClickOutsideListener = function() {
                      var _this = this;
                      this._clickOutsideEventListener = function(ev) {
                        _this._handleClickOutside(ev, _this._targetEl);
                      };
                      document.body.addEventListener("click", this._clickOutsideEventListener, true);
                    };
                    Popover3.prototype._removeClickOutsideListener = function() {
                      document.body.removeEventListener("click", this._clickOutsideEventListener, true);
                    };
                    Popover3.prototype._handleClickOutside = function(ev, targetEl) {
                      var clickedEl = ev.target;
                      if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this.isVisible()) {
                        this.hide();
                      }
                    };
                    Popover3.prototype.isVisible = function() {
                      return this._visible;
                    };
                    Popover3.prototype.toggle = function() {
                      if (this.isVisible()) {
                        this.hide();
                      } else {
                        this.show();
                      }
                      this._options.onToggle(this);
                    };
                    Popover3.prototype.show = function() {
                      this._targetEl.classList.remove("opacity-0", "invisible");
                      this._targetEl.classList.add("opacity-100", "visible");
                      this._popperInstance.setOptions(function(options) {
                        return __assign2(__assign2({}, options), { modifiers: __spreadArray2(__spreadArray2([], options.modifiers, true), [
                          { name: "eventListeners", enabled: true }
                        ], false) });
                      });
                      this._setupClickOutsideListener();
                      this._setupKeydownListener();
                      this._popperInstance.update();
                      this._visible = true;
                      this._options.onShow(this);
                    };
                    Popover3.prototype.hide = function() {
                      this._targetEl.classList.remove("opacity-100", "visible");
                      this._targetEl.classList.add("opacity-0", "invisible");
                      this._popperInstance.setOptions(function(options) {
                        return __assign2(__assign2({}, options), { modifiers: __spreadArray2(__spreadArray2([], options.modifiers, true), [
                          { name: "eventListeners", enabled: false }
                        ], false) });
                      });
                      this._removeClickOutsideListener();
                      this._removeKeydownListener();
                      this._visible = false;
                      this._options.onHide(this);
                    };
                    Popover3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    Popover3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    Popover3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Popover3;
                  })()
                );
                function initPopovers2() {
                  document.querySelectorAll("[data-popover-target]").forEach(function($triggerEl) {
                    var popoverID = $triggerEl.getAttribute("data-popover-target");
                    var $popoverEl = document.getElementById(popoverID);
                    if ($popoverEl) {
                      var triggerType = $triggerEl.getAttribute("data-popover-trigger");
                      var placement = $triggerEl.getAttribute("data-popover-placement");
                      var offset2 = $triggerEl.getAttribute("data-popover-offset");
                      new Popover2($popoverEl, $triggerEl, {
                        placement: placement ? placement : Default2.placement,
                        offset: offset2 ? parseInt(offset2) : Default2.offset,
                        triggerType: triggerType ? triggerType : Default2.triggerType
                      });
                    } else {
                    }
                  });
                }
                exports2.initPopovers = initPopovers2;
                if (typeof window !== "undefined") {
                  window.Popover = Popover2;
                  window.initPopovers = initPopovers2;
                }
                exports2["default"] = Popover2;
              })
            ),
            /***/
            247: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initTabs = void 0;
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  defaultTabId: null,
                  activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
                  inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
                  onShow: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Tabs2 = (
                  /** @class */
                  (function() {
                    function Tabs3(tabsEl, items, options, instanceOptions) {
                      if (tabsEl === void 0) {
                        tabsEl = null;
                      }
                      if (items === void 0) {
                        items = [];
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : tabsEl.id;
                      this._tabsEl = tabsEl;
                      this._items = items;
                      this._activeTab = options ? this.getTab(options.defaultTabId) : null;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Tabs", this, this._instanceId, instanceOptions.override);
                    }
                    Tabs3.prototype.init = function() {
                      var _this = this;
                      if (this._items.length && !this._initialized) {
                        if (!this._activeTab) {
                          this.setActiveTab(this._items[0]);
                        }
                        this.show(this._activeTab.id, true);
                        this._items.map(function(tab) {
                          tab.triggerEl.addEventListener("click", function(event) {
                            event.preventDefault();
                            _this.show(tab.id);
                          });
                        });
                      }
                    };
                    Tabs3.prototype.destroy = function() {
                      if (this._initialized) {
                        this._initialized = false;
                      }
                    };
                    Tabs3.prototype.removeInstance = function() {
                      this.destroy();
                      instances_1.default.removeInstance("Tabs", this._instanceId);
                    };
                    Tabs3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Tabs3.prototype.getActiveTab = function() {
                      return this._activeTab;
                    };
                    Tabs3.prototype.setActiveTab = function(tab) {
                      this._activeTab = tab;
                    };
                    Tabs3.prototype.getTab = function(id) {
                      return this._items.filter(function(t) {
                        return t.id === id;
                      })[0];
                    };
                    Tabs3.prototype.show = function(id, forceShow) {
                      var _a, _b;
                      var _this = this;
                      if (forceShow === void 0) {
                        forceShow = false;
                      }
                      var tab = this.getTab(id);
                      if (tab === this._activeTab && !forceShow) {
                        return;
                      }
                      this._items.map(function(t) {
                        var _a2, _b2;
                        if (t !== tab) {
                          (_a2 = t.triggerEl.classList).remove.apply(_a2, _this._options.activeClasses.split(" "));
                          (_b2 = t.triggerEl.classList).add.apply(_b2, _this._options.inactiveClasses.split(" "));
                          t.targetEl.classList.add("hidden");
                          t.triggerEl.setAttribute("aria-selected", "false");
                        }
                      });
                      (_a = tab.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(" "));
                      (_b = tab.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(" "));
                      tab.triggerEl.setAttribute("aria-selected", "true");
                      tab.targetEl.classList.remove("hidden");
                      this.setActiveTab(tab);
                      this._options.onShow(this, tab);
                    };
                    Tabs3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    return Tabs3;
                  })()
                );
                function initTabs2() {
                  document.querySelectorAll("[data-tabs-toggle]").forEach(function($parentEl) {
                    var tabItems = [];
                    var activeClasses = $parentEl.getAttribute("data-tabs-active-classes");
                    var inactiveClasses = $parentEl.getAttribute("data-tabs-inactive-classes");
                    var defaultTabId = null;
                    $parentEl.querySelectorAll('[role="tab"]').forEach(function($triggerEl) {
                      var isActive = $triggerEl.getAttribute("aria-selected") === "true";
                      var tab = {
                        id: $triggerEl.getAttribute("data-tabs-target"),
                        triggerEl: $triggerEl,
                        targetEl: document.querySelector($triggerEl.getAttribute("data-tabs-target"))
                      };
                      tabItems.push(tab);
                      if (isActive) {
                        defaultTabId = tab.id;
                      }
                    });
                    new Tabs2($parentEl, tabItems, {
                      defaultTabId,
                      activeClasses: activeClasses ? activeClasses : Default2.activeClasses,
                      inactiveClasses: inactiveClasses ? inactiveClasses : Default2.inactiveClasses
                    });
                  });
                }
                exports2.initTabs = initTabs2;
                if (typeof window !== "undefined") {
                  window.Tabs = Tabs2;
                  window.initTabs = initTabs2;
                }
                exports2["default"] = Tabs2;
              })
            ),
            /***/
            671: (
              /***/
              (function(__unused_webpack_module, exports2, __webpack_require__2) {
                var __assign2 = this && this.__assign || function() {
                  __assign2 = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign2.apply(this, arguments);
                };
                var __spreadArray2 = this && this.__spreadArray || function(to2, from, pack) {
                  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar2; i < l; i++) {
                    if (ar2 || !(i in from)) {
                      if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i);
                      ar2[i] = from[i];
                    }
                  }
                  return to2.concat(ar2 || Array.prototype.slice.call(from));
                };
                Object.defineProperty(exports2, "__esModule", { value: true });
                exports2.initTooltips = void 0;
                var core_1 = __webpack_require__2(853);
                var instances_1 = __webpack_require__2(423);
                var Default2 = {
                  placement: "top",
                  triggerType: "hover",
                  onShow: function() {
                  },
                  onHide: function() {
                  },
                  onToggle: function() {
                  }
                };
                var DefaultInstanceOptions2 = {
                  id: null,
                  override: true
                };
                var Tooltip2 = (
                  /** @class */
                  (function() {
                    function Tooltip3(targetEl, triggerEl, options, instanceOptions) {
                      if (targetEl === void 0) {
                        targetEl = null;
                      }
                      if (triggerEl === void 0) {
                        triggerEl = null;
                      }
                      if (options === void 0) {
                        options = Default2;
                      }
                      if (instanceOptions === void 0) {
                        instanceOptions = DefaultInstanceOptions2;
                      }
                      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
                      this._targetEl = targetEl;
                      this._triggerEl = triggerEl;
                      this._options = __assign2(__assign2({}, Default2), options);
                      this._popperInstance = null;
                      this._visible = false;
                      this._initialized = false;
                      this.init();
                      instances_1.default.addInstance("Tooltip", this, this._instanceId, instanceOptions.override);
                    }
                    Tooltip3.prototype.init = function() {
                      if (this._triggerEl && this._targetEl && !this._initialized) {
                        this._setupEventListeners();
                        this._popperInstance = this._createPopperInstance();
                        this._initialized = true;
                      }
                    };
                    Tooltip3.prototype.destroy = function() {
                      var _this = this;
                      if (this._initialized) {
                        var triggerEvents = this._getTriggerEvents();
                        triggerEvents.showEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._showHandler);
                        });
                        triggerEvents.hideEvents.forEach(function(ev) {
                          _this._triggerEl.removeEventListener(ev, _this._hideHandler);
                        });
                        this._removeKeydownListener();
                        this._removeClickOutsideListener();
                        if (this._popperInstance) {
                          this._popperInstance.destroy();
                        }
                        this._initialized = false;
                      }
                    };
                    Tooltip3.prototype.removeInstance = function() {
                      instances_1.default.removeInstance("Tooltip", this._instanceId);
                    };
                    Tooltip3.prototype.destroyAndRemoveInstance = function() {
                      this.destroy();
                      this.removeInstance();
                    };
                    Tooltip3.prototype._setupEventListeners = function() {
                      var _this = this;
                      var triggerEvents = this._getTriggerEvents();
                      this._showHandler = function() {
                        _this.show();
                      };
                      this._hideHandler = function() {
                        _this.hide();
                      };
                      triggerEvents.showEvents.forEach(function(ev) {
                        _this._triggerEl.addEventListener(ev, _this._showHandler);
                      });
                      triggerEvents.hideEvents.forEach(function(ev) {
                        _this._triggerEl.addEventListener(ev, _this._hideHandler);
                      });
                    };
                    Tooltip3.prototype._createPopperInstance = function() {
                      return (0, core_1.createPopper)(this._triggerEl, this._targetEl, {
                        placement: this._options.placement,
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, 8]
                            }
                          }
                        ]
                      });
                    };
                    Tooltip3.prototype._getTriggerEvents = function() {
                      switch (this._options.triggerType) {
                        case "hover":
                          return {
                            showEvents: ["mouseenter", "focus"],
                            hideEvents: ["mouseleave", "blur"]
                          };
                        case "click":
                          return {
                            showEvents: ["click", "focus"],
                            hideEvents: ["focusout", "blur"]
                          };
                        case "none":
                          return {
                            showEvents: [],
                            hideEvents: []
                          };
                        default:
                          return {
                            showEvents: ["mouseenter", "focus"],
                            hideEvents: ["mouseleave", "blur"]
                          };
                      }
                    };
                    Tooltip3.prototype._setupKeydownListener = function() {
                      var _this = this;
                      this._keydownEventListener = function(ev) {
                        if (ev.key === "Escape") {
                          _this.hide();
                        }
                      };
                      document.body.addEventListener("keydown", this._keydownEventListener, true);
                    };
                    Tooltip3.prototype._removeKeydownListener = function() {
                      document.body.removeEventListener("keydown", this._keydownEventListener, true);
                    };
                    Tooltip3.prototype._setupClickOutsideListener = function() {
                      var _this = this;
                      this._clickOutsideEventListener = function(ev) {
                        _this._handleClickOutside(ev, _this._targetEl);
                      };
                      document.body.addEventListener("click", this._clickOutsideEventListener, true);
                    };
                    Tooltip3.prototype._removeClickOutsideListener = function() {
                      document.body.removeEventListener("click", this._clickOutsideEventListener, true);
                    };
                    Tooltip3.prototype._handleClickOutside = function(ev, targetEl) {
                      var clickedEl = ev.target;
                      if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this.isVisible()) {
                        this.hide();
                      }
                    };
                    Tooltip3.prototype.isVisible = function() {
                      return this._visible;
                    };
                    Tooltip3.prototype.toggle = function() {
                      if (this.isVisible()) {
                        this.hide();
                      } else {
                        this.show();
                      }
                    };
                    Tooltip3.prototype.show = function() {
                      this._targetEl.classList.remove("opacity-0", "invisible");
                      this._targetEl.classList.add("opacity-100", "visible");
                      this._popperInstance.setOptions(function(options) {
                        return __assign2(__assign2({}, options), { modifiers: __spreadArray2(__spreadArray2([], options.modifiers, true), [
                          { name: "eventListeners", enabled: true }
                        ], false) });
                      });
                      this._setupClickOutsideListener();
                      this._setupKeydownListener();
                      this._popperInstance.update();
                      this._visible = true;
                      this._options.onShow(this);
                    };
                    Tooltip3.prototype.hide = function() {
                      this._targetEl.classList.remove("opacity-100", "visible");
                      this._targetEl.classList.add("opacity-0", "invisible");
                      this._popperInstance.setOptions(function(options) {
                        return __assign2(__assign2({}, options), { modifiers: __spreadArray2(__spreadArray2([], options.modifiers, true), [
                          { name: "eventListeners", enabled: false }
                        ], false) });
                      });
                      this._removeClickOutsideListener();
                      this._removeKeydownListener();
                      this._visible = false;
                      this._options.onHide(this);
                    };
                    Tooltip3.prototype.updateOnShow = function(callback) {
                      this._options.onShow = callback;
                    };
                    Tooltip3.prototype.updateOnHide = function(callback) {
                      this._options.onHide = callback;
                    };
                    Tooltip3.prototype.updateOnToggle = function(callback) {
                      this._options.onToggle = callback;
                    };
                    return Tooltip3;
                  })()
                );
                function initTooltips2() {
                  document.querySelectorAll("[data-tooltip-target]").forEach(function($triggerEl) {
                    var tooltipId = $triggerEl.getAttribute("data-tooltip-target");
                    var $tooltipEl = document.getElementById(tooltipId);
                    if ($tooltipEl) {
                      var triggerType = $triggerEl.getAttribute("data-tooltip-trigger");
                      var placement = $triggerEl.getAttribute("data-tooltip-placement");
                      new Tooltip2($tooltipEl, $triggerEl, {
                        placement: placement ? placement : Default2.placement,
                        triggerType: triggerType ? triggerType : Default2.triggerType
                      });
                    } else {
                    }
                  });
                }
                exports2.initTooltips = initTooltips2;
                if (typeof window !== "undefined") {
                  window.Tooltip = Tooltip2;
                  window.initTooltips = initTooltips2;
                }
                exports2["default"] = Tooltip2;
              })
            ),
            /***/
            947: (
              /***/
              (function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", { value: true });
                var Events2 = (
                  /** @class */
                  (function() {
                    function Events3(eventType, eventFunctions) {
                      if (eventFunctions === void 0) {
                        eventFunctions = [];
                      }
                      this._eventType = eventType;
                      this._eventFunctions = eventFunctions;
                    }
                    Events3.prototype.init = function() {
                      var _this = this;
                      this._eventFunctions.forEach(function(eventFunction) {
                        if (typeof window !== "undefined") {
                          window.addEventListener(_this._eventType, eventFunction);
                        }
                      });
                    };
                    return Events3;
                  })()
                );
                exports2["default"] = Events2;
              })
            ),
            /***/
            423: (
              /***/
              (function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", { value: true });
                var Instances2 = (
                  /** @class */
                  (function() {
                    function Instances3() {
                      this._instances = {
                        Accordion: {},
                        Carousel: {},
                        Collapse: {},
                        Dial: {},
                        Dismiss: {},
                        Drawer: {},
                        Dropdown: {},
                        Modal: {},
                        Popover: {},
                        Tabs: {},
                        Tooltip: {},
                        InputCounter: {},
                        CopyClipboard: {},
                        Datepicker: {}
                      };
                    }
                    Instances3.prototype.addInstance = function(component, instance, id, override) {
                      if (override === void 0) {
                        override = false;
                      }
                      if (!this._instances[component]) {
                        return false;
                      }
                      if (this._instances[component][id] && !override) {
                        return;
                      }
                      if (override && this._instances[component][id]) {
                        this._instances[component][id].destroyAndRemoveInstance();
                      }
                      this._instances[component][id ? id : this._generateRandomId()] = instance;
                    };
                    Instances3.prototype.getAllInstances = function() {
                      return this._instances;
                    };
                    Instances3.prototype.getInstances = function(component) {
                      if (!this._instances[component]) {
                        return false;
                      }
                      return this._instances[component];
                    };
                    Instances3.prototype.getInstance = function(component, id) {
                      if (!this._componentAndInstanceCheck(component, id)) {
                        return;
                      }
                      if (!this._instances[component][id]) {
                        return;
                      }
                      return this._instances[component][id];
                    };
                    Instances3.prototype.destroyAndRemoveInstance = function(component, id) {
                      if (!this._componentAndInstanceCheck(component, id)) {
                        return;
                      }
                      this.destroyInstanceObject(component, id);
                      this.removeInstance(component, id);
                    };
                    Instances3.prototype.removeInstance = function(component, id) {
                      if (!this._componentAndInstanceCheck(component, id)) {
                        return;
                      }
                      delete this._instances[component][id];
                    };
                    Instances3.prototype.destroyInstanceObject = function(component, id) {
                      if (!this._componentAndInstanceCheck(component, id)) {
                        return;
                      }
                      this._instances[component][id].destroy();
                    };
                    Instances3.prototype.instanceExists = function(component, id) {
                      if (!this._instances[component]) {
                        return false;
                      }
                      if (!this._instances[component][id]) {
                        return false;
                      }
                      return true;
                    };
                    Instances3.prototype._generateRandomId = function() {
                      return Math.random().toString(36).substr(2, 9);
                    };
                    Instances3.prototype._componentAndInstanceCheck = function(component, id) {
                      if (!this._instances[component]) {
                        return false;
                      }
                      if (!this._instances[component][id]) {
                        return false;
                      }
                      return true;
                    };
                    return Instances3;
                  })()
                );
                var instances2 = new Instances2();
                exports2["default"] = instances2;
                if (typeof window !== "undefined") {
                  window.FlowbiteInstances = instances2;
                }
              })
            )
            /******/
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            __webpack_modules__[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          !(function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          })();
          !(function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          })();
          !(function() {
            __webpack_require__.r = function(exports2) {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
          })();
          var __webpack_exports__ = {};
          !(function() {
            var exports2 = __webpack_exports__;
            Object.defineProperty(exports2, "__esModule", { value: true });
            __webpack_require__(765);
            var accordion_1 = __webpack_require__(902);
            var carousel_1 = __webpack_require__(33);
            var collapse_1 = __webpack_require__(922);
            var dial_1 = __webpack_require__(556);
            var dismiss_1 = __webpack_require__(791);
            var drawer_1 = __webpack_require__(340);
            var dropdown_1 = __webpack_require__(316);
            var modal_1 = __webpack_require__(16);
            var popover_1 = __webpack_require__(903);
            var tabs_1 = __webpack_require__(247);
            var tooltip_1 = __webpack_require__(671);
            var input_counter_1 = __webpack_require__(656);
            var clipboard_1 = __webpack_require__(673);
            var datepicker_1 = __webpack_require__(132);
            __webpack_require__(311);
            var events_1 = __webpack_require__(947);
            var events2 = new events_1.default("load", [
              accordion_1.initAccordions,
              collapse_1.initCollapses,
              carousel_1.initCarousels,
              dismiss_1.initDismisses,
              dropdown_1.initDropdowns,
              modal_1.initModals,
              drawer_1.initDrawers,
              tabs_1.initTabs,
              tooltip_1.initTooltips,
              popover_1.initPopovers,
              dial_1.initDials,
              clipboard_1.initCopyClipboards,
              input_counter_1.initInputCounters,
              datepicker_1.initDatepickers
            ]);
            events2.init();
            exports2["default"] = {
              Accordion: accordion_1.default,
              Carousel: carousel_1.default,
              Collapse: collapse_1.default,
              Dial: dial_1.default,
              Drawer: drawer_1.default,
              Dismiss: dismiss_1.default,
              Dropdown: dropdown_1.default,
              Modal: modal_1.default,
              Popover: popover_1.default,
              Tabs: tabs_1.default,
              Tooltip: tooltip_1.default,
              InputCounter: input_counter_1.default,
              CopyClipboard: clipboard_1.default,
              Datepicker: datepicker_1.default,
              Events: events_1.default
            };
          })();
          return __webpack_exports__;
        })()
      );
    });
  })(flowbite);
  return flowbite.exports;
}
requireFlowbite();
var Events = (
  /** @class */
  (function() {
    function Events2(eventType, eventFunctions) {
      if (eventFunctions === void 0) {
        eventFunctions = [];
      }
      this._eventType = eventType;
      this._eventFunctions = eventFunctions;
    }
    Events2.prototype.init = function() {
      var _this = this;
      this._eventFunctions.forEach(function(eventFunction) {
        if (typeof window !== "undefined") {
          window.addEventListener(_this._eventType, eventFunction);
        }
      });
    };
    return Events2;
  })()
);
var Instances = (
  /** @class */
  (function() {
    function Instances2() {
      this._instances = {
        Accordion: {},
        Carousel: {},
        Collapse: {},
        Dial: {},
        Dismiss: {},
        Drawer: {},
        Dropdown: {},
        Modal: {},
        Popover: {},
        Tabs: {},
        Tooltip: {},
        InputCounter: {},
        CopyClipboard: {},
        Datepicker: {}
      };
    }
    Instances2.prototype.addInstance = function(component, instance, id, override) {
      if (override === void 0) {
        override = false;
      }
      if (!this._instances[component]) {
        return false;
      }
      if (this._instances[component][id] && !override) {
        return;
      }
      if (override && this._instances[component][id]) {
        this._instances[component][id].destroyAndRemoveInstance();
      }
      this._instances[component][id ? id : this._generateRandomId()] = instance;
    };
    Instances2.prototype.getAllInstances = function() {
      return this._instances;
    };
    Instances2.prototype.getInstances = function(component) {
      if (!this._instances[component]) {
        return false;
      }
      return this._instances[component];
    };
    Instances2.prototype.getInstance = function(component, id) {
      if (!this._componentAndInstanceCheck(component, id)) {
        return;
      }
      if (!this._instances[component][id]) {
        return;
      }
      return this._instances[component][id];
    };
    Instances2.prototype.destroyAndRemoveInstance = function(component, id) {
      if (!this._componentAndInstanceCheck(component, id)) {
        return;
      }
      this.destroyInstanceObject(component, id);
      this.removeInstance(component, id);
    };
    Instances2.prototype.removeInstance = function(component, id) {
      if (!this._componentAndInstanceCheck(component, id)) {
        return;
      }
      delete this._instances[component][id];
    };
    Instances2.prototype.destroyInstanceObject = function(component, id) {
      if (!this._componentAndInstanceCheck(component, id)) {
        return;
      }
      this._instances[component][id].destroy();
    };
    Instances2.prototype.instanceExists = function(component, id) {
      if (!this._instances[component]) {
        return false;
      }
      if (!this._instances[component][id]) {
        return false;
      }
      return true;
    };
    Instances2.prototype._generateRandomId = function() {
      return Math.random().toString(36).substr(2, 9);
    };
    Instances2.prototype._componentAndInstanceCheck = function(component, id) {
      if (!this._instances[component]) {
        return false;
      }
      if (!this._instances[component][id]) {
        return false;
      }
      return true;
    };
    return Instances2;
  })()
);
var instances = new Instances();
if (typeof window !== "undefined") {
  window.FlowbiteInstances = instances;
}
var __assign$d = function() {
  __assign$d = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$d.apply(this, arguments);
};
var Default$d = {
  alwaysOpen: false,
  activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
  inactiveClasses: "text-gray-500 dark:text-gray-400",
  onOpen: function() {
  },
  onClose: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$d = {
  id: null,
  override: true
};
var Accordion = (
  /** @class */
  (function() {
    function Accordion2(accordionEl, items, options, instanceOptions) {
      if (accordionEl === void 0) {
        accordionEl = null;
      }
      if (items === void 0) {
        items = [];
      }
      if (options === void 0) {
        options = Default$d;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$d;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : accordionEl.id;
      this._accordionEl = accordionEl;
      this._items = items;
      this._options = __assign$d(__assign$d({}, Default$d), options);
      this._initialized = false;
      this.init();
      instances.addInstance("Accordion", this, this._instanceId, instanceOptions.override);
    }
    Accordion2.prototype.init = function() {
      var _this = this;
      if (this._items.length && !this._initialized) {
        this._items.forEach(function(item) {
          if (item.active) {
            _this.open(item.id);
          }
          var clickHandler = function() {
            _this.toggle(item.id);
          };
          item.triggerEl.addEventListener("click", clickHandler);
          item.clickHandler = clickHandler;
        });
        this._initialized = true;
      }
    };
    Accordion2.prototype.destroy = function() {
      if (this._items.length && this._initialized) {
        this._items.forEach(function(item) {
          item.triggerEl.removeEventListener("click", item.clickHandler);
          delete item.clickHandler;
        });
        this._initialized = false;
      }
    };
    Accordion2.prototype.removeInstance = function() {
      instances.removeInstance("Accordion", this._instanceId);
    };
    Accordion2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Accordion2.prototype.getItem = function(id) {
      return this._items.filter(function(item) {
        return item.id === id;
      })[0];
    };
    Accordion2.prototype.open = function(id) {
      var _a, _b;
      var _this = this;
      var item = this.getItem(id);
      if (!this._options.alwaysOpen) {
        this._items.map(function(i) {
          var _a2, _b2;
          if (i !== item) {
            (_a2 = i.triggerEl.classList).remove.apply(_a2, _this._options.activeClasses.split(" "));
            (_b2 = i.triggerEl.classList).add.apply(_b2, _this._options.inactiveClasses.split(" "));
            i.targetEl.classList.add("hidden");
            i.triggerEl.setAttribute("aria-expanded", "false");
            i.active = false;
            if (i.iconEl) {
              i.iconEl.classList.add("rotate-180");
            }
          }
        });
      }
      (_a = item.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(" "));
      (_b = item.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(" "));
      item.triggerEl.setAttribute("aria-expanded", "true");
      item.targetEl.classList.remove("hidden");
      item.active = true;
      if (item.iconEl) {
        item.iconEl.classList.remove("rotate-180");
      }
      this._options.onOpen(this, item);
    };
    Accordion2.prototype.toggle = function(id) {
      var item = this.getItem(id);
      if (item.active) {
        this.close(id);
      } else {
        this.open(id);
      }
      this._options.onToggle(this, item);
    };
    Accordion2.prototype.close = function(id) {
      var _a, _b;
      var item = this.getItem(id);
      (_a = item.triggerEl.classList).remove.apply(_a, this._options.activeClasses.split(" "));
      (_b = item.triggerEl.classList).add.apply(_b, this._options.inactiveClasses.split(" "));
      item.targetEl.classList.add("hidden");
      item.triggerEl.setAttribute("aria-expanded", "false");
      item.active = false;
      if (item.iconEl) {
        item.iconEl.classList.add("rotate-180");
      }
      this._options.onClose(this, item);
    };
    Accordion2.prototype.updateOnOpen = function(callback) {
      this._options.onOpen = callback;
    };
    Accordion2.prototype.updateOnClose = function(callback) {
      this._options.onClose = callback;
    };
    Accordion2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Accordion2;
  })()
);
function initAccordions() {
  document.querySelectorAll("[data-accordion]").forEach(function($accordionEl) {
    var alwaysOpen = $accordionEl.getAttribute("data-accordion");
    var activeClasses = $accordionEl.getAttribute("data-active-classes");
    var inactiveClasses = $accordionEl.getAttribute("data-inactive-classes");
    var items = [];
    $accordionEl.querySelectorAll("[data-accordion-target]").forEach(function($triggerEl) {
      if ($triggerEl.closest("[data-accordion]") === $accordionEl) {
        var item = {
          id: $triggerEl.getAttribute("data-accordion-target"),
          triggerEl: $triggerEl,
          targetEl: document.querySelector($triggerEl.getAttribute("data-accordion-target")),
          iconEl: $triggerEl.querySelector("[data-accordion-icon]"),
          active: $triggerEl.getAttribute("aria-expanded") === "true" ? true : false
        };
        items.push(item);
      }
    });
    new Accordion($accordionEl, items, {
      alwaysOpen: alwaysOpen === "open" ? true : false,
      activeClasses: activeClasses ? activeClasses : Default$d.activeClasses,
      inactiveClasses: inactiveClasses ? inactiveClasses : Default$d.inactiveClasses
    });
  });
}
if (typeof window !== "undefined") {
  window.Accordion = Accordion;
  window.initAccordions = initAccordions;
}
var __assign$c = function() {
  __assign$c = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$c.apply(this, arguments);
};
var Default$c = {
  onCollapse: function() {
  },
  onExpand: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$c = {
  id: null,
  override: true
};
var Collapse = (
  /** @class */
  (function() {
    function Collapse2(targetEl, triggerEl, options, instanceOptions) {
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (triggerEl === void 0) {
        triggerEl = null;
      }
      if (options === void 0) {
        options = Default$c;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$c;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._targetEl = targetEl;
      this._triggerEl = triggerEl;
      this._options = __assign$c(__assign$c({}, Default$c), options);
      this._visible = false;
      this._initialized = false;
      this.init();
      instances.addInstance("Collapse", this, this._instanceId, instanceOptions.override);
    }
    Collapse2.prototype.init = function() {
      var _this = this;
      if (this._triggerEl && this._targetEl && !this._initialized) {
        if (this._triggerEl.hasAttribute("aria-expanded")) {
          this._visible = this._triggerEl.getAttribute("aria-expanded") === "true";
        } else {
          this._visible = !this._targetEl.classList.contains("hidden");
        }
        this._clickHandler = function() {
          _this.toggle();
        };
        this._triggerEl.addEventListener("click", this._clickHandler);
        this._initialized = true;
      }
    };
    Collapse2.prototype.destroy = function() {
      if (this._triggerEl && this._initialized) {
        this._triggerEl.removeEventListener("click", this._clickHandler);
        this._initialized = false;
      }
    };
    Collapse2.prototype.removeInstance = function() {
      instances.removeInstance("Collapse", this._instanceId);
    };
    Collapse2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Collapse2.prototype.collapse = function() {
      this._targetEl.classList.add("hidden");
      if (this._triggerEl) {
        this._triggerEl.setAttribute("aria-expanded", "false");
      }
      this._visible = false;
      this._options.onCollapse(this);
    };
    Collapse2.prototype.expand = function() {
      this._targetEl.classList.remove("hidden");
      if (this._triggerEl) {
        this._triggerEl.setAttribute("aria-expanded", "true");
      }
      this._visible = true;
      this._options.onExpand(this);
    };
    Collapse2.prototype.toggle = function() {
      if (this._visible) {
        this.collapse();
      } else {
        this.expand();
      }
      this._options.onToggle(this);
    };
    Collapse2.prototype.updateOnCollapse = function(callback) {
      this._options.onCollapse = callback;
    };
    Collapse2.prototype.updateOnExpand = function(callback) {
      this._options.onExpand = callback;
    };
    Collapse2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Collapse2;
  })()
);
function initCollapses() {
  document.querySelectorAll("[data-collapse-toggle]").forEach(function($triggerEl) {
    var targetId = $triggerEl.getAttribute("data-collapse-toggle");
    var $targetEl = document.getElementById(targetId);
    if ($targetEl) {
      if (!instances.instanceExists("Collapse", $targetEl.getAttribute("id"))) {
        new Collapse($targetEl, $triggerEl);
      } else {
        new Collapse($targetEl, $triggerEl, {}, {
          id: $targetEl.getAttribute("id") + "_" + instances._generateRandomId()
        });
      }
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Collapse = Collapse;
  window.initCollapses = initCollapses;
}
var __assign$b = function() {
  __assign$b = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$b.apply(this, arguments);
};
var Default$b = {
  defaultPosition: 0,
  indicators: {
    items: [],
    activeClasses: "bg-white dark:bg-gray-800",
    inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
  },
  interval: 3e3,
  onNext: function() {
  },
  onPrev: function() {
  },
  onChange: function() {
  }
};
var DefaultInstanceOptions$b = {
  id: null,
  override: true
};
var Carousel = (
  /** @class */
  (function() {
    function Carousel2(carouselEl, items, options, instanceOptions) {
      if (carouselEl === void 0) {
        carouselEl = null;
      }
      if (items === void 0) {
        items = [];
      }
      if (options === void 0) {
        options = Default$b;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$b;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : carouselEl.id;
      this._carouselEl = carouselEl;
      this._items = items;
      this._options = __assign$b(__assign$b(__assign$b({}, Default$b), options), { indicators: __assign$b(__assign$b({}, Default$b.indicators), options.indicators) });
      this._activeItem = this.getItem(this._options.defaultPosition);
      this._indicators = this._options.indicators.items;
      this._intervalDuration = this._options.interval;
      this._intervalInstance = null;
      this._initialized = false;
      this.init();
      instances.addInstance("Carousel", this, this._instanceId, instanceOptions.override);
    }
    Carousel2.prototype.init = function() {
      var _this = this;
      if (this._items.length && !this._initialized) {
        this._items.map(function(item) {
          item.el.classList.add("absolute", "inset-0", "transition-transform", "transform");
        });
        if (this.getActiveItem()) {
          this.slideTo(this.getActiveItem().position);
        } else {
          this.slideTo(0);
        }
        this._indicators.map(function(indicator, position) {
          indicator.el.addEventListener("click", function() {
            _this.slideTo(position);
          });
        });
        this._initialized = true;
      }
    };
    Carousel2.prototype.destroy = function() {
      if (this._initialized) {
        this._initialized = false;
      }
    };
    Carousel2.prototype.removeInstance = function() {
      instances.removeInstance("Carousel", this._instanceId);
    };
    Carousel2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Carousel2.prototype.getItem = function(position) {
      return this._items[position];
    };
    Carousel2.prototype.slideTo = function(position) {
      var nextItem = this._items[position];
      var rotationItems = {
        left: nextItem.position === 0 ? this._items[this._items.length - 1] : this._items[nextItem.position - 1],
        middle: nextItem,
        right: nextItem.position === this._items.length - 1 ? this._items[0] : this._items[nextItem.position + 1]
      };
      this._rotate(rotationItems);
      this._setActiveItem(nextItem);
      if (this._intervalInstance) {
        this.pause();
        this.cycle();
      }
      this._options.onChange(this);
    };
    Carousel2.prototype.next = function() {
      var activeItem = this.getActiveItem();
      var nextItem = null;
      if (activeItem.position === this._items.length - 1) {
        nextItem = this._items[0];
      } else {
        nextItem = this._items[activeItem.position + 1];
      }
      this.slideTo(nextItem.position);
      this._options.onNext(this);
    };
    Carousel2.prototype.prev = function() {
      var activeItem = this.getActiveItem();
      var prevItem = null;
      if (activeItem.position === 0) {
        prevItem = this._items[this._items.length - 1];
      } else {
        prevItem = this._items[activeItem.position - 1];
      }
      this.slideTo(prevItem.position);
      this._options.onPrev(this);
    };
    Carousel2.prototype._rotate = function(rotationItems) {
      this._items.map(function(item) {
        item.el.classList.add("hidden");
      });
      if (this._items.length === 1) {
        rotationItems.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10");
        rotationItems.middle.el.classList.add("translate-x-0", "z-20");
        return;
      }
      rotationItems.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20");
      rotationItems.left.el.classList.add("-translate-x-full", "z-10");
      rotationItems.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10");
      rotationItems.middle.el.classList.add("translate-x-0", "z-30");
      rotationItems.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-30");
      rotationItems.right.el.classList.add("translate-x-full", "z-20");
    };
    Carousel2.prototype.cycle = function() {
      var _this = this;
      if (typeof window !== "undefined") {
        this._intervalInstance = window.setInterval(function() {
          _this.next();
        }, this._intervalDuration);
      }
    };
    Carousel2.prototype.pause = function() {
      clearInterval(this._intervalInstance);
    };
    Carousel2.prototype.getActiveItem = function() {
      return this._activeItem;
    };
    Carousel2.prototype._setActiveItem = function(item) {
      var _a, _b;
      var _this = this;
      this._activeItem = item;
      var position = item.position;
      if (this._indicators.length) {
        this._indicators.map(function(indicator) {
          var _a2, _b2;
          indicator.el.setAttribute("aria-current", "false");
          (_a2 = indicator.el.classList).remove.apply(_a2, _this._options.indicators.activeClasses.split(" "));
          (_b2 = indicator.el.classList).add.apply(_b2, _this._options.indicators.inactiveClasses.split(" "));
        });
        (_a = this._indicators[position].el.classList).add.apply(_a, this._options.indicators.activeClasses.split(" "));
        (_b = this._indicators[position].el.classList).remove.apply(_b, this._options.indicators.inactiveClasses.split(" "));
        this._indicators[position].el.setAttribute("aria-current", "true");
      }
    };
    Carousel2.prototype.updateOnNext = function(callback) {
      this._options.onNext = callback;
    };
    Carousel2.prototype.updateOnPrev = function(callback) {
      this._options.onPrev = callback;
    };
    Carousel2.prototype.updateOnChange = function(callback) {
      this._options.onChange = callback;
    };
    return Carousel2;
  })()
);
function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach(function($carouselEl) {
    var interval = $carouselEl.getAttribute("data-carousel-interval");
    var slide = $carouselEl.getAttribute("data-carousel") === "slide" ? true : false;
    var items = [];
    var defaultPosition = 0;
    if ($carouselEl.querySelectorAll("[data-carousel-item]").length) {
      Array.from($carouselEl.querySelectorAll("[data-carousel-item]")).map(function($carouselItemEl, position) {
        items.push({
          position,
          el: $carouselItemEl
        });
        if ($carouselItemEl.getAttribute("data-carousel-item") === "active") {
          defaultPosition = position;
        }
      });
    }
    var indicators = [];
    if ($carouselEl.querySelectorAll("[data-carousel-slide-to]").length) {
      Array.from($carouselEl.querySelectorAll("[data-carousel-slide-to]")).map(function($indicatorEl) {
        indicators.push({
          position: parseInt($indicatorEl.getAttribute("data-carousel-slide-to")),
          el: $indicatorEl
        });
      });
    }
    var carousel = new Carousel($carouselEl, items, {
      defaultPosition,
      indicators: {
        items: indicators
      },
      interval: interval ? interval : Default$b.interval
    });
    if (slide) {
      carousel.cycle();
    }
    var carouselNextEl = $carouselEl.querySelector("[data-carousel-next]");
    var carouselPrevEl = $carouselEl.querySelector("[data-carousel-prev]");
    if (carouselNextEl) {
      carouselNextEl.addEventListener("click", function() {
        carousel.next();
      });
    }
    if (carouselPrevEl) {
      carouselPrevEl.addEventListener("click", function() {
        carousel.prev();
      });
    }
  });
}
if (typeof window !== "undefined") {
  window.Carousel = Carousel;
  window.initCarousels = initCarousels;
}
var __assign$a = function() {
  __assign$a = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$a.apply(this, arguments);
};
var Default$a = {
  transition: "transition-opacity",
  duration: 300,
  timing: "ease-out",
  onHide: function() {
  }
};
var DefaultInstanceOptions$a = {
  id: null,
  override: true
};
var Dismiss = (
  /** @class */
  (function() {
    function Dismiss2(targetEl, triggerEl, options, instanceOptions) {
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (triggerEl === void 0) {
        triggerEl = null;
      }
      if (options === void 0) {
        options = Default$a;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$a;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._targetEl = targetEl;
      this._triggerEl = triggerEl;
      this._options = __assign$a(__assign$a({}, Default$a), options);
      this._initialized = false;
      this.init();
      instances.addInstance("Dismiss", this, this._instanceId, instanceOptions.override);
    }
    Dismiss2.prototype.init = function() {
      var _this = this;
      if (this._triggerEl && this._targetEl && !this._initialized) {
        this._clickHandler = function() {
          _this.hide();
        };
        this._triggerEl.addEventListener("click", this._clickHandler);
        this._initialized = true;
      }
    };
    Dismiss2.prototype.destroy = function() {
      if (this._triggerEl && this._initialized) {
        this._triggerEl.removeEventListener("click", this._clickHandler);
        this._initialized = false;
      }
    };
    Dismiss2.prototype.removeInstance = function() {
      instances.removeInstance("Dismiss", this._instanceId);
    };
    Dismiss2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Dismiss2.prototype.hide = function() {
      var _this = this;
      this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0");
      setTimeout(function() {
        _this._targetEl.classList.add("hidden");
      }, this._options.duration);
      this._options.onHide(this, this._targetEl);
    };
    Dismiss2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    return Dismiss2;
  })()
);
function initDismisses() {
  document.querySelectorAll("[data-dismiss-target]").forEach(function($triggerEl) {
    var targetId = $triggerEl.getAttribute("data-dismiss-target");
    var $dismissEl = document.querySelector(targetId);
    if ($dismissEl) {
      new Dismiss($dismissEl, $triggerEl);
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Dismiss = Dismiss;
  window.initDismisses = initDismisses;
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
const applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x2 = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y3 = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y3,
    right: x2 + width,
    bottom: y3 + height,
    left: x2,
    x: x2,
    y: y3
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
const arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x2 = _ref.x, y3 = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x2 * dpr) / dpr || 0,
    y: round(y3 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y3 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x2,
    y: y3
  }) : {
    x: x2,
    y: y3
  };
  x2 = _ref3.x;
  y3 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y3 -= offsetY - popperRect.height;
      y3 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x2 -= offsetX - popperRect.width;
      x2 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x2,
    y: y3
  }, getWindow(popper2)) : {
    x: x2,
    y: y3
  };
  x2 = _ref4.x;
  y3 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y3 + "px)" : "translate3d(" + x2 + "px, " + y3 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y3 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x2 = 0;
  var y3 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y3 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2 + getWindowScrollBarX(element),
    y: y3
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x2 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y3 = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y3
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
const flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
const hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x2 = _data$state$placement.x, y3 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x2;
    state.modifiersData.popperOffsets.y += y3;
  }
  state.modifiersData[name] = data;
}
const offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    placement: state.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
const preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn3) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn3());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions2, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m3) {
          return m3.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn3 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn3 === "function") {
            state = fn3({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn3) {
        return fn3();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var __assign$9 = function() {
  __assign$9 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$9.apply(this, arguments);
};
var __spreadArray$2 = function(to2, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar2; i < l; i++) {
    if (ar2 || !(i in from)) {
      if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i);
      ar2[i] = from[i];
    }
  }
  return to2.concat(ar2 || Array.prototype.slice.call(from));
};
var Default$9 = {
  placement: "bottom",
  triggerType: "click",
  offsetSkidding: 0,
  offsetDistance: 10,
  delay: 300,
  ignoreClickOutsideClass: false,
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$9 = {
  id: null,
  override: true
};
var Dropdown = (
  /** @class */
  (function() {
    function Dropdown2(targetElement, triggerElement, options, instanceOptions) {
      if (targetElement === void 0) {
        targetElement = null;
      }
      if (triggerElement === void 0) {
        triggerElement = null;
      }
      if (options === void 0) {
        options = Default$9;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$9;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetElement.id;
      this._targetEl = targetElement;
      this._triggerEl = triggerElement;
      this._options = __assign$9(__assign$9({}, Default$9), options);
      this._popperInstance = null;
      this._visible = false;
      this._initialized = false;
      this.init();
      instances.addInstance("Dropdown", this, this._instanceId, instanceOptions.override);
    }
    Dropdown2.prototype.init = function() {
      if (this._triggerEl && this._targetEl && !this._initialized) {
        this._popperInstance = this._createPopperInstance();
        this._setupEventListeners();
        this._initialized = true;
      }
    };
    Dropdown2.prototype.destroy = function() {
      var _this = this;
      var triggerEvents = this._getTriggerEvents();
      if (this._options.triggerType === "click") {
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._clickHandler);
        });
      }
      if (this._options.triggerType === "hover") {
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._hoverShowTriggerElHandler);
          _this._targetEl.removeEventListener(ev, _this._hoverShowTargetElHandler);
        });
        triggerEvents.hideEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._hoverHideHandler);
          _this._targetEl.removeEventListener(ev, _this._hoverHideHandler);
        });
      }
      this._popperInstance.destroy();
      this._initialized = false;
    };
    Dropdown2.prototype.removeInstance = function() {
      instances.removeInstance("Dropdown", this._instanceId);
    };
    Dropdown2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Dropdown2.prototype._setupEventListeners = function() {
      var _this = this;
      var triggerEvents = this._getTriggerEvents();
      this._clickHandler = function() {
        _this.toggle();
      };
      if (this._options.triggerType === "click") {
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._clickHandler);
        });
      }
      this._hoverShowTriggerElHandler = function(ev) {
        if (ev.type === "click") {
          _this.toggle();
        } else {
          setTimeout(function() {
            _this.show();
          }, _this._options.delay);
        }
      };
      this._hoverShowTargetElHandler = function() {
        _this.show();
      };
      this._hoverHideHandler = function() {
        setTimeout(function() {
          if (!_this._targetEl.matches(":hover")) {
            _this.hide();
          }
        }, _this._options.delay);
      };
      if (this._options.triggerType === "hover") {
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._hoverShowTriggerElHandler);
          _this._targetEl.addEventListener(ev, _this._hoverShowTargetElHandler);
        });
        triggerEvents.hideEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._hoverHideHandler);
          _this._targetEl.addEventListener(ev, _this._hoverHideHandler);
        });
      }
    };
    Dropdown2.prototype._createPopperInstance = function() {
      return createPopper(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [
                this._options.offsetSkidding,
                this._options.offsetDistance
              ]
            }
          }
        ]
      });
    };
    Dropdown2.prototype._setupClickOutsideListener = function() {
      var _this = this;
      this._clickOutsideEventListener = function(ev) {
        _this._handleClickOutside(ev, _this._targetEl);
      };
      document.body.addEventListener("click", this._clickOutsideEventListener, true);
    };
    Dropdown2.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, true);
    };
    Dropdown2.prototype._handleClickOutside = function(ev, targetEl) {
      var clickedEl = ev.target;
      var ignoreClickOutsideClass = this._options.ignoreClickOutsideClass;
      var isIgnored = false;
      if (ignoreClickOutsideClass) {
        var ignoredClickOutsideEls = document.querySelectorAll(".".concat(ignoreClickOutsideClass));
        ignoredClickOutsideEls.forEach(function(el) {
          if (el.contains(clickedEl)) {
            isIgnored = true;
            return;
          }
        });
      }
      if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && !isIgnored && this.isVisible()) {
        this.hide();
      }
    };
    Dropdown2.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "click"],
            hideEvents: ["mouseleave"]
          };
        case "click":
          return {
            showEvents: ["click"],
            hideEvents: []
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["click"],
            hideEvents: []
          };
      }
    };
    Dropdown2.prototype.toggle = function() {
      if (this.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
      this._options.onToggle(this);
    };
    Dropdown2.prototype.isVisible = function() {
      return this._visible;
    };
    Dropdown2.prototype.show = function() {
      this._targetEl.classList.remove("hidden");
      this._targetEl.classList.add("block");
      this._targetEl.removeAttribute("aria-hidden");
      this._popperInstance.setOptions(function(options) {
        return __assign$9(__assign$9({}, options), { modifiers: __spreadArray$2(__spreadArray$2([], options.modifiers, true), [
          { name: "eventListeners", enabled: true }
        ], false) });
      });
      this._setupClickOutsideListener();
      this._popperInstance.update();
      this._visible = true;
      this._options.onShow(this);
    };
    Dropdown2.prototype.hide = function() {
      this._targetEl.classList.remove("block");
      this._targetEl.classList.add("hidden");
      this._targetEl.setAttribute("aria-hidden", "true");
      this._popperInstance.setOptions(function(options) {
        return __assign$9(__assign$9({}, options), { modifiers: __spreadArray$2(__spreadArray$2([], options.modifiers, true), [
          { name: "eventListeners", enabled: false }
        ], false) });
      });
      this._visible = false;
      this._removeClickOutsideListener();
      this._options.onHide(this);
    };
    Dropdown2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    Dropdown2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    Dropdown2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Dropdown2;
  })()
);
function initDropdowns() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach(function($triggerEl) {
    var dropdownId = $triggerEl.getAttribute("data-dropdown-toggle");
    var $dropdownEl = document.getElementById(dropdownId);
    if ($dropdownEl) {
      var placement = $triggerEl.getAttribute("data-dropdown-placement");
      var offsetSkidding = $triggerEl.getAttribute("data-dropdown-offset-skidding");
      var offsetDistance = $triggerEl.getAttribute("data-dropdown-offset-distance");
      var triggerType = $triggerEl.getAttribute("data-dropdown-trigger");
      var delay = $triggerEl.getAttribute("data-dropdown-delay");
      var ignoreClickOutsideClass = $triggerEl.getAttribute("data-dropdown-ignore-click-outside-class");
      new Dropdown($dropdownEl, $triggerEl, {
        placement: placement ? placement : Default$9.placement,
        triggerType: triggerType ? triggerType : Default$9.triggerType,
        offsetSkidding: offsetSkidding ? parseInt(offsetSkidding) : Default$9.offsetSkidding,
        offsetDistance: offsetDistance ? parseInt(offsetDistance) : Default$9.offsetDistance,
        delay: delay ? parseInt(delay) : Default$9.delay,
        ignoreClickOutsideClass: ignoreClickOutsideClass ? ignoreClickOutsideClass : Default$9.ignoreClickOutsideClass
      });
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Dropdown = Dropdown;
  window.initDropdowns = initDropdowns;
}
var __assign$8 = function() {
  __assign$8 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$8.apply(this, arguments);
};
var Default$8 = {
  placement: "center",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  backdrop: "dynamic",
  closable: true,
  onHide: function() {
  },
  onShow: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$8 = {
  id: null,
  override: true
};
var Modal = (
  /** @class */
  (function() {
    function Modal2(targetEl, options, instanceOptions) {
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (options === void 0) {
        options = Default$8;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$8;
      }
      this._eventListenerInstances = [];
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._targetEl = targetEl;
      this._options = __assign$8(__assign$8({}, Default$8), options);
      this._isHidden = true;
      this._backdropEl = null;
      this._initialized = false;
      this.init();
      instances.addInstance("Modal", this, this._instanceId, instanceOptions.override);
    }
    Modal2.prototype.init = function() {
      var _this = this;
      if (this._targetEl && !this._initialized) {
        this._getPlacementClasses().map(function(c) {
          _this._targetEl.classList.add(c);
        });
        this._initialized = true;
      }
    };
    Modal2.prototype.destroy = function() {
      if (this._initialized) {
        this.removeAllEventListenerInstances();
        this._destroyBackdropEl();
        this._initialized = false;
      }
    };
    Modal2.prototype.removeInstance = function() {
      instances.removeInstance("Modal", this._instanceId);
    };
    Modal2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Modal2.prototype._createBackdrop = function() {
      var _a;
      if (this._isHidden) {
        var backdropEl = document.createElement("div");
        (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(" "));
        document.querySelector("body").append(backdropEl);
        this._backdropEl = backdropEl;
      }
    };
    Modal2.prototype._destroyBackdropEl = function() {
      if (!this._isHidden && this._backdropEl) {
        this._backdropEl.remove();
        this._backdropEl = null;
      }
    };
    Modal2.prototype._setupModalCloseEventListeners = function() {
      var _this = this;
      if (this._options.backdrop === "dynamic") {
        this._clickOutsideEventListener = function(ev) {
          _this._handleOutsideClick(ev.target);
        };
        this._targetEl.addEventListener("click", this._clickOutsideEventListener, true);
      }
      this._keydownEventListener = function(ev) {
        if (ev.key === "Escape") {
          _this.hide();
        }
      };
      document.body.addEventListener("keydown", this._keydownEventListener, true);
    };
    Modal2.prototype._removeModalCloseEventListeners = function() {
      if (this._options.backdrop === "dynamic") {
        this._targetEl.removeEventListener("click", this._clickOutsideEventListener, true);
      }
      document.body.removeEventListener("keydown", this._keydownEventListener, true);
    };
    Modal2.prototype._handleOutsideClick = function(target) {
      if (target === this._targetEl || target === this._backdropEl && this.isVisible()) {
        this.hide();
      }
    };
    Modal2.prototype._getPlacementClasses = function() {
      switch (this._options.placement) {
        // top
        case "top-left":
          return ["justify-start", "items-start"];
        case "top-center":
          return ["justify-center", "items-start"];
        case "top-right":
          return ["justify-end", "items-start"];
        // center
        case "center-left":
          return ["justify-start", "items-center"];
        case "center":
          return ["justify-center", "items-center"];
        case "center-right":
          return ["justify-end", "items-center"];
        // bottom
        case "bottom-left":
          return ["justify-start", "items-end"];
        case "bottom-center":
          return ["justify-center", "items-end"];
        case "bottom-right":
          return ["justify-end", "items-end"];
        default:
          return ["justify-center", "items-center"];
      }
    };
    Modal2.prototype.toggle = function() {
      if (this._isHidden) {
        this.show();
      } else {
        this.hide();
      }
      this._options.onToggle(this);
    };
    Modal2.prototype.show = function() {
      if (this.isHidden) {
        this._targetEl.classList.add("flex");
        this._targetEl.classList.remove("hidden");
        this._targetEl.setAttribute("aria-modal", "true");
        this._targetEl.setAttribute("role", "dialog");
        this._targetEl.removeAttribute("aria-hidden");
        this._createBackdrop();
        this._isHidden = false;
        if (this._options.closable) {
          this._setupModalCloseEventListeners();
        }
        document.body.classList.add("overflow-hidden");
        this._options.onShow(this);
      }
    };
    Modal2.prototype.hide = function() {
      if (this.isVisible) {
        this._targetEl.classList.add("hidden");
        this._targetEl.classList.remove("flex");
        this._targetEl.setAttribute("aria-hidden", "true");
        this._targetEl.removeAttribute("aria-modal");
        this._targetEl.removeAttribute("role");
        this._destroyBackdropEl();
        this._isHidden = true;
        document.body.classList.remove("overflow-hidden");
        if (this._options.closable) {
          this._removeModalCloseEventListeners();
        }
        this._options.onHide(this);
      }
    };
    Modal2.prototype.isVisible = function() {
      return !this._isHidden;
    };
    Modal2.prototype.isHidden = function() {
      return this._isHidden;
    };
    Modal2.prototype.addEventListenerInstance = function(element, type, handler) {
      this._eventListenerInstances.push({
        element,
        type,
        handler
      });
    };
    Modal2.prototype.removeAllEventListenerInstances = function() {
      this._eventListenerInstances.map(function(eventListenerInstance) {
        eventListenerInstance.element.removeEventListener(eventListenerInstance.type, eventListenerInstance.handler);
      });
      this._eventListenerInstances = [];
    };
    Modal2.prototype.getAllEventListenerInstances = function() {
      return this._eventListenerInstances;
    };
    Modal2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    Modal2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    Modal2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Modal2;
  })()
);
function initModals() {
  document.querySelectorAll("[data-modal-target]").forEach(function($triggerEl) {
    var modalId = $triggerEl.getAttribute("data-modal-target");
    var $modalEl = document.getElementById(modalId);
    if ($modalEl) {
      var placement = $modalEl.getAttribute("data-modal-placement");
      var backdrop = $modalEl.getAttribute("data-modal-backdrop");
      new Modal($modalEl, {
        placement: placement ? placement : Default$8.placement,
        backdrop: backdrop ? backdrop : Default$8.backdrop
      });
    } else {
    }
  });
  document.querySelectorAll("[data-modal-toggle]").forEach(function($triggerEl) {
    var modalId = $triggerEl.getAttribute("data-modal-toggle");
    var $modalEl = document.getElementById(modalId);
    if ($modalEl) {
      var modal_1 = instances.getInstance("Modal", modalId);
      if (modal_1) {
        var toggleModal = function() {
          modal_1.toggle();
        };
        $triggerEl.addEventListener("click", toggleModal);
        modal_1.addEventListenerInstance($triggerEl, "click", toggleModal);
      } else {
      }
    } else {
    }
  });
  document.querySelectorAll("[data-modal-show]").forEach(function($triggerEl) {
    var modalId = $triggerEl.getAttribute("data-modal-show");
    var $modalEl = document.getElementById(modalId);
    if ($modalEl) {
      var modal_2 = instances.getInstance("Modal", modalId);
      if (modal_2) {
        var showModal = function() {
          modal_2.show();
        };
        $triggerEl.addEventListener("click", showModal);
        modal_2.addEventListenerInstance($triggerEl, "click", showModal);
      } else {
      }
    } else {
    }
  });
  document.querySelectorAll("[data-modal-hide]").forEach(function($triggerEl) {
    var modalId = $triggerEl.getAttribute("data-modal-hide");
    var $modalEl = document.getElementById(modalId);
    if ($modalEl) {
      var modal_3 = instances.getInstance("Modal", modalId);
      if (modal_3) {
        var hideModal = function() {
          modal_3.hide();
        };
        $triggerEl.addEventListener("click", hideModal);
        modal_3.addEventListenerInstance($triggerEl, "click", hideModal);
      } else {
      }
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Modal = Modal;
  window.initModals = initModals;
}
var __assign$7 = function() {
  __assign$7 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$7.apply(this, arguments);
};
var Default$7 = {
  placement: "left",
  bodyScrolling: false,
  backdrop: true,
  edge: false,
  edgeOffset: "bottom-[60px]",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$7 = {
  id: null,
  override: true
};
var Drawer = (
  /** @class */
  (function() {
    function Drawer2(targetEl, options, instanceOptions) {
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (options === void 0) {
        options = Default$7;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$7;
      }
      this._eventListenerInstances = [];
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._targetEl = targetEl;
      this._options = __assign$7(__assign$7({}, Default$7), options);
      this._visible = false;
      this._initialized = false;
      this.init();
      instances.addInstance("Drawer", this, this._instanceId, instanceOptions.override);
    }
    Drawer2.prototype.init = function() {
      var _this = this;
      if (this._targetEl && !this._initialized) {
        this._targetEl.setAttribute("aria-hidden", "true");
        this._targetEl.classList.add("transition-transform");
        this._getPlacementClasses(this._options.placement).base.map(function(c) {
          _this._targetEl.classList.add(c);
        });
        this._handleEscapeKey = function(event) {
          if (event.key === "Escape") {
            if (_this.isVisible()) {
              _this.hide();
            }
          }
        };
        document.addEventListener("keydown", this._handleEscapeKey);
        this._initialized = true;
      }
    };
    Drawer2.prototype.destroy = function() {
      if (this._initialized) {
        this.removeAllEventListenerInstances();
        this._destroyBackdropEl();
        document.removeEventListener("keydown", this._handleEscapeKey);
        this._initialized = false;
      }
    };
    Drawer2.prototype.removeInstance = function() {
      instances.removeInstance("Drawer", this._instanceId);
    };
    Drawer2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Drawer2.prototype.hide = function() {
      var _this = this;
      if (this._options.edge) {
        this._getPlacementClasses(this._options.placement + "-edge").active.map(function(c) {
          _this._targetEl.classList.remove(c);
        });
        this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(c) {
          _this._targetEl.classList.add(c);
        });
      } else {
        this._getPlacementClasses(this._options.placement).active.map(function(c) {
          _this._targetEl.classList.remove(c);
        });
        this._getPlacementClasses(this._options.placement).inactive.map(function(c) {
          _this._targetEl.classList.add(c);
        });
      }
      this._targetEl.setAttribute("aria-hidden", "true");
      this._targetEl.removeAttribute("aria-modal");
      this._targetEl.removeAttribute("role");
      if (!this._options.bodyScrolling) {
        document.body.classList.remove("overflow-hidden");
      }
      if (this._options.backdrop) {
        this._destroyBackdropEl();
      }
      this._visible = false;
      this._options.onHide(this);
    };
    Drawer2.prototype.show = function() {
      var _this = this;
      if (this._options.edge) {
        this._getPlacementClasses(this._options.placement + "-edge").active.map(function(c) {
          _this._targetEl.classList.add(c);
        });
        this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(c) {
          _this._targetEl.classList.remove(c);
        });
      } else {
        this._getPlacementClasses(this._options.placement).active.map(function(c) {
          _this._targetEl.classList.add(c);
        });
        this._getPlacementClasses(this._options.placement).inactive.map(function(c) {
          _this._targetEl.classList.remove(c);
        });
      }
      this._targetEl.setAttribute("aria-modal", "true");
      this._targetEl.setAttribute("role", "dialog");
      this._targetEl.removeAttribute("aria-hidden");
      if (!this._options.bodyScrolling) {
        document.body.classList.add("overflow-hidden");
      }
      if (this._options.backdrop) {
        this._createBackdrop();
      }
      this._visible = true;
      this._options.onShow(this);
    };
    Drawer2.prototype.toggle = function() {
      if (this.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
    };
    Drawer2.prototype._createBackdrop = function() {
      var _a;
      var _this = this;
      if (!this._visible) {
        var backdropEl = document.createElement("div");
        backdropEl.setAttribute("drawer-backdrop", "");
        (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(" "));
        document.querySelector("body").append(backdropEl);
        backdropEl.addEventListener("click", function() {
          _this.hide();
        });
      }
    };
    Drawer2.prototype._destroyBackdropEl = function() {
      if (this._visible && document.querySelector("[drawer-backdrop]") !== null) {
        document.querySelector("[drawer-backdrop]").remove();
      }
    };
    Drawer2.prototype._getPlacementClasses = function(placement) {
      switch (placement) {
        case "top":
          return {
            base: ["top-0", "left-0", "right-0"],
            active: ["transform-none"],
            inactive: ["-translate-y-full"]
          };
        case "right":
          return {
            base: ["right-0", "top-0"],
            active: ["transform-none"],
            inactive: ["translate-x-full"]
          };
        case "bottom":
          return {
            base: ["bottom-0", "left-0", "right-0"],
            active: ["transform-none"],
            inactive: ["translate-y-full"]
          };
        case "left":
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["-translate-x-full"]
          };
        case "bottom-edge":
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["translate-y-full", this._options.edgeOffset]
          };
        default:
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["-translate-x-full"]
          };
      }
    };
    Drawer2.prototype.isHidden = function() {
      return !this._visible;
    };
    Drawer2.prototype.isVisible = function() {
      return this._visible;
    };
    Drawer2.prototype.addEventListenerInstance = function(element, type, handler) {
      this._eventListenerInstances.push({
        element,
        type,
        handler
      });
    };
    Drawer2.prototype.removeAllEventListenerInstances = function() {
      this._eventListenerInstances.map(function(eventListenerInstance) {
        eventListenerInstance.element.removeEventListener(eventListenerInstance.type, eventListenerInstance.handler);
      });
      this._eventListenerInstances = [];
    };
    Drawer2.prototype.getAllEventListenerInstances = function() {
      return this._eventListenerInstances;
    };
    Drawer2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    Drawer2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    Drawer2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Drawer2;
  })()
);
function initDrawers() {
  document.querySelectorAll("[data-drawer-target]").forEach(function($triggerEl) {
    var drawerId = $triggerEl.getAttribute("data-drawer-target");
    var $drawerEl = document.getElementById(drawerId);
    if ($drawerEl) {
      var placement = $triggerEl.getAttribute("data-drawer-placement");
      var bodyScrolling = $triggerEl.getAttribute("data-drawer-body-scrolling");
      var backdrop = $triggerEl.getAttribute("data-drawer-backdrop");
      var edge = $triggerEl.getAttribute("data-drawer-edge");
      var edgeOffset = $triggerEl.getAttribute("data-drawer-edge-offset");
      new Drawer($drawerEl, {
        placement: placement ? placement : Default$7.placement,
        bodyScrolling: bodyScrolling ? bodyScrolling === "true" ? true : false : Default$7.bodyScrolling,
        backdrop: backdrop ? backdrop === "true" ? true : false : Default$7.backdrop,
        edge: edge ? edge === "true" ? true : false : Default$7.edge,
        edgeOffset: edgeOffset ? edgeOffset : Default$7.edgeOffset
      });
    } else {
    }
  });
  document.querySelectorAll("[data-drawer-toggle]").forEach(function($triggerEl) {
    var drawerId = $triggerEl.getAttribute("data-drawer-toggle");
    var $drawerEl = document.getElementById(drawerId);
    if ($drawerEl) {
      var drawer_1 = instances.getInstance("Drawer", drawerId);
      if (drawer_1) {
        var toggleDrawer = function() {
          drawer_1.toggle();
        };
        $triggerEl.addEventListener("click", toggleDrawer);
        drawer_1.addEventListenerInstance($triggerEl, "click", toggleDrawer);
      } else {
      }
    } else {
    }
  });
  document.querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]").forEach(function($triggerEl) {
    var drawerId = $triggerEl.getAttribute("data-drawer-dismiss") ? $triggerEl.getAttribute("data-drawer-dismiss") : $triggerEl.getAttribute("data-drawer-hide");
    var $drawerEl = document.getElementById(drawerId);
    if ($drawerEl) {
      var drawer_2 = instances.getInstance("Drawer", drawerId);
      if (drawer_2) {
        var hideDrawer = function() {
          drawer_2.hide();
        };
        $triggerEl.addEventListener("click", hideDrawer);
        drawer_2.addEventListenerInstance($triggerEl, "click", hideDrawer);
      } else {
      }
    } else {
    }
  });
  document.querySelectorAll("[data-drawer-show]").forEach(function($triggerEl) {
    var drawerId = $triggerEl.getAttribute("data-drawer-show");
    var $drawerEl = document.getElementById(drawerId);
    if ($drawerEl) {
      var drawer_3 = instances.getInstance("Drawer", drawerId);
      if (drawer_3) {
        var showDrawer = function() {
          drawer_3.show();
        };
        $triggerEl.addEventListener("click", showDrawer);
        drawer_3.addEventListenerInstance($triggerEl, "click", showDrawer);
      } else {
      }
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Drawer = Drawer;
  window.initDrawers = initDrawers;
}
var __assign$6 = function() {
  __assign$6 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$6.apply(this, arguments);
};
var Default$6 = {
  defaultTabId: null,
  activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
  inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
  onShow: function() {
  }
};
var DefaultInstanceOptions$6 = {
  id: null,
  override: true
};
var Tabs = (
  /** @class */
  (function() {
    function Tabs2(tabsEl, items, options, instanceOptions) {
      if (tabsEl === void 0) {
        tabsEl = null;
      }
      if (items === void 0) {
        items = [];
      }
      if (options === void 0) {
        options = Default$6;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$6;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : tabsEl.id;
      this._tabsEl = tabsEl;
      this._items = items;
      this._activeTab = options ? this.getTab(options.defaultTabId) : null;
      this._options = __assign$6(__assign$6({}, Default$6), options);
      this._initialized = false;
      this.init();
      instances.addInstance("Tabs", this, this._instanceId, instanceOptions.override);
    }
    Tabs2.prototype.init = function() {
      var _this = this;
      if (this._items.length && !this._initialized) {
        if (!this._activeTab) {
          this.setActiveTab(this._items[0]);
        }
        this.show(this._activeTab.id, true);
        this._items.map(function(tab) {
          tab.triggerEl.addEventListener("click", function(event) {
            event.preventDefault();
            _this.show(tab.id);
          });
        });
      }
    };
    Tabs2.prototype.destroy = function() {
      if (this._initialized) {
        this._initialized = false;
      }
    };
    Tabs2.prototype.removeInstance = function() {
      this.destroy();
      instances.removeInstance("Tabs", this._instanceId);
    };
    Tabs2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Tabs2.prototype.getActiveTab = function() {
      return this._activeTab;
    };
    Tabs2.prototype.setActiveTab = function(tab) {
      this._activeTab = tab;
    };
    Tabs2.prototype.getTab = function(id) {
      return this._items.filter(function(t) {
        return t.id === id;
      })[0];
    };
    Tabs2.prototype.show = function(id, forceShow) {
      var _a, _b;
      var _this = this;
      if (forceShow === void 0) {
        forceShow = false;
      }
      var tab = this.getTab(id);
      if (tab === this._activeTab && !forceShow) {
        return;
      }
      this._items.map(function(t) {
        var _a2, _b2;
        if (t !== tab) {
          (_a2 = t.triggerEl.classList).remove.apply(_a2, _this._options.activeClasses.split(" "));
          (_b2 = t.triggerEl.classList).add.apply(_b2, _this._options.inactiveClasses.split(" "));
          t.targetEl.classList.add("hidden");
          t.triggerEl.setAttribute("aria-selected", "false");
        }
      });
      (_a = tab.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(" "));
      (_b = tab.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(" "));
      tab.triggerEl.setAttribute("aria-selected", "true");
      tab.targetEl.classList.remove("hidden");
      this.setActiveTab(tab);
      this._options.onShow(this, tab);
    };
    Tabs2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    return Tabs2;
  })()
);
function initTabs() {
  document.querySelectorAll("[data-tabs-toggle]").forEach(function($parentEl) {
    var tabItems = [];
    var activeClasses = $parentEl.getAttribute("data-tabs-active-classes");
    var inactiveClasses = $parentEl.getAttribute("data-tabs-inactive-classes");
    var defaultTabId = null;
    $parentEl.querySelectorAll('[role="tab"]').forEach(function($triggerEl) {
      var isActive = $triggerEl.getAttribute("aria-selected") === "true";
      var tab = {
        id: $triggerEl.getAttribute("data-tabs-target"),
        triggerEl: $triggerEl,
        targetEl: document.querySelector($triggerEl.getAttribute("data-tabs-target"))
      };
      tabItems.push(tab);
      if (isActive) {
        defaultTabId = tab.id;
      }
    });
    new Tabs($parentEl, tabItems, {
      defaultTabId,
      activeClasses: activeClasses ? activeClasses : Default$6.activeClasses,
      inactiveClasses: inactiveClasses ? inactiveClasses : Default$6.inactiveClasses
    });
  });
}
if (typeof window !== "undefined") {
  window.Tabs = Tabs;
  window.initTabs = initTabs;
}
var __assign$5 = function() {
  __assign$5 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$5.apply(this, arguments);
};
var __spreadArray$1 = function(to2, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar2; i < l; i++) {
    if (ar2 || !(i in from)) {
      if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i);
      ar2[i] = from[i];
    }
  }
  return to2.concat(ar2 || Array.prototype.slice.call(from));
};
var Default$5 = {
  placement: "top",
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$5 = {
  id: null,
  override: true
};
var Tooltip = (
  /** @class */
  (function() {
    function Tooltip2(targetEl, triggerEl, options, instanceOptions) {
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (triggerEl === void 0) {
        triggerEl = null;
      }
      if (options === void 0) {
        options = Default$5;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$5;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._targetEl = targetEl;
      this._triggerEl = triggerEl;
      this._options = __assign$5(__assign$5({}, Default$5), options);
      this._popperInstance = null;
      this._visible = false;
      this._initialized = false;
      this.init();
      instances.addInstance("Tooltip", this, this._instanceId, instanceOptions.override);
    }
    Tooltip2.prototype.init = function() {
      if (this._triggerEl && this._targetEl && !this._initialized) {
        this._setupEventListeners();
        this._popperInstance = this._createPopperInstance();
        this._initialized = true;
      }
    };
    Tooltip2.prototype.destroy = function() {
      var _this = this;
      if (this._initialized) {
        var triggerEvents = this._getTriggerEvents();
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._showHandler);
        });
        triggerEvents.hideEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._hideHandler);
        });
        this._removeKeydownListener();
        this._removeClickOutsideListener();
        if (this._popperInstance) {
          this._popperInstance.destroy();
        }
        this._initialized = false;
      }
    };
    Tooltip2.prototype.removeInstance = function() {
      instances.removeInstance("Tooltip", this._instanceId);
    };
    Tooltip2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Tooltip2.prototype._setupEventListeners = function() {
      var _this = this;
      var triggerEvents = this._getTriggerEvents();
      this._showHandler = function() {
        _this.show();
      };
      this._hideHandler = function() {
        _this.hide();
      };
      triggerEvents.showEvents.forEach(function(ev) {
        _this._triggerEl.addEventListener(ev, _this._showHandler);
      });
      triggerEvents.hideEvents.forEach(function(ev) {
        _this._triggerEl.addEventListener(ev, _this._hideHandler);
      });
    };
    Tooltip2.prototype._createPopperInstance = function() {
      return createPopper(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8]
            }
          }
        ]
      });
    };
    Tooltip2.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    };
    Tooltip2.prototype._setupKeydownListener = function() {
      var _this = this;
      this._keydownEventListener = function(ev) {
        if (ev.key === "Escape") {
          _this.hide();
        }
      };
      document.body.addEventListener("keydown", this._keydownEventListener, true);
    };
    Tooltip2.prototype._removeKeydownListener = function() {
      document.body.removeEventListener("keydown", this._keydownEventListener, true);
    };
    Tooltip2.prototype._setupClickOutsideListener = function() {
      var _this = this;
      this._clickOutsideEventListener = function(ev) {
        _this._handleClickOutside(ev, _this._targetEl);
      };
      document.body.addEventListener("click", this._clickOutsideEventListener, true);
    };
    Tooltip2.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, true);
    };
    Tooltip2.prototype._handleClickOutside = function(ev, targetEl) {
      var clickedEl = ev.target;
      if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this.isVisible()) {
        this.hide();
      }
    };
    Tooltip2.prototype.isVisible = function() {
      return this._visible;
    };
    Tooltip2.prototype.toggle = function() {
      if (this.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
    };
    Tooltip2.prototype.show = function() {
      this._targetEl.classList.remove("opacity-0", "invisible");
      this._targetEl.classList.add("opacity-100", "visible");
      this._popperInstance.setOptions(function(options) {
        return __assign$5(__assign$5({}, options), { modifiers: __spreadArray$1(__spreadArray$1([], options.modifiers, true), [
          { name: "eventListeners", enabled: true }
        ], false) });
      });
      this._setupClickOutsideListener();
      this._setupKeydownListener();
      this._popperInstance.update();
      this._visible = true;
      this._options.onShow(this);
    };
    Tooltip2.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible");
      this._targetEl.classList.add("opacity-0", "invisible");
      this._popperInstance.setOptions(function(options) {
        return __assign$5(__assign$5({}, options), { modifiers: __spreadArray$1(__spreadArray$1([], options.modifiers, true), [
          { name: "eventListeners", enabled: false }
        ], false) });
      });
      this._removeClickOutsideListener();
      this._removeKeydownListener();
      this._visible = false;
      this._options.onHide(this);
    };
    Tooltip2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    Tooltip2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    Tooltip2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Tooltip2;
  })()
);
function initTooltips() {
  document.querySelectorAll("[data-tooltip-target]").forEach(function($triggerEl) {
    var tooltipId = $triggerEl.getAttribute("data-tooltip-target");
    var $tooltipEl = document.getElementById(tooltipId);
    if ($tooltipEl) {
      var triggerType = $triggerEl.getAttribute("data-tooltip-trigger");
      var placement = $triggerEl.getAttribute("data-tooltip-placement");
      new Tooltip($tooltipEl, $triggerEl, {
        placement: placement ? placement : Default$5.placement,
        triggerType: triggerType ? triggerType : Default$5.triggerType
      });
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Tooltip = Tooltip;
  window.initTooltips = initTooltips;
}
var __assign$4 = function() {
  __assign$4 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$4.apply(this, arguments);
};
var __spreadArray = function(to2, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar2; i < l; i++) {
    if (ar2 || !(i in from)) {
      if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i);
      ar2[i] = from[i];
    }
  }
  return to2.concat(ar2 || Array.prototype.slice.call(from));
};
var Default$4 = {
  placement: "top",
  offset: 10,
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$4 = {
  id: null,
  override: true
};
var Popover = (
  /** @class */
  (function() {
    function Popover2(targetEl, triggerEl, options, instanceOptions) {
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (triggerEl === void 0) {
        triggerEl = null;
      }
      if (options === void 0) {
        options = Default$4;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$4;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._targetEl = targetEl;
      this._triggerEl = triggerEl;
      this._options = __assign$4(__assign$4({}, Default$4), options);
      this._popperInstance = null;
      this._visible = false;
      this._initialized = false;
      this.init();
      instances.addInstance("Popover", this, instanceOptions.id ? instanceOptions.id : this._targetEl.id, instanceOptions.override);
    }
    Popover2.prototype.init = function() {
      if (this._triggerEl && this._targetEl && !this._initialized) {
        this._setupEventListeners();
        this._popperInstance = this._createPopperInstance();
        this._initialized = true;
      }
    };
    Popover2.prototype.destroy = function() {
      var _this = this;
      if (this._initialized) {
        var triggerEvents = this._getTriggerEvents();
        triggerEvents.showEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._showHandler);
          _this._targetEl.removeEventListener(ev, _this._showHandler);
        });
        triggerEvents.hideEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._hideHandler);
          _this._targetEl.removeEventListener(ev, _this._hideHandler);
        });
        this._removeKeydownListener();
        this._removeClickOutsideListener();
        if (this._popperInstance) {
          this._popperInstance.destroy();
        }
        this._initialized = false;
      }
    };
    Popover2.prototype.removeInstance = function() {
      instances.removeInstance("Popover", this._instanceId);
    };
    Popover2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Popover2.prototype._setupEventListeners = function() {
      var _this = this;
      var triggerEvents = this._getTriggerEvents();
      this._showHandler = function() {
        _this.show();
      };
      this._hideHandler = function() {
        setTimeout(function() {
          if (!_this._targetEl.matches(":hover")) {
            _this.hide();
          }
        }, 100);
      };
      triggerEvents.showEvents.forEach(function(ev) {
        _this._triggerEl.addEventListener(ev, _this._showHandler);
        _this._targetEl.addEventListener(ev, _this._showHandler);
      });
      triggerEvents.hideEvents.forEach(function(ev) {
        _this._triggerEl.addEventListener(ev, _this._hideHandler);
        _this._targetEl.addEventListener(ev, _this._hideHandler);
      });
    };
    Popover2.prototype._createPopperInstance = function() {
      return createPopper(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, this._options.offset]
            }
          }
        ]
      });
    };
    Popover2.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    };
    Popover2.prototype._setupKeydownListener = function() {
      var _this = this;
      this._keydownEventListener = function(ev) {
        if (ev.key === "Escape") {
          _this.hide();
        }
      };
      document.body.addEventListener("keydown", this._keydownEventListener, true);
    };
    Popover2.prototype._removeKeydownListener = function() {
      document.body.removeEventListener("keydown", this._keydownEventListener, true);
    };
    Popover2.prototype._setupClickOutsideListener = function() {
      var _this = this;
      this._clickOutsideEventListener = function(ev) {
        _this._handleClickOutside(ev, _this._targetEl);
      };
      document.body.addEventListener("click", this._clickOutsideEventListener, true);
    };
    Popover2.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, true);
    };
    Popover2.prototype._handleClickOutside = function(ev, targetEl) {
      var clickedEl = ev.target;
      if (clickedEl !== targetEl && !targetEl.contains(clickedEl) && !this._triggerEl.contains(clickedEl) && this.isVisible()) {
        this.hide();
      }
    };
    Popover2.prototype.isVisible = function() {
      return this._visible;
    };
    Popover2.prototype.toggle = function() {
      if (this.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
      this._options.onToggle(this);
    };
    Popover2.prototype.show = function() {
      this._targetEl.classList.remove("opacity-0", "invisible");
      this._targetEl.classList.add("opacity-100", "visible");
      this._popperInstance.setOptions(function(options) {
        return __assign$4(__assign$4({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
          { name: "eventListeners", enabled: true }
        ], false) });
      });
      this._setupClickOutsideListener();
      this._setupKeydownListener();
      this._popperInstance.update();
      this._visible = true;
      this._options.onShow(this);
    };
    Popover2.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible");
      this._targetEl.classList.add("opacity-0", "invisible");
      this._popperInstance.setOptions(function(options) {
        return __assign$4(__assign$4({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
          { name: "eventListeners", enabled: false }
        ], false) });
      });
      this._removeClickOutsideListener();
      this._removeKeydownListener();
      this._visible = false;
      this._options.onHide(this);
    };
    Popover2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    Popover2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    Popover2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Popover2;
  })()
);
function initPopovers() {
  document.querySelectorAll("[data-popover-target]").forEach(function($triggerEl) {
    var popoverID = $triggerEl.getAttribute("data-popover-target");
    var $popoverEl = document.getElementById(popoverID);
    if ($popoverEl) {
      var triggerType = $triggerEl.getAttribute("data-popover-trigger");
      var placement = $triggerEl.getAttribute("data-popover-placement");
      var offset2 = $triggerEl.getAttribute("data-popover-offset");
      new Popover($popoverEl, $triggerEl, {
        placement: placement ? placement : Default$4.placement,
        offset: offset2 ? parseInt(offset2) : Default$4.offset,
        triggerType: triggerType ? triggerType : Default$4.triggerType
      });
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Popover = Popover;
  window.initPopovers = initPopovers;
}
var __assign$3 = function() {
  __assign$3 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$3.apply(this, arguments);
};
var Default$3 = {
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
};
var DefaultInstanceOptions$3 = {
  id: null,
  override: true
};
var Dial = (
  /** @class */
  (function() {
    function Dial2(parentEl, triggerEl, targetEl, options, instanceOptions) {
      if (parentEl === void 0) {
        parentEl = null;
      }
      if (triggerEl === void 0) {
        triggerEl = null;
      }
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (options === void 0) {
        options = Default$3;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$3;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._parentEl = parentEl;
      this._triggerEl = triggerEl;
      this._targetEl = targetEl;
      this._options = __assign$3(__assign$3({}, Default$3), options);
      this._visible = false;
      this._initialized = false;
      this.init();
      instances.addInstance("Dial", this, this._instanceId, instanceOptions.override);
    }
    Dial2.prototype.init = function() {
      var _this = this;
      if (this._triggerEl && this._targetEl && !this._initialized) {
        var triggerEventTypes = this._getTriggerEventTypes(this._options.triggerType);
        this._showEventHandler = function() {
          _this.show();
        };
        triggerEventTypes.showEvents.forEach(function(ev) {
          _this._triggerEl.addEventListener(ev, _this._showEventHandler);
          _this._targetEl.addEventListener(ev, _this._showEventHandler);
        });
        this._hideEventHandler = function() {
          if (!_this._parentEl.matches(":hover")) {
            _this.hide();
          }
        };
        triggerEventTypes.hideEvents.forEach(function(ev) {
          _this._parentEl.addEventListener(ev, _this._hideEventHandler);
        });
        this._initialized = true;
      }
    };
    Dial2.prototype.destroy = function() {
      var _this = this;
      if (this._initialized) {
        var triggerEventTypes = this._getTriggerEventTypes(this._options.triggerType);
        triggerEventTypes.showEvents.forEach(function(ev) {
          _this._triggerEl.removeEventListener(ev, _this._showEventHandler);
          _this._targetEl.removeEventListener(ev, _this._showEventHandler);
        });
        triggerEventTypes.hideEvents.forEach(function(ev) {
          _this._parentEl.removeEventListener(ev, _this._hideEventHandler);
        });
        this._initialized = false;
      }
    };
    Dial2.prototype.removeInstance = function() {
      instances.removeInstance("Dial", this._instanceId);
    };
    Dial2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Dial2.prototype.hide = function() {
      this._targetEl.classList.add("hidden");
      if (this._triggerEl) {
        this._triggerEl.setAttribute("aria-expanded", "false");
      }
      this._visible = false;
      this._options.onHide(this);
    };
    Dial2.prototype.show = function() {
      this._targetEl.classList.remove("hidden");
      if (this._triggerEl) {
        this._triggerEl.setAttribute("aria-expanded", "true");
      }
      this._visible = true;
      this._options.onShow(this);
    };
    Dial2.prototype.toggle = function() {
      if (this._visible) {
        this.hide();
      } else {
        this.show();
      }
    };
    Dial2.prototype.isHidden = function() {
      return !this._visible;
    };
    Dial2.prototype.isVisible = function() {
      return this._visible;
    };
    Dial2.prototype._getTriggerEventTypes = function(triggerType) {
      switch (triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    };
    Dial2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    Dial2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    Dial2.prototype.updateOnToggle = function(callback) {
      this._options.onToggle = callback;
    };
    return Dial2;
  })()
);
function initDials() {
  document.querySelectorAll("[data-dial-init]").forEach(function($parentEl) {
    var $triggerEl = $parentEl.querySelector("[data-dial-toggle]");
    if ($triggerEl) {
      var dialId = $triggerEl.getAttribute("data-dial-toggle");
      var $dialEl = document.getElementById(dialId);
      if ($dialEl) {
        var triggerType = $triggerEl.getAttribute("data-dial-trigger");
        new Dial($parentEl, $triggerEl, $dialEl, {
          triggerType: triggerType ? triggerType : Default$3.triggerType
        });
      } else {
      }
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Dial = Dial;
  window.initDials = initDials;
}
var __assign$2 = function() {
  __assign$2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$2.apply(this, arguments);
};
var Default$2 = {
  minValue: null,
  maxValue: null,
  onIncrement: function() {
  },
  onDecrement: function() {
  }
};
var DefaultInstanceOptions$2 = {
  id: null,
  override: true
};
var InputCounter = (
  /** @class */
  (function() {
    function InputCounter2(targetEl, incrementEl, decrementEl, options, instanceOptions) {
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (incrementEl === void 0) {
        incrementEl = null;
      }
      if (decrementEl === void 0) {
        decrementEl = null;
      }
      if (options === void 0) {
        options = Default$2;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$2;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._targetEl = targetEl;
      this._incrementEl = incrementEl;
      this._decrementEl = decrementEl;
      this._options = __assign$2(__assign$2({}, Default$2), options);
      this._initialized = false;
      this.init();
      instances.addInstance("InputCounter", this, this._instanceId, instanceOptions.override);
    }
    InputCounter2.prototype.init = function() {
      var _this = this;
      if (this._targetEl && !this._initialized) {
        this._inputHandler = function(event) {
          {
            var target = event.target;
            if (!/^\d*$/.test(target.value)) {
              target.value = target.value.replace(/[^\d]/g, "");
            }
            if (_this._options.maxValue !== null && parseInt(target.value) > _this._options.maxValue) {
              target.value = _this._options.maxValue.toString();
            }
            if (_this._options.minValue !== null && parseInt(target.value) < _this._options.minValue) {
              target.value = _this._options.minValue.toString();
            }
          }
        };
        this._incrementClickHandler = function() {
          _this.increment();
        };
        this._decrementClickHandler = function() {
          _this.decrement();
        };
        this._targetEl.addEventListener("input", this._inputHandler);
        if (this._incrementEl) {
          this._incrementEl.addEventListener("click", this._incrementClickHandler);
        }
        if (this._decrementEl) {
          this._decrementEl.addEventListener("click", this._decrementClickHandler);
        }
        this._initialized = true;
      }
    };
    InputCounter2.prototype.destroy = function() {
      if (this._targetEl && this._initialized) {
        this._targetEl.removeEventListener("input", this._inputHandler);
        if (this._incrementEl) {
          this._incrementEl.removeEventListener("click", this._incrementClickHandler);
        }
        if (this._decrementEl) {
          this._decrementEl.removeEventListener("click", this._decrementClickHandler);
        }
        this._initialized = false;
      }
    };
    InputCounter2.prototype.removeInstance = function() {
      instances.removeInstance("InputCounter", this._instanceId);
    };
    InputCounter2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    InputCounter2.prototype.getCurrentValue = function() {
      return parseInt(this._targetEl.value) || 0;
    };
    InputCounter2.prototype.increment = function() {
      if (this._options.maxValue !== null && this.getCurrentValue() >= this._options.maxValue) {
        return;
      }
      this._targetEl.value = (this.getCurrentValue() + 1).toString();
      this._options.onIncrement(this);
    };
    InputCounter2.prototype.decrement = function() {
      if (this._options.minValue !== null && this.getCurrentValue() <= this._options.minValue) {
        return;
      }
      this._targetEl.value = (this.getCurrentValue() - 1).toString();
      this._options.onDecrement(this);
    };
    InputCounter2.prototype.updateOnIncrement = function(callback) {
      this._options.onIncrement = callback;
    };
    InputCounter2.prototype.updateOnDecrement = function(callback) {
      this._options.onDecrement = callback;
    };
    return InputCounter2;
  })()
);
function initInputCounters() {
  document.querySelectorAll("[data-input-counter]").forEach(function($targetEl) {
    var targetId = $targetEl.id;
    var $incrementEl = document.querySelector('[data-input-counter-increment="' + targetId + '"]');
    var $decrementEl = document.querySelector('[data-input-counter-decrement="' + targetId + '"]');
    var minValue = $targetEl.getAttribute("data-input-counter-min");
    var maxValue = $targetEl.getAttribute("data-input-counter-max");
    if ($targetEl) {
      if (!instances.instanceExists("InputCounter", $targetEl.getAttribute("id"))) {
        new InputCounter($targetEl, $incrementEl ? $incrementEl : null, $decrementEl ? $decrementEl : null, {
          minValue: minValue ? parseInt(minValue) : null,
          maxValue: maxValue ? parseInt(maxValue) : null
        });
      }
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.InputCounter = InputCounter;
  window.initInputCounters = initInputCounters;
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var Default$1 = {
  htmlEntities: false,
  contentType: "input",
  onCopy: function() {
  }
};
var DefaultInstanceOptions$1 = {
  id: null,
  override: true
};
var CopyClipboard = (
  /** @class */
  (function() {
    function CopyClipboard2(triggerEl, targetEl, options, instanceOptions) {
      if (triggerEl === void 0) {
        triggerEl = null;
      }
      if (targetEl === void 0) {
        targetEl = null;
      }
      if (options === void 0) {
        options = Default$1;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions$1;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : targetEl.id;
      this._triggerEl = triggerEl;
      this._targetEl = targetEl;
      this._options = __assign$1(__assign$1({}, Default$1), options);
      this._initialized = false;
      this.init();
      instances.addInstance("CopyClipboard", this, this._instanceId, instanceOptions.override);
    }
    CopyClipboard2.prototype.init = function() {
      var _this = this;
      if (this._targetEl && this._triggerEl && !this._initialized) {
        this._triggerElClickHandler = function() {
          _this.copy();
        };
        if (this._triggerEl) {
          this._triggerEl.addEventListener("click", this._triggerElClickHandler);
        }
        this._initialized = true;
      }
    };
    CopyClipboard2.prototype.destroy = function() {
      if (this._triggerEl && this._targetEl && this._initialized) {
        if (this._triggerEl) {
          this._triggerEl.removeEventListener("click", this._triggerElClickHandler);
        }
        this._initialized = false;
      }
    };
    CopyClipboard2.prototype.removeInstance = function() {
      instances.removeInstance("CopyClipboard", this._instanceId);
    };
    CopyClipboard2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    CopyClipboard2.prototype.getTargetValue = function() {
      if (this._options.contentType === "input") {
        return this._targetEl.value;
      }
      if (this._options.contentType === "innerHTML") {
        return this._targetEl.innerHTML;
      }
      if (this._options.contentType === "textContent") {
        return this._targetEl.textContent.replace(/\s+/g, " ").trim();
      }
    };
    CopyClipboard2.prototype.copy = function() {
      var textToCopy = this.getTargetValue();
      if (this._options.htmlEntities) {
        textToCopy = this.decodeHTML(textToCopy);
      }
      var tempTextArea = document.createElement("textarea");
      tempTextArea.value = textToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);
      this._options.onCopy(this);
      return textToCopy;
    };
    CopyClipboard2.prototype.decodeHTML = function(html) {
      var textarea = document.createElement("textarea");
      textarea.innerHTML = html;
      return textarea.textContent;
    };
    CopyClipboard2.prototype.updateOnCopyCallback = function(callback) {
      this._options.onCopy = callback;
    };
    return CopyClipboard2;
  })()
);
function initCopyClipboards() {
  document.querySelectorAll("[data-copy-to-clipboard-target]").forEach(function($triggerEl) {
    var targetId = $triggerEl.getAttribute("data-copy-to-clipboard-target");
    var $targetEl = document.getElementById(targetId);
    var contentType = $triggerEl.getAttribute("data-copy-to-clipboard-content-type");
    var htmlEntities = $triggerEl.getAttribute("data-copy-to-clipboard-html-entities");
    if ($targetEl) {
      if (!instances.instanceExists("CopyClipboard", $targetEl.getAttribute("id"))) {
        new CopyClipboard($triggerEl, $targetEl, {
          htmlEntities: htmlEntities && htmlEntities === "true" ? true : Default$1.htmlEntities,
          contentType: contentType ? contentType : Default$1.contentType
        });
      }
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.CopyClipboard = CopyClipboard;
  window.initClipboards = initCopyClipboards;
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function() {
    return !!t;
  })();
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f2 = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f2 = false;
      } else for (; !(f2 = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f2 = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f2 && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)); ) ;
  return t;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function hasProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function lastItemOf(arr) {
  return arr[arr.length - 1];
}
function pushUnique(arr) {
  for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    items[_key - 1] = arguments[_key];
  }
  items.forEach(function(item) {
    if (arr.includes(item)) {
      return;
    }
    arr.push(item);
  });
  return arr;
}
function stringToArray(str, separator) {
  return str ? str.split(separator) : [];
}
function isInRange(testVal, min2, max2) {
  var minOK = min2 === void 0 || testVal >= min2;
  var maxOK = max2 === void 0 || testVal <= max2;
  return minOK && maxOK;
}
function limitToRange(val, min2, max2) {
  if (val < min2) {
    return min2;
  }
  if (val > max2) {
    return max2;
  }
  return val;
}
function createTagRepeat(tagName, repeat) {
  var attributes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var index = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  var html = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "";
  var openTagSrc = Object.keys(attributes).reduce(function(src, attr) {
    var val = attributes[attr];
    if (typeof val === "function") {
      val = val(index);
    }
    return "".concat(src, " ").concat(attr, '="').concat(val, '"');
  }, tagName);
  html += "<".concat(openTagSrc, "></").concat(tagName, ">");
  var next = index + 1;
  return next < repeat ? createTagRepeat(tagName, repeat, attributes, next, html) : html;
}
function optimizeTemplateHTML(html) {
  return html.replace(/>\s+/g, ">").replace(/\s+</, "<");
}
function stripTime(timeValue) {
  return new Date(timeValue).setHours(0, 0, 0, 0);
}
function today() {
  return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
}
function dateValue() {
  switch (arguments.length) {
    case 0:
      return today();
    case 1:
      return stripTime(arguments.length <= 0 ? void 0 : arguments[0]);
  }
  var newDate = /* @__PURE__ */ new Date(0);
  newDate.setFullYear.apply(newDate, arguments);
  return newDate.setHours(0, 0, 0, 0);
}
function addDays(date, amount) {
  var newDate = new Date(date);
  return newDate.setDate(newDate.getDate() + amount);
}
function addWeeks(date, amount) {
  return addDays(date, amount * 7);
}
function addMonths(date, amount) {
  var newDate = new Date(date);
  var monthsToSet = newDate.getMonth() + amount;
  var expectedMonth = monthsToSet % 12;
  if (expectedMonth < 0) {
    expectedMonth += 12;
  }
  var time = newDate.setMonth(monthsToSet);
  return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
}
function addYears(date, amount) {
  var newDate = new Date(date);
  var expectedMonth = newDate.getMonth();
  var time = newDate.setFullYear(newDate.getFullYear() + amount);
  return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
}
function dayDiff(day, from) {
  return (day - from + 7) % 7;
}
function dayOfTheWeekOf(baseDate, dayOfWeek) {
  var weekStart = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var baseDay = new Date(baseDate).getDay();
  return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart));
}
function getWeek(date) {
  var thuOfTheWeek = dayOfTheWeekOf(date, 4, 1);
  var firstThu = dayOfTheWeekOf(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
  return Math.round((thuOfTheWeek - firstThu) / 6048e5) + 1;
}
function startOfYearPeriod(date, years) {
  var year = new Date(date).getFullYear();
  return Math.floor(year / years) * years;
}
var reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
var reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;
var knownFormats = {};
var parseFns = {
  y: function y(date, year) {
    return new Date(date).setFullYear(parseInt(year, 10));
  },
  m: function m(date, month, locale) {
    var newDate = new Date(date);
    var monthIndex = parseInt(month, 10) - 1;
    if (isNaN(monthIndex)) {
      if (!month) {
        return NaN;
      }
      var monthName = month.toLowerCase();
      var compareNames = function compareNames2(name) {
        return name.toLowerCase().startsWith(monthName);
      };
      monthIndex = locale.monthsShort.findIndex(compareNames);
      if (monthIndex < 0) {
        monthIndex = locale.months.findIndex(compareNames);
      }
      if (monthIndex < 0) {
        return NaN;
      }
    }
    newDate.setMonth(monthIndex);
    return newDate.getMonth() !== normalizeMonth(monthIndex) ? newDate.setDate(0) : newDate.getTime();
  },
  d: function d(date, day) {
    return new Date(date).setDate(parseInt(day, 10));
  }
};
var formatFns = {
  d: function d2(date) {
    return date.getDate();
  },
  dd: function dd(date) {
    return padZero(date.getDate(), 2);
  },
  D: function D(date, locale) {
    return locale.daysShort[date.getDay()];
  },
  DD: function DD(date, locale) {
    return locale.days[date.getDay()];
  },
  m: function m2(date) {
    return date.getMonth() + 1;
  },
  mm: function mm(date) {
    return padZero(date.getMonth() + 1, 2);
  },
  M: function M(date, locale) {
    return locale.monthsShort[date.getMonth()];
  },
  MM: function MM(date, locale) {
    return locale.months[date.getMonth()];
  },
  y: function y2(date) {
    return date.getFullYear();
  },
  yy: function yy(date) {
    return padZero(date.getFullYear(), 2).slice(-2);
  },
  yyyy: function yyyy(date) {
    return padZero(date.getFullYear(), 4);
  }
};
function normalizeMonth(monthIndex) {
  return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
}
function padZero(num, length) {
  return num.toString().padStart(length, "0");
}
function parseFormatString(format) {
  if (typeof format !== "string") {
    throw new Error("Invalid date format.");
  }
  if (format in knownFormats) {
    return knownFormats[format];
  }
  var separators = format.split(reFormatTokens);
  var parts = format.match(new RegExp(reFormatTokens, "g"));
  if (separators.length === 0 || !parts) {
    throw new Error("Invalid date format.");
  }
  var partFormatters = parts.map(function(token) {
    return formatFns[token];
  });
  var partParserKeys = Object.keys(parseFns).reduce(function(keys, key) {
    var token = parts.find(function(part) {
      return part[0] !== "D" && part[0].toLowerCase() === key;
    });
    if (token) {
      keys.push(key);
    }
    return keys;
  }, []);
  return knownFormats[format] = {
    parser: function parser(dateStr, locale) {
      var dateParts = dateStr.split(reNonDateParts).reduce(function(dtParts, part, index) {
        if (part.length > 0 && parts[index]) {
          var token = parts[index][0];
          if (token === "M") {
            dtParts.m = part;
          } else if (token !== "D") {
            dtParts[token] = part;
          }
        }
        return dtParts;
      }, {});
      return partParserKeys.reduce(function(origDate, key) {
        var newDate = parseFns[key](origDate, dateParts[key], locale);
        return isNaN(newDate) ? origDate : newDate;
      }, today());
    },
    formatter: function formatter(date, locale) {
      var dateStr = partFormatters.reduce(function(str, fn3, index) {
        return str += "".concat(separators[index]).concat(fn3(date, locale));
      }, "");
      return dateStr += lastItemOf(separators);
    }
  };
}
function parseDate(dateStr, format, locale) {
  if (dateStr instanceof Date || typeof dateStr === "number") {
    var date = stripTime(dateStr);
    return isNaN(date) ? void 0 : date;
  }
  if (!dateStr) {
    return void 0;
  }
  if (dateStr === "today") {
    return today();
  }
  if (format && format.toValue) {
    var _date = format.toValue(dateStr, format, locale);
    return isNaN(_date) ? void 0 : stripTime(_date);
  }
  return parseFormatString(format).parser(dateStr, locale);
}
function formatDate(date, format, locale) {
  if (isNaN(date) || !date && date !== 0) {
    return "";
  }
  var dateObj = typeof date === "number" ? new Date(date) : date;
  if (format.toDisplay) {
    return format.toDisplay(dateObj, format, locale);
  }
  return parseFormatString(format).formatter(dateObj, locale);
}
var listenerRegistry = /* @__PURE__ */ new WeakMap();
var _EventTarget$prototyp = EventTarget.prototype, addEventListener = _EventTarget$prototyp.addEventListener, removeEventListener = _EventTarget$prototyp.removeEventListener;
function registerListeners(keyObj, listeners) {
  var registered = listenerRegistry.get(keyObj);
  if (!registered) {
    registered = [];
    listenerRegistry.set(keyObj, registered);
  }
  listeners.forEach(function(listener) {
    addEventListener.call.apply(addEventListener, _toConsumableArray(listener));
    registered.push(listener);
  });
}
function unregisterListeners(keyObj) {
  var listeners = listenerRegistry.get(keyObj);
  if (!listeners) {
    return;
  }
  listeners.forEach(function(listener) {
    removeEventListener.call.apply(removeEventListener, _toConsumableArray(listener));
  });
  listenerRegistry["delete"](keyObj);
}
if (!Event.prototype.composedPath) {
  var getComposedPath = function getComposedPath2(node) {
    var path = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    path.push(node);
    var parent;
    if (node.parentNode) {
      parent = node.parentNode;
    } else if (node.host) {
      parent = node.host;
    } else if (node.defaultView) {
      parent = node.defaultView;
    }
    return parent ? getComposedPath2(parent, path) : path;
  };
  Event.prototype.composedPath = function() {
    return getComposedPath(this.target);
  };
}
function findFromPath(path, criteria, currentTarget) {
  var index = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  var el = path[index];
  if (criteria(el)) {
    return el;
  } else if (el === currentTarget || !el.parentElement) {
    return;
  }
  return findFromPath(path, criteria, currentTarget, index + 1);
}
function findElementInEventPath(ev, selector) {
  var criteria = typeof selector === "function" ? selector : function(el) {
    return el.matches(selector);
  };
  return findFromPath(ev.composedPath(), criteria, ev.currentTarget);
}
var locales = {
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    titleFormat: "MM y"
  }
};
var defaultOptions = {
  autohide: false,
  beforeShowDay: null,
  beforeShowDecade: null,
  beforeShowMonth: null,
  beforeShowYear: null,
  calendarWeeks: false,
  clearBtn: false,
  dateDelimiter: ",",
  datesDisabled: [],
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  defaultViewDate: void 0,
  // placeholder, defaults to today() by the program
  disableTouchKeyboard: false,
  format: "mm/dd/yyyy",
  language: "en",
  maxDate: null,
  maxNumberOfDates: 1,
  maxView: 3,
  minDate: null,
  nextArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>',
  orientation: "auto",
  pickLevel: 0,
  prevArrow: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>',
  showDaysOfWeek: true,
  showOnClick: true,
  showOnFocus: true,
  startView: 0,
  title: "",
  todayBtn: false,
  todayBtnMode: 0,
  todayHighlight: false,
  updateOnBlur: true,
  weekStart: 0
};
var range = null;
function parseHTML(html) {
  if (range == null) {
    range = document.createRange();
  }
  return range.createContextualFragment(html);
}
function hideElement(el) {
  if (el.style.display === "none") {
    return;
  }
  if (el.style.display) {
    el.dataset.styleDisplay = el.style.display;
  }
  el.style.display = "none";
}
function showElement(el) {
  if (el.style.display !== "none") {
    return;
  }
  if (el.dataset.styleDisplay) {
    el.style.display = el.dataset.styleDisplay;
    delete el.dataset.styleDisplay;
  } else {
    el.style.display = "";
  }
}
function emptyChildNodes(el) {
  if (el.firstChild) {
    el.removeChild(el.firstChild);
    emptyChildNodes(el);
  }
}
function replaceChildNodes(el, newChildNodes) {
  emptyChildNodes(el);
  if (newChildNodes instanceof DocumentFragment) {
    el.appendChild(newChildNodes);
  } else if (typeof newChildNodes === "string") {
    el.appendChild(parseHTML(newChildNodes));
  } else if (typeof newChildNodes.forEach === "function") {
    newChildNodes.forEach(function(node) {
      el.appendChild(node);
    });
  }
}
var defaultLang = defaultOptions.language, defaultFormat = defaultOptions.format, defaultWeekStart = defaultOptions.weekStart;
function sanitizeDOW(dow, day) {
  return dow.length < 6 && day >= 0 && day < 7 ? pushUnique(dow, day) : dow;
}
function calcEndOfWeek(startOfWeek) {
  return (startOfWeek + 6) % 7;
}
function validateDate(value, format, locale, origValue) {
  var date = parseDate(value, format, locale);
  return date !== void 0 ? date : origValue;
}
function validateViewId(value, origValue) {
  var max2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 3;
  var viewId = parseInt(value, 10);
  return viewId >= 0 && viewId <= max2 ? viewId : origValue;
}
function processOptions(options, datepicker) {
  var inOpts = Object.assign({}, options);
  var config = {};
  var locales2 = datepicker.constructor.locales;
  var _ref = datepicker.config || {}, format = _ref.format, language = _ref.language, locale = _ref.locale, maxDate = _ref.maxDate, maxView = _ref.maxView, minDate = _ref.minDate, pickLevel = _ref.pickLevel, startView = _ref.startView, weekStart = _ref.weekStart;
  if (inOpts.language) {
    var lang;
    if (inOpts.language !== language) {
      if (locales2[inOpts.language]) {
        lang = inOpts.language;
      } else {
        lang = inOpts.language.split("-")[0];
        if (locales2[lang] === void 0) {
          lang = false;
        }
      }
    }
    delete inOpts.language;
    if (lang) {
      language = config.language = lang;
      var origLocale = locale || locales2[defaultLang];
      locale = Object.assign({
        format: defaultFormat,
        weekStart: defaultWeekStart
      }, locales2[defaultLang]);
      if (language !== defaultLang) {
        Object.assign(locale, locales2[language]);
      }
      config.locale = locale;
      if (format === origLocale.format) {
        format = config.format = locale.format;
      }
      if (weekStart === origLocale.weekStart) {
        weekStart = config.weekStart = locale.weekStart;
        config.weekEnd = calcEndOfWeek(locale.weekStart);
      }
    }
  }
  if (inOpts.format) {
    var hasToDisplay = typeof inOpts.format.toDisplay === "function";
    var hasToValue = typeof inOpts.format.toValue === "function";
    var validFormatString = reFormatTokens.test(inOpts.format);
    if (hasToDisplay && hasToValue || validFormatString) {
      format = config.format = inOpts.format;
    }
    delete inOpts.format;
  }
  var minDt = minDate;
  var maxDt = maxDate;
  if (inOpts.minDate !== void 0) {
    minDt = inOpts.minDate === null ? dateValue(0, 0, 1) : validateDate(inOpts.minDate, format, locale, minDt);
    delete inOpts.minDate;
  }
  if (inOpts.maxDate !== void 0) {
    maxDt = inOpts.maxDate === null ? void 0 : validateDate(inOpts.maxDate, format, locale, maxDt);
    delete inOpts.maxDate;
  }
  if (maxDt < minDt) {
    minDate = config.minDate = maxDt;
    maxDate = config.maxDate = minDt;
  } else {
    if (minDate !== minDt) {
      minDate = config.minDate = minDt;
    }
    if (maxDate !== maxDt) {
      maxDate = config.maxDate = maxDt;
    }
  }
  if (inOpts.datesDisabled) {
    config.datesDisabled = inOpts.datesDisabled.reduce(function(dates, dt2) {
      var date = parseDate(dt2, format, locale);
      return date !== void 0 ? pushUnique(dates, date) : dates;
    }, []);
    delete inOpts.datesDisabled;
  }
  if (inOpts.defaultViewDate !== void 0) {
    var viewDate = parseDate(inOpts.defaultViewDate, format, locale);
    if (viewDate !== void 0) {
      config.defaultViewDate = viewDate;
    }
    delete inOpts.defaultViewDate;
  }
  if (inOpts.weekStart !== void 0) {
    var wkStart = Number(inOpts.weekStart) % 7;
    if (!isNaN(wkStart)) {
      weekStart = config.weekStart = wkStart;
      config.weekEnd = calcEndOfWeek(wkStart);
    }
    delete inOpts.weekStart;
  }
  if (inOpts.daysOfWeekDisabled) {
    config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekDisabled;
  }
  if (inOpts.daysOfWeekHighlighted) {
    config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekHighlighted;
  }
  if (inOpts.maxNumberOfDates !== void 0) {
    var maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);
    if (maxNumberOfDates >= 0) {
      config.maxNumberOfDates = maxNumberOfDates;
      config.multidate = maxNumberOfDates !== 1;
    }
    delete inOpts.maxNumberOfDates;
  }
  if (inOpts.dateDelimiter) {
    config.dateDelimiter = String(inOpts.dateDelimiter);
    delete inOpts.dateDelimiter;
  }
  var newPickLevel = pickLevel;
  if (inOpts.pickLevel !== void 0) {
    newPickLevel = validateViewId(inOpts.pickLevel, 2);
    delete inOpts.pickLevel;
  }
  if (newPickLevel !== pickLevel) {
    pickLevel = config.pickLevel = newPickLevel;
  }
  var newMaxView = maxView;
  if (inOpts.maxView !== void 0) {
    newMaxView = validateViewId(inOpts.maxView, maxView);
    delete inOpts.maxView;
  }
  newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;
  if (newMaxView !== maxView) {
    maxView = config.maxView = newMaxView;
  }
  var newStartView = startView;
  if (inOpts.startView !== void 0) {
    newStartView = validateViewId(inOpts.startView, newStartView);
    delete inOpts.startView;
  }
  if (newStartView < pickLevel) {
    newStartView = pickLevel;
  } else if (newStartView > maxView) {
    newStartView = maxView;
  }
  if (newStartView !== startView) {
    config.startView = newStartView;
  }
  if (inOpts.prevArrow) {
    var prevArrow = parseHTML(inOpts.prevArrow);
    if (prevArrow.childNodes.length > 0) {
      config.prevArrow = prevArrow.childNodes;
    }
    delete inOpts.prevArrow;
  }
  if (inOpts.nextArrow) {
    var nextArrow = parseHTML(inOpts.nextArrow);
    if (nextArrow.childNodes.length > 0) {
      config.nextArrow = nextArrow.childNodes;
    }
    delete inOpts.nextArrow;
  }
  if (inOpts.disableTouchKeyboard !== void 0) {
    config.disableTouchKeyboard = "ontouchstart" in document && !!inOpts.disableTouchKeyboard;
    delete inOpts.disableTouchKeyboard;
  }
  if (inOpts.orientation) {
    var orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
    config.orientation = {
      x: orientation.find(function(x2) {
        return x2 === "left" || x2 === "right";
      }) || "auto",
      y: orientation.find(function(y3) {
        return y3 === "top" || y3 === "bottom";
      }) || "auto"
    };
    delete inOpts.orientation;
  }
  if (inOpts.todayBtnMode !== void 0) {
    switch (inOpts.todayBtnMode) {
      case 0:
      case 1:
        config.todayBtnMode = inOpts.todayBtnMode;
    }
    delete inOpts.todayBtnMode;
  }
  Object.keys(inOpts).forEach(function(key) {
    if (inOpts[key] !== void 0 && hasProperty(defaultOptions, key)) {
      config[key] = inOpts[key];
    }
  });
  return config;
}
var pickerTemplate = optimizeTemplateHTML('<div class="datepicker hidden">\n  <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">\n    <div class="datepicker-header">\n      <div class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"></div>\n      <div class="datepicker-controls flex justify-between mb-2">\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>\n        <button type="button" class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>\n        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>\n      </div>\n    </div>\n    <div class="datepicker-main p-1"></div>\n    <div class="datepicker-footer">\n      <div class="datepicker-controls flex space-x-2 rtl:space-x-reverse mt-2">\n        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 !bg-primary-700 dark:bg-blue-600 dark:!bg-primary-600 hover:bg-blue-800 hover:!bg-primary-800 dark:hover:bg-blue-700 dark:hover:!bg-primary-700 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n        <button type="button" class="%buttonClass% clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n      </div>\n    </div>\n  </div>\n</div>');
var daysTemplate = optimizeTemplateHTML('<div class="days">\n  <div class="days-of-week grid grid-cols-7 mb-1">'.concat(createTagRepeat("span", 7, {
  "class": "dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"
}), '</div>\n  <div class="datepicker-grid w-64 grid grid-cols-7">').concat(createTagRepeat("span", 42, {
  "class": "block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"
}), "</div>\n</div>"));
var calendarWeeksTemplate = optimizeTemplateHTML('<div class="calendar-weeks">\n  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"></span></div>\n  <div class="weeks">'.concat(createTagRepeat("span", 6, {
  "class": "week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm"
}), "</div>\n</div>"));
var View = /* @__PURE__ */ (function() {
  function View2(picker, config) {
    _classCallCheck(this, View2);
    Object.assign(this, config, {
      picker,
      element: parseHTML('<div class="datepicker-view flex"></div>').firstChild,
      selected: []
    });
    this.init(this.picker.datepicker.config);
  }
  return _createClass(View2, [{
    key: "init",
    value: function init(options) {
      if (options.pickLevel !== void 0) {
        this.isMinView = this.id === options.pickLevel;
      }
      this.setOptions(options);
      this.updateFocus();
      this.updateSelection();
    }
    // Execute beforeShow() callback and apply the result to the element
    // args:
    // - current - current value on the iteration on view rendering
    // - timeValue - time value of the date to pass to beforeShow()
  }, {
    key: "performBeforeHook",
    value: function performBeforeHook(el, current, timeValue) {
      var result = this.beforeShow(new Date(timeValue));
      switch (_typeof(result)) {
        case "boolean":
          result = {
            enabled: result
          };
          break;
        case "string":
          result = {
            classes: result
          };
      }
      if (result) {
        if (result.enabled === false) {
          el.classList.add("disabled");
          pushUnique(this.disabled, current);
        }
        if (result.classes) {
          var _el$classList;
          var extraClasses = result.classes.split(/\s+/);
          (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(extraClasses));
          if (extraClasses.includes("disabled")) {
            pushUnique(this.disabled, current);
          }
        }
        if (result.content) {
          replaceChildNodes(el, result.content);
        }
      }
    }
  }]);
})();
var DaysView = /* @__PURE__ */ (function(_View) {
  function DaysView2(picker) {
    _classCallCheck(this, DaysView2);
    return _callSuper(this, DaysView2, [picker, {
      id: 0,
      name: "days",
      cellClass: "day"
    }]);
  }
  _inherits(DaysView2, _View);
  return _createClass(DaysView2, [{
    key: "init",
    value: function init(options) {
      var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (onConstruction) {
        var inner = parseHTML(daysTemplate).firstChild;
        this.dow = inner.firstChild;
        this.grid = inner.lastChild;
        this.element.appendChild(inner);
      }
      _get(_getPrototypeOf(DaysView2.prototype), "init", this).call(this, options);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var _this = this;
      var updateDOW;
      if (hasProperty(options, "minDate")) {
        this.minDate = options.minDate;
      }
      if (hasProperty(options, "maxDate")) {
        this.maxDate = options.maxDate;
      }
      if (options.datesDisabled) {
        this.datesDisabled = options.datesDisabled;
      }
      if (options.daysOfWeekDisabled) {
        this.daysOfWeekDisabled = options.daysOfWeekDisabled;
        updateDOW = true;
      }
      if (options.daysOfWeekHighlighted) {
        this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
      }
      if (options.todayHighlight !== void 0) {
        this.todayHighlight = options.todayHighlight;
      }
      if (options.weekStart !== void 0) {
        this.weekStart = options.weekStart;
        this.weekEnd = options.weekEnd;
        updateDOW = true;
      }
      if (options.locale) {
        var locale = this.locale = options.locale;
        this.dayNames = locale.daysMin;
        this.switchLabelFormat = locale.titleFormat;
        updateDOW = true;
      }
      if (options.beforeShowDay !== void 0) {
        this.beforeShow = typeof options.beforeShowDay === "function" ? options.beforeShowDay : void 0;
      }
      if (options.calendarWeeks !== void 0) {
        if (options.calendarWeeks && !this.calendarWeeks) {
          var weeksElem = parseHTML(calendarWeeksTemplate).firstChild;
          this.calendarWeeks = {
            element: weeksElem,
            dow: weeksElem.firstChild,
            weeks: weeksElem.lastChild
          };
          this.element.insertBefore(weeksElem, this.element.firstChild);
        } else if (this.calendarWeeks && !options.calendarWeeks) {
          this.element.removeChild(this.calendarWeeks.element);
          this.calendarWeeks = null;
        }
      }
      if (options.showDaysOfWeek !== void 0) {
        if (options.showDaysOfWeek) {
          showElement(this.dow);
          if (this.calendarWeeks) {
            showElement(this.calendarWeeks.dow);
          }
        } else {
          hideElement(this.dow);
          if (this.calendarWeeks) {
            hideElement(this.calendarWeeks.dow);
          }
        }
      }
      if (updateDOW) {
        Array.from(this.dow.children).forEach(function(el, index) {
          var dow = (_this.weekStart + index) % 7;
          el.textContent = _this.dayNames[dow];
          el.className = _this.daysOfWeekDisabled.includes(dow) ? "dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed" : "dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400";
        });
      }
    }
    // Apply update on the focused date to view's settings
  }, {
    key: "updateFocus",
    value: function updateFocus() {
      var viewDate = new Date(this.picker.viewDate);
      var viewYear = viewDate.getFullYear();
      var viewMonth = viewDate.getMonth();
      var firstOfMonth = dateValue(viewYear, viewMonth, 1);
      var start2 = dayOfTheWeekOf(firstOfMonth, this.weekStart, this.weekStart);
      this.first = firstOfMonth;
      this.last = dateValue(viewYear, viewMonth + 1, 0);
      this.start = start2;
      this.focused = this.picker.viewDate;
    }
    // Apply update on the selected dates to view's settings
  }, {
    key: "updateSelection",
    value: function updateSelection() {
      var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
      this.selected = dates;
      if (rangepicker) {
        this.range = rangepicker.dates;
      }
    }
    // Update the entire view UI
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      this.today = this.todayHighlight ? today() : void 0;
      this.disabled = _toConsumableArray(this.datesDisabled);
      var switchLabel = formatDate(this.focused, this.switchLabelFormat, this.locale);
      this.picker.setViewSwitchLabel(switchLabel);
      this.picker.setPrevBtnDisabled(this.first <= this.minDate);
      this.picker.setNextBtnDisabled(this.last >= this.maxDate);
      if (this.calendarWeeks) {
        var startOfWeek = dayOfTheWeekOf(this.first, 1, 1);
        Array.from(this.calendarWeeks.weeks.children).forEach(function(el, index) {
          el.textContent = getWeek(addWeeks(startOfWeek, index));
        });
      }
      Array.from(this.grid.children).forEach(function(el, index) {
        var classList = el.classList;
        var current = addDays(_this2.start, index);
        var date = new Date(current);
        var day = date.getDay();
        el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this2.cellClass);
        el.dataset.date = current;
        el.textContent = date.getDate();
        if (current < _this2.first) {
          classList.add("prev", "text-gray-500", "dark:text-white");
        } else if (current > _this2.last) {
          classList.add("next", "text-gray-500", "dark:text-white");
        }
        if (_this2.today === current) {
          classList.add("today", "bg-gray-100", "dark:bg-gray-600");
        }
        if (current < _this2.minDate || current > _this2.maxDate || _this2.disabled.includes(current)) {
          classList.add("disabled", "cursor-not-allowed", "text-gray-400", "dark:text-gray-500");
          classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-600", "text-gray-900", "dark:text-white", "cursor-pointer");
        }
        if (_this2.daysOfWeekDisabled.includes(day)) {
          classList.add("disabled", "cursor-not-allowed", "text-gray-400", "dark:text-gray-500");
          classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-600", "text-gray-900", "dark:text-white", "cursor-pointer");
          pushUnique(_this2.disabled, current);
        }
        if (_this2.daysOfWeekHighlighted.includes(day)) {
          classList.add("highlighted");
        }
        if (_this2.range) {
          var _this2$range = _slicedToArray(_this2.range, 2), rangeStart = _this2$range[0], rangeEnd = _this2$range[1];
          if (current > rangeStart && current < rangeEnd) {
            classList.add("range", "bg-gray-200", "dark:bg-gray-600");
            classList.remove("rounded-lg", "rounded-l-lg", "rounded-r-lg");
          }
          if (current === rangeStart) {
            classList.add("range-start", "bg-gray-100", "dark:bg-gray-600", "rounded-l-lg");
            classList.remove("rounded-lg", "rounded-r-lg");
          }
          if (current === rangeEnd) {
            classList.add("range-end", "bg-gray-100", "dark:bg-gray-600", "rounded-r-lg");
            classList.remove("rounded-lg", "rounded-l-lg");
          }
        }
        if (_this2.selected.includes(current)) {
          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
          classList.remove("text-gray-900", "text-gray-500", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "dark:bg-gray-600", "bg-gray-100", "bg-gray-200");
        }
        if (current === _this2.focused) {
          classList.add("focused");
        }
        if (_this2.beforeShow) {
          _this2.performBeforeHook(el, current, current);
        }
      });
    }
    // Update the view UI by applying the changes of selected and focused items
  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;
      var _ref = this.range || [], _ref2 = _slicedToArray(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
      this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
        el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white", "focused");
        el.classList.add("text-gray-900", "rounded-lg", "dark:text-white");
      });
      Array.from(this.grid.children).forEach(function(el) {
        var current = Number(el.dataset.date);
        var classList = el.classList;
        classList.remove("bg-gray-200", "dark:bg-gray-600", "rounded-l-lg", "rounded-r-lg");
        if (current > rangeStart && current < rangeEnd) {
          classList.add("range", "bg-gray-200", "dark:bg-gray-600");
          classList.remove("rounded-lg");
        }
        if (current === rangeStart) {
          classList.add("range-start", "bg-gray-200", "dark:bg-gray-600", "rounded-l-lg");
          classList.remove("rounded-lg");
        }
        if (current === rangeEnd) {
          classList.add("range-end", "bg-gray-200", "dark:bg-gray-600", "rounded-r-lg");
          classList.remove("rounded-lg");
        }
        if (_this3.selected.includes(current)) {
          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600", "bg-gray-100", "bg-gray-200", "dark:bg-gray-600");
        }
        if (current === _this3.focused) {
          classList.add("focused");
        }
      });
    }
    // Update the view UI by applying the change of focused item
  }, {
    key: "refreshFocus",
    value: function refreshFocus() {
      var index = Math.round((this.focused - this.start) / 864e5);
      this.grid.querySelectorAll(".focused").forEach(function(el) {
        el.classList.remove("focused");
      });
      this.grid.children[index].classList.add("focused");
    }
  }]);
})(View);
function computeMonthRange(range2, thisYear) {
  if (!range2 || !range2[0] || !range2[1]) {
    return;
  }
  var _range = _slicedToArray(range2, 2), _range$ = _slicedToArray(_range[0], 2), startY = _range$[0], startM = _range$[1], _range$2 = _slicedToArray(_range[1], 2), endY = _range$2[0], endM = _range$2[1];
  if (startY > thisYear || endY < thisYear) {
    return;
  }
  return [startY === thisYear ? startM : -1, endY === thisYear ? endM : 12];
}
var MonthsView = /* @__PURE__ */ (function(_View) {
  function MonthsView2(picker) {
    _classCallCheck(this, MonthsView2);
    return _callSuper(this, MonthsView2, [picker, {
      id: 1,
      name: "months",
      cellClass: "month"
    }]);
  }
  _inherits(MonthsView2, _View);
  return _createClass(MonthsView2, [{
    key: "init",
    value: function init(options) {
      var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (onConstruction) {
        this.grid = this.element;
        this.element.classList.add("months", "datepicker-grid", "w-64", "grid", "grid-cols-4");
        this.grid.appendChild(parseHTML(createTagRepeat("span", 12, {
          "data-month": function dataMonth(ix) {
            return ix;
          }
        })));
      }
      _get(_getPrototypeOf(MonthsView2.prototype), "init", this).call(this, options);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (options.locale) {
        this.monthNames = options.locale.monthsShort;
      }
      if (hasProperty(options, "minDate")) {
        if (options.minDate === void 0) {
          this.minYear = this.minMonth = this.minDate = void 0;
        } else {
          var minDateObj = new Date(options.minDate);
          this.minYear = minDateObj.getFullYear();
          this.minMonth = minDateObj.getMonth();
          this.minDate = minDateObj.setDate(1);
        }
      }
      if (hasProperty(options, "maxDate")) {
        if (options.maxDate === void 0) {
          this.maxYear = this.maxMonth = this.maxDate = void 0;
        } else {
          var maxDateObj = new Date(options.maxDate);
          this.maxYear = maxDateObj.getFullYear();
          this.maxMonth = maxDateObj.getMonth();
          this.maxDate = dateValue(this.maxYear, this.maxMonth + 1, 0);
        }
      }
      if (options.beforeShowMonth !== void 0) {
        this.beforeShow = typeof options.beforeShowMonth === "function" ? options.beforeShowMonth : void 0;
      }
    }
    // Update view's settings to reflect the viewDate set on the picker
  }, {
    key: "updateFocus",
    value: function updateFocus() {
      var viewDate = new Date(this.picker.viewDate);
      this.year = viewDate.getFullYear();
      this.focused = viewDate.getMonth();
    }
    // Update view's settings to reflect the selected dates
  }, {
    key: "updateSelection",
    value: function updateSelection() {
      var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
      this.selected = dates.reduce(function(selected, timeValue) {
        var date = new Date(timeValue);
        var year = date.getFullYear();
        var month = date.getMonth();
        if (selected[year] === void 0) {
          selected[year] = [month];
        } else {
          pushUnique(selected[year], month);
        }
        return selected;
      }, {});
      if (rangepicker && rangepicker.dates) {
        this.range = rangepicker.dates.map(function(timeValue) {
          var date = new Date(timeValue);
          return isNaN(date) ? void 0 : [date.getFullYear(), date.getMonth()];
        });
      }
    }
    // Update the entire view UI
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      this.disabled = [];
      this.picker.setViewSwitchLabel(this.year);
      this.picker.setPrevBtnDisabled(this.year <= this.minYear);
      this.picker.setNextBtnDisabled(this.year >= this.maxYear);
      var selected = this.selected[this.year] || [];
      var yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
      var isMinYear = this.year === this.minYear;
      var isMaxYear = this.year === this.maxYear;
      var range2 = computeMonthRange(this.range, this.year);
      Array.from(this.grid.children).forEach(function(el, index) {
        var classList = el.classList;
        var date = dateValue(_this.year, index, 1);
        el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this.cellClass);
        if (_this.isMinView) {
          el.dataset.date = date;
        }
        el.textContent = _this.monthNames[index];
        if (yrOutOfRange || isMinYear && index < _this.minMonth || isMaxYear && index > _this.maxMonth) {
          classList.add("disabled");
        }
        if (range2) {
          var _range2 = _slicedToArray(range2, 2), rangeStart = _range2[0], rangeEnd = _range2[1];
          if (index > rangeStart && index < rangeEnd) {
            classList.add("range");
          }
          if (index === rangeStart) {
            classList.add("range-start");
          }
          if (index === rangeEnd) {
            classList.add("range-end");
          }
        }
        if (selected.includes(index)) {
          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
        }
        if (index === _this.focused) {
          classList.add("focused");
        }
        if (_this.beforeShow) {
          _this.performBeforeHook(el, index, date);
        }
      });
    }
    // Update the view UI by applying the changes of selected and focused items
  }, {
    key: "refresh",
    value: function refresh() {
      var _this2 = this;
      var selected = this.selected[this.year] || [];
      var _ref = computeMonthRange(this.range, this.year) || [], _ref2 = _slicedToArray(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
      this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
        el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "dark:bg-blue-600", "dark:!bg-primary-700", "dark:text-white", "text-white", "focused");
        el.classList.add("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
      });
      Array.from(this.grid.children).forEach(function(el, index) {
        var classList = el.classList;
        if (index > rangeStart && index < rangeEnd) {
          classList.add("range");
        }
        if (index === rangeStart) {
          classList.add("range-start");
        }
        if (index === rangeEnd) {
          classList.add("range-end");
        }
        if (selected.includes(index)) {
          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
        }
        if (index === _this2.focused) {
          classList.add("focused");
        }
      });
    }
    // Update the view UI by applying the change of focused item
  }, {
    key: "refreshFocus",
    value: function refreshFocus() {
      this.grid.querySelectorAll(".focused").forEach(function(el) {
        el.classList.remove("focused");
      });
      this.grid.children[this.focused].classList.add("focused");
    }
  }]);
})(View);
function toTitleCase(word) {
  return _toConsumableArray(word).reduce(function(str, ch, ix) {
    return str += ix ? ch : ch.toUpperCase();
  }, "");
}
var YearsView = /* @__PURE__ */ (function(_View) {
  function YearsView2(picker, config) {
    _classCallCheck(this, YearsView2);
    return _callSuper(this, YearsView2, [picker, config]);
  }
  _inherits(YearsView2, _View);
  return _createClass(YearsView2, [{
    key: "init",
    value: function init(options) {
      var onConstruction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (onConstruction) {
        this.navStep = this.step * 10;
        this.beforeShowOption = "beforeShow".concat(toTitleCase(this.cellClass));
        this.grid = this.element;
        this.element.classList.add(this.name, "datepicker-grid", "w-64", "grid", "grid-cols-4");
        this.grid.appendChild(parseHTML(createTagRepeat("span", 12)));
      }
      _get(_getPrototypeOf(YearsView2.prototype), "init", this).call(this, options);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (hasProperty(options, "minDate")) {
        if (options.minDate === void 0) {
          this.minYear = this.minDate = void 0;
        } else {
          this.minYear = startOfYearPeriod(options.minDate, this.step);
          this.minDate = dateValue(this.minYear, 0, 1);
        }
      }
      if (hasProperty(options, "maxDate")) {
        if (options.maxDate === void 0) {
          this.maxYear = this.maxDate = void 0;
        } else {
          this.maxYear = startOfYearPeriod(options.maxDate, this.step);
          this.maxDate = dateValue(this.maxYear, 11, 31);
        }
      }
      if (options[this.beforeShowOption] !== void 0) {
        var beforeShow = options[this.beforeShowOption];
        this.beforeShow = typeof beforeShow === "function" ? beforeShow : void 0;
      }
    }
    // Update view's settings to reflect the viewDate set on the picker
  }, {
    key: "updateFocus",
    value: function updateFocus() {
      var viewDate = new Date(this.picker.viewDate);
      var first = startOfYearPeriod(viewDate, this.navStep);
      var last = first + 9 * this.step;
      this.first = first;
      this.last = last;
      this.start = first - this.step;
      this.focused = startOfYearPeriod(viewDate, this.step);
    }
    // Update view's settings to reflect the selected dates
  }, {
    key: "updateSelection",
    value: function updateSelection() {
      var _this = this;
      var _this$picker$datepick = this.picker.datepicker, dates = _this$picker$datepick.dates, rangepicker = _this$picker$datepick.rangepicker;
      this.selected = dates.reduce(function(years, timeValue) {
        return pushUnique(years, startOfYearPeriod(timeValue, _this.step));
      }, []);
      if (rangepicker && rangepicker.dates) {
        this.range = rangepicker.dates.map(function(timeValue) {
          if (timeValue !== void 0) {
            return startOfYearPeriod(timeValue, _this.step);
          }
        });
      }
    }
    // Update the entire view UI
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      this.disabled = [];
      this.picker.setViewSwitchLabel("".concat(this.first, "-").concat(this.last));
      this.picker.setPrevBtnDisabled(this.first <= this.minYear);
      this.picker.setNextBtnDisabled(this.last >= this.maxYear);
      Array.from(this.grid.children).forEach(function(el, index) {
        var classList = el.classList;
        var current = _this2.start + index * _this2.step;
        var date = dateValue(current, 0, 1);
        el.className = "datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ".concat(_this2.cellClass);
        if (_this2.isMinView) {
          el.dataset.date = date;
        }
        el.textContent = el.dataset.year = current;
        if (index === 0) {
          classList.add("prev");
        } else if (index === 11) {
          classList.add("next");
        }
        if (current < _this2.minYear || current > _this2.maxYear) {
          classList.add("disabled");
        }
        if (_this2.range) {
          var _this2$range = _slicedToArray(_this2.range, 2), rangeStart = _this2$range[0], rangeEnd = _this2$range[1];
          if (current > rangeStart && current < rangeEnd) {
            classList.add("range");
          }
          if (current === rangeStart) {
            classList.add("range-start");
          }
          if (current === rangeEnd) {
            classList.add("range-end");
          }
        }
        if (_this2.selected.includes(current)) {
          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
        }
        if (current === _this2.focused) {
          classList.add("focused");
        }
        if (_this2.beforeShow) {
          _this2.performBeforeHook(el, current, date);
        }
      });
    }
    // Update the view UI by applying the changes of selected and focused items
  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;
      var _ref = this.range || [], _ref2 = _slicedToArray(_ref, 2), rangeStart = _ref2[0], rangeEnd = _ref2[1];
      this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(function(el) {
        el.classList.remove("range", "range-start", "range-end", "selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark!bg-primary-600", "dark:text-white", "focused");
      });
      Array.from(this.grid.children).forEach(function(el) {
        var current = Number(el.textContent);
        var classList = el.classList;
        if (current > rangeStart && current < rangeEnd) {
          classList.add("range");
        }
        if (current === rangeStart) {
          classList.add("range-start");
        }
        if (current === rangeEnd) {
          classList.add("range-end");
        }
        if (_this3.selected.includes(current)) {
          classList.add("selected", "bg-blue-700", "!bg-primary-700", "text-white", "dark:bg-blue-600", "dark:!bg-primary-600", "dark:text-white");
          classList.remove("text-gray-900", "hover:bg-gray-100", "dark:text-white", "dark:hover:bg-gray-600");
        }
        if (current === _this3.focused) {
          classList.add("focused");
        }
      });
    }
    // Update the view UI by applying the change of focused item
  }, {
    key: "refreshFocus",
    value: function refreshFocus() {
      var index = Math.round((this.focused - this.start) / this.step);
      this.grid.querySelectorAll(".focused").forEach(function(el) {
        el.classList.remove("focused");
      });
      this.grid.children[index].classList.add("focused");
    }
  }]);
})(View);
function triggerDatepickerEvent(datepicker, type) {
  var detail = {
    date: datepicker.getDate(),
    viewDate: new Date(datepicker.picker.viewDate),
    viewId: datepicker.picker.currentView.id,
    datepicker
  };
  datepicker.element.dispatchEvent(new CustomEvent(type, {
    detail
  }));
}
function goToPrevOrNext(datepicker, direction) {
  var _datepicker$config = datepicker.config, minDate = _datepicker$config.minDate, maxDate = _datepicker$config.maxDate;
  var _datepicker$picker = datepicker.picker, currentView = _datepicker$picker.currentView, viewDate = _datepicker$picker.viewDate;
  var newViewDate;
  switch (currentView.id) {
    case 0:
      newViewDate = addMonths(viewDate, direction);
      break;
    case 1:
      newViewDate = addYears(viewDate, direction);
      break;
    default:
      newViewDate = addYears(viewDate, direction * currentView.navStep);
  }
  newViewDate = limitToRange(newViewDate, minDate, maxDate);
  datepicker.picker.changeFocus(newViewDate).render();
}
function switchView(datepicker) {
  var viewId = datepicker.picker.currentView.id;
  if (viewId === datepicker.config.maxView) {
    return;
  }
  datepicker.picker.changeView(viewId + 1).render();
}
function unfocus(datepicker) {
  if (datepicker.config.updateOnBlur) {
    datepicker.update({
      autohide: true
    });
  } else {
    datepicker.refresh("input");
    datepicker.hide();
  }
}
function goToSelectedMonthOrYear(datepicker, selection) {
  var picker = datepicker.picker;
  var viewDate = new Date(picker.viewDate);
  var viewId = picker.currentView.id;
  var newDate = viewId === 1 ? addMonths(viewDate, selection - viewDate.getMonth()) : addYears(viewDate, selection - viewDate.getFullYear());
  picker.changeFocus(newDate).changeView(viewId - 1).render();
}
function onClickTodayBtn(datepicker) {
  var picker = datepicker.picker;
  var currentDate = today();
  if (datepicker.config.todayBtnMode === 1) {
    if (datepicker.config.autohide) {
      datepicker.setDate(currentDate);
      return;
    }
    datepicker.setDate(currentDate, {
      render: false
    });
    picker.update();
  }
  if (picker.viewDate !== currentDate) {
    picker.changeFocus(currentDate);
  }
  picker.changeView(0).render();
}
function onClickClearBtn(datepicker) {
  datepicker.setDate({
    clear: true
  });
}
function onClickViewSwitch(datepicker) {
  switchView(datepicker);
}
function onClickPrevBtn(datepicker) {
  goToPrevOrNext(datepicker, -1);
}
function onClickNextBtn(datepicker) {
  goToPrevOrNext(datepicker, 1);
}
function onClickView(datepicker, ev) {
  var target = findElementInEventPath(ev, ".datepicker-cell");
  if (!target || target.classList.contains("disabled")) {
    return;
  }
  var _datepicker$picker$cu = datepicker.picker.currentView, id = _datepicker$picker$cu.id, isMinView = _datepicker$picker$cu.isMinView;
  if (isMinView) {
    datepicker.setDate(Number(target.dataset.date));
  } else if (id === 1) {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.month));
  } else {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.year));
  }
}
function onClickPicker(datepicker) {
  if (!datepicker.inline && !datepicker.config.disableTouchKeyboard) {
    datepicker.inputField.focus();
  }
}
function processPickerOptions(picker, options) {
  if (options.title !== void 0) {
    if (options.title) {
      picker.controls.title.textContent = options.title;
      showElement(picker.controls.title);
    } else {
      picker.controls.title.textContent = "";
      hideElement(picker.controls.title);
    }
  }
  if (options.prevArrow) {
    var prevBtn = picker.controls.prevBtn;
    emptyChildNodes(prevBtn);
    options.prevArrow.forEach(function(node) {
      prevBtn.appendChild(node.cloneNode(true));
    });
  }
  if (options.nextArrow) {
    var nextBtn = picker.controls.nextBtn;
    emptyChildNodes(nextBtn);
    options.nextArrow.forEach(function(node) {
      nextBtn.appendChild(node.cloneNode(true));
    });
  }
  if (options.locale) {
    picker.controls.todayBtn.textContent = options.locale.today;
    picker.controls.clearBtn.textContent = options.locale.clear;
  }
  if (options.todayBtn !== void 0) {
    if (options.todayBtn) {
      showElement(picker.controls.todayBtn);
    } else {
      hideElement(picker.controls.todayBtn);
    }
  }
  if (hasProperty(options, "minDate") || hasProperty(options, "maxDate")) {
    var _picker$datepicker$co = picker.datepicker.config, minDate = _picker$datepicker$co.minDate, maxDate = _picker$datepicker$co.maxDate;
    picker.controls.todayBtn.disabled = !isInRange(today(), minDate, maxDate);
  }
  if (options.clearBtn !== void 0) {
    if (options.clearBtn) {
      showElement(picker.controls.clearBtn);
    } else {
      hideElement(picker.controls.clearBtn);
    }
  }
}
function computeResetViewDate(datepicker) {
  var dates = datepicker.dates, config = datepicker.config;
  var viewDate = dates.length > 0 ? lastItemOf(dates) : config.defaultViewDate;
  return limitToRange(viewDate, config.minDate, config.maxDate);
}
function setViewDate(picker, newDate) {
  var oldViewDate = new Date(picker.viewDate);
  var newViewDate = new Date(newDate);
  var _picker$currentView = picker.currentView, id = _picker$currentView.id, year = _picker$currentView.year, first = _picker$currentView.first, last = _picker$currentView.last;
  var viewYear = newViewDate.getFullYear();
  picker.viewDate = newDate;
  if (viewYear !== oldViewDate.getFullYear()) {
    triggerDatepickerEvent(picker.datepicker, "changeYear");
  }
  if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
    triggerDatepickerEvent(picker.datepicker, "changeMonth");
  }
  switch (id) {
    case 0:
      return newDate < first || newDate > last;
    case 1:
      return viewYear !== year;
    default:
      return viewYear < first || viewYear > last;
  }
}
function getTextDirection(el) {
  return window.getComputedStyle(el).direction;
}
var Picker = /* @__PURE__ */ (function() {
  function Picker2(datepicker) {
    _classCallCheck(this, Picker2);
    this.datepicker = datepicker;
    var template = pickerTemplate.replace(/%buttonClass%/g, datepicker.config.buttonClass);
    var element = this.element = parseHTML(template).firstChild;
    var _element$firstChild$c = _slicedToArray(element.firstChild.children, 3), header = _element$firstChild$c[0], main2 = _element$firstChild$c[1], footer = _element$firstChild$c[2];
    var title = header.firstElementChild;
    var _header$lastElementCh = _slicedToArray(header.lastElementChild.children, 3), prevBtn = _header$lastElementCh[0], viewSwitch = _header$lastElementCh[1], nextBtn = _header$lastElementCh[2];
    var _footer$firstChild$ch = _slicedToArray(footer.firstChild.children, 2), todayBtn = _footer$firstChild$ch[0], clearBtn = _footer$firstChild$ch[1];
    var controls = {
      title,
      prevBtn,
      viewSwitch,
      nextBtn,
      todayBtn,
      clearBtn
    };
    this.main = main2;
    this.controls = controls;
    var elementClass = datepicker.inline ? "inline" : "dropdown";
    element.classList.add("datepicker-".concat(elementClass));
    elementClass === "dropdown" ? element.classList.add("dropdown", "absolute", "top-0", "left-0", "z-50", "pt-2") : null;
    processPickerOptions(this, datepicker.config);
    this.viewDate = computeResetViewDate(datepicker);
    registerListeners(datepicker, [[element, "click", onClickPicker.bind(null, datepicker), {
      capture: true
    }], [main2, "click", onClickView.bind(null, datepicker)], [controls.viewSwitch, "click", onClickViewSwitch.bind(null, datepicker)], [controls.prevBtn, "click", onClickPrevBtn.bind(null, datepicker)], [controls.nextBtn, "click", onClickNextBtn.bind(null, datepicker)], [controls.todayBtn, "click", onClickTodayBtn.bind(null, datepicker)], [controls.clearBtn, "click", onClickClearBtn.bind(null, datepicker)]]);
    this.views = [new DaysView(this), new MonthsView(this), new YearsView(this, {
      id: 2,
      name: "years",
      cellClass: "year",
      step: 1
    }), new YearsView(this, {
      id: 3,
      name: "decades",
      cellClass: "decade",
      step: 10
    })];
    this.currentView = this.views[datepicker.config.startView];
    this.currentView.render();
    this.main.appendChild(this.currentView.element);
    datepicker.config.container.appendChild(this.element);
  }
  return _createClass(Picker2, [{
    key: "setOptions",
    value: function setOptions(options) {
      processPickerOptions(this, options);
      this.views.forEach(function(view) {
        view.init(options, false);
      });
      this.currentView.render();
    }
  }, {
    key: "detach",
    value: function detach() {
      this.datepicker.config.container.removeChild(this.element);
    }
  }, {
    key: "show",
    value: function show() {
      if (this.active) {
        return;
      }
      this.element.classList.add("active", "block");
      this.element.classList.remove("hidden");
      this.active = true;
      var datepicker = this.datepicker;
      if (!datepicker.inline) {
        var inputDirection = getTextDirection(datepicker.inputField);
        if (inputDirection !== getTextDirection(datepicker.config.container)) {
          this.element.dir = inputDirection;
        } else if (this.element.dir) {
          this.element.removeAttribute("dir");
        }
        this.place();
        if (datepicker.config.disableTouchKeyboard) {
          datepicker.inputField.blur();
        }
      }
      triggerDatepickerEvent(datepicker, "show");
    }
  }, {
    key: "hide",
    value: function hide2() {
      if (!this.active) {
        return;
      }
      this.datepicker.exitEditMode();
      this.element.classList.remove("active", "block");
      this.element.classList.add("active", "block", "hidden");
      this.active = false;
      triggerDatepickerEvent(this.datepicker, "hide");
    }
  }, {
    key: "place",
    value: function place() {
      var _this$element = this.element, classList = _this$element.classList, style = _this$element.style;
      var _this$datepicker = this.datepicker, config = _this$datepicker.config, inputField = _this$datepicker.inputField;
      var container = config.container;
      var _this$element$getBoun = this.element.getBoundingClientRect(), calendarWidth = _this$element$getBoun.width, calendarHeight = _this$element$getBoun.height;
      var _container$getBoundin = container.getBoundingClientRect(), containerLeft = _container$getBoundin.left, containerTop = _container$getBoundin.top, containerWidth = _container$getBoundin.width;
      var _inputField$getBoundi = inputField.getBoundingClientRect(), inputLeft = _inputField$getBoundi.left, inputTop = _inputField$getBoundi.top, inputWidth = _inputField$getBoundi.width, inputHeight = _inputField$getBoundi.height;
      var _config$orientation = config.orientation, orientX = _config$orientation.x, orientY = _config$orientation.y;
      var scrollTop;
      var left2;
      var top2;
      if (container === document.body) {
        scrollTop = window.scrollY;
        left2 = inputLeft + window.scrollX;
        top2 = inputTop + scrollTop;
      } else {
        scrollTop = container.scrollTop;
        left2 = inputLeft - containerLeft;
        top2 = inputTop - containerTop + scrollTop;
      }
      if (orientX === "auto") {
        if (left2 < 0) {
          orientX = "left";
          left2 = 10;
        } else if (left2 + calendarWidth > containerWidth) {
          orientX = "right";
        } else {
          orientX = getTextDirection(inputField) === "rtl" ? "right" : "left";
        }
      }
      if (orientX === "right") {
        left2 -= calendarWidth - inputWidth;
      }
      if (orientY === "auto") {
        orientY = top2 - calendarHeight < scrollTop ? "bottom" : "top";
      }
      if (orientY === "top") {
        top2 -= calendarHeight;
      } else {
        top2 += inputHeight;
      }
      classList.remove("datepicker-orient-top", "datepicker-orient-bottom", "datepicker-orient-right", "datepicker-orient-left");
      classList.add("datepicker-orient-".concat(orientY), "datepicker-orient-".concat(orientX));
      style.top = top2 ? "".concat(top2, "px") : top2;
      style.left = left2 ? "".concat(left2, "px") : left2;
    }
  }, {
    key: "setViewSwitchLabel",
    value: function setViewSwitchLabel(labelText) {
      this.controls.viewSwitch.textContent = labelText;
    }
  }, {
    key: "setPrevBtnDisabled",
    value: function setPrevBtnDisabled(disabled) {
      this.controls.prevBtn.disabled = disabled;
    }
  }, {
    key: "setNextBtnDisabled",
    value: function setNextBtnDisabled(disabled) {
      this.controls.nextBtn.disabled = disabled;
    }
  }, {
    key: "changeView",
    value: function changeView(viewId) {
      var oldView = this.currentView;
      var newView = this.views[viewId];
      if (newView.id !== oldView.id) {
        this.currentView = newView;
        this._renderMethod = "render";
        triggerDatepickerEvent(this.datepicker, "changeView");
        this.main.replaceChild(newView.element, oldView.element);
      }
      return this;
    }
    // Change the focused date (view date)
  }, {
    key: "changeFocus",
    value: function changeFocus(newViewDate) {
      this._renderMethod = setViewDate(this, newViewDate) ? "render" : "refreshFocus";
      this.views.forEach(function(view) {
        view.updateFocus();
      });
      return this;
    }
    // Apply the change of the selected dates
  }, {
    key: "update",
    value: function update() {
      var newViewDate = computeResetViewDate(this.datepicker);
      this._renderMethod = setViewDate(this, newViewDate) ? "render" : "refresh";
      this.views.forEach(function(view) {
        view.updateFocus();
        view.updateSelection();
      });
      return this;
    }
    // Refresh the picker UI
  }, {
    key: "render",
    value: function render() {
      var quickRender = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      var renderMethod = quickRender && this._renderMethod || "render";
      delete this._renderMethod;
      this.currentView[renderMethod]();
    }
  }]);
})();
function findNextAvailableOne(date, addFn, increase, testFn, min2, max2) {
  if (!isInRange(date, min2, max2)) {
    return;
  }
  if (testFn(date)) {
    var newDate = addFn(date, increase);
    return findNextAvailableOne(newDate, addFn, increase, testFn, min2, max2);
  }
  return date;
}
function moveByArrowKey(datepicker, ev, direction, vertical) {
  var picker = datepicker.picker;
  var currentView = picker.currentView;
  var step = currentView.step || 1;
  var viewDate = picker.viewDate;
  var addFn;
  var testFn;
  switch (currentView.id) {
    case 0:
      if (vertical) {
        viewDate = addDays(viewDate, direction * 7);
      } else if (ev.ctrlKey || ev.metaKey) {
        viewDate = addYears(viewDate, direction);
      } else {
        viewDate = addDays(viewDate, direction);
      }
      addFn = addDays;
      testFn = function testFn2(date) {
        return currentView.disabled.includes(date);
      };
      break;
    case 1:
      viewDate = addMonths(viewDate, vertical ? direction * 4 : direction);
      addFn = addMonths;
      testFn = function testFn2(date) {
        var dt2 = new Date(date);
        var year = currentView.year, disabled = currentView.disabled;
        return dt2.getFullYear() === year && disabled.includes(dt2.getMonth());
      };
      break;
    default:
      viewDate = addYears(viewDate, direction * (vertical ? 4 : 1) * step);
      addFn = addYears;
      testFn = function testFn2(date) {
        return currentView.disabled.includes(startOfYearPeriod(date, step));
      };
  }
  viewDate = findNextAvailableOne(viewDate, addFn, direction < 0 ? -step : step, testFn, currentView.minDate, currentView.maxDate);
  if (viewDate !== void 0) {
    picker.changeFocus(viewDate).render();
  }
}
function onKeydown(datepicker, ev) {
  if (ev.key === "Tab") {
    unfocus(datepicker);
    return;
  }
  var picker = datepicker.picker;
  var _picker$currentView = picker.currentView, id = _picker$currentView.id, isMinView = _picker$currentView.isMinView;
  if (!picker.active) {
    switch (ev.key) {
      case "ArrowDown":
      case "Escape":
        picker.show();
        break;
      case "Enter":
        datepicker.update();
        break;
      default:
        return;
    }
  } else if (datepicker.editMode) {
    switch (ev.key) {
      case "Escape":
        picker.hide();
        break;
      case "Enter":
        datepicker.exitEditMode({
          update: true,
          autohide: datepicker.config.autohide
        });
        break;
      default:
        return;
    }
  } else {
    switch (ev.key) {
      case "Escape":
        picker.hide();
        break;
      case "ArrowLeft":
        if (ev.ctrlKey || ev.metaKey) {
          goToPrevOrNext(datepicker, -1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, false);
        }
        break;
      case "ArrowRight":
        if (ev.ctrlKey || ev.metaKey) {
          goToPrevOrNext(datepicker, 1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, 1, false);
        }
        break;
      case "ArrowUp":
        if (ev.ctrlKey || ev.metaKey) {
          switchView(datepicker);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, true);
        }
        break;
      case "ArrowDown":
        if (ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
          datepicker.enterEditMode();
          return;
        }
        moveByArrowKey(datepicker, ev, 1, true);
        break;
      case "Enter":
        if (isMinView) {
          datepicker.setDate(picker.viewDate);
        } else {
          picker.changeView(id - 1).render();
        }
        break;
      case "Backspace":
      case "Delete":
        datepicker.enterEditMode();
        return;
      default:
        if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey) {
          datepicker.enterEditMode();
        }
        return;
    }
  }
  ev.preventDefault();
  ev.stopPropagation();
}
function onFocus(datepicker) {
  if (datepicker.config.showOnFocus && !datepicker._showing) {
    datepicker.show();
  }
}
function onMousedown(datepicker, ev) {
  var el = ev.target;
  if (datepicker.picker.active || datepicker.config.showOnClick) {
    el._active = el === document.activeElement;
    el._clicking = setTimeout(function() {
      delete el._active;
      delete el._clicking;
    }, 2e3);
  }
}
function onClickInput(datepicker, ev) {
  var el = ev.target;
  if (!el._clicking) {
    return;
  }
  clearTimeout(el._clicking);
  delete el._clicking;
  if (el._active) {
    datepicker.enterEditMode();
  }
  delete el._active;
  if (datepicker.config.showOnClick) {
    datepicker.show();
  }
}
function onPaste(datepicker, ev) {
  if (ev.clipboardData.types.includes("text/plain")) {
    datepicker.enterEditMode();
  }
}
function onClickOutside(datepicker, ev) {
  var element = datepicker.element;
  if (element !== document.activeElement) {
    return;
  }
  var pickerElem = datepicker.picker.element;
  if (findElementInEventPath(ev, function(el) {
    return el === element || el === pickerElem;
  })) {
    return;
  }
  unfocus(datepicker);
}
function stringifyDates(dates, config) {
  return dates.map(function(dt2) {
    return formatDate(dt2, config.format, config.locale);
  }).join(config.dateDelimiter);
}
function processInputDates(datepicker, inputDates) {
  var clear = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var config = datepicker.config, origDates = datepicker.dates, rangepicker = datepicker.rangepicker;
  if (inputDates.length === 0) {
    return clear ? [] : void 0;
  }
  var rangeEnd = rangepicker && datepicker === rangepicker.datepickers[1];
  var newDates = inputDates.reduce(function(dates, dt2) {
    var date = parseDate(dt2, config.format, config.locale);
    if (date === void 0) {
      return dates;
    }
    if (config.pickLevel > 0) {
      var _dt = new Date(date);
      if (config.pickLevel === 1) {
        date = rangeEnd ? _dt.setMonth(_dt.getMonth() + 1, 0) : _dt.setDate(1);
      } else {
        date = rangeEnd ? _dt.setFullYear(_dt.getFullYear() + 1, 0, 0) : _dt.setMonth(0, 1);
      }
    }
    if (isInRange(date, config.minDate, config.maxDate) && !dates.includes(date) && !config.datesDisabled.includes(date) && !config.daysOfWeekDisabled.includes(new Date(date).getDay())) {
      dates.push(date);
    }
    return dates;
  }, []);
  if (newDates.length === 0) {
    return;
  }
  if (config.multidate && !clear) {
    newDates = newDates.reduce(function(dates, date) {
      if (!origDates.includes(date)) {
        dates.push(date);
      }
      return dates;
    }, origDates.filter(function(date) {
      return !newDates.includes(date);
    }));
  }
  return config.maxNumberOfDates && newDates.length > config.maxNumberOfDates ? newDates.slice(config.maxNumberOfDates * -1) : newDates;
}
function refreshUI(datepicker) {
  var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
  var quickRender = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var config = datepicker.config, picker = datepicker.picker, inputField = datepicker.inputField;
  if (mode & 2) {
    var newView = picker.active ? config.pickLevel : config.startView;
    picker.update().changeView(newView).render(quickRender);
  }
  if (mode & 1 && inputField) {
    inputField.value = stringifyDates(datepicker.dates, config);
  }
}
function _setDate(datepicker, inputDates, options) {
  var clear = options.clear, render = options.render, autohide = options.autohide;
  if (render === void 0) {
    render = true;
  }
  if (!render) {
    autohide = false;
  } else if (autohide === void 0) {
    autohide = datepicker.config.autohide;
  }
  var newDates = processInputDates(datepicker, inputDates, clear);
  if (!newDates) {
    return;
  }
  if (newDates.toString() !== datepicker.dates.toString()) {
    datepicker.dates = newDates;
    refreshUI(datepicker, render ? 3 : 1);
    triggerDatepickerEvent(datepicker, "changeDate");
  } else {
    refreshUI(datepicker, 1);
  }
  if (autohide) {
    datepicker.hide();
  }
}
var Datepicker$1 = /* @__PURE__ */ (function() {
  function Datepicker2(element) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var rangepicker = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    _classCallCheck(this, Datepicker2);
    element.datepicker = this;
    this.element = element;
    var config = this.config = Object.assign({
      buttonClass: options.buttonClass && String(options.buttonClass) || "button",
      container: document.body,
      defaultViewDate: today(),
      maxDate: void 0,
      minDate: void 0
    }, processOptions(defaultOptions, this));
    this._options = options;
    Object.assign(config, processOptions(options, this));
    var inline = this.inline = element.tagName !== "INPUT";
    var inputField;
    var initialDates;
    if (inline) {
      config.container = element;
      initialDates = stringToArray(element.dataset.date, config.dateDelimiter);
      delete element.dataset.date;
    } else {
      var container = options.container ? document.querySelector(options.container) : null;
      if (container) {
        config.container = container;
      }
      inputField = this.inputField = element;
      inputField.classList.add("datepicker-input");
      initialDates = stringToArray(inputField.value, config.dateDelimiter);
    }
    if (rangepicker) {
      var index = rangepicker.inputs.indexOf(inputField);
      var datepickers = rangepicker.datepickers;
      if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
        throw Error("Invalid rangepicker object.");
      }
      datepickers[index] = this;
      Object.defineProperty(this, "rangepicker", {
        get: function get() {
          return rangepicker;
        }
      });
    }
    this.dates = [];
    var inputDateValues = processInputDates(this, initialDates);
    if (inputDateValues && inputDateValues.length > 0) {
      this.dates = inputDateValues;
    }
    if (inputField) {
      inputField.value = stringifyDates(this.dates, config);
    }
    var picker = this.picker = new Picker(this);
    if (inline) {
      this.show();
    } else {
      var onMousedownDocument = onClickOutside.bind(null, this);
      var listeners = [[inputField, "keydown", onKeydown.bind(null, this)], [inputField, "focus", onFocus.bind(null, this)], [inputField, "mousedown", onMousedown.bind(null, this)], [inputField, "click", onClickInput.bind(null, this)], [inputField, "paste", onPaste.bind(null, this)], [document, "mousedown", onMousedownDocument], [document, "touchstart", onMousedownDocument], [window, "resize", picker.place.bind(picker)]];
      registerListeners(this, listeners);
    }
  }
  return _createClass(Datepicker2, [{
    key: "active",
    get: (
      /**
       * @type {Boolean} - Whether the picker element is shown. `true` whne shown
       */
      function get() {
        return !!(this.picker && this.picker.active);
      }
    )
    /**
     * @type {HTMLDivElement} - DOM object of picker element
     */
  }, {
    key: "pickerElement",
    get: function get() {
      return this.picker ? this.picker.element : void 0;
    }
    /**
     * Set new values to the config options
     * @param {Object} options - config options to update
     */
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var picker = this.picker;
      var newOptions = processOptions(options, this);
      Object.assign(this._options, options);
      Object.assign(this.config, newOptions);
      picker.setOptions(newOptions);
      refreshUI(this, 3);
    }
    /**
     * Show the picker element
     */
  }, {
    key: "show",
    value: function show() {
      if (this.inputField) {
        if (this.inputField.disabled) {
          return;
        }
        if (this.inputField !== document.activeElement) {
          this._showing = true;
          this.inputField.focus();
          delete this._showing;
        }
      }
      this.picker.show();
    }
    /**
     * Hide the picker element
     * Not available on inline picker
     */
  }, {
    key: "hide",
    value: function hide2() {
      if (this.inline) {
        return;
      }
      this.picker.hide();
      this.picker.update().changeView(this.config.startView).render();
    }
    /**
     * Destroy the Datepicker instance
     * @return {Detepicker} - the instance destroyed
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.hide();
      unregisterListeners(this);
      this.picker.detach();
      if (!this.inline) {
        this.inputField.classList.remove("datepicker-input");
      }
      delete this.element.datepicker;
      return this;
    }
    /**
     * Get the selected date(s)
     *
     * The method returns a Date object of selected date by default, and returns
     * an array of selected dates in multidate mode. If format string is passed,
     * it returns date string(s) formatted in given format.
     *
     * @param  {String} [format] - Format string to stringify the date(s)
     * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
     * selected, empty array in multidate mode and untitled in sigledate mode
     */
  }, {
    key: "getDate",
    value: function getDate() {
      var _this = this;
      var format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      var callback = format ? function(date) {
        return formatDate(date, format, _this.config.locale);
      } : function(date) {
        return new Date(date);
      };
      if (this.config.multidate) {
        return this.dates.map(callback);
      }
      if (this.dates.length > 0) {
        return callback(this.dates[0]);
      }
    }
    /**
     * Set selected date(s)
     *
     * In multidate mode, you can pass multiple dates as a series of arguments
     * or an array. (Since each date is parsed individually, the type of the
     * dates doesn't have to be the same.)
     * The given dates are used to toggle the select status of each date. The
     * number of selected dates is kept from exceeding the length set to
     * maxNumberOfDates.
     *
     * With clear: true option, the method can be used to clear the selection
     * and to replace the selection instead of toggling in multidate mode.
     * If the option is passed with no date arguments or an empty dates array,
     * it works as "clear" (clear the selection then set nothing), and if the
     * option is passed with new dates to select, it works as "replace" (clear
     * the selection then set the given dates)
     *
     * When render: false option is used, the method omits re-rendering the
     * picker element. In this case, you need to call refresh() method later in
     * order for the picker element to reflect the changes. The input field is
     * refreshed always regardless of this option.
     *
     * When invalid (unparsable, repeated, disabled or out-of-range) dates are
     * passed, the method ignores them and applies only valid ones. In the case
     * that all the given dates are invalid, which is distinguished from passing
     * no dates, the method considers it as an error and leaves the selection
     * untouched.
     *
     * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
     * objects, time values or mix of those for new selection
     * @param {Object} [options] - function options
     * - clear: {boolean} - Whether to clear the existing selection
     *     defualt: false
     * - render: {boolean} - Whether to re-render the picker element
     *     default: true
     * - autohide: {boolean} - Whether to hide the picker element after re-render
     *     Ignored when used with render: false
     *     default: config.autohide
     */
  }, {
    key: "setDate",
    value: function setDate() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var dates = [].concat(args);
      var opts = {};
      var lastArg = lastItemOf(args);
      if (_typeof(lastArg) === "object" && !Array.isArray(lastArg) && !(lastArg instanceof Date) && lastArg) {
        Object.assign(opts, dates.pop());
      }
      var inputDates = Array.isArray(dates[0]) ? dates[0] : dates;
      _setDate(this, inputDates, opts);
    }
    /**
     * Update the selected date(s) with input field's value
     * Not available on inline picker
     *
     * The input field will be refreshed with properly formatted date string.
     *
     * @param  {Object} [options] - function options
     * - autohide: {boolean} - whether to hide the picker element after refresh
     *     default: false
     */
  }, {
    key: "update",
    value: function update() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      if (this.inline) {
        return;
      }
      var opts = {
        clear: true,
        autohide: !!(options && options.autohide)
      };
      var inputDates = stringToArray(this.inputField.value, this.config.dateDelimiter);
      _setDate(this, inputDates, opts);
    }
    /**
     * Refresh the picker element and the associated input field
     * @param {String} [target] - target item when refreshing one item only
     * 'picker' or 'input'
     * @param {Boolean} [forceRender] - whether to re-render the picker element
     * regardless of its state instead of optimized refresh
     */
  }, {
    key: "refresh",
    value: function refresh() {
      var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      var forceRender = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (target && typeof target !== "string") {
        forceRender = target;
        target = void 0;
      }
      var mode;
      if (target === "picker") {
        mode = 2;
      } else if (target === "input") {
        mode = 1;
      } else {
        mode = 3;
      }
      refreshUI(this, mode, !forceRender);
    }
    /**
     * Enter edit mode
     * Not available on inline picker or when the picker element is hidden
     */
  }, {
    key: "enterEditMode",
    value: function enterEditMode() {
      if (this.inline || !this.picker.active || this.editMode) {
        return;
      }
      this.editMode = true;
      this.inputField.classList.add("in-edit", "border-blue-700", "!border-primary-700");
    }
    /**
     * Exit from edit mode
     * Not available on inline picker
     * @param  {Object} [options] - function options
     * - update: {boolean} - whether to call update() after exiting
     *     If false, input field is revert to the existing selection
     *     default: false
     */
  }, {
    key: "exitEditMode",
    value: function exitEditMode() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      if (this.inline || !this.editMode) {
        return;
      }
      var opts = Object.assign({
        update: false
      }, options);
      delete this.editMode;
      this.inputField.classList.remove("in-edit", "border-blue-700", "!border-primary-700");
      if (opts.update) {
        this.update(opts);
      }
    }
  }], [{
    key: "formatDate",
    value: function formatDate$1(date, format, lang) {
      return formatDate(date, format, lang && locales[lang] || locales.en);
    }
    /**
     * Parse date string
     * @param  {String|Date|Number} dateStr - date string, Date object or time
     * value to parse
     * @param  {String|Object} format - format string or object that contains
     * toValue() custom parser, whose signature is
     * - args:
     *   - dateStr: {String|Date|Number} - the dateStr passed to the method
     *   - format: {Object} - the format object passed to the method
     *   - locale: {Object} - locale for the language specified by `lang`
     * - return:
     *     {Date|Number} parsed date or its time value
     * @param  {String} [lang=en] - language code for the locale to use
     * @return {Number} time value of parsed date
     */
  }, {
    key: "parseDate",
    value: function parseDate$1(dateStr, format, lang) {
      return parseDate(dateStr, format, lang && locales[lang] || locales.en);
    }
    /**
     * @type {Object} - Installed locales in `[languageCode]: localeObject` format
     * en`:_English (US)_ is pre-installed.
     */
  }, {
    key: "locales",
    get: function get() {
      return locales;
    }
  }]);
})();
function filterOptions(options) {
  var newOpts = Object.assign({}, options);
  delete newOpts.inputs;
  delete newOpts.allowOneSidedRange;
  delete newOpts.maxNumberOfDates;
  return newOpts;
}
function setupDatepicker(rangepicker, changeDateListener, el, options) {
  registerListeners(rangepicker, [[el, "changeDate", changeDateListener]]);
  new Datepicker$1(el, options, rangepicker);
}
function onChangeDate(rangepicker, ev) {
  if (rangepicker._updating) {
    return;
  }
  rangepicker._updating = true;
  var target = ev.target;
  if (target.datepicker === void 0) {
    return;
  }
  var datepickers = rangepicker.datepickers;
  var setDateOptions = {
    render: false
  };
  var changedSide = rangepicker.inputs.indexOf(target);
  var otherSide = changedSide === 0 ? 1 : 0;
  var changedDate = datepickers[changedSide].dates[0];
  var otherDate = datepickers[otherSide].dates[0];
  if (changedDate !== void 0 && otherDate !== void 0) {
    if (changedSide === 0 && changedDate > otherDate) {
      datepickers[0].setDate(otherDate, setDateOptions);
      datepickers[1].setDate(changedDate, setDateOptions);
    } else if (changedSide === 1 && changedDate < otherDate) {
      datepickers[0].setDate(changedDate, setDateOptions);
      datepickers[1].setDate(otherDate, setDateOptions);
    }
  } else if (!rangepicker.allowOneSidedRange) {
    if (changedDate !== void 0 || otherDate !== void 0) {
      setDateOptions.clear = true;
      datepickers[otherSide].setDate(datepickers[changedSide].dates, setDateOptions);
    }
  }
  datepickers[0].picker.update().render();
  datepickers[1].picker.update().render();
  delete rangepicker._updating;
}
var DateRangePicker = /* @__PURE__ */ (function() {
  function DateRangePicker2(element) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, DateRangePicker2);
    var inputs = Array.isArray(options.inputs) ? options.inputs : Array.from(element.querySelectorAll("input"));
    if (inputs.length < 2) {
      return;
    }
    element.rangepicker = this;
    this.element = element;
    this.inputs = inputs.slice(0, 2);
    this.allowOneSidedRange = !!options.allowOneSidedRange;
    var changeDateListener = onChangeDate.bind(null, this);
    var cleanOptions = filterOptions(options);
    var datepickers = [];
    Object.defineProperty(this, "datepickers", {
      get: function get() {
        return datepickers;
      }
    });
    setupDatepicker(this, changeDateListener, this.inputs[0], cleanOptions);
    setupDatepicker(this, changeDateListener, this.inputs[1], cleanOptions);
    Object.freeze(datepickers);
    if (datepickers[0].dates.length > 0) {
      onChangeDate(this, {
        target: this.inputs[0]
      });
    } else if (datepickers[1].dates.length > 0) {
      onChangeDate(this, {
        target: this.inputs[1]
      });
    }
  }
  return _createClass(DateRangePicker2, [{
    key: "dates",
    get: function get() {
      return this.datepickers.length === 2 ? [this.datepickers[0].dates[0], this.datepickers[1].dates[0]] : void 0;
    }
    /**
     * Set new values to the config options
     * @param {Object} options - config options to update
     */
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.allowOneSidedRange = !!options.allowOneSidedRange;
      var cleanOptions = filterOptions(options);
      this.datepickers[0].setOptions(cleanOptions);
      this.datepickers[1].setOptions(cleanOptions);
    }
    /**
     * Destroy the DateRangePicker instance
     * @return {DateRangePicker} - the instance destroyed
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.datepickers[0].destroy();
      this.datepickers[1].destroy();
      unregisterListeners(this);
      delete this.element.rangepicker;
    }
    /**
     * Get the start and end dates of the date range
     *
     * The method returns Date objects by default. If format string is passed,
     * it returns date strings formatted in given format.
     * The result array always contains 2 items (start date/end date) and
     * undefined is used for unselected side. (e.g. If none is selected,
     * the result will be [undefined, undefined]. If only the end date is set
     * when allowOneSidedRange config option is true, [undefined, endDate] will
     * be returned.)
     *
     * @param  {String} [format] - Format string to stringify the dates
     * @return {Array} - Start and end dates
     */
  }, {
    key: "getDates",
    value: function getDates() {
      var _this = this;
      var format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      var callback = format ? function(date) {
        return formatDate(date, format, _this.datepickers[0].config.locale);
      } : function(date) {
        return new Date(date);
      };
      return this.dates.map(function(date) {
        return date === void 0 ? date : callback(date);
      });
    }
    /**
     * Set the start and end dates of the date range
     *
     * The method calls datepicker.setDate() internally using each of the
     * arguments in start→end order.
     *
     * When a clear: true option object is passed instead of a date, the method
     * clears the date.
     *
     * If an invalid date, the same date as the current one or an option object
     * without clear: true is passed, the method considers that argument as an
     * "ineffective" argument because calling datepicker.setDate() with those
     * values makes no changes to the date selection.
     *
     * When the allowOneSidedRange config option is false, passing {clear: true}
     * to clear the range works only when it is done to the last effective
     * argument (in other words, passed to rangeEnd or to rangeStart along with
     * ineffective rangeEnd). This is because when the date range is changed,
     * it gets normalized based on the last change at the end of the changing
     * process.
     *
     * @param {Date|Number|String|Object} rangeStart - Start date of the range
     * or {clear: true} to clear the date
     * @param {Date|Number|String|Object} rangeEnd - End date of the range
     * or {clear: true} to clear the date
     */
  }, {
    key: "setDates",
    value: function setDates(rangeStart, rangeEnd) {
      var _this$datepickers = _slicedToArray(this.datepickers, 2), datepicker0 = _this$datepickers[0], datepicker1 = _this$datepickers[1];
      var origDates = this.dates;
      this._updating = true;
      datepicker0.setDate(rangeStart);
      datepicker1.setDate(rangeEnd);
      delete this._updating;
      if (datepicker1.dates[0] !== origDates[1]) {
        onChangeDate(this, {
          target: this.inputs[1]
        });
      } else if (datepicker0.dates[0] !== origDates[0]) {
        onChangeDate(this, {
          target: this.inputs[0]
        });
      }
    }
  }]);
})();
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var Default = {
  defaultDatepickerId: null,
  autohide: false,
  format: "mm/dd/yyyy",
  maxDate: null,
  minDate: null,
  orientation: "bottom",
  buttons: false,
  autoSelectToday: 0,
  title: null,
  language: "en",
  rangePicker: false,
  onShow: function() {
  },
  onHide: function() {
  }
};
var DefaultInstanceOptions = {
  id: null,
  override: true
};
var Datepicker = (
  /** @class */
  (function() {
    function Datepicker2(datepickerEl, options, instanceOptions) {
      if (datepickerEl === void 0) {
        datepickerEl = null;
      }
      if (options === void 0) {
        options = Default;
      }
      if (instanceOptions === void 0) {
        instanceOptions = DefaultInstanceOptions;
      }
      this._instanceId = instanceOptions.id ? instanceOptions.id : datepickerEl.id;
      this._datepickerEl = datepickerEl;
      this._datepickerInstance = null;
      this._options = __assign(__assign({}, Default), options);
      this._initialized = false;
      this.init();
      instances.addInstance("Datepicker", this, this._instanceId, instanceOptions.override);
    }
    Datepicker2.prototype.init = function() {
      if (this._datepickerEl && !this._initialized) {
        if (this._options.rangePicker) {
          this._datepickerInstance = new DateRangePicker(this._datepickerEl, this._getDatepickerOptions(this._options));
        } else {
          this._datepickerInstance = new Datepicker$1(this._datepickerEl, this._getDatepickerOptions(this._options));
        }
        this._initialized = true;
      }
    };
    Datepicker2.prototype.destroy = function() {
      if (this._initialized) {
        this._initialized = false;
        this._datepickerInstance.destroy();
      }
    };
    Datepicker2.prototype.removeInstance = function() {
      this.destroy();
      instances.removeInstance("Datepicker", this._instanceId);
    };
    Datepicker2.prototype.destroyAndRemoveInstance = function() {
      this.destroy();
      this.removeInstance();
    };
    Datepicker2.prototype.getDatepickerInstance = function() {
      return this._datepickerInstance;
    };
    Datepicker2.prototype.getDate = function() {
      if (this._options.rangePicker && this._datepickerInstance instanceof DateRangePicker) {
        return this._datepickerInstance.getDates();
      }
      if (!this._options.rangePicker && this._datepickerInstance instanceof Datepicker$1) {
        return this._datepickerInstance.getDate();
      }
    };
    Datepicker2.prototype.setDate = function(date) {
      if (this._options.rangePicker && this._datepickerInstance instanceof DateRangePicker) {
        return this._datepickerInstance.setDates(date);
      }
      if (!this._options.rangePicker && this._datepickerInstance instanceof Datepicker$1) {
        return this._datepickerInstance.setDate(date);
      }
    };
    Datepicker2.prototype.show = function() {
      this._datepickerInstance.show();
      this._options.onShow(this);
    };
    Datepicker2.prototype.hide = function() {
      this._datepickerInstance.hide();
      this._options.onHide(this);
    };
    Datepicker2.prototype._getDatepickerOptions = function(options) {
      var datepickerOptions = {};
      if (options.buttons) {
        datepickerOptions.todayBtn = true;
        datepickerOptions.clearBtn = true;
        if (options.autoSelectToday) {
          datepickerOptions.todayBtnMode = 1;
        }
      }
      if (options.autohide) {
        datepickerOptions.autohide = true;
      }
      if (options.format) {
        datepickerOptions.format = options.format;
      }
      if (options.maxDate) {
        datepickerOptions.maxDate = options.maxDate;
      }
      if (options.minDate) {
        datepickerOptions.minDate = options.minDate;
      }
      if (options.orientation) {
        datepickerOptions.orientation = options.orientation;
      }
      if (options.title) {
        datepickerOptions.title = options.title;
      }
      if (options.language) {
        datepickerOptions.language = options.language;
      }
      return datepickerOptions;
    };
    Datepicker2.prototype.updateOnShow = function(callback) {
      this._options.onShow = callback;
    };
    Datepicker2.prototype.updateOnHide = function(callback) {
      this._options.onHide = callback;
    };
    return Datepicker2;
  })()
);
function initDatepickers() {
  document.querySelectorAll("[datepicker], [inline-datepicker], [date-rangepicker]").forEach(function($datepickerEl) {
    if ($datepickerEl) {
      var buttons = $datepickerEl.hasAttribute("datepicker-buttons");
      var autoselectToday = $datepickerEl.hasAttribute("datepicker-autoselect-today");
      var autohide = $datepickerEl.hasAttribute("datepicker-autohide");
      var format = $datepickerEl.getAttribute("datepicker-format");
      var maxDate = $datepickerEl.getAttribute("datepicker-max-date");
      var minDate = $datepickerEl.getAttribute("datepicker-min-date");
      var orientation_1 = $datepickerEl.getAttribute("datepicker-orientation");
      var title = $datepickerEl.getAttribute("datepicker-title");
      var language = $datepickerEl.getAttribute("datepicker-language");
      var rangePicker = $datepickerEl.hasAttribute("date-rangepicker");
      new Datepicker($datepickerEl, {
        buttons: buttons ? buttons : Default.buttons,
        autoSelectToday: autoselectToday ? autoselectToday : Default.autoSelectToday,
        autohide: autohide ? autohide : Default.autohide,
        format: format ? format : Default.format,
        maxDate: maxDate ? maxDate : Default.maxDate,
        minDate: minDate ? minDate : Default.minDate,
        orientation: orientation_1 ? orientation_1 : Default.orientation,
        title: title ? title : Default.title,
        language: language ? language : Default.language,
        rangePicker: rangePicker ? rangePicker : Default.rangePicker
      });
    } else {
    }
  });
}
if (typeof window !== "undefined") {
  window.Datepicker = Datepicker;
  window.initDatepickers = initDatepickers;
}
function initFlowbite() {
  initAccordions();
  initCollapses();
  initCarousels();
  initDismisses();
  initDropdowns();
  initModals();
  initDrawers();
  initTabs();
  initTooltips();
  initPopovers();
  initDials();
  initInputCounters();
  initCopyClipboards();
  initDatepickers();
}
if (typeof window !== "undefined") {
  window.initFlowbite = initFlowbite;
}
var events = new Events("load", [
  initAccordions,
  initCollapses,
  initCarousels,
  initDismisses,
  initDropdowns,
  initModals,
  initDrawers,
  initTabs,
  initTooltips,
  initPopovers,
  initDials,
  initInputCounters,
  initCopyClipboards,
  initDatepickers
]);
events.init();
var Tn = Object.defineProperty;
var Eo = (e) => {
  throw TypeError(e);
};
var Sn = (e, o, t) => o in e ? Tn(e, o, { enumerable: true, configurable: true, writable: true, value: t }) : e[o] = t;
var C = (e, o, t) => Sn(e, typeof o != "symbol" ? o + "" : o, t), Pt = (e, o, t) => o.has(e) || Eo("Cannot " + t);
var f = (e, o, t) => (Pt(e, o, "read from private field"), o.get(e)), L = (e, o, t) => o.has(e) ? Eo("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), I = (e, o, t, n) => (Pt(e, o, "write to private field"), o.set(e, t), t), M2 = (e, o, t) => (Pt(e, o, "access private method"), t);
if (typeof globalThis.window < "u") {
  let e = false;
  document.addEventListener("submit", (o) => {
    if (e) {
      e = false;
      return;
    }
    let t = o.target;
    if (t && t.method === "dialog") {
      let n = t.closest("el-dialog");
      if (!n || !("beforeClose" in n)) return;
      let r = n.beforeClose();
      if (r === true || (o.preventDefault(), o.stopImmediatePropagation(), r === false)) return;
      r.then((i) => {
        i && (e = true, t.dispatchEvent(o));
      }).catch(console.error);
    }
  }, true);
}
var lt = class extends Event {
  constructor(o, { oldState: t = "", newState: n = "", ...r } = {}) {
    super(o, r);
    C(this, "oldState");
    C(this, "newState");
    this.oldState = String(t || ""), this.newState = String(n || "");
  }
}, Ao = /* @__PURE__ */ new WeakMap();
function Po(e, o, t) {
  Ao.set(e, setTimeout(() => {
    Ao.has(e) && e.dispatchEvent(new lt("toggle", { cancelable: false, oldState: o, newState: t }));
  }, 0));
}
var Rt = globalThis.ShadowRoot || function() {
}, Ln = globalThis.HTMLDialogElement || function() {
}, nt = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap();
function rt(e) {
  return Se.get(e) || "hidden";
}
var it = /* @__PURE__ */ new WeakMap();
function Ve(e) {
  return [...e].pop();
}
function In(e) {
  let o = e.popoverTargetElement;
  if (!(o instanceof HTMLElement)) return;
  let t = rt(o);
  e.popoverTargetAction === "show" && t === "showing" || e.popoverTargetAction === "hide" && t === "hidden" || (t === "showing" ? Ie(o, true, true) : me(o, false) && (it.set(o, e), Mt(o)));
}
function me(e, o) {
  return !(e.popover !== "auto" && e.popover !== "manual" && e.popover !== "hint" || !e.isConnected || o && rt(e) !== "showing" || !o && rt(e) !== "hidden" || e instanceof Ln && e.hasAttribute("open") || document.fullscreenElement === e);
}
function xo(e) {
  if (!e) return 0;
  let o = Q.get(document) || /* @__PURE__ */ new Set(), t = F.get(document) || /* @__PURE__ */ new Set();
  return t.has(e) ? [...t].indexOf(e) + o.size + 1 : o.has(e) ? [...o].indexOf(e) + 1 : 0;
}
function kn(e) {
  let o = Oo(e), t = Pn(e);
  return xo(o) > xo(t) ? o : t;
}
function We(e) {
  let o, t = F.get(e) || /* @__PURE__ */ new Set(), n = Q.get(e) || /* @__PURE__ */ new Set(), r = t.size > 0 ? t : n.size > 0 ? n : null;
  return r ? (o = Ve(r), o.isConnected ? o : (r.delete(o), We(e))) : null;
}
function To(e) {
  for (let o of e || []) if (!o.isConnected) e.delete(o);
  else return o;
  return null;
}
function Le(e) {
  return typeof e.getRootNode == "function" ? e.getRootNode() : e.parentNode ? Le(e.parentNode) : e;
}
function Oo(e) {
  for (; e; ) {
    if (e instanceof HTMLElement && e.popover === "auto" && Se.get(e) === "showing") return e;
    if (e = e instanceof Element && e.assignedSlot || e.parentElement || Le(e), e instanceof Rt && (e = e.host), e instanceof Document) return;
  }
}
function Pn(e) {
  for (; e; ) {
    let o = e.popoverTargetElement;
    if (o instanceof HTMLElement) return o;
    if (e = e.parentElement || Le(e), e instanceof Rt && (e = e.host), e instanceof Document) return;
  }
}
function So(e, o) {
  let t = /* @__PURE__ */ new Map(), n = 0;
  for (let s of o || []) t.set(s, n), n += 1;
  t.set(e, n), n += 1;
  let r = null;
  function i(s) {
    if (!s) return;
    let a = false, l = null, u = null;
    for (; !a; ) {
      if (l = Oo(s) || null, l === null || !t.has(l)) return;
      (e.popover === "hint" || l.popover === "auto") && (a = true), a || (s = l.parentElement);
    }
    u = t.get(l), (r === null || t.get(r) < u) && (r = l);
  }
  return i(e.parentElement || Le(e)), r;
}
function On(e) {
  return e.hidden || e instanceof Rt || (e instanceof HTMLButtonElement || e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement || e instanceof HTMLOptGroupElement || e instanceof HTMLOptionElement || e instanceof HTMLFieldSetElement) && e.disabled || e instanceof HTMLInputElement && e.type === "hidden" || e instanceof HTMLAnchorElement && e.href === "" ? false : typeof e.tabIndex == "number" && e.tabIndex !== -1;
}
function Dn(e) {
  if (e.shadowRoot && e.shadowRoot.delegatesFocus !== true) return null;
  let o = e;
  o.shadowRoot && (o = o.shadowRoot);
  let t = o.querySelector("[autofocus]");
  if (t) return t;
  {
    let i = o.querySelectorAll("slot");
    for (let s of i) {
      let a = s.assignedElements({ flatten: true });
      for (let l of a) {
        if (l.hasAttribute("autofocus")) return l;
        if (t = l.querySelector("[autofocus]"), t) return t;
      }
    }
  }
  let n = e.ownerDocument.createTreeWalker(o, NodeFilter.SHOW_ELEMENT), r = n.currentNode;
  for (; r; ) {
    if (On(r)) return r;
    r = n.nextNode();
  }
}
function Cn(e) {
  var o;
  (o = Dn(e)) == null || o.focus();
}
var st = /* @__PURE__ */ new WeakMap();
function Mt(e) {
  if (!me(e, false)) return;
  let o = e.ownerDocument;
  if (!e.dispatchEvent(new lt("beforetoggle", { cancelable: true, oldState: "closed", newState: "open" })) || !me(e, false)) return;
  let t = false, n = e.popover, r = null, i = So(e, Q.get(o) || /* @__PURE__ */ new Set()), s = So(e, F.get(o) || /* @__PURE__ */ new Set());
  if (n === "auto" && (Ht(F.get(o) || /* @__PURE__ */ new Set(), t, true), he(i || o, t, true), r = "auto"), n === "hint" && (s ? (he(s, t, true), r = "hint") : (Ht(F.get(o) || /* @__PURE__ */ new Set(), t, true), i ? (he(i, t, true), r = "auto") : r = "hint")), n === "auto" || n === "hint") {
    if (n !== e.popover || !me(e, false)) return;
    We(o) || (t = true), r === "auto" ? (Q.has(o) || Q.set(o, /* @__PURE__ */ new Set()), Q.get(o).add(e)) : r === "hint" && (F.has(o) || F.set(o, /* @__PURE__ */ new Set()), F.get(o).add(e));
  }
  st.delete(e);
  let a = o.activeElement;
  e.classList.add(":popover-open"), Se.set(e, "showing"), nt.has(o) || nt.set(o, /* @__PURE__ */ new Set()), nt.get(o).add(e), Do(it.get(e), true), Cn(e), t && a && e.popover === "auto" && st.set(e, a), Po(e, "closed", "open");
}
function Ie(e, o = false, t = false) {
  var n, r;
  if (!me(e, true)) return;
  let i = e.ownerDocument;
  if (["auto", "hint"].includes(e.popover) && (he(e, o, t), !me(e, true))) return;
  let s = Q.get(i) || /* @__PURE__ */ new Set(), a = s.has(e) && Ve(s) === e;
  if (Do(it.get(e), false), it.delete(e), t && (e.dispatchEvent(new lt("beforetoggle", { oldState: "open", newState: "closed" })), a && Ve(s) !== e && he(e, o, t), !me(e, true))) return;
  (n = nt.get(i)) == null || n.delete(e), s.delete(e), (r = F.get(i)) == null || r.delete(e), e.classList.remove(":popover-open"), Se.set(e, "hidden"), t && Po(e, "open", "closed");
  let l = st.get(e);
  l && (st.delete(e), o && l.focus());
}
function Mn(e, o = false, t = false) {
  let n = We(e);
  for (; n; ) Ie(n, o, t), n = We(e);
}
function Ht(e, o = false, t = false) {
  let n = To(e);
  for (; n; ) Ie(n, o, t), n = To(e);
}
function Lo(e, o, t, n) {
  let r = false, i = false;
  for (; r || !i; ) {
    i = true;
    let s = null, a = false;
    for (let l of o) if (l === e) a = true;
    else if (a) {
      s = l;
      break;
    }
    if (!s) return;
    for (; rt(s) === "showing" && o.size; ) Ie(Ve(o), t, n);
    o.has(e) && Ve(o) !== e && (r = true), r && (n = false);
  }
}
function he(e, o, t) {
  var n, r;
  let i = e.ownerDocument || e;
  if (e instanceof Document) return Mn(i, o, t);
  if ((n = F.get(i)) != null && n.has(e)) {
    Lo(e, F.get(i), o, t);
    return;
  }
  Ht(F.get(i) || /* @__PURE__ */ new Set(), o, t), (r = Q.get(i)) != null && r.has(e) && Lo(e, Q.get(i), o, t);
}
var Ot = /* @__PURE__ */ new WeakMap();
function Io(e) {
  if (!e.isTrusted) return;
  let o = e.composedPath()[0];
  if (!o) return;
  let t = o.ownerDocument;
  if (!We(t)) return;
  let r = kn(o);
  if (r && e.type === "pointerdown") Ot.set(t, r);
  else if (e.type === "pointerup") {
    let i = Ot.get(t) === r;
    Ot.delete(t), i && he(r || t, false, true);
  }
}
var Dt = /* @__PURE__ */ new WeakMap();
function Do(e, o = false) {
  if (!e) return;
  Dt.has(e) || Dt.set(e, e.getAttribute("aria-expanded"));
  let t = e.popoverTargetElement;
  if (t instanceof HTMLElement && t.popover === "auto") e.setAttribute("aria-expanded", String(o));
  else {
    let n = Dt.get(e);
    n ? e.setAttribute("aria-expanded", n) : e.removeAttribute("aria-expanded");
  }
}
var ko = globalThis.ShadowRoot || function() {
};
function Co() {
  return typeof HTMLElement < "u" && typeof HTMLElement.prototype == "object" && "popover" in HTMLElement.prototype;
}
function pe(e, o, t) {
  let n = e[o];
  Object.defineProperty(e, o, { value(r) {
    return n.call(this, t(r));
  } });
}
var Hn = /(^|[^\\]):popover-open\b/g;
function Rn() {
  return typeof globalThis.CSSLayerBlockRule == "function";
}
function Bn() {
  let e = Rn();
  return `
${e ? "@layer popover-polyfill {" : ""}
  :where([popover]) {
    position: fixed;
    z-index: 2147483647;
    inset: 0;
    padding: 0.25em;
    width: fit-content;
    height: fit-content;
    border-width: initial;
    border-color: initial;
    border-image: initial;
    border-style: solid;
    background-color: canvas;
    color: canvastext;
    overflow: auto;
    margin: auto;
  }

  :where([popover]:not(.\\:popover-open)) {
    display: none;
  }

  :where(dialog[popover].\\:popover-open) {
    display: block;
  }

  :where(dialog[popover][open]) {
    display: revert;
  }

  :where([anchor].\\:popover-open) {
    inset: auto;
  }

  :where([anchor]:popover-open) {
    inset: auto;
  }

  @supports not (background-color: canvas) {
    :where([popover]) {
      background-color: white;
      color: black;
    }
  }

  @supports (width: -moz-fit-content) {
    :where([popover]) {
      width: -moz-fit-content;
      height: -moz-fit-content;
    }
  }

  @supports not (inset: 0) {
    :where([popover]) {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
${e ? "}" : ""}
`;
}
var Te = null;
function Ct(e) {
  let o = Bn();
  if (Te === null) try {
    Te = new CSSStyleSheet(), Te.replaceSync(o);
  } catch {
    Te = false;
  }
  if (Te === false) {
    let t = document.createElement("style");
    t.textContent = o, e instanceof Document ? e.head.prepend(t) : e.prepend(t);
  } else e.adoptedStyleSheets = [Te, ...e.adoptedStyleSheets];
}
function Mo() {
  if (typeof window > "u") return;
  window.ToggleEvent = window.ToggleEvent || lt;
  function e(l) {
    return (l == null ? void 0 : l.includes(":popover-open")) && (l = l.replace(Hn, "$1.\\:popover-open")), l;
  }
  pe(Document.prototype, "querySelector", e), pe(Document.prototype, "querySelectorAll", e), pe(Element.prototype, "querySelector", e), pe(Element.prototype, "querySelectorAll", e), pe(Element.prototype, "matches", e), pe(Element.prototype, "closest", e), pe(DocumentFragment.prototype, "querySelectorAll", e), Object.defineProperties(HTMLElement.prototype, { popover: { enumerable: true, configurable: true, get() {
    if (!this.hasAttribute("popover")) return null;
    let l = (this.getAttribute("popover") || "").toLowerCase();
    return l === "" || l == "auto" ? "auto" : l == "hint" ? "hint" : "manual";
  }, set(l) {
    l === null ? this.removeAttribute("popover") : this.setAttribute("popover", l);
  } }, showPopover: { enumerable: true, configurable: true, value(l = {}) {
    Mt(this);
  } }, hidePopover: { enumerable: true, configurable: true, value() {
    Ie(this, true, true);
  } }, togglePopover: { enumerable: true, configurable: true, value(l = {}) {
    return typeof l == "boolean" && (l = { force: l }), Se.get(this) === "showing" && l.force === void 0 || l.force === false ? Ie(this, true, true) : (l.force === void 0 || l.force === true) && Mt(this), Se.get(this) === "showing";
  } } });
  let o = Element.prototype.attachShadow;
  o && Object.defineProperties(Element.prototype, { attachShadow: { enumerable: true, configurable: true, writable: true, value(l) {
    let u = o.call(this, l);
    return Ct(u), u;
  } } });
  let t = HTMLElement.prototype.attachInternals;
  t && Object.defineProperties(HTMLElement.prototype, { attachInternals: { enumerable: true, configurable: true, writable: true, value() {
    let l = t.call(this);
    return l.shadowRoot && Ct(l.shadowRoot), l;
  } } });
  let n = /* @__PURE__ */ new WeakMap();
  function r(l) {
    Object.defineProperties(l.prototype, { popoverTargetElement: { enumerable: true, configurable: true, set(u) {
      if (u === null) this.removeAttribute("popovertarget"), n.delete(this);
      else if (u instanceof Element) this.setAttribute("popovertarget", ""), n.set(this, u);
      else throw new TypeError("popoverTargetElement must be an element or null");
    }, get() {
      if (this.localName !== "button" && this.localName !== "input" || this.localName === "input" && this.type !== "reset" && this.type !== "image" && this.type !== "button" || this.disabled || this.form && this.type === "submit") return null;
      let u = n.get(this);
      if (u && u.isConnected) return u;
      if (u && !u.isConnected) return n.delete(this), null;
      let p = Le(this), g = this.getAttribute("popovertarget");
      return (p instanceof Document || p instanceof ko) && g && p.getElementById(g) || null;
    } }, popoverTargetAction: { enumerable: true, configurable: true, get() {
      let u = (this.getAttribute("popovertargetaction") || "").toLowerCase();
      return u === "show" || u === "hide" ? u : "toggle";
    }, set(u) {
      this.setAttribute("popovertargetaction", u);
    } } });
  }
  r(HTMLButtonElement), r(HTMLInputElement);
  let i = (l) => {
    if (l.defaultPrevented) return;
    let u = l.composedPath(), p = u[0];
    if (!(p instanceof Element) || (p == null ? void 0 : p.shadowRoot)) return;
    let g = Le(p);
    if (!(g instanceof ko || g instanceof Document)) return;
    let c = u.find((b) => {
      var d3;
      return (d3 = b.matches) == null ? void 0 : d3.call(b, "[popovertargetaction],[popovertarget]");
    });
    if (c) {
      In(c), l.preventDefault();
      return;
    }
  }, s = (l) => {
    let u = l.key, p = l.target;
    !l.defaultPrevented && p && (u === "Escape" || u === "Esc") && he(p.ownerDocument, true, true);
  };
  ((l) => {
    l.addEventListener("click", i), l.addEventListener("keydown", s), l.addEventListener("pointerdown", Io), l.addEventListener("pointerup", Io);
  })(document), Ct(document);
}
function Ho() {
  return typeof HTMLButtonElement < "u" && "command" in HTMLButtonElement.prototype && "source" in ((globalThis.CommandEvent || {}).prototype || {});
}
function Ro() {
  document.addEventListener("invoke", (d3) => {
    d3.type == "invoke" && d3.isTrusted && (d3.stopImmediatePropagation(), d3.preventDefault());
  }, true), document.addEventListener("command", (d3) => {
    d3.type == "command" && d3.isTrusted && (d3.stopImmediatePropagation(), d3.preventDefault());
  }, true);
  function e(d3, m3, h = true) {
    Object.defineProperty(d3, m3, { ...Object.getOwnPropertyDescriptor(d3, m3), enumerable: h });
  }
  function o(d3) {
    return d3 && typeof d3.getRootNode == "function" ? d3.getRootNode() : d3 && d3.parentNode ? o(d3.parentNode) : d3;
  }
  let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  class r extends Event {
    constructor(m3, h = {}) {
      super(m3, h);
      let { source: w, command: y3 } = h;
      if (w != null && !(w instanceof Element)) throw new TypeError("source must be an element");
      t.set(this, w || null), n.set(this, y3 !== void 0 ? String(y3) : "");
    }
    get [Symbol.toStringTag]() {
      return "CommandEvent";
    }
    get source() {
      if (!t.has(this)) throw new TypeError("illegal invocation");
      let m3 = t.get(this);
      if (!(m3 instanceof Element)) return null;
      let h = o(m3);
      return h !== o(this.target || document) ? h.host : m3;
    }
    get command() {
      if (!n.has(this)) throw new TypeError("illegal invocation");
      return n.get(this);
    }
    get action() {
      throw new Error("CommandEvent#action was renamed to CommandEvent#command");
    }
    get invoker() {
      throw new Error("CommandEvent#invoker was renamed to CommandEvent#source");
    }
  }
  e(r.prototype, "source"), e(r.prototype, "command");
  class i extends Event {
    constructor(m3, h = {}) {
      throw super(m3, h), new Error("InvokeEvent has been deprecated, it has been renamed to `CommandEvent`");
    }
  }
  let s = /* @__PURE__ */ new WeakMap();
  function a(d3) {
    Object.defineProperties(d3.prototype, { commandForElement: { enumerable: true, configurable: true, set(m3) {
      if (this.hasAttribute("invokeaction")) throw new TypeError("Element has deprecated `invokeaction` attribute, replace with `command`");
      if (this.hasAttribute("invoketarget")) throw new TypeError("Element has deprecated `invoketarget` attribute, replace with `commandfor`");
      if (m3 === null) this.removeAttribute("commandfor"), s.delete(this);
      else if (m3 instanceof Element) {
        this.setAttribute("commandfor", "");
        let h = o(m3);
        o(this) === h || h === this.ownerDocument ? s.set(this, m3) : s.delete(this);
      } else throw new TypeError("commandForElement must be an element or null");
    }, get() {
      if (this.localName !== "button") return null;
      if (this.hasAttribute("invokeaction") || this.hasAttribute("invoketarget")) return void 0, null;
      if (this.disabled) return null;
      if (this.form && this.getAttribute("type") !== "button") return void 0, null;
      let m3 = s.get(this);
      if (m3) return m3.isConnected ? m3 : (s.delete(this), null);
      let h = o(this), w = this.getAttribute("commandfor");
      return (h instanceof Document || h instanceof ShadowRoot) && w && h.getElementById(w) || null;
    } }, command: { enumerable: true, configurable: true, get() {
      let m3 = this.getAttribute("command") || "";
      if (m3.startsWith("--")) return m3;
      let h = m3.toLowerCase();
      switch (h) {
        case "show-modal":
        case "close":
        case "toggle-popover":
        case "hide-popover":
        case "show-popover":
          return h;
      }
      return "";
    }, set(m3) {
      this.setAttribute("command", m3);
    } }, invokeAction: { enumerable: false, configurable: true, get() {
      throw new Error("invokeAction is deprecated. It has been renamed to command");
    }, set(m3) {
      throw new Error("invokeAction is deprecated. It has been renamed to command");
    } }, invokeTargetElement: { enumerable: false, configurable: true, get() {
      throw new Error("invokeTargetElement is deprecated. It has been renamed to command");
    }, set(m3) {
      throw new Error("invokeTargetElement is deprecated. It has been renamed to command");
    } } });
  }
  let l = /* @__PURE__ */ new WeakMap();
  Object.defineProperties(HTMLElement.prototype, { oncommand: { enumerable: true, configurable: true, get() {
    return p.takeRecords(), l.get(this) || null;
  }, set(d3) {
    let m3 = l.get(this) || null;
    m3 && this.removeEventListener("command", m3), l.set(this, typeof d3 == "object" || typeof d3 == "function" ? d3 : null), typeof d3 == "function" && this.addEventListener("command", d3);
  } } });
  function u(d3) {
    for (let m3 of d3) m3.oncommand = new Function("event", m3.getAttribute("oncommand"));
  }
  let p = new MutationObserver((d3) => {
    for (let m3 of d3) {
      let { target: h } = m3;
      m3.type === "childList" ? u(h.querySelectorAll("[oncommand]")) : u([h]);
    }
  });
  p.observe(document, { subtree: true, childList: true, attributeFilter: ["oncommand"] }), u(document.querySelectorAll("[oncommand]"));
  function g(d3) {
    if (d3.defaultPrevented || d3.type !== "click") return;
    let m3 = d3.target.closest("button[invoketarget], button[invokeaction], input[invoketarget], input[invokeaction]");
    if (m3 && (void 0, m3.matches("input"))) throw new Error("Input elements no longer support `commandfor`");
    let h = d3.target.closest("button[commandfor], button[command]");
    if (!h) return;
    if (h.form && h.getAttribute("type") !== "button") throw d3.preventDefault(), new Error("Element with `commandFor` is a form participant. It should explicitly set `type=button` in order for `commandFor` to work. In order for it to act as a Submit button, it must not have command or commandfor attributes");
    if (h.hasAttribute("command") !== h.hasAttribute("commandfor")) {
      let A = h.hasAttribute("command") ? "command" : "commandfor", E = h.hasAttribute("command") ? "commandfor" : "command";
      throw new Error(`Element with ${A} attribute must also have a ${E} attribute to function.`);
    }
    if (h.command !== "show-popover" && h.command !== "hide-popover" && h.command !== "toggle-popover" && h.command !== "show-modal" && h.command !== "close" && !h.command.startsWith("--")) {
      return;
    }
    let w = h.commandForElement;
    if (!w) return;
    let y3 = new r("command", { command: h.command, source: h, cancelable: true });
    if (w.dispatchEvent(y3), y3.defaultPrevented) return;
    let v = y3.command.toLowerCase();
    if (w.popover) {
      let A = !w.matches(":popover-open");
      A && (v === "toggle-popover" || v === "show-popover") ? w.showPopover({ source: h }) : !A && v === "hide-popover" && w.hidePopover();
    } else if (w.localName === "dialog") {
      let A = !w.hasAttribute("open");
      A && v === "show-modal" ? w.showModal() : !A && v === "close" && w.close();
    }
  }
  function c(d3) {
    d3.addEventListener("click", g, true);
  }
  function b(d3, m3) {
    let h = d3.prototype.attachShadow;
    d3.prototype.attachShadow = function(y3) {
      let v = h.call(this, y3);
      return m3(v), v;
    };
    let w = d3.prototype.attachInternals;
    d3.prototype.attachInternals = function() {
      let y3 = w.call(this);
      return y3.shadowRoot && m3(y3.shadowRoot), y3;
    };
  }
  a(HTMLButtonElement), b(HTMLElement, (d3) => {
    c(d3), p.observe(d3, { attributeFilter: ["oncommand"] }), u(d3.querySelectorAll("[oncommand]"));
  }), c(document), Object.assign(globalThis, { CommandEvent: r, InvokeEvent: i });
}
function Bo() {
  if (typeof HTMLDialogElement != "function") return false;
  let e = false, o = document.createElement("dialog");
  return o.addEventListener("beforetoggle", (t) => {
    e = true, t.preventDefault();
  }), o.show(), e;
}
function No() {
  let e = /* @__PURE__ */ new WeakMap();
  function o(s) {
    let a = s.open ? "closed" : "open", l = s.open ? "open" : "closed";
    if (e.has(s)) {
      let u = e.get(s);
      l = u.oldState, clearTimeout(u.id);
    }
    e.set(s, { oldState: l, id: setTimeout(() => {
      s.dispatchEvent(new ToggleEvent("toggle", { newState: a, oldState: l }));
    }) });
  }
  let t = HTMLDialogElement.prototype.show, n = HTMLDialogElement.prototype.showModal, r = HTMLDialogElement.prototype.close;
  function i(s) {
    let a = new ToggleEvent("beforetoggle", { newState: "closed", oldState: "open", cancelable: false });
    s.dispatchEvent(a), s.open && o(s);
  }
  document.addEventListener("submit", (s) => {
    let a = s.target;
    if (a.method === "dialog") {
      let l = a.closest("dialog");
      l instanceof HTMLDialogElement && i(l);
    }
  }, true), Object.defineProperties(HTMLDialogElement.prototype, { show: { value() {
    if (this.open || this.matches(":popover-open, :modal") || !this.ownerDocument) return t.apply(this, arguments);
    let s = new ToggleEvent("beforetoggle", { newState: "open", oldState: "closed", cancelable: true });
    this.dispatchEvent(s) && (o(this), t.apply(this, arguments));
  } }, showModal: { value() {
    if (this.open || this.matches(":popover-open, :modal") || !this.isConnected || !this.ownerDocument) return n.apply(this, arguments);
    let s = new ToggleEvent("beforetoggle", { newState: "open", oldState: "closed", cancelable: true });
    if (this.dispatchEvent(s)) return o(this), n.apply(this, arguments);
  } }, close: { value() {
    return !this.open && !this.matches(":popover-open, :modal") ? r.apply(this, arguments) : (i(this), r.apply(this, arguments));
  } } });
}
function at(e) {
  function o() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", o));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", o), o());
}
typeof globalThis.window < "u" && (Co() || (Mo(), at(async () => {
  if (await Nn("popover-polyfill")) return;
  let e = document.createElement("style");
  e.textContent = "@layer popover-polyfill;", e.setAttribute("suppressHydrationWarning", ""), e.addEventListener("securitypolicyviolation", () => {
  }), document.documentElement.prepend(e);
})), Ho() || Ro(), Bo() || No());
async function Nn(e) {
  await Fn();
  for (let o of document.styleSheets) try {
    for (let t of o.rules) if (t.constructor.name === "CSSLayerStatementRule" && "nameList" in t && t.nameList.includes(e)) return true;
  } catch {
  }
  return false;
}
async function Fn() {
  await Promise.all(Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((e) => e.sheet ? Promise.resolve() : new Promise((o) => {
    e.addEventListener("load", () => o(), { once: true }), e.addEventListener("error", () => o(), { once: true });
  })));
}
function ke(e) {
  "focus" in e && e.focus({ focusVisible: ut });
}
var ut = false;
if (typeof globalThis.window < "u") {
  let e;
  ((n) => (n[n.Keyboard = 0] = "Keyboard", n[n.Mouse = 1] = "Mouse"))(e || (e = {})), document.addEventListener("keydown", (o) => {
    o.metaKey || o.altKey || o.ctrlKey || (ut = true, document.documentElement.dataset.focusVisible = "");
  }, true), document.addEventListener("click", (o) => {
    o.detail === 1 ? (ut = false, delete document.documentElement.dataset.focusVisible) : o.detail === 0 && (ut = true, document.documentElement.dataset.focusVisible = "");
  }, true);
}
typeof globalThis.HTMLElement > "u" && (globalThis.HTMLElement = class {
});
var ge, $e, ie, x = class extends HTMLElement {
  constructor() {
    super(...arguments);
    L(this, ge, new AbortController());
    L(this, $e, false);
    L(this, ie, false);
  }
  connectedCallback() {
    if ("observedAttributes" in this.constructor && typeof this.constructor.observedAttributes == "object" && Array.isArray(this.constructor.observedAttributes)) for (let t of this.constructor.observedAttributes) typeof t == "string" && (t in this || Object.defineProperty(this, t, { get() {
      return this.getAttribute(t);
    }, set(n) {
      if (n == null || n === false) {
        this.removeAttribute(t);
        return;
      }
      this.setAttribute(t, n.toString());
    } }));
    I(this, $e, true), queueMicrotask(() => {
      var _a;
      if (!f(this, ge).signal.aborted) try {
        (_a = this.mount) == null ? void 0 : _a.call(this, f(this, ge).signal);
      } catch (t) {
      }
    });
  }
  disconnectedCallback() {
    f(this, ge).abort(), I(this, ge, new AbortController());
  }
  setAttributeNoCallbacks(t, n) {
    try {
      I(this, ie, true), this.setAttribute(t, n);
    } finally {
      I(this, ie, false);
    }
  }
  removeAttributeNoCallbacks(t) {
    try {
      I(this, ie, true), this.removeAttribute(t);
    } finally {
      I(this, ie, false);
    }
  }
  attributeChangedCallback(t, n, r) {
    var _a;
    f(this, $e) && (f(this, ie) || n !== r && ((_a = this.onAttributeChange) == null ? void 0 : _a.call(this, t, n, r)));
  }
};
ge = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap();
function T(e, o) {
  typeof globalThis.customElements > "u" || customElements.get(e) === o || customElements.define(e, o);
}
function X() {
  let e = [], o = { addEventListener(t, n, r, i) {
    return t.addEventListener(n, r, i), o.add(() => t.removeEventListener(n, r, i));
  }, requestAnimationFrame(...t) {
    let n = requestAnimationFrame(...t);
    return o.add(() => cancelAnimationFrame(n));
  }, nextFrame(...t) {
    return o.requestAnimationFrame(() => o.requestAnimationFrame(...t));
  }, setTimeout(...t) {
    let n = setTimeout(...t);
    return o.add(() => clearTimeout(n));
  }, microTask(...t) {
    let n = { current: true };
    return queueMicrotask(() => {
      n.current && t[0]();
    }), o.add(() => {
      n.current = false;
    });
  }, style(t, n, r) {
    let i = t.style.getPropertyValue(n);
    return n.startsWith("--") ? t.style.setProperty(n, r) : Object.assign(t.style, { [n]: r }), this.add(() => {
      n.startsWith("--") ? t.style.setProperty(n, i) : Object.assign(t.style, { [n]: i });
    });
  }, add(t) {
    return e.includes(t) || e.push(t), () => {
      let n = e.indexOf(t);
      if (n >= 0) for (let r of e.splice(n, 1)) r();
    };
  }, dispose() {
    for (let t of e.splice(0)) t();
  } };
  return o;
}
function Pe(e, o = () => []) {
  let t = false, n = null, r = X();
  return { start(i, s) {
    let a = [e, ...o()];
    t ? t = false : t = n !== null && n !== i, n = i;
    for (let l of a) qn(l, () => {
      t || (i === "in" ? (l.dataset.transition = "", l.dataset.enter = "", l.dataset.closed = "", delete l.dataset.leave) : i === "out" && (l.dataset.transition = "", l.dataset.leave = "", delete l.dataset.enter));
    }, n !== null);
    r.nextFrame(() => {
      for (let l of a) t ? i === "in" ? (delete l.dataset.enter, delete l.dataset.closed, l.dataset.leave = "") : i === "out" && (delete l.dataset.leave, l.dataset.enter = "", l.dataset.closed = "") : i === "in" ? delete l.dataset.closed : i === "out" && (l.dataset.closed = "");
      r.requestAnimationFrame(() => {
        r.add(Vn(e, () => {
          if (!(t && typeof e.getAnimations == "function" && e.getAnimations({ subtree: true }).length > 0)) {
            for (let l of a) delete l.dataset.transition, delete l.dataset.enter, delete l.dataset.closed, delete l.dataset.leave;
            n = null, s == null ? void 0 : s();
          }
        }));
      });
    });
  }, abort() {
    r.dispose(), t = false, n = null;
  } };
}
function qn(e, o, t = false) {
  if (t) {
    o();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", o(), e.offsetHeight, e.style.transition = n;
}
function Vn(e, o) {
  var _a;
  let t = X();
  if (!e) return t.dispose;
  let n = false;
  t.add(() => {
    n = true;
  });
  let r = ((_a = e.getAnimations) == null ? void 0 : _a.call(e, { subtree: true }).filter((i) => i instanceof CSSTransition)) ?? [];
  return r.length === 0 ? (o(), t.dispose) : (Promise.allSettled(r.map((i) => i.finished)).then(() => {
    n || o();
  }), t.dispose);
}
var Oe = Math.min, J = Math.max, Ke = Math.round, Ue = Math.floor, $ = (e) => ({ x: e, y: e }), Wn = { left: "right", right: "left", bottom: "top", top: "bottom" }, $n = { start: "end", end: "start" };
function Bt(e, o, t) {
  return J(e, Oe(o, t));
}
function ft(e, o) {
  return typeof e == "function" ? e(o) : e;
}
function be(e) {
  return e.split("-")[0];
}
function dt(e) {
  return e.split("-")[1];
}
function Nt(e) {
  return e === "x" ? "y" : "x";
}
function Ft(e) {
  return e === "y" ? "height" : "width";
}
var _n = /* @__PURE__ */ new Set(["top", "bottom"]);
function se(e) {
  return _n.has(be(e)) ? "y" : "x";
}
function qt(e) {
  return Nt(se(e));
}
function Vo(e, o, t) {
  t === void 0 && (t = false);
  let n = dt(e), r = qt(e), i = Ft(r), s = r === "x" ? n === (t ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return o.reference[i] > o.floating[i] && (s = _e(s)), [s, _e(s)];
}
function Wo(e) {
  let o = _e(e);
  return [ct(e), o, ct(o)];
}
function ct(e) {
  return e.replace(/start|end/g, (o) => $n[o]);
}
var Fo = ["left", "right"], qo = ["right", "left"], Kn = ["top", "bottom"], Un = ["bottom", "top"];
function jn(e, o, t) {
  switch (e) {
    case "top":
    case "bottom":
      return t ? o ? qo : Fo : o ? Fo : qo;
    case "left":
    case "right":
      return o ? Kn : Un;
    default:
      return [];
  }
}
function $o(e, o, t, n) {
  let r = dt(e), i = jn(be(e), t === "start", n);
  return r && (i = i.map((s) => s + "-" + r), o && (i = i.concat(i.map(ct)))), i;
}
function _e(e) {
  return e.replace(/left|right|bottom|top/g, (o) => Wn[o]);
}
function zn(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function _o(e) {
  return typeof e != "number" ? zn(e) : { top: e, right: e, bottom: e, left: e };
}
function ve(e) {
  let { x: o, y: t, width: n, height: r } = e;
  return { width: n, height: r, top: t, left: o, right: o + n, bottom: t + r, x: o, y: t };
}
function Ko(e, o, t) {
  let { reference: n, floating: r } = e, i = se(o), s = qt(o), a = Ft(s), l = be(o), u = i === "y", p = n.x + n.width / 2 - r.width / 2, g = n.y + n.height / 2 - r.height / 2, c = n[a] / 2 - r[a] / 2, b;
  switch (l) {
    case "top":
      b = { x: p, y: n.y - r.height };
      break;
    case "bottom":
      b = { x: p, y: n.y + n.height };
      break;
    case "right":
      b = { x: n.x + n.width, y: g };
      break;
    case "left":
      b = { x: n.x - r.width, y: g };
      break;
    default:
      b = { x: n.x, y: n.y };
  }
  switch (dt(o)) {
    case "start":
      b[s] -= c * (t && u ? -1 : 1);
      break;
    case "end":
      b[s] += c * (t && u ? -1 : 1);
      break;
  }
  return b;
}
var Uo = async (e, o, t) => {
  let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: s } = t, a = i.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(o)), u = await s.getElementRects({ reference: e, floating: o, strategy: r }), { x: p, y: g } = Ko(u, n, l), c = n, b = {}, d3 = 0;
  for (let m3 = 0; m3 < a.length; m3++) {
    let { name: h, fn: w } = a[m3], { x: y3, y: v, data: A, reset: E } = await w({ x: p, y: g, initialPlacement: n, placement: c, strategy: r, middlewareData: b, rects: u, platform: s, elements: { reference: e, floating: o } });
    p = y3 ?? p, g = v ?? g, b = { ...b, [h]: { ...b[h], ...A } }, E && d3 <= 50 && (d3++, typeof E == "object" && (E.placement && (c = E.placement), E.rects && (u = E.rects === true ? await s.getElementRects({ reference: e, floating: o, strategy: r }) : E.rects), { x: p, y: g } = Ko(u, c, l)), m3 = -1);
  }
  return { x: p, y: g, placement: c, strategy: r, middlewareData: b };
};
async function Vt(e, o) {
  var t;
  o === void 0 && (o = {});
  let { x: n, y: r, platform: i, rects: s, elements: a, strategy: l } = e, { boundary: u = "clippingAncestors", rootBoundary: p = "viewport", elementContext: g = "floating", altBoundary: c = false, padding: b = 0 } = ft(o, e), d3 = _o(b), h = a[c ? g === "floating" ? "reference" : "floating" : g], w = ve(await i.getClippingRect({ element: (t = await (i.isElement == null ? void 0 : i.isElement(h))) == null || t ? h : h.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)), boundary: u, rootBoundary: p, strategy: l })), y3 = g === "floating" ? { x: n, y: r, width: s.floating.width, height: s.floating.height } : s.reference, v = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), A = await (i.isElement == null ? void 0 : i.isElement(v)) ? await (i.getScale == null ? void 0 : i.getScale(v)) || { x: 1, y: 1 } : { x: 1, y: 1 }, E = ve(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: y3, offsetParent: v, strategy: l }) : y3);
  return { top: (w.top - E.top + d3.top) / A.y, bottom: (E.bottom - w.bottom + d3.bottom) / A.y, left: (w.left - E.left + d3.left) / A.x, right: (E.right - w.right + d3.right) / A.x };
}
var jo = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(o) {
    var t, n;
    let { placement: r, middlewareData: i, rects: s, initialPlacement: a, platform: l, elements: u } = o, { mainAxis: p = true, crossAxis: g = true, fallbackPlacements: c, fallbackStrategy: b = "bestFit", fallbackAxisSideDirection: d3 = "none", flipAlignment: m3 = true, ...h } = ft(e, o);
    if ((t = i.arrow) != null && t.alignmentOffset) return {};
    let w = be(r), y3 = se(a), v = be(a) === a, A = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), E = c || (v || !m3 ? [_e(a)] : Wo(a)), S = d3 !== "none";
    !c && S && E.push(...$o(a, m3, d3, A));
    let H = [a, ...E], ce = await Vt(o, h), D2 = [], ne = ((n = i.flip) == null ? void 0 : n.overflows) || [];
    if (p && D2.push(ce[w]), g) {
      let fe = Vo(r, s, A);
      D2.push(ce[fe[0]], ce[fe[1]]);
    }
    if (ne = [...ne, { placement: r, overflows: D2 }], !D2.every((fe) => fe <= 0)) {
      var vo, wo;
      let fe = (((vo = i.flip) == null ? void 0 : vo.index) || 0) + 1, kt = H[fe];
      if (kt && (!(g === "alignment" ? y3 !== se(kt) : false) || ne.every((W) => se(W.placement) === y3 ? W.overflows[0] > 0 : true))) return { data: { index: fe, overflows: ne }, reset: { placement: kt } };
      let qe = (wo = ne.filter((de) => de.overflows[0] <= 0).sort((de, W) => de.overflows[1] - W.overflows[1])[0]) == null ? void 0 : wo.placement;
      if (!qe) switch (b) {
        case "bestFit": {
          var yo;
          let de = (yo = ne.filter((W) => {
            if (S) {
              let re = se(W.placement);
              return re === y3 || re === "y";
            }
            return true;
          }).map((W) => [W.placement, W.overflows.filter((re) => re > 0).reduce((re, xn) => re + xn, 0)]).sort((W, re) => W[1] - re[1])[0]) == null ? void 0 : yo[0];
          de && (qe = de);
          break;
        }
        case "initialPlacement":
          qe = a;
          break;
      }
      if (r !== qe) return { reset: { placement: qe } };
    }
    return {};
  } };
};
var zo = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(o) {
    let { x: t, y: n, placement: r } = o, { mainAxis: i = true, crossAxis: s = false, limiter: a = { fn: (h) => {
      let { x: w, y: y3 } = h;
      return { x: w, y: y3 };
    } }, ...l } = ft(e, o), u = { x: t, y: n }, p = await Vt(o, l), g = se(be(r)), c = Nt(g), b = u[c], d3 = u[g];
    if (i) {
      let h = c === "y" ? "top" : "left", w = c === "y" ? "bottom" : "right", y3 = b + p[h], v = b - p[w];
      b = Bt(y3, b, v);
    }
    if (s) {
      let h = g === "y" ? "top" : "left", w = g === "y" ? "bottom" : "right", y3 = d3 + p[h], v = d3 - p[w];
      d3 = Bt(y3, d3, v);
    }
    let m3 = a.fn({ ...o, [c]: b, [g]: d3 });
    return { ...m3, data: { x: m3.x - t, y: m3.y - n, enabled: { [c]: i, [g]: s } } };
  } };
};
function pt() {
  return typeof window < "u";
}
function we(e) {
  return Yo(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function R(e) {
  var o;
  return (e == null || (o = e.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function _(e) {
  var o;
  return (o = (Yo(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : o.documentElement;
}
function Yo(e) {
  return pt() ? e instanceof Node || e instanceof R(e).Node : false;
}
function q(e) {
  return pt() ? e instanceof Element || e instanceof R(e).Element : false;
}
function K(e) {
  return pt() ? e instanceof HTMLElement || e instanceof R(e).HTMLElement : false;
}
function Go(e) {
  return !pt() || typeof ShadowRoot > "u" ? false : e instanceof ShadowRoot || e instanceof R(e).ShadowRoot;
}
var Gn = /* @__PURE__ */ new Set(["inline", "contents"]);
function Ce(e) {
  let { overflow: o, overflowX: t, overflowY: n, display: r } = V(e);
  return /auto|scroll|overlay|hidden|clip/.test(o + n + t) && !Gn.has(r);
}
var Yn = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Qo(e) {
  return Yn.has(we(e));
}
var Qn = [":popover-open", ":modal"];
function je(e) {
  return Qn.some((o) => {
    try {
      return e.matches(o);
    } catch {
      return false;
    }
  });
}
var Xn = ["transform", "translate", "scale", "rotate", "perspective"], Jn = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Zn = ["paint", "layout", "strict", "content"];
function mt(e) {
  let o = ht(), t = q(e) ? V(e) : e;
  return Xn.some((n) => t[n] ? t[n] !== "none" : false) || (t.containerType ? t.containerType !== "normal" : false) || !o && (t.backdropFilter ? t.backdropFilter !== "none" : false) || !o && (t.filter ? t.filter !== "none" : false) || Jn.some((n) => (t.willChange || "").includes(n)) || Zn.some((n) => (t.contain || "").includes(n));
}
function Xo(e) {
  let o = Z(e);
  for (; K(o) && !ye(o); ) {
    if (mt(o)) return o;
    if (je(o)) return null;
    o = Z(o);
  }
  return null;
}
function ht() {
  return typeof CSS > "u" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter", "none");
}
var er = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ye(e) {
  return er.has(we(e));
}
function V(e) {
  return R(e).getComputedStyle(e);
}
function ze(e) {
  return q(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Z(e) {
  if (we(e) === "html") return e;
  let o = e.assignedSlot || e.parentNode || Go(e) && e.host || _(e);
  return Go(o) ? o.host : o;
}
function Jo(e) {
  let o = Z(e);
  return ye(o) ? e.ownerDocument ? e.ownerDocument.body : e.body : K(o) && Ce(o) ? o : Jo(o);
}
function De(e, o, t) {
  var n;
  o === void 0 && (o = []), t === void 0 && (t = true);
  let r = Jo(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), s = R(r);
  if (i) {
    let a = gt(s);
    return o.concat(s, s.visualViewport || [], Ce(r) ? r : [], a && t ? De(a) : []);
  }
  return o.concat(r, De(r, [], t));
}
function gt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function tn(e) {
  let o = V(e), t = parseFloat(o.width) || 0, n = parseFloat(o.height) || 0, r = K(e), i = r ? e.offsetWidth : t, s = r ? e.offsetHeight : n, a = Ke(t) !== i || Ke(n) !== s;
  return a && (t = i, n = s), { width: t, height: n, $: a };
}
function $t(e) {
  return q(e) ? e : e.contextElement;
}
function Me(e) {
  let o = $t(e);
  if (!K(o)) return $(1);
  let t = o.getBoundingClientRect(), { width: n, height: r, $: i } = tn(o), s = (i ? Ke(t.width) : t.width) / n, a = (i ? Ke(t.height) : t.height) / r;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: s, y: a };
}
var tr = $(0);
function on(e) {
  let o = R(e);
  return !ht() || !o.visualViewport ? tr : { x: o.visualViewport.offsetLeft, y: o.visualViewport.offsetTop };
}
function or(e, o, t) {
  return o === void 0 && (o = false), !t || o && t !== R(e) ? false : o;
}
function Ee(e, o, t, n) {
  o === void 0 && (o = false), t === void 0 && (t = false);
  let r = e.getBoundingClientRect(), i = $t(e), s = $(1);
  o && (n ? q(n) && (s = Me(n)) : s = Me(e));
  let a = or(i, t, n) ? on(i) : $(0), l = (r.left + a.x) / s.x, u = (r.top + a.y) / s.y, p = r.width / s.x, g = r.height / s.y;
  if (i) {
    let c = R(i), b = n && q(n) ? R(n) : n, d3 = c, m3 = gt(d3);
    for (; m3 && n && b !== d3; ) {
      let h = Me(m3), w = m3.getBoundingClientRect(), y3 = V(m3), v = w.left + (m3.clientLeft + parseFloat(y3.paddingLeft)) * h.x, A = w.top + (m3.clientTop + parseFloat(y3.paddingTop)) * h.y;
      l *= h.x, u *= h.y, p *= h.x, g *= h.y, l += v, u += A, d3 = R(m3), m3 = gt(d3);
    }
  }
  return ve({ width: p, height: g, x: l, y: u });
}
function _t(e, o) {
  let t = ze(e).scrollLeft;
  return o ? o.left + t : Ee(_(e)).left + t;
}
function nn(e, o, t) {
  t === void 0 && (t = false);
  let n = e.getBoundingClientRect(), r = n.left + o.scrollLeft - (t ? 0 : _t(e, n)), i = n.top + o.scrollTop;
  return { x: r, y: i };
}
function nr(e) {
  let { elements: o, rect: t, offsetParent: n, strategy: r } = e, i = r === "fixed", s = _(n), a = o ? je(o.floating) : false;
  if (n === s || a && i) return t;
  let l = { scrollLeft: 0, scrollTop: 0 }, u = $(1), p = $(0), g = K(n);
  if ((g || !g && !i) && ((we(n) !== "body" || Ce(s)) && (l = ze(n)), K(n))) {
    let b = Ee(n);
    u = Me(n), p.x = b.x + n.clientLeft, p.y = b.y + n.clientTop;
  }
  let c = s && !g && !i ? nn(s, l, true) : $(0);
  return { width: t.width * u.x, height: t.height * u.y, x: t.x * u.x - l.scrollLeft * u.x + p.x + c.x, y: t.y * u.y - l.scrollTop * u.y + p.y + c.y };
}
function rr(e) {
  return Array.from(e.getClientRects());
}
function ir(e) {
  let o = _(e), t = ze(e), n = e.ownerDocument.body, r = J(o.scrollWidth, o.clientWidth, n.scrollWidth, n.clientWidth), i = J(o.scrollHeight, o.clientHeight, n.scrollHeight, n.clientHeight), s = -t.scrollLeft + _t(e), a = -t.scrollTop;
  return V(n).direction === "rtl" && (s += J(o.clientWidth, n.clientWidth) - r), { width: r, height: i, x: s, y: a };
}
function sr(e, o) {
  let t = R(e), n = _(e), r = t.visualViewport, i = n.clientWidth, s = n.clientHeight, a = 0, l = 0;
  if (r) {
    i = r.width, s = r.height;
    let u = ht();
    (!u || u && o === "fixed") && (a = r.offsetLeft, l = r.offsetTop);
  }
  return { width: i, height: s, x: a, y: l };
}
var lr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ar(e, o) {
  let t = Ee(e, true, o === "fixed"), n = t.top + e.clientTop, r = t.left + e.clientLeft, i = K(e) ? Me(e) : $(1), s = e.clientWidth * i.x, a = e.clientHeight * i.y, l = r * i.x, u = n * i.y;
  return { width: s, height: a, x: l, y: u };
}
function Zo(e, o, t) {
  let n;
  if (o === "viewport") n = sr(e, t);
  else if (o === "document") n = ir(_(e));
  else if (q(o)) n = ar(o, t);
  else {
    let r = on(e);
    n = { x: o.x - r.x, y: o.y - r.y, width: o.width, height: o.height };
  }
  return ve(n);
}
function rn(e, o) {
  let t = Z(e);
  return t === o || !q(t) || ye(t) ? false : V(t).position === "fixed" || rn(t, o);
}
function ur(e, o) {
  let t = o.get(e);
  if (t) return t;
  let n = De(e, [], false).filter((a) => q(a) && we(a) !== "body"), r = null, i = V(e).position === "fixed", s = i ? Z(e) : e;
  for (; q(s) && !ye(s); ) {
    let a = V(s), l = mt(s);
    !l && a.position === "fixed" && (r = null), (i ? !l && !r : !l && a.position === "static" && !!r && lr.has(r.position) || Ce(s) && !l && rn(e, s)) ? n = n.filter((p) => p !== s) : r = a, s = Z(s);
  }
  return o.set(e, n), n;
}
function cr(e) {
  let { element: o, boundary: t, rootBoundary: n, strategy: r } = e, s = [...t === "clippingAncestors" ? je(o) ? [] : ur(o, this._c) : [].concat(t), n], a = s[0], l = s.reduce((u, p) => {
    let g = Zo(o, p, r);
    return u.top = J(g.top, u.top), u.right = Oe(g.right, u.right), u.bottom = Oe(g.bottom, u.bottom), u.left = J(g.left, u.left), u;
  }, Zo(o, a, r));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}
function fr(e) {
  let { width: o, height: t } = tn(e);
  return { width: o, height: t };
}
function dr(e, o, t) {
  let n = K(o), r = _(o), i = t === "fixed", s = Ee(e, true, i, o), a = { scrollLeft: 0, scrollTop: 0 }, l = $(0);
  function u() {
    l.x = _t(r);
  }
  if (n || !n && !i) if ((we(o) !== "body" || Ce(r)) && (a = ze(o)), n) {
    let b = Ee(o, true, i, o);
    l.x = b.x + o.clientLeft, l.y = b.y + o.clientTop;
  } else r && u();
  i && !n && r && u();
  let p = r && !n && !i ? nn(r, a) : $(0), g = s.left + a.scrollLeft - l.x - p.x, c = s.top + a.scrollTop - l.y - p.y;
  return { x: g, y: c, width: s.width, height: s.height };
}
function Wt(e) {
  return V(e).position === "static";
}
function en(e, o) {
  if (!K(e) || V(e).position === "fixed") return null;
  if (o) return o(e);
  let t = e.offsetParent;
  return _(e) === t && (t = t.ownerDocument.body), t;
}
function sn(e, o) {
  let t = R(e);
  if (je(e)) return t;
  if (!K(e)) {
    let r = Z(e);
    for (; r && !ye(r); ) {
      if (q(r) && !Wt(r)) return r;
      r = Z(r);
    }
    return t;
  }
  let n = en(e, o);
  for (; n && Qo(n) && Wt(n); ) n = en(n, o);
  return n && ye(n) && Wt(n) && !mt(n) ? t : n || Xo(e) || t;
}
var pr = async function(e) {
  let o = this.getOffsetParent || sn, t = this.getDimensions, n = await t(e.floating);
  return { reference: dr(e.reference, await o(e.floating), e.strategy), floating: { x: 0, y: 0, width: n.width, height: n.height } };
};
function mr(e) {
  return V(e).direction === "rtl";
}
var Kt = { convertOffsetParentRelativeRectToViewportRelativeRect: nr, getDocumentElement: _, getClippingRect: cr, getOffsetParent: sn, getElementRects: pr, getClientRects: rr, getDimensions: fr, getScale: Me, isElement: q, isRTL: mr };
function ln(e, o) {
  return e.x === o.x && e.y === o.y && e.width === o.width && e.height === o.height;
}
function hr(e, o) {
  let t = null, n, r = _(e);
  function i() {
    var a;
    clearTimeout(n), (a = t) == null || a.disconnect(), t = null;
  }
  function s(a, l) {
    a === void 0 && (a = false), l === void 0 && (l = 1), i();
    let u = e.getBoundingClientRect(), { left: p, top: g, width: c, height: b } = u;
    if (a || o(), !c || !b) return;
    let d3 = Ue(g), m3 = Ue(r.clientWidth - (p + c)), h = Ue(r.clientHeight - (g + b)), w = Ue(p), v = { rootMargin: -d3 + "px " + -m3 + "px " + -h + "px " + -w + "px", threshold: J(0, Oe(1, l)) || 1 }, A = true;
    function E(S) {
      let H = S[0].intersectionRatio;
      if (H !== l) {
        if (!A) return s();
        H ? s(false, H) : n = setTimeout(() => {
          s(false, 1e-7);
        }, 1e3);
      }
      H === 1 && !ln(u, e.getBoundingClientRect()) && s(), A = false;
    }
    try {
      t = new IntersectionObserver(E, { ...v, root: r.ownerDocument });
    } catch {
      t = new IntersectionObserver(E, v);
    }
    t.observe(e);
  }
  return s(true), i;
}
function an(e, o, t, n) {
  n === void 0 && (n = {});
  let { ancestorScroll: r = true, ancestorResize: i = true, elementResize: s = typeof ResizeObserver == "function", layoutShift: a = typeof IntersectionObserver == "function", animationFrame: l = false } = n, u = $t(e), p = r || i ? [...u ? De(u) : [], ...De(o)] : [];
  p.forEach((w) => {
    r && w.addEventListener("scroll", t, { passive: true }), i && w.addEventListener("resize", t);
  });
  let g = u && a ? hr(u, t) : null, c = -1, b = null;
  s && (b = new ResizeObserver((w) => {
    let [y3] = w;
    y3 && y3.target === u && b && (b.unobserve(o), cancelAnimationFrame(c), c = requestAnimationFrame(() => {
      var v;
      (v = b) == null || v.observe(o);
    })), t();
  }), u && !l && b.observe(u), b.observe(o));
  let d3, m3 = l ? Ee(e) : null;
  l && h();
  function h() {
    let w = Ee(e);
    m3 && !ln(m3, w) && t(), m3 = w, d3 = requestAnimationFrame(h);
  }
  return t(), () => {
    var w;
    p.forEach((y3) => {
      r && y3.removeEventListener("scroll", t), i && y3.removeEventListener("resize", t);
    }), g == null ? void 0 : g(), (w = b) == null || w.disconnect(), b = null, l && cancelAnimationFrame(d3);
  };
}
var un = zo, cn = jo;
var fn2 = (e, o, t) => {
  let n = /* @__PURE__ */ new Map(), r = { platform: Kt, ...t }, i = { ...r.platform, _c: n };
  return Uo(e, o, { ...r, platform: i });
};
function pn(e, o) {
  let t = () => {
  };
  return function(r) {
    if (t(), !r) {
      e.style.removeProperty("position");
      return;
    }
    let i = o();
    if (!i || !e.hasAttribute("anchor")) return;
    let s = e.getAttribute("anchor"), a = e.getAttribute("anchor-strategy") || "absolute";
    a !== "absolute" && a !== "fixed" && (void 0, a = "absolute"), t = an(i, e, () => {
      let l = dn(window.getComputedStyle(e).getPropertyValue("--anchor-gap"), e), u = dn(window.getComputedStyle(e).getPropertyValue("--anchor-offset"), e), p = s.split(" ")[0], g = {};
      switch (p) {
        case "top":
        case "bottom":
          g = { top: l, left: -1 * u, right: u, bottom: l };
          break;
        case "left":
        case "right":
          g = { top: -1 * u, bottom: u, left: l, right: l };
          break;
      }
      fn2(i, e, { strategy: a, placement: s.replace(" ", "-"), middleware: [cn({ padding: g }), un({ padding: g })] }).then(async ({ x: c, y: b, placement: d3 }) => {
        var _a;
        if (!gr() && a === "absolute") {
          let w = null;
          for (let y3 = e.parentElement; y3; y3 = y3.parentElement) {
            let v = getComputedStyle(y3).position;
            if (v === "relative" || v === "absolute" || v === "fixed" || v === "sticky") {
              w = y3;
              break;
            }
          }
          if (w) {
            let y3 = w.getBoundingClientRect();
            c -= y3.left + window.scrollX, b -= y3.top + window.scrollY;
          }
        }
        let m3 = `${c}px`, h = `${b}px`;
        switch (d3.split("-")[0]) {
          case "top":
            h = `calc(${b}px - var(--anchor-gap, 0px))`, m3 = `calc(${c}px + var(--anchor-offset, 0px))`;
            break;
          case "right":
            m3 = `calc(${c}px + var(--anchor-gap, 0px))`, h = `calc(${b}px + var(--anchor-offset, 0px))`;
            break;
          case "bottom":
            h = `calc(${b}px + var(--anchor-gap, 0px))`, m3 = `calc(${c}px + var(--anchor-offset, 0px))`;
            break;
          case "left":
            m3 = `calc(${c}px - var(--anchor-gap, 0px))`, h = `calc(${b}px + var(--anchor-offset, 0px))`;
            break;
        }
        Object.assign(e.style, { left: m3, top: h, position: a }), await ((_a = Kt.isRTL) == null ? void 0 : _a.call(Kt, e)) && Object.assign(e.style, { right: "unset", bottom: "unset" });
      });
    });
  };
}
function gr() {
  return "showPopover" in HTMLElement.prototype && HTMLElement.prototype.showPopover.toString().includes("[native code]");
}
function dn(e, o) {
  let t = document.createElement("div");
  o.appendChild(t), t.style.setProperty("margin-top", "0px", "important"), t.style.setProperty("margin-top", e, "important");
  let n = parseFloat(window.getComputedStyle(t).marginTop) || 0;
  return o.removeChild(t), n;
}
function Ge(e) {
  return Ut(e) && "tabIndex" in e;
}
function Ut(e) {
  return br(e) && "tagName" in e;
}
function jt(e) {
  return Ut(e) && "accessKey" in e;
}
function br(e) {
  return typeof e != "object" || e === null ? false : "nodeType" in e;
}
function mn(e) {
  return Ut(e) && "style" in e;
}
function hn(e) {
  return jt(e) && e.nodeName === "INPUT";
}
function B(e) {
  let o = e.getBoundingClientRect();
  return !(!(o.x !== 0 || o.y !== 0 || o.width !== 0 || o.height !== 0) || (e.ownerDocument.defaultView || window).getComputedStyle(e).visibility === "hidden");
}
var gn = { get selectRequired() {
  let e = document.createElement("select");
  e.setAttribute("required", "true");
  let o = e.validationMessage;
  return Object.defineProperty(this, "selectRequired", { value: o }), o;
} };
function le(e, o, t) {
  function n() {
    if (!B(e)) {
      for (let r of e.children) if (B(r)) return;
      t();
    }
  }
  if (typeof ResizeObserver < "u") {
    let r = new ResizeObserver(n);
    r.observe(e), o.addEventListener("abort", () => r.disconnect());
  }
  if (typeof IntersectionObserver < "u") {
    let r = new IntersectionObserver(n);
    r.observe(e), o.addEventListener("abort", () => r.disconnect());
  }
}
var Ye = false, zt = false;
typeof navigator < "u" && (Ye = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), zt = navigator.userAgent.toLowerCase().includes("firefox"));
var Gt = false;
function He(e, o, t, n, r, i) {
  wr(e.ownerDocument);
  let s = Pe(e), a = pn(e, t), l = X();
  e.setAttribute("popover", "");
  let u = o();
  u && (u.setAttribute("type", "button"), u.setAttribute("aria-haspopup", "true"), u.setAttribute("aria-controls", e.id), u.setAttribute("aria-expanded", "false"), u.id && e.setAttribute("aria-labelledby", u.id)), e.hasAttribute("open") && queueMicrotask(() => e.showPopover()), e.addEventListener("beforetoggle", (g) => {
    let c = g;
    a(c.newState === "open");
    let b = e.hasAttribute("open");
    c.newState === "open" && !b ? e.setAttributeNoCallbacks("open", "") : c.newState === "closed" && b && e.removeAttributeNoCallbacks("open"), c.newState === "open" ? (u == null ? void 0 : u.setAttribute("aria-expanded", "true"), r == null ? void 0 : r(), Gt = e.getAttribute("popover") === "") : (u == null ? void 0 : u.setAttribute("aria-expanded", "false"), i == null ? void 0 : i(), Gt = false), c.oldState === "closed" && c.newState === "open" ? (Ye && (l.dispose(), l = X()), s.start("in")) : c.oldState === "open" && c.newState === "closed" && (Ye && l.style(e, "transition-property", "none"), s.start("out"));
  }, { signal: n });
  function p() {
    e.hasAttribute("open") && e.hidePopover();
  }
  le(e, n, p), u && le(u, n, p), n.addEventListener("abort", () => s.abort());
}
var bn = /* @__PURE__ */ new WeakSet();
function wr(e) {
  if (bn.has(e)) return;
  bn.add(e);
  let o = null;
  e.addEventListener("mousedown", () => {
    zt || Ye || !Gt || (e.body.setAttribute("tabindex", "-1"), o && clearTimeout(o), o = setTimeout(() => e.body.removeAttribute("tabindex")));
  }, { capture: true });
}
function U(e, o, t, n) {
  function r() {
    let a = e.getBoundingClientRect();
    n.style.setProperty(o, a.width + "px");
  }
  let i = e.ownerDocument, s = new ResizeObserver(r);
  s.observe(e), i.addEventListener("transitionend", r, { signal: t }), t.addEventListener("abort", () => s.disconnect());
}
var yr = 0;
function k(e) {
  return `${e}-${yr++}`;
}
var Er = 200;
function ae(e, o, t, n) {
  Ar(), e.addEventListener(o, (r) => {
    Yt !== null && Date.now() - Yt < Er || n(r);
  }, { passive: true, signal: t });
}
var Yt = null, wn = false;
function Ar() {
  wn || (wn = true, document.addEventListener("keydown", () => {
    Yt = Date.now();
  }, { capture: true }));
}
var bt = class extends Map {
  constructor(t) {
    super();
    this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t, this), this.set(t, n)), n;
  }
};
var yn = new bt(() => ({ referenceCounter: 0, d: X() }));
function vt(e) {
  let o = yn.get(e);
  if (o.referenceCounter++, o.referenceCounter === 1) {
    let n = [Lr(), Tr(), xr()];
    n.forEach(({ before: r }) => r({ doc: e, d: o.d })), n.forEach(({ after: r }) => r({ doc: e, d: o.d }));
  }
  let t = false;
  return () => {
    t || (t = true, o.referenceCounter--, !(o.referenceCounter > 0) && (o.d.dispose(), yn.delete(e)));
  };
}
function xr() {
  return { before({ doc: e, d: o }) {
    o.style(e.documentElement, "overflow", "hidden");
  }, after() {
  } };
}
function Tr() {
  let e;
  return { before({ doc: o }) {
    let t = o.documentElement, n = o.defaultView ?? window;
    e = Math.max(0, n.innerWidth - t.clientWidth), t.style.setProperty("--el-top-layer-scrollbar-offset", "0px");
  }, after({ doc: o, d: t }) {
    let n = o.documentElement, r = Math.max(0, n.clientWidth - n.offsetWidth), i = Math.max(0, e - r);
    t.style(n, "paddingRight", `${i}px`), t.add(() => {
      n.style.setProperty("--el-top-layer-scrollbar-offset", `-${i}px`);
    });
  } };
}
function Sr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Lr() {
  return Sr() ? { before({ doc: e, d: o }) {
    function t(n) {
      return !!n.closest("[popover], dialog > *");
    }
    o.microTask(() => {
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let i = X();
        i.style(e.documentElement, "scrollBehavior", "auto"), o.add(() => o.microTask(() => i.dispose()));
      }
      let n = window.scrollY ?? window.pageYOffset, r = null;
      o.addEventListener(e, "click", (i) => {
        if (Ge(i.target)) try {
          let s = i.target.closest("a");
          if (!s) return;
          let { hash: a } = new URL(s.href), l = e.querySelector(a);
          Ge(l) && !t(l) && (r = l);
        } catch {
        }
      }, true), o.addEventListener(e, "touchstart", (i) => {
        if (Ge(i.target) && mn(i.target)) if (t(i.target)) {
          let s = i.target;
          for (; s.parentElement && t(s.parentElement); ) s = s.parentElement;
          o.style(s, "overscrollBehavior", "contain");
        } else o.style(i.target, "touchAction", "none");
      }), o.addEventListener(e, "touchmove", (i) => {
        if (Ge(i.target)) {
          if (hn(i.target)) return;
          if (t(i.target)) {
            let s = i.target;
            for (; s.parentElement && s.dataset.tailwindplusPortal !== "" && !(s.scrollHeight > s.clientHeight || s.scrollWidth > s.clientWidth); ) s = s.parentElement;
            s.dataset.tailwindplusPortal === "" && i.preventDefault();
          } else i.preventDefault();
        }
      }, { passive: false }), o.add(() => {
        let i = window.scrollY ?? window.pageYOffset;
        n !== i && window.scrollTo(0, n), r && r.isConnected && (r.scrollIntoView({ block: "nearest" }), r = null);
      });
    });
  }, after() {
  } } : { before() {
  }, after() {
  } };
}
function wt(e, o) {
  let t = null;
  e.addEventListener("toggle", (n) => {
    n.newState === "open" ? t || (t = vt(e.ownerDocument)) : t && (t(), t = null);
  }, { signal: o }), o.addEventListener("abort", () => {
    t && (t(), t = null);
  });
}
var ue = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
function G(e, o, t) {
  let n = o ? e.indexOf(o) : null;
  switch (n === -1 && (n = null), t) {
    case 0: {
      for (let r = 0; r < e.length; r++) if (B(e[r])) return e[r];
      return null;
    }
    case 1: {
      for (let r = e.length - 1; r >= 0; r--) if (B(e[r])) return e[r];
      return null;
    }
    case 2: {
      if (n === null) return G(e, o, 1);
      for (let r = n - 1; r >= 0; r--) if (B(e[r])) return e[r];
      return null;
    }
    case 3: {
      if (n === null) return G(e, o, 0);
      for (let r = n + 1; r < e.length; r++) if (B(e[r])) return e[r];
      return null;
    }
    case 4:
      return null;
  }
}
var En = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function yt(e) {
  let o = e.innerText ?? "", t = e.cloneNode(true);
  if (!jt(t)) return o;
  let n = false;
  for (let i of t.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) i.remove(), n = true;
  let r = n ? t.innerText ?? "" : o;
  return En.test(r) && (r = r.replace(En, "")), r;
}
function An(e) {
  let o = e.getAttribute("aria-label");
  if (typeof o == "string") return o.trim();
  let t = e.getAttribute("aria-labelledby");
  if (t) {
    let n = t.split(" ").map((r) => {
      let i = document.getElementById(r);
      if (i) {
        let s = i.getAttribute("aria-label");
        return typeof s == "string" ? s.trim() : yt(i).trim();
      }
      return null;
    }).filter(Boolean);
    if (n.length > 0) return n.join(", ");
  }
  return yt(e).trim();
}
var N, Qe, Qt = class extends x {
  constructor() {
    super(...arguments);
    L(this, N, []);
    L(this, Qe, null);
  }
  mount(t) {
    let n = this.getInput(), r = this.getButton(), i = this.getOptions();
    n.id || (n.id = k("autocomplete-input")), r && (r.id || (r.id = k("autocomplete-button"))), i.id || (i.id = k("autocomplete-listbox")), He(i, () => this.getButton(), () => this.getInput(), t, () => this.onBeforeOpen(), () => this.onBeforeClose()), wt(i, t), n.setAttribute("role", "combobox"), n.setAttribute("aria-autocomplete", "list"), n.setAttribute("aria-expanded", "false"), n.setAttribute("aria-controls", i.id), n.setAttribute("aria-activedescendant", ""), n.setAttribute("autocomplete", "off"), r && (r.setAttribute("type", "button"), r.setAttribute("tabindex", "-1"), r.setAttribute("aria-expanded", "false"), r.setAttribute("aria-haspopup", "listbox"), r.setAttribute("popovertarget", i.id)), i.setAttribute("role", "listbox"), i.setAttribute("popover", "manual");
    let s = { passive: true, signal: t }, a = this;
    function l() {
      for (let c of i.getItems()) c.getAttribute("role") !== "option" && (c.id || (c.id = k("option")), c.setAttribute("role", "option"), c.setAttribute("aria-selected", "false"), c.setAttribute("tabIndex", "-1"), c.addEventListener("click", () => a.selectOption(c), s), ae(c, "mouseover", t, () => a.setActiveItem(c, false)), ae(c, "mouseout", t, () => a.clearActiveItem()));
      a.filterOptions();
    }
    l();
    let u = new MutationObserver(l);
    u.observe(this, { attributes: false, childList: true, subtree: true }), r && U(r, "--button-width", t, this), U(n, "--input-width", t, this), n.addEventListener("input", () => {
      n.matches(":disabled") || (this.filterOptions(), f(this, N).length > 0 ? i.hasAttribute("open") || i.showPopover() : i.hidePopover());
    }, { signal: t });
    let p = () => {
      n.matches(":disabled") || (n.focus(), i.hasAttribute("open") ? i.hidePopover() : (this.filterOptions(), f(this, N).length > 0 && i.showPopover()));
    };
    n.addEventListener("pointerdown", p, { signal: t }), r && (r.addEventListener("pointerdown", (c) => {
      c.preventDefault(), p();
    }, { signal: t }), r.addEventListener("click", (c) => {
      c.preventDefault(), c.stopImmediatePropagation();
    }, { signal: t })), n.addEventListener("blur", ({ relatedTarget: c }) => {
      c && this.contains(c) || i.hidePopover();
    }, { signal: t }), n.addEventListener("keydown", (c) => {
      if (!n.matches(":disabled")) switch (c.key) {
        case "ArrowDown": {
          c.preventDefault(), i.hasAttribute("open") || (f(this, N).length === 0 && this.filterOptions(), f(this, N).length > 0 && i.showPopover()), this.goToItem(3);
          break;
        }
        case "ArrowUp": {
          c.preventDefault(), i.hasAttribute("open") || (f(this, N).length === 0 && this.filterOptions(), f(this, N).length > 0 && i.showPopover()), this.goToItem(2);
          break;
        }
        case "Home":
        case "PageUp":
          return i.hasAttribute("open") ? (c.preventDefault(), c.stopPropagation(), this.goToItem(0)) : void 0;
        case "End":
        case "PageDown":
          return i.hasAttribute("open") ? (c.preventDefault(), c.stopPropagation(), this.goToItem(1)) : void 0;
        case "Enter": {
          let b = this.getActiveItem();
          b && (c.preventDefault(), this.selectOption(b)), i.hasAttribute("open") && (c.preventDefault(), i.hidePopover());
          break;
        }
        case "Escape": {
          if (!i.hasAttribute("open")) return;
          c.preventDefault(), i.hidePopover();
          break;
        }
        case "Tab": {
          i.hidePopover();
          break;
        }
      }
    }, { signal: t });
    let g = Array.from(i.querySelectorAll("el-option[disabled]"));
    for (let c of g) c.setAttribute("aria-disabled", "true"), c.setAttribute("aria-selected", "false");
    t.addEventListener("abort", () => {
      u.disconnect();
    });
  }
  getInput() {
    let t = this.querySelector("input");
    if (!t) throw new Error("`<el-autocomplete>` must contain an input element.");
    return t;
  }
  getButton() {
    return this.querySelector("button");
  }
  getOptions() {
    let t = this.querySelector("el-options");
    if (!t) throw new Error("`<el-autocomplete>` must contain a `<el-options>` element.");
    return t;
  }
  filterOptions() {
    var _a, _b;
    let t = this.getInput().value.toLowerCase();
    f(this, Qe) !== t && (this.clearActiveItem(), I(this, Qe, t)), I(this, N, []);
    for (let n of this.getOptions().getItems()) {
      let r = ((_a = n.getAttribute("value")) == null ? void 0 : _a.toLowerCase()) || "", i = ((_b = yt(n)) == null ? void 0 : _b.trim().toLowerCase()) ?? "";
      t === "" || r.includes(t) || i.includes(t) ? (f(this, N).push(n), n.removeAttribute("hidden"), n.removeAttribute("aria-hidden")) : (n.setAttribute("hidden", ""), n.setAttribute("aria-hidden", "true"));
    }
  }
  getActiveItem() {
    let n = this.getInput().getAttribute("aria-activedescendant");
    return n ? document.getElementById(n) : null;
  }
  goToItem(t) {
    if (f(this, N).length === 0) return;
    let n = this.getActiveItem(), r = G(f(this, N), n, t);
    r && this.setActiveItem(r);
  }
  setActiveItem(t, n = true) {
    let r = this.getInput(), i = this.getActiveItem();
    i !== null && i.setAttribute("aria-selected", "false"), t.setAttribute("aria-selected", "true"), r.setAttribute("aria-activedescendant", t.id), n && t.scrollIntoView({ block: "nearest" });
  }
  clearActiveItem() {
    let t = this.getInput(), n = this.getActiveItem();
    n !== null && n.setAttribute("aria-selected", "false"), t.setAttribute("aria-activedescendant", "");
  }
  selectOption(t) {
    let n = this.getInput(), r = t.getAttribute("value");
    r && (n.value = r, n.dispatchEvent(new Event("input", { bubbles: true, cancelable: true })), n.dispatchEvent(new Event("change", { bubbles: true, cancelable: true })), this.getOptions().hidePopover());
  }
  onBeforeOpen() {
    let t = this.getInput(), n = this.getButton();
    t.setAttribute("aria-expanded", "true"), n == null ? void 0 : n.setAttribute("aria-expanded", "true");
  }
  onBeforeClose() {
    let t = this.getInput(), n = this.getButton();
    t.setAttribute("aria-expanded", "false"), n == null ? void 0 : n.setAttribute("aria-expanded", "false"), this.clearActiveItem();
  }
};
N = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap();
T("el-autocomplete", Qt);
var j, Xe, Je, ee, Et, Zt, Jt = class extends x {
  constructor() {
    super(...arguments);
    L(this, ee);
    L(this, j, []);
    L(this, Xe, null);
    L(this, Je, ({ query: t, content: n }) => n.toLocaleLowerCase().includes(t.toLocaleLowerCase().trim()));
  }
  mount(t) {
    let n = this.getInput(), r = this.getItems();
    n.id || (n.id = k("command-input")), r.id || (r.id = k("command-items")), n.setAttribute("role", "combobox"), n.setAttribute("aria-autocomplete", "list"), n.setAttribute("autocomplete", "off"), n.setAttribute("aria-controls", r.id), r.setAttribute("role", "listbox");
    let i = this;
    function s(l = false) {
      var u;
      for (let p of r.getItems()) p.getAttribute("role") !== "option" && (p.id || (p.id = k("item")), p.setAttribute("role", "option"), p.setAttribute("tabIndex", "-1"), p.setAttribute("aria-selected", "false"), p.hasAttribute("disabled") && p.setAttribute("aria-disabled", "true"), ae(p, "mouseover", t, () => {
        var g;
        return M2(g = i, ee, Zt).call(g, p, false);
      }));
      M2(u = i, ee, Et).call(u, l), l || i.goToItem(0);
    }
    s(true);
    let a = new MutationObserver(() => s(false));
    a.observe(this, { attributes: false, childList: true, subtree: true }), U(n, "--input-width", t, this), n.addEventListener("input", () => M2(this, ee, Et).call(this), { signal: t }), n.addEventListener("keydown", (l) => {
      switch (l.key) {
        case "ArrowDown": {
          l.preventDefault(), this.goToItem(3);
          break;
        }
        case "ArrowUp": {
          l.preventDefault(), this.goToItem(2);
          break;
        }
        case "Home":
        case "PageUp":
          return l.preventDefault(), l.stopPropagation(), this.goToItem(0);
        case "End":
        case "PageDown":
          return l.preventDefault(), l.stopPropagation(), this.goToItem(1);
        case "Enter": {
          let u = this.getActiveItem();
          u && (l.preventDefault(), u.click());
          break;
        }
      }
    }, { signal: t }), t.addEventListener("abort", () => {
      a.disconnect();
    });
  }
  getInput() {
    let t = this.querySelector("input");
    if (!t) throw new Error("`<el-command-palette>` must contain an input element.");
    return t;
  }
  getItems() {
    let t = this.querySelector("el-command-list");
    if (!t) throw new Error("`<el-command-palette>` must contain a `<el-command-list>` element.");
    return t;
  }
  getGroups() {
    return this.getItems().querySelectorAll("el-command-group");
  }
  getSuggestions() {
    return this.querySelector("el-defaults");
  }
  getActiveItem() {
    let n = this.getInput().getAttribute("aria-activedescendant");
    return n ? document.getElementById(n) : null;
  }
  goToItem(t) {
    if (f(this, j).length === 0) return;
    let n = this.getActiveItem(), r = G(f(this, j), n, t);
    r && M2(this, ee, Zt).call(this, r);
  }
  clearActiveItem() {
    let t = this.getInput(), n = this.getActiveItem();
    if (n !== null) {
      n.setAttribute("aria-selected", "false");
      let r = this.querySelector(`el-command-preview[for="${n.id}"]`);
      r && r.setAttribute("hidden", "");
    }
    t.removeAttribute("aria-activedescendant"), this.dispatchEvent(new CustomEvent("change", { detail: { relatedTarget: null }, bubbles: false, cancelable: false }));
  }
  reset() {
    let t = this.getInput();
    t.value = "", t.dispatchEvent(new Event("input", { bubbles: true, cancelable: true })), t.dispatchEvent(new Event("change", { bubbles: true, cancelable: true })), M2(this, ee, Et).call(this, true), this.clearActiveItem();
  }
  setFilterCallback(t) {
    I(this, Je, t);
  }
};
j = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakSet(), Et = function(t = false) {
  let n = this.getItems(), r = this.getInput().value ?? "";
  I(this, j, []);
  for (let a of n.getItems()) {
    if (a.closest("el-defaults")) continue;
    let l = An(a) ?? "";
    r === "" || !f(this, Je).call(this, { query: r, node: a, content: l }) ? (a.setAttribute("hidden", ""), a.setAttribute("aria-hidden", "true")) : (f(this, j).push(a), a.removeAttribute("hidden"), a.removeAttribute("aria-hidden"));
  }
  for (let a of this.getGroups()) a.getItems().some((u) => !u.hasAttribute("hidden")) ? a.removeAttribute("hidden") : a.setAttribute("hidden", "");
  let i = this.getSuggestions();
  i && (r === "" ? (i.removeAttribute("hidden"), I(this, j, i.getItems())) : i.setAttribute("hidden", ""));
  let s = this.querySelector("el-no-results");
  s && (r === "" || f(this, j).length > 0 ? s.setAttribute("hidden", "") : s.removeAttribute("hidden")), f(this, j).length === 0 ? n.setAttribute("hidden", "") : n.removeAttribute("hidden"), !(t && r === "") && (f(this, j).length === 0 ? this.clearActiveItem() : f(this, Xe) !== r && this.goToItem(0), I(this, Xe, r));
}, Zt = function(t, n = true) {
  let r = this.getInput(), i = this.getActiveItem();
  if (t === i) return;
  if (i !== null) {
    i.setAttribute("aria-selected", "false");
    let a = this.querySelector(`el-command-preview[for="${i.id}"]`);
    a && a.setAttribute("hidden", "");
  }
  t.setAttribute("aria-selected", "true"), r.setAttribute("aria-activedescendant", t.id);
  let s = this.querySelector(`el-command-preview[for="${t.id}"]`);
  s && s.removeAttribute("hidden"), n && t.scrollIntoView({ block: "nearest" }), this.dispatchEvent(new CustomEvent("change", { detail: { relatedTarget: t }, bubbles: false, cancelable: false }));
};
var eo = class extends x {
  getItems() {
    return Array.from(this.querySelectorAll(`${ue},[role="option"]`));
  }
}, to = class extends x {
  getItems() {
    return Array.from(this.querySelectorAll(`${ue},[role="option"]`));
  }
}, oo = class extends x {
}, no = class extends x {
}, ro = class extends x {
  getItems() {
    return Array.from(this.querySelectorAll(`${ue},[role="option"]`));
  }
};
T("el-command-palette", Jt);
T("el-command-list", eo);
T("el-defaults", to);
T("el-no-results", oo);
T("el-command-group", ro);
T("el-command-preview", no);
var z = [];
at(() => {
  function e(o) {
    if (o.target === document.body || z[0] === o.target) return;
    let t = o.target;
    t && "closest" in t && (t = t.closest(ue), z.unshift(t ?? o.target), z = z.filter((n) => n != null && n.isConnected), z.splice(10));
  }
  window.addEventListener("click", e, { capture: true }), window.addEventListener("pointerdown", e, { capture: true }), window.addEventListener("focus", e, { capture: true }), document.body.addEventListener("click", e, { capture: true }), document.body.addEventListener("pointerdown", e, { capture: true }), document.body.addEventListener("focus", e, { capture: true });
});
var Re = null;
typeof globalThis.window < "u" && (Re = HTMLDialogElement.prototype.close, Object.defineProperties(HTMLDialogElement.prototype, { close: { value() {
  let e = this.closest("el-dialog");
  if (!(e instanceof Be)) return Re == null ? void 0 : Re.apply(this, arguments);
  let o = e.beforeClose();
  if (o === true) return Re == null ? void 0 : Re.apply(this, arguments);
  o !== false && o.then((t) => t ? Re == null ? void 0 : Re.apply(this, arguments) : null).catch(console.error);
} } }), document.addEventListener("command", (e) => {
  let o = e.target;
  if (!(o instanceof HTMLDialogElement) || !("command" in e) || e.command !== "close") return;
  let t = o.closest("el-dialog");
  if (!(t instanceof Be)) return;
  let n = t.beforeClose();
  n !== true && (e.stopImmediatePropagation(), e.preventDefault(), n !== false && n.then((r) => r ? Re == null ? void 0 : Re.apply(o) : null).catch(console.error));
}, true));
var Y, te, Ne, Ae, Ze, io, Be = class extends x {
  constructor() {
    super(...arguments);
    L(this, Ze);
    L(this, Y, null);
    L(this, te, null);
    L(this, Ne, true);
    L(this, Ae, Pe(this, () => Array.from(this.querySelectorAll("el-dialog-panel,el-dialog-backdrop"))));
  }
  mount(t) {
    let n = this.getNativeDialog();
    n.removeAttribute("open"), n.style.setProperty("right", "var(--el-top-layer-scrollbar-offset, 0px)");
    let r = this.hasAttribute("open");
    for (let a of M2(this, Ze, io).call(this)) a.setAttribute("aria-expanded", r.toString());
    kr(n, t, (a) => {
      a.preventDefault();
      let l = new Event("cancel", { bubbles: false, cancelable: true });
      !this.dispatchEvent(l) || n.close();
    });
    let i = this.querySelector("el-dialog-panel");
    le(i ?? n, t, () => {
      this.hasAttribute("open") && n.close();
    });
    let s = null;
    n.addEventListener("beforetoggle", (a) => {
      let l = a;
      l.newState === "open" && l.oldState === "closed" && this.beforeOpen();
      let u = this.hasAttribute("open");
      if (l.newState === "open" && !u ? (this.dispatchEvent(new CustomEvent("open", { bubbles: false, cancelable: false })), this.setAttribute("open", "")) : l.newState === "closed" && u && (this.dispatchEvent(new CustomEvent("close", { bubbles: false, cancelable: false })), this.removeAttribute("open")), l.newState === "open" && l.oldState === "closed") z.length > 0 && !s && (s = z[0]);
      else if (l.newState === "closed" && l.oldState === "open") {
        let p = f(this, Ne);
        setTimeout(() => {
          if (!p) {
            s && s === document.activeElement && s.isConnected && "blur" in s && typeof s.blur == "function" && s.blur();
            return;
          }
          s && s !== document.activeElement && s.isConnected && ke(s), s = null;
        });
      }
    }, { signal: t }), t.addEventListener("abort", () => {
      var a;
      f(this, Ae).abort(), (a = f(this, te)) == null || a.call(this);
    }), this.hasAttribute("open") && n.showModal();
  }
  onAttributeChange(t, n, r) {
    switch (t) {
      case "open": {
        let i = this.getNativeDialog();
        for (let s of M2(this, Ze, io).call(this)) s.setAttribute("aria-expanded", r !== null ? "true" : "false");
        r === null ? i.close() : i.showModal();
        break;
      }
    }
  }
  getNativeDialog() {
    let t = this.querySelector("dialog");
    if (!t) throw new Error("[ElDialog] No `<dialog>` element found");
    return t;
  }
  beforeOpen() {
    I(this, Ne, true), f(this, Y) && (f(this, Y).abort(), I(this, Y, null)), f(this, te) || I(this, te, vt(this.ownerDocument)), f(this, Ae) && f(this, Ae).start("in");
  }
  beforeClose() {
    if (f(this, te) && (f(this, te).call(this), I(this, te, null)), f(this, Y)) return false;
    I(this, Y, new AbortController());
    let t = f(this, Y).signal;
    return new Promise((n) => {
      var _a;
      (_a = f(this, Ae)) == null ? void 0 : _a.start("out", () => {
        t.aborted || (I(this, Y, null), requestAnimationFrame(() => {
          let r = this.getNativeDialog(), i = r.style.cssText;
          r.style.cssText = i + "transition-duration: 0 !important;", Re == null ? void 0 : Re.apply(r), requestAnimationFrame(() => {
            r.style.cssText = i;
          });
        }), n(true));
      });
    });
  }
  show() {
    this.getNativeDialog().showModal();
  }
  hide({ restoreFocus: t = true } = {}) {
    I(this, Ne, t), this.getNativeDialog().close();
  }
};
Y = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakSet(), io = function() {
  return document.querySelectorAll(`[commandfor="${this.getNativeDialog().id}"]`);
}, C(Be, "observedAttributes", ["open"]);
var so = class extends x {
  mount(o) {
    Ir(this, o, () => {
      let t = this.getDialog(), n = t.getNativeDialog();
      if (!n.hasAttribute("open")) return;
      let r = new Event("cancel", { bubbles: false, cancelable: true });
      !t.dispatchEvent(r) || n.close();
    });
  }
  getDialog() {
    let o = this.closest("el-dialog");
    if (!o) throw new Error("[ElDialogPanel] No `<el-dialog>` parent found");
    return o;
  }
}, lo = class extends x {
  mount() {
    this.setAttribute("inert", "");
  }
};
T("el-dialog", Be);
T("el-dialog-panel", so);
T("el-dialog-backdrop", lo);
function Ir(e, o, t) {
  document.addEventListener("click", (n) => {
    if (n.target === e) {
      let { clientX: i, clientY: s } = n, a = e.getBoundingClientRect();
      if (i >= a.left && i <= a.right && s >= a.top && s <= a.bottom) return;
      t(n);
      return;
    }
    let r = e.closest("dialog");
    if (r && r.contains(n.target) && !e.contains(n.target)) {
      t(n);
      return;
    }
    if (n.target === n.target.ownerDocument.documentElement) {
      t(n);
      return;
    }
  }, { signal: o, capture: true });
}
function kr(e, o, t) {
  e.addEventListener("keydown", (n) => {
    n.key === "Escape" && (n.defaultPrevented || t(n));
  }, { signal: o });
}
var Fe, et, ao, At = class extends x {
  constructor() {
    super(...arguments);
    L(this, et);
    L(this, Fe, Pe(this));
  }
  mount(t) {
    this.id || (this.id = k("disclosure")), this.hasAttribute("hidden") ? this.removeAttributeNoCallbacks("open") : this.setAttributeNoCallbacks("open", "");
    let n = () => {
      this.hasAttribute("open") && this.hide();
    }, r = !this.hasAttribute("hidden");
    for (let i of M2(this, et, ao).call(this)) le(i, t, n), i.setAttribute("aria-expanded", r.toString()), i.setAttribute("aria-controls", this.id);
    this.addEventListener("command", (i) => {
      if (i.target instanceof HTMLElement && "command" in i) switch (i.command) {
        case "--show": {
          this.show(), i.preventDefault();
          break;
        }
        case "--hide": {
          this.hide(), i.preventDefault();
          break;
        }
        case "--toggle": {
          this.toggle(), i.preventDefault();
          break;
        }
      }
    }, { signal: t }), le(this, t, n), t.addEventListener("abort", () => f(this, Fe).abort());
  }
  onAttributeChange(t, n, r) {
    switch (t) {
      case "hidden": {
        r === null ? this.setAttributeNoCallbacks("open", "") : this.removeAttributeNoCallbacks("open");
        for (let i of M2(this, et, ao).call(this)) i.setAttribute("aria-expanded", r === null ? "true" : "false");
        r === null ? f(this, Fe).start("in") : f(this, Fe).start("out");
        break;
      }
      case "open": {
        r === null ? this.hide() : this.show();
        break;
      }
    }
  }
  show() {
    this.removeAttribute("hidden");
  }
  hide() {
    this.setAttribute("hidden", "");
  }
  toggle() {
    this.hasAttribute("hidden") ? this.show() : this.hide();
  }
};
Fe = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakSet(), ao = function() {
  return document.querySelectorAll(`[commandfor="${this.id}"]`);
}, C(At, "observedAttributes", ["hidden", "open"]);
T("el-disclosure", At);
function xt(e, o, t, n, r) {
  let i = null;
  for (let a of o) a.addEventListener("pointerdown", (l) => {
    l.button === 0 && e.classList.contains(":popover-open") && (i = Date.now() + 100);
  }, { signal: n, capture: true });
  e.ownerDocument.addEventListener("focusin", (a) => {
    if (!t.hasAttribute("open")) return;
    let l = a.target, u = a.relatedTarget;
    l !== null && (i && Date.now() < i || e.contains(l) || o.some((p) => p.contains(l)) || r(u));
  }, { signal: n });
}
var Pr = 200;
function Tt(e, o, t) {
  let n = null, r = "", i = null, s = null;
  e.id || (e.id = k(o.role));
  let a = o.getButton();
  a.id || (a.id = k(`${o.role}-button`)), He(e, () => o.getButton(), () => o.getButton(), t, () => o.onBeforeOpen(), () => {
    o.onBeforeClose(), d3(), r = "", i && (clearTimeout(i), i = null);
  }), wt(e, t), e.setAttribute("popover", "manual"), e.setAttribute("role", o.role), a.setAttribute("popovertarget", e.id), a.setAttribute("aria-haspopup", o.role);
  function l() {
    let v = o.getItems(), A = { passive: true, signal: t }, E = o.role === "menu" ? "menuitem" : "option";
    for (let S of v) S.getAttribute("role") !== E && (S.id || (S.id = k("item")), S.setAttribute("role", E), S.setAttribute("tabIndex", "-1"), S.addEventListener("click", () => o.onItemClick(S), A), ae(S, "mouseover", t, () => b(S, false)), ae(S, "mouseout", t, () => d3()));
  }
  l();
  let u = new MutationObserver(l);
  u.observe(e, { attributes: false, childList: true, subtree: true }), xt(e, [a], e, t, (v) => {
    v === null && (s = Date.now() + 100), e.hidePopover();
  });
  let p = null, g = false;
  a.addEventListener("pointerdown", (v) => {
    if (v.button === 0 && !a.matches(":disabled")) {
      if (v.pointerType === "touch") {
        g = true;
        return;
      }
      e.togglePopover(), p = Date.now();
    }
  }, { signal: t }), document.addEventListener("pointerup", (v) => {
    if (v.button !== 0 || a.matches(":disabled") || !e.hasAttribute("open")) return;
    if (Date.now() - (p ?? 0) > Pr) {
      let E = v.composedPath();
      if (E.includes(e)) {
        if (p !== null) {
          let S = m3();
          S && S.click();
        }
        return;
      }
      for (let S of E) {
        if (!(S instanceof Element)) continue;
        if ((S.getAttribute("commandfor") || S.getAttribute("popovertarget")) === e.id) return;
      }
      e.hidePopover();
    }
    p = null;
  }, { signal: t, capture: true }), a.addEventListener("click", (v) => {
    if (g) {
      g = false;
      return;
    }
    v.preventDefault(), v.stopPropagation();
  }, { signal: t });
  let c = null;
  e.addEventListener("beforetoggle", (v) => {
    let A = v;
    A.newState === "open" && A.oldState === "closed" && z.length > 0 && !c && (c = z[0]);
  }, { signal: t }), e.addEventListener("toggle", (v) => {
    let A = v;
    A.newState === "closed" && A.oldState === "open" && setTimeout(() => {
      !e.contains(document.activeElement) && document.activeElement !== document.body || s && Date.now() < s || (c && c !== document.activeElement && c.isConnected && ke(c), c = null);
    });
  }, { signal: t }), t.addEventListener("abort", () => {
    i && (clearTimeout(i), i = null), u.disconnect();
  });
  function b(v, A = true) {
    let E = m3();
    E !== null && E.setAttribute("tabIndex", "-1"), e.removeAttribute("tabIndex"), v.setAttribute("tabIndex", "0"), v.focus({ preventScroll: true }), n = v, A && v.scrollIntoView({ block: "nearest" });
  }
  function d3() {
    let v = m3();
    v !== null && v.setAttribute("tabIndex", "-1"), n = null, e.hasAttribute("open") && (e.setAttribute("tabIndex", "0"), e.focus());
  }
  function m3() {
    return n;
  }
  function h(v, A = false) {
    var _a, _b, _c;
    if (v === "") return null;
    let E = o.getItems(), S = v.toLowerCase(), H = m3(), ce = H ? E.indexOf(H) : -1;
    if (!A && H && ce !== -1 && B(H) && (((_a = H.textContent) == null ? void 0 : _a.trim().toLowerCase()) || "").startsWith(S)) return H;
    for (let D2 = ce + 1; D2 < E.length; D2++) if ((((_b = E[D2].textContent) == null ? void 0 : _b.trim().toLowerCase()) || "").startsWith(S) && B(E[D2])) return E[D2];
    for (let D2 = 0; D2 <= ce; D2++) if ((((_c = E[D2].textContent) == null ? void 0 : _c.trim().toLowerCase()) || "").startsWith(S) && B(E[D2])) return E[D2];
    return null;
  }
  function w(v) {
    let A = r === "";
    i && (clearTimeout(i), i = null), r += v.toLowerCase();
    let E = h(r, A);
    E && b(E, true), i = setTimeout(() => {
      r = "", i = null;
    }, 350);
  }
  function y3() {
    return r !== "";
  }
  return { ignoreNextFocusRestoration: () => s = Date.now() + 100, setActiveItem: b, clearActiveItem: d3, getActiveItem: m3, findItemBySearchQuery: h, handleSearchKey: w, hasActiveSearchQuery: y3 };
}
var oe, xe, P, ot, uo, tt = class extends x {
  constructor() {
    super(...arguments);
    L(this, ot);
    L(this, oe, this.attachInternals());
    L(this, xe, "");
    L(this, P, null);
  }
  mount(t) {
    let n = this.getOptions();
    this.value = this.getAttribute("value") ?? this.value ?? "";
    let r = this.getButton();
    r.id || (r.id = k("select-button")), U(r, "--button-width", t, this), r.addEventListener("keydown", (s) => {
      if (!r.matches(":disabled")) switch (s.key) {
        case "ArrowUp": {
          n.showPopover(), this.goToItem("selected"), s.preventDefault();
          break;
        }
        case "ArrowDown": {
          n.showPopover(), this.goToItem("selected"), s.preventDefault();
          break;
        }
        case "Enter": {
          s.preventDefault(), f(this, oe).form && f(this, oe).form.requestSubmit();
          break;
        }
        case " ": {
          if (n.hasAttribute("open") && f(this, P) && f(this, P).hasActiveSearchQuery()) {
            s.preventDefault(), s.stopPropagation(), f(this, P).handleSearchKey(s.key);
            break;
          }
          s.preventDefault(), n.hasAttribute("open") ? n.hidePopover() : (n.showPopover(), this.goToItem("selected"));
          break;
        }
        default: {
          n.hasAttribute("open") && s.key.length === 1 && !s.ctrlKey && !s.altKey && !s.metaKey && (s.preventDefault(), s.stopPropagation(), this.handleSearchKey(s.key));
          break;
        }
      }
    }, { signal: t });
    for (let s of f(this, oe).labels) s.setAttribute("for", r.id);
    I(this, P, Tt(n, { role: "listbox", getItems: () => this.getItems(), onItemClick: (s) => this.setSelectedOption(s), getButton: () => this.getButton(), onBeforeOpen: () => this.onBeforeOpen(), onBeforeClose: () => this.onBeforeClose() }, t)), n.addEventListener("keydown", (s) => {
      switch (s.key) {
        case "ArrowDown":
          return s.preventDefault(), s.stopPropagation(), this.goToItem(3);
        case "ArrowUp":
          return s.preventDefault(), s.stopPropagation(), this.goToItem(2);
        case "Home":
        case "PageUp":
          return s.preventDefault(), s.stopPropagation(), this.goToItem(0);
        case "End":
        case "PageDown":
          return s.preventDefault(), s.stopPropagation(), this.goToItem(1);
        case " ":
          if (f(this, P) && f(this, P).hasActiveSearchQuery()) {
            s.preventDefault(), s.stopPropagation(), f(this, P).handleSearchKey(s.key);
            return;
          }
        case "Enter": {
          s.preventDefault(), s.stopPropagation();
          let a = this.getActiveItem();
          a ? a.click() : n.hidePopover();
          return;
        }
        case "Tab": {
          f(this, P) && f(this, P).ignoreNextFocusRestoration();
          break;
        }
        case "Escape": {
          s.preventDefault(), s.stopPropagation(), n.hidePopover(), r.focus();
          break;
        }
        default: {
          s.key.length === 1 && !s.ctrlKey && !s.altKey && !s.metaKey && (s.preventDefault(), s.stopPropagation(), f(this, P) && f(this, P).handleSearchKey(s.key));
          break;
        }
      }
    }, { signal: t }), n.addEventListener("toggle", (s) => {
      s.newState === "open" && this.onOpen();
    }, { signal: t });
    let i = Array.from(n.querySelectorAll("el-option[disabled]"));
    for (let s of i) s.setAttribute("aria-disabled", "true"), s.setAttribute("aria-selected", "false");
  }
  onAttributeChange(t, n, r) {
    switch (t) {
      case "value": {
        r !== null && (this.value = r);
        break;
      }
      case "required": {
        M2(this, ot, uo).call(this);
        break;
      }
    }
  }
  getButton() {
    let t = this.querySelector("button");
    if (!t) throw new Error("`<el-select>` must contain a button element.");
    return t;
  }
  getOptions() {
    let t = this.querySelector("el-options");
    if (!t) throw new Error("`<el-select>` must contain a `<el-options>` element.");
    return t;
  }
  setSelectedOption(t) {
    this.value = t.getAttribute("value"), this.dispatchEvent(new Event("input", { bubbles: true, cancelable: true })), this.dispatchEvent(new Event("change", { bubbles: true, cancelable: true })), this.getOptions().hidePopover();
  }
  getOptionByName(t) {
    return this.getOptions().getOptionByName(t);
  }
  getItems() {
    return this.getOptions().getItems();
  }
  getActiveItem() {
    var _a;
    return (_a = f(this, P)) == null ? void 0 : _a.getActiveItem();
  }
  getSelectedOption() {
    return this.getOptionByName(f(this, xe));
  }
  goToItem(t = 4) {
    let n = this.getItems();
    if (n.length === 0) return;
    let r = this.getActiveItem();
    if (r === null && (t === 2 || t === 3)) {
      this.goToItem("selected");
      return;
    }
    if (t === "selected") {
      let s = this.getSelectedOption();
      s && B(s) ? this.setActiveItem(s) : this.goToItem(0);
      return;
    }
    let i = G(n, r, t);
    i && this.setActiveItem(i);
  }
  setActiveItem(t) {
    f(this, P) && f(this, P).setActiveItem(t);
  }
  clearActiveItem() {
    f(this, P) && f(this, P).clearActiveItem();
  }
  onBeforeOpen() {
    let t = this.getButton(), n = t.dataset.originalTabIndex;
    n && (t.dataset.originalTabIndex = n), t.setAttribute("tabIndex", "-1");
  }
  onOpen() {
    this.getActiveItem() === null && this.goToItem("selected");
  }
  onBeforeClose() {
    let t = this.getButton(), n = t.dataset.originalTabIndex;
    delete t.dataset.originalTabIndex, n !== void 0 ? t.setAttribute("tabIndex", n) : t.removeAttribute("tabIndex");
    let r = this.getActiveItem();
    r !== null && r.setAttribute("tabIndex", "-1");
  }
  handleSearchKey(t) {
    f(this, P) && f(this, P).handleSearchKey(t);
  }
  set value(t) {
    I(this, xe, t), f(this, oe).setFormValue(t), M2(this, ot, uo).call(this);
    let n = this.getSelectedOption();
    if (n) {
      for (let r of this.getItems()) r.setAttribute("aria-selected", "false");
      n.setAttribute("aria-selected", "true");
      try {
        this.querySelectorAll("el-selectedcontent").forEach((r) => r.update());
      } catch {
      }
    }
  }
  get value() {
    return f(this, xe);
  }
};
oe = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakSet(), uo = function() {
  if (!this.hasAttribute("required") || f(this, xe)) {
    f(this, oe).setValidity({});
    return;
  }
  f(this, oe).setValidity({ valueMissing: true }, gn.selectRequired, this.getButton());
}, C(tt, "formAssociated", true), C(tt, "observedAttributes", ["required"]);
var co = class extends x {
  mount() {
    this.update();
  }
  update() {
    let t = this.getSelect().getSelectedOption();
    if (!t) return;
    let n = document.createDocumentFragment();
    for (let r of t.childNodes) n.append(r.cloneNode(true));
    this.replaceChildren(n);
  }
  getSelect() {
    let o = this.closest("el-select");
    if (!o) throw new Error("`<el-selectedcontent>` must be inside of a `<el-select>` element.");
    return o;
  }
};
T("el-select", tt);
T("el-selectedcontent", co);
var fo = class extends x {
  getButton() {
    let o = this.querySelector("button");
    if (!o) throw new Error("[ElDropdown] No `<button>` element found");
    return o;
  }
  mount(o) {
    let t = this.getButton();
    t.id || (t.id = k("dropdown-button")), U(t, "--button-width", o, this);
    let n = this.querySelectorAll("label");
    for (let r of n) r.setAttribute("for", t.id);
  }
}, O, St = class extends x {
  constructor() {
    super(...arguments);
    L(this, O, null);
  }
  mount(t) {
    I(this, O, Tt(this, { role: "menu", getItems: () => this.getItems(), onItemClick: () => this.hidePopover(), getButton: () => this.getDropdown().getButton(), onBeforeOpen: () => this.onBeforeOpen(), onBeforeClose: () => this.onBeforeClose() }, t));
    let r = this.getDropdown().getButton();
    r.addEventListener("keydown", (i) => {
      if (!r.disabled) switch (i.key) {
        case "ArrowDown": {
          this.showPopover(), this.goToItem(0), i.preventDefault();
          break;
        }
        case "ArrowUp": {
          this.showPopover(), this.goToItem(1), i.preventDefault();
          break;
        }
        case " ":
          if (this.hasAttribute("open") && f(this, O) && f(this, O).hasActiveSearchQuery()) {
            i.preventDefault(), i.stopPropagation(), f(this, O).handleSearchKey(i.key);
            break;
          }
        case "Enter": {
          i.preventDefault(), this.hasAttribute("open") ? this.hidePopover() : (this.showPopover(), this.goToItem(0));
          break;
        }
        default: {
          this.hasAttribute("open") && i.key.length === 1 && !i.ctrlKey && !i.altKey && !i.metaKey && (i.preventDefault(), i.stopPropagation(), f(this, O) && f(this, O).handleSearchKey(i.key));
          break;
        }
      }
    }, { signal: t }), this.addEventListener("keydown", (i) => {
      switch (i.key) {
        case "ArrowDown":
          return i.preventDefault(), i.stopPropagation(), this.goToItem(3);
        case "ArrowUp":
          return i.preventDefault(), i.stopPropagation(), this.goToItem(2);
        case "Home":
        case "PageUp":
          return i.preventDefault(), i.stopPropagation(), this.goToItem(0);
        case "End":
        case "PageDown":
          return i.preventDefault(), i.stopPropagation(), this.goToItem(1);
        case " ":
          if (f(this, O) && f(this, O).hasActiveSearchQuery()) {
            i.preventDefault(), i.stopPropagation(), f(this, O).handleSearchKey(i.key);
            return;
          }
        case "Enter": {
          i.preventDefault(), i.stopPropagation();
          let s = this.getActiveItem();
          s ? s.click() : this.hidePopover();
          return;
        }
        case "Tab": {
          f(this, O) && f(this, O).ignoreNextFocusRestoration();
          break;
        }
        case "Escape": {
          i.preventDefault(), i.stopPropagation(), this.hidePopover(), r.focus();
          break;
        }
        default: {
          i.key.length === 1 && !i.ctrlKey && !i.altKey && !i.metaKey && (i.preventDefault(), i.stopPropagation(), f(this, O) && f(this, O).handleSearchKey(i.key));
          break;
        }
      }
    }, { signal: t });
  }
  onBeforeOpen() {
    let n = this.getDropdown().getButton(), r = n.dataset.originalTabIndex;
    r && (n.dataset.originalTabIndex = r), n.setAttribute("tabIndex", "-1"), this.getActiveItem() === null && (this.setAttribute("tabIndex", "0"), setTimeout(() => this.focus({ preventScroll: true })));
  }
  onBeforeClose() {
    let n = this.getDropdown().getButton(), r = n.dataset.originalTabIndex;
    delete n.dataset.originalTabIndex, r !== void 0 ? n.setAttribute("tabIndex", r) : n.removeAttribute("tabIndex");
    let i = this.getActiveItem();
    i !== null && i.setAttribute("tabIndex", "-1");
  }
  goToItem(t = 4) {
    let n = this.getItems();
    if (n.length === 0) return;
    let r = this.getActiveItem(), i = G(n, r, t);
    i && this.setActiveItem(i);
  }
  setActiveItem(t) {
    f(this, O) && f(this, O).setActiveItem(t);
  }
  clearActiveItem() {
    f(this, O) && f(this, O).clearActiveItem();
  }
  getDropdown() {
    let t = this.closest("el-dropdown");
    if (!t) throw new Error("[ElMenu] No `<el-dropdown>` element found");
    return t;
  }
  getItems() {
    return Array.from(this.querySelectorAll(`${ue},[role="menuitem"]`));
  }
  getActiveItem() {
    var _a;
    return ((_a = f(this, O)) == null ? void 0 : _a.getActiveItem()) || null;
  }
  onAttributeChange(t, n, r) {
    switch (t) {
      case "open": {
        r === null ? this.hidePopover() : this.showPopover();
        break;
      }
    }
  }
};
O = /* @__PURE__ */ new WeakMap(), C(St, "observedAttributes", ["anchor", "open"]);
T("el-menu", St);
T("el-dropdown", fo);
var Lt = class extends x {
  onAttributeChange(o, t, n) {
    switch (o) {
      case "open": {
        n === null ? this.hidePopover() : this.showPopover();
        break;
      }
    }
  }
  getOptionByName(o) {
    let t = this.querySelector(`el-option[value="${o}"]`);
    return t || null;
  }
  getItems() {
    return Array.from(this.querySelectorAll("el-option:not([disabled])"));
  }
};
C(Lt, "observedAttributes", ["anchor", "open"]);
var po = class extends x {
};
T("el-options", Lt);
T("el-option", po);
var mo = class extends x {
  getPopovers() {
    return Array.from(this.querySelectorAll("* > el-popover"));
  }
}, It = class extends x {
  mount(o) {
    if (!this.id) throw new Error("[ElPopover] No id found for popover (ensure `id` is set)");
    let n = this.getButton();
    n.id || (n.id = k("popover-button")), He(this, () => this.getButton(), () => this.getButton(), o), U(n, "--button-width", o, this), this.setAttribute("tabindex", "-1"), n.addEventListener("keydown", (s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this.togglePopover());
    }, { signal: o });
    let r = this, i = this.closest("el-popover-group");
    i && i.getPopovers().includes(this) && (r = i), xt(r, [n], this, o, () => this.hidePopover()), this.addEventListener("toggle", (s) => {
      let a = s;
      a.newState === "closed" && a.oldState === "open" && setTimeout(() => {
        !this.contains(document.activeElement) && document.activeElement !== document.body || n && n !== document.activeElement && n.isConnected && ke(n);
      });
    }, { signal: o });
  }
  getButton() {
    let o = this.id, t = document.querySelector(`[popovertarget="${o}"]`);
    if (!t) throw new Error('[ElPopover] No button found for popover (ensure you add a `<button popovertarget="${id}">` on the page)');
    return t;
  }
  onAttributeChange(o, t, n) {
    switch (o) {
      case "open": {
        n === null ? this.hidePopover() : this.showPopover();
        break;
      }
    }
  }
};
C(It, "observedAttributes", ["anchor", "open"]);
T("el-popover", It);
T("el-popover-group", mo);
var ho = class extends x {
  mount(o) {
    let t = this.getList(), n = this.getPanels(), r = t.getTabButtons(), i = n.getPanels();
    if (r.length !== i.length) {
      return;
    }
    for (let a = 0; a < i.length; a++) {
      let l = i[a], u = r[a];
      u.id || (u.id = k("tailwindplus-tab")), l.id || (l.id = k("tailwindplus-tab-panel")), l.setAttribute("aria-labelledby", u.id), u.setAttribute("aria-controls", l.id), u.setAttribute("role", "tab");
    }
    let s = this.getActiveTab();
    s === -1 && (s = 0), t.setActiveTab(s), n.setActivePanel(s), t.addEventListener("keydown", (a) => {
      switch (a.key) {
        case "ArrowLeft": {
          a.preventDefault();
          let u = this.getActiveTab() - 1;
          u < 0 && (u = r.length - 1), this.setActiveTab(u), r[u].focus();
          break;
        }
        case "ArrowRight": {
          a.preventDefault();
          let u = this.getActiveTab() + 1;
          u >= r.length && (u = 0), this.setActiveTab(u), r[u].focus();
          break;
        }
        case "Home":
        case "PageUp": {
          a.preventDefault(), this.setActiveTab(0), r[0].focus();
          break;
        }
        case "End":
        case "PageDown": {
          a.preventDefault(), this.setActiveTab(r.length - 1), r[r.length - 1].focus();
          break;
        }
      }
    }, { signal: o });
    for (let a = 0; a < r.length; a++) r[a].addEventListener("click", (u) => {
      u.preventDefault(), this.setActiveTab(a);
    }, { signal: o });
  }
  getActiveTab() {
    let o = this.querySelector("el-tab-panels"), t = o.getPanels().find((n) => !n.hasAttribute("hidden"));
    return t ? o.getPanels().indexOf(t) : -1;
  }
  getList() {
    let o = this.querySelector("el-tab-list");
    if (!o) throw new Error("[ElTabGroup] No `<el-tab-list>` element found");
    return o;
  }
  getPanels() {
    let o = this.querySelector("el-tab-panels");
    if (!o) throw new Error("[ElTabGroup] No `<el-tab-panels>` element found");
    return o;
  }
  setActiveTab(o) {
    if (this.getActiveTab() === o) return;
    let n = this.getList(), r = this.getPanels(), i = n.getTabButtons();
    o < 0 || o >= i.length || (n.setActiveTab(o), r.setActivePanel(o));
  }
}, go = class extends x {
  mount() {
    this.setAttribute("role", "tablist"), this.setAttribute("aria-orientation", "horizontal");
  }
  getTabButtons() {
    let o = this.querySelectorAll("button");
    return Array.from(o);
  }
  setActiveTab(o) {
    this.getTabButtons().forEach((n, r) => {
      let i = r === o;
      n.setAttribute("tabindex", i ? "0" : "-1"), n.setAttribute("aria-selected", i ? "true" : "false");
    });
  }
}, bo = class extends x {
  mount() {
    let t = this.getTabGroup().getList(), n = this.getPanels(), r = new MutationObserver((i) => {
      for (let s of i) {
        let a = s.target;
        switch (s.attributeName) {
          case "hidden":
            if (!a.hasAttribute(s.attributeName)) {
              let l = n.indexOf(a);
              t.setActiveTab(l), this.setActivePanel(l);
            }
        }
      }
    });
    for (let i of n) i.setAttribute("role", "tabpanel"), i.setAttribute("tabindex", "0"), r.observe(i, { attributeFilter: ["hidden"], attributes: true });
  }
  getTabGroup() {
    let o = this.closest("el-tab-group");
    if (!o) throw new Error("`<el-tab-panels>` must be inside of a `<el-tab-group>` element.");
    return o;
  }
  getPanels() {
    return Array.from(this.children);
  }
  setActivePanel(o) {
    this.getPanels().forEach((n, r) => {
      n.toggleAttribute("hidden", r !== o);
    });
  }
};
T("el-tab-list", go);
T("el-tab-panels", bo);
T("el-tab-group", ho);
typeof globalThis.window < "u" && setTimeout(() => window.dispatchEvent(new Event("elements:ready")));
export {
  initDropdowns as i
};
