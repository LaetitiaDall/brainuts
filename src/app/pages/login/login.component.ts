import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../elements/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  title: string;
  login: string;
  password: string;

  private subscriptions = [];

  constructor(private userService: UserService, private router: Router) {
    this.title = 'Katiii';
  }

  doLogin() {

    if (!this.login || !this.password) {
      return;
    }

    this.userService.login(this.login, this.password);

  }

  ngOnInit() {
    this.subscriptions.push(this.userService.observeMainUser().subscribe(value => {
      if (value) {
        this.router.navigate(['notes']);
      }
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
