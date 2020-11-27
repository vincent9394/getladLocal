import { client } from './db'
import express from 'express'

let app = express()

app.use(express.static('public'))

export const sortingRoute = express.Router();



// most bookmarked sorting
sortingRoute.get('/sorting_by_most_bookmarked', async (req, res) => {
    let sortingResult = await client.query(`
WITH 
    most_bookmarked_events AS (
        SELECT 
        events.*, 
        ( SELECT count(*) 
          FROM bookmark 
          where bookmark.event_id = events.id ) as bookmark
        FROM events 
    )
SELECT 
    most_bookmarked_events.bookmark,
    most_bookmarked_events.id, 
    count(participant_id) as participants, 
    most_bookmarked_events.creator_id, 
    most_bookmarked_events.description,
    most_bookmarked_events.date, 
    most_bookmarked_events.location, 
    most_bookmarked_events.topic, 
    most_bookmarked_events.prerequisite, 
    most_bookmarked_events.event_type_id, 
    most_bookmarked_events.created_at, 
    most_bookmarked_events.updated_at
FROM most_bookmarked_events 
left outer join join_group on most_bookmarked_events.id = join_group.event_id  
GROUP BY 
    most_bookmarked_events.id, 
    most_bookmarked_events.creator_id, 
    most_bookmarked_events.description,
    most_bookmarked_events.date, 
    most_bookmarked_events.location, 
    most_bookmarked_events.topic, 
    most_bookmarked_events.prerequisite, 
    most_bookmarked_events.event_type_id, 
    most_bookmarked_events.created_at, 
    most_bookmarked_events.updated_at,
    most_bookmarked_events.bookmark
ORDER BY 
    most_bookmarked_events.bookmark DESC,
    most_bookmarked_events.date DESC
    LIMIT 3
;`)
        res.json(sortingResult.rows)
    })



// Showing if user has joined and bookmarked 
sortingRoute.get('/if_joined_and_bookmarked', async (req, res) => {
    let joinAndBookmark = await client.query (`
    WITH most_bookmarked_events AS (
        SELECT 
        events.*, 
        ( SELECT count(*) 
          FROM bookmark 
          where bookmark.event_id = events.id ) as bookmark
        FROM events 
    )
    SELECT 
    most_bookmarked_events.id, 
    most_bookmarked_events.date, 
    join_group.id as join_group_id,
    bookmark.id as bookmark_id 
    FROM most_bookmarked_events 
    left outer join bookmark on bookmark.user_id = 20 and bookmark.event_id = most_bookmarked_events.id
    left outer join join_group on most_bookmarked_events.id = join_group.event_id  
    and join_group.participant_id = 20
    GROUP BY most_bookmarked_events.id, 
    most_bookmarked_events.date, 
    join_group_id,
    bookmark_id,
    most_bookmarked_events.bookmark
ORDER BY 
    most_bookmarked_events.bookmark DESC,
    most_bookmarked_events.date DESC
LIMIT 3
    ;
    `)  
    res.json(joinAndBookmark.rows)
})



    
// highest successful rate sorting
sortingRoute.get('/sorting_by_successful_rate', async (req, res) => {
    let sortingResult = await client.query(`
    WITH 
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
              and join_group.participant_id = 15) as has_joined
            FROM events 
        ),
        my_bookmarked_events AS (
            SELECT 
            id, 
            ( SELECT count(*) 
              FROM bookmark
              where bookmark.event_id = events.id
              and bookmark.user_id = 15) as has_bookmarked
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
        has_bookmarked,
        (join_count * 100 / events.prerequisite) as percent  
    FROM events
    inner join most_joined_events on most_joined_events.id = events.id
    inner join my_joined_events on my_joined_events.id = events.id
    inner join my_bookmarked_events on my_bookmarked_events.id = events.id 
    where 
    events.prerequisite > 0
        and 
        join_count < events.prerequisite
    ORDER BY percent desc LIMIT 3;`)
    res.json(sortingResult.rows)
})



