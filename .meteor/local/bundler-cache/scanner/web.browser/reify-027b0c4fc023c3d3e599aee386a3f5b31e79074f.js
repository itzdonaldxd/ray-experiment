module.export({Switch:()=>Switch,Radio:()=>Radio,Checkbox:()=>Checkbox});let __assign,__extends,__rest;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v},__rest(v){__rest=v}},0);let classNames;module.link("classnames",{default(v){classNames=v}},1);let React;module.link("react",{"*"(v){React=v}},2);let AbstractPureComponent2,Classes,refHandler,setRef;module.link("../../common",{AbstractPureComponent2(v){AbstractPureComponent2=v},Classes(v){Classes=v},refHandler(v){refHandler=v},setRef(v){setRef=v}},3);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},4);/*
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

// we need some empty interfaces to show up in docs
// HACKHACK: these components should go in separate files
/* eslint-disable max-classes-per-file, @typescript-eslint/no-empty-interface */




/**
 * Renders common control elements, with additional props to customize appearance.
 * This component is not exported and is only used in this file for `Checkbox`, `Radio`, and `Switch` below.
 */
var Control = function (_a) {
    var _b;
    var alignIndicator = _a.alignIndicator, children = _a.children, className = _a.className, indicatorChildren = _a.indicatorChildren, inline = _a.inline, inputRef = _a.inputRef, label = _a.label, labelElement = _a.labelElement, large = _a.large, style = _a.style, type = _a.type, typeClassName = _a.typeClassName, _c = _a.tagName, tagName = _c === void 0 ? "label" : _c, htmlProps = __rest(_a, ["alignIndicator", "children", "className", "indicatorChildren", "inline", "inputRef", "label", "labelElement", "large", "style", "type", "typeClassName", "tagName"]);
    var classes = classNames(Classes.CONTROL, typeClassName, (_b = {},
        _b[Classes.DISABLED] = htmlProps.disabled,
        _b[Classes.INLINE] = inline,
        _b[Classes.LARGE] = large,
        _b), Classes.alignmentClass(alignIndicator), className);
    return React.createElement(tagName, { className: classes, style: style }, React.createElement("input", __assign({}, htmlProps, { ref: inputRef, type: type })), React.createElement("span", { className: Classes.CONTROL_INDICATOR }, indicatorChildren), label, labelElement, children);
};
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Switch.prototype.render = function () {
        var _a = this.props, innerLabelChecked = _a.innerLabelChecked, innerLabel = _a.innerLabel, controlProps = __rest(_a, ["innerLabelChecked", "innerLabel"]);
        var switchLabels = innerLabel || innerLabelChecked
            ? [
                React.createElement("div", { key: "checked", className: Classes.CONTROL_INDICATOR_CHILD },
                    React.createElement("div", { className: Classes.SWITCH_INNER_TEXT }, innerLabelChecked ? innerLabelChecked : innerLabel)),
                React.createElement("div", { key: "unchecked", className: Classes.CONTROL_INDICATOR_CHILD },
                    React.createElement("div", { className: Classes.SWITCH_INNER_TEXT }, innerLabel)),
            ]
            : null;
        return (React.createElement(Control, __assign({}, controlProps, { type: "checkbox", typeClassName: Classes.SWITCH, indicatorChildren: switchLabels })));
    };
    Switch.displayName = "".concat(DISPLAYNAME_PREFIX, ".Switch");
    return Switch;
}(AbstractPureComponent2));

var Radio = /** @class */ (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Radio.prototype.render = function () {
        return React.createElement(Control, __assign({}, this.props, { type: "radio", typeClassName: Classes.RADIO }));
    };
    Radio.displayName = "".concat(DISPLAYNAME_PREFIX, ".Radio");
    return Radio;
}(AbstractPureComponent2));

var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            indeterminate: _this.props.indeterminate || _this.props.defaultIndeterminate || false,
        };
        // must maintain internal reference for `indeterminate` support
        _this.input = null;
        _this.handleInputRef = refHandler(_this, "input", _this.props.inputRef);
        _this.handleChange = function (evt) {
            var _a, _b;
            var indeterminate = evt.target.indeterminate;
            // update state immediately only if uncontrolled
            if (_this.props.indeterminate == null) {
                _this.setState({ indeterminate: indeterminate });
            }
            // otherwise wait for props change. always invoke handler.
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        };
        return _this;
    }
    Checkbox.getDerivedStateFromProps = function (_a) {
        var indeterminate = _a.indeterminate;
        // put props into state if controlled by props
        if (indeterminate != null) {
            return { indeterminate: indeterminate };
        }
        return null;
    };
    Checkbox.prototype.render = function () {
        var _a = this.props, defaultIndeterminate = _a.defaultIndeterminate, indeterminate = _a.indeterminate, controlProps = __rest(_a, ["defaultIndeterminate", "indeterminate"]);
        return (React.createElement(Control, __assign({}, controlProps, { inputRef: this.handleInputRef, onChange: this.handleChange, type: "checkbox", typeClassName: Classes.CHECKBOX })));
    };
    Checkbox.prototype.componentDidMount = function () {
        this.updateIndeterminate();
    };
    Checkbox.prototype.componentDidUpdate = function (prevProps) {
        this.updateIndeterminate();
        if (prevProps.inputRef !== this.props.inputRef) {
            setRef(prevProps.inputRef, null);
            this.handleInputRef = refHandler(this, "input", this.props.inputRef);
            setRef(this.props.inputRef, this.input);
        }
    };
    Checkbox.prototype.updateIndeterminate = function () {
        if (this.input != null) {
            this.input.indeterminate = this.state.indeterminate;
        }
    };
    Checkbox.displayName = "".concat(DISPLAYNAME_PREFIX, ".Checkbox");
    return Checkbox;
}(AbstractPureComponent2));

//# sourceMappingURL=controls.js.map