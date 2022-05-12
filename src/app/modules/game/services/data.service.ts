import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';


@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  async readWordsFile() {
    const words = await this.httpClient.get('assets/words', {responseType: 'text'})
      .pipe(take(1)).toPromise();


    const wordsArr = words?.split("\n");
    return wordsArr;

  }
}
