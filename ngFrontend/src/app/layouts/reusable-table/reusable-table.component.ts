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
export class ReusableTableComponent implements OnChanges {
  @Input() tableData;
  @Input() columnHeader;
  objectKeys = Object.keys;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    // this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tableData['filteredData'], 'reusableeee');
    this.tableData = this.tableData['filteredData'];
    console.log(this.tableData, 'reusableeee againnn');
    console.log(this.columnHeader, 'reusableeee');
    this.dataSource = new MatTableDataSource(this.tableData);
    console.log(this.dataSource, 'shshshs');
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.data = this.dataSource;
  }
}
