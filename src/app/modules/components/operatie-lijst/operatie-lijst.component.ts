import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { OperatieService } from '../../../core/services/operatieservice.service'
import { Operatie } from '../../../shared/models/operatie.model'

@Component({
  selector: 'app-operatie-lijst',
  templateUrl: './operatie-lijst.component.html',
  styleUrls: ['./operatie-lijst.component.css']
})
export class OperatieLijstComponent implements OnInit {

  list: Operatie[];
  constructor(private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
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