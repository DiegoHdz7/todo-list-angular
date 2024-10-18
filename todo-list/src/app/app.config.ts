import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { todosReducer } from './state/reducers/todo.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { TodosEffects } from './state/effects/todos.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';



export const appConfig: ApplicationConfig = {
  //The {propertyname:todosReducer} the propertyname should match with what is was declared on the selector
  providers: [
    provideRouter(routes), 
    provideStore({ Todos: todosReducer }), 
    provideHttpClient(), 
    provideEffects([TodosEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
    }),


  ] 
};


