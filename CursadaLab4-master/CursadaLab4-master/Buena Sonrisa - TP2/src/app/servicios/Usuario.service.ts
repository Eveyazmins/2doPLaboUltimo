import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioInterface, Perfil } from '../clases/Usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationsService } from 'angular2-notifications';
import * as firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
 
    usuario: UsuarioInterface;
    private redirectUrl: string = '/';
    private loginUrl: string = '/logearse';
    public listaUsuariosRef: firebase.firestore.CollectionReference;


    constructor(private  afsAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private ns: NotificationsService) {
        
        this.UsuarioVacio();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.listaUsuariosRef = firebase
                .firestore()
                .collection('/Usuarios');
            }
          });
    }

    /*Invoco directamente al servicio Auth de firebase para crear el usuario con mail y pass.
    Luego con el metodo local "estaLogueado() obtengo los datos ingresados para el alta del usuario (pipe)".
    Una vez obtenidos los datos, se hace el post en la db.  
    */

    RegistrarUsuario(email: string, password: string, nombre: string, fotoUrl: string) {
        return new Promise(() => {
            this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(
                    (userData) => {
                        return userData.user.updateProfile({
                            displayName: nombre,
                            photoURL: fotoUrl
                        });
                    },
                    (err) => {
                        console.log(err);
                        this.UsuarioVacio();
                        this.ns.error("Error al registrarse", "Sucedió un error al registrarse, intente nuevamente.");
                    }
                )
                .then(
                    () => {
                        this.EstaLogeado().subscribe(
                            (userData) => {
                                if (userData) {
                                    this.usuario.Uid = userData.uid;
                                    this.usuario.Email = userData.email;
                                    this.usuario.ImagenUrl = userData.photoURL;
                                    this.usuario.Nombre = userData.displayName;
                                    this.usuario.Activo = false;
                                    this.db.collection('usuarios').doc(userData.uid).set(this.usuario);
                                    this.ns.success("Registro exitoso!");
                                    console.log(this.usuario.Perfil);
                                    this.router.navigate(['inicio']);
                                }
                                else {
                           //         this.UsuarioVacio();
                                    console.log("entro!");
                                }
                            },
                            (err) => {
                                console.log(err);
                                this.UsuarioVacio();
                                console.log("entro!");
                                this.ns.error("Error inesperado", "Sucedió un error inesperado.");
                            });
                    });
        });
    }

    LogearUsuario(email: string, password: string) {

        return new Promise(() => {
            this.afsAuth.auth.signInWithEmailAndPassword(email, password)
                .then(
                    (userData) => {
                        if (userData) {
                            this.usuario.Uid = userData.user.uid;
                            //console.log(this.usuario.Uid);
                            this.usuario.Email = userData.user.email;
                            this.usuario.ImagenUrl = userData.user.photoURL;
                            this.usuario.Nombre = userData.user.displayName;    
                           
                            this.ns.success("Logueo exitoso!");    
                            //console.log(this.usuario.Perfil);
                            this.router.navigate(['inicio']);
                        }
                        else {
                            this.UsuarioVacio();
                        }
                    },
                    (err) => {
                        console.log(err);
                        this.UsuarioVacio();
                        this.ns.error("Error al logearse", "Sucedió un error al logearse, intente.");
                    });
        });
    }

    DeslogearUsuario() {
        this.afsAuth.auth.signOut();
        this.UsuarioVacio();
        this.router.navigate(['logearse']);
    }

    EstaLogeado() {
        return this.afsAuth.authState.pipe(map(auth => auth));
    }

    UsuarioVacio() {
        this.usuario = {
            Uid: '',
            Nombre: '',
            Email: '',
            Password: '',
            ImagenUrl: "",
            Activo: false,
            Perfil: "",
        }
    }

    isUserLoggedIn(): boolean {
        return this.afsAuth.auth.currentUser != null;
    }
    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }
    getLoginUrl(): string {
        return this.loginUrl;
    }


    TraerUsuarios() {
        console.log("entro");
        return this.db.collection('usuarios').snapshotChanges();
      }

    
      TraerProfesores() {
        return this.db.collection('usuarios', ref => ref.where('Perfil', '>=', 'Profesor')
        .where('Perfil', '<=', 'Profesor' + '\uf8ff'))
        .snapshotChanges();
      }

   
}
