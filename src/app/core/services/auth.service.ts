import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Registration } from '../../shared/models/registration.model';
import { Competentie } from 'src/app/shared/models/competentie.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  newUser: any;
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  registration: Observable<Registration>;

  constructor(public  afAuth: AngularFireAuth, private db: AngularFirestore, public  router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });

  }


  // user data opslaan in de firebase
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${this.newUser.email}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'zorgprofessional',
      stad: this.newUser.stad,
      postcode: this.newUser.postcode,
      status: 'disabled',
      competentie: [],
      straat: this.newUser.straat,
      huisnummer: this.newUser.huisnummer,
    });
  }

  // User aanmaken in firebase met email en wachtwoord
  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then( userCredential => {
      this.newUser = user;
      userCredential.user.updateProfile({
        displayName: user.firstName + ' ' + user.lastName
      });

      this.insertUserData(userCredential).then(() => {
        this.logout();
        this.router.navigate(['/login']);
      });
    }).catch( error => {
      this.eventAuthError.next(error);
    });


  }

  // user inloggen als deze in de firebase staat
  login(email: string, password: string){

    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      console.log(error);
      this.eventAuthError.next(error);
    }).then(userCredential => {
      if (userCredential) {
        this.router.navigate(['/home']);
      }
    });
  }

  // user uitloggen
  logout() {
    return this.afAuth.auth.signOut();
  }

  // user state ophalen
  getUserState() {
    return this.afAuth.authState;
  }

  // kijken of de user geactiveerd is
  checkUserEnabled(email: string, password: string){

    // Als gebruikers status op "activated" staat dan login anders terug sturen naar homepagina.
    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {

      // check undefined for users that prob. dont have account
      if(val == undefined){
        var error = JSON.parse('{"message": "Je hebt nog geen account"}');
        this.eventAuthError.next(error);
      }

      // if status is activated user has access
      if(val['status'] == 'activated'){
        this.login(email, password);
      }
      // disabled users can't login yet, have to be validated
      else if(val['status'] == 'disabled'){
        var error = JSON.parse('{"message": "Je account is door de beheerder nog niet geactiveerd"}');
        this.eventAuthError.next(error);
      }
      else{
        // declined users can't ever login
        var error = JSON.parse('{"message": "Je account is door de beheerder afgewezen."}');
        this.eventAuthError.next(error);
      }
    });
  }

  // check of de user is ingelogd
  isLoggedIn(): boolean{
    return this.afAuth.authState !== null;
  }

  // kijken naar de rol van de user voor zorgprofessional
  accessOnlyUser(email){
    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {
      if(val['role'] != 'zorgprofessional'){
        this.router.navigate(['home'])
      }
    });
  }

  // kijken naar de rol van de user voor beheerder
  accessOnlyAdmin(email){
    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {
      if(val['role'] != 'beheerder'){
        this.router.navigate(['home'])
      }
    });
  }

  // kijken naar de rol van de user
  checkUserRole(email) {
    this.registration = this.db.collection("Users").doc(email).valueChanges();
    return this.registration;
  }

}
