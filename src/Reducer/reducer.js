import { createSlice } from "@reduxjs/toolkit";

const reducerslice = createSlice({
  name: "FirebaseData",
  initialState: {
    todo: "",
    disable: false,
    show: "all",
    done: [],  
    incomplete: [],
  },
  reducers: {
    // action for adding task on add button
    addTodo: (state, action) => {
      state.todo = action.payload;
    },
    // Action for disabling edit button
    disableTodo: (state, action) => {
      state.disable = action.payload;
    },
    // Action for displaying done task
    doneTodo: (state, action) => {
      state.done = action.payload;
    },
    // Action for displaying incomplete task
    incompleteTodo: (state, action) => {
      state.incomplete = action.payload;
    },
    // Action for filtering todo 
    checkTodo: (state, action) => {
      state.show = action.payload;
    },
  },
});
export const { addTodo, disableTodo, doneTodo, checkTodo, incompleteTodo } =
  reducerslice.actions;
export default reducerslice.reducer;
