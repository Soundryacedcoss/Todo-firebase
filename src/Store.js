import { configureStore } from "@reduxjs/toolkit";
import todoreducers from "./Reducer/reducer";
const store = configureStore({
  reducer: {
    FirebaseData: todoreducers,
  },
});
export default store;
