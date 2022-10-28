import { Rule } from "./rule";
import { TSymbol } from "./tsymbol";

export class Grammar {
  isSentence: boolean = false;

  rules = new Set<Rule>();

  filepath: string;
  constructor(filepath: string) {
    this.filepath = filepath;
  }

  public async createfromfilepath(): Promise<Grammar> {
    const fs = require(`fs`).promises;

    let fileString: string = await fs.readFile(
      this.filepath,
      "utf8",
      (err: any, data: string) => {
        if (err) {
          console.log(err);
          return;
        }

        return data;
      }
    );
    let result = fileString.split(/\r?\n/);

    console.log(`Title: ${result.shift()}`);
    this.isSentence = result.shift()![0] === "s";
    console.log(`${result.length} rules found`);

    result.forEach((line) => {
      const tokens = line.split(" ");

      const left = new TSymbol(tokens.shift()!);
      tokens.shift();
      const right = tokens.map((str) => new TSymbol(str));

      const newrule = new Rule(left, right);
      this.rules.add(newrule);
    });
    return this;
  }

  /**
   * toString
   */
  public toString: () => string = () => {
    return `Grammar{ rules: [${new Array(...this.rules)
      .map((r) => r.toString())
      .join(`, `)}]}`;
  };
}
