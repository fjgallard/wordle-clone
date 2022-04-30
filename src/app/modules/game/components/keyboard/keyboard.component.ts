import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  @Output()
  keyPressed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyPress(key: string) {
    this.keyPressed.emit(key);
  }

}
