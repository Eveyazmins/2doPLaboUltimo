import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/servicios/profile.service';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { Perfil } from 'src/app/clases/Usuario';
import { AuthGuardService } from 'src/app/servicios/AuthGuard.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public perfil:string;
  public userProfile: any;

  constructor(private profileService: ProfileService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    
    this.profileService
    .getUserProfile().get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
      console.log(this.userProfile);
      this.perfil= userProfileSnapshot.data().Perfil;
      console.log("perfilrecu" + this.perfil);
      this.usuarioService.usuario.Perfil = this.perfil;
      console.log("perfilusr" + this.usuarioService.usuario.Perfil);
    });
    

    //console.log("perfilusr" + this.usuarioService.usuario.Perfil);
  }


}
