
/*subquery*/
SELECT *, 
   (SELECT count(*) 
     FROM bookmark 
     where event_id = events.id) 
     as bookmark 
     FROM events 
     ORDER BY bookmark DESC LIMIT 5;


SELECT *, (SELECT count(*) FROM join_group where event_id = events.id) as join_group FROM events;


/* join */
SELECT events.description,
       events.date,
       events.location , 
       count(bookmark.id) as bookmark_count 
    FROM events 
    inner join bookmark on events.id = bookmark.event_id 
    group by  
        events.description, 
        events.date, 
        events.location 
    order by bookmark_count desc limit 5;



WITH most_bookmarked_events AS (
        SELECT 
        events.*, 
        ( SELECT count(*) 
          FROM bookmark 
          where bookmark.event_id = events.id ) as bookmark
        FROM events 
        ORDER BY bookmark DESC LIMIT 5
    )
SELECT most_bookmarked_events.id, count(participant_id) as participants 
    from most_bookmarked_events 
    left outer join join_group  on most_bookmarked_events.id = join_group.event_id 
    group by most_bookmarked_events.id;



WITH 
    most_joined_events AS (
        SELECT 
        events.id, 
        ( SELECT count(*) 
          FROM join_group 
          where join_group.event_id = events.id ) as join_count
        FROM events 
    )
SELECT 
    events.id, 
    prerequisite,
    join_count,
    (join_count * 100 / prerequisite) as percent  
FROM events
inner join most_joined_events on most_joined_events.id = events.id
where 
    prerequisite > 0
    and 
    join_count < prerequisite
ORDER BY percent desc
;



SELECT * FROM events LEFT OUTER JOIN join_group on events.id = join_group.event_id WHERE join_group.participant_id = req.session.user.id ORDER BY events.date desc;
SELECT * FROM events LEFT OUTER JOIN join_group on events.id = join_group.event_id WHERE join_group.participant_id = 24 ORDER BY events.date desc;


SELECT * FROM events LEFT OUTER JOIN bookmark on events.id = bookmark.event_id WHERE bookmark.user_id = req.session.user.id ORDER BY events.date desc;
SELECT * FROM events LEFT OUTER JOIN bookmark on events.id = bookmark.event_id WHERE bookmark.user_id = 23 ORDER BY events.date desc;