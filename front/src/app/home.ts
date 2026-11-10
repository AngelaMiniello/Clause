import { Component } from '@angular/core';
import { Header } from './header/header';
import { Features } from './features/features';
import { BookPreview } from './book-preview/book-preview';
import { BookShowcase } from './book-showcase/book-showcase';

@Component({
  selector: 'clause-home',
  imports: [Header, Features, BookPreview, BookShowcase],
  template: `
    <clause-header />
    <clause-features />
    <clause-book-preview />
    <clause-book-showcase />
  `,
})
export class Home {}

