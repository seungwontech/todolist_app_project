import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {

    const baseUrl = "http://localhost:8080";
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        getTodoList();
    }, []);

    async function getTodoList() {
        await axios
            .get(baseUrl + "/todo")
            .then((response) => {
                setTodoList(response.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function createTodo(e) {
        e.preventDefault();
        const createTodo = async () => {
            await axios
                .post(baseUrl + "/todo", {
                    todoName: input
                })
                .then((response) => {
                    setInput("");
                    getTodoList();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        createTodo();
    }

    function updateTodo(id) {
        const updateTodo = async () => {
            await axios
                .put(baseUrl + "/todo/" + id, {})
                .then((response) => {
                    setTodoList(
                        todoList.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        updateTodo();
    }

    function deleteTodo(id) {
        const updateTodo = async () => {
            await axios
                .delete(baseUrl + "/todo/" + id, {})
                .then((response) => {
                    setTodoList(
                        todoList.filter((todo) => todo.id !== id)
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        updateTodo();
    }

    function changeText(e) {
        e.preventDefault();
        setInput(e.target.value)
    }

    return (
        <div className="App">
            <h1>TODO LIST</h1>
            <TodoInput handleSubmit={createTodo} input={input} handleChange={changeText}/>

            {
                todoList
                    ? todoList.map((todo) => {
                        return (
                            <TodoList key={todo.id} todo={todo}
                                      handleClick={() => updateTodo(todo.id)}
                                      handleDelete={() => deleteTodo(todo.id)}/>
                        )
                    })
                    : null
            }
        </div>
    );
}

export default App;
