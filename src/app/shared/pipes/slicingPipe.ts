import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'slicingpipe', standalone:true, pure:false})
export class SlicingPipe implements PipeTransform{
    transFormedValue = ''
    transform(value:string) {
        if(value !== '' || null){
            this.transFormedValue = value.concat('added');
        }
        return this.transFormedValue;
    }
}