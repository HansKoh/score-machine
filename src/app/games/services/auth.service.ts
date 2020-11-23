import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
    name: "a",
    password: "a"
  };

  public isAuthenticated:boolean = false;
  public authenticationChanged = new Subject<void>();
  public firebaseURL = 'https://score-machine-a7750.firebaseio.com/auth/-MMk_b9vXBUToncncTrj.json';

  constructor(private http: HttpClient) { }

  getStatus() {
    console.log('Auth Service: ', this.isAuthenticated);
    return this.isAuthenticated;
  }

  onLogin(name:string, password:string) {
    if (name === this.user.name && password === this.user.password) {
      this.isAuthenticated = true;
      this.authenticationChanged.next();
    }
  }

  onLogout() {
    if (this.isAuthenticated) {
      this.isAuthenticated = false;
      this.authenticationChanged.next();
      this.onUpdateAuth().subscribe(res=>console.log(res));
    }
  }

  onUpdateAuth() {
    return this.http
      .put(this.firebaseURL, {"isAuthenticated": this.isAuthenticated})
      .pipe(
        tap(() => this.authenticationChanged.next())
      );
  }

  onFetchAuth() {
    this.http
    .get('https://score-machine-a7750.firebaseio.com/auth.json').subscribe(responseData => {
      this.isAuthenticated = <boolean>responseData["-MMk_b9vXBUToncncTrj"].isAuthenticated;
      this.authenticationChanged.next();
      console.log(this.isAuthenticated);
    });
  }

  onClose(){
    this.http.put(this.firebaseURL, {"isAuthenticated": false}).subscribe(res=>console.log(res));
  }
}
