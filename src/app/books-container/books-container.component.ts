import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnInit {


  bookSelected: boolean;
  books: Book[];
  // books: Book[] = [
  //   { Title: 'Title 1', Description: 'Description 1', AuthorName: 'AuthorName 1' },
  //   { Title: 'Title 2', Description: 'Description 2', AuthorName: 'AuthorName 2' },
  // ];

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.service._bookToggle.subscribe(x => this.bookSelected = x);
    this.service.booksSource.subscribe(x => this.books = x );
  }


  onEditBook(book: Book) {
    this.service.changeCurrentBook(book);
    this.service.onToggle();
    this.service.currentBookId.next(book.id);
    console.log(book);

  }

  onAddBook() {
    this.service.onToggle();
    this.service._editMode.next(false);
  }

  onRemoveBook(book: Book) {
    this.service.removeBook(book);
    this.service.offToggle();
  }

}
