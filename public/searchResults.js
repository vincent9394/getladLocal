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
            $('body').css('padding-top', $('.navbar').outerHeight() - 50 + 'px');
            // $( ".login" ).remove();
            login.innerHTML = `<div class="navbar-left">
            GetLad
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    活動選頂
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">開新活動</a>
                    <a class="dropdown-item" href="#">編輯活動</a>
                </div>
            </div>
        </div>
        <a class="navbar-brand" href="#">搜尋結果</a>


        <div class="navbar add" id="main_nav">
        <form class="form-inline my-2 my-lg-0 login">

            <button class="btn btn-outline-success my-2 my-sm-0 " type="submit">Login</button>
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
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                活動選頂
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">開新活動</a>
                <a class="dropdown-item" href="#">編輯活動</a>
            </div>
        </div>

        <a class="navbar-brand" href="#">搜尋結果</a>


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

let map;

function initMap() {
    let allMap = document.querySelectorAll("#map")
    for (let getMap of allMap) {
        map = new google.maps.Map(getMap, {
            center: { lat: 22.379812, lng: 114.134938 },
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
