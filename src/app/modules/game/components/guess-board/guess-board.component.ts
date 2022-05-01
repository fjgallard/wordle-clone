import { Component, Input, OnInit } from '@angular/core';
import { Guess } from '@modules/game/interfaces/guess.interface';

@Component({
  selector: 'app-guess-board',
  templateUrl: './guess-board.component.html',
  styleUrls: ['./guess-board.component.scss']
})
export class GuessBoardComponent implements OnInit {

  @Input()
  guesses: Guess[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
