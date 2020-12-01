export class Player {
  /**
   *  This is a player model
   */
  constructor(
    public id: string,
    public name: string,
    public buyin: number,
    public remaining: number,
    public final: number,
    public record: Array<string> = [],
    public imageUrl: String
  ) {}
}
