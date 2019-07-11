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
  client: string;
  accountReceivable: number;

  constructor(
    private db: DatabaseService
  ) {}

  ngOnInit() {
  }

  addProject() {
    this.db.addProject(
      new Project(this.name, this.client, this.accountReceivable,
        this.accountReceivable, 0, 0, 0, new Date(), 'Under Construction')
    );
  }

  get projects() {
    return this.db.projects;
  }

}
