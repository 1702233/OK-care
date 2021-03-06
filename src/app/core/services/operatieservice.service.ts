import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Operatie } from '../../shared/models/operatie.model';

@Injectable({
  providedIn: 'root'
})
export class OperatieService {
  formData: Operatie;

  constructor(private firestore: AngularFirestore) { }

  getOperaties() {
    return this.firestore.collection('operaties').snapshotChanges();
  }

  getingeschrevenOperaties(email: string) {
    return this.firestore.collection('operaties', ref => ref.where('competenties/id', '==', email)).snapshotChanges();
  }

  getIngeschreven(id : string) {
    return this.firestore.collection('operaties').doc(id).collection('ingeschreven').snapshotChanges();
  }

  acceptOperatieInschrijving(operatieid : string, zorgprofessionalid : string) {
    // status veranderen.
    this.firestore.collection('operaties').doc(operatieid)
    .collection('ingeschreven').doc(zorgprofessionalid).update({ status: 'goedgekeurd' })
  }

  denyOperatieInschrijving(operatieid : string, zorgprofessionalid : string) {
    // status veranderen.
    this.firestore.collection('operaties').doc(operatieid)
    .collection('ingeschreven').doc(zorgprofessionalid).update({ status: 'afgekeurd' })
  }
}

