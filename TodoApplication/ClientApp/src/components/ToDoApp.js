import React, { useState, useEffect } from 'react';
import './ToDoApp.css';

const ToDoApp = () => {

    const [todoEvents, setTodoEvents] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [detailsInput, setDetailsInput] = useState('');
    const [operation, setOperation] = useState('Add');
    const [evId, setEvId] = useState(0);

    useEffect(() => {
        getTodoEvents();
    }, []);

    /** Funtction for getting all todo events */
    async function getTodoEvents() {
        const response = await fetch('api/todoevent');
        if (response.ok) {
            const data = await response.json();
            setTodoEvents(data);
        }
        else {
            alert("HTTP-Error:" + response.status)
            setTodoEvents([]);
        }
    }

    /** Funtction for deleting a todo event */
    async function deleteTodoEvent(eventId) {
        const response = await fetch('api/todoevent/' + eventId, {
            method: 'DELETE',
            });
        if (response.ok) {
            //const data = await response.json();
            getTodoEvents();
        }
        else {
            alert("HTTP-Error:" + response.status)
            setTodoEvents([]);
        }
    }

    /** Funtction for updating a todo event */
    async function updateTodoEvents() {
        const response = await fetch('api/todoevent/' + evId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id: evId, Title: titleInput, Detail: detailsInput })
        });
        if (response.ok) {
            getTodoEvents();
        }
        else {
            alert("HTTP-Error:" + response.status)
            setTodoEvents([]);
        }
    }

    /** Funtction for adding a todo event */
    async function addTodoEvents() {
        const response = await fetch('api/todoevent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id: evId, Title: titleInput, Detail: detailsInput })
        });
        if (response.ok) {
            getTodoEvents();
        }
        else {
            alert("HTTP-Error:" + response.status)
            setTodoEvents([]);
        }
    }

    const handleUpdate = eventId => {
        console.log(eventId);
        const eventToUpdated = todoEvents.find(e => e.id === eventId);
        setTitleInput(eventToUpdated?.title);
        setDetailsInput(eventToUpdated?.detail)
        setOperation('Update');
        setEvId(eventId);
    };

    const handleOperation = () => {
        if (titleInput && titleInput.length > 0 && detailsInput && detailsInput.length > 0) {
            if (operation === 'Add') {
                addTodoEvents()
            } else {
                updateTodoEvents();
                setOperation('Add');
            }
            setTitleInput('');
            setDetailsInput('');
        }
    };

    const handleDelete = eventId => {
        deleteTodoEvent(eventId);
    };

    const handleTitleInput = event => {
        setTitleInput(event.target.value);
    };

    const handleDetailsInput = event => {
        setDetailsInput(event.target.value);
    };

    return (
        <div>
            <div>
                <h1>TODO event</h1>
            </div>
            <div>
                <h2>Title</h2>
                <input className="titleInput" value={titleInput} onChange={handleTitleInput} />
            </div>
            <div>
                <h2>Details</h2>
                <textarea className="detailsInput" value={detailsInput} onChange={handleDetailsInput} />
            </div>
            <div>
                <button onClick={() => handleOperation()}>{ operation }</button>
            </div>
            <div className="todoList">
                <h2>TODO List</h2>
                <table className="table" aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Details</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoEvents?.map((e, index) =>
                            <tr key={e.id}>
                                <td>{e.date}</td>
                                <td>{e.title}</td>
                                <td>{e.detail}</td>
                                <td>
                                    <button className="button" onClick={() => handleUpdate(e.id)}>update</button> | <button className="button" onClick={() => handleDelete(e.id)}>delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ToDoApp;