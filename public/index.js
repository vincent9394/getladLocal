let gridtoggle = false
let gridOption = document.querySelector('.gridOption')
let gridChoiceFlex = document.querySelector('.gridChoiceFlex')
let ans = gridOption.addEventListener('click', function () {
    gridtoggle = !gridtoggle
    if (gridtoggle == false) {
        gridChoiceFlex.style.display = "none"
    } else if (gridtoggle == true) {
        gridChoiceFlex.style.display = "flex"
    }
})

let gridChoices = document.querySelectorAll('.gridChoice')
for (let gridChoice of gridChoices) {
    gridChoice.addEventListener("click", function () {
        gridChoiceFlex.style.display = "none"
        toggle = false
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