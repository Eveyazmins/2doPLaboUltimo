import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.scss']
})
export class ListadoMateriasComponent implements OnInit {

  materias: any;

  constructor( private matService: MateriasService, public router: Router) { }

  ngOnInit() {

    this.matService.TraerMaterias().subscribe(data => {
      
                  this.materias = data.map(e => {
                    return {
                      id: e.payload.doc.id,
                      isEdit: false,
                      cuatrimestre: e.payload.doc.data()['cuatrimestre'],
                      nombre: e.payload.doc.data()['nombre'],
                      cupos: e.payload.doc.data()['cupos'],
                      profesor: e.payload.doc.data()['profesor'],
                      };
                  })
                  console.log(this.materias);
                });
  }

}
