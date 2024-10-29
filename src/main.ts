import { Parser } from "acorn";
import bigIntParser from "acorn-bigint";
import * as walk from "acorn-walk";
import variableDeclaration from "./parsers/variable-declaration.ts";

const path = await Deno.realPath("./assets/simple.js");

const file = await Deno.readTextFile(path);

const MyParser = Parser.extend(
  bigIntParser,
);

const parsers = [
  variableDeclaration,
];

const ast = MyParser.parse(file, {
  ecmaVersion: "latest",
});

walk.full(ast, (node) => {
  const parser = parsers.find((x) => x.test(node));
  if (parser) {
    const result = parser.exec(node as any);
  }
});
