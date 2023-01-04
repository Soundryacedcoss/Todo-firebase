import React, { useState } from "react";
import "./LandingPage.css";
import { getDatabase, ref, push } from "firebase/database";
import FirebaseApp from "./Firebase";
import { DisplayTodo } from "./DisplayTodo";
export const LandingPage = () => {
  const [input, setInput] = useState("");
  const InputHandler = (e) => {
    setInput(e.target.value);
  };
  const AddTodoHandler = () => {
    const db = getDatabase(FirebaseApp);
    const todoRef = ref(db, "/todos");
    const todo = {
      input,
      done: false,
    };

    push(todoRef, todo);
  };
  return (
    <div className="LandingPage">
      <h2>Todo Input</h2>
      <div className="TodoInputContainer">
        <div className="input-group mb-3">
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ backgroundColor: "#0a58ca" }}
          >
            📋
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={input}
            onChange={InputHandler}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={AddTodoHandler}
          >
            Add New Task
          </button>
        </div>
      </div>

      <div>
        <h2>Todo List</h2>
        <button
          type="button"
          className="btn btn-primary active"
          data-bs-toggle="button"
          autocomplete="off"
          aria-pressed="true"
          style={{ paddingLeft: "4%", paddingRight: "4%", width: "20%" }}
        >
          All
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
          }}
        >
          Done
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
          }}
        >
          Todo
        </button>
        {<DisplayTodo />}
        <br />
        <br />
        <div></div>
      </div>
    </div>
  );
};
