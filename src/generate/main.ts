import { getResourceNamespaces } from "@awboost/cfn-resource-schemas-db";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "prettier";
import ts from "typescript";
import { generateResourceFile } from "./codegen.js";

async function main(): Promise<void> {
  const outputDir = process.argv[2];
  if (!outputDir) {
    console.error(`usage: ${process.argv[1]} <output-dir>`);
    process.exit(2);
  }

  await mkdir(outputDir, { recursive: true });

  const resources = getResourceNamespaces();

  for await (const resource of resources) {
    const fileName = resource.awsTypeName.replaceAll("::", "-") + ".ts";
    const outputPath = join(outputDir, fileName);

    const statements = generateResourceFile(resource);
    const printer = ts.createPrinter();

    const output = printer.printFile(
      ts.factory.createSourceFile(
        statements,
        ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
        ts.NodeFlags.None,
      ),
    );

    await writeFile(outputPath, await format(output, { filepath: outputPath }));
  }
}

await main();
