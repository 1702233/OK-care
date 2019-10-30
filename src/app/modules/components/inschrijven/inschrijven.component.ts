import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Operatie } from 'src/app/shared/models/operatie.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { OperatieService } from '../../../core/services/operatieservice.service'
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Inschrijving } from 'src/app/shared/models/inschrijving.model';

@Component({
  selector: 'app-inschrijven',
  templateUrl: './inschrijven.component.html',
  styleUrls: ['./inschrijven.component.css']
})
export class InschrijvenComponent implements OnInit {

  list: Operatie[];
  user: firebase.User;
  ingeschrevenindex: number[] = [];

  constructor(private auth: AuthService,
    private router: Router,
    private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    //authenticatie
    this.auth.getUserState().subscribe(user => {
      this.user = user;
    });


    this.loadOperaties();
  }

  loadOperaties() {
    // alle operaties ophalen.
    this.service.getOperaties().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Operatie;
      })
      // for loop om alle inschrijvingen in operaties te stoppen in this.list
      for (let i in this.list) {
        let inschrijvingen;
        try {
          this.service.getIngeschreven(this.list[i].id).subscribe(actionArray => {
            inschrijvingen = actionArray.map(item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data()
              }
            })
            this.list[i].inschrijving = inschrijvingen;
            // filteren zodat als je al ingeschreven staat voor een operatie die uit this.list word gehaald
            for (let j in this.list[i].inschrijving) {
              try {
                if (this.list[i].inschrijving[j].id == this.user.email) {
                  let index;
                  index = this.list.indexOf(this.list[i], 0);
                  this.ingeschrevenindex.push(index);
                  
                  delete this.list[index];

                }
              } catch (error) {
                console.log(error)
              }
            }


          });
        } catch (error) {
          console.log(error)
        }
      }

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

  //log optie om de inschrijvingen te zien van 1 operatie.
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
    });
  }
}
