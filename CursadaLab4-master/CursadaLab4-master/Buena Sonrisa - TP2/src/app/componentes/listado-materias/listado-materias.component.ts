import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.scss']
})
export class ListadoMateriasComponent implements OnInit {

  constructor( private matService: MateriasService, public router: Router) { }

  ngOnInit() {
  }

}
