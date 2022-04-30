import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './pages/game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { GameService } from './services/game.service';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  providers: [GameService],
})
export class GameModule { }
