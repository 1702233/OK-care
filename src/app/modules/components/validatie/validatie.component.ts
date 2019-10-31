import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Registration } from '../../../shared/models/registration.model';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-validatie',
  templateUrl: './validatie.component.html',
  styleUrls: ['./validatie.component.css']
})
export class ValidatieComponent implements OnInit {
  users: User[];
  user: firebase.User;
  registrationValidation: User;
  message: string;
  usersDisabled: User[];

  constructor(private userService: UserService, private auth: AuthService, private router: Router) { }

  ngOnInit() {

    // Logged in admin user has access otherwise sen user back to login.
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
      if (user != null) {
        this.auth.accessOnlyAdmin(user.email);
      }
    });

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.userService.getUsersDisabled().subscribe(users => {
      this.usersDisabled = users;
    })


  }

  // user status op activated zetten
  acceptRegistration(email: string) {
    this.userService.userActiveren(email);
    this.message = 'User geactiveerd';
  }

  // user status op disaproved zetten
  declineRegistration(email: string) {
    this.userService.userAfkeuren(email);
    this.message = 'User afgekeurd';
  }

}
