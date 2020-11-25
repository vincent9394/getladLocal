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
    const res = await fetch('/search-entertainment');
    searchResults = await res.json();
    displayEvents(searchResults);

};
const displayEvents = (events) => {
    const htmlString = events
        .map((event) => {
            return `
            <div class="card">
                        <h5 class="card-title">${event.topic}</h5>
                        <div class="card-body">
                            <p class="card-text" id="description">${event.description}</p>
                            <p class="card-text" id="participationRate">人數: {participantNumber}/${event.prerequisite}</p>
                            <div class="joinAndBookmark">
                                <a href="#" class="btn btn-primary joinButton">加入</a>
                                <div class="bookmark"><i class="fas fa-bookmark"></i></div>
                            </div>
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

