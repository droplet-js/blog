const UUID = require('../models/uuid')

function getId (name) {
    return new Promise((resolve, reject) => {
        UUID.findById(name).exec(function (err, obj) {
            if (obj) {
                UUID.findByIdAndUpdate(name, {$inc: {uuid: 1}}, (err, obj) => {
                    resolve(++obj.uuid)
                })
            } else {
                UUID.create({
                    _id: name,
                    uuid: 1
                }, (err, obj) => {
                    resolve(obj.uuid)
                })
            }
        })
    })
}

module.exports = {
    // 获取自增uuid
    async getUUID (name) {
        let uuid = await getId(name)
        return uuid
    }
}