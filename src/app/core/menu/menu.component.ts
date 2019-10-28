import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Registration } from '../../shared/models/registration.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  registration: Registration;
  user: firebase.User;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if(user != null){
        console.log(user.email);
        this.getUserRole(user.email);
      }
    })
  }

  getUserRole(email){
    this.auth.checkUserRole(email).subscribe(registration => this.registration = registration);
  }


  logout(){
    this.auth.logout();
    this.router.navigate(['/home'])
  }

  register(){
    this.router.navigate(['/register']);
  }
}

