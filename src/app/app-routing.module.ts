import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { HomeComponent } from './modules/components/home/home.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { AddOperatieComponent } from './modules/components/add-operatie/add-operatie.component';
import { MijnProfielComponent } from './modules/components/mijn-profiel/mijn-profiel.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'operaties', component: AddOperatieComponent, canActivate: [AuthGuard] },
  { path: 'mijnProfiel', component: MijnProfielComponent, canActivate: [AuthGuard] },
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
