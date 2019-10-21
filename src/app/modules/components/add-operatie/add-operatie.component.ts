import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { OperatieService } from '../../../core/services/operatieservice.service'

@Component({
  selector: 'app-add-operatie',
  templateUrl: './add-operatie.component.html',
  styleUrls: ['./add-operatie.component.css']
})
export class AddOperatieComponent implements OnInit {

  constructor(private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      type: '',
      datum: '',
      begintijd: '',
      eindtijd: '',
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('operaties').add(data);
    else
      this.firestore.doc('operaties/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Operatie');
  }

}
