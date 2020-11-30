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

googleMapRoute.get('/transportationPin', async (req, res) => {
    let pin = await client.query(`
    SELECT location FROM events where event_type_id = 1;
`)
        res.json(pin.rows)
    })  

googleMapRoute.get('/entertainmentPin', async (req, res) => {
    let pin = await client.query(`
    SELECT location FROM events where event_type_id = 2;
`)
        res.json(pin.rows)
    })

googleMapRoute.get('/FoodiePin', async (req, res) => {
    let pin = await client.query(`
    SELECT location FROM events where event_type_id = 3;
`)
        res.json(pin.rows)
    })