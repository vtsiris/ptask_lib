import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Book } from '../book.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnInit {

  selectedBook: Book;
  books: Book[];
  _toggle: boolean;
  _editMode: boolean;

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.service.bookSource.subscribe(x => this.selectedBook = x);
    this.service.booksSource.subscribe(x => this.books = x);
    this.service._bookToggle.subscribe(x => this._toggle = x);
    this.service._editMode.subscribe(x => this._editMode = x );
  }

  onAddBook() {
    this.selectedBook = <Book>{};
    this.service.onToggle();
    this.service._editMode.next(false);
  }

  onEditBook(book: Book) {
    this.selectedBook = book;
    this.service.onToggle();
    this.service._editMode.next(true);
  }

  onRemoveBook(book: Book) {
    this.service.removeBook(book);
  }

  editFormBook(book) {
    this.service.editBook(book);
    this.selectedBook = <Book> {};
  }

  addFormBook(book) {
    this.service.addBook(book);
  }

  clearFormBook() {
    this.selectedBook = <Book> {};
    this.service._editMode.next(false);
  }

  removeFormBook(book) {
    if (
      window.confirm('Are sure you want to delete book: ' + book.title + '?')
    ) {
      this.service.removeBook(book);
      this.service.offToggle();
    }
  }

}
