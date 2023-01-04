import { useEffect, useState } from "react";
import React from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import FirebaseApp from "./Firebase";
import "./DisplayTodo.css";
export const DisplayTodo = () => {
  const db = getDatabase(FirebaseApp);
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const todoRef = ref(db, "/todos");
    onValue(todoRef, (snapshot) => {
      const list = [];
      const todos = snapshot.val();
      for (let id in todos) {
        list.push({ id, ...todos[id] });
      }
      setTodoList(list);
    });
  }, []);
  const checkboxClickHandler = (todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    console.log(todo.id);
    update(todoRef, { done: !todo.done });
  };
  const deleteHandler = (todo) => {
    console.log(todo);
    const todoRef = ref(db, "/todos/" + todo.id);
    remove(todoRef, { id: todo.id });
  };
  return (
    <div>
      {todoList.map((item) => (
        <div className="List">
          {" "}
          <b style={{ float: "left", marginLeft: "2%" }}>{item.input}</b>
          <span
            class="material-symbols-outlined"
            style={{ float: "right", marginLeft: "2%" }}
          >
            edit
          </span>
          <i
            class="material-icons"
            style={{ float: "right", marginLeft: "2%" }}
            onClick={() => deleteHandler(item)}
          >
            delete
          </i>
          <input
            class="form-check-input"
            type="checkbox"
            checked={item.done}
            value=""
            id="flexCheckDefault"
            style={{ float: "right" }}
            onChange={() => checkboxClickHandler(item)}
          />
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary active"
        data-bs-toggle="button"
        autocomplete="off"
        aria-pressed="true"
        style={{ paddingLeft: "4%", paddingRight: "4%", width: "20%",background: "#f70046" }}
      >
        Delete done Task
      </button>
      <button
        type="button"
        className="btn btn-primary active"
        data-bs-toggle="button"
        autocomplete="off"
        aria-pressed="true"
        style={{
          marginLeft: "4%",
          paddingLeft: "4%",
          paddingRight: "4%",
          width: "20%",
          background: "#f70046",

        }}
      >
        Delete all Task
      </button>
      <button
        type="button"
        className="btn btn-primary active"
        data-bs-toggle="button"
        autocomplete="off"
        aria-pressed="true"
        style={{
          marginLeft: "4%",
          paddingLeft: "4%",
          paddingRight: "4%",
          width: "20%",
          background: "#f70046",
        }}
      >
       Delete Todo Task
      </button>
    </div>
  );
};
