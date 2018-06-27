const util = require('util')

function JsonError (message) {
    Error.call(this, message)
}

util.inherits(JsonError, Error)

function PageError (message) {
    Error.call(this, message)
}

util.inherits(PageError, Error)

module.exports = {
    JsonError,
    PageError
}