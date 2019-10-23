import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: firebase.User;
  mijnUser: User;
  users: User[];

  constructor( private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
      this.mijnUser = this.userService.getUser(user.email) as User;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
