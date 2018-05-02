import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';
import { ServicesService } from '../services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-register-form',
  templateUrl: './book-register-form.component.html',
  styleUrls: ['./book-register-form.component.css']
})
export class BookRegisterFormComponent {
  @ViewChild('f') bform: NgForm;

  @Input() book: Book;
  @Input() editMode: boolean;

  @Output() editBook = new EventEmitter;
  @Output() addBook = new EventEmitter;
  @Output() clearBook = new EventEmitter;
  @Output() removeBook = new EventEmitter;

  private maxId = 3;

  constructor(private service: ServicesService) { }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      const editBook = new Book(
        this.book.id,
        value.title,
        value.description,
        value.authName
      );
      this.editBook.emit(editBook);
      this.service._editMode.next(false);
      form.reset();
    } else {
      const id = this.maxId ++;
      const addBook = new Book(
        id,
        value.title,
        value.description,
        value.authName
      );
      this.addBook.emit(addBook);
      form.reset();
    }
  }

  onExit() {
    this.service.offToggle();
  }

  onClear() {
    this.clearBook.emit();
  }

  onRemoveBook(book: Book) {
    this.removeBook.emit(book);
  }

}
