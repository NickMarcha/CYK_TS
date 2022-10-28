import { Grammar } from "./grammar";
import { Rule } from "./rule";
import { TSymbol } from "./tsymbol";
import { cartesianProduct, findCart, printTable, setContains } from "./utils";

export class CYKParser {
  grammar: Grammar;
  constructor(grammar: Grammar) {
    this.grammar = grammar;
  }

  public testString(inputString: string) {
    if (!this.grammar) return;
    let input = inputString.split(this.grammar.isSentence ? " " : "");
    console.log(input);
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

      console.log("Terminal Rules");
      for (let rule of terminalRules) {
        //printTable(T);
        //console.table(T);
        //if a_j = a then
        //console.log(`l: "${input[j - 1]}" r: "${[...rule.right.values()][0]}"`);
        if (new TSymbol(input[j - 1]).equals([...rule.right.values()][0])) {
          //T_{j-1,j} = T_{j-1,j} union {A}
          console.log(j);
          console.log(rule);
          T[j - 1][j].add(rule.left);
          //console.log("added one rule");
          printTable(T);
          //console.table(T);
        }
      }
      console.log("NonTerminal Rules");
      //for i = j-2 to 0 do
      for (let i = j - 2; i >= 0; i--) {
        //let P : N times N
        //P = emptyset
        let P: Set<[TSymbol, TSymbol]> = new Set<[TSymbol, TSymbol]>();

        //for k = i+1 to j-1 do
        for (let k = i + 1; k <= j - 1; k++) {
          //P = P union (T_{i,k} times T_{k,j})
          //console.log(T);
          //console.log(`i: ${i}, k: ${k}`);
          let one = T[i][k];
          let two = T[k][j];

          let cartReturn = findCart(one, two);

          //let product: [TSymbol, TSymbol] = cartesianProduct<TSymbol>(Array.from(one), Array.from(two));
          P = new Set<[TSymbol, TSymbol]>([...P, ...cartReturn]);
        }
        //for all A -> B C in R do
        console.log(`P:${new Array(...P).join(" ")}`);
        let nonTerminalRules = [...R.values()].filter(
          (r) => r.right.length !== 1
        );
        console.log(`NTR:${new Array(...nonTerminalRules).join(" ")}`);
        for (let rule of nonTerminalRules) {
          //if (B,C) in P then
          console.log(`rule:${rule}`);
          if (setContains(P, [rule.right[0], rule.right[1]])) {
            console.log("Found nonterminal");
            //T_{i,j} = T_{i,j}
            T[i][j].add(rule.left);
            printTable(T);
          }
        }
      }
    }

    if (Array.from(T[0][n]).findIndex((e) => e.equals(new TSymbol("S"))) >= 0) {
      console.log("{" + input + "} is included in Grammar");
    } else {
      console.log("{" + input + "} is not included in Grammar");
    }
  }
}
