import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { AlumnosService } from 'src/app/servicios/alumnos.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insc-materia',
  templateUrl: './insc-materia.component.html',
  styleUrls: ['./insc-materia.component.scss']
})
export class InscMateriaComponent implements OnInit {

  materias: any;
  materiaModel: string;
  nombreAlumnoModel: string;
  apellidoAlumnoModel: string;
  dniAlumnoModel: string;

  constructor(private matService: MateriasService, private ns: NotificationsService, private alumnosService: AlumnosService, public router: Router) {
    this.matService.TraerMaterias().subscribe(data => {
      
      this.materias = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Nombre: e.payload.doc.data()['nombre'],
          Perfil: e.payload.doc.data()['cuatrimestre'],
          Cupos: e.payload.doc.data()['cupos'],
          Profesor: e.payload.doc.data()['profesor'],
          };
      })
      console.log(this.materias);
    });
   }

   inscripcion(
    ): void {
      console.log("entrooo!!!")
      if (
        
        this.nombreAlumnoModel === undefined ||
        this.materiaModel === undefined
      ){
         //alert(codigoPedido);
        //  alert(codigoMesa);
        //  alert(codigoProducto);
        //  alert(cantidad);
        //  alert(tipoPedido);
        //  alert(detalle);
        //  alert(idEmpleado);
        //  alert(preciototalpedido);
        this.ns.error("Error!", "complete todos los campos.");
        return;
      }
      this.alumnosService
        .crearInscripcion(this.nombreAlumnoModel, this.dniAlumnoModel, this.dniAlumnoModel, this.materiaModel)
        .then(() => {
          this.ns.success("Listo!", "Se cargó materia con exito.");
          this.router.navigateByUrl('/inicio')
        });
    }

  ngOnInit() {
  }

}
