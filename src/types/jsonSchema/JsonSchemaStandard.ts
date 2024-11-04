// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

export const JsonSchemaStandard = z.object({
  definitions: z
    .record(
      z.string(),
      z.lazy(() => z.any()),
    )
    .optional(),
  $ref: z.string().optional(),
  type: z.enum([
    "object",
    "array",
    "string",
    "number",
    "integer",
    "boolean",
    "null",
  ]),
  title: z.string().optional(),
  description: z.string().optional(),
  properties: z
    .record(
      z.string(),
      z.lazy(() => z.any()),
    )
    .optional(),
  required: z.array(z.string()).optional(),
  items: z.lazy(() => z.any()).optional(),
  enum: z.array(z.string()).optional(),
  format: z
    .enum([
      "email",
      "password",
      "uri",
      "date-time",
      "hostname",
      "ipv4",
      "ipv6",
      "uri-reference",
      "json-pointer",
      "relative-json-pointer",
      "regex",
      "date",
      "time",
      "uuid",
      "uri-template",
      "idn-email",
      "idn-hostname",
    ])
    .optional(),
  default: z
    .union([z.string(), z.number(), z.boolean(), z.object({}), z.null()])
    .optional(),
  examples: z
    .array(
      z.union([z.string(), z.number(), z.boolean(), z.object({}).nonstrict()]),
    )
    .optional(),
  nullable: z.boolean().optional(),
  minItems: z.number().optional(),
  maxItems: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  exclusiveMaximum: z.number().optional(),
  multipleOf: z.number().optional(),
  additionalProperties: z.any(),
});
export type JsonSchemaStandard = z.infer<typeof JsonSchemaStandard>;

export const convertStringToJsonSchemaStandard = (
  s: string,
): JsonSchemaStandard => JsonSchemaStandard.parse(JSON.parse(s));
export const convertJsonSchemaStandardToString = (
  o: JsonSchemaStandard,
): string => JSON.stringify(o, null, 2);

export const defaultJsonSchemaStandard: JsonSchemaStandard = {
  type: "object",
  properties: {},
};

export const exampleJsonSchemaStandard1 = JsonSchemaStandard.parse({
  type: "object",
  properties: {
    title: { type: "string" },
    active: { type: "boolean" },
    count: { type: "integer" },
    phone: { type: "string", pattern: "^[0-9]{10,15}$" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          uri: { type: "string", format: "uri" },
        },
        required: ["name", "uri"],
      },
    },
    details: {
      type: "object",
      properties: {
        description: { type: "string" },
        level: { type: "integer" },
      },
      required: ["description", "level"],
    },
  },
  required: ["title", "active", "count", "phone", "items", "details"],
}) satisfies JsonSchemaStandard;

export const exampleJsonSchemaStandard2 = {
  type: "object",
  properties: {
    title: { type: "string" },
    active: { type: "boolean" },
    count: { type: "integer" },
    phone: { type: "string", pattern: "^[0-9]{10,15}$" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          uri: { type: "string", format: "uri" },
        },
        required: ["name", "uri"],
      },
    },
    details: {
      type: "object",
      properties: {
        description: { type: "string" },
        level: { type: "integer" },
      },
      required: ["description", "level"],
    },
  },
  required: ["title", "active", "count", "phone", "items", "details"],
} satisfies JsonSchemaStandard;
