import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Error404Component } from './componentes/error404/error404.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { AuthGuardService } from './servicios/AuthGuard.service';
import { AltaMateriaComponent } from './componentes/alta-materia/alta-materia.component';
import { ListadoMateriasComponent } from './componentes/listado-materias/listado-materias.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [ AuthGuardService ] },
  { path: 'logearse', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'chat', component: ChatComponent, canActivate: [ AuthGuardService ] },
  { path: '404', component: Error404Component }, 
  //{ path: '**', redirectTo: '404' },
  { path: 'alta-materia', component: AltaMateriaComponent, canActivate: [ AuthGuardService ]},
  { path: 'listado-materia', component: ListadoMateriasComponent, canActivate: [ AuthGuardService ]},
  { path: 'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [ AuthGuardService ]}

  // {
  //   path: '',
  //   component: PrincipalComponent,
  //   children:
  //     [
  //       { path: 'inicio', component: InicioComponent },
  //       { path: 'logearse', component: LoginComponent },
  //       { path: 'registrarse', component: LoginComponent }
  //     ]
  // }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
