///////////////// fixed menu on scroll for desktop
// let login = document.querySelector('.add')
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
        <a class="navbar-brand" href="#">娛樂</a>


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

        <a class="navbar-brand" href="#">娛樂</a>


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
} // end if

//google map API
let map;
let infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 5,
    });
    
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
//end of google map API


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