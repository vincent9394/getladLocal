// import database from postgresql
import pg from 'pg'
// import xlsx library to write file to the database
import xlsx from 'xlsx'
// read .env file
import dotenv from 'dotenv'
dotenv.config()


export const client = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_ADMIN_USERNAME,
    password: process.env.DB_ADMIN_PASSWORD
});

const workbook = xlsx.readFile('./ExcelTables/GetLad_copy.xlsx')
const usersWorksheet = workbook.Sheets['users']
const bookmarkWorksheet = workbook.Sheets['bookmark']
const joinGroupWorksheet = workbook.Sheets['join_group']
const eventsWorksheet = workbook.Sheets['events']
const eventTypesWorksheet = workbook.Sheets['event_types']

    ; (async () => {
        await client.connect()

        const users: { name: string, login_name: string, password: string, isAdmin: boolean, created_at: Date, last_login: Date }[] = xlsx.utils.sheet_to_json(usersWorksheet)
        for (const user of users) {
            await client.query(`INSERT INTO users (name, login_name, password, isAdmin, created_at, last_login) VALUES ($1, $2, $3, $4, $5, $6)`, [user.name, user.login_name, user.password, user.isAdmin, user.created_at, user.last_login])
        }
        const eventTypes: { type: string }[] = xlsx.utils.sheet_to_json(eventTypesWorksheet)
        for (const eventType of eventTypes) {
            await client.query(`INSERT INTO event_types (type) VALUES ($1)`, [eventType.type])
        }

        const events: {creator_id: number, description: string, date: Date, location: string, topic: string, prerequisite: number, event_type_id: number, created_at: Date, updated_at: Date }[] = xlsx.utils.sheet_to_json(eventsWorksheet)
        for (const event of events) {
            await client.query(`INSERT INTO events (creator_id, description, date, location, topic, prerequisite, event_type_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [event.creator_id, event.description, event.date, event.location, event.topic, event.prerequisite, event.event_type_id, event.created_at, event.updated_at])
        }

        const bookmarks: {event_id: number, user_id: number }[] = xlsx.utils.sheet_to_json(bookmarkWorksheet)
        for (const bookmark of bookmarks) {
            await client.query(`INSERT INTO bookmark (event_id, user_id) VALUES ($1, $2)`, [bookmark.event_id, bookmark.user_id])
        }

        const joinGroups: {event_id: number, participant_id: number }[] = xlsx.utils.sheet_to_json(joinGroupWorksheet)
        for (const joinGroup of joinGroups) {
            await client.query(`INSERT INTO join_group (event_id, participant_id) VALUES ($1, $2)`, [joinGroup.event_id, joinGroup.participant_id])
        }

        await client.end()
    })()