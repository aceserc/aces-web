const debounce = <A extends any[]>(func: (...args: A) => any, delay = 300) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: A) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  };
};

export default debounce;
