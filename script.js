const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = searchBar.value;
    if (searchQuery) {
      window.location.href = `/search?q=${searchQuery}`;
    }
  }
});

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

let settings = {}

fetch("/settings").then((fetchresponse) => {
  fetchresponse.json().then((jsonvalue) => {
    settings = jsonvalue
    console.log(settings)
    if (settings["cookies-consent"] == "undefined" || settings["cookies-consent"] == "false") {
      on()
    }
  })
})

function consentdisable() {
  fetch("/set-settings?cookiesconsent=true&analytics=false")
  off()
}

function consentenable() {
  fetch("/set-settings?cookiesconsent=true&analytics=true")
  off()
}