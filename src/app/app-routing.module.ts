import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthService } from "./services/auth.service";
import { HomepageComponent } from "./homepage/homepage.component";
import { SeatInfoComponent } from "./seat-info/seat-info.component";



export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'seat-info', component: SeatInfoComponent}
  // { path: 'members', component: OtherComponent, canActivate: [AuthGuard] }

]


@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
