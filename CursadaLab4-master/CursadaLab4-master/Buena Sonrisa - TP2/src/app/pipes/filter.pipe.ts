import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], arg: any): any {
    //console.log("args" + arg);
    return values.filter((item) => item.Perfil == 'Profesor');
  }

  
}
