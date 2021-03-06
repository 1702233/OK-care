import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../shared/models/user.model';
import { Competentie } from 'src/app/shared/models/competentie.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;
  usersDisabled: Observable<User[]>;
  competentieDoc: AngularFirestoreDocument<User>;

  constructor(public afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('Users', ref => ref);
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    this.usersDisabled = this.afs.collection('Users', ref => ref.where('status', '==', 'disabled')).valueChanges();
  }

  getUser(email: string) {
    return this.afs.collection('Users').doc(email).valueChanges();
  }

  getUsers() {
    return this.users;
  }

  getUsersDisabled() {
    return this.usersDisabled;
  }

  userActiveren(email: string) {
    this.userDoc = this.afs.doc(`Users/${email}`);
    this.userDoc.update({
      status: 'activated'
    });
  }

  userAfkeuren(email: string) {
    this.userDoc = this.afs.doc(`Users/${email}`);
    this.userDoc.update({
      status: 'dissaproved'
    });
  }

  addCompetentie(email: string, com: Array<Competentie>) {
    this.userDoc = this.afs.collection('Users').doc(email);
    this.userDoc.update({
      competentie: com
    });
  }

  updateCompetentie(user: User, index: string) {
    this.competentieDoc = this.afs.doc(`Users/${user.email}`);
    this.competentieDoc.update({

    });
  }

}
