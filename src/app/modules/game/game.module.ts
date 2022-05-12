import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './pages/game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { GameService } from './services/game.service';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuessBoardComponent } from './components/guess-board/guess-board.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GameComponent,
    KeyboardComponent,
    GuessBoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GameRoutingModule,
    HttpClientModule
  ],
  providers: [DataService, GameService],
})
export class GameModule { }
