import { useEffect, useState } from "react";
import React from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import FirebaseApp from "./Firebase";
import "./DisplayTodo.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  disableTodo,
  doneTodo,
  incompleteTodo,
} from "./Reducer/reducer";
export const DisplayTodo = () => {
  const add = useSelector((state) => state.FirebaseData);
  const dispatch = useDispatch();
  const db = getDatabase(FirebaseApp);
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const todoRef = ref(db, "/todos");
    onValue(todoRef, (snapshot) => {
      const list = [];
      let temp = [];
      let todo = [];
      const todos = snapshot.val();
      for (let id in todos) {
        list.push({ id, ...todos[id] });
        // Filltering todo list here
        if (todos[id].done === true) {
          temp.push({ id, ...todos[id] });
        } else if (todos[id].done === false) {
          todo.push({ id, ...todos[id] });
        }
      }
      dispatch(doneTodo(temp));
      dispatch(incompleteTodo(todo));
      setTodoList(list);
    });
  }, [db, dispatch]);
  const checkboxClickHandler = (todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    console.log(todo.id);
    update(todoRef, { done: !todo.done });
  };
  // Deleting a particular task
  const deleteHandler = (todo) => {
    let confirm = window.confirm(" task will delete ");
    if (confirm === true) {
      const todoRef = ref(db, "/todos/" + todo.id);
      remove(todoRef, { id: todo.id });
    }
  };
  // Here i am deleting the all complete task
  const DltDoneHandler = (val) => {
    let confirm = window.confirm(
      "Are uh sure you want to delete All complete task"
    );
    if (confirm === true) {
      // window.location.reload()
      const todoRef = ref(db, "/todos");
      onValue(todoRef, (snapshot) => {
        const todos = snapshot.val();
        for (let id in todos) {
          if (todos[id].done === true) {
            const todoRef = ref(db, "/todos/" + id);
            remove(todoRef);
          }
        }
      });
    }
  };
  // Here i am deleting all tasks
  const dltAllHandler = () => {
    let confirm = window.confirm("Are uh sure you want to delete All task");
    if (confirm === true) {
      const todoRef = ref(db, "/todos/");
      remove(todoRef);
    }
  };
  // deleting incomplete task
  const DltTodoHandler = () => {
    let confirm = window.confirm(
      "Are uh sure you want to delete All incomplete task"
    );
    if (confirm === true) {
      window.location.reload();
      const todoRef = ref(db, "/todos");
      onValue(todoRef, (snapshot) => {
        const todos = snapshot.val();
        for (let id in todos) {
          if (todos[id].done === false) {
            const todoRef = ref(db, "/todos/" + id);
            remove(todoRef);
          }
        }
      });
    }
  };
  // Editing task here .....
  const EditHandler = (todo) => {
    console.log(add.disable);
    if (add.disable) {
      var DisableEditComp = document.getElementsByClassName(
        "material-symbols-outlined"
      );
      for (var i = 0; i < DisableEditComp.length; i++) {
        DisableEditComp[i].disabled = true;
      }
    }
    // disabling edit button
    if (!add.disable) {
      const todoRef = ref(db, "/todos/" + todo.id);
      remove(todoRef, { id: todo.id });
      dispatch(addTodo(todo.input));
      dispatch(disableTodo(true));
    }
  };
  return (
    <div>
      {add.show === "all" ? (
        <div>
          {todoList.map((item) => (
            // displaying all task
            <div className="List" key={Math.random()}>
              {" "}
              <b style={{ float: "left", marginLeft: "2%" }}>{item.input}</b>
              <span
                className="material-symbols-outlined"
                style={{ float: "right", marginLeft: "2%" }}
                onClick={() => EditHandler(item)}
              >
                edit
              </span>
              <i
                className="material-icons"
                style={{ float: "right", marginLeft: "2%" }}
                onClick={() => deleteHandler(item)}
              >
                delete
              </i>
              <input
                className="form-check-input"
                type="checkbox"
                checked={item.done}
                value=""
                id="flexCheckDefault"
                style={{ float: "right" }}
                onChange={() => checkboxClickHandler(item)}
              />
            </div>
          ))}
        </div>
      ) : add.show === "done" ? (
        // Here i am displaying done task
        <div>
          {add.done.map((item) => (
            <div className="List" key={Math.random()}>
              {" "}
              <b style={{ float: "left", marginLeft: "2%" }}>{item.input}</b>
              <span
                className="material-symbols-outlined"
                style={{ float: "right", marginLeft: "2%" }}
                onClick={() => EditHandler(item)}
              >
                edit
              </span>
              <i
                className="material-icons"
                style={{ float: "right", marginLeft: "2%" }}
                onClick={() => deleteHandler(item)}
              >
                delete
              </i>
              <input
                className="form-check-input"
                type="checkbox"
                checked={item.done}
                value=""
                id="flexCheckDefault"
                style={{ float: "right" }}
                onChange={() => checkboxClickHandler(item)}
              />
            </div>
          ))}
        </div>
      ) : (
        add.incomplete.map((item) => (
          // here i am displaying incomplete task
          <div className="List" key={Math.random()}>
            {" "}
            <b style={{ float: "left", marginLeft: "2%" }}>{item.input}</b>
            <span
              className="material-symbols-outlined"
              style={{ float: "right", marginLeft: "2%" }}
              onClick={() => EditHandler(item)}
            >
              edit
            </span>
            <i
              className="material-icons"
              style={{ float: "right", marginLeft: "2%" }}
              onClick={() => deleteHandler(item)}
            >
              delete
            </i>
            <input
              className="form-check-input"
              type="checkbox"
              checked={item.done}
              value=""
              id="flexCheckDefault"
              style={{ float: "right" }}
              onChange={() => checkboxClickHandler(item)}
            />
          </div>
        ))
      )}

      <br />
      <br />
      <button
        type="button"
        className="btn btn-primary"
        onClick={DltDoneHandler}
        style={{
          paddingLeft: "4%",
          paddingRight: "4%",
          width: "20%",
        }}
      >
        Delete done Task
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={dltAllHandler}
        style={{
          marginLeft: "4%",
          paddingLeft: "4%",
          paddingRight: "4%",
          width: "20%",
        }}
      >
        Delete all Task
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={DltTodoHandler}
        style={{
          marginLeft: "4%",
          paddingLeft: "4%",
          paddingRight: "4%",
          width: "20%",
        }}
      >
        Delete Todo Task
      </button>
    </div>
  );
};
