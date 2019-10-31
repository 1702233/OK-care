import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import { SchedulerService } from 'src/app/core/services/scheduler.service';
import { Operatie } from 'src/app/shared/models/operatie.model';
import { Inschrijving } from 'src/app/shared/models/ingeschreven.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!
  calendarEvents: EventInput[] = [];
  operaties: Operatie[];
  operatiesUser: Operatie[] = [];
  operatie: Operatie;
  operatieUser: Operatie;
  inschrijvingen: Inschrijving[];
  inschrijvingLijst: Inschrijving[] = [];
  inschrijvingLijstUser: Inschrijving[] = [];
  user: firebase.User;
  mijnUser: User;
  operatieNaam: string;

  constructor(private auth: AuthService, private router: Router, private schedulerService: SchedulerService) {}

  ngOnInit(): void {
    this.calendarEvents.push({ title: 'test', start: '2019-10-10'});

    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
    });

    this.schedulerService.getOperaties().subscribe(operaties => {
      this.operaties = operaties;
      this.getInschrijvingen();
      this.getOperatiesUser(this.user.email);
    });

  }

  getInschrijvingen() {
    this.inschrijvingLijst = [];
    for (const operatie of this.operaties) {
      this.schedulerService.getInschrijving(operatie).subscribe(inschrijvingen => {
        this.inschrijvingen = inschrijvingen;
        this.operatieNaam = operatie.id;

        for (const inschrijving of this.inschrijvingen) {
          inschrijving.operatieNaam = this.operatieNaam;
          console.log(inschrijving);
          console.log(this.operatieNaam);
          this.inschrijvingLijst.push(inschrijving);
        }
      });
    }
  }

  getInschrijvingenUser(email: string) {
    this.inschrijvingLijstUser = [];
    for (const inschrijving of this.inschrijvingLijst) {
      if (inschrijving.id === email && inschrijving.status === 'goedgekeurd') {
        this.inschrijvingLijstUser.push(inschrijving);
      }
    }
    console.log(this.inschrijvingLijstUser);
  }

  getOperatieUser(id: string) {
    this.schedulerService.getOperatieByID(id).subscribe(operatie => {
      this.operatieUser = operatie as Operatie;
    });
  }

  getOperatiesUser(email: string) {
    this.getInschrijvingenUser(email);
    console.log(this.inschrijvingLijstUser);
    for (const operatie of this.operaties) {
      this.operatie = operatie;
    
    }
  }

}
