# opensearch
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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

## Devs

Thanks goes to these developers:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Stoppedwumm"><img src="https://avatars.githubusercontent.com/u/129097720?v=4?s=100" width="100px;" alt="Stoppedwumm"/><br /><sub><b>Stoppedwumm</b></sub></a><br /><a href="https://github.com/Our-Code-24/opensearch/commits?author=Stoppedwumm" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/StoppedwummSites"><img src="https://avatars.githubusercontent.com/u/150438484?v=4?s=100" width="100px;" alt="StoppedwummSites"/><br /><sub><b>StoppedwummSites</b></sub></a><br /><a href="https://github.com/Our-Code-24/opensearch/commits?author=StoppedwummSites" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
