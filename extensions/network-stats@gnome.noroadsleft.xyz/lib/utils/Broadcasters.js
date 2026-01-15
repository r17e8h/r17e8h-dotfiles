import { EventBroadcaster } from "./EventBroadcaster.js";
export class Broadcasters {
    _deviceResetMessageBroadcaster;
    _titleClickedMessageBroadcaster;
    static _instance;
    static getInstance() {
        if (!this._instance) {
            this._instance = new Broadcasters();
        }
        return this._instance;
    }
    static releaseInstance() {
        if (!this._instance) {
            return;
        }
        this._instance._deviceResetMessageBroadcaster?.destructor();
        this._instance._titleClickedMessageBroadcaster?.destructor();
        this._instance = undefined;
    }
    constructor() {
        this._deviceResetMessageBroadcaster = new EventBroadcaster();
        this._titleClickedMessageBroadcaster = new EventBroadcaster();
    }
    static get deviceResetMessageBroadcaster() {
        return Broadcasters.getInstance()._deviceResetMessageBroadcaster;
    }
    static get titleClickedMessageBroadcaster() {
        return Broadcasters.getInstance()._titleClickedMessageBroadcaster;
    }
}
