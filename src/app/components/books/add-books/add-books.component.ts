import { ThisReceiver } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { BookService } from 'src/app/services/book.service';
import { ListBooksComponent } from '../list-books/list-books.component';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css'],
})
export class AddBooksComponent implements OnInit {
  //Inicialicion de variables que se utilizan en todo el componente
  suscription!: Subscription;
  form: FormGroup;
  id = 0;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _BookService: BookService,
    private listBooks: ListBooksComponent
  ) {
    //Inicializacion del form donde estan los inputs en la vista,  tambien se ejecuta sus respectivas validaciones
    this.form = this.formBuilder.group({
      id: 0,
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      releaseddate: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //Se ejecuta al querer editar un valor, y se pasana  la form los datos a editar
    this.suscription = this._BookService.updateBook().subscribe((data) => {
      console.log(data);
      this.form.patchValue({
        title: data.title,
        description: data.description,
        releaseddate: data.releasedDate,
        autor: data.autor,
        price: data.price,
      });
      this.id = data.id;
    });
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  AddBook() {
    //Se reliza la validación en caso de se va a insertar o editar. Si no tiene id es que se va agregar , si tiene id es que se va a editar
    if (this.id == 0 || this.id == undefined) {
      const book: any = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        releaseddate: this.form.get('releaseddate')?.value,
        autor: this.form.get('autor')?.value,
        price: this.form.get('price')?.value,
      };
      this._BookService.saveBook(book).subscribe(
        (data) => {
          this.toastr.success('book added successfully!', 'BookRegistred');
          this.listBooks.getBooks();
          this.form.reset();
          window.location.reload();
        },
        (error) => {
          this.toastr.error('Opss.. Something is wrong ', 'Error');
          console.log(error);
        }
      );
    } else {
      const book: any = {
        id: this.id,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        releaseddate: this.form.get('releaseddate')?.value,
        autor: this.form.get('autor')?.value,
        price: this.form.get('price')?.value,
      };

      this._BookService.putBoook(book.id, book).subscribe(
        (data) => {
          this.toastr.success('book updated successfully!', 'BookRegistred');
          this.listBooks.getBooks();
          this.form.reset();
          this.id = 0;
          window.location.reload();
        },
        (error) => {
          this.toastr.error('Opss.. Something is wrong ', 'Error');
          console.log(error);
        }
      );
    }
  }
}
