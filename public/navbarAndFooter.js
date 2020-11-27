function navbarTopic(){
    const navbarBrand = document.querySelector('.navbar-topic')
            if (location.pathname === `/entertainment.html`) {
                navbarBrand.innerHTML = `娛樂`
            } else if (location.pathname === `/foodie-group.html`) {
                navbarBrand.innerHTML = '搵飯腳'
            } else if (location.pathname === `/`) {
                navbarBrand.innerHTML = `GETLAD`
            } else if (location.pathname === `/my-page.html`) {
                navbarBrand.innerHTML = `我的活動`
            } else if (location.pathname === `/transport.html`) {
                navbarBrand.innerHTML = `搭車`
            } 
}


//////header
const header = document.querySelector('header')
header.innerHTML = `<div class="bg-white text-dark py-4 border-bottom d-flex justify-content-between">
<div class="container d-flex align-items-center mr-1 ml-1 getlad">
    <a href="./index.html" class="getlad" >GETLAD</a>
    <!-- <img src="./images/logowithoutbg.png"> -->
</div>
<form class="form-inline mx-2 my-2 my-lg-0">
    <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
    <button class="btn login my-2 my-sm-0" type="submit">Login</button>
    <button class="btn my-2 my-sm-0 logout" type="submit">Logout</button>
</form>
</div>
<nav id="navbar_top" class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
<div class="navbar-container">

    <div class="dropdown">
        <button class="btn loginEdit dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            活動選頂
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#createEventModal">開新活動</a>
            <a class="dropdown-item" href="#">編輯活動</a>
        </div>
    </div>



    <div class="navbar-brand"><span class="navbar-topic"></span></div>


    <div class="navbar add" id="main_nav">
        <div class="nav-item dropdown toggle">
            <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item myEvent" href="my-page.html">我的活動</a>
            <a class="dropdown-item" href="entertainment.html">娛樂</a>
            <a class="dropdown-item" href="transport.html">交通</a>
            <a class="dropdown-item" href="foodie-group.html">食飯</a>
            </div>
        </div>
    </div>
</div>
</nav>`




const navbarBrand = document.querySelector('.navbar-topic')

///////////////// fixed menu on scroll for desktop
const login = document.querySelector('.navbar-container')

if ($(window).width() > 480) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#navbar_top').addClass("fixed-top").addClass('scrolled-down');
            // add padding top to show content behind navbar
            $('body').css('padding-top', $('.navbar').outerHeight() - 70 + 'px');
            // $( ".login" ).remove();
            login.innerHTML = `<div class="navbar-left">
            <a class="logo" href="./index.html">GETLAD</a>

            <div class="dropdown">
        <button class="btn loginEdit dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            活動選頂
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#createEventModal">開新活動</a>
            <a class="dropdown-item" href="#">編輯活動</a>
        </div>
    </div>

    
            
        </div>
        <div class="navbar-brand"><span class="navbar-topic"></span></div>


        <div class="navbar add" id="main_nav">
        <form class="form-inline my-2 my-lg-0">

            <button class="btn my-2 my-sm-0 login" type="submit">Login</button>
            <button class="btn my-2 my-sm-0 logout" type="submit">Logout</button>
        </form>
            <div class="nav-item dropdown ">
                <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item myEvent" href="my-page.html">我的活動</a>
                <a class="dropdown-item" href="entertainment.html">娛樂</a>
                <a class="dropdown-item" href="transport.html">交通</a>
                <a class="dropdown-item" href="foodie-group.html">食飯</a>
                </div>
            </div>
        </div>`
        navbarTopic()
        } else {
            $('#navbar_top').removeClass("fixed-top");
            login.innerHTML = `<div class="dropdown">
            <button class="btn loginEdit dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                活動選頂
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#createEventModal">開新活動</a>
                <a class="dropdown-item" href="#">編輯活動</a>
            </div>
        </div>


        

        <div class="navbar-brand"><span class="navbar-topic"></span></div>


        <div class="navbar add" id="main_nav">
            <div class="nav-item dropdown ">
                <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item myEvent" href="my-page.html">我的活動</a>
                    <a class="dropdown-item" href="entertainment.html">娛樂</a>
                    <a class="dropdown-item" href="transport.html">交通</a>
                    <a class="dropdown-item" href="foodie-group.html">食飯</a>
                </div>
            </div>
        </div>`
        navbarTopic()
            // $( ".login" ).remove();
            // remove padding top from body
            $('body').css('padding-top', '0');
        }
    });
}
/////// end 

navbarTopic()


//////footer
const footer = document.querySelector('footer')
footer.innerHTML = `<div class="footer-container">
<div class="footer-grid">
    <!-- <div class="sidebar"></div> -->

    <div class="float-left"><span class="footer-logo" title="GetLad">GETLAD</span>
        <div class="copyright">© 2020 GetLad.HK</div>
        <div class="website-intro">湊腳｜搵食｜搭車｜</div>
    </div>

</div>
</div>`


async function checkRole() {
    // let res = await fetch('/username')
    // let username = await res.json()
    let logins = document.querySelectorAll('.login')
    let username = 'user'
    document.body.classList.remove('is-loading')            // why need is-loading if it is the same as is-guest ??
    if (username) {
        document.body.classList.add('is-member')
        document.body.classList.remove('is-guest')
    } else {
        document.body.classList.remove('is-member')
        document.body.classList.add('is-guest')
    }
}
checkRole()