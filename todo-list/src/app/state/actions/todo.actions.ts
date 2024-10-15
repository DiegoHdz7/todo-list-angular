import { createAction, props } from "@ngrx/store";
import { Todo } from "../../models/Todo";


export const loadTodos = createAction('[TODO] Load Todo', props<{ todos: Todo[] }>())
export const loadTodosSuccess = createAction('[TODO] Load Todo Success', props<{ todos: Todo[] }>())
export const loadTodosFailure = createAction('[TODO] Load Todo Failure', props<{ error:string }>())
export const createTodo = createAction('[TODO] Create Todo', props<{ todo: Todo }>())
export const updateTodo = createAction('[TODO] Update Todo', props<{ todo: Todo }>())
export const deleteTodo = createAction('[TODO] Delete Todo', props<{ todoId: number }>())

