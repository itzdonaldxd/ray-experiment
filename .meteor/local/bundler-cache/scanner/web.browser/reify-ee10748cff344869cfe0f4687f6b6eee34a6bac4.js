module.export({positionToPlacement:()=>positionToPlacement});let Position;module.link("../../common/position",{Position(v){Position=v}},0);/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

/**
 * Convert a position to a placement.
 * @param position the position to convert
 */
function positionToPlacement(position) {
    /* istanbul ignore next */
    switch (position) {
        case Position.TOP_LEFT:
            return "top-start";
        case Position.TOP:
            return "top";
        case Position.TOP_RIGHT:
            return "top-end";
        case Position.RIGHT_TOP:
            return "right-start";
        case Position.RIGHT:
            return "right";
        case Position.RIGHT_BOTTOM:
            return "right-end";
        case Position.BOTTOM_RIGHT:
            return "bottom-end";
        case Position.BOTTOM:
            return "bottom";
        case Position.BOTTOM_LEFT:
            return "bottom-start";
        case Position.LEFT_BOTTOM:
            return "left-end";
        case Position.LEFT:
            return "left";
        case Position.LEFT_TOP:
            return "left-start";
        case "auto":
        case "auto-start":
        case "auto-end":
            // Return the string unchanged.
            return position;
        default:
            return assertNever(position);
    }
}
/* istanbul ignore next */
function assertNever(x) {
    throw new Error("Unexpected position: " + x);
}
//# sourceMappingURL=popoverMigrationUtils.js.map