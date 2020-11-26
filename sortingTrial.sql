-- Altered
WITH most_bookmarked_events AS (
    SELECT 
    events.*, 
    ( SELECT count(*) 
      FROM bookmark 
      where bookmark.event_id = events.id ) as bookmark
    FROM events 
    ORDER BY bookmark DESC LIMIT 5
)
SELECT 
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
most_bookmarked_events.updated_at,
join_group.id as join_group_id,
bookmark.id as bookmark_id 
FROM most_bookmarked_events 
left outer join bookmark on bookmark.user_id = 24 and bookmark.event_id = most_bookmarked_events.id
left outer join join_group on most_bookmarked_events.id = join_group.event_id  
and join_group.participant_id = 24
GROUP BY most_bookmarked_events.id, 
most_bookmarked_events.creator_id, 
most_bookmarked_events.description,
most_bookmarked_events.date, 
most_bookmarked_events.location, 
most_bookmarked_events.topic, 
most_bookmarked_events.prerequisite, 
most_bookmarked_events.event_type_id, 
most_bookmarked_events.created_at, 
most_bookmarked_events.updated_at,
join_group_id,
bookmark_id
ORDER BY most_bookmarked_events.date DESC;




-- original
WITH most_bookmarked_events AS (
        SELECT 
        events.*, 
        ( SELECT count(*) 
          FROM bookmark 
          where bookmark.event_id = events.id ) as bookmark
        FROM events 
        ORDER BY bookmark DESC LIMIT 5
    )
        SELECT 
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
        GROUP BY most_bookmarked_events.id, 
        most_bookmarked_events.creator_id, 
        most_bookmarked_events.description,
        most_bookmarked_events.date, 
        most_bookmarked_events.location, 
        most_bookmarked_events.topic, 
        most_bookmarked_events.prerequisite, 
        most_bookmarked_events.event_type_id, 
        most_bookmarked_events.created_at, 
        most_bookmarked_events.updated_at
        ORDER BY most_bookmarked_events.date DESC LIMIT 5;



-- matching user's joined and bookmarked events for 熱門--> joined & bookmarked button 
WITH most_bookmarked_events AS (
    SELECT 
    events.*, 
    ( SELECT count(*) 
      FROM bookmark 
      where bookmark.event_id = events.id ) as bookmark
    FROM events 
    ORDER BY bookmark DESC LIMIT 5
)
SELECT 
most_bookmarked_events.id, 
most_bookmarked_events.date, 
join_group.id as join_group_id,
bookmark.id as bookmark_id 
FROM most_bookmarked_events 
left outer join bookmark on bookmark.user_id = 24 and bookmark.event_id = most_bookmarked_events.id
left outer join join_group on most_bookmarked_events.id = join_group.event_id  
and join_group.participant_id = 24
GROUP BY most_bookmarked_events.id, 
most_bookmarked_events.date, 
join_group_id,
bookmark_id
ORDER BY most_bookmarked_events.date DESC;  



-- matching user's joined and bookmarked events for 接近成團--> joined & bookmarked button 
WITH 
    most_joined_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id ) as join_count
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
        (join_count * 100 / events.prerequisite) as percent  
    FROM events
    inner join most_joined_events on most_joined_events.id = events.id
    where 
    events.prerequisite > 0
        and 
        join_count < events.prerequisite
    ORDER BY percent desc LIMIT 5;




-- Gordon's recommendations
select * from users inner join join_group on users.id = join_group.participant_id;
select * from join_group where event_id in (1,2,3,4,5);


-- Trial of sorting by bookmark

    WITH 
    most_bookmarked_events AS (
        SELECT 
        id, 
        ( SELECT count(*) 
          FROM bookmark 
          where book.event_id = events.id ) as bookmark_count
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
        bookmark_count,
    FROM events
    inner join most_bookmarked_events on most_bookmarked_events.id = events.id
    where 
    events.prerequisite > 0
        and 
        join_count < events.prerequisite
    ORDER BY percent desc LIMIT 5;