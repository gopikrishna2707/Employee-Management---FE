import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButton],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input({required:true}) buttonName:string = '';

  @Input() type:string = '';

  @Input() color:string = '';

  @Input({required:true}) disabled:boolean = false;

  @Output() saveClick = new EventEmitter<any>();

  onSaveClick(element:any){
    this.saveClick.emit(element);
    console.log(element);
  }
}
