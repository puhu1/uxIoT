import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {  Observable } from 'rxjs';
// 
@Injectable() 
export class AuthService {
  authState: Observable<firebase.User>;
  user: Observable<any>;
  private userDetails: firebase.User = null;

  currUser: any;
  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router:Router,
                private datbase: AngularFirestore) {
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log('User Details', this.userDetails);
          localStorage.setItem('userid',JSON.stringify(user))
        }
        else {
          this.userDetails = null;
        }
      }
    );
   }
   logInWithEmail(email: string, password){
    console.log('Email =', email)
    console.log('Password =', password)
    const provider = new firebase.auth.EmailAuthProvider();
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);

  }
  SignInWithEmail(name: string, phone:string, email: string, password: string, id:string){
    console.log('name',name);
    console.log('phone',phone);
    console.log('email',email);
    console.log('password',password);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).
    then((data) =>{
         this.sendEmailLink(email);
         console.log('data',data);
         console.log('name',name);
         let user = new User();
         user.setName(name);
         user.setMobileNumber(phone);
         user.setFcm(data.user.displayName);
         user.setEmail(email);
         user.setProvider(data.user.providerId);
         console.log('provider',user.getProvider());
        //  user.setOnline(true);
         user.setEmployeeId(id);
        //  user.setAvatar('https://firebasestorage.googleapis.com/v0/b/eztask-2.appspot.com/o/profile.jpg?alt=media&token=83d32849-6ed4-40de-824a-f604ca156f9d');
         this.insertUsertoDB(user);

         this.router.navigate(['/login']);
        //  this.router.navigate(['pages/auth/mail-confirm']);
        //  console.log('Logged in with google',JSON.stringify(data.user));
        //  localStorage.setItem('userid',JSON.stringify(data.user));

    }
    ).catch((Error) =>{
        console.log('Error = ',Error);

    })
   
  }

    async sendEmailLink(email) {}

  logout()
  {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedin');
  }
  
  insertUsertoDB(user)
    {
        console.log('inside insertusertodb',user)
        this.currUser = user;
        // const users = new User();
        localStorage.setItem('user',JSON.stringify(user));
        // users.setAvatar(data.user.photoURL);
        // users.setEmail(data.user.email);
        // users.setName(data.user.displayName);
        // users.setUserId(data.user.uid);
        
        // let fcm = Object.values(JSON.parse(JSON.stringify(Object.values(JSON.parse(JSON.stringify(data.user)))[11])))[2];
        // users.setFcm(JSON.stringify(fcm));

        // console.log('push user',users);
        const usersList : AngularFireList<any> = this.db.list('users');
        console.log('userslists',usersList);
        usersList.set(user.getEmployeeId(),user);
        this.datbase.collection('users').ref.add(JSON.parse(JSON.stringify(this.currUser))).then(data=>{
            console.log("added to db");
            
        }).catch(err=>{
        console.log('error',err);
        
        })
        //this.addGoogleUserToDB(users);
    }

}

export class User
{
    // avatar : string;
    email  : string;
    fcm    : string;
    mobileNumber : string;
    name   : string;
    // online : boolean;
    employeeId  : string;
    provider: string;

    
    // public getAvatar() : string {
    //     return this.avatar;
    // }
    
    // public setAvatar(avatar : string) {
    //     this.avatar = avatar;
    // }
    
    public getEmail() : string {
        return this.email;
    }
    
    public setEmail(email : string) {
        this.email = email;
    }
    
    public getFcm() : string {
        return this.fcm
    }
    
    public setFcm(fcm : string) {
        this.fcm = fcm;
    }
    
    public getMobileNumber() : string {
        return this.mobileNumber;
    }
    
    public setMobileNumber(mobileNumber : string) {
        this.mobileNumber = mobileNumber;
    }
    
    public getName() : string {
        return this.name;
    }
    
    public setName(name : string) {
        this.name = name;
    }
    
    // public isOnline() : boolean {
    //     return this.online;
    // }
    
    // public setOnline(online : boolean) {
    //     this.online = online;
    // }
    
    public getEmployeeId() : string {
        return this.employeeId;
    }
    
    public setEmployeeId(userId : string) {
        this.employeeId = userId;
    }

    public setProvider(provider : string) {
      this.provider = provider;
    }
    
    
    public getProvider() : string {
      return this.provider;
    }
}
