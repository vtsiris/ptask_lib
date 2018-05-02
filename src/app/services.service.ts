import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from './book.model';

@Injectable()
export class ServicesService {

  books: Book[];

  constructor() {this.booksSource.subscribe(x => this.books = x); }

  booksSource = new BehaviorSubject<Book[]>(
    [
      {id: 1, title: 'Title 1', description: 'Description 1', authorName: 'AuthorName 1' },
      {id: 2, title: 'Title 2', description: 'Description 2', authorName: 'AuthorName 2' },
    ]
  );
  bookSource = new BehaviorSubject<Book>({id: null, title: '', description: '', authorName: ''});

  _bookToggle = new BehaviorSubject(false);
  _editMode = new BehaviorSubject(false);

  onToggle() {
    this._bookToggle.next(true);
  }

  offToggle() {
     this._bookToggle.next(false);
  }

  addBook(book: Book) {
    this.books.push(book);
    this.booksSource.next(this.books);
  }

  editBook(book: Book) {
    const newBooks = this.books.findIndex(b => b.id === book.id);
    this.books[newBooks] = book;
    this.booksSource.next(this.books);
    }

    removeBook(book: Book) {
      const deletedBook = this.books.findIndex( b => b.id === book.id);
      this.books.splice(deletedBook, 1);
    }
}
