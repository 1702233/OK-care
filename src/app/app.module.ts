import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// sorting
import { AgGridModule } from 'ag-grid-angular';
// scheduler
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!;
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
// services
import { OperatieService } from './core/services/operatieservice.service';
// components
import { LoginComponent } from './modules/components/login/login.component';
import { MenuComponent } from './core/menu/menu.component';
import { FooterComponent } from './core/footer/footer.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { HomeComponent } from './modules/components/home/home.component';
import { AddOperatieComponent } from './modules/components/add-operatie/add-operatie.component';
import { OperatieLijstComponent } from './modules/components/operatie-lijst/operatie-lijst.component';
import { MijnProfielComponent } from './modules/components/mijn-profiel/mijn-profiel.component';
import { InschrijvenComponent } from './modules/components/inschrijven/inschrijven.component';
import { ScheduleComponent } from './modules/components/schedule/schedule.component';
import { CompetentieToevoegenComponent } from './modules/components/competentie-toevoegen/competentie-toevoegen.component';
import { CompetentieBeoordelenComponent } from './modules/components/competentie-beoordelen/competentie-beoordelen.component';
import { InschrijfAcceptanceComponent } from './modules/components/inschrijf-acceptance/inschrijf-acceptance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    AddOperatieComponent,
    OperatieLijstComponent,
    MijnProfielComponent,
    InschrijvenComponent,
    ScheduleComponent,
    CompetentieToevoegenComponent,
    CompetentieBeoordelenComponent,
    InschrijfAcceptanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    ScheduleModule, RecurrenceEditorModule,
    FullCalendarModule, // for FullCalendar!
  ],
  providers: [
    OperatieService,
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
