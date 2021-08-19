import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css'],
})
export class ReusableTableComponent implements OnInit {
  @Input() tableData;
  @Input() columnHeader;
  objectKeys = Object.keys;
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @Input() GridData: any;
  // @Input() ColData: any;

  // @Input() tableTemplate: TemplateRef<any>;

  // matDataSource = new MatTableDataSource<any>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor() {}
  // ngAfterViewInit() {
  //   this.matDataSource.paginator = this.paginator;
  //   this.matDataSource.sort = this.sort;
  //   this.matDataSource.data = this.GridData;
  // }

  ngOnInit() {
    console.log(this.tableData);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
