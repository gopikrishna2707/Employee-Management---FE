import { Component, Input } from '@angular/core';
import { StatusInfo } from '../../../constant';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-circle-info',
  standalone: true,
  imports: [NgIf],
  templateUrl: './circle-info.component.html',
  styleUrl: './circle-info.component.scss'
})
export class CircleInfoComponent {

  @Input({required:true}) userInfo:string = '';

  status = StatusInfo;

  printdata(){
    console.log(this.userInfo);
  }
}
