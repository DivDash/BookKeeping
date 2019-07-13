import { Pipe, PipeTransform } from '@angular/core';
import { BankAccount, CashAccount } from '../services/helper-classes';

@Pipe({
  name: 'accountOwner'
})
export class AccountOwnerPipe implements PipeTransform {

  transform(account: BankAccount | CashAccount): string {
    if (account instanceof BankAccount)
      return `${account.accountHolder} (${account.bankName})`;
    else if (account instanceof CashAccount)
      return `${account.accountHolder} (${account.particulars})`;
  }

}
