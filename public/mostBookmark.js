
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
    console.log(res)
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let bottomRes = await fetch('/if_joined_and_bookmarked')
    console.log(bottomRes)
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let bottomResults = await bottomRes.json()
    let sortingResults = await res.json()

    console.log(bottomResults)
    console.log(sortingResults)


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

        console.log(joinButton)

        row.innerHTML += `
            <div id="cardFlex${eventId}">
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
        </div>
        `
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




// loading more requests by scrolling
let isLoading = false
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
       
        initMap()
    }

    
});

// This requires both the server and database to be set up to make it workable.
async function showContent() {
   await mostBookmarked()
   
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

    //remove animation when loaded
    loadingBar.classList.remove('show')
}

async function showLoading() {
    // animation when loading
    loadingBar.classList.add('show');
    setTimeout(showContent, 300)
}





