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


// fixed menu on scroll for desktop
let login = document.querySelector('.navbar-container')

if ($(window).width() > 992) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#navbar_top').addClass("fixed-top").addClass('scrolled-down');
            // add padding top to show content behind navbar
            $('body').css('padding-top', $('.navbar').outerHeight() - 70 + 'px');
            // $( ".login" ).remove();
            login.innerHTML = `<div class="navbar-left">
            <span class="logo">GETLAD</span>
            <div class="dropdown">
                <button class="btn login dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    活動選頂
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">開新活動</a>
                    <a class="dropdown-item" href="#">編輯活動</a>
                </div>
            </div>
        </div>
        <a class="navbar-brand" href="#">GetLad</a>


        <div class="navbar add" id="main_nav">
        <form class="form-inline my-2 my-lg-0">

            <button class="btn my-2 my-sm-0 login" type="submit">Login</button>
        </form>
            <div class="nav-item dropdown ">
                <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">娛樂</a>
                    <a class="dropdown-item" href="#">交通</a>
                    <a class="dropdown-item" href="#">食飯</a>
                </div>
            </div>
        </div>`
        } else {
            $('#navbar_top').removeClass("fixed-top");
            login.innerHTML = `<div class="dropdown">
            <button class="btn login dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                活動選頂
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">開新活動</a>
                <a class="dropdown-item" href="#">編輯活動</a>
            </div>
        </div>

        <a class="navbar-brand" href="#">GetLad</a>


        <div class="navbar add" id="main_nav">
            <div class="nav-item dropdown ">
                <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">娛樂</a>
                    <a class="dropdown-item" href="#">交通</a>
                    <a class="dropdown-item" href="#">食飯</a>
                </div>
            </div>
        </div>`
            // $( ".login" ).remove();
            // remove padding top from body
            $('body').css('padding-top', '0');
        }
    });
}

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

let rows = document.querySelectorAll('.row')

window.addEventListener('load', function () {

    console.log('loaded')
    for (let row of rows) {
        for (let i = 0; i < 3; i++)

            row.innerHTML += `
            <div id="cardFlex">
            <div class="card" style="width: 18rem;">
                <h5 class="card-title">鬥食十三么</h5>  <!-- change card-title.innerHTML -->
                <div id="map"></div>
                
                <div class="card-body">
                    <p class="card-text" id="description">活動: 尋隊切磋 時間: 19:00 聯絡: 有意請tg: www.google.com</p>     <!-- change description.innerHTML -->
                    <hr>
                    <div class="infoBar">
                        <p class="card-text" id="eventLocation">地點: 柴灣鐵路站</p>
                        <p class="card-text" id="participationRate">人數: 5/10</p>     <!-- change participationRate.innerHTML -->
                        <p class="card-text" id="dateAdded">加入日期: 23/11/2020</p>
                    </div>
                    <hr>
                    <div class="bottomBar">
                        <button class="btn btn-primary joinButton">加入</button>
                        <div class="bookmark"><i class="fas fa-bookmark"></i></div>
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
        console.log('init 2')
    }
    initMap()

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
})

