const cardFlex = document.querySelector("#cardFlex")
const searchBar = document.querySelector('.searchBar');

let searchResults = [];


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredEvents = searchResults.filter((event) => {
        return (
            event.topic.toLowerCase().includes(searchString)
            // event.house.toLowerCase().includes(searchString)
        );
    });
    displayEvents(filteredEvents);
});

//entertainment search page
const loadEvents = async () => {
    const res = await fetch('/search-transportation');
    searchResults = await res.json();
    displayEvents(searchResults);

};
const displayEvents = (events) => {
    const htmlString = events
        .map((event) => {
            return `<div class="card" style="width: 18rem;">
            <h5 class="card-title">${event.topic}</h5> <!-- change card-title.innerHTML -->
    
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
    cardFlex.innerHTML = htmlString;
    let cardTitles = document.querySelectorAll('.card-title')
    for (let cardTitle of cardTitles) {
        cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
    }
};
loadEvents();
//end of entertainment search page

