export class UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];

  constructor(username: string, firstName?: string, lastName?: string, email?: string, roles?: string[]) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.roles = roles ? roles : [];
  }
}
