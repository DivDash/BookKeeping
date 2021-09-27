import { Component, OnInit, Input } from '@angular/core';
import { NonProfit } from 'src/app/services/helper-classes';
import { PopoverController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'nonProfit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  // Coming from non profit page
  @Input() nonProfit: NonProfit;
  // For local form usage
  localNonProfit: NonProfit;


  constructor(
    private db: DatabaseService,
    private poc: PopoverController,
    private as: AlertService,
  ) {
    // setTimeout(() => (console.log(this.nonProfit)), 5000);
  }

  ngOnInit() {
    // Creating a deep copy for local use
    this.localNonProfit = JSON.parse(JSON.stringify(this.nonProfit));
  }

  updateNonProfit() {
    this.nonProfit.name = this.localNonProfit.name;
    this.nonProfit.particulars = this.localNonProfit.particulars;
    this.db.updateCostCenter(this.nonProfit).then(console.log);
    this.poc.dismiss();
  }

  deleteNonProfit() {
    this.as.confirmation(
      'Are you sure you want to delete this Non-Profit?',
      // Confirmation handler
      () => {
        this.db.deleteCostCenter(this.nonProfit);
        this.poc.dismiss();
      }
    );
  }

  editFormChanged() {
    return this.localNonProfit.name !== this.nonProfit.name
        || this.localNonProfit.particulars !== this.nonProfit.particulars;
  }

}
