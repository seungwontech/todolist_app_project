import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {

    const baseUrl = "http://localhost:8080";
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState("");

    // 컴포넌트가 처음 로드될 때 todo 리스트를 가져옴
    useEffect(() => {
        getTodoList();
    }, []);

    // todo 리스트를 가져오는 함수
    const getTodoList = async () => {
        try {
            const response = await axios.get(baseUrl + "/todo");
            setTodoList(response.data);
        } catch (error) {
            console.error("할 일 목록을 가져오는 중 오류 발생:", error);
        }
    };

    // 새로운 todo 추가 함수
    const createTodo = async (e) => {
        e.preventDefault();
        try {
            await axios.post(baseUrl + "/todo", {todoName: input});
            setInput("");
            await getTodoList();
        } catch (error) {
            console.error("할 일을 추가하는 중 오류 발생:", error);
        }
    };

    // todo 업데이트 함수
    const updateTodo = async (id) => {
        try {
            await axios.put(baseUrl + "/todo/" + id, {});
            setTodoList(todoList.map(todo =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            ));
        } catch (error) {
            console.error("할 일을 업데이트하는 중 오류 발생:", error);
        }
    };

    // todo 삭제 함수
    const deleteTodo = async (id) => {
        try {
            await axios.delete(baseUrl + "/todo/" + id, {});
            setTodoList(todoList.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("할 일을 삭제하는 중 오류 발생:", error);
        }
    };

    // 입력값 변경 함수
    const changeText = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    return (
        <div className="App">
            <h1>TODO LIST</h1>
            <TodoInput handleSubmit={createTodo} input={input} handleChange={changeText}/>
            <TodoList
                todoList={todoList}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default App;