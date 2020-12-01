import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexasPokerComponent } from './texas-poker/texas-poker.component';
import { PlayerComponent } from './player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecordModalComponent } from './record-modal/record-modal.component';
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [
    TexasPokerComponent, 
    PlayerComponent,
    RecordModalComponent
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
    HttpClientModule,
    RecordModalComponent
  ]
})
export class GamesModule { }
