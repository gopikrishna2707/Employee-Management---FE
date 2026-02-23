import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule  } from '@angular/material/table';


@Component({
  selector: 'app-normal-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule

],
  templateUrl: './normal-table.component.html',
  styleUrl: './normal-table.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NormalTableComponent implements OnInit, DoCheck {

  dataSource = new MatTableDataSource<any>([]);

  @Input() Tabledata: any[] = [];
  @Input() columnsToDiaplay:any[] = [];

  columnsToDisplayWithAction(){
    
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.Tabledata);
  }

  ngDoCheck(): void {
    console.log('child');
  }
  getData(){
    const rows = this.Tabledata;
    this.dataSource.data = rows;
  }

  changeD(){
    console.log('child called');
  }
}
