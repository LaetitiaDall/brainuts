import {User} from './user';

export class UserUtils extends User {

  constructor(user?: User) {
    super();
    if (user) {
      Object.assign(this, user);
    }
  }

}


