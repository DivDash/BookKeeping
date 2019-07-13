import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOwnerPipe } from './account-owner.pipe';



@NgModule({
  declarations: [AccountOwnerPipe],
  imports: [
    CommonModule
  ],
  exports: [AccountOwnerPipe]
})
export class PipesModule { }
