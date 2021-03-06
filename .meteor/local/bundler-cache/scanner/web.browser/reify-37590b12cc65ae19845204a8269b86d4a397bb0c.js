module.export({NumericInput:()=>NumericInput});let __assign,__extends;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v}},0);let classNames;module.link("classnames",{default(v){classNames=v}},1);let React;module.link("react",{"*"(v){React=v}},2);let AbstractPureComponent2,Classes,DISPLAYNAME_PREFIX,Intent,Keys,Position,refHandler,removeNonHTMLProps,setRef,Utils;module.link("../../common",{AbstractPureComponent2(v){AbstractPureComponent2=v},Classes(v){Classes=v},DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v},Intent(v){Intent=v},Keys(v){Keys=v},Position(v){Position=v},refHandler(v){refHandler=v},removeNonHTMLProps(v){removeNonHTMLProps=v},setRef(v){setRef=v},Utils(v){Utils=v}},3);let Errors;module.link("../../common/errors",{"*"(v){Errors=v}},4);let ButtonGroup;module.link("../button/buttonGroup",{ButtonGroup(v){ButtonGroup=v}},5);let Button;module.link("../button/buttons",{Button(v){Button=v}},6);let ControlGroup;module.link("./controlGroup",{ControlGroup(v){ControlGroup=v}},7);let InputGroup;module.link("./inputGroup",{InputGroup(v){InputGroup=v}},8);let clampValue,getValueOrEmptyValue,isValidNumericKeyboardEvent,isValueNumeric,parseStringToStringNumber,sanitizeNumericInput,toLocaleString,toMaxPrecision;module.link("./numericInputUtils",{clampValue(v){clampValue=v},getValueOrEmptyValue(v){getValueOrEmptyValue=v},isValidNumericKeyboardEvent(v){isValidNumericKeyboardEvent=v},isValueNumeric(v){isValueNumeric=v},parseStringToStringNumber(v){parseStringToStringNumber=v},sanitizeNumericInput(v){sanitizeNumericInput=v},toLocaleString(v){toLocaleString=v},toMaxPrecision(v){toMaxPrecision=v}},9);/*
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










var IncrementDirection;
(function (IncrementDirection) {
    IncrementDirection[IncrementDirection["DOWN"] = -1] = "DOWN";
    IncrementDirection[IncrementDirection["UP"] = 1] = "UP";
})(IncrementDirection || (IncrementDirection = {}));
var NON_HTML_PROPS = [
    "allowNumericCharactersOnly",
    "buttonPosition",
    "clampValueOnBlur",
    "className",
    "defaultValue",
    "majorStepSize",
    "minorStepSize",
    "onButtonClick",
    "onValueChange",
    "selectAllOnFocus",
    "selectAllOnIncrement",
    "stepSize",
];
var NumericInput = /** @class */ (function (_super) {
    __extends(NumericInput, _super);
    function NumericInput() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = {
            currentImeInputInvalid: false,
            shouldSelectAfterUpdate: false,
            stepMaxPrecision: NumericInput.getStepMaxPrecision(_this.props),
            value: getValueOrEmptyValue((_a = _this.props.value) !== null && _a !== void 0 ? _a : _this.props.defaultValue),
        };
        // updating these flags need not trigger re-renders, so don't include them in this.state.
        _this.didPasteEventJustOccur = false;
        _this.delta = 0;
        _this.inputElement = null;
        _this.inputRef = refHandler(_this, "inputElement", _this.props.inputRef);
        _this.incrementButtonHandlers = _this.getButtonEventHandlers(IncrementDirection.UP);
        _this.decrementButtonHandlers = _this.getButtonEventHandlers(IncrementDirection.DOWN);
        _this.handleButtonClick = function (e, direction) {
            var _a, _b;
            var delta = _this.updateDelta(direction, e);
            var nextValue = _this.incrementValue(delta);
            (_b = (_a = _this.props).onButtonClick) === null || _b === void 0 ? void 0 : _b.call(_a, Number(parseStringToStringNumber(nextValue, _this.props.locale)), nextValue);
        };
        _this.stopContinuousChange = function () {
            _this.delta = 0;
            _this.clearTimeouts();
            clearInterval(_this.intervalId);
            document.removeEventListener("mouseup", _this.stopContinuousChange);
        };
        _this.handleContinuousChange = function () {
            var _a, _b, _c, _d;
            // If either min or max prop is set, when reaching the limit
            // the button will be disabled and stopContinuousChange will be never fired,
            // hence the need to check on each iteration to properly clear the timeout
            if (_this.props.min !== undefined || _this.props.max !== undefined) {
                var min = (_a = _this.props.min) !== null && _a !== void 0 ? _a : -Infinity;
                var max = (_b = _this.props.max) !== null && _b !== void 0 ? _b : Infinity;
                var valueAsNumber = Number(parseStringToStringNumber(_this.state.value, _this.props.locale));
                if (valueAsNumber <= min || valueAsNumber >= max) {
                    _this.stopContinuousChange();
                    return;
                }
            }
            var nextValue = _this.incrementValue(_this.delta);
            (_d = (_c = _this.props).onButtonClick) === null || _d === void 0 ? void 0 : _d.call(_c, Number(parseStringToStringNumber(nextValue, _this.props.locale)), nextValue);
        };
        // Callbacks - Input
        // =================
        _this.handleInputFocus = function (e) {
            var _a, _b;
            // update this state flag to trigger update for input selection (see componentDidUpdate)
            _this.setState({ shouldSelectAfterUpdate: _this.props.selectAllOnFocus });
            (_b = (_a = _this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        _this.handleInputBlur = function (e) {
            var _a, _b;
            // always disable this flag on blur so it's ready for next time.
            _this.setState({ shouldSelectAfterUpdate: false });
            if (_this.props.clampValueOnBlur) {
                var value = e.target.value;
                _this.handleNextValue(_this.roundAndClampValue(value));
            }
            (_b = (_a = _this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        _this.handleInputKeyDown = function (e) {
            var _a, _b;
            if (_this.props.disabled || _this.props.readOnly) {
                return;
            }
            // eslint-disable-next-line deprecation/deprecation
            var keyCode = e.keyCode;
            var direction;
            if (keyCode === Keys.ARROW_UP) {
                direction = IncrementDirection.UP;
            }
            else if (keyCode === Keys.ARROW_DOWN) {
                direction = IncrementDirection.DOWN;
            }
            if (direction !== undefined) {
                // when the input field has focus, some key combinations will modify
                // the field's selection range. we'll actually want to select all
                // text in the field after we modify the value on the following
                // lines. preventing the default selection behavior lets us do that
                // without interference.
                e.preventDefault();
                var delta = _this.updateDelta(direction, e);
                _this.incrementValue(delta);
            }
            (_b = (_a = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        _this.handleCompositionEnd = function (e) {
            if (_this.props.allowNumericCharactersOnly) {
                _this.handleNextValue(sanitizeNumericInput(e.data, _this.props.locale));
                _this.setState({ currentImeInputInvalid: false });
            }
        };
        _this.handleCompositionUpdate = function (e) {
            if (_this.props.allowNumericCharactersOnly) {
                var data = e.data;
                var sanitizedValue = sanitizeNumericInput(data, _this.props.locale);
                if (sanitizedValue.length === 0 && data.length > 0) {
                    _this.setState({ currentImeInputInvalid: true });
                }
                else {
                    _this.setState({ currentImeInputInvalid: false });
                }
            }
        };
        _this.handleInputKeyPress = function (e) {
            var _a, _b;
            // we prohibit keystrokes in onKeyPress instead of onKeyDown, because
            // e.key is not trustworthy in onKeyDown in all browsers.
            if (_this.props.allowNumericCharactersOnly && !isValidNumericKeyboardEvent(e, _this.props.locale)) {
                e.preventDefault();
            }
            (_b = (_a = _this.props).onKeyPress) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        _this.handleInputPaste = function (e) {
            var _a, _b;
            _this.didPasteEventJustOccur = true;
            (_b = (_a = _this.props).onPaste) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        _this.handleInputChange = function (e) {
            var value = e.target.value;
            var nextValue = value;
            if (_this.props.allowNumericCharactersOnly && _this.didPasteEventJustOccur) {
                _this.didPasteEventJustOccur = false;
                nextValue = sanitizeNumericInput(value, _this.props.locale);
            }
            _this.handleNextValue(nextValue);
            _this.setState({ shouldSelectAfterUpdate: false });
        };
        return _this;
    }
    NumericInput.getDerivedStateFromProps = function (props, state) {
        var _a, _b;
        var nextState = {
            prevMaxProp: props.max,
            prevMinProp: props.min,
        };
        var didMinChange = props.min !== state.prevMinProp;
        var didMaxChange = props.max !== state.prevMaxProp;
        var didBoundsChange = didMinChange || didMaxChange;
        // in controlled mode, use props.value
        // in uncontrolled mode, if state.value has not been assigned yet (upon initial mount), use props.defaultValue
        var value = (_b = (_a = props.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : state.value;
        var stepMaxPrecision = NumericInput.getStepMaxPrecision(props);
        var sanitizedValue = value !== NumericInput.VALUE_EMPTY
            ? NumericInput.roundAndClampValue(value, stepMaxPrecision, props.min, props.max, 0, props.locale)
            : NumericInput.VALUE_EMPTY;
        // if a new min and max were provided that cause the existing value to fall
        // outside of the new bounds, then clamp the value to the new valid range.
        if (didBoundsChange && sanitizedValue !== state.value) {
            return __assign(__assign({}, nextState), { stepMaxPrecision: stepMaxPrecision, value: sanitizedValue });
        }
        return __assign(__assign({}, nextState), { stepMaxPrecision: stepMaxPrecision, value: value });
    };
    // Value Helpers
    // =============
    NumericInput.getStepMaxPrecision = function (props) {
        if (props.minorStepSize != null) {
            return Utils.countDecimalPlaces(props.minorStepSize);
        }
        else {
            return Utils.countDecimalPlaces(props.stepSize);
        }
    };
    NumericInput.roundAndClampValue = function (value, stepMaxPrecision, min, max, delta, locale) {
        if (delta === void 0) { delta = 0; }
        if (!isValueNumeric(value, locale)) {
            return NumericInput.VALUE_EMPTY;
        }
        var currentValue = parseStringToStringNumber(value, locale);
        var nextValue = toMaxPrecision(Number(currentValue) + delta, stepMaxPrecision);
        var clampedValue = clampValue(nextValue, min, max);
        return toLocaleString(clampedValue, locale);
    };
    NumericInput.prototype.render = function () {
        var _a;
        var _b = this.props, buttonPosition = _b.buttonPosition, className = _b.className, fill = _b.fill, large = _b.large;
        var containerClasses = classNames(Classes.NUMERIC_INPUT, (_a = {}, _a[Classes.LARGE] = large, _a), className);
        var buttons = this.renderButtons();
        return (React.createElement(ControlGroup, { className: containerClasses, fill: fill },
            buttonPosition === Position.LEFT && buttons,
            this.renderInput(),
            buttonPosition === Position.RIGHT && buttons));
    };
    NumericInput.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b, _c;
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
        if (prevProps.inputRef !== this.props.inputRef) {
            setRef(prevProps.inputRef, null);
            this.inputRef = refHandler(this, "inputElement", this.props.inputRef);
            setRef(this.props.inputRef, this.inputElement);
        }
        if (this.state.shouldSelectAfterUpdate) {
            (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.setSelectionRange(0, this.state.value.length);
        }
        var didMinChange = this.props.min !== prevProps.min;
        var didMaxChange = this.props.max !== prevProps.max;
        var didBoundsChange = didMinChange || didMaxChange;
        var didLocaleChange = this.props.locale !== prevProps.locale;
        var didValueChange = this.state.value !== prevState.value;
        if ((didBoundsChange && didValueChange) || (didLocaleChange && prevState.value !== NumericInput.VALUE_EMPTY)) {
            // we clamped the value due to a bounds change, so we should fire the change callback
            var valueToParse = didLocaleChange ? prevState.value : this.state.value;
            var valueAsString = parseStringToStringNumber(valueToParse, prevProps.locale);
            var localizedValue = toLocaleString(+valueAsString, this.props.locale);
            (_c = (_b = this.props).onValueChange) === null || _c === void 0 ? void 0 : _c.call(_b, +valueAsString, localizedValue, this.inputElement);
        }
    };
    NumericInput.prototype.validateProps = function (nextProps) {
        var majorStepSize = nextProps.majorStepSize, max = nextProps.max, min = nextProps.min, minorStepSize = nextProps.minorStepSize, stepSize = nextProps.stepSize, value = nextProps.value;
        if (min != null && max != null && min > max) {
            console.error(Errors.NUMERIC_INPUT_MIN_MAX);
        }
        if (stepSize <= 0) {
            console.error(Errors.NUMERIC_INPUT_STEP_SIZE_NON_POSITIVE);
        }
        if (minorStepSize && minorStepSize <= 0) {
            console.error(Errors.NUMERIC_INPUT_MINOR_STEP_SIZE_NON_POSITIVE);
        }
        if (majorStepSize && majorStepSize <= 0) {
            console.error(Errors.NUMERIC_INPUT_MAJOR_STEP_SIZE_NON_POSITIVE);
        }
        if (minorStepSize && minorStepSize > stepSize) {
            console.error(Errors.NUMERIC_INPUT_MINOR_STEP_SIZE_BOUND);
        }
        if (majorStepSize && majorStepSize < stepSize) {
            console.error(Errors.NUMERIC_INPUT_MAJOR_STEP_SIZE_BOUND);
        }
        // controlled mode
        if (value != null) {
            var stepMaxPrecision = NumericInput.getStepMaxPrecision(nextProps);
            var sanitizedValue = NumericInput.roundAndClampValue(value.toString(), stepMaxPrecision, min, max, 0, this.props.locale);
            var valueDoesNotMatch = sanitizedValue !== value.toString();
            var localizedValue = toLocaleString(Number(parseStringToStringNumber(value, this.props.locale)), this.props.locale);
            var isNotLocalized = sanitizedValue !== localizedValue;
            if (valueDoesNotMatch && isNotLocalized) {
                console.warn(Errors.NUMERIC_INPUT_CONTROLLED_VALUE_INVALID);
            }
        }
    };
    // Render Helpers
    // ==============
    NumericInput.prototype.renderButtons = function () {
        var _a = this.props, intent = _a.intent, max = _a.max, min = _a.min, locale = _a.locale;
        var value = parseStringToStringNumber(this.state.value, locale);
        var disabled = this.props.disabled || this.props.readOnly;
        var isIncrementDisabled = max !== undefined && value !== "" && +value >= max;
        var isDecrementDisabled = min !== undefined && value !== "" && +value <= min;
        return (React.createElement(ButtonGroup, { className: Classes.FIXED, key: "button-group", vertical: true },
            React.createElement(Button, __assign({ "aria-label": "increment", disabled: disabled || isIncrementDisabled, icon: "chevron-up", intent: intent }, this.incrementButtonHandlers)),
            React.createElement(Button, __assign({ "aria-label": "decrement", disabled: disabled || isDecrementDisabled, icon: "chevron-down", intent: intent }, this.decrementButtonHandlers))));
    };
    NumericInput.prototype.renderInput = function () {
        var inputGroupHtmlProps = removeNonHTMLProps(this.props, NON_HTML_PROPS, true);
        return (React.createElement(InputGroup, __assign({ asyncControl: this.props.asyncControl, autoComplete: "off" }, inputGroupHtmlProps, { intent: this.state.currentImeInputInvalid ? Intent.DANGER : this.props.intent, inputRef: this.inputRef, large: this.props.large, leftIcon: this.props.leftIcon, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onChange: this.handleInputChange, onCompositionEnd: this.handleCompositionEnd, onCompositionUpdate: this.handleCompositionUpdate, onKeyDown: this.handleInputKeyDown, onKeyPress: this.handleInputKeyPress, onPaste: this.handleInputPaste, rightElement: this.props.rightElement, value: this.state.value })));
    };
    // Callbacks - Buttons
    // ===================
    NumericInput.prototype.getButtonEventHandlers = function (direction) {
        var _this = this;
        return {
            // keydown is fired repeatedly when held so it's implicitly continuous
            onKeyDown: function (evt) {
                // eslint-disable-next-line deprecation/deprecation
                if (!_this.props.disabled && Keys.isKeyboardClick(evt.keyCode)) {
                    _this.handleButtonClick(evt, direction);
                }
            },
            onMouseDown: function (evt) {
                if (!_this.props.disabled) {
                    _this.handleButtonClick(evt, direction);
                    _this.startContinuousChange();
                }
            },
        };
    };
    NumericInput.prototype.startContinuousChange = function () {
        var _this = this;
        // The button's onMouseUp event handler doesn't fire if the user
        // releases outside of the button, so we need to watch all the way
        // from the top.
        document.addEventListener("mouseup", this.stopContinuousChange);
        // Initial delay is slightly longer to prevent the user from
        // accidentally triggering the continuous increment/decrement.
        this.setTimeout(function () {
            _this.intervalId = window.setInterval(_this.handleContinuousChange, NumericInput.CONTINUOUS_CHANGE_INTERVAL);
        }, NumericInput.CONTINUOUS_CHANGE_DELAY);
    };
    // Data logic
    // ==========
    NumericInput.prototype.handleNextValue = function (valueAsString) {
        var _a, _b;
        if (this.props.value == null) {
            this.setState({ value: valueAsString });
        }
        (_b = (_a = this.props).onValueChange) === null || _b === void 0 ? void 0 : _b.call(_a, Number(parseStringToStringNumber(valueAsString, this.props.locale)), valueAsString, this.inputElement);
    };
    NumericInput.prototype.incrementValue = function (delta) {
        // pretend we're incrementing from 0 if currValue is empty
        var currValue = this.state.value === NumericInput.VALUE_EMPTY ? NumericInput.VALUE_ZERO : this.state.value;
        var nextValue = this.roundAndClampValue(currValue, delta);
        if (nextValue !== this.state.value) {
            this.handleNextValue(nextValue);
            this.setState({ shouldSelectAfterUpdate: this.props.selectAllOnIncrement });
        }
        // return value used in continuous change updates
        return nextValue;
    };
    NumericInput.prototype.getIncrementDelta = function (direction, isShiftKeyPressed, isAltKeyPressed) {
        var _a = this.props, majorStepSize = _a.majorStepSize, minorStepSize = _a.minorStepSize, stepSize = _a.stepSize;
        if (isShiftKeyPressed && majorStepSize != null) {
            return direction * majorStepSize;
        }
        else if (isAltKeyPressed && minorStepSize != null) {
            return direction * minorStepSize;
        }
        else {
            return direction * stepSize;
        }
    };
    NumericInput.prototype.roundAndClampValue = function (value, delta) {
        if (delta === void 0) { delta = 0; }
        return NumericInput.roundAndClampValue(value, this.state.stepMaxPrecision, this.props.min, this.props.max, delta, this.props.locale);
    };
    NumericInput.prototype.updateDelta = function (direction, e) {
        this.delta = this.getIncrementDelta(direction, e.shiftKey, e.altKey);
        return this.delta;
    };
    NumericInput.displayName = "".concat(DISPLAYNAME_PREFIX, ".NumericInput");
    NumericInput.VALUE_EMPTY = "";
    NumericInput.VALUE_ZERO = "0";
    NumericInput.defaultProps = {
        allowNumericCharactersOnly: true,
        buttonPosition: Position.RIGHT,
        clampValueOnBlur: false,
        defaultValue: NumericInput.VALUE_EMPTY,
        large: false,
        majorStepSize: 10,
        minorStepSize: 0.1,
        selectAllOnFocus: false,
        selectAllOnIncrement: false,
        stepSize: 1,
    };
    NumericInput.CONTINUOUS_CHANGE_DELAY = 300;
    NumericInput.CONTINUOUS_CHANGE_INTERVAL = 100;
    return NumericInput;
}(AbstractPureComponent2));

//# sourceMappingURL=numericInput.js.map