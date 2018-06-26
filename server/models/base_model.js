let baseModel = (schema, options) => {
    schema.pre('save', (next) => {
        next()
    })
}

export default baseModel
