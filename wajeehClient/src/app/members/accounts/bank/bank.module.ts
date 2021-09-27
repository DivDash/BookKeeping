import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BankPage } from './bank.page';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: BankPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BankPage, EditComponent],
  entryComponents: [EditComponent]
})
export class BankPageModule {}
