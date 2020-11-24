
const cardFlex = document.querySelector("#cardFlex")
const searchBar = document.querySelector('.searchBar');

const search = document.getElementById('search')


const loadEvents = async () => {
    const res = await fetch('/searchResults');
    searchResults = await res.json();
    displayEvents(searchResults);

};
const displayEvents = (events) => {
    const htmlString = events
        .map((event) => {
            console.log(event.topic);
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



// loading more requests by scrolling
let isLoading = false
let row = document.querySelector('.row')
let article = document.querySelector('article')
let containerFluid = document.querySelector('.container-fluid')
let loadingBar = document.querySelector('.loadingBar')

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // console.log({ scrollTop, scrollHeight, clientHeight });
    // clientHeight refers to the area we see ; scrollTop refers to the px we've scrolled ; scrollHeight refers to the sum of both 
    // because scrollTop value is rounded off, scrollHeight has to be minus 5 or more
    if (clientHeight + scrollTop >= scrollHeight - 100) {
        showLoading();
    }
});

// This requires both the server and database to be set up to make it workable.
function showContent() {
    for (let i = 0; i < 1; i++) {
        row.innerHTML += `
                    <div id="cardFlex">
                                <div class="card" style="width: 18rem;">
                                    <h5 class="card-title">鬥食十三么</h5>
                                    <div id="map"></div>
                                    <div class="card-body">
                                        <p class="card-text" id="description">搵人打牌 有意請tg</p>
                                        <p class="card-text" id="participationRate">人數: 5/10</p>
                                        <div class="bottomBar">
                                            <a href="#" class="btn btn-primary joinButton">加入</a>
                                            <div class="bookmark"><i class="fas fa-bookmark"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `
    }
    //remove animation when loaded
    loadingBar.classList.remove('show')
}

function showLoading() {
    // animation when loading
    loadingBar.classList.add('show');
    setTimeout(showContent, 300)
}
// let searchResults = [];


// searchBar.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();

//     const filteredEvents = searchResults.filter((event) => {
//         return (
//             event.topic.toLowerCase().includes(searchString)
//             // event.house.toLowerCase().includes(searchString)
//         );
//     });
//     displayEvents(filteredEvents);
// });

// //entertainment search page
// const loadEvents = async () => {
//     const res = await fetch('/search-entertainment');
//     searchResults = await res.json();
//     displayEvents(searchResults);

// };
// const displayEvents = (events) => {
//     const htmlString = events
//         .map((event) => {
//             console.log(event.topic);
//             return `
//             <div class="card">
//                         <h5 class="card-title">${event.topic}</h5>
//                         <div class="card-body">
//                             <p class="card-text" id="description">${event.description}</p>
//                             <p class="card-text" id="participationRate">人數: {participantNumber}/${event.prerequisite}</p>
//                             <div class="joinAndBookmark">
//                                 <a href="#" class="btn btn-primary joinButton">加入</a>
//                                 <div class="bookmark"><i class="fas fa-bookmark"></i></div>
//                             </div>
//                         </div>
//                     </div>
//         `;
//         })
//         .join('');
//     cardFlex.innerHTML = htmlString;
//     let cardTitles = document.querySelectorAll('.card-title')
//     for (let cardTitle of cardTitles) {
//         cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random() * 150))}, ${(Math.floor(Math.random() * 115))}, ${(Math.floor(Math.random() * 150))}`}`
//     }
// };
// loadEvents();
//end of entertainment search page

