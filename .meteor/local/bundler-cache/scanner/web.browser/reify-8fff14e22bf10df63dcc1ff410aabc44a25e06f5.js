module.export({Toaster:()=>Toaster,OverlayToaster:()=>OverlayToaster});let __assign,__extends,__spreadArray;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v},__spreadArray(v){__spreadArray=v}},0);let classNames;module.link("classnames",{default(v){classNames=v}},1);let React;module.link("react",{"*"(v){React=v}},2);let ReactDOM;module.link("react-dom",{"*"(v){ReactDOM=v}},3);let AbstractPureComponent2,Classes,Position;module.link("../../common",{AbstractPureComponent2(v){AbstractPureComponent2=v},Classes(v){Classes=v},Position(v){Position=v}},4);let TOASTER_CREATE_NULL,TOASTER_MAX_TOASTS_INVALID,TOASTER_WARN_INLINE;module.link("../../common/errors",{TOASTER_CREATE_NULL(v){TOASTER_CREATE_NULL=v},TOASTER_MAX_TOASTS_INVALID(v){TOASTER_MAX_TOASTS_INVALID=v},TOASTER_WARN_INLINE(v){TOASTER_WARN_INLINE=v}},5);let ESCAPE;module.link("../../common/keys",{ESCAPE(v){ESCAPE=v}},6);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},7);let isNodeEnv;module.link("../../common/utils",{isNodeEnv(v){isNodeEnv=v}},8);let Overlay;module.link("../overlay/overlay",{Overlay(v){Overlay=v}},9);let Toast;module.link("./toast",{Toast(v){Toast=v}},10);/*
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











var Toaster = /** @class */ (function (_super) {
    __extends(Toaster, _super);
    function Toaster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            toasts: [],
        };
        // auto-incrementing identifier for un-keyed toasts
        _this.toastId = 0;
        _this.renderToast = function (toast) {
            return React.createElement(Toast, __assign({}, toast, { onDismiss: _this.getDismissHandler(toast) }));
        };
        _this.getDismissHandler = function (toast) { return function (timeoutExpired) {
            _this.dismiss(toast.key, timeoutExpired);
        }; };
        _this.handleClose = function (e) {
            // NOTE that `e` isn't always a KeyboardEvent but that's the only type we care about
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            /* eslint-disable-next-line deprecation/deprecation */
            if (e.which === ESCAPE) {
                _this.clear();
            }
        };
        return _this;
    }
    /**
     * Create a new `Toaster` instance that can be shared around your application.
     * The `Toaster` will be rendered into a new element appended to the given container.
     */
    Toaster.create = function (props, container) {
        if (container === void 0) { container = document.body; }
        if (props != null && props.usePortal != null && !isNodeEnv("production")) {
            console.warn(TOASTER_WARN_INLINE);
        }
        var containerElement = document.createElement("div");
        container.appendChild(containerElement);
        var toaster = ReactDOM.render(React.createElement(Toaster, __assign({}, props, { usePortal: false })), containerElement);
        if (toaster == null) {
            throw new Error(TOASTER_CREATE_NULL);
        }
        return toaster;
    };
    Toaster.prototype.show = function (props, key) {
        if (this.props.maxToasts) {
            // check if active number of toasts are at the maxToasts limit
            this.dismissIfAtLimit();
        }
        var options = this.createToastOptions(props, key);
        if (key === undefined || this.isNewToastKey(key)) {
            this.setState(function (prevState) { return ({
                toasts: __spreadArray([options], prevState.toasts, true),
            }); });
        }
        else {
            this.setState(function (prevState) { return ({
                toasts: prevState.toasts.map(function (t) { return (t.key === key ? options : t); }),
            }); });
        }
        return options.key;
    };
    Toaster.prototype.dismiss = function (key, timeoutExpired) {
        if (timeoutExpired === void 0) { timeoutExpired = false; }
        this.setState(function (_a) {
            var toasts = _a.toasts;
            return ({
                toasts: toasts.filter(function (t) {
                    var _a;
                    var matchesKey = t.key === key;
                    if (matchesKey) {
                        (_a = t.onDismiss) === null || _a === void 0 ? void 0 : _a.call(t, timeoutExpired);
                    }
                    return !matchesKey;
                }),
            });
        });
    };
    Toaster.prototype.clear = function () {
        this.state.toasts.forEach(function (t) { var _a; return (_a = t.onDismiss) === null || _a === void 0 ? void 0 : _a.call(t, false); });
        this.setState({ toasts: [] });
    };
    Toaster.prototype.getToasts = function () {
        return this.state.toasts;
    };
    Toaster.prototype.render = function () {
        var classes = classNames(Classes.TOAST_CONTAINER, this.getPositionClasses(), this.props.className);
        return (React.createElement(Overlay, { autoFocus: this.props.autoFocus, canEscapeKeyClose: this.props.canEscapeKeyClear, canOutsideClickClose: false, className: classes, enforceFocus: false, hasBackdrop: false, isOpen: this.state.toasts.length > 0 || this.props.children != null, onClose: this.handleClose, shouldReturnFocusOnClose: false, 
            // $pt-transition-duration * 3 + $pt-transition-duration / 2
            transitionDuration: 350, transitionName: Classes.TOAST, usePortal: this.props.usePortal },
            this.state.toasts.map(this.renderToast, this),
            this.props.children));
    };
    Toaster.prototype.validateProps = function (_a) {
        var maxToasts = _a.maxToasts;
        // maximum number of toasts should not be a number less than 1
        if (maxToasts !== undefined && maxToasts < 1) {
            throw new Error(TOASTER_MAX_TOASTS_INVALID);
        }
    };
    Toaster.prototype.isNewToastKey = function (key) {
        return this.state.toasts.every(function (toast) { return toast.key !== key; });
    };
    Toaster.prototype.dismissIfAtLimit = function () {
        if (this.state.toasts.length === this.props.maxToasts) {
            // dismiss the oldest toast to stay within the maxToasts limit
            this.dismiss(this.state.toasts[this.state.toasts.length - 1].key);
        }
    };
    Toaster.prototype.createToastOptions = function (props, key) {
        if (key === void 0) { key = "toast-".concat(this.toastId++); }
        // clone the object before adding the key prop to avoid leaking the mutation
        return __assign(__assign({}, props), { key: key });
    };
    Toaster.prototype.getPositionClasses = function () {
        var positions = this.props.position.split("-");
        // NOTE that there is no -center class because that's the default style
        return __spreadArray(__spreadArray([], positions.map(function (p) { return "".concat(Classes.TOAST_CONTAINER, "-").concat(p.toLowerCase()); }), true), [
            "".concat(Classes.TOAST_CONTAINER, "-").concat(this.props.usePortal ? "in-portal" : "inline"),
        ], false);
    };
    Toaster.displayName = "".concat(DISPLAYNAME_PREFIX, ".Toaster");
    Toaster.defaultProps = {
        autoFocus: false,
        canEscapeKeyClear: true,
        position: Position.TOP,
        usePortal: true,
    };
    return Toaster;
}(AbstractPureComponent2));

var OverlayToaster = Toaster;
//# sourceMappingURL=toaster.js.map