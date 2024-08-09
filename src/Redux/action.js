import { ADD_TODO
    ,UPDATE_SEARCH,
    DELETE_TODO,
    TOGGLE,
    MARK_ALL,
    FILTER,
    UPDATE_TODO
    } from "./actionTypes";
    
    export const add_todo=(text)=>{
        return{
            type:ADD_TODO
            ,
            payload:text
        }
    }
    export const search_todo=(value)=>{
        return{
            type:UPDATE_SEARCH
            ,
            payload:value
        }
    }
    export const delete_todo=(id)=>{
        return{
            type:DELETE_TODO
            ,
            payload:id
        }
    }
    export const toggle_todo=(id)=>{
        return{
            type:TOGGLE
            ,
            payload:id
        }
    }
    export const mark_all=()=>{
        return{
            type:MARK_ALL
        }
    }
    export const filter=(value)=>{
        return{
            type:FILTER
            ,
            payload:value
        }
    }
    export const update_todo=(value)=>{
        return{
            type:UPDATE_TODO
            ,
            payload:value
        }
    }

    // save todos in local storage 
    export const getTodos = () => {
            const Todos = localStorage.getItem('todos');
            if (Todos === null) {
                return []; 
            }
            return JSON.parse(Todos);
    };
    
    
   export const setTodos = (todos) => {
            const Todos = JSON.stringify(todos);
            localStorage.setItem('todos', Todos);
    };