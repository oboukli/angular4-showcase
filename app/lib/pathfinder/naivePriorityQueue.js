"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.naivePriorityQueue = function () {
    var keys = new Set();
    var queue = [];
    var sort = function () {
        queue.sort(function (a, b) { return a.value.weight - b.value.weight; });
    };
    var set = function (key, value) {
        if (!keys.has(key)) {
            keys.add(key);
            queue.push({
                key: key,
                value: value
            });
        }
        else {
            queue.map(function (element) {
                if (element.key === key) {
                    Object.assign(element, {
                        value: value
                    });
                }
                return element;
            });
        }
        sort();
        return queue.length;
    };
    var next = function () {
        var element = queue.shift();
        keys.delete(element.key);
        return element;
    };
    var length = function () {
        return queue.length;
    };
    var has = function (key) {
        return keys.has(key);
    };
    var get = function (key) {
        return queue.find(function (element) { return element.key === key; });
    };
    return {
        set: set,
        get: get,
        has: has,
        next: next,
        length: length
    };
};
//# sourceMappingURL=naivePriorityQueue.js.map