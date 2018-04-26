import { Injectable, OnDestroy, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from './models/book.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ServicesService implements OnDestroy {

  book: Book[];
  books: Book[] = [
    {Title: 'Title 1', Description: 'Description 1', AuthorName: 'AuthorName 1' },
    {Title: 'Title 2', Description: 'Description 2', AuthorName: 'AuthorName 2' },
  ];
  bookSource = new BehaviorSubject<Book>({Title: '', Description: '', AuthorName: ''});

  currentId = new BehaviorSubject(null);

  _editMode = new BehaviorSubject(false);
  _bookToggle = new BehaviorSubject(false);

  onToggle() {
    this._bookToggle.next(true);
  }

  offToggle() {
     this._bookToggle.next(false);
  }

  changeCurrentBook(book: Book, index: number) {
    this.bookSource.next(book);
    this._editMode.next(true);
    this.currentId.next(index);
  }


  onAddBook(book: Book) {
    this.books.push(book);
  }

  editBook(book: Book, index: number) {
    this.books[index] = book;
    // console.log('Welcome to edit mode');
  }

  removeBook(index: number) {
    this.books.splice(index, 1);
    console.log(index);

  }

  ngOnDestroy() {
    this._bookToggle.unsubscribe();
  }

}
