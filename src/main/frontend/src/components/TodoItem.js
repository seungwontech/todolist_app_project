import React from 'react';

function TodoItem({ todo, handleClick, handleDelete }) {
    return (
        <div className="todo">
            <h3>
                <label
                    className={todo.completed ? "completed" : null}
                    onClick={handleClick}
                >
                    {todo.todoName}
                </label>
                <label onClick={handleDelete}>&nbsp;&nbsp;&nbsp;❌</label>
            </h3>
        </div>
    );
}

export default TodoItem;
