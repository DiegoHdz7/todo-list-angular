import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../models/Todo";
import { loadTodosSuccess,createTodo,updateTodo,deleteTodo } from "../actions/todo.actions";
import { Action } from "rxjs/internal/scheduler/Action";

export interface TodoState {
    todos: Todo[],
    error: string | null
}

export const  initialState: TodoState ={
    todos:[],
    error:''
}

//on(actionType, handlerFunction)
//the handler function usually is likt this -> (state, action) => newState
export const todosReducer = createReducer(
    initialState,
    on(loadTodosSuccess, onloadTodosSuccess),
    on(createTodo, (state,{todo})=>({...state,todos:[...state.todos,todo]})),
    on(updateTodo, (state, {todo})=>{
        const updatedTodos = state.todos.map((todoMap)=>{
            if(todoMap.id === todo.id){
                return todo;
            } else {
                return todoMap;
            }
        })
        return { ...state, todos:updatedTodos}
    } ), 
    on(deleteTodo, onDeleteTodo)


);

function onDeleteTodo(state:TodoState, action:{todoId:number}){
    const newTodos = state.todos.filter((todo)=>todo.id!==action.todoId)
    return {...state, todos:newTodos}
}

function onloadTodosSuccess(state:TodoState,  action:{todos:Todo[]}) {
    return {
      ...state,  // Spread the existing state to maintain other properties
      todos:action.todos    // Update the `todos` array with the new values
    }
}

