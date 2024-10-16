import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { todosReducer } from './state/reducers/todo.reducer';

export const appConfig: ApplicationConfig = {
  //The {propertyname:todosReducer} the propertyname should match with what is was declared on the selector
  providers: [provideRouter(routes), provideStore({Todos:todosReducer})] 
};
