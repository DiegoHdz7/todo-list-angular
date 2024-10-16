import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './state/reducers/todo.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ], // Configure the store here
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-list';
}
