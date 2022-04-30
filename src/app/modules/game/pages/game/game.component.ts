import { Component, OnInit } from '@angular/core';
import { GameBoard } from '@modules/game/interfaces/gameboard.interface';
import { Guess } from '@modules/game/interfaces/guess.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isGameOver: boolean;
  gameBoard!: GameBoard;
  numberOfGuesses: number;
  guessesRemaining: number;
  targetWord!: string;

  constructor() {
    this.isGameOver = false;

    this.numberOfGuesses = 6;
    this.guessesRemaining = 6;

    this.initGameBoard();
    this.initWord();
  }

  ngOnInit(): void {
  }

  private addGuessToBoard(guess: Guess) {
    const index = this.numberOfGuesses - this.guessesRemaining;
    this.gameBoard.guesses[index] = guess;
  }

  private initGameBoard() {
    const guesses: Guess[] = [];
    for (let index = 0; index < this.numberOfGuesses; index++) {
      guesses.push({ clues: [] });
    };

    this.gameBoard = { guesses };
  }

  private initWord() {
    this.targetWord = 'chaft';
  }

  checkUserGuess(word: string) {
    // TODO
    // const guess = this.gameService.checkGuess(word, this.targetWord);
    // this.addGuessToBoard(guess);
  }

}
