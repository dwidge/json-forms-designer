// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { trace } from "@dwidge/trace-js";
import { omitUndefined } from "../../utils/omitUndefined.js";
import { JsonSchemaStandard } from "./JsonSchemaStandard.js";
import { JsonSchemaCustom } from "./JsonSchemaCustom.js";

export const convertJsonSchemaCustomToStandard = trace(
  "convertJsonSchemaCustomToStandard",
  ({
    properties,
    definitions,
    items,
    validProperties = JsonSchemaCustom.array()
      .parse(properties ?? [])
      .filter((p) => p.title && p.type),
    ...v
  }: JsonSchemaCustom & {
    validProperties?: JsonSchemaCustom[];
  }): JsonSchemaStandard =>
    JsonSchemaStandard.parse(
      v.type === "object"
        ? {
            ...v,
            properties: Object.fromEntries(
              validProperties.map(({ required, ...p }, i) => [
                p.title,
                convertJsonSchemaCustomToStandard(p),
              ]),
            ),
            definitions: Object.fromEntries(
              (definitions ?? []).map(({ ...p }, i) => [
                p.title,
                convertJsonSchemaCustomToStandard(p),
              ]),
            ),
            required: validProperties
              .filter((p) => p.required)
              .map((p) => p.title),
          }
        : v.type === "array"
          ? {
              ...v,
              items: items
                ? convertJsonSchemaCustomToStandard(items)
                : { type: "null" },
            }
          : omitUndefined({
              ...v,
              enum: v.enum?.length ? v.enum : undefined,
              required: undefined,
            }),
    ),
);

export const convertJsonSchemaStandardToCustom = trace(
  "convertJsonSchemaStandardToCustom",
  ({
    properties,
    definitions,
    items,
    ...v
  }: JsonSchemaStandard): JsonSchemaCustom =>
    JsonSchemaCustom.parse(
      v.type === "object" && properties
        ? {
            ...v,
            definitions: Object.entries(definitions ?? {}).map(
              ([key, value]) => ({
                title: key,
                ...convertJsonSchemaStandardToCustom(value),
              }),
            ),
            properties: Object.entries(properties).map(([key, value]) => ({
              title: key,
              ...convertJsonSchemaStandardToCustom(value),
            })),
          }
        : v.type === "array"
          ? {
              ...v,
              items: items
                ? convertJsonSchemaStandardToCustom(items)
                : { type: "null" },
            }
          : omitUndefined({
              ...v,
              enum: v.enum?.length ? v.enum : undefined,
              required: undefined,
            }),
    ),
);
