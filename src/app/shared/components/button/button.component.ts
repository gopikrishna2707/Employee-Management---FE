import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, EventEmitter, input, Input, model, OnInit, output, Output, Signal, signal, WritableSignal } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Observable, of } from 'rxjs';
import { toSignal} from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButton, MatProgressSpinnerModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  ngOnInit(): void {
    this.print();
  }

  buttonName = input<string>();

  @Input() type:string = '';

  @Input() color:string = '';

  @Input({required:true}) disabled:boolean = false;

  @Input({required:true}) isLoading:boolean = false;

  saveClick = output<boolean>();

  onSaveClick(){
    this.saveClick.emit(true);
  }

  normalSignal:WritableSignal<{name: string; age: number; salary: number}> = signal({
    name:'gopi',
    age:21,
    salary:40000
  });

  value = computed( () => this.normalSignal().name + 'krishna');

  logEffect = effect(() => {
      console.log(this.normalSignal().name + 'value changed');
    })

  print(){
    console.log(this.normalSignal.set({name:'modified by set',age:22, salary:25000}));
    console.log(this.normalSignal.update(e => ({...e, name:'modified by update',age:23, salary:20000 })));
    console.log(this.normalSignal());
    console.log(this.value());
  }

  data$ = of(1,2,3);

  data = toSignal(this.data$, {initialValue:0});

  
}
