import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent {
  asyncTabs: Observable<ExampleTab[]>;
  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'Profit', content: 'Content 1' },
          { label: 'Non-Profit', content: 'Content 2' },
        ]);
      }, 100);
    });
  }
}
