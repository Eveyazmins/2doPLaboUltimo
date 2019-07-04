import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';

@Component({
  selector: 'app-listado-mat-prof',
  templateUrl: './listado-mat-prof.component.html',
  styleUrls: ['./listado-mat-prof.component.scss']
})
export class ListadoMatProfComponent implements OnInit {

  asignaciones: any;

  constructor(private matService: MateriasService) { 
    this.matService.TraerMateriasPorProfe().subscribe(data => {
      this.asignaciones = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Materia: e.payload.doc.data()['nombre']
          };
      })
      console.log(this.asignaciones);
    });
  }

  ngOnInit() {

  }


}
