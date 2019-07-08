import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BankAccount, CashAccount, EntryType } from './helper-classes';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  bankAccounts: Array<BankAccount>;
  cashAccounts: Array<CashAccount>;

  entryTypes: Array<EntryType>;

  constructor(private http: HttpClient) { }

  getData(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${environment.weatherMapApi}`);
  }

  // Gets accounts from the latest possible source
  loadAccounts() {
    // TODO: Check if already loaded, if not load from cache, if not in cache then from net, if no net then reject
    return new Promise<any>((resolve, reject) => {
      // Load bank accounts
      this.bankAccounts = [
        new BankAccount('Meezan Bank', 'Misbah Khan', 10000),
        new BankAccount('Summit Bank', 'DHL', 0),
        new BankAccount('Summit Bank', 'Misbah Khan', 30000)
      ];
      // Load cash accounts
      this.cashAccounts = [
        new CashAccount('Imran Ali', 200000),
        new CashAccount('Misbah Khan', 10000)
      ];
      // TODO: Proper loading of entry types
      this.entryTypes = [
        new EntryType('Assets'),
        new EntryType('Liabilities'),
        new EntryType('Expenses'),
        new EntryType('Drawings'),
        new EntryType('Capital'),
        new EntryType('Revenue')
      ];
      // Return the loaded accounts in an object
      resolve({
        bankAccounts: this.bankAccounts,
        cashAccounts: this.cashAccounts
      });
    });
  }

  // Takes bank account element as input and removes from array
  // TODO: Updates the database
  deleteBankAccount(bankAccount: BankAccount) {
    this.bankAccounts.splice(
      this.bankAccounts.indexOf(bankAccount), 1
    );
  }

  deleteCashAccount(cashAccount: CashAccount) {
    this.cashAccounts.splice(
      this.cashAccounts.indexOf(cashAccount), 1
    );
  }
  
}
