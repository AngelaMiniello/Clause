import { Routes } from '@angular/router';
import { Page } from './page';
import { Home } from './home';
import { BookDetail } from './book-detail/book-detail';

const sections = [ ['discover','Discover'], ['top-rated','Top Rated'], ['lists','Lists'], ['genres','Genres'], ['library','My Library'], ['profile','My Profile'], ['journal','Reading Journal'], ['goals','Goals & Stats'], ['settings','Settings'], ['login','Log in / Sign up'], ['search','Search'] ];

export const routes: Routes = [
 {path:'', pathMatch:'full', component:Home, title:'Clause — Your reading life', data:{eyebrow:'YOUR NEXT CHAPTER',title:'A place for your reading life.',description:'The books you love. The thoughts you keep. And everything you’ll read next.'}},
 ...sections.map(([path,title]) => ({path, component:Page, title:`${title} — Clause`, data:{title,description:'This section is coming soon.'}})),
 {path:'books/:volumeId', component:BookDetail, title:'Book — Clause'},
 {path:'**',component:Page,title:'Page not found — Clause',data:{title:'Page not found',description:'Let’s get you back to your reading space.'}}
];

