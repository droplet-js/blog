var strategies = {
  // 不为空
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  // 限制最小长度
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  // 手机号码格式或电话号码格式
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value) && !/^0\d{2,3}-?\d{7,8}$/.test(value)) {
      return errorMsg
    }
  },
  isEmail: function (value, errorMsg) {
    if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
      return errorMsg
    }
  },
  isImage: function (type, errorMsg) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg')
    var r = type.match(/png|jpeg|bmp|gif/)
    if (!r) {
      return errorMsg
    }
  }
}

/**
 * @description 表单验证器
 * @author halapro.liu
 */
var Validator = function () {
  this.cache = []
}

Validator.prototype.add = function (value, rule, errorMsg) {
  var ary = rule.split(':')
  this.cache.push(function () {
    var strategy = ary.shift()
    ary.unshift(value)
    ary.push(errorMsg)
    return strategies[strategy].apply(null, ary)
  })
}

/* eslint-disable */
Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var msg = validatorFunc()
        if (msg) {
            return msg
        }
    }
}
/* eslint-enable */
module.exports = Validator
