import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { TodoService } from '../../services/todo-service.service';
import { loadTodosFailure, loadTodosSuccess, loadTodos} from '../actions/todo.actions';

@Injectable()
export class TodosEffects {

    constructor(
        private actions$: Actions,
        private todoService: TodoService
      ) {}

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType('[TODO] Load Todo'),
        switchMap(() => this.todoService.getTodos().pipe(

            tap(response => console.log('Response from effect:', response)),
            // On success, dispatch a new action with the todos
            map(response => {
                if(response.status >=200 && response.status < 300){
                    return loadTodosSuccess({todos:response.body || []})

                } else {
                    return loadTodosFailure({ error:`${response.body}` })
                }

                
            }),

            // On failure, dispatch a failure action
            catchError(error => of(loadTodosFailure({ error })))
        )
        )
    )
    )


  
}