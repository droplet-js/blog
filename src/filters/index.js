// 截取字符串
export const wordFilter = function (value, len) {
  return value.length > len ? value.substr(0, len) + '...' : value
}
