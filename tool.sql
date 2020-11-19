

select topic, description, prerequisite,
(select count(*) from join_group where event_id = ?) ppl
from event where event.id = ?