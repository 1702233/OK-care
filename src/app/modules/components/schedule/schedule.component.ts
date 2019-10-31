import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput, Calendar } from '@fullcalendar/core';
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
  calendarEvent: EventInput;
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
      this.addCalendarEvents(this.user.email);
      console.log(this.calendarEvents);
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
  }

  getOperatieUser(id: string) {
    this.schedulerService.getOperatieByID(id).subscribe(operatie => {
      this.operatieUser = operatie as Operatie;
    });
  }

  getOperatiesUser(email: string) {
    this.operatiesUser = [];
    this.getInschrijvingenUser(email);
    for (const operatie of this.operaties) {
      for (const inschrijving of this.inschrijvingLijstUser) {
        if (operatie.id === inschrijving.operatieNaam) {
          this.operatiesUser.push(operatie);
        }
      }
    }
  }

  addCalendarEvents(email: string) {
    this.getOperatiesUser(email);
    this.calendarEvents = [];
    for (const operatie of this.operatiesUser) {
      this.calendarEvent = { title: `${operatie.type} ${operatie.begintijd}-${operatie.eindtijd}`, start: operatie.datum};
      this.calendarEvents.push(this.calendarEvent);
    }
  }

}
