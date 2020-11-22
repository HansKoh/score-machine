import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Player } from '../model/player';
import { TexasService } from '../services/texas.service';

@Component({
  selector: 'app-texas-poker',
  templateUrl: './texas-poker.component.html',
  styleUrls: ['./texas-poker.component.css']
})
export class TexasPokerComponent implements OnInit, OnDestroy {

  players = [];
  totalChipValue:number;
  totalChips:number;
  singleChipValue:any;

  playersChangedSubscription: Subscription;

  constructor(private texasService: TexasService) { }

  ngOnInit(): void {
    // if (this.totalChipValue === 0 || this.totalChips === 0) {
    //   this.singleChipValue = "Invalid";
    // }
    if (!(this.totalChipValue > 0 && this.totalChips > 0 && this.totalChipValue != null && this.totalChips != null)) {
      this.singleChipValue = "Invalid";
    }
    this.getAllPlayers();
    this.playersChangedSubscription = this.texasService.playersChanged.subscribe(() => {
      this.getAllPlayers();
    });
  }
  
  private getAllPlayers() {
    this.texasService.onFetchPlayers().subscribe((players: Player[]) => this.players = players);
  }

  onClearAllPlayers() {
    this.texasService.onDeleteAllPlayers().subscribe((res)=>console.log(res));
    this.getAllPlayers();
    this.totalChipValue = 0;
    this.totalChips = 0;
    this.singleChipValue = "Invalid";
  }

  onSubmit(form: NgForm) {
    this.texasService.onCreatePlayer(
      {
        "id": Date(),
        "name": form.value.name,
        "buyin": 0,
        "remaining": 0,
        "final": 0,
        "record": ["Join at@" + new Date().toLocaleString()]
      }
    ).subscribe((res)=>console.log(res));
    console.log(this.totalChipValue);
  }

  updateSingleChipValue() {
    if (this.totalChipValue > 0 && this.totalChips > 0 && this.totalChipValue != null && this.totalChips != null){
      this.singleChipValue = (this.totalChipValue / this.totalChips).toFixed(2);
    } else {
      this.singleChipValue = "Invalid";
    }
  }

  ngOnDestroy(): void {
    this.playersChangedSubscription.unsubscribe();
  }
}
