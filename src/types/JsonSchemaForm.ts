// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";
import { JsonSchemaObject } from "./JSONSchema.js";
import { trace } from "@dwidge/trace-js";
import { omitUndefined } from "../utils/omitUndefined.js";

export type JsonSchemaArray = {
  title?: string;
  type?:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "integer"
    | "array"
    | "null";
  minimum?: number;
  maximum?: number;
  properties?: JsonSchemaArray[];
  items?: JsonSchemaArray;
  required?: boolean;
  enum?: string[];
  minLength?: number;
  maxLength?: number;
};
export const JsonSchemaArray = z
  .object({
    title: z.string().optional(),
    type: z
      .enum([
        "object",
        "array",
        "string",
        "number",
        "integer",
        "boolean",
        "null",
      ])
      .optional(),
    required: z.boolean().optional(),
    properties: z.lazy((): any => JsonSchemaArray.array()).optional(),
    items: z.lazy((): any => JsonSchemaArray).optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    enum: z.array(z.string()).optional(),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
  })
  .strict();

export const convertJsonSchemaArrayToJsonSchemaObject = trace(
  "convertJsonSchemaArrayToJsonSchemaObject",
  ({
    properties,
    items,
    validProperties = JsonSchemaArray.array()
      .parse(properties ?? [])
      .filter((p) => p.title && p.type),
    ...v
  }: JsonSchemaArray & {
    validProperties?: JsonSchemaArray[];
  }): JsonSchemaObject =>
    JsonSchemaObject.parse(
      v.type === "object"
        ? {
            ...v,
            properties: Object.fromEntries(
              validProperties.map(({ required, ...p }, i) => [
                p.title,
                convertJsonSchemaArrayToJsonSchemaObject(p),
              ])
            ),
            required: validProperties
              .filter((p) => p.required)
              .map((p) => p.title),
          }
        : v.type === "array"
          ? {
              ...v,
              items: items
                ? convertJsonSchemaArrayToJsonSchemaObject(items)
                : { type: "null" },
            }
          : omitUndefined({
              ...v,
              enum: v.enum?.length ? v.enum : undefined,
              required: undefined,
            })
    )
);

export const convertJsonSchemaObjectToJsonSchemaArray = (
  v: JsonSchemaObject
): JsonSchemaArray[] => {
  // Convert each property in the object schema to an array schema
  return Object.entries(v.properties ?? {}).map(([key, value]) => {
    // Determine the base structure for each item in the array
    const schemaItem: JsonSchemaArray = {
      title: key,
      type: value.type,
      required: v.required?.includes(key),
      enum: value.enum ?? undefined,
      minimum: value.minimum ?? undefined,
      maximum: value.maximum ?? undefined,
      minLength: value.minLength ?? undefined,
      maxLength: value.maxLength ?? undefined,
    };

    // Handle nested "object" type properties
    if (value.type === "object" && value.properties) {
      schemaItem.properties = convertJsonSchemaObjectToJsonSchemaArray({
        type: "object",
        properties: value.properties,
        required: value.required,
      });
    }

    // Handle "array" type properties by recursively converting the items
    if (value.type === "array" && value.items) {
      schemaItem.items = convertJsonSchemaObjectToJsonSchemaArray({
        type: value.items.type,
        properties: value.items.properties,
        required: value.items.required,
      })[0]; // Since items is usually one schema, not an array of schemas
    }

    // Parse the schema item to ensure it adheres to the JsonSchemaArray schema
    return JsonSchemaArray.parse(schemaItem);
  }) as JsonSchemaArray[];
};
