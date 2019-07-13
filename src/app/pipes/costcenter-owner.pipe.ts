import { Pipe, PipeTransform } from '@angular/core';
import { Project, NonProfit } from '../services/helper-classes';

@Pipe({
  name: 'costcenterOwner'
})
export class CostcenterOwnerPipe implements PipeTransform {

  transform(costCenter: Project | NonProfit): string {
    if (costCenter instanceof Project)
      return `${costCenter.name}`;
    else if (costCenter instanceof NonProfit)
      return `${costCenter.name}`;
  }

}
