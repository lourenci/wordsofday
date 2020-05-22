function extractProp (prop) {
  return function (object) {
    return object[prop]
  }
}

module.exports = extractProp
