const { rateLimiter, quickfunctions } = require('./src/middlewares/index.js');
const app = quickfunctions.createnewapp()
const port = 3000;
const axios = require("axios");
const {kv} = require("@vercel/kv")
const { load } = require("cheerio")

let analyticsdata = {}
if (process.env["API"]) {
  
} else {
  require("dotenv").config({path: ".env.development.local"})
}

function sanitizeString(input) {
  // Use a regular expression to remove any HTML tags and script-related patterns
  const sanitizedString = input.replace(/<[^>]*>|&(?:(?:#x[0-9a-fA-F]+)|(?:#d[0-9]+)|[a-zA-Z]+);|<\s*\/\s*script\s*>/g, '');

  // Optionally, escape special characters to prevent XSS
  const escapedString = sanitizedString.replace(/[<>&]/g, char => {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;'
    }[char];
  });

  return escapedString;
}

const apikey = process.env["API"]


app.use(require("cookie-parser")())

app.get("/", (req, res) => {
  res.redirect("/beta")
})

app.get("/betatest.pdf", (req, res) => {
  res.sendFile(__dirname + "/betatest.pdf")
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
  <div id="warning">
      <p>This is a beta site, expect some bugs</p>
      <button onclick='window.location.href="/beta/feedback"'>Give Feedback</button>
    </div><br>
  `;

if (query == "" || query == undefined) {
  res.send(`Search cannot be empty<br><br><button onclick='window.location.href="/"'>Back</button><link rel="stylesheet" href="style.css"><meta name="viewport" content="width=device-width, initial-scale=1.0">`)
  return
}

  axios.get("https://customsearch.googleapis.com/customsearch/v1?cx=16cbbe12944fc4eb4&gl=de&q=" + sanitizeString(query) + "&key=" + apikey).then((value) => {
        value.data.items.forEach((item) => {
          axios.get("localhost:3000/api/preview?url=" + item.formattedUrl).then((axiosresult) => {
          console.log(axiosresult)
          mainhtml += `
            <div name="${item.cacheId}">
              <h2><a href="${item.formattedUrl}">${item.htmlTitle}</a></h2>
              <p>Von <a href="${item.displayLink}">${item.displayLink}</a></p>
              <p>${item.htmlSnippet}</p>
              <p><a href="${item.formattedUrl}">${item.htmlFormattedUrl}</a></p><br>
              <img src="${axiosresult.image}>
            </div>
          `;
        })
        mainhtml += "</body><script src='/analytics.js'></script><script src='/search.js'></script><script src='/search-cookies.js'></script></html>";
        res.send(mainhtml);
        })
      }).catch((err) => {
        console.log(err)
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
      bigjson.push(req.query)
      kv.set("betafeedback", bigjson).then(() => {
        res.redirect("/")
      })
    } else {
      kv.set("betafeedback", "[]").then(() => {
        kv.get("betafeedback").then((newval) => {
          let bigjson = newval
          bigjson.push(req.query)
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

app.get("/api/preview", async (req, res) => {
  try {
    //get url to generate preview, the url will be based as a query param.

    const { url } = sanitizeString(req.query);
    /*request url html document*/
    const { data } = await axios.get(url);
    //load html document in cheerio
    const $ = load(data);

    /*function to get needed values from meta tags to generate preview*/
    const getMetaTag = (name) => {
      return (
        $(`meta[name=${name}]`).attr("content") ||
        $(`meta[propety="twitter${name}"]`).attr("content") ||
        $(`meta[property="og:${name}"]`).attr("content")
      );
    };

    /*Fetch values into an object */
    const preview = {
      url,
      title: $("title").first().text(),
      favicon:
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="alternate icon"]').attr("href"),
      description: getMetaTag("description"),
      image: getMetaTag("image"),
      author: getMetaTag("author"),
    };

    //Send object as response
    res.status(200).json(preview);
  } catch (error) {
    res
      .status(500)
      .json(
        "Something went wrong, please check your internet connection and also the url you provided"
      );
  }
});

app.listen(port, () => {
  console.log("We are online on port", port);
});
