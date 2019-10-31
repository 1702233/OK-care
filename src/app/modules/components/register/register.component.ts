import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  authError: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // errors tijdens het registreren opvangen
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = '';
      this.authError = data;
    });
  }

  // maken van een user met de values die in de HTML form staan
  createUser(frm) {
    this.authError = '';
    this.auth.createUser(frm.value);
  }

}
