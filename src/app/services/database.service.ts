import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BankAccount, CashAccount, EntryType, JournalEntry, Project, NonProfit, User } from './helper-classes';

import { Plugins } from '@capacitor/core';
<<<<<<< HEAD
import { ServerService } from './server.service';
=======

>>>>>>> Authentication
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // ACCOUNTS
  bankAccounts: Array<BankAccount>;
  cashAccounts: Array<CashAccount>;


  // COST CENTER
  projects: Array<Project>;
  nonProfits: Array<NonProfit>;

  entryTypes: Array<EntryType>;

  // JOURNAL ENTRIES
  journalEntries: Array<JournalEntry>;

  // USERs
  users: Array<User>;

  constructor(
    private http: HttpClient,
    private server: ServerService
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
    return new Promise(async (resolve, reject) => {

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
      this.server.getLiveCollection('bank').subscribe(bankAccounts => {
        this.bankAccounts.length = bankAccounts.length;
        bankAccounts.forEach((bankAccount, index) => {
          this.bankAccounts[index] = new BankAccount(bankAccount.bankName, bankAccount.accountHolder, bankAccount.currentBalance);
          this.bankAccounts[index].id = bankAccount._id;
        });
        return res(this.bankAccounts);
      }, rej)
      ),
      new Promise((res, rej) =>
      // Loading cash
      this.server.getLiveCollection('cash').subscribe(cashAccounts => {
        this.cashAccounts.length = cashAccounts.length;
        cashAccounts.forEach((cashAccount, index) => {
          this.cashAccounts[index] = new CashAccount(cashAccount.accountHolder, cashAccount.currentBalance, cashAccount.particulars);
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
                this.bankAccounts[index] = new BankAccount(bankAccount.bankName, bankAccount.accountHolder, bankAccount.currentBalance);
                this.bankAccounts[index].id = bankAccount._id;
            });

            accounts.cashAccounts.forEach((cashAccount, index) => {
              this.cashAccounts[index] = new CashAccount(cashAccount.accountHolder, cashAccount.currentBalance, cashAccount.particulars);
              this.cashAccounts[index].id = cashAccount._id;
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
              value: JSON.stringify(this.accounts)
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
              value: JSON.stringify(this.accounts)
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
              value: JSON.stringify(this.accounts)
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
              value: JSON.stringify(this.accounts)
            });
          } catch (err) {
            reject(new Error('Error while adding account in local storage.'));
            return;
          }
        });
    });
  }

  updateAccount(account: BankAccount | CashAccount) {
    return new Promise<BankAccount | CashAccount>((resolve, reject) => {
      // If bank accounts
      if (account instanceof BankAccount) {
        // Update online
        this.http.put(`http://localhost:4001/bank/update-bank-account/${account.id}`,
        account).subscribe(async resp => {
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify(this.accounts)
            });
            resolve(account);
          } catch (err) {
            reject(new Error('Error while updating bank account'));
          }
        }, async error => {
          console.log(error);
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify(this.accounts)
            });
            resolve(account);
          } catch (err) {
            reject(new Error('Error while updating bank account'));
          }
        });
      } else if (account instanceof CashAccount) {
        // Else cash accounts
        // Update online
        this.http.put(`http://localhost:4001/cash/update-cash-account/${account.id}`,
        account).subscribe(async resp => {
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify(this.accounts)
            });
            resolve(account);
          } catch (err) {
            reject(new Error('Error while updating cash account'));
          }
        }, async error => {
          console.log(error);
          try {
            await Storage.set({
              key: 'accounts',
              value: JSON.stringify(this.accounts)
            });
            resolve(account);
          } catch (err) {
            reject(new Error('Error while updating cash account'));
          }
        });
      }
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
          value: JSON.stringify(this.accounts)
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

  get accounts() {
    return {
      bankAccounts: this.bankAccounts,
      cashAccounts: this.cashAccounts
    };
  }

  getAccountById(accountId: string) {
    let account: BankAccount | CashAccount;
    // Search in bank
    account = this.bankAccounts.find(bankAccount => bankAccount.id === accountId);
    // If not in bank, search in cash
    if (!account)
      account = this.cashAccounts.find(cashACcount => cashACcount.id === accountId);
    return account;
  }

  // PROJECTS
  loadCostCenter(): Promise<{
    projects: Array<Project>,
    nonProfit: Array<NonProfit>
  }> {
    return new Promise(async (resolve, reject) => {

      // Check if already loaded
      if (this.projects && this.nonProfits)
        return reject(new Error('Accounts already loaded.'));

      this.projects = [];
      this.nonProfits = [];

      // Load from the Internet
      // Resolve both projects and non-profit
      Promise.all([
      new Promise((res, rej) =>
      // Loading project
      this.server.getLiveCollection('projects').subscribe(projects => {
        this.projects.length = projects.length;
        projects.forEach((project, index) => {
          this.projects[index] = new Project(project.name, project.clientAccountId,
          project.accountReceivable, project.date, project.status);
          this.projects[index].id = project._id;
          this.projects[index].expenses = project.expenses;
          this.projects[index].unearnedRevenue = project.unearnedRevenue;
          this.projects[index].revenue = project.revenue;
        });
        return res(this.projects);
      }, rej)
      ),
      new Promise((res, rej) =>
      // Loading non-profit
      this.server.getLiveCollection('non-profit').subscribe(nonProfits => {
        this.nonProfits.length = nonProfits.length;
        nonProfits.forEach((nonProfit, index) => {
          this.nonProfits[index] = new NonProfit(nonProfit.name, nonProfit.particulars);
          this.nonProfits[index].id = nonProfit._id;
          this.nonProfits[index].expenses = nonProfit.expenses;
        });
        return res(this.nonProfits);
      }, rej)
      )
      ]).then(arrayOfAccounts => {
        // Store locally
        Storage.set({
          key: 'cost-center',
          value: JSON.stringify({
            projects: arrayOfAccounts[0],
            nonProfits: arrayOfAccounts[1]
          })
        });
      }).catch(async rej => {
        // If no net, load from cache
        // TODO: If rej === no net
        try {
          const ret = await Storage.get({ key: 'cost-center' });
          if (ret.value) {
            const costCenter = JSON.parse(ret.value);
            costCenter.projects.forEach((project, index) => {
                this.projects[index] = new Project(project.name, project.clientAccountId,
                project.accountReceivable, project.date, project.status);
                this.projects[index].id = project._id;
            });

            costCenter.nonProfits.forEach((nonProfit, index) => {
              this.nonProfits[index] = new NonProfit(nonProfit.name, nonProfit.particulars);
              this.nonProfits[index].id = nonProfit._id;
              this.nonProfits[index].expenses = nonProfit.expenses;
            });

            return resolve(costCenter);
          }
        } catch (err) {
          console.error(err);
          return reject(err);
        }
      });
    });
  }

  addCostCenter(costCenter: Project | NonProfit) {
    return new Promise(async (resolve, reject) => {
      // Add to local array
      if (costCenter instanceof Project)
        this.projects.push(costCenter);
      else if (costCenter instanceof NonProfit)
        this.nonProfits.push(costCenter);

      // To internet
      if (costCenter instanceof Project)
        this.http.post('http://localhost:4001/projects/add-project', costCenter)
        .subscribe(async resp => {
          resolve(resp);
          // Save object to local cache
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
          } catch (err) {
            reject(new Error('Error while adding cost center in local storage.'));
            return;
          }
        }, async error => {
          // Save object to local cache
          // TODO: If error == no net
          console.log(error);
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
          } catch (err) {
            reject(new Error('Error while adding cost center in local storage.'));
            return;
          }
        });
      else if (costCenter instanceof NonProfit)
        this.http.post('http://localhost:4001/non-profit/add-non-profit', costCenter)
        .subscribe(async resp => {
          resolve(resp);
          // Save object to local cache
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
          } catch (err) {
            reject(new Error('Error while adding cost center in local storage.'));
            return;
          }
        }, async error => {
          // Save object to local cache
          // TODO: If error == no net
          console.log(error);
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
          } catch (err) {
            reject(new Error('Error while adding cost center in local storage.'));
            return;
          }
        });
    });
  }

  updateCostCenter(costCenter: Project | NonProfit) {
    return new Promise<Project | NonProfit>((resolve, reject) => {
      // Project
      if (costCenter instanceof Project) {
        // Update online
        this.http.put(`http://localhost:4001/projects/update-project/${costCenter.id}`,
        costCenter).subscribe(async resp => {
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
            resolve(costCenter);
          } catch (err) {
            reject(new Error('Error while updating project'));
          }
        }, async error => {
          console.log(error);
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
            resolve(costCenter);
          } catch (err) {
            reject(new Error('Error while updating project'));
          }
        });
      } else if (costCenter instanceof NonProfit) {
        // Else non profit
        // Update online
        this.http.put(`http://localhost:4001/non-profit/update-non-profit/${costCenter.id}`,
        costCenter).subscribe(async resp => {
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
            resolve(costCenter);
          } catch (err) {
            reject(new Error('Error while updating non profit'));
          }
        }, async error => {
          console.log(error);
          try {
            await Storage.set({
              key: 'cost-center',
              value: JSON.stringify(this.costCenter)
            });
            resolve(costCenter);
          } catch (err) {
            reject(new Error('Error while updating non profit'));
          }
        });
      }
    });
  }

  // Takes Cost Center element as input and removes from array
  // Then updates cache then online database
  deleteCostCenter(costCenter: Project | NonProfit) {
    return new Promise(async (resolve, reject) => {
      // Remove from local array
      if (costCenter instanceof Project)
        this.projects.splice(
          this.projects.indexOf(costCenter), 1
        );
      else if (costCenter instanceof NonProfit)
        this.nonProfits.splice(
          this.nonProfits.indexOf(costCenter), 1
        );

      // Update cache
      try {
        await Storage.set({
          key: 'cost-center',
          value: JSON.stringify(this.costCenter)
        });
      } catch (err) {
        reject(new Error('Error while deleting Cost-Center from local storage.'));
        return;
      }

      // Finally from internet - will depend if cost-center was created
      // TODO: Handle error if no internet
      // Also depends on whether internet was available when object was created
      if (costCenter instanceof Project)
        this.http.delete(`http://localhost:4001/projects/delete-project/${costCenter.id}`)
        .subscribe(() => {
          resolve();
        });
      else if (costCenter instanceof NonProfit)
      this.http.delete(`http://localhost:4001/non-profit/delete-non-profit/${costCenter.id}`)
      .subscribe(() => {
        resolve();
      });

    });
  }

  get costCenter() {
    return {
      projects: this.projects,
      nonProfits: this.nonProfits
    };
  }

  getCostCenterById(costCenterId: string) {
    let costCenter: Project | NonProfit;
    costCenter = this.projects.find(project => project.id === costCenterId);
    if (!costCenter)
      costCenter = this.nonProfits.find(nonProfit => nonProfit.id === costCenterId);
    return costCenter;
  }

  // JOURNAL ENTRIES
  loadJournalEntries() {

    return new Promise((resolve, reject) => {

      // Check if already loaded
      if (this.journalEntries)
        return reject(new Error('Journal entries have already loaded.'));

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

      this.journalEntries = [];

      // Load from the Internet
      this.server.getLiveCollection('journal-entries').subscribe(journalEntries => {
        this.journalEntries = journalEntries as Array<JournalEntry>;
        // Save to local cache
        Storage.set({
          key: 'journal-entries',
          value: JSON.stringify(this.journalEntries)
        });
      }, async error => {
        // If no net, load from cache
        // TODO: If error === no net
        console.log(error);
        try {
          const ret = await Storage.get({ key: 'journal-entries' });
          if (ret.value) {
            this.journalEntries = JSON.parse(ret.value);
            return resolve(this.journalEntries);
          }
        } catch (err) {
          console.log(err);
          return reject(err);
        }
      });
    });
  }

  addJournalEntry(journalEntry: JournalEntry) {
    return new Promise<JournalEntry>(async (resolve, reject) => {

      this.journalEntries.push(journalEntry);

      // To internet
      this.http.post('http://localhost:4001/journal-entries/create-journal-entry-account', journalEntry)
      .subscribe(async resp => {
        resolve(resp as JournalEntry);
        // Save object to local cache
        try {
          await Storage.set({
            key: 'journal-entries',
            value: JSON.stringify(this.journalEntries)
          });
        } catch (err) {
          reject(new Error('Error while adding project in local storage.'));
          return;
        }
      }, async error => {
        // TODO: if error === not connected
        // Save object to local cache
        console.log(error);
        try {
          await Storage.set({
            key: 'journal-entries',
            value: JSON.stringify(this.journalEntries)
          });
        } catch (err) {
          reject(new Error('Error while adding project in local storage.'));
          return;
        }
      });
    });
  }

  getJournalEntry(journalEntryId: string) {
    return this.journalEntries.find(journalEntry => journalEntry.id === journalEntryId);
  }

  getUser(userEmail: string) {
    return this.users.find(user => user.email === userEmail);
  }

}
