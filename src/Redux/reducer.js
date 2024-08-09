import {
    ADD_TODO,
    UPDATE_SEARCH,
    DELETE_TODO,
  TOGGLE,
  MARK_ALL,
  FILTER,
  UPDATE_TODO,
} from "./actionTypes";

import { getTodos } from "./action";

const initialstate = {
  todos: getTodos(),
  search: "",
  filter: "All",
};
export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, completed: false }],
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          if (index === action.payload.id) {
            return { ...todo, text: action.payload.value };
          }
          return todo;
        }),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo, index) => {
          return index !== action.payload;
        }),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          if (index === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    case MARK_ALL:
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return { ...todo, completed: true };
        }),
      };
    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};
