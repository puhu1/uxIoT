import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  email: string;
  password: string;
  emailSent = false;
  show: boolean = false;
  show_pass: boolean = false;

  errorMessage: string;

  constructor(private authService: AuthService, 
              private router: Router,
              private db: AngularFirestore) { }


  ngOnInit() {
      const url = this.router.url;
  }

  onLoggedin() {
      localStorage.setItem('isLoggedin', 'true');
  }

  register(){
    this.router.navigate(['register']);
  }

  logInWithEmail(email, password)
    {
      var email = email.value;
      var password = password.value;
        this.authService.logInWithEmail(email, password).then(() => {
            this.db.collection('users', ref => ref.where('email', '==', email)).valueChanges().subscribe(user => {
              console.log('user>>>>>>',user);
              
                console.log('userLogin2', user[0]);
                this.user = user[0];
                localStorage.setItem('user', JSON.stringify(user[0]));
                this.onLoggedin();
                var orgId = this.user.employeeId;
                if(this.user.employeeId){
                  this.router.navigate(['homepage']);
                }
                else{
                    this.errorMessage = 'You are not part of any organization';
                    this.router.navigate(['login']);
                }
                //this.router.navigate(['dashboard']);

            });
        }).catch(error => {
            console.log('error', error.message);
            // this.toastr.error(error.message, 'Error occurred !');
            this.db.collection('users',ref => ref.where('email','==', email)).valueChanges().subscribe(user => {
                console.log('userLogin2', user[0]);
                localStorage.setItem('user', JSON.stringify(user[0]));
                console.log('SameUser Exist In DB with Registered')
                this.user = user[0];
                this.show = true;

                if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.')
                    {
                        this.errorMessage = 'Email Not Exist';
                    }
                if (error.message === 'The password is invalid or the user does not have a password.')
                    {
                        if (Object(user[0]).provider === 'google.com')
                        {
                            this.errorMessage = 'You are already registered with Google, Please LogIn with Google';
                        } else {
                            this.errorMessage = 'Invalid Password';
                        }
                        console.log('jcjch')
                    }
            });
        });


    }

}
