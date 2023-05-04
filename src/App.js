import "./styles.css";
import React, { useState, useEffect } from "react";
import List from "./List";

export default function App() {
  const initialState = JSON.parse(localStorage.getItem("todoList")) || [];
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function handleChange(event) {
    setTodoItem(event.target.value);
  }

  function addItems() {
    if (todoItem === "") {
      return todoList;
    } else {
      setTodoList((prevTodo) => {
        return [
          ...prevTodo,
          {
            value: todoItem,
            id: prevTodo.length
          }
        ];
      });
      setTodoItem("");
    }
  }

  function removeItem(id) {
    setTodoList((oldList) => {
      return oldList.filter((listItem) => listItem.id !== id);
    });
  }

  const TasksList = todoList.map((listItem) => {
    return (
      <List
        key={listItem.id}
        removeItem={() => removeItem(listItem.id)}
        value={listItem.value}
      />
    );
  });

  function handleKey(e) {
    if (e.key === "Enter") {
      addItems();
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">t0d0 - list</h1>
        <div className="tasks--container">
          <input
            type="text"
            required
            className="task--input"
            value={todoItem}
            placeholder="Add Task"
            onChange={handleChange}
            onKeyDown={handleKey}
          />
          <button className="add--task" onClick={addItems}>
            +
          </button>
        </div>
        <div className="lists-container">{TasksList}</div>
      </div>
    </div>
  );
}
