import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../model/player';

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.css']
})
export class RecordModalComponent implements OnInit {

  @Input() public player: Player;

  constructor() { }

  ngOnInit(): void {
    console.log(this.player);
  }

}
