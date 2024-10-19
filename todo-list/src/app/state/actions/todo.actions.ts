import { createAction, props } from "@ngrx/store";
import { Todo } from "../../models/Todo";

//Load Actions
export const loadTodos = createAction('[TODO] Load Todo')
export const loadTodosSuccess = createAction('[TODO] Load Todo Success', props<{ todos: Todo[]}>())
export const loadTodosFailure = createAction('[TODO] Load Todo Failure', props<{ error:string }>())


export const deleteTodo = createAction('[TODO] Delete Todo', props<{ todoId: number }>())

//Create Actions
export const createTodo = createAction('[TODO] Create Todo', props<{ todo: Todo }>())
export const createTodoFailure = createAction('[TODO] Create Todo Failure', props <{error:string}>())
export const createTodoSuccess = createAction('[TODO] Create Success', props<{ todo: Todo }>())

//Update Actions
export const updateTodo = createAction('[TODO] Update Todo', props<{ todo: Todo }>())
export const updateTodoFailure = createAction('[TODO] Update Todo Failure', props<{ error: string }>())

