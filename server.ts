import express from 'express'
import {searchRoute} from './search_bar'
import {sortingRoute} from './sorting'
import {createEventRoute} from './createEvent'
import {bottomBarRoute} from './bottomBar'
import {googleMapRoute} from './googleMap'


import dotenv from 'dotenv';


dotenv.config();
import grant from 'grant';
import { client } from './db';
// const { Client } = require('pg');
import bcrypt from 'bcryptjs';
import expressSession from 'express-session';
import bodyParser from 'body-parser'
// import fetch from 'node-fetch'


// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
//   client.connect();

let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// app.use((req,res,next)=> {
//     req['session'] = {
//         user: 15
//     } as any
//     next()
// })

const sessionMiddleware = expressSession({
    secret: 'Tecky cohort-12 group-1',
    saveUninitialized:true,
    resave:true
});
app.use(sessionMiddleware)




app.use(express.static('public'))








app.post('/register', async (req, res) => {
   await client.query('INSERT INTO users (login_name, password) VALUES ($1,$2)', 
 [ req.body.username,
    await bcrypt.hash(req.body.password,10)
    ])
    res.redirect('/index.html')
})

app.post('/login', async (req, res) => {
    const users = (await client.query('SELECT * FROM users WHERE login_name = $1', [
        req.body.username
    ])).rows;
    
    
    if (users.length == 0 ){
        res.json({result:false})
        
    } else {
        console.log('correct user id');
        // if (await bcrypt.compare(req.body.password, users[0].password)){
            req.session['user'] = users[0].id
            res.json({result: true})
            console.log(users[0].id)
            
        // } else {
        //     res.json({result:false})
        // }

    }

})

app.post('/logout', async (req, res) => {
   console.log("logout server");  
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
       });

})


app.get('/login/google', async(req,res)=>{
    const accessToken = req.session?.['grant'].response.access_token;
    const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
        headers:{
            "Authorization":`Bearer ${accessToken}`
        }
    });
    await fetchRes.json()
    // let users = (await client.query('SELECT * FROM users where login_name = $1', [json.email]))
    // if(users.length > 0 && req.session != null) {
    //     req.session["user"] - users[0].id
    // }
    res.redirect('/')
})

// app.get('/currentUser', (req,res)=>{
//     if(req.session['user'] != null) {
//         res.json({
//             result: true,
//             userId: req.session['user']
//         })
//     } else {
//         res.json({
//             result: false
//         })
//     }
// })

app.use(searchRoute)
app.use(sortingRoute)
app.use(createEventRoute)
app.use(bottomBarRoute)
app.use(googleMapRoute)


// app.post('/login', async (req, res) => {
//     console.log(req.body)
//     const users = ( await client.query('SELECT * FROM users WHERE login_name = $1 and password = $2', [
//         req.body.username,
//         req.body.password
//     ])).rows;
//     if (users.length == 0 ){
//                  res.json({result:false})
//          } else{
           
//     res.redirect('/index.html');
// }
// })



const grantExpress = grant.express({
    defaults: {
      origin: 'http://localhost:8080',
      transport: 'session',
      state: true,
    },
    google: {
      key: process.env.GOOGLE_CLIENT_ID || '',
      secret: process.env.GOOGLE_CLIENT_SECRET || '',
      scope: ['email'],
      callback: '/login/google',
    },
  });
  app.use(grantExpress as express.RequestHandler);


  let port = 8080
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})


