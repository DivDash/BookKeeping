class Account {
    currentBalance: number;
    private _id: string;
    constructor(currentBalance: number) {
        this.currentBalance = currentBalance;
    }

    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
}
export class BankAccount extends Account {
    bankName: string;
    accountHolder: string;
    constructor(bankName: string, accountHolder: string, currentBalance: number) {
        super(currentBalance);
        this.bankName = bankName;
        this.accountHolder = accountHolder;
    }
}

export class CashAccount extends Account {
    particulars: string;
    constructor(particulars: string, currentBalance: number) {
        super(currentBalance);
        this.particulars = particulars;
    }
}

export class EntryType {
    value: string;
    visible: boolean;
    constructor(value: string, visible = true) {
        this.value = value;
        this.visible = visible;
    }
}

export class JournalEntry {
    particulars: string;
    project: string;
    receivingAccount: string;
    sendingAccount: string;
    creditedAmount: number;
    debitedAmount: number;
    typeOfEntry: string;
    date: Date;

    constructor(
        particulars: string, project: string, receivingAccount: string,
        sendingAccount: string, creditedAmount: number, debitedAmount: number,
        typeOfEntry: string, date: Date
    ) {
        this.particulars = particulars;
        this.project = project;
        this.receivingAccount = receivingAccount;
        this.sendingAccount = sendingAccount;
        this.creditedAmount = creditedAmount;
        this.debitedAmount = debitedAmount;
        this.typeOfEntry = typeOfEntry;
        this.date = date;
    }
}

export class Project {
    name: string;
    client: string;
    accountReceivable: number;
    unearnedRevenue: string;
    revenue: string;
    creditedAmount: number;
    debitedAmount: number;
    date: Date;
    status: string;

    constructor(
        name: string, client: string, accountReceivable: number,
        unearnedRevenue: string, revenue: string, creditedAmount: number,
        debitedAmount: number, date: Date, status: string
    ) {
        this.name = name;
        this.client = client;
        this.accountReceivable = accountReceivable;
        this.unearnedRevenue = unearnedRevenue;
        this.revenue = revenue;
        this.creditedAmount = creditedAmount;
        this.debitedAmount = debitedAmount;
        this.date = date;
        this.status = status;
    }

}
