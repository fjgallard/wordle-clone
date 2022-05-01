import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameBoard } from '@modules/game/interfaces/gameboard.interface';
import { Guess } from '@modules/game/interfaces/guess.interface';
import { GameService } from '@modules/game/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  guessForm!: FormGroup;

  isGameOver: boolean;
  gameBoard!: GameBoard;
  numberOfGuesses: number;
  guessesRemaining: number;
  targetWord!: string;

  get currentGuess() {
    return this.guessForm.get('pendingGuess')?.value;
  }

  constructor(
    private fb: FormBuilder,
    private gameService: GameService
  ) {
    this.isGameOver = false;

    this.numberOfGuesses = 6;
    this.guessesRemaining = 6;

    this.initGameBoard();
    this.initWord();
    this.initGuessForm();
  }

  ngOnInit(): void {
    console.log(this.targetWord);
  }

  private addGuessToBoard(guess: Guess) {
    const index = this.numberOfGuesses - this.guessesRemaining;
    this.gameBoard.guesses[index] = guess;
    this.guessesRemaining--;
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

  private initGuessForm() {
    this.guessForm = this.fb.group({
      pendingGuess: ['' , Validators.required]
    });
  }

  checkUserGuess(word: string) {
    const guess = this.gameService.checkGuess(word, this.targetWord);
    this.addGuessToBoard(guess);
  }

  // Temporary
  displayCurrentGuess() {
    console.log(this.currentGuess);
  }

}
