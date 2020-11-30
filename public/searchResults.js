// 顯示活動數量
// let gridtoggle = false
// let gridOption = document.querySelector('.gridOption')
// let gridChoiceFlex = document.querySelector('.gridChoiceFlex')


// gridOption.addEventListener('click', function () {
//     gridtoggle = !gridtoggle
//     if (gridtoggle == false) {
//         gridChoiceFlex.style.display = "none"
//     } else if (gridtoggle == true) {
//         gridChoiceFlex.style.display = "flex"
//     }
// }
// )

// let gridChoices = document.querySelectorAll('.gridChoice')
// for (let gridChoice of gridChoices) {
//     gridChoice.addEventListener("click", function () {
//         gridChoiceFlex.style.display = "none"
//         gridtoggle = false
//     })
// }


let joinButtons = document.querySelectorAll('.joinButton')
for(let joinButton of joinButtons) {
    joinButton.addEventListener('click', function(event){
        event.preventDefault()
        event.target.toggle = !event.target.toggle
        if(event.target.toggle == false) {
            joinButton.innerHTML = '加入'
        } else if(event.target.toggle == true) {
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
for(let cardTitle of cardTitles){
    cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random()*150))}, ${(Math.floor(Math.random()*115))}, ${(Math.floor(Math.random()*150))}`}`
}

// let map;

// function initMap() {
//     let allMap = document.querySelectorAll("#map")
//     for (let getMap of allMap) {
//         map = new google.maps.Map(getMap, {
//             center: { lat: 22.379812, lng: 114.134938 },
//             zoom: 13,
//         });
//     }

// }

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


