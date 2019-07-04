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
export class MateriasService {

  public listaMateriasRef: firebase.firestore.CollectionReference;
  public profNombre: string; 
  public userProfile: any;

  constructor(private firestore: AngularFirestore, private profService: ProfileService) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaMateriasRef = firebase
          .firestore()
          .collection('/materias');
      }
    });
  }

  crearMateria(
    materiaNombre: string,
    materiaCuatrimestre: string,
    materiaCupos: number,
    materiaProfesor: string,
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaMateriasRef.add({
      nombre: materiaNombre,
      cuatrimestre: materiaCuatrimestre,
      cupos: materiaCupos,
      profesor: materiaProfesor
  });
}


TraerMaterias() {
  console.log("entro");
  return this.firestore.collection('materias').snapshotChanges();
}


TraerMateriasPorProfe() {

  this.profService
  .getUserProfile()
  .get()
  .then( userProfileSnapshot => {
    this.userProfile = userProfileSnapshot.data();
    console.log(this.userProfile);
    this.profNombre= userProfileSnapshot.data().Nombre;
    console.log("nombreRecu" + this.profNombre);
  });

  return this.firestore.collection('materias', ref => ref.where('profesor', '>=', this.profNombre)
  .where('profesor', '<=', this.profNombre + '\uf8ff')).snapshotChanges();
}


}
