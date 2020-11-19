let toggle = false
let gridOption = document.querySelector('.gridOption')
let gridChoiceFlex = document.querySelector('.gridChoiceFlex')
let ans = gridOption.addEventListener('click', function() {
    if(toggle == false) {
        gridChoiceFlex.style.display = "flex"
        toggle = true
    } else if (toggle == true) {
        gridChoiceFlex.style.display = "none"
        toggle = false
    }
})

let gridChoices = document.querySelectorAll('.gridChoice')
for (let gridChoice of gridChoices) {
    gridChoice.addEventListener("click", function (){
        gridChoiceFlex.style.display = "none"
        toggle = false
    })
}