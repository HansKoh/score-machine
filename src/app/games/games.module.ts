import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexasPokerComponent } from './texas-poker/texas-poker.component';
import { PlayerComponent } from './player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [
    TexasPokerComponent, 
    PlayerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
    
  ],
  exports: [
    TexasPokerComponent,
    PlayerComponent,
    HttpClientModule
  ]
})
export class GamesModule { }
