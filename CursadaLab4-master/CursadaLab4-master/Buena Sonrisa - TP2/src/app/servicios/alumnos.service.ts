import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  public listaInscripcionesRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore) { 
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
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaInscripcionesRef.add({
      nombre: alumnoNombre,
      apellido: alumnoApellido,
      dni: alumnoDni,
      materia: materiaNombre,
  });
}

TraerInscripciones() {
  console.log("entro");
  return this.firestore.collection('inscripciones').snapshotChanges();
}

TraerInscripcionesPorUsuario() {
  console.log("entro");
  return this.firestore.collection('inscripciones').snapshotChanges();
}

}
