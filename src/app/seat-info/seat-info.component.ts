import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog, MatDialogConfig} from "@angular/material";
import { DialogComponentComponent } from "../dialog-component/dialog-component.component";
import { ServiceService } from "../service.service";
@Component({
  selector: 'app-seat-info',
  templateUrl: './seat-info.component.html',
  styleUrls: ['./seat-info.component.scss']
})
export class SeatInfoComponent implements OnInit {
user = JSON.parse(localStorage.getItem('user'));
  constructor(private db: AngularFirestore,private dialog: MatDialog, private service: ServiceService) { }
  seats=[];
  ngOnInit() {
    this.fetchFromDB();
  }

  getClass(seat){
    if(seat.booked){
      return {'booked':true}
    }
    else{
      return {'free':true}
    }
  }

  getStatus(seat){
    if(seat.booked){
      return 'Booked'
    }
    else{
      return 'Free'
    }
  }

  getFromTime(time){
    if(time == 0){
      return '00 : 00'
    }
    else{
      var dt = new Date(time);
      return dt.toLocaleTimeString()
    }
  }

  getToTime(time){
    if(time == 0){
      return '00 : 00'
    }
    else{
      var dt = new Date(time);
      return dt.toLocaleTimeString()
    }
  }

indexOfSeat;

  bookOrUpdate(seat){
    if(seat.booked && seat.employeeId != this.user.employeeId){
      return;
    }
    this.service.setSeat(seat);
    localStorage.setItem('seat',JSON.stringify(seat));
    this.indexOfSeat = this.seats.indexOf(seat);
    const dialogConfig = new MatDialogConfig();
         dialogConfig.disableClose = true;
         dialogConfig.autoFocus = true;
         dialogConfig.position = {
           'top':'30px',
           'left':'400px'
       };
       const dialogRef = this.dialog.open(DialogComponentComponent, dialogConfig);
       dialogRef.afterClosed().subscribe(data =>{
         if(data != 0){
          
          this.db.collection('seats').doc(data.id).update(data).then(data=>{
            console.log('Updated',data);
            
          }).catch(err=>{
            console.log('Caught',err);
            
          })

          this.seats[this.indexOfSeat] = data;
          
         }
         
      })
  }

  fetchFromDB(){
    this.db.collection('seats').ref.onSnapshot(data=>{
      this.seats= [];
      data.forEach(dt=>{
        this.seats.push(dt.data())
      })
    })
  }

}
