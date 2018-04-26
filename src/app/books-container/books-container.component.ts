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

  // books: Book[] = [
  //   { Title: 'Title 1', Description: 'Description 1', AuthorName: 'AuthorName 1' },
  //   { Title: 'Title 2', Description: 'Description 2', AuthorName: 'AuthorName 2' },
  // ];

  constructor(private service: ServicesService) { }

  books = this.service.books;

  ngOnInit() {
    this.service._bookToggle.subscribe(x => this.bookSelected = x);
  }


  onEditBook(book: Book, index: number) {
    this.service.changeCurrentBook(book, index);
    this.service.onToggle();
  }

  onAddBook() {
    this.service.onToggle();
    this.service._editMode.next(false);
  }

  onRemoveBook(index: number) {
    this.service.removeBook(index);
    this.service.offToggle();
  }

}
