import express, { Request, Response } from 'express';
// import { checkPassword, hashPassword } from './hash';
import { client } from './db';
// import { isLoggedIn } from './guards';
// import fetch from 'node-fetch';

export let userRoute = express.Router();

//userRoute.post('/user', signup);
userRoute.get('/login/google', loginWithGoogle);
// userRoute.post('/login', login);
// userRoute.get('/logout', logout);
userRoute.get('/profile', loadProfile);
//userRoute.get('/profile.html', isLoggedIn);

// async function signup(req: Request, res: Response) {
//   console.log('sign up user');
//   let { username, password } = req.body;
//   let hash = await hashPassword(password);
//   console.log({ username, password, hash });
//   let result = await client.query(
//     `
// insert into "users" (login_name,password) values ($1,$2)
// returning id
//   `,
//     [username, hash],
//   );
//   let id = result.rows[0].id;
//   res.json({ id });
// }

// async function login(req: Request, res: Response) {
//   let { username, password } = req.body;
//   let userResult = await client.query(
//     `
// select id,password from "user"
// where username = $1
//     `,
//     [username],
//   );
//   let user = userResult.rows[0];
//   if (!user) {
//     // this will leak the existence of the user
//     // res.status(403).json('wrong username');

//     // this will not let the hacker infer if the user exist
//     res.status(403).redirect('/login.html?error=wrong+username+or+password');

//     return;
//   }
//   let hashedPassword = user.password;
//   if (!hashedPassword) {
//     res.status(403).redirect('/login.html?error=please+use+google+to+login');
//     return;
//   }
//   let match = await checkPassword(password, hashedPassword);
//   if (!match) {
//     res.status(403).redirect('/login.html?error=wrong+username+or+password');
//     return;
//   }
//   req.session['user'] = {
//     id: user.id,
//     username,
//   };
//   res.redirect('/');
// }

async function loginWithGoogle(req: Request, res: Response) {
  const accessToken = req.session?.['grant'].response.access_token;
  // console.log('access token:', accessToken);
  const fetchRes = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  let googleUser = await fetchRes.json();
  let { email } = googleUser;

  let result = await client.query(
    `
select id from "user"
where username = $1
  `,
    [email],
  );
  if (result.rowCount == 0) {
    // new user
    let result = await client.query(
      `
  insert into "user" (username) values ($1)
  returning id
    `,
      [email],
    );
    let id = result.rows[0].id;
    req.session['user'] = {
      id,
      username: email,
    };
  } else {
    // existing user
    let id = result.rows[0].id;
    req.session['user'] = {
      id,
      username: email,
    };
  }
  res.redirect('/');
}

function loadProfile(req: Request, res: Response) {
  res.json(req.session['user']);
}

// function logout(req: Request, res: Response) {
//   delete req.session['user'];
//   res.redirect('/');
// }
