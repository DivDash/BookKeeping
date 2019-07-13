import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MembersPage } from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'accounts',
        loadChildren: './accounts/accounts.module#AccountsPageModule'
      },
      {
        path: 'cost-center',
        loadChildren: './cost-center/cost-center.module#CostCenterPageModule'
      },
      {
        path: 'journal-entries',
        loadChildren: './journal-entries/journal-entries.module#JournalEntriesPageModule'
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
  declarations: [MembersPage]
})
export class MembersPageModule {}
