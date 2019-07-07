import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bank-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  @Input() bankName: string;
  @Input() accountHolder: string;
  @Input() currentBalance: string;

  constructor() { }

  ngOnInit() {
  }

}
