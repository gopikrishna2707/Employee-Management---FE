import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'existedvalue',
  standalone: true
})
export class ExistedvaluePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
