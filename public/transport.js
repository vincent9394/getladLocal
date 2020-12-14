
// let login = document.querySelector('.add')


//google map API
let map;
let infoWindow;
function initMap() {
}
async function googleMapWithPin() {
    let res = await fetch('/transportationPin')
    if (res.status != 200) {
        alert('Loading failed, please try again later');
        return;
    }

    let pinResults = await res.json()
    // console.log(pinResults)
    let hkMapDiv = document.querySelector(".hkMap")
    hkMapDiv.innerHTML += `
    <div id="map"></div>
    `

    let latitudes = []
    let longitudes = []
    let promiseList = []

    for (let i = 0; i < pinResults.length; i++) {
        let allLocations = pinResults[i]["location"]
        let locations = allLocations.split('\n')
        for (let location of locations) {
            // console.log(location)

            await new Promise((resolve) => {
                setTimeout(resolve, 0.001)
            })

            let promise1 = axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: location,
                    key: 'AIzaSyB4L9BXrB0RH_4gQCGGVnSgVmG7f5l1Q_g'
                }
            })
            .then(function (response) {
                // Log full response
                // console.log(response)
                if (response.data.status == "OK") {
                    let latitude = response.data.results[0].geometry.location.lat;
                    let longitude = response.data.results[0].geometry.location.lng;

                    latitudes.push(latitude)
                    longitudes.push(longitude)
                }
            });



            promiseList.push(promise1)


            // axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            //     params: {
            //         address: location,
            //         key: 'AIzaSyB4L9BXrB0RH_4gQCGGVnSgVmG7f5l1Q_g'
            //     }
            // })
            //     .then(function (response) {
            //         // Log full response
            //         // console.log(response)

            //         let latitude = response.data.results[0].geometry.location.lat;
            //         let longitude = response.data.results[0].geometry.location.lng;

            //         latitudes.push(latitude)
            //         longitudes.push(longitude)

            //         // let marker = new google.maps.Marker({
            //         //     position: { lat: latitude, lng: longitude },
            //         //     map: map,
            //         // });
            //     })
        }
    }
    const results = await Promise.all(promiseList);
    let hkMap = document.querySelector(".hkMap #map")
    map = new google.maps.Map(hkMap, {
        center: { lat: 22.317001, lng: 114.169934 },
        zoom: 11,
    });
    for (let i = 0; i < latitudes.length; i++) {
        const marker = new google.maps.Marker({
            position: { lat: latitudes[i], lng: longitudes[i] },
            map: map,
        });
    }
    // let hkMap = document.querySelector(".hkMap #map")
    // map = new google.maps.Map(hkMap, {
    //     center: { lat: 22.317001, lng: 114.169934 },
    //     zoom: 12,
    // });
    // for (let i = 0; i < latitudes.length; i++) {
    //     const marker = new google.maps.Marker({
    //         position: { lat: latitudes[i], lng: longitudes[i] },
    //         map: map,
    //     });
    // }

}
googleMapWithPin()
// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 5,
//     });
    
//     //end of google map API
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
// let cardFlex = document.querySelector('#cardFlex')
let cardTitles = document.querySelectorAll('.card-title')
for(let cardTitle of cardTitles){
    cardTitle.style.backgroundColor = `${`rgb(${(Math.floor(Math.random()*150))}, ${(Math.floor(Math.random()*115))}, ${(Math.floor(Math.random()*150))}`}`
}

// //grid option
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
// //end of grid option

