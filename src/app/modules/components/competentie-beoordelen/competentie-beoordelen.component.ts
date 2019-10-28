import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { Competentie } from 'src/app/shared/models/competentie.model';

@Component({
  selector: 'app-competentie-beoordelen',
  templateUrl: './competentie-beoordelen.component.html',
  styleUrls: ['./competentie-beoordelen.component.css']
})
export class CompetentieBeoordelenComponent implements OnInit {
  user: firebase.User;
  competentieLijst: Competentie[] = [];
  mijnUser: User;
  competentie: Competentie;
  users: User[];


  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

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

    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.getAllCompetenties();

    });
  }

  getAllCompetenties() {
    for (const user of this.users) {
      for (const competentie of user.competentie) {
        if (competentie != null && competentie.file !== '' && competentie.naam !== '') {
          this.competentieLijst.push(competentie);
        }
      }
    }
  }

  

}
