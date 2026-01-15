import GObject from "gi://GObject";
/**
 * Registers the UI components as GObject.
 * @param target - UI component Class
 * @returns object
 */
export function registerGObjectClass(target) {
    if (Object.prototype.hasOwnProperty.call(target, "metaInfo")) {
        // @ts-ignore
        return GObject.registerClass(target.metaInfo, target);
    }
    else {
        // @ts-ignore
        return GObject.registerClass(target);
    }
}
