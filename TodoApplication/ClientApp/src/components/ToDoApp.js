import React, { useState, useEffect } from 'react';
import './ToDoApp.css';
import { format } from "date-fns";

const ToDoApp = () => {

    const [todoList, setTodoList] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [detailsInput, setDetailsInput] = useState('');
    const [operation, setOperation] = useState('Add');
    const [todoId, setTodoId] = useState(0);
    const [apiStatus, setApiStatus] = useState(false);

    useEffect(() => {
        getTodoEvent();
    }, []);

    /* Funtction for getting all todo events */
    async function getTodoEvent() {
        const response = await fetch('api/todoevent');
        if (response.ok) {
            const data = await response.json();
            setTodoList(data);
            setApiStatus(true);
        }
        else {
            alert("HTTP-Error:" + response.status)
            setTodoList([]);
        }
    }

    /* Funtction for deleting a todo event */
    async function deleteTodoEvent(todoId) {
        const response = await fetch('api/todoevent/' + todoId, {
            method: 'DELETE',
        });

        getTodoEvent();
        if (!response.ok) {
            alert("HTTP-Error:" + response.status)
        }
    }

    /* Funtction for updating a todo event */
    async function updateTodoEvent() {
        const response = await fetch('api/todoevent/' + todoId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id: todoId, Title: titleInput, Detail: detailsInput, time: new Date()})
        });

        getTodoEvent();
        if (!response.ok) {
            alert("HTTP-Error:" + response.status)
        }
    }

    /** Funtction for adding a todo event */
    async function addTodoEvent() {
        const response = await fetch('api/todoevent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Title: titleInput, Detail: detailsInput, time: new Date()  })
        });

        getTodoEvent();
        if (!response.ok) {
            alert("HTTP-Error:" + response.status)
        }
    }

    const handleUpdate = todoId => {
        console.log(todoId);
        const eventToUpdated = todoList.find(e => e.id === todoId);
        setTitleInput(eventToUpdated?.title);
        setDetailsInput(eventToUpdated?.detail)
        setOperation('Update');
        setTodoId(todoId);
    };

    const handleOperation = () => {
        if (titleInput && titleInput.length > 0 && detailsInput && detailsInput.length > 0) {
            if (operation === 'Add') {
                addTodoEvent()
            } else {
                updateTodoEvent();
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

    function fromTStoDateString(ts, dateformat) {
        return ts ? format(new Date(ts), dateformat) : null;
    }

    return (
        apiStatus &&
        <div>
            <div>
                <h1>TODO event</h1>
            </div>
            <div>
                <h2>Title</h2>
                <input className="titleInput" value={titleInput} onChange={handleTitleInput} maxLength= '100' />
            </div>
            <div>
                <h2>Details</h2>
                <textarea className="detailsInput" value={detailsInput} onChange={handleDetailsInput} maxLength="500" />
            </div>
            <div>
                <button onClick={handleOperation}>{operation}</button>
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
                        {todoList?.map((e, index) =>
                            <tr key={e.id}>
                                <td>{fromTStoDateString(e.time, "dd/MM/yyy HH:mm")}</td>
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