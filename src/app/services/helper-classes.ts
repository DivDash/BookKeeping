// Every class will inherit from MongoDB
// For default properties like id
class MongoDB {
    private _id: string;
    // tslint:disable-next-line: variable-name
    private __v;

    constructor() {
        this._id = this.objectId();
    }

    objectId() {
        return this.hex(Date.now() / 1000) +
            ' '.repeat(16).replace(/./g, () => this.hex(Math.random() * 16));
    }

    hex(value) {
        return Math.floor(value).toString(16);
    }

    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
}

class Account extends MongoDB {
    currentBalance: number;
    accountHolder: string;
    constructor(accountHolder: string, currentBalance: number) {
        super();
        this.accountHolder = accountHolder;
        this.currentBalance = currentBalance;
    }
}
export class BankAccount extends Account {
    bankName: string;
    constructor(bankName: string, accountHolder: string, currentBalance: number) {
        super(accountHolder, currentBalance);
        this.bankName = bankName;
    }
}

export class CashAccount extends Account {
    particulars: string;
    constructor(accountHolder: string, currentBalance: number, particulars: string) {
        super(accountHolder, currentBalance);
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

class CostCenter extends MongoDB {
    name: string;
    expenses: number;
    constructor(name: string, expenses: number) {
        super();
        this.name = name;
        this.expenses = expenses;
    }
}

export class NonProfit extends CostCenter {
    particulars: string;
    constructor(name: string, particulars: string) {
        super(name, 0);
        this.particulars = particulars;
    }
}

export class Project extends CostCenter {
    clientAccountId: string;
    unearnedRevenue: number;
    revenue: number;
    date: Date;
    status: string;

    constructor(
        name: string, clientAccountId: string, accountReceivable: number, date: Date, status: string
    ) {
        super(name, 0);
        this.name = name;
        this.clientAccountId = clientAccountId;
        this.unearnedRevenue = accountReceivable;
        this.revenue = 0;
        this.expenses = 0;
        this.date = date;
        this.status = status;
    }

}

export class JournalEntry extends MongoDB {
    particulars: string;
    costCenterId: string;
    receivingAccountId: string;
    sendingAccountId: string;
    transferredAmount: number;
    typeOfEntry: string;
    date: Date;

    constructor(
        particulars: string, costCenterId: string, receivingAccountId: string,
        sendingAccountId: string, transferredAmount: number,
        typeOfEntry: string, date: Date
    ) {
        super();
        this.particulars = particulars;
        this.costCenterId = costCenterId;
        this.receivingAccountId = receivingAccountId;
        this.sendingAccountId = sendingAccountId;
        this.transferredAmount = transferredAmount;
        this.typeOfEntry = typeOfEntry;
        this.date = date;
    }
}


export class User extends MongoDB {
    email: string;
    username: string;
    passwordOne: string;
    passwordTwo: string;
    date: Date;
    role: string;

    constructor(
        email: string, username: string,
        passwordOne: string, passwordTwo: string,
        date: Date, role: string
    ) {
        super();
        this.email = email;
        this.username = username;
        this.passwordOne = passwordOne;
        this.passwordTwo = passwordTwo;
        this.date = date;
        this.role = role;
    }
}
