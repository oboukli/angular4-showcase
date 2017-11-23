"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var naivePriorityQueue_1 = require("./naivePriorityQueue");
exports.graphPathfinder = function (graph) {
    var findPath = function (start, goal) {
        if (!graph.size) {
            return {
                path: null,
                cost: 0
            };
        }
        var frontier = naivePriorityQueue_1.naivePriorityQueue();
        var explored = new Set();
        var previous = new Map();
        var path = [];
        var totalCost = 0;
        frontier.set(start, {
            weight: 0,
            o: null
        });
        var _loop_1 = function () {
            var node = frontier.next();
            var nodeKey = node.key;
            if (nodeKey === goal) {
                totalCost = node.value.weight;
                while (previous.has(nodeKey)) {
                    path.push(node);
                    node = previous.get(nodeKey);
                    nodeKey = node.key;
                }
                return "break";
            }
            explored.add(node.key);
            var neighbors = graph.get(node.key) || new Map();
            neighbors.forEach(function (val, key) {
                if (explored.has(key)) {
                    return null;
                }
                if (!frontier.has(key)) {
                    previous.set(key, node);
                    return frontier.set(key, {
                        weight: (node.value.weight + val.weight),
                        o: val.o
                    });
                }
                var frontierPriority = frontier.get(key).value.weight;
                var nodeCost = node.value.weight + val.weight;
                if (nodeCost < frontierPriority) {
                    previous.set(key, node);
                    return frontier.set(key, {
                        weight: nodeCost,
                        o: val.o
                    });
                }
                return null;
            });
        };
        while (frontier.length() !== 0) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        if (!path.length) {
            return {
                path: null,
                cost: 0
            };
        }
        path.reverse();
        return {
            path: path,
            cost: totalCost,
        };
    };
    return {
        findPath: findPath
    };
};
//# sourceMappingURL=graphPathfinder.js.map