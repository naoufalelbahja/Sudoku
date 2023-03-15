import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GameComponent } from './game/game.component';
import { TableComponent } from './game/table/table.component';
import { RowComponent } from './game/table/row/row.component';
import { CellComponent } from './game/table/row/cell/cell.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './game/header/header.component';
import { FooterComponent } from './game/footer/footer.component';
import { TimerComponent } from './game/timer/timer.component';
import { TimePipe } from './game/timer/time.pipe';
import { PauseComponent } from './game/pause/pause.component';
import { EndGameComponent } from './end-game/end-game.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GameComponent,
    TableComponent,
    RowComponent,
    CellComponent,
    HeaderComponent,
    FooterComponent,
    TimerComponent,
    TimePipe,
    PauseComponent,
    EndGameComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
