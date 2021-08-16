import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributesComponent } from './attributes/attributes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { RegisterComponent } from './register/register.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'dashboard', component: DashboardComponent },
// ];

const routes: Routes =[
  {
    path: 'dashboard', component: DashComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'attribute', component: AttributesComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}