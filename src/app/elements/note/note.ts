import {User} from '../user/user';

export class Note {
  _id: string;
  content = '';
  editing = false;
  user: User;
  creationDate: string;
}

