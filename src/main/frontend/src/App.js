import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

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
            <form onSubmit={createTodo}>
                Todo &nbsp;
                <input type="text" required={true} value={input} onChange={changeText}/>
                <input type="submit" value="Create"/>
            </form>
            {
                todoList
                    ? todoList.map((todo) => {
                        return (
                            <div className="todoList" key={todo.id}>
                                <h3>
                                    <label className={todo.completed ? "completed" : null}
                                           onClick={() => updateTodo(todo.id)}>
                                        {todo.todoName}
                                    </label>
                                    <label onClick={() => delete(todo.id)}>&nbsp;&nbsp;&nbsp;❌</label>
                                </h3>
                            </div>
                        )
                    })
                    : null
            }
        </div>
    );
}

export default App;
