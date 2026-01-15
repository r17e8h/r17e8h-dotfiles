import { registerGObjectClass } from "../../utils/gjs.js";
import { Shell } from "../../gi/ext.js";
import TilePreview from "./tilePreview.js";
const _BlurTilePreview = class _BlurTilePreview extends TilePreview {
  _init() {
    super._init();
    const sigma = 36;
    this.add_effect(
      new Shell.BlurEffect({
        // @ts-expect-error "sigma is available"
        sigma,
        // radius: sigma * 2,
        brightness: 1,
        mode: Shell.BlurMode.BACKGROUND
        // blur what is behind the widget
      })
    );
    this.add_style_class_name("blur-tile-preview");
  }
};
registerGObjectClass(_BlurTilePreview);
let BlurTilePreview = _BlurTilePreview;
export {
  BlurTilePreview as default
};
