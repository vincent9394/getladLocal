import fetch from 'node-fetch'
fetch ('http://google.com').then(res=> {
    return res.text()
}).then (html=>{
    console.log(html)
})