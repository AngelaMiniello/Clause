import { Component } from '@angular/core';

@Component({
  selector: 'clause-features',
  templateUrl: './features.html',
  styles: `
    :host { display: block; }
    .features { background: #c7cd9a; padding: 0 36px 120px; position: relative; }
    .section-wave { display: block; width: calc(100% + 72px); height: clamp(40px, 6vw, 90px); margin-left: -36px; margin-top: -1px; }
    .features-inner { max-width: 1120px; margin: 0 auto; }
    h2 { margin: 50px 0 70px; text-align: center; color: #151b16; font: 700 clamp(26px, 3vw, 36px)/1.25 'Satoshi', Arial, sans-serif; letter-spacing: -1px; }
    .feature-board { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 38px 22px; padding: 32px; border-radius: 38px; background: #d9dad7; }
    .feature-card { grid-column: span 2; padding: 22px 20px 26px; border-radius: 38px; background: #ed8050; color: #fff; }
    .feature-card:nth-child(1) { grid-column: 2 / span 2; }
    .feature-card:nth-child(2) { grid-column: 4 / span 2; }
    .feature-card:nth-child(3) { grid-column: 6 / span 2; }
    .card-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
    .icon { flex: 0 0 36px; width: 36px; height: 36px; padding: 7px; background: #ffffff22; border-radius: 10px; }
    h3 { margin: 0; font-size: 21px; font-weight: 600; line-height: 1.2; }
    p { margin: 0; font-size: 15px; line-height: 1.45; }
    .detail { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600; }
    @media (max-width: 1050px) {
      .feature-board { gap: 24px 16px; padding: 26px; }
      .feature-card { padding: 20px 16px; border-radius: 28px; }
      .card-heading { flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 700px) {
      .features { padding: 0 20px 72px; }
      .section-wave { width: calc(100% + 40px); margin-left: -20px; }
      h2 { margin: 30px 0 36px; font-size: 28px; }
      .feature-board { grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 20px; gap: 16px; border-radius: 28px; }
      .feature-card:nth-child(n) { grid-column: auto; }
      .feature-card:last-child { grid-column: 1 / -1; }
      h3 { font-size: 19px; }
      p { font-size: 14px; }
    }
    @media (max-width: 390px) {
      .feature-board { grid-template-columns: minmax(0, 1fr); padding: 16px; }
      .card-heading { flex-direction: row; align-items: center; }
    }
  `,
})
export class Features {
  readonly features = [
    { title: 'Discover', description: 'Books and authors based on your reading preferences.', icon: 'M12 3 14.5 9.5 21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z' },
    { title: 'Explore', description: 'Search books or find inspiration in other readers’ lists.', icon: 'M21 21l-5-5 M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z' },
    { title: 'Connect', description: 'Follow other readers and find your next favorite on their bookshelf.', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' },
    { title: 'Rate', detail: 'Half-star ratings', description: 'Express how you really feel, with ratings and your own reviews.', icon: 'm12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z' },
    { title: 'Track', description: 'Want to read? Currently reading? Read or didn’t finish. Keep a record of your reading life.', icon: 'M12 5v16 M3 3h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3V3Z' },
    { title: 'Challenges', description: 'Set personal reading goals and celebrate your progress, at your own pace.', icon: 'M21 12a9 9 0 1 1-9-9 M17 12a5 5 0 1 1-5-5 M12 12l9-9 M16 3h5v5' },
    { title: 'Lists', description: 'Organize your books and share your curated lists with friends.', icon: 'M9 6h12 M9 12h12 M9 18h12 M3 6h1 M3 12h1 M3 18h1' },
  ];
}
