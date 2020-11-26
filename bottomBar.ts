import { client } from './db'
import express from 'express'

let app = express()

app.use(express.static('public'))


export const bottomBarRoute = express.Router();

bottomBarRoute.get('/session', async(req,res)=> {
    res.json(req.session['user'])
})






bottomBarRoute.post('/bottomBar', async (req, res) => {
    let checkUserJoiningRecord = await client.query(`SELECT * FROM join_group where participant_id = ${req.session['user']} and event_id = ${req.body.eventId}`)
        console.log(checkUserJoiningRecord.rows)
    if (checkUserJoiningRecord.rows.length == 0) {
        let insertJoinRecord = await client.query('INSERT into join_group (event_id, participant_id) VALUES ($1, $2)', [req.body.eventId, req.session['user']])
        console.log(insertJoinRecord)
        if (insertJoinRecord.rows.length >= 0) {
            res.json({ result: true })
        }
    } else {
        let deleteJoinRecord = await client.query('DELETE FROM join_group where event_id = $1 and particpant_id = $2', [req.body.eventId, req.session['user']]) 
        if (deleteJoinRecord.rows.length >= 0) {
            res.json({ result: true })
        }
    }
})



bottomBarRoute.post('/bottomBarRow2', async (req, res) => {
    let checkUserJoiningRecord = await client.query(`SELECT * FROM join_group where participant_id ? and event_id ?`)
    if (checkUserJoiningRecord.rows.length == 0) {
        let insertJoinRecord = await client.query('INSERT into join_group (event_id, participant_id) VALUES ($1, $2)', [req.body.eventId, req.session['user']])
        if (insertJoinRecord.rows.length >= 0) {
            res.json({ result: true })
        }
    } else {
        let deleteJoinRecord = await client.query('DELETE FROM join_group where event_id = $1 and particpant_id = $2', [req.body.eventId, req.session['user']]) 
        if (deleteJoinRecord.rows.length >= 0) {
            res.json({ result: true })
        }
    }
})


