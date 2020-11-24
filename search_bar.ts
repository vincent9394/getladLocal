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
    const notes = await client.query('SELECT * FROM events WHERE event_type_id = 2 ORDER BY created_at ASC')
    res.json(notes.rows);
});

searchRoute.get('/search-foodie-group', async (req, res) => {
    // const participantNumber = (await client.query('SELECT *, (SELECT count(*) FROM join_group where event_id = events.id) as join_group FROM events;')).rows
    // console.log(participantNumber);
    const notes = await client.query('SELECT * FROM events WHERE event_type_id = 3 ORDER BY created_at ASC')
    res.json(notes.rows);
});


//search bar in main page (form submission)
// searchRoute.post('/searchResults', async function (req, res, next) {
//     console.log('herehi');
    
//     res.redirect('/searchResults.html?categoryOption=' + req.body.categoryOption + '&q=' + req.body.q);

// });
searchRoute.get('/searchResults', async (req, res) => {
    if (req.query.q) {
        // console.log(req.query.q);
        // console.log(req.query.categoryOption?.toString());
        // const categoryOptionString: any = req.query.categoryOption?.toString()
        // const categoryOption = parseInt(categoryOptionString)
        // console.log(categoryOption);
        

        res.redirect('/searchResults.html?categoryOption=' + req.query.categoryOption + '&q=' + req.query.q);
        // const notes = await client.query('SELECT * FROM events where event_type_id = $1 AND topic::text ILIKE $2',['categoryOption','%req.query.q%'])
        const notes = await client.query('SELECT * FROM events WHERE topic ILIKE $1' ,['%'+req.query.q +'%'] )
        res.json(notes.rows)
        // console.log(notes.rows);
        
        

    }
    else {
        // serve normal search form, user just came into the search page
        return res.render('main/search');
    }

    // console.log(req.body);

})
