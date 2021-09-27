import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BankAccount, CashAccount, EntryType, JournalEntry, Project, NonProfit, Voucher } from './helper-classes';

import { Plugins } from '@capacitor/core';
import { ServerService } from './server.service';

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
  vouchers: Array<Voucher>;

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
  async loadAccounts(): Promise<{
    bankAccounts: Array<BankAccount>,
    cashAccounts: Array<CashAccount>
  }> {
    // Check if already loaded
    if (this.bankAccounts && this.cashAccounts)
      throw new Error('Accounts already loaded.');

    this.bankAccounts = [];
    this.cashAccounts = [];

    // Load from the Internet
    // Resolve both bank and cash
    try {
      const arrayOfAccounts = await Promise.all([
        new Promise((resolve, reject) =>
        // Loading bank
        this.server.getLiveCollection('bank-account').subscribe(bankAccounts => {
          this.bankAccounts.length = bankAccounts.length;
          bankAccounts.forEach((bankAccount, index) => {
            this.bankAccounts[index] = new BankAccount(bankAccount.bankName, bankAccount.accountHolder, bankAccount.currentBalance);
            this.bankAccounts[index].id = bankAccount._id;
          });
          return resolve(this.bankAccounts);
        }, reject)
        ),
        new Promise((resolve, reject) =>
        // Loading cash
        this.server.getLiveCollection('cash-account').subscribe(cashAccounts => {
          this.cashAccounts.length = cashAccounts.length;
          cashAccounts.forEach((cashAccount, index) => {
            this.cashAccounts[index] = new CashAccount(cashAccount.accountHolder, cashAccount.currentBalance, cashAccount.particulars);
            this.cashAccounts[index].id = cashAccount._id;
          });
          return resolve(this.cashAccounts);
        }, reject)
        )
      ]);
      // Store locally
      Storage.set({
        key: 'accounts',
        value: JSON.stringify({
          bankAccounts: arrayOfAccounts[0],
          cashAccounts: arrayOfAccounts[1]
        })
      });
    } catch (error) {
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
        } else throw new Error('Could not find accounts in local storage');
      } catch (error) {
        throw error;
      }
    }

    return this.accounts;
  }

  // Adds account to local object, cache then internet
  // Promise can be rejected at any stage
  async addAccount(account: BankAccount | CashAccount): Promise<any> {
    if (account instanceof BankAccount) {
      // Add to local array
      this.bankAccounts.push(account);
      // To internet
      try {
        await this.server.createDocument('bank-account', account);
      } catch (error) {
        // TODO: If error == no net
      }
    } else if (account instanceof CashAccount) {
      // Add to local array
      this.cashAccounts.push(account);
      // To internet
      try {
        await this.server.createDocument('cash-account', account);
      } catch (error) {
        // TODO: If error == no net
      }
    }

    // To local cache
    try {
      await Storage.set({
        key: 'accounts',
        value: JSON.stringify(this.accounts)
      });
    } catch (error) {
      throw error;
    }
  }

  async updateAccount(account: BankAccount | CashAccount) {
    // If bank accounts
    if (account instanceof BankAccount) {
      // Update online
      try {
        await this.server.updateDocument('bank-account', account.id, account);
      } catch (error) {
        // TODO: If error == no net
      }
    } else if (account instanceof CashAccount) {
      // Update online
      try {
        await this.server.updateDocument('cash-account', account.id, account);
      } catch (error) {
        // TODO: If error == no net
      }
    }

    // Update local cache
    try {
      await Storage.set({
        key: 'accounts',
        value: JSON.stringify(this.accounts)
      });
    } catch (error) {
      throw error;
    }
  }

  // Takes bank account element as input and removes from array
  // Then updates cache then online database
  async deleteAccount(account: BankAccount | CashAccount) {
    if (account instanceof BankAccount) {
      // Remove from local array
      this.bankAccounts.splice(
        this.bankAccounts.indexOf(account), 1
      );
      // From internet
      this.server.deleteDocument('bank-account', account.id);
    } else if (account instanceof CashAccount) {
      // Remove from local array
      this.cashAccounts.splice(
        this.cashAccounts.indexOf(account), 1
      );
      // From internet
      this.server.deleteDocument('cash-account', account.id);
    }
    // Update cache
    try {
      await Storage.set({
        key: 'accounts',
        value: JSON.stringify(this.accounts)
      });
    } catch (error) {
      throw error;
    }
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

  // COST CENTER
  async loadCostCenter(): Promise<{
    projects: Array<Project>,
    nonProfits: Array<NonProfit>
  }> {

    // Check if already loaded
    if (this.projects && this.nonProfits)
      throw new Error('Accounts already loaded.');

    this.projects = [];
    this.nonProfits = [];

    // Load from the Internet
    // Resolve both projects and non-profit
    try {
      const arrayOfCostCenter = Promise.all([
        new Promise((resolve, reject) =>
          // Loading project
          this.server.getLiveCollection('project').subscribe(projects => {
            this.projects.length = projects.length;
            projects.forEach((project, index) => {
              this.projects[index] = new Project(project.name, project.clientAccountId,
              project.accountReceivable, project.date, project.status);
              this.projects[index].id = project._id;
              this.projects[index].expenses = project.expenses;
              this.projects[index].unearnedRevenue = project.unearnedRevenue;
              this.projects[index].revenue = project.revenue;
            });
            return resolve(this.projects);
          }, reject)
        ),
        new Promise((resolve, reject) =>
          // Loading non-profit
          this.server.getLiveCollection('non-profit').subscribe(nonProfits => {
            this.nonProfits.length = nonProfits.length;
            nonProfits.forEach((nonProfit, index) => {
              this.nonProfits[index] = new NonProfit(nonProfit.name, nonProfit.particulars);
              this.nonProfits[index].id = nonProfit._id;
              this.nonProfits[index].expenses = nonProfit.expenses;
            });
            return resolve(this.nonProfits);
          }, reject)
        )
      ]);
      // Store locally
      Storage.set({
        key: 'cost-center',
        value: JSON.stringify({
          projects: arrayOfCostCenter[0],
          nonProfits: arrayOfCostCenter[1]
        })
      });
    } catch (error) {
      // TODO: If rej === no net
      // If no net, load from cache
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
        } else throw new Error('Could not find cost center in local storage');
      } catch (error) {
        throw error;
      }
    }

    return this.costCenter;

  }

  async addCostCenter(costCenter: Project | NonProfit) {
    if (costCenter instanceof Project) {
      // Add to local array
      this.projects.push(costCenter);
      // To internet
      try {
        await this.server.createDocument('project', costCenter);
      } catch (error) {
        // TODO: If error == no net
      }
    } else if (costCenter instanceof NonProfit) {
      // Add to local array
      this.nonProfits.push(costCenter);
      // To internet
      try {
        await this.server.createDocument('non-profit', costCenter);
      } catch (error) {
        // TODO: If error == no net
      }
    }

    // To local cache
    try {
      await Storage.set({
        key: 'cost-center',
        value: JSON.stringify(this.costCenter)
      });
    } catch (error) {
      throw error;
    }

  }

  async updateCostCenter(costCenter: Project | NonProfit) {

    // If bank accounts
    if (costCenter instanceof Project) {
      // Update online
      try {
        await this.server.updateDocument('project', costCenter.id, costCenter);
      } catch (error) {
        // TODO: If error == no net
      }
    } else if (costCenter instanceof CashAccount) {
      // Update online
      try {
        await this.server.updateDocument('non-profit', costCenter.id, costCenter);
      } catch (error) {
        // TODO: If error == no net
      }
    }

    // Update local cache
    try {
      await Storage.set({
        key: 'cost-center',
        value: JSON.stringify(this.costCenter)
      });
    } catch (error) {
      throw error;
    }

  }

  // Takes Cost Center element as input and removes from array
  // Then updates cache then online database
  async deleteCostCenter(costCenter: Project | NonProfit) {

    if (costCenter instanceof Project) {
      // Remove from local array
      this.projects.splice(
        this.projects.indexOf(costCenter), 1
      );
      // From internet
      this.server.deleteDocument('project', costCenter.id);
    } else if (costCenter instanceof NonProfit) {
      // Remove from local array
      this.nonProfits.splice(
        this.nonProfits.indexOf(costCenter), 1
      );
      // From internet
      this.server.deleteDocument('non-profit', costCenter.id);
    }
    // Update cache
    try {
      await Storage.set({
        key: 'cost-center',
        value: JSON.stringify(this.costCenter)
      });
    } catch (error) {
      throw error;
    }

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
  async loadJournalEntries() {

    // Check if already loaded
    if (this.journalEntries)
      throw new Error('Journal entries have already loaded.');

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
    this.server.getLiveCollection('journal-entry').subscribe(journalEntries => {
      this.journalEntries = journalEntries as Array<JournalEntry>;
      // Save to local cache
      Storage.set({
        key: 'journal-entry',
        value: JSON.stringify(this.journalEntries)
      });
    }, async error => {
      // If no net, load from cache
      // TODO: If error === no net
      console.log(error);
      try {
        const ret = await Storage.get({ key: 'journal-entry' });
        if (ret.value) {
          this.journalEntries = JSON.parse(ret.value);
        } else throw new Error('Could not find journal entries in local storage');
      } catch (error) {
        throw error;
      }
    });
  }

  async addJournalEntry(journalEntry: JournalEntry) {

    this.journalEntries.push(journalEntry);

    // To internet
    try {
      await this.server.createDocument('journal-entry', journalEntry);
    } catch (error) {
      // TODO: If error == no net
    }

    // To local cache
    try {
      await Storage.set({
        key: 'journal-entry',
        value: JSON.stringify(this.journalEntries)
      });
    } catch (error) {
      throw error;
    }

    return journalEntry;
  }

  getJournalEntryById(journalEntryId: string) {
    return this.journalEntries.find(journalEntry => journalEntry.id === journalEntryId);
  }

  async loadVouchers() {
    this.vouchers = [];

    // Load from the Internet
    this.server.getLiveCollection('voucher').subscribe(vouchers => {
      this.vouchers = vouchers as Array<Voucher>;
      // Save to local cache
      Storage.set({
        key: 'voucher',
        value: JSON.stringify(this.vouchers)
      });
    }, async error => {
      // If no net, load from cache
      // TODO: If error === no net
      console.log(error);
      try {
        const ret = await Storage.get({ key: 'voucher' });
        if (ret.value) {
          this.vouchers = JSON.parse(ret.value);
        } else throw new Error('Could not find vouchers in local storage');
      } catch (error) {
        throw error;
      }
    });
  }

  async addVoucher(voucher: Voucher) {

    this.vouchers.push(voucher);

    // To internet
    try {
      await this.server.createDocument('voucher', voucher);
    } catch (error) {
      // TODO: If error == no net
    }

    // To local cache
    try {
      await Storage.set({
        key: 'voucher',
        value: JSON.stringify(this.vouchers)
      });
    } catch (error) {
      throw error;
    }

    return voucher;
  }

}
