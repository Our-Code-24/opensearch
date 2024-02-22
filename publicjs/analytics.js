async function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

fetch("/settings").then((val) => {
    val.json().then((answer) => {
        if (answer["analytics"] == "false") {
            console.log("Analytics are currently off")
        } else if (answer["analytics"] == "undefined") {
            console.log("User didn't agree to cookies, opening popup")
        } else {
            getQueryVariable("q").then((query) => {
                fetch("/api/analytics/report?q=" + query)
            })
        }
    })
})