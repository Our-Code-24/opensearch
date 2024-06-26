# opensearch
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
A open source google search app made with expressjs

[![CodeQL](https://github.com/Our-Code-24/opensearch/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Our-Code-24/opensearch/actions/workflows/github-code-scanning/codeql)
[![Report an bug](https://img.shields.io/badge/Report%20an%20bug-red?style=flat&link=https://github.com/Our-Code-24/opensearch/issues)](https://github.com/Our-Code-24/opensearch/issues/new?assignees=Stoppedwumm%2C+StoppedwummSites&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D+A+informative+title)
[![Give Feedback](https://img.shields.io/badge/Give%20feedback-orange?style=flat&link=https://opensearch-mu.vercel.app/beta/feedback)](https://opensearch-mu.vercel.app/beta/feedback)
## Changelog
- Rewards are now avaible!
- Republished site so I get my access back

## For data scientists
Need test data for your project? You can use an HTTP GET Request at <https://opensearch-mu.vercel.app/api/analytics> to get the latest data and trends!

Example (NodeJS):
```javascript
// Import Axios
const axios = require("axios")

// Make an HTTP GET Request (res is already put through a json parser)
axios.get("https://opensearch-mu.vercel.app/api/analytics").then((res) => {
  // Log how many times the term dogs was searched
  console.log(res.data["dogs"])
})
```

**WE DO NOT GURANTEE ACCURATE DATA**

If you try getting us in trouble, we will refer to this line.

## Devs

Thanks goes to these developers:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Stoppedwumm"><img src="https://avatars.githubusercontent.com/u/129097720?v=4?s=100" width="100px;" alt="Stoppedwumm"/><br /><sub><b>Stoppedwumm</b></sub></a><br /><a href="https://github.com/Our-Code-24/opensearch/commits?author=Stoppedwumm" title="Code">💻</a> <a href="#design-Stoppedwumm" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/StoppedwummSites"><img src="https://avatars.githubusercontent.com/u/150438484?v=4?s=100" width="100px;" alt="StoppedwummSites"/><br /><sub><b>StoppedwummSites</b></sub></a><br /><a href="https://github.com/Our-Code-24/opensearch/commits?author=StoppedwummSites" title="Code">💻</a> <a href="#design-StoppedwummSites" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://vercel.com"><img src="https://avatars.githubusercontent.com/u/14985020?v=4?s=100" width="100px;" alt="Vercel"/><br /><sub><b>Vercel</b></sub></a><br /><a href="#platform-vercel" title="Packaging/porting to new platform">📦</a> <a href="#tool-vercel" title="Tools">🔧</a> <a href="https://github.com/Our-Code-24/opensearch/commits?author=vercel" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://allcontributors.org"><img src="https://avatars.githubusercontent.com/u/46410174?v=4?s=100" width="100px;" alt="All Contributors"/><br /><sub><b>All Contributors</b></sub></a><br /><a href="https://github.com/Our-Code-24/opensearch/commits?author=all-contributors" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
