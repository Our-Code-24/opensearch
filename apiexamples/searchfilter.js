// Import Axios
const axios = require("axios")

// Make an HTTP GET Request (res is already put through a json parser)
axios.get("https://opensearch-mu.vercel.app/api/analytics").then((res) => {
  // Log how many times the term dogs was searched
  console.log(res.data["dogs"])
})