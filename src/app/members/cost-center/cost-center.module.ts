import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CostCenterPage } from './cost-center.page';

const routes: Routes = [
  {
    path: '',
    component: CostCenterPage,
    children: [
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsPageModule'
      },
      {
        path: 'non-profit',
        loadChildren: './non-profit/non-profit.module#NonProfitPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CostCenterPage]
})
export class CostCenterPageModule {}
