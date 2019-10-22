import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { OperatieService } from '../../../core/services/operatieservice.service'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-operatie',
  templateUrl: './add-operatie.component.html',
  styleUrls: ['./add-operatie.component.css']
})
export class AddOperatieComponent implements OnInit {

  constructor(private service: OperatieService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  // dropdownSettings = {};

  ngOnInit() {
    this.resetForm();
    this.dropdownList = [
      { item_id: 1, item_text: 'comp1 ' },
      { item_id: 2, item_text: 'comp2 ' },
      { item_id: 3, item_text: 'comp3 ' },
      { item_id: 4, item_text: 'comp4 ' },
      { item_id: 5, item_text: 'comp5 ' }
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 9,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      type: 'test',
      aantalmedewerkers: '2',
      datum: '2020-03-03',
      begintijd: '14:00',
      eindtijd: '15:00',
      competenties: [],
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    console.log(data)
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('operaties').add(data);
    else
      this.firestore.doc('operaties/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Operatie');
  }

}
