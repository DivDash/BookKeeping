import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BankAccount, CashAccount, EntryType, JournalEntry, Project } from './helper-classes';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // ACCOUNTS
  bankAccounts: Array<BankAccount>;
  cashAccounts: Array<CashAccount>;


  // PROJECTS
  projects: Array<Project>;



  entryTypes: Array<EntryType>;

  // JOURNAL ENTRIES
  journalEntries: Array<JournalEntry>;

  constructor(
    private http: HttpClient
  ) { }

  // DASHBOARD
  getData(city: string) {
    // this.http.post('http://localhost:4001/bank/create-bank-account', new BankAccount('Meezan Bank', 'Misbah Khan', 10000))
    // .subscribe(resp => {
    //   console.log(resp);
    // });
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${environment.weatherMapApi}`);
  }

  // ACCOUNTS
  // Loads both bank and cash accounts
  // Returns promise resolving to an object containing both
  // Gets them from the nearest possible source
  loadAccounts(): Promise<{
    bankAccounts: Array<BankAccount>,
    cashAccounts: Array<CashAccount>
  }> {
    // TODO: Check if already loaded, if not load from cache, if not in cache then from net, if no net then reject
    return new Promise<any>(async (resolve, reject) => {

      // Check if already loaded
      if (this.bankAccounts && this.cashAccounts)
        return reject(new Error('Accounts already loaded.'));

      this.bankAccounts = [];
      this.cashAccounts = [];

      // Load from the Internet
      // Resolve both bank and cash
      Promise.all([
      new Promise((res, rej) =>
      // Loading bank
      this.http.get('http://localhost:4001/bank/').subscribe(bankAccounts => {
        bankAccounts['forEach']((bankAccount, index) => {
          this.bankAccounts.push(new BankAccount(bankAccount.bankName, bankAccount.accountHolder, bankAccount.currentBalance));
          this.bankAccounts[index].id = bankAccount._id;
        });
        return res(this.bankAccounts);
      }, rej)
      ),
      new Promise((res, rej) =>
      // Loading cash
      this.http.get('http://localhost:4001/cash/').subscribe(cashAccounts => {
        cashAccounts['forEach']((cashAccount, index) => {
          this.cashAccounts.push(new CashAccount(cashAccount.particulars, cashAccount.currentBalance));
          this.cashAccounts[index].id = cashAccount._id;
        });
        return res(this.cashAccounts);
      }, rej)
      )
      ]).then(arrayOfAccounts => {
        // Store locally
        Storage.set({
          key: 'accounts',
          value: JSON.stringify({
            bankAccounts: arrayOfAccounts[0],
            cashAccounts: arrayOfAccounts[1]
          })
        });
      }).catch(async rej => {
        // If no net, load from cache
        // TODO: If rej === no net
        try {
          const ret = await Storage.get({ key: 'accounts' });
          if (ret.value) {
            const accounts = JSON.parse(ret.value);
            accounts.bankAccounts.forEach((bankAccount, index) => {
                this.bankAccounts.push(new BankAccount(bankAccount.bankName, bankAccount.accountHolder, bankAccount.currentBalance));
                this.bankAccounts[index].id = bankAccount.id;
            });

            accounts.cashAccounts.forEach((cashAccount, index) => {
              this.cashAccounts.push(new CashAccount(cashAccount.particulars, cashAccount.currentBalance));
              this.cashAccounts[index].id = cashAccount.id;
            });

            return resolve(accounts);
          }
        } catch (err) {
          console.error(err);
          return reject(err);
        }
      });
    });
  }

  // Adds account to local object, cache then internet
  // Promise can be rejected at any stage
  addAccount(account: BankAccount | CashAccount): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // Add to local array
      if (account instanceof BankAccount)
        this.bankAccounts.push(account);
      else if (account instanceof CashAccount)
        this.cashAccounts.push(account);

      // To internet
      if (account instanceof BankAccount)
        this.http.post('http://localhost:4001/bank/create-bank-account', account)
        .subscribe(async resp => {
          resolve(resp);
          // Save object to local cache
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify({
                bankAccounts: this.bankAccounts,
                cashAccounts: this.cashAccounts
              })
            });
          } catch (err) {
            reject(new Error('Error while adding account in local storage.'));
            return;
          }
        }, async error => {
          // Save object to local cache
          // TODO: If error == no net
          console.log(error);
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify({
                bankAccounts: this.bankAccounts,
                cashAccounts: this.cashAccounts
              })
            });
          } catch (err) {
            reject(new Error('Error while adding account in local storage.'));
            return;
          }
        });
      else if (account instanceof CashAccount)
        this.http.post('http://localhost:4001/cash/create-cash-account', account)
        .subscribe(async resp => {
          resolve(resp);
          // Save object to local cache
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify({
                bankAccounts: this.bankAccounts,
                cashAccounts: this.cashAccounts
              })
            });
          } catch (err) {
            reject(new Error('Error while adding account in local storage.'));
            return;
          }
        }, async error => {
          // Save object to local cache
          // TODO: If error == no net
          console.log(error);
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify({
                bankAccounts: this.bankAccounts,
                cashAccounts: this.cashAccounts
              })
            });
          } catch (err) {
            reject(new Error('Error while adding account in local storage.'));
            return;
          }
        });
    });
  }

  // Takes bank account element as input and removes from array
  // Then updates cache then online database
  deleteAccount(account: BankAccount | CashAccount) {
    return new Promise(async (resolve, reject) => {
      // Remove from local array
      if (account instanceof BankAccount)
        this.bankAccounts.splice(
          this.bankAccounts.indexOf(account), 1
        );
      else if (account instanceof CashAccount)
        this.cashAccounts.splice(
          this.cashAccounts.indexOf(account), 1
        );

      // Update cache
      try {
        await Storage.set({
          key: 'accounts',
          value: JSON.stringify({
            bankAccounts: this.bankAccounts,
            cashAccounts: this.cashAccounts
          })
        });
      } catch (err) {
        reject(new Error('Error while deleting account from local storage.'));
        return;
      }

      // Finally from internet - will depend if account was created
      // TODO: Handle error if no internet
      // Also depends on whether internet was available when object was created
      if (account instanceof BankAccount)
        this.http.delete(`http://localhost:4001/bank/delete-bank-account/${account.id}`)
        .subscribe(() => {
          resolve();
        });
      else if (account instanceof CashAccount)
      this.http.delete(`http://localhost:4001/cash/delete-cash-account/${account.id}`)
      .subscribe(() => {
        resolve();
      });

    });
  }

  // PROJECTS
  loadProjects() {
    return new Promise<any>(async (resolve, reject) => {

      // Check if already loaded
      if (this.projects)
        return reject(new Error('Projects already loaded.'));

      this.projects = [];

      // Load from the Internet
      // Loading bank
      this.http.get('http://localhost:4001/projects/').subscribe(projects => {
        this.projects = projects as Array<Project>;
        // Save to local cache
        Storage.set({
          key: 'projects',
          value: JSON.stringify(this.projects)
        });
      }, async error => {
        // If no net, load from cache
        // TODO: If error === no net
        try {
          const ret = await Storage.get({ key: 'projects' });
          if (ret.value) {
            this.projects = JSON.parse(ret.value);
            return resolve(this.projects);
          }
        } catch (err) {
          console.error(err);
          return reject(err);
        }
      });
    });

  }

  addProject(project: Project) {
    return new Promise(async (resolve, reject) => {

      this.projects.push(project);

      // To internet
      this.http.post('http://localhost:4001/projects/add-project', project)
      .subscribe(async resp => {
        resolve(resp);
        // Save object to local cache
        try {
          await Storage.set({
            key: 'projects',
            value: JSON.stringify(this.projects)
          });
        } catch (err) {
          reject(new Error('Error while adding project in local storage.'));
          return;
        }
      }, async error => {
        // TODO: if error === not connected
        // Save object to local cache
        try {
          await Storage.set({
            key: 'projects',
            value: JSON.stringify(this.projects)
          });
        } catch (err) {
          reject(new Error('Error while adding project in local storage.'));
          return;
        }
      });

    });
  }

  // JOURNAL ENTRIES
  loadJournalEntries() {
    // Load type of entries
    // TODO: Proper loading of entry types
    this.entryTypes = [
      new EntryType('Assets'),
      new EntryType('Liabilities'),
      new EntryType('Expenses'),
      new EntryType('Drawings'),
      new EntryType('Capital'),
      new EntryType('Revenue')
    ];

    // Load entries
    this.journalEntries = [
      new JournalEntry('Tiles', 'Askari V Masjid', 'Imran', 'Cash', 10000, 10000, 'Asset', new Date()),
      // new JournalEntry('Tiles', 'DHL', 'Imran', 'Cash', 10000, 10000, 'Asset', new Date(), 'Under way'),
      // new JournalEntry('Tiles', 'Askari V Masjid', 'Imran', 'Cash', 10000, 10000, 'Asset', new Date(), 'Under way'),
      // new JournalEntry('Tiles', 'Askari V Masjid', 'Imran', 'Cash', 10000, 10000, 'Asset', new Date(), 'Under way'),
    ];

  }

  addJournalEntry(journalEntry: JournalEntry) {

  }

}
