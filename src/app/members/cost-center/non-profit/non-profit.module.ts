import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NonProfitPage } from './non-profit.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: NonProfitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [NonProfitPage, EditComponent],
  entryComponents: [EditComponent]
})
export class NonProfitPageModule {}
