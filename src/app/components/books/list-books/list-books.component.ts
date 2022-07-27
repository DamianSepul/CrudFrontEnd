import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
})
@Injectable({ providedIn: 'root' })
export class ListBooksComponent implements OnInit {
  //Inicializacion de variables utilizadas en el componente
  listBooks: any[] = [];
  id: number | undefined;
  constructor(
    private toastr: ToastrService,
    public _BookService: BookService
  ) {}

  ngOnInit(): void {
    //Al inicial proyecto, se actualiza la tabla con los datos de la base de datos
    this.getBooks();
  }
  //Metodo para obtener los datos de la base de datos, se usa para llenar la tabla
  getBooks() {
    this._BookService.getListBooks().subscribe(
      (data) => {
        this.listBooks = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Metodo para borrar un libro por su id. Llama a una funcion en Service
  deleteBook(id: number) {
    this._BookService.deleteBook(id).subscribe(
      (data) => {
        this.toastr.success('Book Deleted Successfully!', 'DeleteBook');
        this.getBooks();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Metodo para actualizar un libro . Llama a una funcion en service
  updateBook(book: any) {
    this._BookService.update(book);
  }
}
