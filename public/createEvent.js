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
        setTimeout(function(){// wait for 5 secs(2)
            location.reload(); // then reload the page.(3)
       }, 5000);
        
    } else {
        alert('錯誤')
    }
})


////delete event
const deleteEventContent = document.querySelector("#deleteEvents")



async function deleteEvents() {
    const deleteEventForm = document.querySelector('#deleteEventForm')
    const loadDeleteEvents = async () => {
        const res = await fetch('/showDeleteEvent');
        searchResults = await res.json();
        await displayDeleteEvents(searchResults);

    };
    const displayDeleteEvents = (events) => {
        const htmlString = events
            .map((event) => {
                return ` <option class="deleteEventOptions" name="${event.topic}" value="${event.id}" data-id="${event.id}">${event.topic}</option>
        `;
            })
            .join('');

        deleteEventContent.innerHTML = htmlString;
    };
    await loadDeleteEvents();


    deleteEventForm.addEventListener('submit', async (event) => {
        const deleteEventOption = await deleteEventForm.querySelector('select[name=deleteEvents]').value;
        console.log(deleteEventOption);
        event.preventDefault();

        console.log(deleteEventOption);
        const res = await fetch('/deleteEvent/' + deleteEventOption, {
            method: 'DELETE',
        })
        const json = await res.json();
        if (json.result) {
            $('#deleteEventModal').modal('hide')
            $('#success-delete-event').modal('show')
            setTimeout(function(){// wait for 5 secs(2)
                location.reload(); // then reload the page.(3)
           }, 5000);
            
            
        } else {
            alert('錯誤')
        }
        await loadDeleteEvents();
    })




}
deleteEvents()