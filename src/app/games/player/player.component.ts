import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chip } from '../model/chip';
import { Player } from '../model/player';
import { AuthService } from '../services/auth.service';
import { TexasService } from '../services/texas.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() public player:Player;

  // @Input() public totalChipValue:number;

  // @Input() public totalChips:number;

  // @Input() public singleChipValue:any;

  remaining: number;
  finalChipValue:any = "";
  finalValue:any = "";
  hasWon:number = 0;

  chip:Chip = {
    totalChipValue: 0,
    totalChips: 0,
    singleChipValue: "Invalid"
  };

  isAuthenticated:boolean = false;
  authSubscription: Subscription;
  chipChangedSubscription: Subscription;

  constructor(private texasService: TexasService, private authService: AuthService) { 
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getStatus();
    this.authSubscription = this.authService.authenticationChanged.subscribe(()=>{
      this.isAuthenticated = this.authService.getStatus();
    });

    this.chip = this.texasService.getChipInfo();
    this.chipChangedSubscription = this.texasService.chipChanged.subscribe(() => {
      this.chip = this.texasService.getChipInfo();
      // this.onUpdateFinal();
    });

    this.remaining = this.player.remaining;
    this.onUpdateFinal();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onUpdatePlayer() {
    this.texasService.onUpdatePlayer(this.player).subscribe((res)=>console.log("after update single player", res));
    // this.authService.onUpdateAuth().subscribe();
  }

  onDeletePlayer() {
    this.texasService.onDeleteSinglePlayer(this.player.id).subscribe((res)=>console.log("after delete single player", res));
  }

  onIncreaseBuyin() {
    this.player.buyin = this.player.buyin + 1;
    this.player.record.push("Buy In at@" + new Date().toLocaleString());
    this.onUpdatePlayer();
    this.onUpdateFinal();
  }

  onDecreaseBuyin() {
    if (this.player.buyin > 0){
      this.player.buyin = this.player.buyin -1;
      this.player.record.push("Remove Buy In at@" + new Date().toLocaleString());
      this.onUpdatePlayer();
      this.onUpdateFinal();
    }
  }

  onUpdateFinal(){
    console.log("onUpdateFinal is called: ", this.chip);
    if (this.chip.singleChipValue != "Invalid") {
      this.finalChipValue = this.player.remaining - this.chip.totalChips * (1 + this.player.buyin);
      this.finalValue = (this.finalChipValue * this.chip.singleChipValue).toFixed(2);
      if (this.finalChipValue > 0) {
        this.hasWon = 1;
      } else if (this.finalChipValue <0){
        this.hasWon = -1;
      } else {
        this.hasWon = 0;
      }
    }
  }

  onBill() {
    this.player.remaining = this.remaining;
    this.onUpdateFinal();
    this.player.final = this.finalValue
    this.onUpdatePlayer();
  }

  private getChipInfo() {
    this.texasService.onFetchChip().subscribe((chip) => this.chip = chip);
  }
}
