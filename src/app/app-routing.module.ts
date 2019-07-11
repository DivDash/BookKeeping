import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  {
    path: 'members',
    // canActivate: [AuthGuardService],
    loadChildren: './members/members.module#MembersPageModule'
  },
  {
    path: '**',
    redirectTo: ''
  },
  { path: 'projects', loadChildren: './members/projects/projects.module#ProjectsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
