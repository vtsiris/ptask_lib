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
  editMode: boolean;
  currentBookId: number;
  booksLength: number;

  // books: Book[];
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
  this.service.currentBookId
  .subscribe( x => this.currentBookId = x);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const editBook = new Book(this.currentBookId, value.title, value.description, value.authName);
    if (this.editMode) {
      console.log(editBook);

      this.service.editBook(editBook);
      this.editMode = false;
    } else {
      this.service.onAddBook({...editBook, id: this.booksLength + 1});
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
    const newBook = new Book(this.currentBookId, this.bform.value.title, this.bform.value.description, this.bform.value.authName);
    this.service.changeCurrentBook(newBook);
  }

  onRemoveBook( book: Book) {
    if (window.confirm('Are sure you want to delete book: ' + book.title + '?')) {
    this.service.removeBook(book);
    this.service.offToggle();
    }
  }
}
