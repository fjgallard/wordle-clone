import { Injectable } from '@angular/core';
import { Clue, ClueType } from '../interfaces/clue.interface';
import { Guess } from '../interfaces/guess.interface';

@Injectable()
export class GameService {

  constructor() { }

  checkGuess(word: string, targetWord: string): Guess {
    if (word === targetWord) {
      return this.returnFullMatch(targetWord);
    }

    return this.returnPartialMatch(word, targetWord);
  }

  convertWordToGuess(word: string, maxLength: number): Guess {
    const clues: Clue[] = [];
    for (let index = 0; index < word.length; index++) {
      clues.push({ letter: word[index], type: ClueType.noMatch });
    };

    for (let index = word.length; index < maxLength; index++) {
      clues.push({ letter: '', type: ClueType.noMatch });
    };

    return { clues };
  }

  private checkLetterPositioning(attemptLetter: string, targetWord: string, index: number): ClueType {
    if (!targetWord.includes(attemptLetter)) {
      return ClueType.noMatch;
    }

    if (targetWord[index] === attemptLetter) {
      return ClueType.fullMatch;
    }

    return ClueType.partialMatch;
  }

  private returnFullMatch(targetWord: string) {
    let clues: Clue[] = [];
    for (let index = 0; index < targetWord.length; index++) {
      const clue: Clue = {
        letter: targetWord[index],
        type: ClueType.fullMatch
      };

      clues[index] = clue;
    }

    return { clues };
  }

  private returnPartialMatch(word: string, targetWord: string) {
    const guess: Guess = { clues: [] };
    for(let i = 0; i < targetWord.length; i++) {
      const letter = word[i];
      const type = this.checkLetterPositioning(letter, targetWord, i);
      const clue = { letter, type };
      guess.clues.push(clue);
    }

    return guess;
  }
}
