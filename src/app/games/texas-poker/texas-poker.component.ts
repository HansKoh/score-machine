import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Chip } from '../model/chip';
import { Player } from '../model/player';
import { AuthService } from '../services/auth.service';
import { TexasService } from '../services/texas.service';

@Component({
  selector: 'app-texas-poker',
  templateUrl: './texas-poker.component.html',
  styleUrls: ['./texas-poker.component.css']
})
export class TexasPokerComponent implements OnInit, OnDestroy {

  players = [];
  chip:Chip = {
    totalChipValue: 0,
    totalChips: 0,
    singleChipValue: "Invalid"
  };
  totalChipValue:number;
  totalChips:number;
  singleChipValue:any;
  finalBalance:number = null;
  
  isAuthenticated:boolean = false;

  playersChangedSubscription: Subscription;
  chipChangedSubscription: Subscription;
  authSubscription: Subscription;


  constructor(private texasService: TexasService, private authService: AuthService) { 
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getStatus();
    this.authSubscription = this.authService.authenticationChanged.subscribe(()=>{
      this.isAuthenticated = this.authService.getStatus();
    });

    this.texasService.onFetchChip().subscribe((chip) => this.chip = chip);
    console.log(this.chip);

    if (!(this.chip.totalChipValue > 0 && this.chip.totalChips > 0 && this.chip.totalChipValue != null && this.chip.totalChips != null)) {
      this.chip.singleChipValue = "Invalid";
    }
    this.getAllPlayers();
    this.playersChangedSubscription = this.texasService.playersChanged.subscribe(() => {
      this.getAllPlayers();
    });
  }
  
  ngOnDestroy(): void {
    this.playersChangedSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
  
  private getAllPlayers() {
    this.texasService.onFetchPlayers().subscribe((players: Player[]) => this.players = players);
  }

  onClearAllPlayers() {
    this.texasService.onDeleteAllPlayers().subscribe((res)=>console.log(res));
    this.getAllPlayers();
    this.chip.totalChipValue = 0;
    this.chip.totalChips = 0;
    this.chip.singleChipValue = "Invalid";
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
    if (this.chip.totalChipValue > 0 && this.chip.totalChips > 0 && this.chip.totalChipValue != null && this.chip.totalChips != null){
      this.chip.singleChipValue = (this.chip.totalChipValue / this.chip.totalChips).toFixed(2);
    } else {
      this.chip.singleChipValue = "Invalid";
    }
  }

  onUpdateChipInfo(){
    const newChipInfo = {
      totalChipValue: this.chip.totalChipValue,
      totalChips: this.chip.totalChips,
      singleChipValue: this.chip.singleChipValue
    };
    this.texasService.onUpdateChip(newChipInfo).subscribe(res=>console.log(res));
  }

  calculateFinalBalance() {
    this.finalBalance = 0;
    this.players.forEach( player => {
      if (player.final) {
        this.finalBalance = this.finalBalance + parseFloat(player.final);
      }
    });
  }

}
