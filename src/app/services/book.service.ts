import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BooksComponent } from '../components/books/books.component';

//Archivo donde se hacen todas las peticiones HTTP con el BackEnd.
@Injectable({
  providedIn: 'root',
})
export class BookService {
  // OJO. Variables que se utilizan para llamar a las api. Para utilizarse en un equipo distinto, se debe cambiar myAppUrl
  private myAppUrl = 'https://localhost:7139/';
  private myApiUrl = 'api/Books/';

  private updateForm = new BehaviorSubject<BooksComponent>({} as any);

  constructor(private http: HttpClient) {}

  //Petion para obtener los libros
  getListBooks(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  //Peticion para eliminar un libro por su ID
  deleteBook(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
  //Peticion para guardar un libro
  saveBook(book: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, book);
  }
  //Peticion para actualizar un libro mediante su ID
  putBoook(id: number, book: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, book);
  }
  //Metodo para actualizar el form con el lbiro a actualizar
  update(book: any) {
    this.updateForm.next(book);
  }
  updateBook(): Observable<any> {
    return this.updateForm.asObservable();
  }
}
