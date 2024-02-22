function createApp() {
    return require("express")()
}

// @ts-ignore
module.exports = { rateLimiter: require(__dirname + "/middlewares/ratelimiter.js"), quickfunctions: {createnewapp: createApp} } ;
// I think this is making trouble