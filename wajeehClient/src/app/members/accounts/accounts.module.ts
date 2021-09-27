import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountsPage } from './accounts.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bank'
  },
  {
    path: '',
    component: AccountsPage,
    children: [
      {
        path: 'bank',
        loadChildren: './bank/bank.module#BankPageModule'
      },
      {
        path: 'cash',
        loadChildren: './cash/cash.module#CashPageModule'
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
  declarations: [AccountsPage]
})
export class AccountsPageModule {}
