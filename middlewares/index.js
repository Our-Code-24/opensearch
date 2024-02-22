function createApp() {
    return require("express")()
}

// @ts-ignore
console.log(__dirname)

module.exports = { rateLimiter: require(__dirname + "/ratelimiter/ratelimiter.js"), quickfunctions: {createnewapp: createApp} } ;
// I think this is making trouble