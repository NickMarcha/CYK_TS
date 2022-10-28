import { TSymbol } from "./tsymbol";

export class Rule {
  left: TSymbol;
  right: TSymbol[];

  constructor(left: TSymbol, right: TSymbol[]) {
    this.left = left;
    this.right = right;
  }
  public toString() {
    return `{left: ${this.left.toString()}, right: [${new Array(...this.right)
      .map((r) => r.toString())
      .join(`, `)}]}`;
  }
}
