import express from 'express'

let app = express()

app.use(express.static('public'))

app.get('/entertainment', async(req, res)=> {
    res.redirect('./entertainment.html')
})
app.get('/foodie-group', async(req, res)=> {
    res.redirect('./foodie-group.html')
})

let port = 8080
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})