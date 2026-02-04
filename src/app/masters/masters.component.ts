import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatRipple } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [MatButton, MatIcon, MatFormFieldModule, CommonModule],
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.scss'
})
export class MastersComponent {

  filesUpload: any[] = [];

  fileClicked(event:any){
    const files:FileList = event.target.files;
    Array.from(files).forEach((file) => this.filesUpload.push(file));
  };

  onDragOver(event : Event){
    event.preventDefault();
    event.stopPropagation();
  }
  onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    const files  = event.dataTransfer?.files;
     if (!files) return; 
    this.filesUpload.push(...Array.from(files));
  }
}
