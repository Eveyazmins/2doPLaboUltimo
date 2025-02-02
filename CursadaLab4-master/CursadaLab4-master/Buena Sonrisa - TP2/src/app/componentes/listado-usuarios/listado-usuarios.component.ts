import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { Pipe } from '@angular/core';
import { UsuarioInterface, Perfil } from 'src/app/clases/Usuario';

@Pipe({ name: 'filter' })

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios: any;
  filter: string;

  constructor(private usuarioService: UsuarioService) {

    this.usuarioService.TraerUsuarios().subscribe(data => {
      
      this.usuarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['Email'],
          Nombre: e.payload.doc.data()['Nombre'],
          Perfil: e.payload.doc.data()['Perfil'],
          };
      })
      console.log(this.usuarios);
    });
  }
   

  ngOnInit() {
   // console.log("filtro:" + this.filter);
  }

   

 



}
