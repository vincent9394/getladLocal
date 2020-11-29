import { client } from './db'
import express from 'express'

let app = express()

app.use(express.static('public'))

export const googleMapRoute = express.Router();

googleMapRoute.get('/allPin', async (req, res) => {
    let allPin = await client.query(`
    SELECT location FROM events;
`)
        res.json(allPin.rows)
    })

