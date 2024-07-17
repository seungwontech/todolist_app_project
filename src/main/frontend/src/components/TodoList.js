import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todoList, updateTodo, deleteTodo }) {
    return (
        <div>
            {todoList.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleClick={() => updateTodo(todo.id)}
                    handleDelete={() => deleteTodo(todo.id)}
                />
            ))}
        </div>
    );
}

export default TodoList;
