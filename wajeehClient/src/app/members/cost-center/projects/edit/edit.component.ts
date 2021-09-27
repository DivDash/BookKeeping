import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/services/helper-classes';
import { PopoverController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'project-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  // Coming from project page
  @Input() project: Project;
  // For local form usage
  localProject: Project;

  constructor(
    private db: DatabaseService,
    private poc: PopoverController,
    private as: AlertService
  ) { }

  ngOnInit() {
    // Creating a deep copy for local use
    this.localProject = JSON.parse(JSON.stringify(this.project));
  }

  updateProject() {
    this.project.name = this.localProject.name;
    this.project.unearnedRevenue = this.localProject.unearnedRevenue;
    this.db.updateCostCenter(this.project).then(console.log);
    this.poc.dismiss();
  }

  deleteProject() {
    this.as.confirmation(
      'Are you sure you want to delete this Project?',
      // Confirmation handler
      () => {
        this.db.deleteCostCenter(this.project);
        this.poc.dismiss();
      }
    );
  }

  editFormChanged() {
    return this.localProject.name !== this.project.name
        || this.localProject.unearnedRevenue !== this.project.unearnedRevenue;
  }

}
