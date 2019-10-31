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
import { InschrijfAcceptanceComponent } from './modules/components/inschrijf-acceptance/inschrijf-acceptance.component';
import { ValidatieComponent } from './modules/components/validatie/validatie.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'operaties', component: AddOperatieComponent, canActivate: [AuthGuard] },
  { path: 'mijnProfiel', component: MijnProfielComponent },
  { path: 'inschrijven', component: InschrijvenComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: 'operatieacceptance', component: InschrijfAcceptanceComponent},
  { path: 'validatie', component: ValidatieComponent},
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
