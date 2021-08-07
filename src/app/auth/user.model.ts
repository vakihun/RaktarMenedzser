import {Role} from "./auth.service";

export class User {
  constructor(public name: string, public token: string, public role: Role) {
  }
}
