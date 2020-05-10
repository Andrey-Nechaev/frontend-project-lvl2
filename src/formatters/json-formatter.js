const jsonRender = (diffs) => {
  const result = JSON.stringify(diffs);
  // Поскольку diffs это массив, отсекаем символы "[" и "]" с обеих концов строки.
  return result.slice(1, result.length - 2);
};

export default jsonRender;
