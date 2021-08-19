import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css'],
})
export class ReusableTableComponent implements OnChanges {
  @Input() GridData: any;
  @Input() ColData: any;

  constructor() {}
  ngOnChanges() {}
}
