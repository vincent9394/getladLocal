
let map;
function initMap() {
}

async function googleMapWithPin() {
    let res = await fetch('/allPin')
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let pinResults = await res.json()
    let hkMapDiv = document.querySelector(".hkMap")
    hkMapDiv.innerHTML += `
    <div id="map"></div>
    `

    let latitudes = []
    let longitudes = []

    for (let i = 0; i < pinResults.length; i++) {
        let allLocations = pinResults[i]["location"]
        let locations = allLocations.split('\n')
        for (let location of locations) {
            // console.log(location)

            await new Promise((resolve) => {
                setTimeout(resolve, 0.001)
            })

            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: location,
                    key: 'AIzaSyB4L9BXrB0RH_4gQCGGVnSgVmG7f5l1Q_g'
                }
            })
                .then(function (response) {
                    // Log full response
                    // console.log(response)

                    let latitude = response.data.results[0].geometry.location.lat;
                    let longitude = response.data.results[0].geometry.location.lng;

                    latitudes.push(latitude)
                    longitudes.push(longitude)

                    // let marker = new google.maps.Marker({
                    //     position: { lat: latitude, lng: longitude },
                    //     map: map,
                    // });
                })
        }
    }

    let hkMap = document.querySelector(".hkMap #map")
    map = new google.maps.Map(hkMap, {
        center: { lat: 22.317001, lng: 114.169934 },
        zoom: 12,
    });
    for (let i = 0; i < latitudes.length; i++) {
        const marker = new google.maps.Marker({
            position: { lat: latitudes[i], lng: longitudes[i] },
            map: map,
        });
    }

}
googleMapWithPin()


// show more animation
let showMoreButtons = document.querySelectorAll('.showMoreButton')
for (let showMoreButton of showMoreButtons) {
    showMoreButton.addEventListener("mouseenter", function () {
        showMoreButton.style.transform = "scale(1.1)"
    })
    showMoreButton.addEventListener("mouseleave", function () {
        showMoreButton.style.transform = "scale(1)"
    })
}




let row = document.querySelector('.row')

