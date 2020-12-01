import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SystemModule } from './system/system.module';
import { GamesModule } from './games/games.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire"
import { AngularFireStorageModule } from "@angular/fire/storage"
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SystemModule,
    GamesModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
