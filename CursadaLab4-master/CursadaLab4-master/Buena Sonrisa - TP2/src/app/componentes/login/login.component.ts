import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { NotificationsService } from 'angular2-notifications';
import { Perfil } from 'src/app/clases/Usuario';
import { ProfileService } from 'src/app/servicios/profile.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailModel: string;
  passwordModel: string;

  public perfil:string;
  public userProfile: any;

  constructor(private usuarioService: UsuarioService, private router: Router, private ns: NotificationsService) {
    this.emailModel = "";
    this.passwordModel = "";
  }

  ngOnInit() { 
  }

  Logearse() {

    this.usuarioService.LogearUsuario(this.emailModel, this.passwordModel);

  }

 
}
