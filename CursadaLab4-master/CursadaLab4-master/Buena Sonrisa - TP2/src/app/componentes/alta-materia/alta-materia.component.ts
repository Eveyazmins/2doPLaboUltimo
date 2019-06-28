import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.scss']
})
export class AltaMateriaComponent implements OnInit {

  nombreMateriaModel: string;
  cuatrimestreModel: string;
  cuposModel: number;
  profesorModel:string;

  constructor(private ns: NotificationsService, private matService: MateriasService, public router: Router) { }

  ngOnInit() {
  }

  cargarMateria(
  ): void {
    console.log("entrooo!!!")
    if (
      
      this.nombreMateriaModel === undefined ||
      this.cuatrimestreModel === undefined ||
      this.cuposModel === undefined ||
      this.profesorModel === undefined
    ){
       //alert(codigoPedido);
      //  alert(codigoMesa);
      //  alert(codigoProducto);
      //  alert(cantidad);
      //  alert(tipoPedido);
      //  alert(detalle);
      //  alert(idEmpleado);
      //  alert(preciototalpedido);
      this.ns.error("Error!", "complete campos.");
       
      return;
    }
    this.matService
      .crearMateria(this.nombreMateriaModel, this.cuatrimestreModel, this.cuposModel, this.profesorModel)
      .then(() => {
        this.ns.success("Listo!", "Se cargó materia con exito.");
        this.router.navigateByUrl('/alta-materia')
      });
  }



}
