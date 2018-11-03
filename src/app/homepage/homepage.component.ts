import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { defineBase } from '@angular/core/src/render3';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
    
  }

  getSeatInfo(){
    this.router.navigate(['seat-info']);
  }

  

}
