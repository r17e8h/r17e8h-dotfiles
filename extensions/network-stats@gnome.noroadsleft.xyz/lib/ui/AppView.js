import Clutter from "gi://Clutter";
import St from "gi://St";
import { MainPanel } from "./MainPanel.js";
import { PopupView } from "./PopupView.js";
/*
 * AppView class is manager class for managing UI show/hide/enable/disable.
 */
export class AppView {
    _logger;
    _appSettingsModel;
    _mainPanel;
    _statusFontSize = 0;
    _label;
    _button;
    _popupView;
    _settingsChanged = false;
    constructor(_logger, _appSettingsModel) {
        this._logger = _logger;
        this._appSettingsModel = _appSettingsModel;
        this._mainPanel = new MainPanel();
        const { label, button } = this.createLayout();
        this._label = label;
        this._button = button;
        this._appSettingsModel.subscribe(() => {
            this._settingsChanged = true;
        });
    }
    destructor() {
        // @ts-ignore
        this._label = undefined;
        // @ts-ignore
        this._button = undefined;
    }
    /**
     * Creates the layout for the app view
     */
    createLayout() {
        const button = new St.Bin({
            style_class: "panel-button",
            reactive: true,
            can_focus: true,
            x_expand: true,
            y_expand: false,
            track_hover: true
        });
        const label = new St.Label({
            text: "---",
            y_align: Clutter.ActorAlign.CENTER,
            style_class: "main-label"
        });
        button.set_child(label);
        button.connect("button-press-event", this.showDropDown);
        return { label, button };
    }
    /**
     * Updates the popup view with the stats from the device model.
     * @param deviceModel - DevicePresenter instance
     */
    update(deviceModel) {
        if (!this._popupView) {
            return;
        }
        const stats = deviceModel.getViewModel();
        const menuItems = this._popupView.menuItems();
        if (this._settingsChanged) {
            this._settingsChanged = false;
            const menuKeys = Object.keys(menuItems);
            const statsKeys = Object.keys(stats);
            if (menuKeys.length !== statsKeys.length ||
                menuKeys.some((key) => !statsKeys.includes(key))) {
                this._popupView.clearMenuItems();
            }
        }
        for (const stat of Object.values(stats)) {
            this._popupView.updateItem(stat);
        }
    }
    /**
     * Updates the top status bar text
     * @param text - text to display in status bar
     */
    setTitleText(text) {
        this._label.set_text(text);
        if (this._popupView) {
            this._popupView.setTitleText(text);
        }
    }
    /**
     * Updates the text size of top bar text
     * @param size - text size
     */
    setTitleTextSize(size) {
        if (this._statusFontSize !== size && size >= 10) {
            this._statusFontSize = size;
            this._label.style += `font-size: ${size}px`;
            if (this._popupView) {
                this._popupView.setTitleTextSize(size);
            }
        }
    }
    /**
     * Shows the drop down menu
     */
    showDropDown() {
        this._logger.debug("Show the drop down", this);
    }
    /**
     * Shows the popup view
     */
    show() {
        if (!this._popupView) {
            this._popupView = new PopupView(this._logger, this._appSettingsModel);
        }
        this._mainPanel.addToStatusArea(this._popupView);
    }
    /**
     * Hides the popup view
     */
    hide() {
        if (this._popupView) {
            this._popupView.destroy();
            this._popupView = undefined;
        }
    }
}
