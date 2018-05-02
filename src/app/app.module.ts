import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BooksContainerComponent } from './books-container/books-container.component';
import { BookRegisterFormComponent } from './book-register-form/book-register-form.component';
import { ServicesService } from './services.service';


@NgModule({
  declarations: [
    AppComponent,
    BooksContainerComponent,
    BookRegisterFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
