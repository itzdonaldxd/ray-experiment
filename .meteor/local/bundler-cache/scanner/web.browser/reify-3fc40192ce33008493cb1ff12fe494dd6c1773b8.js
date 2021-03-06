module.export({Portal:()=>Portal});let tslib_1;module.link("tslib",{"*"(v){tslib_1=v}},0);let React;module.link("react",{"*"(v){React=v}},1);let ReactDOM;module.link("react-dom",{"*"(v){ReactDOM=v}},2);let Classes;module.link("../../common/classes",{"*"(v){Classes=v}},3);let Errors;module.link("../../common/errors",{"*"(v){Errors=v}},4);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},5);let isFunction;module.link("../../common/utils",{isFunction(v){isFunction=v}},6);/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */







/** Detect if `React.createPortal()` API method does not exist. */
var cannotCreatePortal = !isFunction(ReactDOM.createPortal);
var REACT_CONTEXT_TYPES = {
    blueprintPortalClassName: function (obj, key) {
        if (obj[key] != null && typeof obj[key] !== "string") {
            return new Error(Errors.PORTAL_CONTEXT_CLASS_NAME_STRING);
        }
        return undefined;
    },
};
/**
 * This component detaches its contents and re-attaches them to document.body.
 * Use it when you need to circumvent DOM z-stacking (for dialogs, popovers, etc.).
 * Any class names passed to this element will be propagated to the new container element on document.body.
 */
var Portal = /** @class */ (function (_super) {
    tslib_1.__extends(Portal, _super);
    function Portal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { hasMounted: false };
        return _this;
    }
    Portal.prototype.render = function () {
        // Only render `children` once this component has mounted in a browser environment, so they are
        // immediately attached to the DOM tree and can do DOM things like measuring or `autoFocus`.
        // See long comment on componentDidMount in https://reactjs.org/docs/portals.html#event-bubbling-through-portals
        if (cannotCreatePortal || typeof document === "undefined" || !this.state.hasMounted) {
            return null;
        }
        else {
            return ReactDOM.createPortal(this.props.children, this.portalElement);
        }
    };
    Portal.prototype.componentDidMount = function () {
        this.portalElement = this.createContainerElement();
        document.body.appendChild(this.portalElement);
        this.setState({ hasMounted: true }, this.props.onChildrenMount);
        if (cannotCreatePortal) {
            this.unstableRenderNoPortal();
        }
    };
    Portal.prototype.componentDidUpdate = function (prevProps) {
        // update className prop on portal DOM element
        if (this.portalElement != null && prevProps.className !== this.props.className) {
            this.portalElement.classList.remove(prevProps.className);
            maybeAddClass(this.portalElement.classList, this.props.className);
        }
        if (cannotCreatePortal) {
            this.unstableRenderNoPortal();
        }
    };
    Portal.prototype.componentWillUnmount = function () {
        if (this.portalElement != null) {
            if (cannotCreatePortal) {
                ReactDOM.unmountComponentAtNode(this.portalElement);
            }
            this.portalElement.remove();
        }
    };
    Portal.prototype.createContainerElement = function () {
        var container = document.createElement("div");
        container.classList.add(Classes.PORTAL);
        maybeAddClass(container.classList, this.props.className);
        if (this.context != null) {
            maybeAddClass(container.classList, this.context.blueprintPortalClassName);
        }
        return container;
    };
    Portal.prototype.unstableRenderNoPortal = function () {
        ReactDOM.unstable_renderSubtreeIntoContainer(
        /* parentComponent */ this, React.createElement("div", null, this.props.children), this.portalElement);
    };
    Portal.displayName = DISPLAYNAME_PREFIX + ".Portal";
    Portal.contextTypes = REACT_CONTEXT_TYPES;
    return Portal;
}(React.Component));

function maybeAddClass(classList, className) {
    if (className != null && className !== "") {
        classList.add.apply(classList, className.split(" "));
    }
}
//# sourceMappingURL=portal.js.map