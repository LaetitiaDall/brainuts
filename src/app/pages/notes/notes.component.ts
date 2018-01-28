import {Component, OnInit} from '@angular/core';
import {UserService} from '../../elements/user/user.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {NoteService} from '../../elements/note/note.service';
import {Note} from '../../elements/note/note';
import {Tag} from '../../elements/tag/tag';
import {TagService} from '../../elements/tag/tag.service';
import {HelperService} from '../../elements/util/helpers.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  content: string;
  notes: Array<Note>;
  tags: Array<Tag>;
  tagsByWord = {};
  oldcontent: string;

  constructor(private userService: UserService,
              private tagService: TagService,
              private helperService: HelperService,
              private noteService: NoteService,
              private router: Router,
              private route: ActivatedRoute) {
    this.notes = new Array<Note>();
    this.tags = new Array<Tag>();
  }


  prepareWord(word) {
    word = word.trim();
    word = word.toLowerCase();
    word = this.helperService.replaceAccents(word);
    word = word.replace('#', '');
    return word;
  }

  setTagForWordIfAny(word) {
    let wordSimplified = this.prepareWord(word);
    if (!wordSimplified || wordSimplified.length <= 1) {
      return;
    }


    let tag, tagSimplified;
    for (let t = 0; t < this.tags.length; t++) {
      tag = this.tags[t];
      tagSimplified = this.prepareWord(tag.name);

      if (tagSimplified.localeCompare(wordSimplified) === 0) {
        this.tagsByWord[word] = tag;
        return;
      }
    }
  }

  contentSplited(note) {
    if (note.splited) {
      return note.splited;
    }

    note.splited = this.helperService.splitTextForTags(note.content);

    let word, wordSimplified;

    for (let m = 0; m < note.splited.length; m++) {
      word = note.splited[m];

      this.setTagForWordIfAny(word);
    }

    return note.splited;
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
      note.editing = false;
      note.splited = false;
    }, (error) => {
      this.refresh();
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

  refresh() {
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;

      this.noteService.getAll().subscribe(notes => {
        this.notes = notes;
      });
    });
  }

  delete(note) {
    if (confirm('Do u now da wei?')) {
      this.noteService.remove(note).subscribe(val => {
        this.notes.splice(this.notes.indexOf(note), 1);
      }, (error) => {
        this.refresh();
      });
    }
  }

  quit() {
    localStorage.setItem('token', null);
    this.userService.setMainUser(null);
  }

  ngOnInit(): void {

    let tagName = this.route.snapshot.paramMap.get('tag');
    console.log(tagName);

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    this.refresh();


  }
}
