function zip(array1, array2) {
  return array1.reduce((acc, cur, idx) => [...acc, [cur, array2[idx]]], [])
}

module.exports = zip
