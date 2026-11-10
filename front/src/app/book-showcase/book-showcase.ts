import { Component, signal } from '@angular/core';

@Component({
  selector: 'clause-book-showcase',
  templateUrl: './book-showcase.html',
  styles: `
    :host {
      display: block;
      background: #c7cd9a;
      padding: clamp(48px, 8vw, 128px) 0 clamp(40px, 6vw, 96px);
    }

    .showcase-panel {
      position: relative;
      isolation: isolate;
      display: grid;
      align-content: center;
      overflow: hidden;
      background-color: #ed8050;
      background-image:
        radial-gradient(circle, #fff1d84d 0.5px, transparent 1.1px),
        radial-gradient(circle, #78351f38 0.45px, transparent 1px);
      background-size: 5px 5px, 7px 7px;
      background-position: 0 0, 2px 3px;
      min-height: clamp(480px, 65vw, 800px);
      padding-block: clamp(96px, 14vw, 150px) clamp(48px, 7vw, 85px);
    }

    .showcase-title {
      position: absolute;
      z-index: -2;
      inset-inline: 0;
      top: 20%;
      margin: 0;
      transform: translateY(-50%);
      color: #1c193b;
      font: 700 clamp(48px, 14vw, 280px)/1 'Satoshi', Arial, sans-serif;
      letter-spacing: -0.055em;
      text-align: left;
      pointer-events: none;
    }

    .reader {
      --reader-padding: clamp(18px, 3vw, 46px);
      position: absolute;
      z-index: -1;
      inset: var(--reader-padding);
      width: calc(100% - 2 * var(--reader-padding));
      height: calc(100% - 2 * var(--reader-padding));
      object-fit: contain;
      object-position: 65% center;
      pointer-events: none;
    }

    .shelves {
      --cover-height: clamp(150px, 15vw, 200px);
      --cover-gap: clamp(7px, 1vw, 14px);
      overflow: hidden;
      padding-block: 12px;
      background: #244a3e;
      transform: translateY(60px);
    }

    .track {
      display: flex;
      width: max-content;
      animation: shelf-scroll 84s linear infinite;
    }

    .shelves.paused .track { 
      animation-play-state: paused; }

    .cover-set {
      display: flex;
      gap: var(--cover-gap);
      min-width: 50vw;
      margin: 0;
      padding: 0 var(--cover-gap) 0 0;
      list-style: none;
    }

    .cover-set li {
      flex: none;
      width: calc(var(--cover-height) * 2 / 3);
      height: var(--cover-height);
      overflow: hidden;
      border-radius: 5px;
      background: #1c193b;
      box-shadow: 0 2px 6px #101c1780;
    }

    .cover-set img { 
      display: block;
      width: 100%; 
      height: 100%; 
      object-fit: cover; 
    }

    .showcase-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px 16px;
      padding: 9px clamp(16px, 4vw, 56px);
      color: #1c193b;
      font-size: 12px;
      font-weight: 700;
    }

    .showcase-controls a { 
      text-decoration: underline; text-underline-offset: 3px; }

    .showcase-controls button {
      padding: 6px 12px;
      border: 1px solid currentColor;
      border-radius: 999px;
      background: #f5f1df;
    }

    @keyframes shelf-scroll {
      to { transform: translateX(calc(-100% / 3)); }
    }

    @media (prefers-reduced-motion: reduce) {
      .shelves { overflow-x: auto; }
      .track { animation: none; }
      .cover-set[aria-hidden='true'], .showcase-controls button { display: none; }
    }
  `,
})

export class BookShowcase {
  readonly paused = signal(false);
  readonly repeats = [0, 1, 2];
  readonly books = [
    { slug: 'dungeon-crawler-carl', title: 'Dungeon Crawler Carl' },
    { slug: 'project-hail-mary', title: 'Project Hail Mary' },
    { slug: 'golden-son', title: 'Golden Son' },
    { slug: 'piranesi', title: 'Piranesi' },
    { slug: 'yesteryear', title: 'Yesteryear' },
    { slug: 'mistborn', title: 'Mistborn: The Final Empire' },
    { slug: 'animal-farm', title: 'Animal Farm' },
    { slug: 'the-will-of-the-many', title: 'The Will of the Many' },
    { slug: 'fourth-wing', title: 'Fourth Wing' },
    { slug: 'red-rising', title: 'Red Rising' },
    { slug: 'harry-potter', title: "Harry Potter and the Philosopher's Stone" },
    { slug: 'the-well-of-ascension', title: 'The Well of Ascension' },
    { slug: '1984', title: '1984' },
    { slug: 'all-systems-red', title: 'All Systems Red' },
    { slug: 'carls-doomsday-scenario', title: "Carl's Doomsday Scenario" },
    { slug: 'morning-star', title: 'Morning Star' },
    { slug: 'there-is-no-antimemetics-division', title: 'There Is No Antimemetics Division' },
    { slug: 'the-strength-of-the-few', title: 'The Strength of the Few' },
  ];
}
