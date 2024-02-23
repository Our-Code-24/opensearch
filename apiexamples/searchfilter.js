const axios = require("axios")
axios.get("https://openseacrh-mu.vercel.app/api/analytics").then((res) => {
  console.log(res["dawg"])
})
