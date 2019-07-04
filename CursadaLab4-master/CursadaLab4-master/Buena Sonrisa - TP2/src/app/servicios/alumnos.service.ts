import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileService } from 'src/app/servicios/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  public listaInscripcionesRef: firebase.firestore.CollectionReference;
  public alumnoUid: any; 
  
  constructor(private firestore: AngularFirestore, private profService: ProfileService) { 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaInscripcionesRef = firebase
          .firestore()
          .collection('/inscripciones');
      }
    });

  }

  crearInscripcion(
    alumnoNombre: string,
    alumnoApellido: string,
    alumnoDni: string,
    materiaNombre: string,
    alumnoUid: any
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaInscripcionesRef.add({
      nombre: alumnoNombre,
      apellido: alumnoApellido,
      dni: alumnoDni,
      materia: materiaNombre,
      uid: alumnoUid
  });
}

TraerInscripciones() {
  console.log("entro");
  return this.firestore.collection('inscripciones').snapshotChanges();
}

TraerInscripcionesPorUsuario() {
  this.alumnoUid = this.profService.getUserUid();

  return this.firestore.collection('inscripciones', ref => ref.where('uid', '>=', this.alumnoUid)
  .where('uid', '<=', this.alumnoUid + '\uf8ff')).snapshotChanges();
}


}
