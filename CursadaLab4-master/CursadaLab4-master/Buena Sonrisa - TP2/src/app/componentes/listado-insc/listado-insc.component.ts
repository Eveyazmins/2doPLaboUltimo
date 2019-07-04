import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/servicios/alumnos.service';

@Component({
  selector: 'app-listado-insc',
  templateUrl: './listado-insc.component.html',
  styleUrls: ['./listado-insc.component.scss']
})
export class ListadoInscComponent implements OnInit {

  inscripciones: any;

  constructor(private alumnosService: AlumnosService) { 
    this.alumnosService.TraerInscripcionesPorUsuario().subscribe(data => {
      this.inscripciones = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Materia: e.payload.doc.data()['materia']
          };
      })
      console.log(this.inscripciones);
    });
  }

  ngOnInit() {
  }

}
