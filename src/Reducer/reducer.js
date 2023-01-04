import { createSlice } from "@reduxjs/toolkit";
const initial_data = {
  list: [],
};

const reducer = (state = initial_data, action) => {
  switch (action.type) {
    case "ADD_TODO_SUCCESS":
      const { id, inputval } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            inputval: inputval,
          },
        ],
      };

    default:
      return state;
  }
};
export default reducer
