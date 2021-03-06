import express from 'express'
import { searchRoute } from './search_bar';
import { sortingRoute } from './sorting';
import {createEventRoute} from './createEvent'
import {bottomBarRoute} from './bottomBar'
import {googleMapRoute} from './googleMap'
import dotenv from 'dotenv';
import grant from 'grant';
import { client } from './db';
import bcrypt from 'bcryptjs';
import expressSession from 'express-session';
import bodyParser from 'body-parser'
import { logger } from './logger';
import fetch from 'node-fetch';
dotenv.config();
let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const sessionMiddleware = expressSession({
    secret: 'Tecky cohort-12 group-1',
    saveUninitialized:true,
    resave:true
});
app.use(sessionMiddleware)




app.use(express.static('public'))








app.post('/register', async (req, res) => {
  // check login name exists?
   await client.query('INSERT INTO users (login_name, password) VALUES ($1,$2)', 
 [ req.body.username,
    await bcrypt.hash(req.body.password,10)
    ])
    res.redirect('/index.html')
})

app.post('/login', async (req, res) => {
  try{
    const users = (await client.query('SELECT * FROM users WHERE login_name = $1', [
        req.body.username
    ])).rows;
    
    if (users.length == 0 ){
        res.status(400).json({result:false})
    } else {
        console.log('correct user id');
        if (await bcrypt.compare(req.body.password, users[0].password)){
            req.session['user'] = users[0].id
            res.json({result: true})
            console.log(users[0].id)
            
        } else {
            res.status(400).json({result:false})
        }

    }
  }catch(e){
    logger.error(e.message);
    res.status(500).json({result:false,msg:"[USER01]:Failed to login",});
  }
})

app.post('/logout', async (req, res) => {
   console.log("logout server");  
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
       });

})


// app.get('/login/google', async(req,res)=>{
//     const accessToken = req.session?.['grant'].response.access_token;
//     const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
//         headers:{
//             "Authorization":`Bearer ${accessToken}`
//         }
//     });
//     await fetchRes.json()
//     // let users = (await client.query('SELECT * FROM users where login_name = $1', [json.email]))
//     // if(users.length > 0 && req.session != null) {
//     //     req.session["user"] - users[0].id
//     // }
//     res.redirect('/')
// })

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
app.use(bottomBarRoute)
app.use(googleMapRoute)
app.use(createEventRoute)

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
      origin: 'http://localhost:8080', /* ideally should in .env */
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

app.get('/login/google', async (req, res) => {

  const accessToken = req.session?.['grant'].response.access_token;
  const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
    headers:{
      "Authorization":`Bearer ${accessToken}`
    }
  });
  const json = await fetchRes.json();
  console.log(json);
  const users = (await client.query('SELECT * FROM users WHERE login_name = $1', [json.email])).rows;

  if(users.length === 0){
    // insert user based on fetchRes
  }
  if (users.length > 0 && req.session != null) {
    req.session['user'] = users[0].id
    res.redirect('/')
  } else {
    res.redirect('/?error=no_such_user')
  }
  
})
  
  app.get('/currentUser', (req, res) => {
    if (req.session['user'] != null) {
      res.json({
        result: true,
        userId: req.session['user']
      })
    } else {
      res.json({
        result: false
      })
    }
  })



let port = 8080
app.listen(port, () => {
    logger.info(`Listening at http://localhost:${port}/`)
})


