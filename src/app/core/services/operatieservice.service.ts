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
}