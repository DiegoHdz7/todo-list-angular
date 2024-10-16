import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
    {path:'', component:TodoComponent},
    {path:'home', component:HomeComponent},
];
