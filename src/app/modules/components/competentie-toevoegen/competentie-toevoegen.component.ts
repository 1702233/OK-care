import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { Competentie } from 'src/app/shared/models/competentie.model';

@Component({
  selector: 'app-competentie-toevoegen',
  templateUrl: './competentie-toevoegen.component.html',
  styleUrls: ['./competentie-toevoegen.component.css']
})
export class CompetentieToevoegenComponent implements OnInit {
  user: firebase.User;
  competentieLijst: Array<Competentie>;
  mijnUser: User;
  competentie: Competentie;


  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
      if (user != null) {
        this.auth.accessOnlyUser(user.email);
      }
      this.userService.getUser(user.email).subscribe( mijnUser => {
        this.mijnUser = mijnUser as User;
        this.getCompetentieLijst();
        console.log(this.competentieLijst);
      });
    });

  }

  getCompetentieLijst() {
    this.competentieLijst = this.mijnUser.competentie;
  }

  getCompetentie(naam: string, file: string) {
    const status = 'ingeschreven';
    this.competentie = {naam, file, status };
    this.addCompetentie();
    this.competentieToevoegen(this.user.email);
  }

  addCompetentie() {
    this.competentieLijst.push(this.competentie);
  }

  competentieToevoegen(email: string) {
    this.userService.addCompetentie(email, this.competentieLijst);
  }

}
