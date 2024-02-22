function createApp() {
    return require("express")()
}

module.exports = { rateLimiter: require(__dirname + "/ratelimiter/ratelimiter.js"), quickfunctions: {createnewapp: createApp} } ;