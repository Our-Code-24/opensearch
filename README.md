# opensearch
A open source google search app made with expressjs

[![CodeQL](https://github.com/Our-Code-24/opensearch/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Our-Code-24/opensearch/actions/workflows/github-code-scanning/codeql)
[![Report an bug](https://img.shields.io/badge/Report%20an%20bug-red?style=flat&link=https://github.com/Our-Code-24/opensearch/issues)](https://github.com/Our-Code-24/opensearch/issues)

## Changelog
- Added Darkmode
- Analytics are now avaible

## For data scientists
Need test data for your project? You can use an HTTP GET Request at <https://opensearch-mu.vercel.app/api/analytics> to get the latest data and trends!

Example (NodeJS):
```javascript
// Import Axios
const axios = require("axios")

// Make an HTTP GET Request (res is already put through a json parser)
axios.get("opensearch-mu.vercel.app/api/analytics").then((res) => {
  // Log how many times the term dogs was searched
  console.log(res["dogs"])
})
```
