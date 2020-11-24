let client: any
export async function getEventList() {
    let result = await client.query(`
    select * from events
    `)
    let events = result.rows
    for (let event of events) {
        result = await client.query(`
        select * from join_group
        where event_id = $1
        `, [event.id])
        let join = result.rows.length
        event.joinCount = join
    }
    return events
}