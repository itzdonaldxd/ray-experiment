module.export({Tag:()=>Tag});let __assign,__extends,__rest;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v},__rest(v){__rest=v}},0);let classNames;module.link("classnames",{default(v){classNames=v}},1);let React;module.link("react",{"*"(v){React=v}},2);let AbstractPureComponent2,Classes,DISPLAYNAME_PREFIX,Utils;module.link("../../common",{AbstractPureComponent2(v){AbstractPureComponent2=v},Classes(v){Classes=v},DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v},Utils(v){Utils=v}},3);let isReactNodeEmpty;module.link("../../common/utils",{isReactNodeEmpty(v){isReactNodeEmpty=v}},4);let Icon,IconSize;module.link("../icon/icon",{Icon(v){Icon=v},IconSize(v){IconSize=v}},5);let Text;module.link("../text/text",{Text(v){Text=v}},6);/*
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







var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onRemoveClick = function (e) {
            var _a, _b;
            (_b = (_a = _this.props).onRemove) === null || _b === void 0 ? void 0 : _b.call(_a, e, _this.props);
        };
        return _this;
    }
    Tag.prototype.render = function () {
        var _a;
        var _b = this.props, active = _b.active, children = _b.children, className = _b.className, fill = _b.fill, icon = _b.icon, intent = _b.intent, interactive = _b.interactive, large = _b.large, minimal = _b.minimal, multiline = _b.multiline, onRemove = _b.onRemove, rightIcon = _b.rightIcon, round = _b.round, _c = _b.tabIndex, tabIndex = _c === void 0 ? 0 : _c, htmlTitle = _b.htmlTitle, elementRef = _b.elementRef, htmlProps = __rest(_b, ["active", "children", "className", "fill", "icon", "intent", "interactive", "large", "minimal", "multiline", "onRemove", "rightIcon", "round", "tabIndex", "htmlTitle", "elementRef"]);
        var isRemovable = Utils.isFunction(onRemove);
        var tagClasses = classNames(Classes.TAG, Classes.intentClass(intent), (_a = {},
            _a[Classes.ACTIVE] = active,
            _a[Classes.FILL] = fill,
            _a[Classes.INTERACTIVE] = interactive,
            _a[Classes.LARGE] = large,
            _a[Classes.MINIMAL] = minimal,
            _a[Classes.ROUND] = round,
            _a), className);
        var isLarge = large || tagClasses.indexOf(Classes.LARGE) >= 0;
        var removeButton = isRemovable ? (React.createElement("button", { "aria-label": "Remove", type: "button", className: Classes.TAG_REMOVE, onClick: this.onRemoveClick, tabIndex: interactive ? tabIndex : undefined },
            React.createElement(Icon, { icon: "small-cross", size: isLarge ? IconSize.LARGE : IconSize.STANDARD }))) : null;
        return (React.createElement("span", __assign({}, htmlProps, { className: tagClasses, tabIndex: interactive ? tabIndex : undefined, ref: elementRef }),
            React.createElement(Icon, { icon: icon }),
            !isReactNodeEmpty(children) && (React.createElement(Text, { className: Classes.FILL, ellipsize: !multiline, tagName: "span", title: htmlTitle }, children)),
            React.createElement(Icon, { icon: rightIcon }),
            removeButton));
    };
    Tag.displayName = "".concat(DISPLAYNAME_PREFIX, ".Tag");
    return Tag;
}(AbstractPureComponent2));

//# sourceMappingURL=tag.js.map