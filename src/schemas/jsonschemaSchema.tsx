// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Rule, UISchemaElement } from "@jsonforms/core";
import {
  defaultJsonSchemaObject,
  JsonSchemaObject,
} from "../types/JSONSchema.js";

export const property = {
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Title",
      description: "The title of the field.",
    },
    type: {
      type: "string",
      title: "Type",
      description: "The type of the data this field defines.",
      enum: [
        "object",
        "array",
        "string",
        "number",
        "integer",
        "boolean",
        "null",
      ],
      default: "string",
    },
    required: {
      title: "Required",
      type: "array",
      items: {
        type: "string",
      },
    },
    properties: {
      type: "object",
      title: "Properties",
      additionalProperties: {
        type: "object",
        $ref: "#/definitions/property",
      },
      properties: {},
      default: { type: "string" },
    },
    items: {
      type: "object",
      $ref: "#/definitions/property",
    },
    minLength: {
      type: "number",
      title: "Minimum Length",
    },
    maxLength: {
      type: "number",
      title: "Maximum Length",
    },
    enum: {
      type: "array",
      title: "Enum",
      items: {
        type: "string",
      },
    },
    minimum: {
      type: "number",
      title: "Minimum Value",
    },
    maximum: {
      type: "number",
      title: "Maximum Value",
    },
  },
  required: ["type"],
  additionalProperties: false,
  default: defaultJsonSchemaObject,
} as JsonSchemaObject;

export const editingProperty = {
  type: "object",
  properties: {
    ...property.properties,
    properties: {
      type: "array",
      title: "Properties",
      items: {
        type: "object",
        $ref: "#/definitions/property",
      },
      default: [],
    },
  },
  required: ["type"],
  additionalProperties: false,
} as JsonSchemaObject;

export const jsonschemaSchema = {
  ...property,
  definitions: {
    property,
  },
} as JsonSchemaObject;

export const editingSchema = {
  ...editingProperty,
  definitions: {
    property: editingProperty,
  },
} as JsonSchemaObject;

const stringRule = {
  effect: "SHOW",
  condition: {
    scope: "#/properties/type",
    schema: { const: "string" },
  },
} as Rule;
const numberRule = {
  effect: "SHOW",
  condition: {
    scope: "#/properties/type",
    schema: { enum: ["number", "integer"] },
  },
} as Rule;
const objectRule = {
  effect: "SHOW",
  condition: {
    scope: "#/properties/type",
    schema: { const: "object" },
  },
} as Rule;
const arrayRule = {
  effect: "SHOW",
  condition: {
    scope: "#/properties/type",
    schema: { const: "array" },
  },
} as Rule;

export const jsonschemaUischema = {
  type: "Group",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/title",
        },
        {
          type: "Control",
          scope: "#/properties/type",
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/minLength",
        },
        {
          type: "Control",
          scope: "#/properties/maxLength",
        },
      ],
      rule: stringRule,
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/minimum",
        },
        {
          type: "Control",
          scope: "#/properties/maximum",
        },
      ],
      rule: numberRule,
    },
    {
      type: "Control",
      scope: "#/properties/enum",
      rule: stringRule,
    },
    {
      type: "Control",
      scope: "#/properties/required",
      rule: objectRule,
    },
    {
      type: "Control",
      scope: "#/properties/properties",
      rule: objectRule,
    },
    {
      type: "Control",
      scope: "#/properties/items",
      rule: arrayRule,
    },
  ],
} as UISchemaElement;