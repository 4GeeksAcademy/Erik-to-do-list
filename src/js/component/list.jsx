import React, { useState,useEffect } from "react";

const List = () => {

    const [task, setTask] = useState("");
    const [todo, setTodo] = useState([]);

    useEffect (() => {
        fetch ('https://playground.4geeks.com/todo/users/erik')
        .then(resp => resp.json())
        .then(respJson => {
            const serverTodos = respJson.todos
            setTodo(serverTodos)
        })
    }, [])


    const createTodo = async (task) => {
        await fetch ('https://playground.4geeks.com/todo/todos/erik', {
            method: 'POST',
            body: JSON.stringify({
                "label": task,
                "is_done": false
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
    }).then (resp => resp.json())
    .then (respJson => {
        const newTodo = [...todo,respJson]
        setTodo(newTodo)
    })
        
    }


    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            createTodo(e.target.value)
            setTask("");
        };
    };

 

    const deleteTask = (index) => {
        const newTodo = todo.filter((_,i) => i !== index);
        setTodo(newTodo);
    };

    const deleteTodo = (id) => {
          fetch (`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE'
        }).then(() => setTodo(todo.filter(item => item.id !== id)))
    }


    const deleteAllTask = async () => {
        const deleteAll = todo.map(item =>  
            fetch (`https://playground.4geeks.com/todo/todos/${item.id}`, {
            method: 'DELETE'
        }))
        console.log(deleteAll)
        await Promise.all(deleteAll).then(() => setTodo([]))
    }

    return (

        <div className="container">
            <h1 className="font-monospace mb-3">TO DO LIST</h1>
            <input className="input mb-3"
                type="text"
                placeholder="Add a new task"
                value={task}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <ul className="task">
                {todo.map((item) => (
                    <li className="index"
                        key={item.id}>
                        <span>{item.label}</span>
                        <button className="delete" onClick={() => deleteTodo(item.id)}><i className="fa-solid fa-x" /></button>
                       
                    </li>
                ))}
            </ul>
            <button className="but" onClick={() => deleteAllTask()}>delete all</button>
            <p className="mt-3"> Tareas restantes: {todo.length}</p>
        </div>
    );
}

export default List;