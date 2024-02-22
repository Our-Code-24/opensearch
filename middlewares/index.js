function createApp() {
    return require("express")()
}

// @ts-ignore
module.exports = { rateLimiter: require('./rateLimiter.js'), quickfunctions: {createnewapp: createApp} } ;
// I think this is making trouble