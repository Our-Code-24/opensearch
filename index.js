const app = require("express")();
const port = 3000;
const axios = require("axios");
const apikey = process.env["API"]


app.use(require("cookie-parser")())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.get("/style.css", (req,res) => {
  res.sendFile(__dirname + "/style.css")
})

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js")
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
  <header>
    <h1>Open Search</h1>
    <form action="/search" method="GET">
      <input type="text" name="q" placeholder="Search..." id="search-bar">
      <button type="submit">Search</button>
    </form>
  </header>
  `;

  axios
    .get(
      "https://customsearch.googleapis.com/customsearch/v1?cx=16cbbe12944fc4eb4&gl=us&q=" + query + "&key=" + apikey
    )
    .then((value) => {
      value.data.items.forEach((item) => {
        mainhtml += `
          <div name="${item.cacheId}">
            <h2><a href="${item.formattedUrl}">${item.htmlTitle}</a></h2>
            <p>Von <a href="${item.displayLink}">${item.displayLink}</a></p>
            <p>${item.htmlSnippet}</p>
            <p><a href="${item.formattedUrl}">${item.htmlFormattedUrl}</a></p>
          </div>
        `;
      });
      mainhtml += "</body></html>";
      res.send(mainhtml);
    });
});

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

app.listen(port, () => {
  console.log("We are online on port", port);
});
