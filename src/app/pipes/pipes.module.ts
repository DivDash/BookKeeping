import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOwnerPipe } from './account-owner.pipe';
import { CostcenterOwnerPipe } from './costcenter-owner.pipe';



@NgModule({
  declarations: [AccountOwnerPipe, CostcenterOwnerPipe],
  imports: [
    CommonModule
  ],
  exports: [AccountOwnerPipe, CostcenterOwnerPipe]
})
export class PipesModule { }
