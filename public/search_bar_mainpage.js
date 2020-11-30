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

//search page
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

const loadEvents = async () => {
    const res = await fetch('/searchResults' + location.search)
    searchResults = await res.json();
    displayEvents(searchResults);

};
const displayEvents = (events) => {
    const htmlString = events
        .map((event) => {
            return `<div class="card">
            <h5 class="card-title">${event.topic}</h5>
            <div id="map"></div>
            <div class="card-body">
                <p class="card-text" id="description">${marked(event.description)}</p>
                <hr>
                <div class="infoBar">
                    <p class="card-text" id="eventLocation">地點: ${event.location}</p>
                    <p class="card-text" id="participationRate">人數: ${event.join_count}/${event.prerequisite}</p>
                    <p class="card-text" id="dateAdded">活動日期: ${new Date(event.date).toLocaleDateString('en-hk')}</p>
                </div>
                <hr>
                <div class="bottomBar">
                        <button class="btn btn-primary joinButton" ${event.has_joined > 0 ? "hidden" : ""} onclick = "sendJoinInfo(${event.id})">加入</button>
                        <button class="btn btn-primary unJoinButton" ${event.has_joined == 0 ? "hidden" : ""} onclick = "sendUnjoinInfo(${event.id})">已加入</button>
                        <div class="bookmark" ${event.has_bookmarked > 0 ? "hidden" : ""} onclick = "sendBookmarkInfo(${event.id})"><i class="fas fa-bookmark"></i></div>
                        <div class="unBookmark" ${event.has_bookmarked == 0 ? "hidden" : ""} onclick = "sendUnbookmarkInfo(${event.id})"><i class="fas fa-bookmark"></i></div>
                    </div>
            </div>
        </div>
            `
        })
        .join('');
    cardFlex.innerHTML = htmlString;
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
            loadEvents()
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
            loadEvents()
        })
    };
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
loadEvents();
//end of search page

