import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { debug } from 'util';


@Component({
  selector: 'app-mijn-profiel',
  templateUrl: './mijn-profiel.component.html',
  styleUrls: ['./mijn-profiel.component.css']
})
export class MijnProfielComponent implements OnInit {
  user: firebase.User;
  mijnUser: User;

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {

    // Kijken of er iemand is ingelogd
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }

      // ingelogde user zijn gegevens ophalen en in mijnUser zetten
      this.userService.getUser(user.email).subscribe( mijnUser => {
        this.mijnUser = mijnUser as User;
      })
    });
  }


}
