let cardTitles = document.querySelectorAll('.card-title')
for (let cardTitle of cardTitles) {
    cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
}

//google map API
let map;
let infoWindow;
function initMap() {
}

async function googleMapWithPin() {
    let res = await fetch('/allPin')
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let pinResults = await res.json()


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
                    if (response.data.status == "OK") {

                        let latitude = response.data.results[0].geometry.location.lat;
                        let longitude = response.data.results[0].geometry.location.lng;
                        latitudes.push(latitude)
                        longitudes.push(longitude)
                        // let marker = new google.maps.Marker({
                        //     position: { lat: latitude, lng: longitude },
                        //     map: map,
                        // });
                    }


                })
        }
    }

    // let hkMap = document.querySelector(".hkMap #map")
    // map = new google.maps.Map(hkMap, {
    //     center: { lat: 22.317001, lng: 114.169934 },
    //     zoom: 12,
    // });
    // for (let i = 0; i < latitudes.length; i++) {
    //     const marker = new google.maps.Marker({
    //         position: { lat: latitudes[i], lng: longitudes[i] },
    //         map: map,
    //     });
    // }

}
googleMapWithPin()



//end of google map API

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


////show events//
const joined = document.querySelector(".joined")
const bookmarked = document.querySelector(".bookmarked")
let joinShow = false
let bookmarkShow = false



const loadJoined = async () => {
    joinShow = true
    const res = await fetch('/joined');
    joinedEvents = await res.json();
    displayEvents(joinedEvents);

    for (const joinedEvent of joinedEvents) {
        // console.log(joinedEvent);
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: joinedEvent.location,
                key: 'AIzaSyB4L9BXrB0RH_4gQCGGVnSgVmG7f5l1Q_g'
            }
        })
            .then(function (response) {
                // console.log('map here');
                const getMap = document.querySelector(`.joined .event${joinedEvent.id} #map`)

                if (response.data.status == "OK") {

                    let latitude = response.data.results[0].geometry.location.lat;
                    let longitude = response.data.results[0].geometry.location.lng;

                    // console.log(latitude);
                    // console.log(longitude);
                    map = new google.maps.Map(getMap, {
                        center: { lat: latitude, lng: longitude },
                        zoom: 13,
                    });

                    const marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: map,
                    });
                }else { getMap.innerHTML = "google地圖搵唔到呢個地方！" }

            })
    }
    joinShow = false

};
const loadBookmarked = async () => {
    bookmarkShow = true
    const res = await fetch('/bookmarked');
    bookmarkedEvents = await res.json();
    displayEvents(bookmarkedEvents);
    for (const bookmarkedEvent of bookmarkedEvents) {
        // console.log(joinedEvent);
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: bookmarkedEvent.location,
                key: 'AIzaSyB4L9BXrB0RH_4gQCGGVnSgVmG7f5l1Q_g'
            }
        })
            .then(function (response) {
                // console.log('map here');
                const getMap = document.querySelector(`.bookmarked .event${bookmarkedEvent.id} #map`)

                if (response.data.status == "OK") {

                    let latitude = response.data.results[0].geometry.location.lat;
                    let longitude = response.data.results[0].geometry.location.lng;

                    // console.log(latitude);
                    // console.log(longitude);
                    map = new google.maps.Map(getMap, {
                        center: { lat: latitude, lng: longitude },
                        zoom: 13,
                    });

                    const marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: map,
                    });
                } else { getMap.innerHTML = "google地圖搵唔到呢個地方！" }

            })
    }
    bookmarkShow = false

};
const displayEvents = (events) => {
    const htmlString = events
        .map((event) => {

            return `<div class="card" style="width: 18rem;">
        <h5 class="card-title">${event.topic}</h5> <!-- change card-title.innerHTML -->
        <span class="event${event.id}"><div id="map"></div></span>

        <div class="card-body">
            <p class="card-text" id="description">${marked(event.description)}</p>
            <!-- change description.innerHTML -->
            <hr>
            <div class="infoBar">
                <p class="card-text" id="eventLocation">地點: ${event.location}</p>
                <p class="card-text" id="participationRate">人數: ${event.join_count}/${event.prerequisite}</p>
                <!-- change participationRate.innerHTML -->
                <p class="card-text" id="dateAdded">活動日期: ${new Date(event.date).toLocaleDateString('en-hk')}</p>
            </div>
            <hr>
            
        </div>
    </div>
    ` ;

        })
        .join('');

    if (joinShow === true) {
        joined.innerHTML = htmlString



    }
    if (bookmarkShow === true) {
        bookmarked.innerHTML = htmlString;
    }
    let cardTitles = document.querySelectorAll('.card-title')
    for (let cardTitle of cardTitles) {
        // cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
        cardTitle.style.backgroundColor = `${`hsla(${(Math.floor(Math.random() * 360))}, 100%, 75%`}`
    }



};

loadJoined();
loadBookmarked();

////end of show events////




