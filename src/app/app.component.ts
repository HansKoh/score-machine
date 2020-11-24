import { Component, HostListener } from '@angular/core';
import { AuthService } from './games/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ScoreMachine';
  constructor(private authService: AuthService) {
    
  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event) {
  //   this.authService.onClose();
  // }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event) {
  //   this.authService.onClose();
  // }
  
}
