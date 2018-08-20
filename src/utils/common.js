export default {
    // 是否支持webworker
    isSupportWebWorker () {
        return typeof Worker !== 'undefined'
    },
    // 保存cookie
    setCookie (cName, value, expireseconds) {
        var exdate = new Date()
        exdate.setTime(exdate.getTime() + expireseconds * 1000)
        document.cookie = cName + '=' + escape(value) +
            ((expireseconds == null) ? '' : ';expires=' + exdate.toGMTString())
    },
    // 获取cookie
    getCookie (cName) {
        var cStart, cEnd
        if (document.cookie.length > 0) {
            cStart = document.cookie.indexOf(cName + '=')
            if (cStart !== -1) {
                cStart = cStart + cName.length + 1
                cEnd = document.cookie.indexOf(';', cStart)
                if (cEnd === -1) {
                    cEnd = document.cookie.length
                }

                return unescape(document.cookie.substring(cStart, cEnd))
            }
        }

        return ''
    },
    cookie (name, value, expireseconds) {
        if (value) {
            this.setCookie(name, value, expireseconds)
        } else {
            return this.getCookie(name)
        }
    },
    delCookie (name) {
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getCookie(name)
        if (cval != null) {
            document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
        }
    }
}
