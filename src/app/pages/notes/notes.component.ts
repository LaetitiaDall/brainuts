import {Component, OnInit} from '@angular/core';
import {UserService} from '../../elements/user/user.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {NoteService} from '../../elements/note/note.service';
import {Note} from '../../elements/note/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  content: string;
  notes: Array<Note>;
  oldcontent: string;

  constructor(private userService: UserService, private noteService: NoteService, private router: Router) {
    this.notes = new Array<Note>();


  }

  saveNote() {
    this.noteService.create(this.content).subscribe(note => {
      console.log(note);
      this.notes.splice(0, 0, note);
      this.content = '';
    });
  }


  update(note) {
    this.noteService.update(note).subscribe(updatedNote => {
      console.log('Updated ', updatedNote);
      note.editing = false;
    });
  }

  edit(note) {
    this.oldcontent = note.content;
    note.editing = true;
  }

  cancel(note) {
    if (confirm('U wanna do dis?')) {
      note.content = this.oldcontent;
      note.editing = false;
    }
  }

  delete(note) {
    if (confirm('Do u now da wei?')) {
      this.noteService.remove(note).subscribe(val => {
        this.notes.splice(this.notes.indexOf(note), 1);
      });
    }


  }

  quit() {
    localStorage.setItem('token', null);
    this.userService.setMainUser(null);
  }

  ngOnInit(): void {

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    this.noteService.getAll().subscribe(notes => {
      this.notes = notes;
    });


  }
}
