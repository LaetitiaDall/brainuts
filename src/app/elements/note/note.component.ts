import {Component, Input, OnInit} from '@angular/core';
import {Note} from './note';
import {UserUtils} from '../user/user.utils';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  user: UserUtils;
  @Input() note: Note;

  constructor() {
  }

  ngOnInit() {
    this.user = new UserUtils(this.note.user);
  }

}
