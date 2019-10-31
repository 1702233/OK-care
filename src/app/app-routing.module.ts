import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { HomeComponent } from './modules/components/home/home.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { AddOperatieComponent } from './modules/components/add-operatie/add-operatie.component';
import { MijnProfielComponent } from './modules/components/mijn-profiel/mijn-profiel.component';
import { InschrijvenComponent } from './modules/components/inschrijven/inschrijven.component';
import { ScheduleComponent } from './modules/components/schedule/schedule.component';
import { CompetentieToevoegenComponent } from './modules/components/competentie-toevoegen/competentie-toevoegen.component';
import { CompetentieBeoordelenComponent } from './modules/components/competentie-beoordelen/competentie-beoordelen.component';
import { InschrijfAcceptanceComponent } from './modules/components/inschrijf-acceptance/inschrijf-acceptance.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'operaties', component: AddOperatieComponent, canActivate: [AuthGuard] },
  { path: 'mijnprofiel', component: MijnProfielComponent },
  { path: 'operatieinschrijven', component: InschrijvenComponent},
  { path: 'operatieacceptatie', component: InschrijfAcceptanceComponent},
  { path: 'agenda', component: ScheduleComponent},
  { path: 'competentiebeoordelen', component: CompetentieBeoordelenComponent},
  { path: 'competentietoevoegen', component: CompetentieToevoegenComponent},
  
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
