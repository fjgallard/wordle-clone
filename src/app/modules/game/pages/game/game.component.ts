import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Clue,
  ClueType
} from '@modules/game/interfaces/clue.interface';

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
  numberOfLetters: number;
  guessesRemaining: number;
  targetWord!: string;

  get guesses() {
    return this.gameBoard.guesses;
  }

  get pendingGuess() {
    return this.guessForm.get('pendingGuess')?.value;
  }

  set pendingGuess(guess: string) {
    this.guessForm.get('pendingGuess')?.setValue(guess);
  }

  set latestClue(clue: string) {
    if (this.pendingGuess.length >= 5) {
      return;
    }

    this.pendingGuess = this.pendingGuess + clue;
  }

  constructor(
    private fb: FormBuilder,
    private gameService: GameService
  ) {
    this.isGameOver = false;

    this.numberOfGuesses = 6;
    this.numberOfLetters = 5;
    this.guessesRemaining = 6;

    this.initGameBoard();
    this.initWord();
    this.initGuessForm();
  }

  ngOnInit(): void {
    console.log(this.targetWord);
  }

  private updateGuessToBoard(guess: Guess) {
    const index = this.numberOfGuesses - this.guessesRemaining;
    this.gameBoard.guesses[index] = guess;
  }

  private addGuessToBoard(guess: Guess) {
    const index = this.numberOfGuesses - this.guessesRemaining;
    this.gameBoard.guesses[index] = guess;
    this.guessesRemaining--;
    this.clearForm();
  }

  private initGameBoard() {
    const clues: Clue[] = [];
    const guesses: Guess[] = [];

    for (let index = 0; index < this.numberOfLetters; index++) {
      clues.push({ letter: '', type: ClueType.noMatch });
    };

    for (let index = 0; index < this.numberOfGuesses; index++) {
      guesses.push({ clues });
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

  private clearForm() {
    this.guessForm.get('pendingGuess')?.setValue('');
  }

  private deleteLatestClue() {
    if (this.pendingGuess.length) {
      this.pendingGuess = this.pendingGuess.substring(0, this.pendingGuess.length - 1);
    }
  }

  private updateLatestClue(key: string) {
    key = key.toLowerCase();

    const match = key.match('^[a-z]*');

    if (match && !match[0]) {
      return;
    }

    this.latestClue = key;
    this.updateGuessToBoard(this.gameService.convertWordToGuess(this.pendingGuess, this.numberOfLetters));
  }

  checkUserGuess(word: string) {
    const guess = this.gameService.checkGuess(word, this.targetWord);
    this.addGuessToBoard(guess);
  }

  inputClue(key: string) {
    console.log('keyboard emits:', key);

    if (key === 'Backspace') {
      return this.deleteLatestClue();
    }

    if (key === 'Enter') {
      return this.checkUserGuess(this.pendingGuess);
    }

    if (key.length > 1) {
      return;
    }

    this.updateLatestClue(key);
  }

}
