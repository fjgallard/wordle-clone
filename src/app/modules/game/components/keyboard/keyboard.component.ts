import {
  Component,
  EventEmitter,
  HostListener,
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

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.onKeyPress(event?.key);
  }

  onKeyPress(key: string) {
    console.log(key);
    this.keyPressed.emit(key);
  }

}
