let bufferevent = ""

nIntervId = setInterval(() => {
  fetch("/socket/data").then((val) => {
    if (val.status == 200) {
        val.json().then((res) => {
            if (bufferevent == res.event) {
                console.log("No event")
            } else {
                console.log("New event:", res.event)
            }
        })
    }
  })
}, 1000);