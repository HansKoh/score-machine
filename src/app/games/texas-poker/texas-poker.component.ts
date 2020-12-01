import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
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

  // Implementing Image Feature open
  defaultPlayerImage: string = "./assets/img/player.jpg"
  imageSrc: string = this.defaultPlayerImage;
  selectedImage: any = null;
  isSubmitted: boolean = false;

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imageSrc = "./assets/img/player.jpg"
      this.selectedImage = null;
    }
  }

  newPlayerForm = new FormGroup({
    id : new FormControl(''),
    name : new FormControl('', Validators.required),
    buyin : new FormControl(0),
    remaining : new FormControl(0),
    final : new FormControl(0),
    record : new FormControl([]),
    imageUrl : new FormControl('', Validators.required)
  });

  onReactiveSubmit(formValue) {
    this.isSubmitted = true;
    if(this.newPlayerForm.valid) {
      console.log(formValue);
      const filePath = `players/${formValue.name}_${new Date().getTime()}`;
      const fileRef = this.firebaseStorage.ref(filePath);
      this.firebaseStorage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              // formValue['imageUrl'] = url;
              // formValue['id'] = Date();
              // formValue['record'] = ["Join at@" + new Date().toLocaleString()];
              this.texasService.onCreatePlayer(
                {
                  "id": Date(),
                  "name": formValue.name,
                  "buyin": 0,
                  "remaining": 0,
                  "final": 0,
                  "record": ["Join at@" + new Date().toLocaleString()],
                  "imageUrl": url
                }
              ).subscribe((res)=>console.log(res));
            })
          })
        )
        .subscribe();
      this.resetForm();
    }
  }

  get formControls() {
    return this.newPlayerForm['controls'];
  }

  resetForm() {
    this.newPlayerForm.reset();
    this.newPlayerForm.setValue({
      id : '',
      name : '',
      buyin : 0,
      remaining : 0,
      final : 0,
      record : [],
      imageUrl : ''
    });
    this.imageSrc = this.defaultPlayerImage;
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  // Implementing Image Feature close

  constructor(
    private texasService: TexasService, 
    private authService: AuthService, 
    private firebaseStorage: AngularFireStorage) { 
  }

  ngOnInit(): void {
    this.resetForm();

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
        "record": ["Join at@" + new Date().toLocaleString()],
        "imageUrl": "./assets/img/player.jpg"
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
