module.export({ContextMenuTarget:()=>ContextMenuTarget});let __extends;module.link("tslib",{__extends(v){__extends=v}},0);let React;module.link("react",{"*"(v){React=v}},1);let ReactDOM;module.link("react-dom",{"*"(v){ReactDOM=v}},2);let CONTEXTMENU_WARN_DECORATOR_NEEDS_REACT_ELEMENT,CONTEXTMENU_WARN_DECORATOR_NO_METHOD;module.link("../../common/errors",{CONTEXTMENU_WARN_DECORATOR_NEEDS_REACT_ELEMENT(v){CONTEXTMENU_WARN_DECORATOR_NEEDS_REACT_ELEMENT=v},CONTEXTMENU_WARN_DECORATOR_NO_METHOD(v){CONTEXTMENU_WARN_DECORATOR_NO_METHOD=v}},3);let getDisplayName,isFunction;module.link("../../common/utils",{getDisplayName(v){getDisplayName=v},isFunction(v){isFunction=v}},4);let isDarkTheme;module.link("../../common/utils/isDarkTheme",{isDarkTheme(v){isDarkTheme=v}},5);let ContextMenu;module.link("./contextMenu",{"*"(v){ContextMenu=v}},6);/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/* eslint-disable deprecation/deprecation */
/** @deprecated use ContextMenu2 */
function ContextMenuTarget(WrappedComponent) {
    var _a;
    if (!isFunction(WrappedComponent.prototype.renderContextMenu)) {
        console.warn(CONTEXTMENU_WARN_DECORATOR_NO_METHOD);
    }
    return _a = /** @class */ (function (_super) {
            __extends(ContextMenuTargetClass, _super);
            function ContextMenuTargetClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ContextMenuTargetClass.prototype.render = function () {
                var _this = this;
                var element = _super.prototype.render.call(this);
                if (element == null) {
                    // always return `element` in case caller is distinguishing between `null` and `undefined`
                    return element;
                }
                if (!React.isValidElement(element)) {
                    console.warn(CONTEXTMENU_WARN_DECORATOR_NEEDS_REACT_ELEMENT);
                    return element;
                }
                var oldOnContextMenu = element.props.onContextMenu;
                var onContextMenu = function (e) {
                    // support nested menus (inner menu target would have called preventDefault())
                    if (e.defaultPrevented) {
                        return;
                    }
                    if (isFunction(_this.renderContextMenu)) {
                        var menu = _this.renderContextMenu(e);
                        if (menu != null) {
                            // HACKHACK: see https://github.com/palantir/blueprint/issues/3979
                            /* eslint-disable-next-line react/no-find-dom-node */
                            var darkTheme = isDarkTheme(ReactDOM.findDOMNode(_this));
                            e.preventDefault();
                            ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, _this.onContextMenuClose, darkTheme);
                        }
                    }
                    oldOnContextMenu === null || oldOnContextMenu === void 0 ? void 0 : oldOnContextMenu(e);
                };
                return React.cloneElement(element, { onContextMenu: onContextMenu });
            };
            return ContextMenuTargetClass;
        }(WrappedComponent)),
        _a.displayName = "ContextMenuTarget(".concat(getDisplayName(WrappedComponent), ")"),
        _a;
}
//# sourceMappingURL=contextMenuTarget.js.map