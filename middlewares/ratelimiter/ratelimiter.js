const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 100,
    message: 'You have exceeded the 100 requests in 1 hr limit!', 
    standardHeaders: true,
    legacyHeaders: false,
  })