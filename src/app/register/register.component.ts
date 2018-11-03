import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
  }

  registerWithEmail(name, phone, email, password, id){
    var name = name.value;
    var phone = phone.value;
    var email = email.value;
    var password = password.value;
    var id = id.value;
    this.authService.SignInWithEmail(name, phone, email, password, id);
  }

}
