import express from 'express'
import { client } from './db';
// import path from 'path'
// import moment from 'moment'
// // import fs from 'fs'
// import bodyParser from 'body-parser'
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


