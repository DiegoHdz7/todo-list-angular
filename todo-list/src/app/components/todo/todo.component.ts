import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { createTodoSuccess, updateTodo,deleteTodo, loadTodosSuccess, loadTodos, createTodo } from '../../state/actions/todo.actions';
import { selectAllTodos } from '../../state/selectors/todo.selector';
import { Todo } from '../../models/Todo';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todos$ = this.store.select(selectAllTodos);
  todosSubscription:Subscription | undefined;
  todoForm:FormGroup;
  todos:Todo[]=[]

  constructor(private store:Store, private fb:FormBuilder, private todoService:TodoService){
    this.todoForm = this.fb.group({
      id: [0, Validators.required], // Default value of id
      title: ['', [Validators.required, Validators.minLength(3)]], // Title field with validators
      completed: [false,Validators.required] // Completed field with default value of false
    });
  }

  ngOnInit(){
    const initialTodos: Todo[] = [
      { id: 1, title: 'Learn NgRx', completed:false},
      { id: 2, title: 'Build a Todo App', completed:false}
    ];

    this.store.dispatch(loadTodos());


    //you can subscribe via this, or using the | async pipe in the view, 
    //the async pipe automatically subscribes and unsubcribes  
    //but to get the todos array linked to the subscribe I need to manually do it here
    this.todosSubscription = this.todos$.subscribe((todos:Todo[]) => {
      this.todos = todos // Log the current todos to the console
    });

    
  }

   createTodo() {
    console.log('create todo')

    
    if (this.todoForm.valid) { // Check if the form is valid before proceeding
      const newTodo: Todo = {
  
        id: 0,
        title: this.todoForm.value.title,
        completed: this.todoForm.value.completed
      };
  
      this.store.dispatch(createTodoSuccess({ todo: newTodo}));
      this.todoForm.reset({
        id: 0,              // Reset 'id' to 0
        title: '',          // Reset 'title' to an empty string
        completed: false 
      }); // Optional: Reset the form after submission
      console.log("New Todos", this.todos)
  
    }
  }

  updateTodo(){
    if(this.todoForm.valid)
    {
      const newTodo =
      {
        ...this.todoForm.value,
        id: +this.todoForm.value.id // Use the unary plus operator to convert the id to a number
      }
      this.store.dispatch(updateTodo({todo:newTodo}))

    }

    console.log('updatedTodos',this.todos)
    
  }

  deleteTodo(todoId:number){
    this.store.dispatch(deleteTodo({todoId}))
  }

  get titleControl() {
    return this.todoForm.get('title');
  }
  get idControl() {
    return this.todoForm.get('id');
  }
  get completedControl() {
    return this.todoForm.get('completed');
  }

  httpCreateTodo(){

    if(this.todoForm.valid)
    {
      const newTodo = {
        id:this.todoForm.value.id,
        title:this.todoForm.value.title,
        completed:this.todoForm.value.completed
      }

      this.store.dispatch(createTodo({todo:newTodo}))

      // this.todoService.createTodo(newTodo).subscribe({
      //   next:(response)=>{
      //     console.log('response',response);
      //     this.todoForm.reset({
      //       id: 0,              // Reset 'id' to 0
      //       title: '',          // Reset 'title' to an empty string
      //       completed: false 
      //     }); 
      //     this.store.dispatch(createTodoSuccess({todo:newTodo}))
          

      //   },
      //   error: ()=>{

      //   }
      // })

    }
  }


  httpDeleteTodo(){
    
   
      this.todoService.deleteTodo(this.todoForm.value.id).subscribe({
        next:(response)=>{
          console.log('response',response); 
        },
        error: (error)=>{
          console.log('response',error); 
  
        }
      })

    
   
  }
  httpUpdateTodo(){
    if(this.todoForm.valid){
      // this.todoService.updateTodo(this.todoForm.value).subscribe({
      //   next:(response)=>{
      //     console.log('response',response); 
      //   },
      //   error: (error)=>{
      //     console.log('response',error); 
  
      //   }
      // })

      this.store.dispatch(updateTodo({todo:this.todoForm.value}))

    }
    
  }
  httpGetAllTodos(){
    // this.todoService.getTodos().subscribe(
    //   {
    //     next:(response)=>{
    //       console.log(response)
    //     },
    //     error:(error)=>{
    //       console.log(error)
    //     }
    //   }
    // )
    this.store.dispatch(loadTodos())
    
  }
  httpGetTodo(){
    this.todoService.getTodo(this.todoForm.value.id).subscribe(
      {
        next:(response)=>{
          console.log(response)
        },
        error:(error)=>{
          console.log(error)
        }
      }
    )
    
  }


  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks when the component is destroyed
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }

}
