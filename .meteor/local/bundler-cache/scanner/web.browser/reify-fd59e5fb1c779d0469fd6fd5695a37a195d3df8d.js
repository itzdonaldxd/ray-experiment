module.export({PopoverArrow:()=>PopoverArrow});let React;module.link("react",{"*"(v){React=v}},0);let Classes;module.link("../../common/classes",{"*"(v){Classes=v}},1);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},2);let getPosition;module.link("./popperUtils",{getPosition(v){getPosition=v}},3);/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */




// these paths come from the Core Kit Sketch file
// https://github.com/palantir/blueprint/blob/develop/resources/sketch/Core%20Kit.sketch
var SVG_SHADOW_PATH = "M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378" +
    "-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z";
var SVG_ARROW_PATH = "M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005" +
    "c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z";
/** Modifier helper function to compute arrow rotate() transform */
function getArrowAngle(placement) {
    if (placement == null) {
        return 0;
    }
    // can only be top/left/bottom/right - auto is resolved internally
    switch (getPosition(placement)) {
        case "top":
            return -90;
        case "left":
            return 180;
        case "bottom":
            return 90;
        default:
            return 0;
    }
}
var PopoverArrow = function (_a) {
    var _b = _a.arrowProps, ref = _b.ref, style = _b.style, placement = _a.placement;
    return (React.createElement("div", { className: Classes.POPOVER_ARROW, ref: ref, style: isNaN(style.left) ? {} : style },
        React.createElement("svg", { viewBox: "0 0 30 30", style: { transform: "rotate(" + getArrowAngle(placement) + "deg)" } },
            React.createElement("path", { className: Classes.POPOVER_ARROW + "-border", d: SVG_SHADOW_PATH }),
            React.createElement("path", { className: Classes.POPOVER_ARROW + "-fill", d: SVG_ARROW_PATH }))));
};
PopoverArrow.displayName = DISPLAYNAME_PREFIX + ".PopoverArrow";
//# sourceMappingURL=popoverArrow.js.map