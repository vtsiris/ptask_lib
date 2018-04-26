import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  bookSelected: boolean;

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.service._bookToggle.subscribe(x => this.bookSelected = x);
  }
}
