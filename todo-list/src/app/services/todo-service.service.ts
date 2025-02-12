import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { catchError, EMPTY, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = "http://localhost:8080/todos";

  constructor(private http: HttpClient) { }

//   • this.http.get<Todo[]>(...): This is calling the get method of Angular’s HttpClient. The <Todo[]> indicates that you expect the response body to be an array of Todo objects.

//   • this.apiUrl: This is a variable (presumably defined elsewhere in your service) that holds the URL to which the GET request will be sent. It should point to the API endpoint where the todos can be retrieved.

//   • { observe: 'response' }: This option is passed as the second argument to the get method. By setting observe to 'response', you instruct HttpClient to return the full HTTP response object instead of just the response body. This means you’ll get access to:
//   • The response body (the array of todos).
//   • The status code (e.g., 200 for a successful request).
//   • Response headers.
  getTodos(): Observable<HttpResponse<Todo[]>> {
    return this.http.get<Todo[]>(this.apiUrl+"/all", { observe: 'response' });
  }

  getTodo(_id:string): Observable<HttpResponse<Todo>> {
    return this.http.get<Todo>(this.apiUrl +`/${_id}`, { observe: 'response' });
  }

  createTodo(todo:Todo):Observable<HttpResponse<Todo>>{
    let todos:Todo[];

    return this.getTodos().pipe(
      switchMap( (response)=>{
        if(response.ok){
          const todos: Todo[] = response.body || [];
          const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1; // Handle empty array case
          const newTodo = { ...todo, id: newId };
          return this.http.post<Todo> (this.apiUrl+"/create", newTodo,{ observe:'response'})
        }
        else {
          // Throwing an error to indicate failure
          throw new Error('Failed to get all todos from createTodoHttpRequest');
        }
       
      }),
     catchError((err)=>{
      console.log(err)
      return EMPTY
     })
    )
   

    
    
  }

  updateTodo(todo:Todo):Observable<HttpResponse<any>>{
    return this.http.put<any> (this.apiUrl +"/update",todo, {observe:'response'})

  }

  deleteTodo(_id:string):Observable<HttpResponse<any>>{
    return this.http.delete<any> (this.apiUrl +`/delete/${_id}`, {observe:'response'})

  }

  getTest(): Observable<any> {
    return this.http.get('http://localhost:8080/todos/all');
  }



}
