export const parseStringToList = (stringList) => {
  if (stringList) {
    return JSON.parse(stringList);
  }
  return [];
};

export const removeItem = (array, target) => {
  const set = new Set(array);
  set.delete(target);
  return Array.from(set);
};
