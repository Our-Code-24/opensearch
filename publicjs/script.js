const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = encodeURIComponent(searchBar.value);
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
  fetch("/set-settings?cookiesconsent=true&analytics=false").then((val) => {
    off()
  })
}

function consentenable() {
  fetch("/set-settings?cookiesconsent=true&analytics=true").then((val) => {
    off()
  })
}

setTimeout(() => {
  fetch("/profile").then((resi) => {
    let res = resi.clone()
    console.log()
    resi.text().then((body) => {
    if (body) {
      res.json().then(async (jsonvalue) => {
        document.getElementById("profile-picture").src = jsonvalue.picture
        document.getElementById("points").innerHTML = await (await fetch("/points")).text() + " Points"
        const logout = document.createElement("button")
        logout.innerText = "Logout"
        logout.addEventListener("click", () => {
          window.location.href = "/logout"
        })
        let account = document.getElementById("account")
        account.appendChild(logout)
      }).catch((error) => {
        // Handle errors here, e.g., log the error or show a user-friendly message
        console.error('Error fetching profile data:', error);
      });
    } else {
      document.getElementById("profile-picture").remove()
      document.getElementById("points").remove()
      let account = document.getElementById("account")
      let accountbutton = document.createElement("button")
      accountbutton.innerText= "Login to earn points"
      accountbutton.addEventListener("click", (usedevent) => {
        window.location.href = "/login"
      })
      account.appendChild(accountbutton)
    }
  })
  })
}, 200)

// Stoppedwumm was here