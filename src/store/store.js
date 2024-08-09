import {  createStore } from "@reduxjs/toolkit";

import { reducer } from "../Redux/reducer.js";
import {  setTodos } from "../Redux/action.js";

const store= createStore(reducer)
store.subscribe(() => {
    const state = store.getState();
    setTodos(state.todos);
});

export default store;