import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!
  calendarEvents: EventInput[] = [];

  ngOnInit(): void {
    this.calendarEvents.push({ title: 'test', start: '2019-10-10'});
  }

}
