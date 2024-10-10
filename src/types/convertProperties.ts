// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { trace } from "@dwidge/trace-js";
import { omitUndefined } from "../utils/omitUndefined.js";
import {
  JsonSchemaObject,
  JsonSchemaObjectWithPropertyArray,
} from "./JSONSchema.js";

export const convertPropertiesArrayToPropertiesObjectRecursively = trace(
  "convertPropertiesArrayToPropertiesObjectRecursively",
  ({
    properties,
    items,
    ...v
  }: JsonSchemaObjectWithPropertyArray): JsonSchemaObject =>
    JsonSchemaObject.parse(
      v.type === "object" &&
        properties &&
        JsonSchemaObjectWithPropertyArray.array().safeParse(properties).success
        ? {
            ...v,
            properties: convertPropertiesArrayToPropertiesObject(
              JsonSchemaObjectWithPropertyArray.array().parse(properties)
            ),
          }
        : v.type === "array"
          ? {
              ...v,
              items: items
                ? convertPropertiesArrayToPropertiesObjectRecursively(items)
                : { type: "null" },
            }
          : omitUndefined({
              ...v,
              enum: v.enum?.length ? v.enum : undefined,
              required: undefined,
            })
    )
);

const convertPropertiesArrayToPropertiesObject = trace(
  "convertPropertiesArrayToPropertiesObject",
  (
    properties: JsonSchemaObjectWithPropertyArray[]
  ): Record<string, JsonSchemaObject> =>
    Object.fromEntries(
      properties.map((p, i) => [
        p.title ?? i.toString(),
        convertPropertiesArrayToPropertiesObjectRecursively(p),
      ])
    )
);

export const convertPropertiesObjectToPropertiesArrayRecursively = trace(
  "convertPropertiesObjectToPropertiesArrayRecursively",
  ({
    properties,
    items,
    ...v
  }: JsonSchemaObject): JsonSchemaObjectWithPropertyArray =>
    JsonSchemaObjectWithPropertyArray.parse(
      v.type === "object" && properties
        ? {
            ...v,
            properties: convertPropertiesObjectToPropertiesArray(properties),
          }
        : v.type === "array"
          ? {
              ...v,
              items: items
                ? convertPropertiesObjectToPropertiesArrayRecursively(items)
                : { type: "null" },
            }
          : omitUndefined({
              ...v,
              enum: v.enum?.length ? v.enum : undefined,
              required: undefined,
            })
    )
);

const convertPropertiesObjectToPropertiesArray = trace(
  "convertPropertiesObjectToPropertiesArray",
  (
    properties: Record<string, JsonSchemaObject>
  ): JsonSchemaObjectWithPropertyArray[] =>
    Object.entries(properties).map(([key, value]) => ({
      title: key,
      ...convertPropertiesObjectToPropertiesArrayRecursively(value),
    }))
);
