class Account {
    currentBalance: number;
    constructor(currentBalance: number) {
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

export class EntryType {
    value: string;
    visible: boolean;
    constructor(value: string, visible = true) {
        this.value = value;
        this.visible = visible;
    }
}