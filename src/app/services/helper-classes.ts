// Every class will inherit from MongoDB
// For default properties like id
class MongoDB {
    private _id: string;

    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
}

class Account extends MongoDB {
    currentBalance: number;
    constructor(currentBalance: number) {
        super();
        this.currentBalance = currentBalance;
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

export class EntryType extends MongoDB {
    value: string;
    visible: boolean;
    constructor(value: string, visible = true) {
        super();
        this.value = value;
        this.visible = visible;
    }
}

export class JournalEntry extends MongoDB {
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
        super();
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

export class Project extends MongoDB {
    name: string;
    client: string;
    accountReceivable: number;
    unearnedRevenue: number;
    revenue: number;
    creditedAmount: number;
    debitedAmount: number;
    date: Date;
    status: string;

    constructor(
        name: string, client: string, accountReceivable: number,
        unearnedRevenue: number, revenue: number, creditedAmount: number,
        debitedAmount: number, date: Date, status: string
    ) {
        super();
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
