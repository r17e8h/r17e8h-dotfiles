/**
 * ReverseMap helps you looks up keys based on values.
 */
export class ReverseMap {
    _reverseMap;
    _forwardMap;
    constructor(obj) {
        this._reverseMap = {};
        this._forwardMap = {};
        for (const key in obj) {
            // @ts-ignore
            const value = obj[key];
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                this._reverseMap[value] = key;
                this._forwardMap[key] = value;
            }
        }
    }
    getKey(value, defaultIndex) {
        return this._reverseMap[value] ?? defaultIndex;
    }
    getValue(index) {
        return this._forwardMap[index];
    }
}
