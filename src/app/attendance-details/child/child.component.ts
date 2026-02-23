import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit, OnChanges, DoCheck {
 @Input() tableData:any[] = [];

 ngOnChanges(): void {
    console.log('ngOnChanges triggered');
  }

  ngDoCheck(): void {
    console.log('Child ngDoCheck running');
  }

  ngOnInit(): void {
    console.log('called ngoninit');
  }
  

}
