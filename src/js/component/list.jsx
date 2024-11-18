import React, { useState } from "react";

const List = () => {

    const [task, setTask] = useState("");
    const [todo, setTodo] = useState([]);

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            setTodo([...todo, task]);
            setTask("");
        };
    };

 

    const deleteTask = (index) => {
        const newTodo = todo.filter((_,i) => i !== index);
        setTodo(newTodo);
    };

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
                {todo.map((task, index) => (
                    <li className="index"
                        key={index}>
                        <span>{task}</span>
                        <button className="delete" onClick={() => deleteTask(index)}><i className="fa-solid fa-x" /></button>
                    </li>
                ))}
            </ul>
            <p className="mt-3"> Tareas restantes: {todo.length}</p>
        </div>
    );
}

export default List;