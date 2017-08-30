import { naivePriorityQueue as priorityQueue } from './naivePriorityQueue';

export const graphPathfinder = (graph: any) => {

  const findPath = (start: string, goal: string) => {
    if (!graph.size) {
      return {
        path: null,
        cost: 0
      };
    }

    const frontier = priorityQueue();
    const explored = new Set();
    const previous = new Map();

    let path = [];
    let totalCost = 0;

    frontier.set(start, {
      weight: 0,
      o: null
    });

    while (frontier.length() !== 0) {
      let node = frontier.next();

      let nodeKey = node.key;
      if (nodeKey === goal) {
        totalCost = node.value.weight;

        while (previous.has(nodeKey)) {
          path.push(node);
          node = previous.get(nodeKey);
          nodeKey = node.key;
        }

        break;
      }

      explored.add(node.key);

      const neighbors = graph.get(node.key) || new Map();
      neighbors.forEach((val: any, key: any) => {
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

        const frontierPriority = frontier.get(key).value.weight;
        const nodeCost = node.value.weight + val.weight;

        if (nodeCost < frontierPriority) {
          previous.set(key, node);
          return frontier.set(key, {
            weight: nodeCost,
            o: val.o
          });
        }

        return null;
      });
    }

    if (!path.length) {
      return {
        path: null,
        cost: 0
      };
    }

    path.reverse();

    return {
      path,
      cost: totalCost,
    };
  };

  return {
    findPath
  };
};
