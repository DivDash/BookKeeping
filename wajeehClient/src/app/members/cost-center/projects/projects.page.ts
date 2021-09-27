import { Component, OnInit } from '@angular/core';
import { Project, EntryType } from 'src/app/services/helper-classes';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController } from '@ionic/angular';
import { EditComponent } from './edit/edit.component';
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
    private db: DatabaseService,
    private poc: PopoverController
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

  get entryTypes() {
    return this.db.entryTypes;
  }

  async presentPopover(project: Project) {
    const popover = await this.poc.create({
      component: EditComponent,
      componentProps: {
        project
      }
    });
    return await popover.present();
  }

  trackById(item: object, index: number) {
    return item['id'];
  }

}
