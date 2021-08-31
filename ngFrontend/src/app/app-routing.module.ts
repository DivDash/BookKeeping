import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributesComponent } from './attributes/attributes.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { RegisterComponent } from './register/register.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CostcenterComponent } from './costcenter/costcenter.component';

import { JentryComponent } from './jentry/jentry.component';
import { ReportsComponent } from './reports/reports.component';
// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'dashboard', component: DashboardComponent },
// ];

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashComponent,
    children: [
      { path: 'attribute', component: AttributesComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'costcenter', component: CostcenterComponent },
      {path:'journal',component:JentryComponent},
      {path:'report',component:ReportsComponent}
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
