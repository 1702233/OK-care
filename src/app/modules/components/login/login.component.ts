import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authError: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // errors tijdens het inloggen opvangen
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = '';
      this.authError = data;
    });
  }

  // User in loggen
  login(frm) {
    this.auth.checkUserEnabled(frm.value.email, frm.value.password);
    this.authError = '';
  }


}
