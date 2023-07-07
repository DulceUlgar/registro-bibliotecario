import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book: Book | null;
  @Output() save = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();
  editing = false;
  image: string | undefined;
  name: string | undefined;
  editorial: string | undefined;
  gender: string | undefined;
  author: string | undefined;

  constructor() {
    this.book = null;
  }

  ngOnInit() {
    if (this.book) {
      this.editing = true;
      this.image = this.book.image;
      this.name = this.book.name;
      this.editorial = this.book.editorial;
      this.gender = this.book.gender;
      this.author = this.book.author;
    } else {
      this.book = {
        id: 0,
        image: '',
        name: '',
        editorial: '',
        gender: '',
        author: ''
      };
    }
  }

  saveBook() {
    if (this.book) {
      this.book.image = this.image || '';
      this.book.name = this.name || '';
      this.book.editorial = this.editorial || '';
      this.book.gender = this.gender || '';
      this.book.author = this.author || '';
      this.save.emit(this.book);
    }
  }

  cancelEdit() {
    this.cancel.emit();
  }
}