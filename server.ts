import express from 'express'
import {searchRoute} from './search_bar'


let app = express()

app.use(express.static('public'))
app.use(searchRoute)


let port = 8080
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})