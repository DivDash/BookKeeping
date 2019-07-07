import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JournalEntriesPage } from './journal-entries.page';

const routes: Routes = [
  {
    path: '',
    component: JournalEntriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JournalEntriesPage]
})
export class JournalEntriesPageModule {}
