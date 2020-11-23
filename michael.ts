import express from 'express'
import { Request, Response } from 'express'
import expressSession from 'express-session'
import path from 'path'
import moment from 'moment'
import fs from 'fs'
import bodyParser from 'body-parser'        
import multer from 'multer'



const app = express()

app.use(express.static('public'))

app.use(expressSession({                    
    secret: 'why is it called getlad',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
