import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  showEditForm = false;
  showCreateForm = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  createBook() {
    this.selectedBook = null;
    this.showCreateForm = true;
  }

  editBook(book: Book) {
    this.selectedBook = { ...book };
    this.showEditForm = true;
  }

  saveBook(book: Book) {
    if (book.id !== 0) {
      this.bookService.updateBook(book).subscribe(() => {
        this.getBooks();
        this.selectedBook = null;
        this.showEditForm = false;
        this.showCreateForm = false;
      });
    } else {
      this.bookService.createBook(book).subscribe(() => {
        this.getBooks();
        this.selectedBook = null;
        this.showEditForm = false;
        this.showCreateForm = false;
      });
    }
  }

  cancelEdit() {
    this.selectedBook = null;
    this.showEditForm = false;
    this.showCreateForm = false;
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.getBooks();
    });
  }
}