import { Component, signal } from '@angular/core';

@Component({
  selector: 'clause-book-preview',
  templateUrl: './book-preview.html',
  styles: `
    :host { display: block; }
    .book-section { position: relative; background: #1c193b; color: #f5f1df; padding: calc(90px + clamp(40px, 6vw, 90px)) 36px 90px; }
    .section-wave { position: absolute; top: -1px; left: 0; display: block; width: 100%; height: clamp(40px, 6vw, 90px); pointer-events: none; }
    .book-inner { max-width: 1120px; margin: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .demo { position: relative; padding: 0 24px 38px 0; }
    .book { display: flex; align-items: flex-start; gap: 22px; }
    .cover { width: 148px; height: auto; border-radius: 4px; box-shadow: 8px 12px 26px #08051a60; }
    .book-heading { padding-top: 9px; }
    .demo-label { display: block; color: #a4d3f1; font-size: 10px; font-weight: 700; letter-spacing: 2px; margin-bottom: 12px; }
    .book-heading h3 { margin: 0 0 7px; font-family: 'Satoshi', Arial, sans-serif; font-size: 20px; line-height: 1.25; }
    .author { color: #c7cd9a; font-size: 13px; margin: 0; }
    .status-badge { margin-top: 20px; display: inline-block; padding: 9px 13px; border-radius: 7px; background: #ed8050; color: #1c193b; font-size: 12px; font-weight: 700; }
    .reading-panel { position: relative; width: calc(100% - 95px); margin: -65px 0 0 95px; padding: 17px; border: 1px solid #f5f1df20; border-radius: 14px; background: #282346; box-shadow: 0 16px 40px #0b082c50; }
    .panel-label { color: #c5bfd6; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 10px; }
    .statuses { display: grid; gap: 3px; }
    .status { display: flex; align-items: center; gap: 9px; border: 0; background: transparent; color: #f5f1df; padding: 9px; border-radius: 6px; text-align: left; font-size: 12px; }
    .status[aria-pressed=true] { background: #ed805024; color: #ffad7d; }
    .status:hover { background: #ffffff10; }
    .status-icon { width: 16px; text-align: center; }
    .row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 4px; border-top: 1px solid #f5f1df14; font-size: 12px; }
    .rating { margin-top: 12px; }
    .stars { display: flex; gap: 2px; }
    .stars button { border: 0; padding: 0 1px; background: transparent; color: #827895; font-size: 22px; line-height: 1; }
    .stars button.active { color: #ed8050; }
    .tag { border-radius: 20px; padding: 4px 8px; background: #e873ac22; color: #f2a8cc; font-size: 10px; white-space: nowrap; }
    .privacy { display: flex; align-items: center; gap: 7px; padding-top: 9px; font-size: 10px; color: #c5bfd6; flex-wrap: wrap; }
    .privacy-choice { color: #c7cd9a; background: #c7cd9a15; border-radius: 4px; padding: 5px 8px; }
    .demo-caption { color: #c7cd9a; text-align: center; font-size: 11px; margin: 18px 0 0 95px; }
    .copy .kicker { color: #ed8050; font-size: 11px; letter-spacing: 2px; font-weight: 700; }
    h2 { font: 700 clamp(28px, 3vw, 40px)/1.15 'Satoshi', Arial, sans-serif; margin: 16px 0 22px; letter-spacing: -1px; }
    .intro { color: #c5bfd6; font-size: 15px; line-height: 1.7; margin: 0 0 22px; }
    ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
    li { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; line-height: 1.5; }
    .check { display: grid; place-items: center; flex: 0 0 20px; height: 20px; border-radius: 50%; background: #c7cd9a22; color: #c7cd9a; font-size: 12px; }
    .closing { color: #a4d3f1; border-top: 1px solid #f5f1df20; margin: 28px 0 0; padding-top: 20px; font-size: 14px; line-height: 1.6; }
    @media(max-width: 950px) { .book-inner { gap: 36px; } .book-heading h3 { font-size: 17px; } .cover { width: 120px; } .reading-panel { margin-left: 50px; width: calc(100% - 50px); margin-top: -25px; } .demo-caption { margin-left: 50px; } .demo { padding-right: 0; } }
    @media(max-width: 700px) { .book-section { padding: calc(60px + clamp(40px, 6vw, 90px)) 24px 60px; } .book-inner { grid-template-columns: minmax(0, 1fr); gap: 36px; max-width: 480px; } .demo { padding-bottom: 0; } .cover { width: 135px; } .book-heading h3 { font-size: 20px; } .reading-panel { margin-top: -40px; margin-left: 70px; width: calc(100% - 70px); } .demo-caption { margin-left: 70px; } }
    @media(max-width: 370px) { .book-section { padding-inline: 18px; } .book { gap: 16px; } .cover { width: 110px; } .book-heading h3 { font-size: 17px; } .reading-panel { margin: 16px 0 0; width: 100%; } .demo-caption { margin-left: 0; } }
  `,
})
export class BookPreview {
  readonly status = signal('Want to Read');
  readonly rating = signal(4);
  readonly statuses = [
    {label: 'Want to Read', icon: '⌑'},
    {label: 'Currently Reading', icon: '◷'},
    {label: 'Read', icon: '✓'},
    {label: 'Did Not Finish', icon: '–'},
  ];
  readonly stars = [1, 2, 3, 4, 5];
  readonly benefits = [
    'Keep track of every book’s reading status',
    'Update your progress as you read',
    'Save your ratings and write your own reviews',
    'Keep private notes, thoughts and favorite moments',
    'Organize your books into personal lists',
    'Look back on your dates, editions and rereads',
  ];
}

