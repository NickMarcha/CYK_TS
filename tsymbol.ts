export class TSymbol {
  equals(other: TSymbol): boolean {
    return this.s === other.s;
  }
  constructor(s: string) {
    this.s = s;
  }
  s: string;

  public toString() {
    return this.s;
  }
}
