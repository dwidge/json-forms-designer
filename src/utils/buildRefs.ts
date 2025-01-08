// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { JsonSchemaStandard } from "../types/index.js";

/**
 * Builds a list of refs for a schema, traversing recursively through properties and handling nested arrays.
 * @param schema The root schema to start traversing from.
 * @param basePath The base path to build refs from (default is '#').
 * @returns A list of ref strings.
 */
export const buildRefs = (
  schema?: JsonSchemaStandard,
  basePath: string = "#",
): string[] =>
  Object.entries(schema?.properties ?? {}).flatMap(
    ([k, p], _i, _a, currentPath = `${basePath}/properties/${k}`) => [
      currentPath,
      ...(p.type === "object" && p.properties
        ? buildRefs(p, currentPath)
        : p.type === "array" && p.items
          ? buildRefs(p.items, currentPath)
          : []),
    ],
  ) ?? [];
