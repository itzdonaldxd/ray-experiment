module.export({RadioGroup:()=>RadioGroup});let __assign,__extends;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v}},0);let React;module.link("react",{"*"(v){React=v}},1);let AbstractPureComponent2,Classes;module.link("../../common",{AbstractPureComponent2(v){AbstractPureComponent2=v},Classes(v){Classes=v}},2);let Errors;module.link("../../common/errors",{"*"(v){Errors=v}},3);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},4);let isElementOfType;module.link("../../common/utils",{isElementOfType(v){isElementOfType=v}},5);let Radio;module.link("./controls",{Radio(v){Radio=v}},6);/*
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







var counter = 0;
function nextName() {
    return "".concat(RadioGroup.displayName, "-").concat(counter++);
}
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // a unique name for this group, which can be overridden by `name` prop.
        _this.autoGroupName = nextName();
        return _this;
    }
    RadioGroup.prototype.render = function () {
        var label = this.props.label;
        return (React.createElement("div", { className: this.props.className },
            label == null ? null : React.createElement("label", { className: Classes.LABEL }, label),
            Array.isArray(this.props.options) ? this.renderOptions() : this.renderChildren()));
    };
    RadioGroup.prototype.validateProps = function () {
        if (this.props.children != null && this.props.options != null) {
            console.warn(Errors.RADIOGROUP_WARN_CHILDREN_OPTIONS_MUTEX);
        }
    };
    RadioGroup.prototype.renderChildren = function () {
        var _this = this;
        return React.Children.map(this.props.children, function (child) {
            if (isElementOfType(child, Radio)) {
                return React.cloneElement(child, _this.getRadioProps(child.props));
            }
            else {
                return child;
            }
        });
    };
    RadioGroup.prototype.renderOptions = function () {
        var _this = this;
        var _a;
        return (_a = this.props.options) === null || _a === void 0 ? void 0 : _a.map(function (option) { return (React.createElement(Radio, __assign({}, _this.getRadioProps(option), { key: option.value, labelElement: option.label || option.value }))); });
    };
    RadioGroup.prototype.getRadioProps = function (optionProps) {
        var name = this.props.name;
        var className = optionProps.className, disabled = optionProps.disabled, value = optionProps.value;
        return {
            checked: value === this.props.selectedValue,
            className: className,
            disabled: disabled || this.props.disabled,
            inline: this.props.inline,
            name: name == null ? this.autoGroupName : name,
            onChange: this.props.onChange,
            value: value,
        };
    };
    RadioGroup.displayName = "".concat(DISPLAYNAME_PREFIX, ".RadioGroup");
    return RadioGroup;
}(AbstractPureComponent2));

//# sourceMappingURL=radioGroup.js.map