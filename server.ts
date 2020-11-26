import express from 'express'
import {searchRoute} from './search_bar'
import {sortingRoute} from './sorting'


let app = express()

app.use(express.static('public'))
app.use(searchRoute)
app.use(sortingRoute)


let port = 8080
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})