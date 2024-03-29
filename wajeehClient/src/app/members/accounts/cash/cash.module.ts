import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashPage } from './cash.page';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: CashPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashPage, EditComponent],
  entryComponents: [EditComponent]
})
export class CashPageModule {}
