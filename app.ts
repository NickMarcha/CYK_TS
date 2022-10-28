import * as readline from "readline";
import { CYKParser } from "./cykparser";
import { Grammar } from "./grammar";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const providedfilepath = process.argv[2];

let askparseInput = (myParser: CYKParser) => {
  rl.question(
    "Loaded grammar, type a string to test it:",
    async (answer: string) => {
      if (["e", "exit"].findIndex((e) => e === answer) >= 0) exitProgram();

      myParser.testString(answer, true);
      askparseInput(myParser);
    }
  );
};

let setParser = (filepath: string) => {
  let myGrammar = new Grammar(filepath);
  myGrammar.createfromfilepath().then((_) => {
    let myParser = new CYKParser(myGrammar);
    askparseInput(myParser);
  });
};

if (providedfilepath) {
  setParser(providedfilepath);
} else {
  rl.question("specify grammar file:", async (answer) => {
    setParser(providedfilepath);
  });
}

let exitProgram = () => {
  console.log("(e)xit program");
  rl.close();
  process.exit();
};
