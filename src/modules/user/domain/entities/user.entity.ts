export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public nickname: string,
    public email: string,
    public password: string,
  ) {}
}
