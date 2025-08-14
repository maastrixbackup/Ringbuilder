import { configureStore } from "@reduxjs/toolkit";
import ringBuilderReducer from "./ringBuilderSlice";

const store = configureStore({
  reducer: {
    ringBuilder: ringBuilderReducer,
  },
});

export default store;
