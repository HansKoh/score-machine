import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexasPokerComponent } from './texas-poker/texas-poker.component';
import { PlayerComponent } from './player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecordModalComponent } from './record-modal/record-modal.component';


@NgModule({
  declarations: [
    TexasPokerComponent, 
    PlayerComponent,
    RecordModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    TexasPokerComponent,
    PlayerComponent,
    HttpClientModule,
    RecordModalComponent
  ]
})
export class GamesModule { }
