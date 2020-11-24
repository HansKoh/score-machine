import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/games/model/user';
import { AuthService } from 'src/app/games/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  isAuthenticated:boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.onFetchAuth();
    this.isAuthenticated = this.authService.getStatus();
    this.authSubscription = this.authService.authenticationChanged.subscribe(()=>{
      this.isAuthenticated = this.authService.getStatus();
      console.log(this.isAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  
  onSubmit(form: NgForm){
    this.authService.onLogin(form.value.name, form.value.password);
    this.authService.onUpdateAuth().subscribe(res=>console.log(res));
  }

  onLogout() {
    this.authService.onLogout();
  }
}