async function sendJoinInfo(eventId) {
    const res = await fetch('/bottomBarJoin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function sendUnjoinInfo(eventId) {
    const res = await fetch('/bottomBarUnjoin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function sendBookmarkInfo(eventId) {
    const res = await fetch('/bottomBarBookmark', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function sendUnbookmarkInfo(eventId) {
    const res = await fetch('/bottomBarUnbookmark', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function mostBookmarked() {
    let res = await fetch('/sorting_by_most_bookmarked')
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let bottomRes = await fetch('/if_joined_and_bookmarked')
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let bottomResults = await bottomRes.json()
    let sortingResults = await res.json()

    for (let i = 0; i < sortingResults.length; i++) {
        let description = sortingResults[i]["description"]
        let topic = sortingResults[i]["topic"]
        let location = sortingResults[i]["location"]
        let prerequisite = sortingResults[i]["prerequisite"]
        let joined = sortingResults[i]["participants"]
        let joinButton = bottomResults[i]["join_group_id"]
        let bookmarkButton = bottomResults[i]["bookmark_id"]
        let eventDate = new Date(sortingResults[i]["date"]).toLocaleDateString('en-hk')
        let eventId = sortingResults[i]["id"]

        let div = document.createElement("div")
        div.id = `cardFlex${eventId}`
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <h5 class="card-title">${topic}</h5>  
        <div id="map"></div>
        
        <div class="card-body">
            <p class="card-text" id="description">${description}</p>
            <hr>
            <div class="infoBar">
                <p class="card-text" id="eventLocation">地點: ${location}</p>
                <p class="card-text" id="participationRate">人數: ${joined}/${prerequisite}</p>    
                <p class="card-text" id="dateAdded">活動日期: ${eventDate}</p>
            </div>
            <hr>
            <div class="bottomBar">
                <button class="btn btn-primary joinButton" ${joinButton ? "hidden" : ""} onclick = "sendJoinInfo(${eventId})">加入</button>
                <button class="btn btn-primary unJoinButton" ${joinButton == null ? "hidden" : ""} onclick = "sendUnjoinInfo(${eventId})">已加入</button>
                <div class="bookmark" ${bookmarkButton ? "hidden" : ""} onclick = "sendBookmarkInfo(${eventId})"><i class="fas fa-bookmark"></i></div>
                <div class="unBookmark" ${bookmarkButton == null ? "hidden" : ""} onclick = "sendUnbookmarkInfo(${eventId})"><i class="fas fa-bookmark"></i></div>
            </div>
        </div>
    </div>
        `

        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyB4L9BXrB0RH_4gQCGGVnSgVmG7f5l1Q_g'
            }
        })
            .then(function (response) {
                // Log full response
                // console.log(response)

                let latitude = response.data.results[0].geometry.location.lat;
                let longitude = response.data.results[0].geometry.location.lng;

                let getMap = div.querySelector('#map')
                map = new google.maps.Map(getMap, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 13,
                });

                const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                });
            })



        row.appendChild(div)
    }


    let cardTitles = document.querySelectorAll('.card-title')
    for (let cardTitle of cardTitles) {
        cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
    }


    let joinButtons = document.querySelectorAll('.joinButton')
    for (let joinButton of joinButtons) {

        joinButton.addEventListener('click', function (event) {
            event.preventDefault()
            event.target.toggle = !event.target.toggle
            if (event.target.toggle == false) {
                joinButton.innerHTML = '加入'
                joinButton.style.backgroundColor = "rgb(20, 54, 92)"
            } else if (event.target.toggle == true) {
                joinButton.innerHTML = '已加入'
                joinButton.style.backgroundColor = " rgb(4, 102, 214)"
            }
        })
    }

    let unJoinButtons = document.querySelectorAll('.unJoinButton')
    for (let unJoinButton of unJoinButtons) {

        unJoinButton.addEventListener('click', function (event) {
            event.preventDefault()
            event.target.toggle = !event.target.toggle
            if (event.target.toggle == false) {
                unJoinButton.innerHTML = '已加入'
                unJoinButton.style.backgroundColor = " rgb(4, 102, 214)"
            } else if (event.target.toggle == true) {
                unJoinButton.innerHTML = '加入'
                unJoinButton.style.backgroundColor = "rgb(20, 54, 92)"
            }
        })
    }



    // hard code bookmark轉色
    let yellowButtons = document.querySelectorAll('.bookmark .fa-bookmark')
    for (let yellowButton of yellowButtons) {
        yellowButton.addEventListener('click', function (event) {
            event.target.toggle = !event.target.toggle
            if (event.target.toggle == false) {
                yellowButton.style.color = "#D8D6D9"
            } else if (event.target.toggle == true) {
                yellowButton.style.color = "#F3C20C"
            }
        }
        )
    }


    let whiteButtons = document.querySelectorAll('.unBookmark .fa-bookmark')
    for (let whiteButton of whiteButtons) {
        whiteButton.addEventListener('click', function (event) {
            event.target.toggle = !event.target.toggle
            if (event.target.toggle == false) {
                whiteButton.style.color = "#F3C20C"
            } else if (event.target.toggle == true) {
                whiteButton.style.color = "#D8D6D9"
            }
        }
        )
    }
}
mostBookmarked()

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Separation is important ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let row2 = document.querySelector('.row2')

async function sendJoinInfoRow2(eventId) {
    const res = await fetch('/bottomBarJoinRow2', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function sendUnjoinInfoRow2(eventId) {
    const res = await fetch('/bottomBarUnjoinRow2', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function sendBookmarkInfoRow2(eventId) {
    const res = await fetch('/bottomBarBookmarkRow2', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function sendUnbookmarkInfoRow2(eventId) {
    const res = await fetch('/bottomBarUnbookmarkRow2', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: eventId })
    });
    await res.json();
}

async function mostSuccessfulRate() {
    let res = await fetch('/sorting_by_successful_rate')
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let sortingResults = await res.json()

    for (let i = 0; i < sortingResults.length; i++) {
        let description = sortingResults[i]["description"]
        let topic = sortingResults[i]["topic"]
        let location = sortingResults[i]["location"]
        let prerequisite = sortingResults[i]["prerequisite"]
        let joined = sortingResults[i]["join_count"]
        let eventDate = new Date(sortingResults[i]["date"]).toLocaleDateString('en-hk')
        let eventId = sortingResults[i]["id"]
        let joinButton = sortingResults[i]["has_joined"]
        let bookmarkButton = sortingResults[i]["has_bookmarked"]


        let div = document.createElement("div")
        div.id = `cardFlex${eventId}`
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <h5 class="card-title">${topic}</h5>  
        <div id="map"></div>
        
        <div class="card-body">
            <p class="card-text" id="description">${description}</p>
            <hr>
            <div class="infoBar">
                <p class="card-text" id="eventLocation">地點: ${location}</p>
                <p class="card-text" id="participationRate">人數: ${joined}/${prerequisite}</p>    
                <p class="card-text" id="dateAdded">活動日期: ${eventDate}</p>
            </div>
            <hr>
            <div class="bottomBar">
                <button class="btn btn-primary joinButton" ${joinButton>0 ? "hidden" : ""} onclick = "sendJoinInfo(${eventId})">加入</button>
                <button class="btn btn-primary unJoinButton" ${joinButton == 0 ? "hidden" : ""} onclick = "sendUnjoinInfo(${eventId})">已加入</button>
                <div class="bookmark" ${bookmarkButton>0 ? "hidden" : ""} onclick = "sendBookmarkInfo(${eventId})"><i class="fas fa-bookmark"></i></div>
                <div class="unBookmark" ${bookmarkButton == 0 ? "hidden" : ""} onclick = "sendUnbookmarkInfo(${eventId})"><i class="fas fa-bookmark"></i></div>
            </div>
        </div>
    </div>
        `

        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyB4L9BXrB0RH_4gQCGGVnSgVmG7f5l1Q_g'
            }
        })
            .then(function (response) {
                // Log full response
                // console.log(response)

                let latitude = response.data.results[0].geometry.location.lat;
                let longitude = response.data.results[0].geometry.location.lng;

                let getMap = div.querySelector('#map')
                map = new google.maps.Map(getMap, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 13,
                });

                const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                });
            })

        row2.appendChild(div)
    }


    let cardTitles = document.querySelectorAll('.card-title')
    for (let cardTitle of cardTitles) {
        cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
    }


    let row2JoinButtons = document.querySelectorAll('.joinButton')
    for (let row2JoinButton of row2JoinButtons) {

        row2JoinButton.addEventListener('click', function (event) {
            event.preventDefault()
            event.target.switch = !event.target.switch
            if (event.target.switch == false) {
                row2JoinButton.innerHTML = '加入'
                row2JoinButton.style.backgroundColor = "rgb(20, 54, 92)"
            } else if (event.target.switch == true) {
                row2JoinButton.innerHTML = '已加入'
                row2JoinButton.style.backgroundColor = " rgb(4, 102, 214)"
            }
        })
    }

    let row2UnJoinButtons = document.querySelectorAll('.unJoinButton')
    for (let row2UnJoinButton of row2UnJoinButtons) {

        row2UnJoinButton.addEventListener('click', function (event) {
            event.preventDefault()
            event.target.switch = !event.target.switch
            if (event.target.switch == false) {
                row2UnJoinButton.innerHTML = '已加入'
                row2UnJoinButton.style.backgroundColor = " rgb(4, 102, 214)"
            } else if (event.target.switch == true) {
                row2UnJoinButton.innerHTML = '加入'
                row2UnJoinButton.style.backgroundColor = "rgb(20, 54, 92)"
            }
        })
    }



    // hard code bookmark轉色
    let row2YellowButtons = document.querySelectorAll('.bookmark .fa-bookmark')
    for (let row2YellowButton of row2YellowButtons) {
        row2YellowButton.addEventListener('click', function (event) {
            event.target.switch = !event.target.switch
            if (event.target.switch == false) {
                row2YellowButton.style.color = "#D8D6D9"
            } else if (event.target.switch == true) {
                row2YellowButton.style.color = "#F3C20C"
            }
        }
        )
    }


    let row2WhiteButtons = document.querySelectorAll('.unBookmark .fa-bookmark')
    for (let row2WhiteButton of row2WhiteButtons) {
        row2WhiteButton.addEventListener('click', function (event) {
            event.target.switch = !event.target.switch
            if (event.target.switch == false) {
                row2WhiteButton.style.color = "#F3C20C"
            } else if (event.target.switch == true) {
                row2WhiteButton.style.color = "#D8D6D9"
            }
        }
        )
    }

}
mostSuccessfulRate()





    // let map;
    // function initMap() {
    //     let allMap = document.querySelectorAll("#map")
    //     let hkMap = document.querySelector(".hkMap #map")
    //     for (let getMap of allMap) {
    //         map = new google.maps.Map(getMap, {
    //             center: { lat: 22.379812, lng: 114.134938 },
    //             zoom: 13,
    //         });

    //         map = new google.maps.Map(hkMap, {
    //             center: { lat: 22.289437, lng: 113.940938 },
    //             zoom: 13,
    //         });
    //     }
    // }
    // initMap()


