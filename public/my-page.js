let cardTitles = document.querySelectorAll('.card-title')
for (let cardTitle of cardTitles) {
    cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
}

//google map API
let map;
let infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 5,
    });

    //end of google map API
}

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
const bookmarked = document.querySelector(".bookmarked")
const joined = document.querySelector(".joined")


let searchResults = [];


const loadJoined = async () => {
    const res = await fetch('/joined');
    joinedEvents = await res.json();
    displayEvents(joinedEvents);

};
const loadBookmarked = async () => {
    const res = await fetch('/bookmarked');
    bookmarkedEvents = await res.json();
    displayEvents(bookmarkedEvents);

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
                <p class="card-text" id="participationRate">人數: {participantNumber}/${event.prerequisite}</p>
                <!-- change participationRate.innerHTML -->
                <p class="card-text" id="dateAdded">活動日期: ${new Date(event.date).toLocaleDateString('en-hk')}</p>
            </div>
            <hr>
            
        </div>
    </div>
    `;
        })
        .join('');
    joined.innerHTML = htmlString;
    bookmarked.innerHTML = htmlString;
    let cardTitles = document.querySelectorAll('.card-title')
    for (let cardTitle of cardTitles) {
        cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
    }
};
loadJoined();
loadBookmarked();
////end of show events////




