module.export({getPosition:()=>getPosition,isVerticalPosition:()=>isVerticalPosition,getOppositePosition:()=>getOppositePosition,getAlignment:()=>getAlignment,getTransformOrigin:()=>getTransformOrigin,arrowOffsetModifier:()=>arrowOffsetModifier});/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
// Popper placement utils
// ======================
/** Converts a full placement to one of the four positions by stripping text after the `-`. */
function getPosition(placement) {
    return placement.split("-")[0];
}
/** Returns true if position is left or right. */
function isVerticalPosition(side) {
    return ["left", "right"].indexOf(side) !== -1;
}
/** Returns the opposite position. */
function getOppositePosition(side) {
    switch (side) {
        case "top":
            return "bottom";
        case "left":
            return "right";
        case "bottom":
            return "top";
        default:
            return "left";
    }
}
/** Returns the CSS alignment keyword corresponding to given placement. */
function getAlignment(placement) {
    var align = placement.split("-")[1];
    switch (align) {
        case "start":
            return "left";
        case "end":
            return "right";
        default:
            return "center";
    }
}
// Popper modifiers
// ================
/** Modifier helper function to compute popper transform-origin based on arrow position */
function getTransformOrigin(data) {
    var position = getPosition(data.placement);
    if (data.arrowElement == null) {
        return isVerticalPosition(position)
            ? getOppositePosition(position) + " " + getAlignment(position)
            : getAlignment(position) + " " + getOppositePosition(position);
    }
    else {
        var arrowSizeShift = data.arrowElement.clientHeight / 2;
        var arrow = data.offsets.arrow;
        // can use keyword for dimension without the arrow, to ease computation burden.
        // move origin by half arrow's height to keep it centered.
        return isVerticalPosition(position)
            ? getOppositePosition(position) + " " + (arrow.top + arrowSizeShift) + "px"
            : arrow.left + arrowSizeShift + "px " + getOppositePosition(position);
    }
}
// additional space between arrow and edge of target
var ARROW_SPACING = 4;
/** Popper modifier that offsets popper and arrow so arrow points out of the correct side */
var arrowOffsetModifier = function (data) {
    if (data.arrowElement == null) {
        return data;
    }
    // our arrows have equal width and height
    var arrowSize = data.arrowElement.clientWidth;
    // this logic borrowed from original Popper arrow modifier itself
    var position = getPosition(data.placement);
    var isVertical = isVerticalPosition(position);
    var len = isVertical ? "width" : "height";
    var offsetSide = isVertical ? "left" : "top";
    var arrowOffsetSize = Math.round(arrowSize / 2 / Math.sqrt(2));
    // offset popover by arrow size, offset arrow in the opposite direction
    if (position === "top" || position === "left") {
        // the "up & back" directions require negative popper offsets
        data.offsets.popper[offsetSide] -= arrowOffsetSize + ARROW_SPACING;
        // can only use left/top on arrow so gotta get clever with 100% + X
        data.offsets.arrow[offsetSide] = data.offsets.popper[len] - arrowSize + arrowOffsetSize;
    }
    else {
        data.offsets.popper[offsetSide] += arrowOffsetSize + ARROW_SPACING;
        data.offsets.arrow[offsetSide] = -arrowOffsetSize;
    }
    return data;
};
//# sourceMappingURL=popperUtils.js.map