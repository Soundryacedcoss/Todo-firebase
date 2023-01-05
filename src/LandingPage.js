import React from "react";
import "./LandingPage.css";
import { getDatabase, ref, push } from "firebase/database";
import FirebaseApp from "./Firebase";
import { DisplayTodo } from "./DisplayTodo";
import { addTodo, disableTodo, checkTodo } from "./Reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
export const LandingPage = () => {
  // Taking state from redux
  const add = useSelector((state) => state.FirebaseData);
  const dispatch = useDispatch();
  const InputHandler = (e) => {
    dispatch(addTodo(e.target.value));
  };
  // Adding task in list 
  const AddTodoHandler = () => {
    if (add.todo !== "") {
      const db = getDatabase(FirebaseApp);
      const todoRef = ref(db, "/todos");
      const todo = {
        input: add.todo,
        done: false,
      };
      push(todoRef, todo);
      dispatch(addTodo(" "));
      dispatch(disableTodo(false));
    } else {
      alert("Please write something");
    }
  };
// Showing all task functinality
  const AllButtonHandler = () => {
    dispatch(checkTodo("all"));
  };
  // Showing done task
  const DoneButtonHandler = () => {
    dispatch(checkTodo("done"));
    console.log(add.show);
  };
  // showing todo task
  const TodoButtonHandler = () => {
    dispatch(checkTodo("Todo"));
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
            placeholder="Write todo here...."
            value={add.todo}
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
          autoComplete="off"
          aria-pressed="true"
          onClick={AllButtonHandler}
          style={{ paddingLeft: "4%", paddingRight: "4%", width: "20%" }}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-primary active"
          data-bs-toggle="button"
          autoComplete="off"
          aria-pressed="true"
          onClick={DoneButtonHandler}
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
          autoComplete="off"
          aria-pressed="true"
          onClick={TodoButtonHandler}
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
