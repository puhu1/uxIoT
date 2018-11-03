import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogActions, MatDialogContent, MatDialogTitle, MatTab, MatDialogRef } from "@angular/material";
import { MatInputModule } from '@angular/material/input';
import { ServiceService } from "../service.service";
@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent implements OnInit {
  meridianStartTime= { hour: 13, minute: 30 };
  meridianEndTime = { hour: 13, minute: 30 };
  meridian=true;
  // meridianEnd;

  constructor(private dialogRef: MatDialogRef<DialogComponentComponent>,
    private input: MatInputModule,private service: ServiceService) { }
    seat;
    user = JSON.parse(localStorage.getItem('user'))
  ngOnInit() {
    this.seat = this.service.getSeat();
    if (this.seat === undefined){
      this.seat = JSON.parse(localStorage.getItem('seat'));
      if(this.seat.from != 0){
        var dt = new Date(this.seat.from);
        this.meridianStartTime.hour = dt.getHours();
        this.meridianStartTime.minute = dt.getMinutes();
      }
      if(this.seat.to != 0){
        var dt = new Date(this.seat.to);
        this.meridianEndTime.hour = dt.getHours();
        this.meridianEndTime.minute = dt.getMinutes();
      }
    }
  }
  close(){
    this.dialogRef.close(0);
  }

  cancel(){
    this.seat.booked = false;
    this.seat.from = this.seat.to = 0;
    this.seat.employeeId = '';
    this.seat.name = '';
    this.dialogRef.close(this.seat);
  }

  book(){
    var dt = new Date()
    dt.setHours(this.meridianStartTime.hour);
    dt.setMinutes(this.meridianStartTime.minute);
    this.seat.from = dt.getTime();

    dt.setHours(this.meridianEndTime.hour);
    dt.setMinutes(this.meridianEndTime.minute);
    this.seat.to = dt.getTime();
    this.seat.employeeId = this.user.employeeId;
    this.seat.booked = true;
    this.seat.name = this.user.name;
    this.dialogRef.close(this.seat);
  }
  

}
