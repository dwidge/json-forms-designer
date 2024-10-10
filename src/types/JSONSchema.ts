// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

// A json schema for creating json schemas
export const jsonSchemaSchema: JsonSchemaObject = {
  type: "object",
  properties: {
    $ref: {
      type: "string",
      nullable: true,
    },
    title: {
      type: "string",
      description: "The title of the schema.",
      nullable: true,
    },
    description: {
      type: "string",
      description: "A description of the purpose of the schema.",
      nullable: true,
    },
    type: {
      type: "string",
      description: "The type of the data this schema defines.",
      enum: [
        "object",
        "array",
        "string",
        "number",
        "integer",
        "boolean",
        "null",
      ],
    },
    properties: {
      type: "object",
      description: "Properties defined for objects if the type is 'object'.",
      $ref: "#",
      nullable: true,
    },
    required: {
      type: "array",
      description:
        "An array of property names that are required in the object.",
      items: {
        type: "string",
      },
      uniqueItems: true,
      nullable: true,
    },
    items: {
      type: "object",
      description:
        "Defines the schema of items in an array if the type is 'array'.",
      $ref: "#",
      nullable: true,
    },
    enum: {
      type: "array",
      description: "An enumeration of all possible values for a field.",
      items: {
        type: "string",
      },
      nullable: true,
    },
    format: {
      type: "string",
      enum: [
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
      ],
      description: "The format of the data (e.g., email, uri, date-time).",
      nullable: true,
    },
    default: {
      description: "The default value for the property if it is undefined.",
      oneOf: [
        { type: "string" },
        { type: "number" },
        { type: "boolean" },
        { type: "object" },
      ],
      nullable: true,
    },
    examples: {
      type: "array",
      description: "An array of examples of valid values for the schema.",
      items: {
        oneOf: [
          { type: "string" },
          { type: "number" },
          { type: "boolean" },
          { type: "object" },
        ],
      },
      nullable: true,
    },
    nullable: {
      type: "boolean",
      description:
        "Defines whether additional properties are allowed in an object.",
      nullable: true,
    },
    minItems: {
      type: "integer",
      description: "Minimum number of items in an array.",
      nullable: true,
    },
    maxItems: {
      type: "integer",
      description: "Maximum number of items in an array.",
      nullable: true,
    },
    minLength: {
      type: "integer",
      description: "Minimum length of a string.",
      nullable: true,
    },
    maxLength: {
      type: "integer",
      description: "Maximum length of a string.",
      nullable: true,
    },
    pattern: {
      type: "string",
      description: "A regular expression pattern that the string must match.",
      nullable: true,
    },
    minimum: {
      type: "number",
      description: "The minimum value of a number.",
      nullable: true,
    },
    maximum: {
      type: "number",
      description: "The maximum value of a number.",
      nullable: true,
    },
    exclusiveMinimum: {
      type: "number",
      description: "The exclusive minimum value of a number.",
      nullable: true,
    },
    exclusiveMaximum: {
      type: "number",
      description: "The exclusive maximum value of a number.",
      nullable: true,
    },
    multipleOf: {
      type: "number",
      description:
        "Specifies that the number must be a multiple of the given value.",
      nullable: true,
    },
  },
  required: ["type"],
  additionalProperties: false,
};

export const JsonSchemaObject = z.object({
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
    .union([z.string(), z.number(), z.boolean(), z.object({})])
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
export type JsonSchemaObject = z.infer<typeof JsonSchemaObject>;

export const defaultJsonSchemaObject: JsonSchemaObject = {
  type: "object",
  properties: {},
};

export const JsonSchemaObjectWithPropertyArray = JsonSchemaObject.extend({
  definitions: z
    .record(
      z.string(),
      z.lazy(() => JsonSchemaObjectWithPropertyArray),
    )
    .optional(),
  properties: z
    .lazy(() => JsonSchemaObjectWithPropertyArray)
    .array()
    .optional(),
  items: z.lazy(() => JsonSchemaObjectWithPropertyArray).optional(),
});
export type JsonSchemaObjectWithPropertyArray = z.infer<
  typeof JsonSchemaObjectWithPropertyArray
>;
export const defaultJsonSchemaObjectWithPropertyArray: JsonSchemaObjectWithPropertyArray =
  {
    type: "object",
    properties: [],
  };

export const exampleJsonSchema1 = JsonSchemaObject.parse({
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
}) satisfies JsonSchemaObject;

export const exampleJsonSchema2 = {
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
} satisfies JsonSchemaObject;
