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
  competentieLijst: Array<Competentie> = [];
  competentieLijstUser: Array<Competentie> = [];
  beoordeeldLijst: Array<Competentie> = [];
  mijnUser: User;
  users: User[];
  competentie: Competentie;


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
      this.userService.getUser(user.email).subscribe( mijnUser => {
        this.mijnUser = mijnUser as User;
      });
    });

    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.getCompetentieLijstBeoordeeld();
    });

  }

  getCompetentieLijst() {
    this.competentieLijst = [];
    for (const user of this.users ) {
      if (user.competentie != null) {
        for (const competentie of user.competentie) {
          if (competentie.naam !== '' && competentie.file !== '' && competentie.email !== '') {
            this.competentieLijst.push(competentie);
          }
        }
      }
    }
    return this.competentieLijst;
  }

  getCompetentieLijstUser(email: string) {
    this.competentieLijstUser = [];
    for (const competentie of this.competentieLijst) {
      if (competentie.email === email) {
        this.competentieLijstUser.push(competentie);
      }
    }
  }

  getCompetentieLijstBeoordeeld() {
    this.competentie = null;
    this.beoordeeldLijst = [];
    this.getCompetentieLijst();
    for (const competentie of this.competentieLijst) {
      if (competentie.status === 'ingeschreven') {
        this.beoordeeldLijst.push(competentie);
      }
    }

  }

  competentieAccepteren(index: number, email: string) {
    this.getCompetentieLijstBeoordeeld();
    this.getCompetentieLijstUser(email);
    this.competentie = this.beoordeeldLijst[index];
    this.competentie.status = 'geaccepteerd';
    this.beoordeeldLijst.splice(index, 1);
    const i = this.competentieLijstUser.findIndex(competentie => competentie.naam === this.competentie.naam
       && competentie.email === this.competentie.email);
    this.competentieLijstUser.splice(i, 1);
    this.competentieLijstUser.push(this.competentie);
    this.competentieToevoegen(email);
  }

  competentieAfkeuren(index: number, email: string) {
    this.getCompetentieLijstBeoordeeld();
    this.getCompetentieLijstUser(email);
    this.competentie = this.beoordeeldLijst[index];
    this.competentie.status = 'afgekeurd';
    this.beoordeeldLijst.splice(index, 1);
    const i = this.competentieLijstUser.findIndex(competentie => competentie.naam === this.competentie.naam
       && competentie.email === this.competentie.email);
    this.competentieLijstUser.splice(i, 1);
    this.competentieLijstUser.push(this.competentie);
    this.competentieToevoegen(email);
  }


  competentieToevoegen(email: string) {
    this.userService.addCompetentie(email, this.competentieLijstUser);
  }

}
