import { Component, OnInit } from '@angular/core';
import { Operatie } from 'src/app/shared/models/operatie.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { OperatieService } from '../../../core/services/operatieservice.service'
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inschrijven',
  templateUrl: './inschrijven.component.html',
  styleUrls: ['./inschrijven.component.css']
})
export class InschrijvenComponent implements OnInit {

  list: Operatie[];
  user: firebase.User;

  constructor(private auth: AuthService, 
    private router: Router,
    private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getOperaties().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Operatie;
      })
      for (let i in this.list) {
        let inschrijving;

        this.service.getIngeschreven(this.list[i].id).subscribe(actionArray => {
          inschrijving = actionArray.map(item => {
            return {
              id: item.payload.doc.id,  
              ...item.payload.doc.data()
            }
          })
          this.list[i].inschrijving = inschrijving;
          console.log(this.list[i])
        });
      }
    });

    //authenticatie
    this.auth.getUserState().subscribe( user => {
      this.user = user;
    });
  }

  onInschrijven(id: string) {
    if (confirm('Weet je zeker dat je je voor deze operatie wilt inschrijven?')) {
      this.firestore.collection('operaties').doc(id).collection('ingeschreven').doc(this.user.email).set({
        displayName: this.user.displayName,
        status: 'ingeschreven'
      });
      this.toastr.success('Success', 'Operatie Inschrijven');
      // this.firestore.collection('operaties').doc(id).update({ toevoegen : 'ok' });
    }

  }

  log(op: Operatie) {
    let inschrijvingen;
    this.service.getIngeschreven(op.id).subscribe(actionArray => {
      inschrijvingen = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      })
      console.log(op)
      console.log(inschrijvingen);
    });
  }
}
