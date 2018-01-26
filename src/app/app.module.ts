import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from './elements/user/user.service';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {AuthService} from './systems/auth/auth.service';
import {AuthInterceptor} from './systems/auth/auth.interceptor';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NoteService} from './elements/note/note.service';
import {LoginComponent} from './pages/login/login.component';
import {NotesComponent} from './pages/notes/notes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotesComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: '**',
        redirectTo: '',
      }

    ])

  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService, NoteService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}


