import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export let client = new pg.Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_ADMIN_USERNAME,
    password: process.env.DB_ADMIN_PASSWORD
});

client
  .connect()
  .then(() => {
    console.log('connected database');
  })
  .catch((err) => {
    console.error('failed to connect database:', err);
  });
