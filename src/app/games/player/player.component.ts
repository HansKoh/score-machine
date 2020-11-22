import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../model/player';
import { TexasService } from '../services/texas.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() public player:Player;

  @Input() public totalChipValue:number;

  @Input() public totalChips:number;

  @Input() public singleChipValue:any;

  remaining: number;
  finalChipValue:any = "";
  finalValue:any = "";
  hasWon:number = 0;

  constructor(private texasService: TexasService) { 
  }

  ngOnInit(): void {
    this.remaining = this.player.remaining;
    this.onUpdateFinal();
  }

  onUpdatePlayer() {
    this.texasService.onUpdatePlayer(this.player).subscribe((res)=>console.log("after update single player", res));
  }

  onDeletePlayer() {
    this.texasService.onDeleteSinglePlayer(this.player.id).subscribe((res)=>console.log("after delete single player", res));
    console.log(this.player.id);
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
    if (this.singleChipValue != "Invalid") {
      this.finalChipValue = this.remaining - this.totalChips * (1 + this.player.buyin);
      this.finalValue = (this.finalChipValue * this.singleChipValue).toFixed(2);
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
    console.log(this.player.remaining);
    this.onUpdatePlayer();
    this.onUpdateFinal();
  }
}
