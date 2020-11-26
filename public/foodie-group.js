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
let buttonToggle = false
let bookmarkButtons = document.querySelectorAll('.fa-bookmark')
for (let bookmarkButton of bookmarkButtons) {
    bookmarkButton.addEventListener('click', function () {
        buttonToggle = !buttonToggle
        if (buttonToggle == false) {
            bookmarkButton.style.color = "#D8D6D9"
        } else if (buttonToggle == true) {
            bookmarkButton.style.color = "#F3C20C"
        }
    }
    )
}

let cardTitles = document.querySelectorAll('.card-title')
for(let cardTitle of cardTitles){
    cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random()*150))}, ${(Math.floor(Math.random()*115))}, ${(Math.floor(Math.random()*150))}`}`
}

//grid option
let gridtoggle = false
let gridOption = document.querySelector('.gridOption')
let gridChoiceFlex = document.querySelector('.gridChoiceFlex')


gridOption.addEventListener('click', function () {
    gridtoggle = !gridtoggle
    if (gridtoggle == false) {
        gridChoiceFlex.style.display = "none"
    } else if (gridtoggle == true) {
        gridChoiceFlex.style.display = "flex"
    }
}
)

let gridChoices = document.querySelectorAll('.gridChoice')
for (let gridChoice of gridChoices) {
    gridChoice.addEventListener("click", function () {
        gridChoiceFlex.style.display = "none"
        gridtoggle = false
    })
}
//end of grid option

