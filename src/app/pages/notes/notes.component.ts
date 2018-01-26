import {Component, OnInit} from '@angular/core';
import {UserService} from '../../elements/user/user.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {

  }

  quit() {
    localStorage.setItem('token', null);
    this.userService.setMainUser(null);
  }

  ngOnInit(): void {
  }

}
