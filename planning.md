Join button routine

1. check if it is logged in (so that I could find the user.id) --> isLogin function
    (supposedly, join_group table should have all users' joined record)
    If `req.session.username` is not found --> not logged in --> server will responds the function written in the JS file which sorts the results

2. check if the user has already joined the event by looking up the join_group table --> how ?? 
   `let abc = await client.query(SELECT * FROM join_group where participant_id = ? and event_id = ?)`
   if (abc.rows.length == 0) {
       situation 1.1 
   } else {
       situation 1.2
   }

3. Situation 1.1: if there is no record of the user joining that event
    clicking the `joinButton` should connect to the server & the server will respond `let abc = await client.query('INSERT into join_group (event_id, participant_id) VALUES ($1, $2)', [])`
    if (abc.rows.length >= 0){
    res.json({result: true})
    }

4. Situation 1.2: if there is A record of the user joining that event
    clicking the `unJoinButton` should connect to the server & the server will respond `client.query('DELETE FROM join_group where event_id = ? and particpant_id = ?')`