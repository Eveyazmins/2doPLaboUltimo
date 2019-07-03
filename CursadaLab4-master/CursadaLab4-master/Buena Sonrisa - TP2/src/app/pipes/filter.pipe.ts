import { Pipe, PipeTransform } from '@angular/core';
import { ListadoUsuariosComponent } from '../componentes/listado-usuarios/listado-usuarios.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], fil: any): any {
   // console.log("select" + fil);
    return values.filter((item) => item.Perfil == fil);
   return null;
  }

}
