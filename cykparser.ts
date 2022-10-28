import { Grammar } from "./grammar";
import { Rule } from "./rule";
import { TSymbol } from "./tsymbol";
import { findCart, printTable, setContains } from "./utils";

export class CYKParser {
  grammar: Grammar;
  constructor(grammar: Grammar) {
    this.grammar = grammar;
  }

  public testString(inputString: string, step = false) {
    if (!this.grammar) return;
    let input = inputString.split(this.grammar.isSentence ? " " : "");
    console.log(`testing: ${input}`);
    let R = this.grammar.rules;
    let n = input.length;

    let T: Set<TSymbol>[][] = new Array(n + 1);

    for (let i1 = 0; i1 < T.length; i1++) {
      T[i1] = new Array(n + 1);
      for (let i2 = 0; i2 < T[i1].length; i2++) {
        T[i1][i2] = new Set<TSymbol>();
      }
    }

    //for j = 1,...,n do
    for (let j = 1; j <= n; j++) {
      //for all A -> a in R do

      const terminalRules: Rule[] = [...R.values()].filter(
        (r) => r.right.length == 1
      );

      for (let rule of terminalRules) {
        //if a_j = a then
        if (new TSymbol(input[j - 1]).equals([...rule.right.values()][0])) {
          //T_{j-1,j} = T_{j-1,j} union {A}
          T[j - 1][j].add(rule.left);
          if (step) printTable(T);
        }
      }
      //for i = j-2 to 0 do
      for (let i = j - 2; i >= 0; i--) {
        //let P : N times N
        //P = emptyset
        let P: Set<TSymbol[]> = new Set<TSymbol[]>();

        //for k = i+1 to j-1 do
        for (let k = i + 1; k <= j - 1; k++) {
          //P = P union (T_{i,k} times T_{k,j})
          let one = T[i][k];
          let two = T[k][j];

          let cartReturn = findCart(one, two);

          //let product: [TSymbol, TSymbol] = cartesianProduct<TSymbol>(Array.from(one), Array.from(two));
          P = new Set<TSymbol[]>([...P, ...cartReturn]);
        }
        //for all A -> B C in R do
        let nonTerminalRules = [...R.values()].filter(
          (r) => r.right.length !== 1
        );
        for (let rule of nonTerminalRules) {
          //if (B,C) in P then
          if (setContains(P, [rule.right[0], rule.right[1]])) {
            //T_{i,j} = T_{i,j}
            T[i][j].add(rule.left);
            if (step) printTable(T);
          }
        }
      }
    }

    console.log("Final Table:");
    printTable(T);
    if (Array.from(T[0][n]).findIndex((e) => e.equals(new TSymbol("S"))) >= 0) {
      console.log("{" + input + "} is included in Grammar");
    } else {
      console.log("{" + input + "} is not included in Grammar");
    }
  }
}
