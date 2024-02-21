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
  })
}).then(() => {
  if (settings["cookies-consent"] == "undefined") {
    on()
  }
})