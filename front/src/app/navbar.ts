import { Component, ElementRef, HostListener, inject, input, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

//Component define un componente, le indico a Angular q clase representa el componente, cómo se llama su etiqueta y q HTML utiliza.
@Component({
    selector:'clause-navbar',
    imports:[RouterLink],
    templateUrl:'./navbar.html',
    styles: `
      .skip-link { position: fixed; top: -70px; left: 16px; padding: 12px; background: white; z-index: 100; } .skip-link:focus { top: 12px; }
      .site-header { background: #a4d3f1; border-bottom: 1px solid #91c1df; position: relative; z-index: 10; }
      .navbar { max-width: 1500px; margin: auto; min-height: 116px; padding: 24px 44px; display: flex; align-items: center; gap: 44px; }
      .brand { flex-shrink: 0; display: flex; align-items: center; } .brand img { width: 172px; height: auto; }
      .search { display: flex; align-items: center; gap: 12px; width: min(390px,100%); margin-left: auto; padding: 0 15px; height: 46px; background: #ffffff70; border: 1px solid #ffffffc4; border-radius: 8px; }
      .search:focus-within { background: #ffffffb8; box-shadow: 0 0 0 2px #477c9b; }
      .search input { width: 100%; min-width: 0; border: 0; background: transparent; outline: none; color: #243d4b; font-size: 14px; }
      .search input::placeholder { color: #476579; opacity: 1; } .search button { border: 0; background: transparent; color: #476579; padding: 5px; }
      .nav-actions { display: flex; align-items: center; gap: 30px; }
      .library-link,.nav-trigger { font-size: 15px; font-weight: 600; white-space: nowrap; }
      .nav-trigger { display: flex; align-items: center; gap: 10px; padding: 12px 0; color: inherit; background: none; border: 0; }
      .nav-trigger svg { transition: transform .18s; } .nav-trigger[aria-expanded=true] svg { transform: rotate(180deg); }
      .library-link:hover,.nav-trigger:hover { color: #075680; } .nav-divider { height: 25px; width: 1px; background: #5a8da638; }
      .dropdown { position: relative; }
      .avatar-trigger { width: 46px; height: 46px; border-radius: 50%; border: 1px solid #ffffffa6; background: #ffffff35; display: grid; place-items: center; color: #243d4b; overflow: hidden; }
      .avatar-trigger:hover,.avatar-trigger[aria-expanded=true] { background: #ffffff8a; } .avatar-trigger img { width: 100%; height: 100%; object-fit: cover; }
      .dropdown-panel { position: absolute; top: calc(100% + 17px); right: 0; width: 290px; padding: 13px; background: #fffefa; border: 1px solid #e5e7e3; border-radius: 12px; box-shadow: 0 16px 45px #24405120; }
      .menu-label { display: block; color: #72828a; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; padding: 12px 12px 10px; }
      .dropdown-panel a { display: block; padding: 12px; border-radius: 6px; font-size: 14px; font-weight: 600; } .dropdown-panel a:hover { background: #edf5fa; }
      .dropdown-panel small { display: block; margin-top: 5px; color: #6a7d87; font-size: 12px; font-weight: 400; }
      .user-panel { width: 245px; } .menu-footer { border-top: 1px solid #e7ecee; margin-top: 8px; padding-top: 8px; } .menu-footer a { display: flex; justify-content: space-between; }
      @media(max-width:1000px) { .navbar { gap: 24px; padding: 22px 26px; } .nav-actions { gap: 20px; } .brand img { width: 142px; } }
      @media(max-width:700px) { .navbar { flex-wrap: wrap; min-height: auto; gap: 18px; padding: 20px; } .brand img { width: 116px; } .nav-actions { margin-left: auto; gap: 16px; } .library-link,.nav-trigger { font-size: 13px; } .nav-divider { display: none; } .avatar-trigger { width: 38px; height: 38px; } .search { order: 3; width: 100%; max-width: none; height: 44px; } .dropdown-panel { top: calc(100% + 12px); } .explore-panel { right: -54px; width: min(290px,calc(100vw - 40px)); } }
      @media(max-width:370px) { .navbar { padding: 16px 12px; gap: 12px; } .nav-actions { gap: 10px; } .brand img { width: 94px; } }
    `
})

export class Navbar {
   readonly avatarUrl = input<string>();//input recibe datos desde el componente padre
   readonly open = signal<'explore'|'user'|null>(null);//Almacena un valor y avisa a Angular cuando cambia para actualizar la interfaz
   readonly exploreButton = viewChild<ElementRef<HTMLButtonElement>>('exploreButton');//lo uso para devolverle el foco al botón cuando cerrás el menú con Escape
   readonly userButton = viewChild<ElementRef<HTMLButtonElement>>('userButton');
   private readonly element = inject(ElementRef<HTMLElement>);//para obtener una referencia al elemento del propio componente
   private readonly router = inject(Router);//Así obtenemos el router para navegar a otra pág
   readonly explore = [ 
    ['Discover','Find your next favorite book','/discover'], 
    ['Top Rated','The community’s best-loved books','/top-rated'], 
    ['Lists','Collections made by readers','/lists'], 
    ['Genres','Explore by genre and theme','/genres'] 
   ];
   readonly personal = [
    ['My Profile','/profile'],
    ['My Library','/library'],
    ['Reading Journal','/journal'],
    ['Goals & Stats','/goals'],
    ['Settings','/settings']
   ];

  toggle(menu:'explore'|'user') { this.open.update(value => value === menu ? null : menu); }
  close() { this.open.set(null); }

  @HostListener('document:pointerdown',['$event']) outside(event:PointerEvent) { //Permite ejecutar un método cuando ocurre un evento
    if(!this.element.nativeElement.contains(event.target as Node)) this.close(); //element.nativeElement para comprobar si un clic ocurrió dentro o fuera del componente.
  }

  @HostListener('document:keydown.escape') escape() { 
    const button = this.open() === 'explore' 
      ? this.exploreButton() 
      : this.userButton(); 
      
      if(this.open()) { 
        button?.nativeElement.focus(); this.close(); 
    } 
  }

  onBlur(event:FocusEvent) { 
    if(!this.element.nativeElement.contains(event.relatedTarget as Node)) this.close(); 
  }

  search(event:Event, value:string) { 
    event.preventDefault(); 
    const q = value.trim(); 
    if(q) { 
        this.close(); 
        void this.router.navigate(['/search'],{queryParams:{q}}); 
    } 
  }
}
