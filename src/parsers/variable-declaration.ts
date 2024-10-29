import { Literal, Node, ObjectExpression, VariableDeclaration } from "acorn";

type KV = { key: string; value: any };

const variableParser = {
  Literal: (node: Literal) => node?.value,
  ObjectExpression: (obj: ObjectExpression) => {
    return obj.properties.reduce((acc, el) => {
      const key = el.type === "Property" ? el.key.type === "Identifier" ? el.key.name : undefined : undefined;
      if (key === undefined) return acc;
      return {
        ...acc,
        [key]: (el as any)?.value?.value,
      };
    }, {});
  },
};

const variableDeclaration = {
  test: (node: Node): node is VariableDeclaration => node.type === "VariableDeclaration",
  exec: (node: VariableDeclaration) => {
    const declarations = node.declarations || [];
    const items = declarations.reduce<KV[]>((acc, subNode) => {
      if (subNode.type !== "VariableDeclarator") {
        return acc;
      }
      const typeValue = subNode.init?.type! in variableParser
        ? (variableParser as any)[subNode.init?.type!]
        : undefined;
      if (subNode.id.type === "Identifier" && typeValue) {
        return [...acc, { key: subNode.id.name, value: typeValue(subNode.init) }];
      }
      return acc;
    }, []);
    return { type: "variables", items };
  },
};

export default variableDeclaration;
