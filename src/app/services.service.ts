import { Injectable, OnDestroy, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from './models/book.model';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class ServicesService implements OnDestroy {
  _sub = new Subscription();
  books: Book[ ];
  // book: Book[];
  // books: Book[] = [
  //   {id: 1, title: 'Title 1', description: 'Description 1', authorName: 'AuthorName 1' },
  //   {id: 2, title: 'Title 2', description: 'Description 2', authorName: 'AuthorName 2' },
  // ];
  constructor() {
    this._sub = this.booksSource.subscribe(x => this.books = x);
  }

  booksSource = new BehaviorSubject<Book[]>(
    [
      {id: 1, title: 'Title 1', description: 'Description 1', authorName: 'AuthorName 1' },
      {id: 2, title: 'Title 2', description: 'Description 2', authorName: 'AuthorName 2' },
    ]
  );
  bookSource = new BehaviorSubject<Book>({id: null, title: '', description: '', authorName: ''});
  currentBookId = new BehaviorSubject(null);

  _editMode = new BehaviorSubject(false);
  _bookToggle = new BehaviorSubject(false);


  onToggle() {
    this._bookToggle.next(true);
  }

  offToggle() {
     this._bookToggle.next(false);
  }

  changeCurrentBook(book: Book) {
    this.bookSource.next(this.books.find(x => x.id === book.id));
    this._editMode.next(true);
  }


  onAddBook(book: Book) {
    this.books.push(book);
    this.booksSource.next(this.books);
  }

  editBook(book: Book) {
    console.log(book);

    const newBooks = this.books.map(x => {
        if (book.id === x.id) {
          x = book;
        }

        return x;
      });

    this.booksSource.next(newBooks);
  }

  removeBook(book: Book) {
    const deletedBook = this.books.findIndex( b => b.id === book.id);
    this.books.splice(deletedBook, 1);
  }

  ngOnDestroy() {
    this._bookToggle.unsubscribe();
    this._sub.unsubscribe();
  }

}
