import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../models/Todo";
import { loadTodosSuccess,createTodoSuccess,updateTodo,deleteTodo, loadTodos, createTodo, createTodoFailure, updateTodoFailure } from "../actions/todo.actions";
import { Action } from "rxjs/internal/scheduler/Action";
import { state } from "@angular/animations";

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

    //Load Reducers
    on(loadTodos, (state)=>({...state})),
    on(loadTodosSuccess, onloadTodosSuccess),

    
   //Update Reducers
    on(updateTodo, (state, {todo}:{todo:Todo})=>({...state})),
    // on(updateTodoSuccess, (state, {todo}:{todo:Todo})=>{
    //     const updatedTodos = state.todos.map((todoMap)=>{
    //         if(todoMap.id === todo.id){
    //             return todo;
    //         } else {
    //             return todoMap;
    //         }
    //     })
    //     return { ...state, todos:updatedTodos}
    // } ), 
    on(updateTodoFailure, (state, {error})=>({...state,error:error})),
  

    //Create Reducers
    on(createTodo,(state)=>({...state})),
    on(createTodoSuccess,onCreateTodoSuccess),
    on(createTodoFailure, (state, {error})=>({...state, error:error})),

    //Delete Reducers
    on(deleteTodo, onDeleteTodo),


);

function onCreateTodoSuccess(state:TodoState, action:{todo:Todo}){
    
    // const lastIndex = state.todos.length-1;
    // const newId= state.todos[lastIndex].id+1;
    // const newTodo = {
    //     ...action.todo,
    //     id:newId
    // }
    

    return {...state, todos:[...state.todos,action.todo]}
}
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

