const generateUniqueRandomNumbers = (
  range: [number, number],
  count: number,
): number[] => {
  const [min, max] = range;
  const numbers = new Set<number>();

  while (numbers.size < count) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(random);
  }

  return Array.from(numbers);
};

export default generateUniqueRandomNumbers;
