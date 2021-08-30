import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css'],
})
export class AttributesComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
