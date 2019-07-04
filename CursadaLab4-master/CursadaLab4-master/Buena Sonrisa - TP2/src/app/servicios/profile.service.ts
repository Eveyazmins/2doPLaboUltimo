import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  public userUid: any;
  public userEmail: any;

  constructor() { 

    console.log("entrop");

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/usuarios/${user.uid}`);
        this.userUid = user.uid;
      }
    });
    
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  getUserUid(): firebase.firestore.DocumentReference {
    return this.userUid;
  }



}
