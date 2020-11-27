let cardTitles = document.querySelectorAll('.card-title')
for (let cardTitle of cardTitles) {
    cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
}

//google map API
let map;
let infoWindow;

// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 5,
//     });

// }
function initMap() {
    let allMap = document.querySelectorAll("#map")
    let hkMap = document.querySelector(".hkMap #map")
    for (let getMap of allMap) {
        map = new google.maps.Map(getMap, {
            center: { lat: 22.379812, lng: 114.134938 },
            zoom: 13,
        });

        map = new google.maps.Map(hkMap, {
            center: { lat: 22.289437, lng: 113.940938 },
            zoom: 13,
        });
    }
}
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



let searchResults = [];


const loadJoined = async () => {
    joinShow = true
    const res = await fetch('/joined');
    joinedEvents = await res.json();
    displayEvents(joinedEvents);
    joinShow = false

};
const loadBookmarked = async () => {
    bookmarkShow = true
    const res = await fetch('/bookmarked');
    bookmarkedEvents = await res.json();
    displayEvents(bookmarkedEvents);
    bookmarkShow = false

};
const displayEvents = (events) => {
    const htmlString = events
        .map((event) => {
            return `<div class="card" style="width: 18rem;">
        <h5 class="card-title">${event.topic}</h5> <!-- change card-title.innerHTML -->
        <div id="map"></div>

        <div class="card-body">
            <p class="card-text" id="description">${event.description}</p>
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
    `;
        })
        .join('');
    if(joinShow === true){
        joined.innerHTML = htmlString;   
        
    }
    if (bookmarkShow === true){
        bookmarked.innerHTML = htmlString;
    }
    let cardTitles = document.querySelectorAll('.card-title')
    for (let cardTitle of cardTitles) {
        cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
    }
    let map;
    function initMap() {
        let allMap = document.querySelectorAll("#map")
        let hkMap = document.querySelector(".hkMap #map")
        for (let getMap of allMap) {
            map = new google.maps.Map(getMap, {
                center: { lat: 22.379812, lng: 114.134938 },
                zoom: 13,
            });

            map = new google.maps.Map(hkMap, {
                center: { lat: 22.289437, lng: 113.940938 },
                zoom: 13,
            });
        }
    }
    initMap()
};

loadJoined();
loadBookmarked();

////end of show events////




