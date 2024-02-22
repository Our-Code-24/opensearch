function createApp() {
    return require("express")()
}

// @ts-ignore
console.log(__dirname)
module.exports = { rateLimiter: require(__dirname + "/middlewares/ratelimiter"), quickfunctions: {createnewapp: createApp} } ;
// I think this is making trouble