const { rateLimiter, quickfunctions } = require('./src/middlewares/index.js');
const app = quickfunctions.createnewapp()
const port = 3000;
const axios = require("axios");
const {kv} = require("@vercel/kv")

function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

let analyticsdata = {}
if (process.env["API"]) {
  
} else {
  require("dotenv").config({path: ".env.development.local"})
}

const apikey = process.env["API"]


app.use(require("cookie-parser")())

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.redirect("/beta")
})

app.get("/beta", (req, res) => {
  res.sendFile(__dirname + "/html/index.html")
});

app.get("/style.css", (req,res) => {
  res.sendFile(__dirname + "/html/style.css")
})

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/publicjs/script.js")
})

app.get("/search", (req, res) => {
  const query = req.query["q"];
  let mainhtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
  <div id="overlay">
    <div id="popup">
      <p>This site uses cookies! Also, you can help us make this site better by enabling analytics</p>
      <button onclick="consentdisable()">Accept and disable analytics</button>
      <button onclick="consentenable()">Accept and enable analytics</button>
    </div>
  </div> 
  <header>
    <h1><a href="/">OpenSearch</a></h1>
    <form action="/search" method="GET">
      <input type="text" name="q" placeholder="Search..." id="search-bar">
      <button type="submit">Search</button>
    </form>
  </header>
  `;

if (query == "" || query == undefined) {
  res.send(`Search cannot be empty<br><br><button onclick='window.location.href="/"'>Back</button><link rel="stylesheet" href="style.css"><meta name="viewport" content="width=device-width, initial-scale=1.0">`)
  return
}

  axios.get("https://customsearch.googleapis.com/customsearch/v1?cx=16cbbe12944fc4eb4&gl=de&q=" + query + "&key=" + apikey).then((value) => {
      value.data.items.forEach((item) => {
        mainhtml += `
          <div name="${item.cacheId}">
            <h2><a href="${item.formattedUrl}">${item.htmlTitle}</a></h2>
            <p>Von <a href="${item.displayLink}">${item.displayLink}</a></p>
            <p>${item.htmlSnippet}</p>
            <p><a href="${item.formattedUrl}">${item.htmlFormattedUrl}</a></p>
          </div>
        `;
      })
      mainhtml += "</body><script src='/analytics.js'></script><script src='/search.js'></script><script src='/search-cookies.js'></script></html>";
      res.send(mainhtml);
    }).catch((err) => {
      res.status(500).send(`
      <error>
      <h1>Error: ${err}</h1>
      </error>
      Please open a bug issue at <a href="https://github.com/Our-Code-24/opensearch/issues">our github repo</a>
      `)
    })
})

app.get("/settings", (req, res) => {
  let answer = {}

  if (req.cookies["cookies-consent"]) {
    answer["cookies-consent"] = req.cookies["cookies-consent"]
  } else {
    answer["cookies-consent"] = "undefined"
  }
  
  if (req.cookies["analytics"]) {
    answer["analytics"] = req.cookies["analytics"]
  } else {
    answer["analytics"] = "undefined"
  }
  

  res.send(JSON.stringify(answer))
})

app.get("/set-settings", (req, res) => {
  const cookiesconsent = req.query["cookiesconsent"]
  const analytics = req.query["analytics"]


    res.cookie("cookies-consent", cookiesconsent)
    res.cookie("analytics", analytics)
    res.sendStatus(200)

})

app.get("/analytics.js", (req, res) => {
  res.sendFile(__dirname + "/publicjs/analytics.js")
})

app.get("/api/analytics/report", (req, res) => {
  const searchquery = req.query["q"]

  quickfunctions.analyticstool(searchquery).then(() => {
    res.sendStatus(200)
  })
})

app.get("/api/analytics", (req, res) => {
  kv.get("analytics_data").then((val) => {
    res.send(val)
  })
})

app.get("/search.js", (req, res) => {
  res.sendFile(__dirname + "/publicjs/search.js")
})

app.get("/search-cookies.js", (req, res) => {
  res.sendFile(__dirname + "/publicjs/searchcookies.js")
})

app.get("/beta/feedback", (req, res) => {
  res.sendFile(__dirname + "/html/beta.html")
})

app.get("/api/beta/feedback/report", (req, res) => {
  kv.get("betafeedback").then((val) => {
    if (val != undefined) {
      let bigjson = val
      bigjson.push(sanitize(req.query))
      kv.set("betafeedback", bigjson).then(() => {
        res.redirect("/")
      })
    } else {
      kv.set("betafeedback", "[]").then(() => {
        kv.get("betafeedback").then((newval) => {
          let bigjson = newval
          bigjson.push(sanitize(req.query))
          kv.set("betafeedback", bigjson).then(() => {
            res.redirect("/")
          })
        })
      })
    }
  })
})

app.get("/api/beta/feedback", (req, res) => {
  kv.get("betafeedback").then((val) => {
    if (sanitize(req.query["code"]) == process.env["FEEDBACK"]) {
      res.send(val)
    } else {
      res.sendStatus(403)
    }
  })
})

app.listen(port, () => {
  console.log("We are online on port", port);
});
