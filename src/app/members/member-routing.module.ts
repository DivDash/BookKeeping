import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: 'accounts', loadChildren: './accounts/accounts.module#AccountsPageModule'},
  { path: 'cost-center', loadChildren: './cost-center/cost-center.module#CostCenterPageModule'},
  { path: 'journal-entries', loadChildren: './journal-entries/journal-entries.module#JournalEntriesPageModule'},
  // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
