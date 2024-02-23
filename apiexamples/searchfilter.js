// Import Axios
const axios = require("axios")

// Make an HTTP GET Request (res is already put through a json parser)
axios.get("https://opensearch-mu.vercel.app/api/analytics").then((res) => {
  // Log how many times the term dogs and cats was searched
  console.log(res.data["dogs"])
  console.log(res.data["cats"])
  if (res.data["dogs"] > res.data["cats"]) {
    console.log("Our universe is stable!")
  } else {
    console.log("We're doomed")
  }
})
