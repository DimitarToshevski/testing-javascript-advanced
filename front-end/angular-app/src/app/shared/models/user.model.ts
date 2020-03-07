export class User {
  username: string;

  constructor(rawObject?: IUser) {
    if (rawObject) {
      this.username = rawObject.username;
    }
  }
}

interface IUser {
  username: string;
}
