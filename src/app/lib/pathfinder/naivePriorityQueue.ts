export const naivePriorityQueue = () => {
  const keys = new Set();
  const queue: any[] = [];

  const sort = () => {
    queue.sort((a, b) => a.value.weight - b.value.weight);
  };

  const set = (key: string, value: any) => {
    if (!keys.has(key)) {
      keys.add(key);
      queue.push({
        key,
        value
      });
    } else {
      queue.map(element => {
        if (element.key === key) {
          Object.assign(element, {
            value
          });
        }

        return element;
      });
    }

    sort();
    return queue.length;
  };

  const next = () => {
    const element = queue.shift();
    keys.delete(element.key);

    return element;
  };

  const length = () => {
    return queue.length;
  };

  const has = (key: string) => {
    return keys.has(key);
  };

  const get = (key: string) => {
    return queue.find(element => element.key === key);
  };

  return {
    set,
    get,
    has,
    next,
    length
  };
};
