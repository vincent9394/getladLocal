import { client } from './db'
import express from 'express'
// import multer from 'multer'
import bodyParser from 'body-parser'

let app = express()
// let upload = multer()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

export const bottomBarRoute = express.Router();


bottomBarRoute.get('/session', async (req, res) => {
    res.json(req.session['user'])
})


bottomBarRoute.post('/bottomBarJoin', async (req, res) => {
    try {

        let checkUserJoiningRecord = await client.query(`SELECT * FROM join_group where participant_id = ${req.session['user']} and event_id = ${req.body.eventId}`)
        console.log(checkUserJoiningRecord.rows)
        if (checkUserJoiningRecord.rows.length == 0) {
            let insertJoinRecord = await client.query('INSERT into join_group (event_id, participant_id) VALUES ($1, $2)', [req.body.eventId, req.session['user']])
            console.log(insertJoinRecord)
            // if (insertJoinRecord.rows.length >= 0) {
            //     res.json({ result: true })
            // }
        } else {
            let deleteJoinRecord = await client.query('DELETE FROM join_group where event_id = $1 and participant_id = $2', [req.body.eventId, req.session['user']])
            console.log(deleteJoinRecord)
            // let deleteJoinRecord = await client.query('DELETE FROM join_group where event_id = $1 and participant_id = $2', [req.body.eventId, req.session['user']])
            // console.log(deleteJoinRecord)
            // if (deleteJoinRecord.rows.length >= 0) {
            //     res.json({ result: true })
            // }
        }

        res.json({ result: true })
    } catch (error) {
        console.log(error)
    }
})


bottomBarRoute.post('/bottomBarUnjoin', async (req, res) => {
    try {

        let checkUserJoiningRecord = await client.query(`SELECT * FROM join_group where participant_id = ${req.session['user']} and event_id = ${req.body.eventId}`)
        if (checkUserJoiningRecord.rows.length !== 0) {
            let deleteJoinRecord = await client.query('DELETE FROM join_group where event_id = $1 and participant_id = $2', [req.body.eventId, req.session['user']])
            console.log(deleteJoinRecord)
            // if (insertJoinRecord.rows.length >= 0) {
            //     res.json({ result: true })
            // }
        } else {
            let insertJoinRecord = await client.query('INSERT into join_group (event_id, participant_id) VALUES ($1, $2)', [req.body.eventId, req.session['user']])
            console.log(insertJoinRecord)
            // let deleteJoinRecord = await client.query('DELETE FROM join_group where event_id = $1 and participant_id = $2', [req.body.eventId, req.session['user']])
            // console.log(deleteJoinRecord)
            // if (deleteJoinRecord.rows.length >= 0) {
            //     res.json({ result: true })
            // }
        }

        res.json({ result: true })
    } catch (error) {
        console.log(error)
    }
})


bottomBarRoute.post('/bottomBarBookmark', async (req, res) => {
    try {
        let checkUserBookmarkRecord = await client.query(`SELECT * FROM bookmark where user_id = ${req.session['user']} and event_id = ${req.body.eventId}`)
        if (checkUserBookmarkRecord.rows.length == 0) {
            let insertBookmarkRecord = await client.query(`INSERT into bookmark (event_id, user_id) VALUES ($1,$2)`, [req.body.eventId, req.session['user']])
            console.log(insertBookmarkRecord)
        } else {
            let deletBookmarkRecord = await client.query('DELETE FROM bookmark where event_id = $1 and user_id = $2', [req.body.eventId, req.session['user']])
            console.log(deletBookmarkRecord)
        }
    } catch (error) {
        console.log(error)
    }
})


bottomBarRoute.post('/bottomBarUnbookmark', async (req, res) => {
    try {
        let checkUserBookmarkRecord = await client.query(`SELECT * FROM bookmark where user_id = ${req.session['user']} and event_id = ${req.body.eventId}`)
        if (checkUserBookmarkRecord.rows.length !== 0) {
            let deletBookmarkRecord = await client.query('DELETE FROM bookmark where event_id = $1 and user_id = $2', [req.body.eventId, req.session['user']])
            console.log(deletBookmarkRecord)
        } else {
            let insertBookmarkRecord = await client.query(`INSERT into bookmark (event_id, user_id) VALUES ($1,$2)`, [req.body.eventId, req.session['user']])
            console.log(insertBookmarkRecord)
        }
    } catch (error) {
        console.log(error)
    }
})




