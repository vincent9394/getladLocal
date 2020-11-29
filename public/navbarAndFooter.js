function navbarTopic() {
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
    } else if (location.pathname === `/mostBookmark.html`) {
        navbarBrand.innerHTML = `熱門活動`
    } else if (location.pathname === `/mostJoined.html`) {
        navbarBrand.innerHTML = `就快成團`
    }
}


//////header
const header = document.querySelector('header')
header.innerHTML = `<div class="bg-white text-dark pt-4 border-bottom d-flex justify-content-between" style="align-items: center; flex-wrap: wrap;">
<div class="border-bottom" style="min-width: 100%; display: flex; padding-bottom: 1.5rem; justify-content: space-between;">
    <div class="container d-flex align-items-center mr-1 ml-1 getlad">
        <a href="./index.html" class="getlad" style="text-decoration: none; color: black;" >GETLAD</a>
    </div>
<div class="form-inline mx-2 my-2 my-lg-0">    
    <form action="/login.html" method="GET">
        <button class="btn login my-2 my-sm-0" type="submit">Login</button>
    </form>
    <form  id="logout-form">
        <button class="btn my-2 my-sm-0 logout" type="submit">Logout</button>
    </form>
</div>
</div>
<nav id="navbar_top" class="navbar navbar-expand-lg navbar-light bg-white border-bottom" style="min-width: 100%;">
<div class="navbar-container" style="font-size: xx-large; padding-right: 0 !important;">

    <div class="dropdown">
        <button class="btn loginEdit dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            活動選頂
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#createEventModal">開新活動</a>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#deleteEventModal">刪除活動</a>
        </div>
    </div>



    <div class="navbar-brand"><span class="navbar-topic"></span></div>


    <div class="add" id="main_nav" style="padding: unset !important;">
        <div class="nav-item dropdown toggle">
            <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="right: -1rem; left: unset !important;">
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


if ($(window).width() > 720) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#navbar_top').addClass("fixed-top").addClass('scrolled-down');
            // add padding top to show content behind navbar
            $('body').css('padding-top', $('.navbar').outerHeight() - 70 + 'px');
            // $( ".login" ).remove();
            login.innerHTML = `<div class="navbar-left">
            <a class="logo" href="./index.html" style="text-decoration: none; color: black;" >GETLAD</a>

            <div class="dropdown">
        <button class="btn loginEdit dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            活動選頂
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#createEventModal">開新活動</a>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#deleteEventModal">刪除活動</a>
        </div>
    </div>

    
            
        </div>
        <div class="navbar-brand"><span class="navbar-topic"></span></div>


        <div class="navbar add" id="main_nav" style="padding: unset !important;">
        <div class="form-inline mx-2 my-2 my-lg-0">
        <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
        <form action="/login.html" method="GET">
        <button class="btn login my-2 my-sm-0" type="submit">Login</button>
        </form>
        <form  id="logout-form" action="/logout" method="POST">
        <button class="btn my-2 my-sm-0 logout" type="submit">Logout</button>
        </form>
    </div>
            <div class="nav-item dropdown ">
                <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="right: -1rem; left: unset !important;">
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
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#deleteEventModal">刪除活動</a>
            </div>
        </div>


        

        <div class="navbar-brand"><span class="navbar-topic"></span></div>


        <div class="navbar add" id="main_nav" style="padding: unset !important;">
            <div class="nav-item dropdown ">
                <button class="nav-link bg-white border-0" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="right: -1rem; left: unset !important;">
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

// const logoutForm = document.querySelector("#logout-form")
const logoutForm = document.querySelector("#logout-form")


logoutForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    console.log("logout press")
    const res = await fetch('/logout', {
        method: "POST"


    });
    console.log('submit logout res:', res.status, res.statusText);
    window.location.replace('./index.html')


})

// logoutForm.addEventListener('submit', async (event) => {
//     console.log('detected submit form event');
//     event.preventDefault();
//     console.log('cancelled form submit');
//     let formData = new FormData(logoutForm);
//     let res = await fetch(logoutForm.action, {
//       method: logoutForm.method,
//       body: formData,
//     });
//     console.log('submit logout res:', res.status, res.statusText);
//     if (res.redirected) {
//       console.log('redirect to:', res.url);
//       window.location.href = res.url;
//       return;
//     }
//     let text = await res.text();
//     console.log('submit logout result:', text);
//     logoutMsgBox.classList.add('error');
//     logoutMsgBox.textContent = text;
//   });


async function checkRole() {
    // let res = await fetch('/username')
    // let username = await res.json()
    // let logins = document.querySelectorAll('.login')
    let res = await fetch('/session')
    let username = await res.text() + ""
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