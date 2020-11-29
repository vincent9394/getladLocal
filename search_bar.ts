import express from 'express'
import { client } from './db';
// import path from 'path'
// import moment from 'moment'
// // import fs from 'fs'
import bodyParser from 'body-parser'
// import multer from 'multer'
// import expressSession from 'express-session';
// import pg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config()
// import xlsx from 'xlsx';
// import http from 'http';
// import {Server, Socket} from 'socket.io';
// import bcrypt from 'bcryptjs';
// import fetch from 'node-fetch';
// import grant from 'grant';
export let searchRoute = express.Router();
searchRoute.use(bodyParser.urlencoded({ extended: true }))
searchRoute.use(bodyParser.json())


//search bar in category page (ajax)
searchRoute.get('/search-entertainment', async (req, res) => {
    // const participantNumber = (await client.query('SELECT *, (SELECT count(*) FROM join_group where event_id = events.id) as join_group FROM events;')).rows
    // console.log(participantNumber);
    // const notes = await client.query('SELECT * FROM events WHERE event_type_id = 2 ORDER BY created_at ASC')
    const notes = await client.query(`WITH 
    most_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id ) as join_count
        FROM events 
    ), 
    my_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id
          and join_group.participant_id = $1) as has_joined
        FROM events 
    ),
    my_bookmarked_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM bookmark
          where bookmark.event_id = events.id
          and bookmark.user_id = $1) as has_bookmarked
        FROM events 
    )
SELECT 
    events.id, 
    events.creator_id, 
    events.description,
    events.date, 
    events.location, 
    events.topic, 
    events.prerequisite, 
    events.event_type_id,
    events.created_at, 
    events.updated_at,
    join_count,
    has_joined,
    has_bookmarked
FROM events
inner join most_joined_events on most_joined_events.id = events.id
inner join my_joined_events on my_joined_events.id = events.id
inner join my_bookmarked_events on my_bookmarked_events.id = events.id 
where 
    events.event_type_id = 2
ORDER BY events.created_at ASC;`, [req.session['user']])
    res.json(notes.rows);
});

searchRoute.get('/search-foodie-group', async (req, res) => {
    // const participantNumber = (await client.query('SELECT *, (SELECT count(*) FROM join_group where event_id = events.id) as join_group FROM events;')).rows
    // console.log(participantNumber);
    // const notes = await client.query('SELECT * FROM events WHERE event_type_id = 3 ORDER BY created_at ASC')
    const notes = await client.query(`WITH 
    most_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id ) as join_count
        FROM events 
    ), 
    my_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id
          and join_group.participant_id = $1) as has_joined
        FROM events 
    ),
    my_bookmarked_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM bookmark
          where bookmark.event_id = events.id
          and bookmark.user_id = $1) as has_bookmarked
        FROM events 
    )
SELECT 
    events.id, 
    events.creator_id, 
    events.description,
    events.date, 
    events.location, 
    events.topic, 
    events.prerequisite, 
    events.event_type_id,
    events.created_at, 
    events.updated_at,
    join_count,
    has_joined,
    has_bookmarked
FROM events
inner join most_joined_events on most_joined_events.id = events.id
inner join my_joined_events on my_joined_events.id = events.id
inner join my_bookmarked_events on my_bookmarked_events.id = events.id 
where 
    events.event_type_id = 3
ORDER BY events.created_at ASC;`, [req.session['user']])
    res.json(notes.rows);
});
searchRoute.get('/search-transportation', async (req, res) => {
    // const participantNumber = (await client.query('SELECT *, (SELECT count(*) FROM join_group where event_id = events.id) as join_group FROM events;')).rows
    // console.log(participantNumber);
    const notes = await client.query(`WITH 
    most_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id ) as join_count
        FROM events 
    ), 
    my_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id
          and join_group.participant_id = $1) as has_joined
        FROM events 
    ),
    my_bookmarked_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM bookmark
          where bookmark.event_id = events.id
          and bookmark.user_id = $1) as has_bookmarked
        FROM events 
    )
SELECT 
    events.id, 
    events.creator_id, 
    events.description,
    events.date, 
    events.location, 
    events.topic, 
    events.prerequisite, 
    events.event_type_id,
    events.created_at, 
    events.updated_at,
    join_count,
    has_joined,
    has_bookmarked
FROM events
inner join most_joined_events on most_joined_events.id = events.id
inner join my_joined_events on my_joined_events.id = events.id
inner join my_bookmarked_events on my_bookmarked_events.id = events.id 
where 
    events.event_type_id = 1
ORDER BY events.created_at ASC;`, [req.session['user']])
    res.json(notes.rows);
});


