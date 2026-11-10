import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector:'clause-page', 
    imports:[RouterLink], 
    template:`
      <section class="home-intro">
        <span class="eyebrow">{{ route.snapshot.data['eyebrow'] || 'YOUR READING SPACE' }}</span>
        <h1>{{ route.snapshot.data['title'] }}</h1>
        <p>{{ route.snapshot.data['description'] }}</p>
        @if (route.snapshot.routeConfig?.path !== '') 
        { <a class="back-link" routerLink="/">Back to home</a> }
      </section>
    `
})

export class Page { readonly route = inject(ActivatedRoute); }
