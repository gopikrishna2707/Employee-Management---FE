import { Component, Input, OnInit } from '@angular/core';
import { ColumnMapping } from '../../models/columnToDataMapping';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-overview',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './employee-overview.component.html',
  styleUrl: './employee-overview.component.scss'
})
export class EmployeeOverviewComponent implements OnInit {

  ngOnInit(){
    this.fetchData();
    console.log(this.data);
  }

  dataSource = new MatTableDataSource<any>([]);

  columnsToDataMapping:ColumnMapping = {
    'Project-Details':'projectDetails',
    Grade:'employeeGrade'
  }

  @Input({required:true}) data:any[] = [];

  columnsToDisplay = Object.keys(this.columnsToDataMapping);

  fetchData(){
    this.dataSource.data = this.data;
  }
}
