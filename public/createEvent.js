const createEvent = document.querySelector('#createEvent')
createEvent.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = new FormData(createEvent);
    let joinGroup = "";
    for (const entry of data) {
        joinGroup = entry[1]
    };

    const res = await fetch('/createEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            categoryOption: createEvent.querySelector('select[name=categoryOption]').value,
            topic: createEvent.querySelector('input[name=topic]').value,
            description: createEvent.querySelector('textarea[name=description]').value,
            prerequisite: createEvent.querySelector('input[name=prerequisite]').value,
            location: createEvent.querySelector('input[name=location]').value,
            date: createEvent.querySelector('input[name=date]').value,
            time: createEvent.querySelector('input[name=time]').value,
            joinGroup: joinGroup,
        })
    })
    const json = await res.json();
    if (json.result) {
        $('#createEventModal').modal('hide')
        $('#success-create-event').modal('show')


    } else {
        alert('錯誤')
    }
})