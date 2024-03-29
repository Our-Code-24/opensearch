const {kv} = require("@vercel/kv")

async function bgq(q) {
    try {
        kv.get("analytics_data").then((val) => {
            let bigjson = val
            if (bigjson[q]) {
                bigjson[q]+= 1
            } else {
                bigjson[q] = 1
            }
            kv.set("analytics_data", JSON.stringify(bigjson)).then(() => {
                return 
            })
            })
    } catch (err) {
        console.log("Not working as expected:", err)
    }
}

function createApp() {
    return require("express")()
}

async function analytics(q) {
    kv.get("analytics_data").then((data) => {
        if (data) {
            bgq(q).then(() => {
                return
            })
        } else {
            kv.set("analytics_data", "{}").then(() => {
                bgq(q).then(() => {
                    return
                })
            })
        }
    })
}

module.exports = { rateLimiter: require(__dirname + "/ratelimiter/ratelimiter.js"), quickfunctions: {"createnewapp": createApp, "analyticstool": analytics} } ;
// I think this is making trouble