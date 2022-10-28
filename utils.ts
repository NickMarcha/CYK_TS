import { TSymbol } from "./tsymbol";

export function cartesianProduct<T>(...allEntries: T[][]): T[][] {
  return allEntries.reduce<T[][]>(
    (results, entries) =>
      results
        .map((result) => entries.map((entry) => result.concat([entry])))
        .reduce((subResults, result) => subResults.concat(result), []),
    [[]]
  );
}

export function printTable(T: Set<TSymbol>[][]) {
  console.log("    ");
  let jaxis = "";
  for (let j = 1; j < T[0].length; j++) {
    jaxis += "    [j" + j + "]        ";
  }
  console.log(jaxis);

  for (let i = 0; i < T.length - 1; i++) {
    let line = "[i" + i + "] ";
    for (let j = 1; j < T[i].length; j++) {
      let items: string = Array.from(T[i][j]).join(",");
      for (let ip = items.length; ip < 15; ip++) {
        items += " ";
      }
      line += items + " ";
    }
    console.log(line);
    console.log();
  }
  console.log();
}
export function findCart(
  set1: Set<TSymbol>,
  set2: Set<TSymbol>
): Set<[TSymbol, TSymbol]> {
  let result: Set<[TSymbol, TSymbol]> = new Set<[TSymbol, TSymbol]>();

  let arr1 = Array.from(set1);
  let arr2 = Array.from(set2);
  for (let i: number = 0; i < arr1.length; i++)
    for (let j: number = 0; j < arr2.length; j++)
      result.add([arr1[i], arr2[j]]);
  return result;
}

export function setContains(
  io: Set<[TSymbol, TSymbol]>,
  o: TSymbol[]
): boolean {
  let pattern = Array.from(o);
  for (let i = 0; i < io.size; i++) {
    let entry = Array.from(io)[i];

    let entryArray = Array.from(entry);

    if (Array.from(entry).every((e, i) => e.equals(pattern[i]))) return true;
  }
  return false;
}
