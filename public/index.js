let joinButtons = document.querySelectorAll('.joinButton')
for (let joinButton of joinButtons) {
    joinButton.addEventListener('click', function (event) {
        event.preventDefault()
        event.target.toggle = !event.target.toggle
        if (event.target.toggle == false) {
            joinButton.innerHTML = '加入'
        } else if (event.target.toggle == true) {
            joinButton.innerHTML = '已加入'
        }
    })
}

let bookmarkButtons = document.querySelectorAll('.fa-bookmark')
for (let bookmarkButton of bookmarkButtons) {
    bookmarkButton.addEventListener('click', function (event) {
        event.target.toggle = !event.target.toggle
        if (event.target.toggle == false) {
            bookmarkButton.style.color = "#D8D6D9"
        } else if (event.target.toggle == true) {
            bookmarkButton.style.color = "#F3C20C"
        }
    }
    )
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
let row2 = document.querySelector('.row2')




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
                    <form action="/bottomBar" method="POST" class="bottomBarForm">
                    <div class="bottomBar">
                        <button class="btn btn-primary joinButton" ${joinButton ? "hidden" : ""}>加入</button>
                        <button class="btn btn-primary unjoinButton" ${joinButton == null ? "hidden" : ""}>已加入</button>
                        <div class="bookmark" ${bookmarkButton ? "hidden" : ""}><i class="fas fa-bookmark"></i></div>
                        <div class="unbookmark" ${bookmarkButton == null ? "hidden" : ""}><i class="fas fa-bookmark"></i></div>
                        <input type="hidden" name="joinButton" value="${joinButton}">
                        <input type="hidden" name="unjoinButton" value="${"null"}">
                        <input type="hidden" name="bookmark" value="${bookmarkButton}">
                        <input type="hidden" name="unbookmark" value="${"null"}">
                        <input type="hidden" name="eventId" value="${eventId}">
                    </div>
                    </form>
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

    // Hard code 加入 / 已加入
    // let joinButtons = document.querySelectorAll('.joinButton')
    // for (let joinButton of joinButtons) {

    //     joinButton.addEventListener('click', function (event) {
    //         event.preventDefault()
    //         event.target.toggle = !event.target.toggle
    //         if (event.target.toggle == false) {
    //             joinButton.innerHTML = '加入'
    //         } else if (event.target.toggle == true) {
    //             joinButton.innerHTML = '已加入'
    //         }
    //     })

    // }


    let formButtonForms = document.querySelectorAll('.bottomBarForm')
    for(let formButtonForm of formButtonForms) {
        formButtonForm.addEventListener("click", async function(event){
            event.preventDefault()
            let formData = new FormData(formButtonForm)
            let res = await fetch(formButtonForm.action, {
                method: formButtonForm.method,
                body: formData
            })
        })

    }

    // hard code bookmark轉色
    // let bookmarkButtons = document.querySelectorAll('.fa-bookmark')
    // for (let bookmarkButton of bookmarkButtons) {
    //     bookmarkButton.addEventListener('click', function (event) {
    //         event.target.toggle = !event.target.toggle
    //         if (event.target.toggle == false) {
    //             bookmarkButton.style.color = "#D8D6D9"
    //         } else if (event.target.toggle == true) {
    //             bookmarkButton.style.color = "#F3C20C"
    //         }
    //     }
    //     )
    // }
}
mostBookmarked()





async function mostSuccessfulRate() {
    let res = await fetch('/sorting_by_successful_rate')
    console.log(res)
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let sortingResults = await res.json()
    
    console.log(sortingResults)

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
        console.log(joinButton)
        

        row2.innerHTML += `
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
                        <p class="card-text" id="dateAdded">加入日期: ${eventDate}</p>
                    </div>
                    <hr>
                    <form action="/bottomBarRow2" method="POST" class="bottomBarForm">
                    <div class="bottomBar">
                    <button class="btn btn-primary joinButton" ${joinButton > 0 ? "hidden" : ""}>加入</button>
                    <button class="btn btn-primary unjoinButton" ${joinButton == 0 ? "hidden" : ""}>已加入</button>
                    <div class="bookmark" ${bookmarkButton > 0 ? "hidden" : ""}><i class="fas fa-bookmark"></i></div>
                    <div class="unbookmark" ${bookmarkButton == 0 ? "hidden" : ""}><i class="fas fa-bookmark"></i></div>
                    <input type="hidden" name="joinButton" value="${joinButton}">
                    <input type="hidden" name="unjoinButton" value="${0}">
                    <input type="hidden" name="bookmark" value="${bookmarkButton}">
                    <input type="hidden" name="unbookmark" value="${0}">
                    <input type="hidden" name="eventId" value="${eventId}">
                    </div>
                    </form>
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


    // // Poor remedy for bookmark and join (event.target.switch)
    // let joinButtons = document.querySelectorAll('.joinButton')
    // for (let joinButton of joinButtons) {
    //     joinButton.addEventListener('click', function (event) {
    //         event.preventDefault()
    //         event.target.switch = !event.target.switch
    //         if (event.target.switch == false) {
    //             joinButton.innerHTML = '加入'
    //         } else if (event.target.switch == true) {
    //             joinButton.innerHTML = '已加入'
    //         }
    //     })
    // }

//     let bookmarkButtons = document.querySelectorAll('.fa-bookmark')
//     for (let bookmarkButton of bookmarkButtons) {
//         bookmarkButton.addEventListener('click', function (event) {
//             event.target.switch = !event.target.switch
//             if (event.target.switch == false) {
//                 bookmarkButton.style.color = "#D8D6D9"
//             } else if (event.target.switch == true) {
//                 bookmarkButton.style.color = "#F3C20C"
//             }
//         }
//         )
//     }
}
mostSuccessfulRate()

// async function checkRole() {
//     // let res = await fetch('/username')
//     // let username = await res.json()
//     let logins = document.querySelectorAll('.login')
//     let username = 'user'
//     document.body.classList.remove('is-loading')            // why need is-loading if it is the same as is-guest ??
//     if (username) {
//         document.body.classList.add('is-member')
//         document.body.classList.remove('is-guest')
//     } else {
//         document.body.classList.remove('is-member')
//         document.body.classList.add('is-guest')
//     }
// }
// checkRole()





