import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.page.html',
  styleUrls: ['./cost-center.page.scss'],
})
export class CostCenterPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.navigateByUrl('/members/cost-center/projects');
  }

}
