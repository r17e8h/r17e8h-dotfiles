export const kExtensionId = "network-stats@gnome.noroadsleft.xyz";
export const kSchemaName = "org.gnome.shell.extensions.network-stats";
export const kGtextDomain = "network-stats";
export const kRefreshInterval = 2 * 1000; // seconds
export var DeviceType;
(function (DeviceType) {
    DeviceType["ETHERNET"] = "ethernet";
    DeviceType["WIFI"] = "wifi";
    DeviceType["BLUETOOTH"] = "bt";
    DeviceType["OLPCMESH"] = "olpcmesh";
    DeviceType["WIMAX"] = "wimax";
    DeviceType["MODEM"] = "modem";
    DeviceType["NONE"] = "none";
})(DeviceType || (DeviceType = {}));
export var DisplayMode;
(function (DisplayMode) {
    DisplayMode["TOTAL_SPEED"] = "total_speed";
    DisplayMode["UPLOAD_SPEED"] = "upload_speed";
    DisplayMode["DOWNLOAD_SPEED"] = "download_speed";
    DisplayMode["BOTH_SPEED"] = "both_speed";
    DisplayMode["TOTAL_DATA"] = "total_data";
    DisplayMode["DEFAULT"] = "total_speed";
})(DisplayMode || (DisplayMode = {}));
export var ResetSchedule;
(function (ResetSchedule) {
    ResetSchedule["DAILY"] = "daily";
    ResetSchedule["WEEKLY"] = "weekly";
    ResetSchedule["BIWEEKLY"] = "biweekly";
    ResetSchedule["MONTHLY"] = "monthly";
    ResetSchedule["NEVER"] = "never";
})(ResetSchedule || (ResetSchedule = {}));
export var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["MONDAY"] = "monday";
    DayOfWeek["TUESDAY"] = "tuesday";
    DayOfWeek["WEDNESDAY"] = "wednesday";
    DayOfWeek["THURSDAY"] = "thursday";
    DayOfWeek["FRIDAY"] = "friday";
    DayOfWeek["SATURDAY"] = "saturday";
    DayOfWeek["SUNDAY"] = "sunday";
})(DayOfWeek || (DayOfWeek = {}));
export var DevicesListType;
(function (DevicesListType) {
    DevicesListType["ALL"] = "all";
    DevicesListType["ACTIVE"] = "active";
    DevicesListType["METERED"] = "metered";
    DevicesListType["PREFERED"] = "prefered";
    DevicesListType["NON_DUMMY"] = "non_dummy";
    DevicesListType["DEFAULT"] = "all";
})(DevicesListType || (DevicesListType = {}));
/* Sync these constants properly with schema file */
export var SettingKeys;
(function (SettingKeys) {
    SettingKeys["REFRESH_INTERVAL"] = "refresh-interval";
    SettingKeys["DISPLAY_MODE"] = "display-mode";
    SettingKeys["RESET_SCHEDULE"] = "reset-schedule";
    SettingKeys["RESET_WEEK_DAY"] = "reset-week-day";
    SettingKeys["RESET_MONTH_DAY"] = "reset-month-day";
    SettingKeys["RESET_HOURS"] = "reset-hours";
    SettingKeys["RESET_MINUTES"] = "reset-minutes";
    SettingKeys["DEVICES_INFO"] = "devices-info";
    SettingKeys["PREFERED_DEVICE"] = "prefered-device";
    SettingKeys["DISPLAY_BYTES"] = "display-bytes";
    SettingKeys["STATUS_SHOW_ICON"] = "show-icon";
    SettingKeys["STATUS_FONT_SIZE"] = "status-font-size";
    SettingKeys["RESET_ALL_STATS"] = "reset-all-stats";
    SettingKeys["DEVICES_LIST_TYPE"] = "devices-list-type";
})(SettingKeys || (SettingKeys = {}));
