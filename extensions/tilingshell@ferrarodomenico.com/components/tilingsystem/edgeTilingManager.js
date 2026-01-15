import {
  buildRectangle,
  isPointInsideRect,
  clampPointInsideRect
} from "../../utils/ui.js";
import { GObject } from "../../gi/ext.js";
import Settings from "../../settings/settings.js";
import { registerGObjectClass } from "../../utils/gjs.js";
const TOP_EDGE_TILING_OFFSET = 8;
const QUARTER_PERCENTAGE = 0.5;
const _EdgeTilingManager = class _EdgeTilingManager extends GObject.Object {
  _workArea;
  _quarterActivationPercentage;
  _edgeTilingOffset;
  // activation zones
  _topLeft;
  _topRight;
  _bottomLeft;
  _bottomRight;
  _topCenter;
  _leftCenter;
  _rightCenter;
  // current active zone
  _activeEdgeTile;
  constructor(initialWorkArea) {
    super();
    this._workArea = buildRectangle();
    this._topLeft = buildRectangle();
    this._topRight = buildRectangle();
    this._bottomLeft = buildRectangle();
    this._bottomRight = buildRectangle();
    this._topCenter = buildRectangle();
    this._leftCenter = buildRectangle();
    this._rightCenter = buildRectangle();
    this._activeEdgeTile = null;
    this.workarea = initialWorkArea;
    this._quarterActivationPercentage = Settings.QUARTER_TILING_THRESHOLD;
    Settings.bind(
      Settings.KEY_QUARTER_TILING_THRESHOLD,
      this,
      "quarterActivationPercentage"
    );
    this._edgeTilingOffset = Settings.EDGE_TILING_OFFSET;
    Settings.bind(
      Settings.KEY_EDGE_TILING_OFFSET,
      this,
      "edgeTilingOffset"
    );
  }

  set quarterActivationPercentage(value) {
    this._quarterActivationPercentage = value / 100;
    this._updateActivationZones();
  }

  set edgeTilingOffset(value) {
    this._edgeTilingOffset = value;
  }

  set workarea(newWorkArea) {
    this._workArea.x = newWorkArea.x;
    this._workArea.y = newWorkArea.y;
    this._workArea.width = newWorkArea.width;
    this._workArea.height = newWorkArea.height;
    this._updateActivationZones();
  }

  _updateActivationZones() {
    const width = Math.ceil(
      this._workArea.width * this._quarterActivationPercentage
    );
    const height = Math.ceil(
      this._workArea.height * this._quarterActivationPercentage
    );
    this._topLeft.x = this._workArea.x;
    this._topLeft.y = this._workArea.y;
    this._topLeft.width = width;
    this._topLeft.height = height;
    this._topRight.x = this._workArea.x + this._workArea.width - this._topLeft.width;
    this._topRight.y = this._topLeft.y;
    this._topRight.width = width;
    this._topRight.height = height;
    this._bottomLeft.x = this._workArea.x;
    this._bottomLeft.y = this._workArea.y + this._workArea.height - height;
    this._bottomLeft.width = width;
    this._bottomLeft.height = height;
    this._bottomRight.x = this._topRight.x;
    this._bottomRight.y = this._bottomLeft.y;
    this._bottomRight.width = width;
    this._bottomRight.height = height;
    this._topCenter.x = this._topLeft.x + this._topLeft.width;
    this._topCenter.y = this._topRight.y;
    this._topCenter.height = this._topRight.height;
    this._topCenter.width = this._topRight.x - this._topCenter.x;
    this._leftCenter.x = this._topLeft.x;
    this._leftCenter.y = this._topLeft.y + this._topLeft.height;
    this._leftCenter.height = this._bottomLeft.y - this._leftCenter.y;
    this._leftCenter.width = this._topLeft.width;
    this._rightCenter.x = this._topRight.x;
    this._rightCenter.y = this._topRight.y + this._topRight.height;
    this._rightCenter.height = this._bottomRight.y - this._rightCenter.y;
    this._rightCenter.width = this._topRight.width;
  }

  canActivateEdgeTiling(pointerPos) {
    return pointerPos.x <= this._workArea.x + this._edgeTilingOffset || pointerPos.y <= this._workArea.y + TOP_EDGE_TILING_OFFSET || pointerPos.x >= this._workArea.x + this._workArea.width - this._edgeTilingOffset || pointerPos.y >= this._workArea.y + this._workArea.height - this._edgeTilingOffset;
  }

  isPerformingEdgeTiling() {
    return this._activeEdgeTile !== null;
  }

  startEdgeTiling(pointerPos) {
    const { x, y } = clampPointInsideRect(pointerPos, this._workArea);
    const previewRect = buildRectangle();
    if (this._activeEdgeTile && isPointInsideRect({ x, y }, this._activeEdgeTile)) {
      return {
        changed: false,
        rect: previewRect
      };
    }
    if (!this._activeEdgeTile) this._activeEdgeTile = buildRectangle();
    previewRect.width = this._workArea.width * QUARTER_PERCENTAGE;
    previewRect.height = this._workArea.height * QUARTER_PERCENTAGE;
    previewRect.y = this._workArea.y;
    previewRect.x = this._workArea.x;
    if (isPointInsideRect({ x, y }, this._topCenter)) {
      previewRect.width = this._workArea.width;
      previewRect.height = this._workArea.height;
      this._activeEdgeTile = this._topCenter;
    } else if (isPointInsideRect({ x, y }, this._leftCenter)) {
      previewRect.width = this._workArea.width * QUARTER_PERCENTAGE;
      previewRect.height = this._workArea.height;
      this._activeEdgeTile = this._leftCenter;
    } else if (isPointInsideRect({ x, y }, this._rightCenter)) {
      previewRect.x = this._workArea.x + this._workArea.width - previewRect.width;
      previewRect.width = this._workArea.width * QUARTER_PERCENTAGE;
      previewRect.height = this._workArea.height;
      this._activeEdgeTile = this._rightCenter;
    } else if (x <= this._workArea.x + this._workArea.width / 2) {
      if (isPointInsideRect({ x, y }, this._topLeft)) {
        this._activeEdgeTile = this._topLeft;
      } else if (isPointInsideRect({ x, y }, this._bottomLeft)) {
        previewRect.y = this._workArea.y + this._workArea.height - previewRect.height;
        this._activeEdgeTile = this._bottomLeft;
      } else {
        return {
          changed: false,
          rect: previewRect
        };
      }
    } else {
      previewRect.x = this._workArea.x + this._workArea.width - previewRect.width;
      if (isPointInsideRect({ x, y }, this._topRight)) {
        this._activeEdgeTile = this._topRight;
      } else if (isPointInsideRect({ x, y }, this._bottomRight)) {
        previewRect.y = this._workArea.y + this._workArea.height - previewRect.height;
        this._activeEdgeTile = this._bottomRight;
      } else {
        return {
          changed: false,
          rect: previewRect
        };
      }
    }
    return {
      changed: true,
      rect: previewRect
    };
  }

  needMaximize() {
    return this._activeEdgeTile !== null && Settings.TOP_EDGE_MAXIMIZE && this._activeEdgeTile === this._topCenter;
  }

  abortEdgeTiling() {
    this._activeEdgeTile = null;
  }
};
registerGObjectClass(_EdgeTilingManager, {
  GTypeName: "EdgeTilingManager",
  Properties: {
    quarterActivationPercentage: GObject.ParamSpec.uint(
      "quarterActivationPercentage",
      "quarterActivationPercentage",
      "Threshold to trigger quarter tiling",
      GObject.ParamFlags.READWRITE,
      1,
      50,
      40
    ),
    edgeTilingOffset: GObject.ParamSpec.uint(
      "edgeTilingOffset",
      "edgeTilingOffset",
      "Offset to trigger edge tiling",
      GObject.ParamFlags.READWRITE,
      1,
      250,
      16
    )
  }
});
let EdgeTilingManager = _EdgeTilingManager;
export {
  EdgeTilingManager as default
};
