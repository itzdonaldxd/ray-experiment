"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.IconSize = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var icons_1 = require("@blueprintjs/icons");
var common_1 = require("../../common");
var IconSize;
(function (IconSize) {
    IconSize[IconSize["STANDARD"] = 16] = "STANDARD";
    IconSize[IconSize["LARGE"] = 20] = "LARGE";
})(IconSize = exports.IconSize || (exports.IconSize = {}));
var Icon = /** @class */ (function (_super) {
    tslib_1.__extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.render = function () {
        var icon = this.props.icon;
        if (icon == null || typeof icon === "boolean") {
            return null;
        }
        else if (typeof icon !== "string") {
            return icon;
        }
        var _a = this.props, className = _a.className, color = _a.color, htmlTitle = _a.htmlTitle, 
        // eslint-disable-next-line deprecation/deprecation
        iconSize = _a.iconSize, intent = _a.intent, _b = _a.size, size = _b === void 0 ? iconSize !== null && iconSize !== void 0 ? iconSize : IconSize.STANDARD : _b, title = _a.title, _c = _a.tagName, tagName = _c === void 0 ? "span" : _c, htmlprops = tslib_1.__rest(_a, ["className", "color", "htmlTitle", "iconSize", "intent", "size", "title", "tagName"]);
        // choose which pixel grid is most appropriate for given icon size
        var pixelGridSize = size >= IconSize.LARGE ? IconSize.LARGE : IconSize.STANDARD;
        // render path elements, or nothing if icon name is unknown.
        var paths = this.renderSvgPaths(pixelGridSize, icon);
        var classes = (0, classnames_1.default)(common_1.Classes.ICON, common_1.Classes.iconClass(icon), common_1.Classes.intentClass(intent), className);
        var viewBox = "0 0 ".concat(pixelGridSize, " ").concat(pixelGridSize);
        return React.createElement(tagName, tslib_1.__assign(tslib_1.__assign({}, htmlprops), { "aria-hidden": title ? undefined : true, className: classes, title: htmlTitle }), React.createElement("svg", { fill: color, "data-icon": icon, width: size, height: size, viewBox: viewBox },
            title && React.createElement("desc", null, title),
            paths));
    };
    /** Render `<path>` elements for the given icon name. Returns `null` if name is unknown. */
    Icon.prototype.renderSvgPaths = function (pathsSize, iconName) {
        var svgPathsRecord = pathsSize === IconSize.STANDARD ? icons_1.IconSvgPaths16 : icons_1.IconSvgPaths20;
        var paths = svgPathsRecord[(0, icons_1.iconNameToPathsRecordKey)(iconName)];
        if (paths == null) {
            return null;
        }
        return paths.map(function (path, i) { return React.createElement("path", { key: i, d: path, fillRule: "evenodd" }); });
    };
    Icon.displayName = "".concat(common_1.DISPLAYNAME_PREFIX, ".Icon");
    return Icon;
}(common_1.AbstractPureComponent2));
exports.Icon = Icon;
//# sourceMappingURL=icon.js.map