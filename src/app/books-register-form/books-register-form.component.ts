import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services.service';
import { Book } from '../models/book.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-books-register-form',
  templateUrl: './books-register-form.component.html',
  styleUrls: ['./books-register-form.component.css']
})

export class BooksRegisterFormComponent implements OnInit {
  @ViewChild('f') bform: NgForm;
  book: Book;
  books: Book[];
  editMode: boolean;
  id: number;

  // book: Book = {
  //   Title: '',
  //   Description: '',
  //   AuthorName: ''
  // };

  constructor(public service: ServicesService) { }

  ngOnInit( ) {
  this.service.bookSource
  .subscribe(x => {
    this.book = x;
    });
  this.service._editMode
  .subscribe( x => this.editMode = x);
  this.service.currentId
  .subscribe( x => this.id = x);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newBook = new Book(value.title, value.description, value.authName);
    if (this.editMode) {
      this.service.editBook(newBook, this.id);
      this.editMode = false;
    } else {
      this.service.onAddBook(newBook);
    }
    form.reset();
  }

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   const newBook = new Book(value.title, value.description, value.authName);

  //     this.service.onAddBook(newBook);

  //   form.reset();
  // }

  onClear() {
    this.editMode = false;
    this.bform.reset();
  }

  onExit() {
    this.service.offToggle();
    this.bform.reset();
    const newBook = new Book(this.bform.value.title, this.bform.value.description, this.bform.value.authName);
    const index = null;
    this.service.changeCurrentBook(newBook, index);
  }

  onRemoveBook(index: number) {
    this.service.removeBook(index);
    this.service.offToggle();
  }
}
