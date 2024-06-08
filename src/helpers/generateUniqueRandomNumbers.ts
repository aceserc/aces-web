const generateUniqueRandomNumbers = (
  range: [number, number],
  length: number
): number[] => {
  const [min, max] = range;
  if (length > max - min + 1) {
    throw new Error("Length cannot be greater than range");
  }

  const numbers = new Set();

  while (numbers.size < length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNumber);
  }

  return Array.from(numbers) as number[];
};

export default generateUniqueRandomNumbers;
