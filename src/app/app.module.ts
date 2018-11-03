import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialog } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SeatInfoComponent } from './seat-info/seat-info.component';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import { ServiceService } from "./service.service";
// import {MatInputModule} from '@angular/material';

export const fireconfig = {
  apiKey: "AIzaSyDHiD1w4YiGqP6gmgfEWZWQ9UTdRb4KWbo",
    authDomain: "iot-ux.firebaseapp.com",
    databaseURL: "https://iot-ux.firebaseio.com",
    projectId: "iot-ux",
    storageBucket: "iot-ux.appspot.com",
    messagingSenderId: "631107475099"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    RegisterComponent,
    SeatInfoComponent,
    DialogComponentComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(fireconfig),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  NgbModule,
  FormsModule,
  MatInputModule,
  BrowserAnimationsModule,
  MatFormFieldModule
  ],
  providers: [AuthService,MatDialog, ServiceService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponentComponent]
})
export class AppModule { }
