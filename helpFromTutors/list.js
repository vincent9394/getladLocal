let main = document.querySelector('main')
let list = document.querySelector('.list')
let loading = document.querySelector('.loading')
let n = 0
let isLoading = false
function loadItems() {
    if (isLoading) {
        return
    }
    isLoading = true
    console.log('loading items');
    let html = ''
    for (let i = 0; i < 8; i++) {
        n++
        html += `
    <div class="item">${n}</div>
        `
    }
    setTimeout(() => {
        list.innerHTML += html
        isLoading = false
        console.log('loaded items');
    }, 2000)
}
function getItemHeight() {
    let e = document.querySelector('.item')
    if (!e) { return 0 }
    return e.scrollHeight
}
// window.addEventListener('scroll', () => {
//    let parent = document.scrollingElement
main.addEventListener('scroll', () => {
    let parent = main
    let scrollRemind = parent.scrollTopMax - parent.scrollTop
    let itemHeight = getItemHeight()
    if (scrollRemind < itemHeight || itemHeight == 0) {
        loadItems()
    }
})