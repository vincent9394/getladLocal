import express from 'express'
import { client } from './db';
import { isLoggedIn } from './guard';
export let createEventRoute = express.Router();

createEventRoute.post('/createEvent', isLoggedIn,async (req, res) => {
    const date = req.body.date + " " + req.body.time + ":00"
    const categoryOption =  parseInt(req.body.categoryOption)
    const prerequisite = parseInt(req.body.prerequisite)

    //with user id//
    // const userID = await client.query('SELECT id FROM users WHERE username = $1', [req.session['user']])
    await client.query(`
        INSERT INTO events(
                event_type_id,
                topic,
                description,
                prerequisite,
                location,
                date,
                creator_id,
                created_at,
                updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),NOW())`, [
        categoryOption,
        req.body.topic,
        req.body.description,
        prerequisite,
        req.body.location,
        date,
        req.session['user'],

    ])
    //// without user ID
    // await client.query('INSERT INTO events(event_type_id,topic,description,prerequisite,location,date,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW())', [
    //     categoryOption,
    //     req.body.topic,
    //     req.body.description,
    //     prerequisite,
    //     req.body.location,
    //     date
    // ])


    const eventID = await client.query('SELECT id FROM events WHERE topic = $1', [req.body.topic])
    //without user id//
    // if (req.body.joinGroup === '1') {
    //     await client.query('INSERT INTO join_group(event_id) VALUES ($1)', [
    //         parseInt(eventID.rows[0].id)
    //     ])
    //     console.log("added eventID:" + eventID.rows);
    // }

    //with user id//
    if (req.body.joinGroup == 1) {
        await client.query('INSERT INTO join_group(event_id,participant_id) VALUES ($1,$2)', [
            parseInt(eventID.rows[0].id),
            req.session['user']
        ])
        console.log("added eventID:" + eventID.rows[0].id);
        console.log("added by user id:" + req.session['user']);
    }


    res.json({ result: true })

});

////delete event//
// GET /event
createEventRoute.get('/showDeleteEvent', async (req, res) => {
    const notes = await client.query('SELECT * FROM events WHERE creator_id = $1 ORDER BY id ASC',[req.session['user']])
    res.json(notes.rows);
});

// DELETE /event/:id
createEventRoute.delete('/deleteEvent/:id', async (req, res) => {
    // update is_deleted to true
    const deleteBookmarked = await client.query('SELECT * FROM bookmark WHERE event_id = $1', [req.params.id])
    console.log(`bookmarked user for event id${req.params.id}: ` + deleteBookmarked.rowCount)
    const deleteJoined = await client.query('SELECT * FROM join_group WHERE event_id = $1', [req.params.id])
    console.log(`joined user for event id${req.params.id}: ` + deleteJoined.rowCount);

    // Cascading delete
    if(deleteBookmarked.rowCount > 0){
        await client.query('DELETE FROM bookmark WHERE event_id = $1', [req.params.id])
    }
    if(deleteJoined.rowCount > 0){
        await client.query('DELETE FROM join_group WHERE event_id = $1', [req.params.id])
    }

    await client.query('DELETE FROM events WHERE id = $1', [req.params.id])
    res.json({ result: true })
})