import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from '../model/player';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TexasService {
  
  
  // Data
  
  public players = [];
  private firebaseURL = 'https://score-machine-a7750.firebaseio.com/';
  
  // Subjects
  public playersChanged = new Subject<void>();
  
  constructor(private http: HttpClient) { 
  }
  
  // Methods

  // Http Methods
  
  onCreatePlayer(playerData: Player) {
    return this.http
      .post<{ name: string}>(this.firebaseURL + 'players.json', playerData)
      .pipe(
        tap(() => this.playersChanged.next())
      );
  }

  onFetchPlayers() {
  return this.http
    .get<{ [key:string]: Player }>(this.firebaseURL + 'players.json')
    .pipe(
      map(responseData => {
        const playersArray: Player[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            playersArray.push({...responseData[key], id: key});
          }
        }
        return playersArray;
      })
    );
  }

  onUpdatePlayer(player: Player) {
    return this.http
      .put(this.firebaseURL + 'players/' + player.id + '.json', player)
      .pipe(
        tap(() => this.playersChanged.next())
      );
  }

  onDeleteAllPlayers() {
    return this.http
      .delete(this.firebaseURL + 'players.json')
      .pipe(
        tap(() => this.playersChanged.next())
      );
  }

  onDeleteSinglePlayer(id: string) {
    console.log("id", id);
    return this.http
      .delete(this.firebaseURL + 'players/' + id +'.json')
      .pipe(
        tap(() => this.playersChanged.next())
      );
  }
}
