import express from 'express'

let app = express()

app.use(express.static('public'))

let port = 8080
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})