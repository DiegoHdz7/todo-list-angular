import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { TodoService } from '../../services/todo-service.service';
import { loadTodosFailure, loadTodosSuccess, loadTodos, createTodoSuccess, createTodo, createTodoFailure, updateTodo, updateTodoFailure } from '../actions/todo.actions';
import { Store } from '@ngrx/store';
import { selectAllTodos } from '../selectors/todo.selector';

@Injectable()
export class TodosEffects {

    constructor(
        private actions$: Actions,
        private todoService: TodoService,
        private store:Store
        
    ) { }

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType('[TODO] Load Todo'),

        switchMap(() => this.todoService.getTodos().pipe(

            tap(response => console.log('Response from effect:', response)),
            // On success, dispatch a new action with the todos
            map(response => {
                if (response.status >= 200 && response.status < 300) {
                    return loadTodosSuccess({ todos: response.body || [] })

                } else {
                    return loadTodosFailure({ error: `${response.body}` })
                }


            }),

            // On failure, dispatch a failure action
            catchError(error => of(loadTodosFailure({ error })))
        )
        )
    )
    )

    createTodo$ = createEffect(()=>this.actions$.pipe(
        ofType(createTodo),
        withLatestFrom(this.store.select(selectAllTodos)),
        switchMap(([action,todos])=>
        {
            return  this.todoService.createTodo(action.todo).pipe(
                map(response => {
                    if (response.status >= 200 && response.status < 300 && response.body) {
                        return createTodoSuccess({ todo: response.body })
    
                    } else {
                        return createTodoFailure({ error: `${response.body}` })
                    }
                }),
                catchError((error)=> of(createTodoFailure({ error: `${error}` })))
            )
        }
            
           )


    ))

    updateTodo$ =createEffect(()=>{
        return this.actions$.pipe(
            ofType(updateTodo),
            switchMap((action)=> {
                return this.todoService.updateTodo(action.todo).pipe(
                    map((response)=>{
                        if (response.status >= 200 && response.status < 300 && response.body) {
                            return loadTodos()
        
                        } else {
                            return updateTodoFailure({ error: `${response.body}` })
                        }
    
                    }),
                    catchError((error)=>{
                        return of(updateTodoFailure({error:`${error}`}))
                    })
                    
                )
            })
    
        )

    })


}