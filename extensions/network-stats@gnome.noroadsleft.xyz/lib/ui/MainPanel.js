import * as Main from "resource:///org/gnome/shell/ui/main.js";
/*
 * MainPanel class manager class for adding removing things from panel.
 */
export class MainPanel {
    /**
     * Gets the right box from the panel
     * @returns right box
     */
    get rightBox() {
        if ("_rightBox" in Main.panel) {
            return Main.panel["_rightBox"];
        }
        return Main.panel;
    }
    /**
     * Adds the child to the right box
     * @param child - child to add
     */
    addChild(child) {
        this.rightBox.insert_child_at_index(child, 0);
    }
    /**
     * Removes the child from the right box
     * @param child - child to remove
     */
    removeChild(child) {
        this.rightBox.remove_child(child);
    }
    /**
     * Adds the view to the status area at top right
     * @param view - view to add
     */
    addToStatusArea(view) {
        Main.panel.addToStatusArea("NetworkStatsStatusView", view, 0, "right");
    }
    /**
     * Removes the view from the status area at top right
     * @param view - view to remove
     */
    removeFromStatusArea(view) {
        view.destroy();
    }
}
