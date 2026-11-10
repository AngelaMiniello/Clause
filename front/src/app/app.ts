import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar';

@Component({
    selector:'clause-root', 
    imports:[Navbar, RouterOutlet], 
    template:'<clause-navbar /><main id="main-content" tabindex="-1"><router-outlet /></main>'
})

export class App {}
