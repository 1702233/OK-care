import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { OperatieService } from '../../../core/services/operatieservice.service';
import { Operatie } from '../../../shared/models/operatie.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inschrijf-acceptance',
  templateUrl: './inschrijf-acceptance.component.html',
  styleUrls: ['./inschrijf-acceptance.component.css']
})
export class InschrijfAcceptanceComponent implements OnInit {

  user: firebase.User;
  list: Operatie[];
  inschrijflist
  laatsteOperatie

  constructor(private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr:ToastrService,
    private auth: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef) { }
    

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
      if (user != null) {
        this.auth.accessOnlyAdmin(user.email);
      }
    });

    this.service.getOperaties().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Operatie;
      })
    });
  }

  onEdit(operatie : Operatie) {
    this.service.formData = Object.assign({}, operatie);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('operaties/' + id).delete();
      this.toastr.warning('Deleted successfully','Operatie');
    }
  }

  getIngeschreven(id: string) {
    console.log('getIngeschreven functie')
    console.log(this.inschrijflist)
    this.laatsteOperatie = id;
    this.service.getIngeschreven(id).subscribe(actionArray => {
      this.inschrijflist = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      })
    });
    console.log(this.inschrijflist)
    this.ref.detectChanges()
  }

  onAcceptInschrijven(id : string) {
    this.service.acceptOperatieInschrijving(this.laatsteOperatie, id);
  }

  onDenyInschrijven(id : string ) {
    this.service.denyOperatieInschrijving(this.laatsteOperatie, id);
  }

}