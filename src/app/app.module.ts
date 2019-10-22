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
// services
import { OperatieService } from './core/services/operatieservice.service'
// components
import { LoginComponent } from './modules/components/login/login.component';
import { MenuComponent } from './core/menu/menu.component';
import { FooterComponent } from './core/footer/footer.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { HomeComponent } from './modules/components/home/home.component';
import { AddOperatieComponent } from './modules/components/add-operatie/add-operatie.component';
import { OperatieLijstComponent } from './modules/components/operatie-lijst/operatie-lijst.component';
import { MijnProfielComponent } from './modules/components/mijn-profiel/mijn-profiel.component';

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
    MijnProfielComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [OperatieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
