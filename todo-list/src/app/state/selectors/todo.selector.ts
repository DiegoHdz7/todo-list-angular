import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Todo } from "../../models/Todo";
import { TodoState } from "../reducers/todo.reducer";

export const selectTodoState = createFeatureSelector<TodoState> ('Todos') // should match with the provideStore({Todos:todosReducer}) for angular >17 or the  StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
export const selectAllTodos = createSelector(selectTodoState,state =>state.todos )