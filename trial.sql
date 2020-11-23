
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