//search bar in main page 
// :id placeholder
searchRoute.get('/searchResults/', async (req, res) => {
    if (req.query.q) {
        // const notes = await client.query(`'SELECT * FROM events WHERE topic ILIKE $1 AND event_type_id = $2'`, ['%' + req.query.q + '%', req.query.categoryOption])
        const notes = await client.query(`WITH 
        most_joined_events AS (
            SELECT 
            id, 
            ( SELECT count(*) 
              FROM join_group 
              where join_group.event_id = events.id ) as join_count
            FROM events 
        ), 
        my_joined_events AS (
            SELECT 
            id, 
            ( SELECT count(*) 
              FROM join_group 
              where join_group.event_id = events.id
              and join_group.participant_id = $1) as has_joined
            FROM events 
        ),
        my_bookmarked_events AS (
            SELECT 
            id, 
            ( SELECT count(*) 
              FROM bookmark
              where bookmark.event_id = events.id
              and bookmark.user_id = $1) as has_bookmarked
            FROM events 
        )
    SELECT 
        events.id, 
        events.creator_id, 
        events.description,
        events.date, 
        events.location, 
        events.topic, 
        events.prerequisite, 
        events.event_type_id,
        events.created_at, 
        events.updated_at,
        join_count,
        has_joined,
        has_bookmarked
    FROM events
    inner join most_joined_events on most_joined_events.id = events.id
    inner join my_joined_events on my_joined_events.id = events.id
    inner join my_bookmarked_events on my_bookmarked_events.id = events.id 
    where 
        events.topic ILIKE $2 AND
        events.event_type_id = $3
    ORDER BY events.created_at ASC;`, [req.session['user'],'%' + req.query.q + '%', req.query.categoryOption])
        res.json(notes.rows)
    }
    else {
        res.send('404');
    }
})


//for my page
searchRoute.get('/joined', async (req, res) => {
    console.log('joined by:' + req.session['user']);
    // const notes = await client.query('SELECT * FROM join_group JOIN events on events.id = join_group.event_id WHERE participant_id = $1', [req.session['user']])
    const notes = await client.query(`WITH 
        most_joined_events AS (
            SELECT 
            id, 
            ( SELECT count(*) 
              FROM join_group 
              where join_group.event_id = events.id ) as join_count
            FROM events 
        ), 
        my_joined_events AS (
            SELECT 
            id, 
            ( SELECT count(*) 
              FROM join_group 
              where join_group.event_id = events.id
              and join_group.participant_id = $1) as has_joined
            FROM events 
        ),
        my_bookmarked_events AS (
            SELECT 
            id, 
            ( SELECT count(*) 
              FROM bookmark
              where bookmark.event_id = events.id
              and bookmark.user_id = $1) as has_bookmarked
            FROM events 
        )
    SELECT 
        events.id, 
        events.creator_id, 
        events.description,
        events.date, 
        events.location, 
        events.topic, 
        events.prerequisite, 
        events.event_type_id,
        events.created_at, 
        events.updated_at,
        join_count,
        has_joined,
        has_bookmarked
    FROM events
    inner join most_joined_events on most_joined_events.id = events.id
    inner join my_joined_events on my_joined_events.id = events.id
    inner join my_bookmarked_events on my_bookmarked_events.id = events.id 
    where 
        has_joined = 1
    ORDER BY events.created_at ASC;`, [req.session['user']])
    res.json(notes.rows);
});
searchRoute.get('/bookmarked', async (req, res) => {

    console.log('bookmarked by:' + req.session['user']);

    // const notes = await client.query('SELECT * FROM bookmark JOIN events on events.id = bookmark.event_id WHERE user_id = $1', [req.session['user']])
    const notes = await client.query(`WITH 
    most_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id ) as join_count
        FROM events 
    ), 
    my_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id
          and join_group.participant_id = $1) as has_joined
        FROM events 
    ),
    my_bookmarked_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM bookmark
          where bookmark.event_id = events.id
          and bookmark.user_id = $1) as has_bookmarked
        FROM events 
    )
SELECT 
    events.id, 
    events.creator_id, 
    events.description,
    events.date, 
    events.location, 
    events.topic, 
    events.prerequisite, 
    events.event_type_id,
    events.created_at, 
    events.updated_at,
    join_count,
    has_joined,
    has_bookmarked
FROM events
inner join most_joined_events on most_joined_events.id = events.id
inner join my_joined_events on my_joined_events.id = events.id
inner join my_bookmarked_events on my_bookmarked_events.id = events.id 
where 
    has_bookmarked = 1
ORDER BY events.created_at ASC;`, [req.session['user']])
    res.json(notes.rows);
});