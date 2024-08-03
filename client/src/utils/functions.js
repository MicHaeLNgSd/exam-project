/**
 * @param {array} arrToSort
 * @param {String} param
 * @param {array} orderArr
 * @returns new array sorted by arrToSort.param position in orderArr
 */
export const sortByArr = (arrToSort, param, orderArr) => {
  const array = [...arrToSort];
  array.sort((a, b) => orderArr.indexOf(a[param]) - orderArr.indexOf(b[param]));
  return array;
};
