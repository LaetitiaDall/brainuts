import {User} from '../user/user';

export class Note {
  _id: string;
  content = '';
  user: User;
  date: string;
}

