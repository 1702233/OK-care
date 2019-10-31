import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Operatie } from 'src/app/shared/models/operatie.model';
import { Inschrijving } from 'src/app/shared/models/ingeschreven.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  operatiesCollection: AngularFirestoreCollection<Operatie>;
  operaties: Observable<Operatie[]>;
  operatieDoc: AngularFirestoreDocument<Operatie>;
  inschrijvingCollection: AngularFirestoreCollection<Inschrijving>;
  inschrijvingDoc: AngularFirestoreDocument<Inschrijving>;
  inschrijvingen: Observable<Inschrijving[]>;

  // operaties ophalen en met id opslaan
  constructor(public afs: AngularFirestore) {
    this.operatiesCollection = afs.collection<Operatie>('operaties', ref => ref);
    this.operaties = this.operatiesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Operatie;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
   }

   // alle operaties returnen
   getOperaties() {
     return this.operaties;
   }

   // operatie met bepaald id ophalen
   getOperatieByID(id: string) {
     return this.afs.collection('opearties').doc(id).valueChanges();
   }

   // inschrijvingen die bij operatie horen ophalen
   getInschrijving(operatie: Operatie) {
    this.inschrijvingCollection = this.afs.collection<Inschrijving>(`operaties/${operatie.id}/ingeschreven`, ref => ref);
    this.inschrijvingen = this.inschrijvingCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Inschrijving;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return this.inschrijvingen;
  }
}
