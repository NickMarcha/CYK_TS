import * as readline from "readline";
import { CYKParser } from "./cykparser";
import { Grammar } from "./grammar";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const providedfilepath = process.argv[2];
if (providedfilepath) {
  let myGrammar = new Grammar(providedfilepath);
  myGrammar.createfromfilepath().then((_) => {
    let parser = new CYKParser(myGrammar);
    rl.question("Loaded grammar, type a string to test it:", async (answer) => {
      parser.parse(answer);
    });
  });
} else {
  rl.question("specify grammar file:", async (answer) => {
    let myGrammar = new Grammar(answer);
    await myGrammar.createfromfilepath();
    console.log(myGrammar.toString());
    rl.close();
  });
}
