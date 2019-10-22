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

  constructor(private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr:ToastrService,
    private auth: AuthService,
    private router: Router) { }
    

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

}