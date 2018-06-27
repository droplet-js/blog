module.exports = {
    loadMiddlewares (app, middlewares) {
        if (middlewares.length === 0) return
        const middleware = middlewares.shift()
        if (!middleware) return
        app.use(middleware)
    }
}