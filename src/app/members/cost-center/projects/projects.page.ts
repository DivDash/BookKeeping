import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/services/helper-classes';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  name: string;
  clientAccountId: string;
  accountReceivable: number;

  constructor(
    private db: DatabaseService
  ) {}

  ngOnInit() {
  }

  addProject() {
    this.db.addCostCenter(
      new Project(this.name, this.clientAccountId, this.accountReceivable, new Date(), 'Under Construction')
    );
  }

  getAccountById(accountId: string) {
    return this.db.getAccountById(accountId);
  }

  get projects() {
    return this.db.projects;
  }

  get accounts() {
    return this.db.accounts;
  }

}
