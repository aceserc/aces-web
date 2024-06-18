const generateRandomNumber = (
  range: [number, number],
  excludeRange: [number, number]
) => {
  const [min, max] = range;
  const [excludeMin, excludeMax] = excludeRange;

  if (min >= max || excludeMin >= excludeMax) {
    throw new Error("Invalid range or exclude range");
  }

  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber >= excludeMin && randomNumber <= excludeMax);

  return randomNumber;
};

export default generateRandomNumber;
