export interface Clue {
  letter: string;
  type: ClueType;
};

export enum ClueType {
  noMatch, partialMatch, fullMatch
};
