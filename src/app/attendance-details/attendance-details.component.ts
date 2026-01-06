import { Component } from '@angular/core';
import { ColumnMapping } from '../models/columnToDataMapping';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from "../shared/components/table/table.component";
import { BASIC_ATTENDANCE } from '../mock-data';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance-details',
  standalone: true,
  imports: [TableComponent, MatCardModule],
  templateUrl: './attendance-details.component.html',
  styleUrl: './attendance-details.component.scss'
})
export class AttendanceDetailsComponent {

  constructor(
    private readonly snackBar:MatSnackBar
  ){}

  dataSource = new MatTableDataSource<any>(BASIC_ATTENDANCE);

  columnsDataMapping:ColumnMapping = {
    ID:'id',
    'Time-In':'clock_in',
    'Time-Out':'clock_out',
    Today:'today_in'
  }

  columnsToDisplay = Object.keys(this.columnsDataMapping);

  handleEditEvent(event:any){
    console.log(event);
    this.snackBar.open('edit clicked','close',{duration:3000});
    
  }
  handleDeleteEvent(event:any){
    console.log(event);
    this.snackBar.open('delete clicked','close',{duration:3000});
  }
}
