import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { OperatieService } from '../../../core/services/operatieservice.service';
import { Operatie } from '../../../shared/models/operatie.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operatie-lijst',
  templateUrl: './operatie-lijst.component.html',
  styleUrls: ['./operatie-lijst.component.css']
})
export class OperatieLijstComponent implements OnInit {

  user: firebase.User;
  list: Operatie[];
  laatsteOperatie;

  constructor(private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr:ToastrService,
    private auth: AuthService,
    private router: Router) { }
    

  ngOnInit() {
    //authenticatie
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
      if (user != null) {
        this.auth.accessOnlyAdmin(user.email);
      }
    });
    
    //get alle operaties
    this.service.getOperaties().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Operatie;
      })
      // sort de tabel op datum.
      this.list.sort(this.dynamicSort('datum'));
    });
  }

  // als een operatie wordt geselecteerd vul de form met deze data.
  onEdit(operatie : Operatie) {
    this.service.formData = Object.assign({}, operatie);
    //sla de laatst geklikte operatie ID op in een variable om deze te highlighten.
    this.laatsteOperatie = operatie.id;
  }

  // als delete functie wordt aangeroepen verwijder operatie met dit id.
  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('operaties/' + id).delete();
      this.toastr.warning('Deleted successfully','Operatie');
    }
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

}