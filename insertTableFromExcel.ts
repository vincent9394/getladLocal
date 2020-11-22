// import database from postgresql
import { Client } from 'pg'
// import xlsx library to write file to the database
import xlsx from 'xlsx'
// read .env file
import dotenv from 'dotenv'
dotenv.config()


const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME_ADMIN,
    password: process.env.DB_PASSWORD_ADMIN
})

const workbook = xlsx.readFile('./ExcelTables/GetLad.xlsx')
const usersWorksheet = workbook.Sheets['users']
// const bookmarkWorksheet = workbook.Sheets['bookmark']
// const joinGroupWorksheet = workbook.Sheets['join_group']
// const eventsWorksheet = workbook.Sheets['events']
// const eventTypesWorksheet = workbook.Sheets['event_types']

    ; (async () => {
        await client.connect()

        const users: { ID: number, name: string, login_name: string, password: string, isAdmin: boolean, created_at: Date, last_login: Date}[] = xlsx.utils.sheet_to_json(usersWorksheet)
        for (const user of users) {
            await client.query(`INSERT INTO users (ID, name, login_name, password, isAdmin, created_at, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [user.ID, user.name, user.login_name, user.password, user.isAdmin, user.created_at, user.last_login])
        }

        // const memos: any[] = xlsx.utils.sheet_to_json(bookmarkWorksheet)
        // for (const memo of memos) {
        //     await client.query(`INSERT INTO memos (content, image, created_t, updated_at) VALUES ($1, $2, NOW(), NOW())`, [memo.content, memo.image])
        // }
        // await client.end()
    })()
